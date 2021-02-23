//import { useHistory } from 'react-router-dom';
import './Hall.css';
import React, { useEffect, useState } from 'react';

const Hall = () => {
  
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState({});
  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const [Cafe, setCafe] = useState([]);
  const [Burger, setBurger] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [resumoPedido, setResumoPedido] = useState([]);
  const [produtoExcluído, setProdutoExcluído] = useState([])
  const [precoTotal, setPrecoTotal] = useState([])
  const [precosProdutos, setPrecosProdutos] = useState([])


  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        const products = data;
        const produtosCafe = products.filter(itens => itens.type.includes('breakfast'));
        setCafe(produtosCafe);
        const Burger = products.filter(itens => itens.sub_type.includes('hamburguer'));
        setBurger(Burger);
        const acompanhamentos = products.filter(itens => itens.sub_type.includes('side'));
        setAcompanhamentos(acompanhamentos);
        const bebidas = products.filter(itens => itens.sub_type.includes('drinks'));
        setBebidas(bebidas);
      })
  }, [])

  const Adicionar = async(produto) => {
    setResumoPedido([...resumoPedido, produto])
    setPrecosProdutos([...precosProdutos, produto.price])
    
  }
    /*const atualizarPedido = resumoPedido.map((itens)=>{
      if (products.id == itens.id){
        itens.order++
        return itens;
      }else{
        return itens;
      }
     
    })
    console.log(precosProdutos);
    setPrecosProdutos([...precosProdutos, products.price])
  }*/
  
  

  const Excluir = (produto) => {
    setPrecoTotal(precosProdutos.splice(resumoPedido.indexOf(produto), 1))
    setProdutoExcluído(resumoPedido.splice(resumoPedido.indexOf(produto),1))
    Somar();
  }

  const Somar = () => {
    setPrecoTotal(precosProdutos.reduce((total, num) => total + num,0))
  }

  const Submit = () => {
    const produtoApi = resumoPedido.map((produto) => {
      return (
        {
          id: produto.id,
          qtd: 1
        }
      )
    })

    const qtd = produtoApi.reduce(function (acumulador, currentValue) {
      acumulador[currentValue.id] = acumulador[currentValue.id] || [];
      acumulador[currentValue.id].push(currentValue);
      return acumulador;
    }, Object.create(null));

    const arrayProdutos = [];
    for (const [key, value] of Object.entries(qtd)) {
      arrayProdutos.push({
        id: key,
        qtd: value.length
      });
    }
    
    setOrder({ ...order, 'products': arrayProdutos })

    console.log(order)

    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${token}`
      },
      body: JSON.stringify(order)
    })
      .then((response) => {
        response.json()
      })  
      .then(data => {
        console.log(data)
      })
  }

  return (
    <div>
      
      <div className='info-client'>
        <label>
          Nome:
            <input type='text' name='nome' className='' required onChange={(event) => setOrder({ ...order, 'client': event.target.value })
          } />
        </label>
        <label>
          Mesa:
            <input type='text' name='mesa' className='' required onChange={(event) => setOrder({ ...order, 'table': event.target.value })
          } />
        </label>
      </div>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Café da Manhã</th>
            <th>Preço</th>
          </tr>
          {Cafe.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => Adicionar(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Hambúrgueres</th>
            <th>Adicionais</th>
            <th>Preço</th>
          </tr>
          {Burger.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name + " " + produto.flavor}</td>
              <td>{produto.complement === 'null' ? '' : produto.complement}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => Adicionar(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Acompanhamentos</th>
            <th>Preço</th>
          </tr>
          {acompanhamentos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => Adicionar(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Bebidas</th>
            <th>Preço</th>
          </tr>
          {bebidas.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => Adicionar(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Qtde</th>
            <th>Item</th>
            <th>Adicionais</th>
            <th>Preço</th>
          </tr>
          {resumoPedido.map((produto, index) => (
            <tr key={index}>
              <td>1</td>
              <td>{produto.name}</td>
              <td>{produto.complement === 'null' ? '' : produto.complement}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button><i className = "fa fa-trash" aria-hidden="true" onClick= {() =>Excluir(produto)}></i></button>
              </td>
            </tr>
          ))}
          <tr className='total'>
            <th className='item-total'><h4>Total:</h4></th>
            <th className='item-total'><h4>R$ {precoTotal},00</h4></th>
            <th><button onClick={() => Somar()}>Somar</button></th>
            <th><button onClick={() => Submit()}>ENVIAR</button></th>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default Hall;




/*import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Hall.css';
import Cardapio from '../../components/Cardapio'
function Hall(){
    const history = useHistory()
    const routerBack = () => {
        history.push('/')
    }
    const logout = () => {
        const token  = localStorage.getItem("token");
        localStorage.clear()
        routerBack()
    }
    const [cafe, setCafe] = useState('');
    const [menu, setMenu] = useState('');
    
    const token  = localStorage.getItem("token");
    useEffect (() => {
        fetch('https://lab-api-bq.herokuapp.com/products/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`${token}`
            },
        })
            .then((response) => response.json()).then((json) => {
                const breakfast = json.filter(item => item.type === 'breakfast')
                const allDay = json.filter(item => item.type === 'all-day')
                const hamburgerMap = {}
                allDay.map((item, i , self) => {
                    if (!hamburgerMap[item.name]){
                        hamburgerMap[item.name] = []
                    }
                    if (hamburgerMap[item.name].indexOf(item.flavor)== -1){
                        hamburgerMap[item.name].push(item.flavor)
                        }    
                } )
                console.log(hamburgerMap);
                 const hamburgerSelect = 
                            {
                            'Hambug Simples': [
                            'carne', 'frango', 'vegetariano'
                            ],
                            'Hambug Duplo':  [
                            'carne', 'frango', 'vegetariano'
                            ],
                        }
  
  
    console.log(Object.keys(hamburgerSelect))
  
    Object.keys(hamburgerSelect).map((item, i) => {
  	console.log(hamburgerSelect[item])
    hamburgerSelect[item].map((flavors) =>{
    	console.log(flavors)
    })
  })
                
                setCafe(breakfast);
                setMenu(allDay);
            })
    }, []);
    
  
    
    return(
        <div className="App">
             <button className="btnExit" onClick={logout}>Logout</button>
            <div className="cafe">
                <h1>Café da Manhã</h1>
            <Cardapio className="container-cafe" title="" array={cafe} />
            </div>
           
            <div className="allDay">
                <h1>Almoço e Jantar</h1>
            <Cardapio className="container-allDay" title="" array={menu} />
            </div>
            
        </div>    
    );
};
export default Hall;*/