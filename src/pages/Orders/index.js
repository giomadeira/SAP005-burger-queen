import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from './logo.png';
import './Orders.css';



function Orders(){

    const token  = localStorage.getItem("token");
    const [pedidosProntos, setPedidosProntos] = useState([]);
    
        const history = useHistory()
        const routerBack = () => {

            history.push('/')
        }

        const routerHall = () => {
            history.push('/Hall')
        }
    
        const logout = () => {
            localStorage.getItem("token");
            localStorage.clear()
            routerBack()
        }

    useEffect (() => {
        fetch('https://lab-api-bq.herokuapp.com/orders/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`${token}`,
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const feito = json.filter(item => item.status === 'pronto')
                setPedidosProntos(feito)
                console.log(json)

                
            })
    }, []);

    const entregar = (event) => {
    const token = localStorage.getItem("token");
    

    const parent = event.target.parentNode.parentNode;
    const idMudar = parent.getAttribute('id');
    localStorage.setItem("id", idMudar);
    const idPedido = Number (localStorage.getItem('id'))
    console.log(idPedido);

   
        fetch(`https://lab-api-bq.herokuapp.com/orders/${idPedido}`, {

            method: 'PUT',
            headers: {
                    'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`${token}`,
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'

                    },
                    body:JSON.stringify({
                        "status": "entregue"
                    })
                })
        .then((response) => response.json())
        .then((json) => {
    
            const filtroPedido = pedidosProntos.filter (item => item.id !== idPedido )
            setPedidosProntos(filtroPedido)       
            console.log(json)

        })
           
    
        }

    return(

        <div className="App-pedidos">

        <div className="cabecalho-kitchen">
        <p className="img-logo"> <img src={logo}/></p>
             <button className="btnExit" onClick={logout}>{<ExitToAppIcon style={{ fontSize: 50 }}/>}</button>
        </div>

             <button className="voltar-Hall" onClick={routerHall}>Cardápio</button>
       
        <h1 className="title">Pedidos Prontos </h1>
            <div className="pedidos-prontos">
                {pedidosProntos && pedidosProntos.map((item) => (
                        
                        <div id={item.id}
                            
                         key={Math.random()} className="container-pedidos">
                        <p key={Math.random()} className="divName">Nome do Cliente: {item.client_name}</p>
                        <p key={Math.random()} className="divFlavor">Id: {item.id}</p>
                        <p key={Math.random()} className="divPrice">Nº Mesa: {item.table}</p>
                        <p key={Math.random()} className="divPrice">Status: {item.status}</p>
                        <div key={Math.random()} className="divPrice">Produtos: {item.Products.map((product) => 
                        <p> {product.name} </p>)}

                       <button className="alterarPedido" onClick={entregar}>Entregar Pedido</button>

                        </div>

                        </div>
                    ))
                }
            </div>

        </div>

                

    );
};


        
export default Orders;
        
  



        