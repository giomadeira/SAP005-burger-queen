import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import logo from './logo.png';
import './Hall.css';

// import Cardapio from '../../components/Cardapio'

function Hall(){
  
    const token  = localStorage.getItem("token");
    const [cafe, setCafe] = useState('');
    const [menu, setMenu] = useState('');
    const [drinks, setDrinks] = useState('');
    const [unidade, setUnidade] = useState([]);
    const [total, setTotal] = useState(0);
    const [cadClient, setCadClient] = useState('');
    const [cadTable, setCadTable] = useState('');

    const history = useHistory()
    const routerBack = () => {
        history.push('/')
    }

    const logout = () => {
        localStorage.getItem("token");
        localStorage.clear()
        routerBack()
    }


    const addPedido = (item) => {
        setUnidade(prevUnidade =>[...prevUnidade, item]);
         console.log(unidade)
    }


    useEffect (() => {
      const soma = unidade.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.price, 0)
       setTotal(soma)
    }, [unidade])


    const removeProducts = (indice) => {
        const productsFiltrados = unidade.filter( (_, index)=> index!= indice)
        setUnidade(productsFiltrados)
        console.log(indice)
        
    }

    const AddItem = (index) => {
        let NewArrayProduto = [...unidade]
        NewArrayProduto[index].qtd ++
        NewArrayProduto[index].price = NewArrayProduto[index].initialPrice*NewArrayProduto[index].qtd
        setUnidade(NewArrayProduto)
        console.log(index)

    }

    const excluirItem = (index) => {
        let NewArrayProduto = [...unidade]
        NewArrayProduto[index].qtd --
        NewArrayProduto[index].price = NewArrayProduto[index].initialPrice*NewArrayProduto[index].qtd
        setUnidade(NewArrayProduto)
        console.log(index)

    }

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

                setCafe(breakfast);
                setMenu(allDay);
                setDrinks(drinks);
                console.log(json)
                
            })
    }, []);


    const enviar = (id) => {
        if(id !== null){
           
        fetch('https://lab-api-bq.herokuapp.com/orders', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
              "Authorization": token
            },
            body: JSON.stringify({
                "client": cadClient,
                "table": cadTable,
                "products":
                  unidade.map((item) => (
                    {
                      "id": Number(item.id),
                      "qtd": 1
                    }
                  ))
                })
            })
                  .then((response) => response.json())
                  .then((json) => {
                    console.log(json)
                  })
                }
            
            alert("Pedido enviado!")
     
    }
    
        
    return(
        <div className="App-menu">

        <div className="cabecalho-menu">
        <p className="img-logo"> <img src={logo}/></p>
            
            <button className="btnExit" onClick={logout}>{<ExitToAppIcon style={{ fontSize: 50 }}/>}</button>
            </div>

            <h1 className="title">Cardápio Café da Manhã</h1>
            <div className="cafe">
                {cafe && cafe.map((item) => (

                        <div onClick={() => {
                            const name = item.name
                            const flavor = item.flavor
                            const price = item.price
                            const id = item.id
                            const qtd = 1
                            const initialPrice = item.price
                            const itemObject = {
                                name,flavor,price,id,qtd,
                                initialPrice
                            }

                            addPedido(itemObject)
                            
                        }} key={Math.random()} className="container-cafe">
                        <p key={Math.random()} className="divName">{item.name}</p>
                        <p key={Math.random()} className="divFlavor">{item.flavor}</p>
                        <p className="div-total">
    
                         {Intl.NumberFormat("pt-BR", {
                             style: "currency",
                            currency: "BRL",
                             }).format(item.price)}
                         </p>
                        </div>
                    ))
                }
            </div>

            <h1 className="title">Cardápio Almoço e Jantar</h1>

            <div className="menu">
                {
                    menu && menu.map((item) => (

                        <div onClick={() => {
                            const name = item.name
                            const flavor = item.flavor
                            const price = item.price
                            const complement = item.complement
                            const id = item.id
                            const qtd = 1
                            const initialPrice = item.price
                            const itemObject = {
                                name,
                                flavor,
                                price,
                                complement,
                                id,
                                qtd,
                                initialPrice

                            }
                            
                            addPedido(itemObject)
                            
                        }} key={Math.random()} className="container-allDay">
                            <div className="name-lunch">
                        <p key={Math.random()} className="divName">{item.name}</p>
                        </div>
                        <div className="name-flavor">
                        <p key={Math.random()} className="divFlavor">{item.flavor}</p>
                        </div>
                        <div className="name-complement">
                        <p key={Math.random()} className="divComplement">{item.complement}</p>
                        </div>
                        <p className="div-total-lunch">
          
                          {Intl.NumberFormat("pt-BR", {
                             style: "currency",
                             currency: "BRL",
                          }).format(item.price)}
                     </p>
                        </div>
                    ))
                }
            </div>

           
            <h1 className="title">Comanda</h1>


            <div className="comanda">

                <div className="Register-Client">

                <form>

                    <div className="input-Client">
            <input type='text' className='inputClient' placeholder="Cliente" value={cadClient} onChange={(event)=> setCadClient(event.target.value)}/>
                </div>

                <div className="input-table">
            <input type='number'  className='inputTable' placeholder="Mesa" value={cadTable} onChange={(event)=> setCadTable(event.target.value)}/>
            </div>

                </form>
        
                </div>

                {console.log(unidade)}
            {          

                    unidade.length > 0 && unidade.map((item, indice) => (
                        
                        <div key={Math.random()} className="container-comanda">
                            
                        <div className="name-commands"> <p  className="commands-Name">{item.name}</p></div>     
                       <div className="flavor-commands"> <p  className="commands-Flavor">{item.flavor}</p></div>
                       <div className="complement-commands"><p  className="commands-Complement">{item.complement}</p></div>
                       <div className="qtd-commands"><p  className="commands-qtd">{item.qtd}</p></div>
                       <div className="total-commands"><p className="App-valor-total">
                         Valor Total:{" "}
                         {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              }).format(item.price)}
                         </p>
                         </div>
                        
                        <button className="btn-add" onClick={() => AddItem(indice)}>{<AddIcon style={{ fontSize: 15 }}/>}</button>
                        <button className="btn-remove" onClick={() => excluirItem(indice)}>{<RemoveIcon style={{ fontSize: 15 }}/>}</button>
                        <button className="btn-delete" onClick={() => removeProducts(indice)}>{<DeleteIcon />}</button>
                        
                        </div>
                    ))
                }
                <div className="btns">
           
            
            </div>
            
            <div className="total-comanda">
            Valor Total:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
            </div>

            <button className="btn-enviar" onClick={enviar}>Enviar</button> 

            </div>

        </div>    
    );
};
 export default Hall;