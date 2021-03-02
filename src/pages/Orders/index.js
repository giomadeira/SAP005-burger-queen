import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function Orders(){

    const token  = localStorage.getItem("token");
    const [pedidosProntos, setPedidosProntos] = useState('');
    const [pedidosEntregar, setPedidosEntregar] = useState ('');



        const history = useHistory()
        const routerBack = () => {
            history.push('/')
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
                'Authorization':`${token}`
            },
        })
            .then((response) => response.json()).then((json) => {
                const feito = json.filter(item => item.status === 'pronto')
                const entrega = json.filter(item => item.status === 'entregue')
                setPedidosProntos(feito)
                setPedidosEntregar(entrega)
                console.log(json)
                
            })
    }, []);

    
    

    const entregar = (event) => {
    const token = localStorage.getItem("token");


    const parent = event.target.parentNode.parentNode;
    const idMudar = parent.getAttribute('id');
    localStorage.setItem("id", idMudar);
    const idPedido = localStorage.getItem('id')
    console.log(idPedido);

        
        fetch(`https://lab-api-bq.herokuapp.com/orders/${idPedido}`, {

            method: 'PUT',
            headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':`${token}`

                    },
                    body:JSON.stringify({
                        "status": "entregue"
                    })
                })
                    .then((response) => response.json()).then((json) => {
                        
                        console.log(json)
                        
                    })
                
    
        }

    return(

        <div className="App-pedidos">
             <button className="btnExit" onClick={logout}>{<ExitToAppIcon style={{ fontSize: 50 }}/>}</button>
       
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

            <h1 className="title">Pedidos Entregues</h1>
            <div className="entregar-pedidos">
                {pedidosEntregar && pedidosEntregar.map((item) => (
                        
                        <div id={item.id}
                            
                         key={Math.random()} className="container-pedidos">
                        <p key={Math.random()} className="divName">Nome do Cliente: {item.client_name}</p>
                        <p key={Math.random()} className="divFlavor">Id: {item.id}</p>
                        <p key={Math.random()} className="divPrice">Nº Mesa: {item.table}</p>
                        <p key={Math.random()} className="divPrice">Status: {item.status}</p>
                        <div key={Math.random()} className="divPrice">Produtos: {item.Products.map((product) => 
                        <p> {product.name} </p>)}

                        </div>

                        </div>
                    ))
                }
            </div>

        </div>

                

    );
};


        
export default Orders;
        
  



        