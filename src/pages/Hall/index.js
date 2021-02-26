import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Hall.css';

// import Cardapio from '../../components/Cardapio'

function Hall(){
    const history = useHistory()
    const routerBack = () => {
        history.push('/')
    }

    const logout = () => {
        localStorage.getItem("token");
        localStorage.clear()
        routerBack()
    }
    
    const token  = localStorage.getItem("token");
    const [cafe, setCafe] = useState('');
    const [menu, setMenu] = useState('');
    const [drinks, setDrinks] = useState('');
    const [unidade, setUnidade] = useState([]);
    const [total, setTotal] = useState(0);
    const [cadClient, setCadClient] = useState('');
    const [cadTable, setCadTable] = useState('');



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

    const enviar = () => {
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
    
    
    return(
        <div className="App-menu">
             <button className="btnExit" onClick={logout}>Logout</button>

            <h1 className="title">Cardápio Café da Manhã</h1>
            <div className="cafe">
                {cafe && cafe.map((item) => (

                        <div onClick={() => {
                            const name = item.name
                            const flavor = item.flavor
                            const price = item.price
                            const id = item.id
                            const itemObject = {
                                name:name,
                                flavor:flavor,
                                price:price,
                                id:id
                            }

                            addPedido(itemObject)
                            
                        }} key={Math.random()} className="container-cafe">
                        <p key={Math.random()} className="divName">{item.name}</p>
                        <p key={Math.random()} className="divFlavor">{item.flavor}</p>
                        <p key={Math.random()} className="divPrice">R${item.price},00</p>
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
                            const itemObject = {
                                name:name,
                                flavor:flavor,
                                price:price,
                                complement:complement,
                                id:id

                            }
                            
                            addPedido(itemObject)
                            
                        }} key={Math.random()} className="container-allDay">
                        <p key={Math.random()} className="divName">{item.name}</p>
                        <p key={Math.random()} className="divFlavor">{item.flavor}</p>
                        <p key={Math.random()} className="divComplement">{item.complement}</p>
                        <p key={Math.random()} className="divPrice">R${item.price},00</p>
                        </div>
                    ))
                }
            </div>

           
            <h1 className="title">Comanda</h1>


            <div className="comanda">

                <div className="Register-Client">
                
            <input type='text' className='inputClient' placeholder="Cliente*" value={cadClient} onChange={(event)=> setCadClient(event.target.value)}/>
          
            <input type='number'  className='inputTable' placeholder="Mesa*" value={cadTable} onChange={(event)=> setCadTable(event.target.value)}/>
          
        
                </div>

                {console.log(unidade)}
            {          

                    unidade.length > 0 && unidade.map((item, indice) => (
                        
                        <div key={Math.random()} className="container-cardapio">
                        <p  className="commands-Name">{item.name}</p>
                        <p  className="commands-Flavor">{item.flavor}</p>
                        <p  className="commands-Price">R${item.price},00</p>
                        <p  className="commands-Complement">{item.complement}</p>
                        <button className="btn-delete" onClick={() => removeProducts(indice)}>Excluir</button>
                        
                        </div>
                    ))
                }
                <div className="btns">
           
            
            </div>
            
            <div className="total-itens">
            <h1>Valor total ${total},00</h1>
            </div>

            <button className="btn-enviar" onClick={enviar}>Enviar</button> 

            </div>

        </div>    
    );
};
 export default Hall;
