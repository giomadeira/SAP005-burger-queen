import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Kitchen.css';

function Kitchen(){

    const token  = localStorage.getItem("token");
    const [pedidos, setPedidos] = useState('');

    const [recebido, setRecebido] = useState('');
    



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
                const pendente = json.filter(item => item.status === 'pending')
                setPedidos(pendente)
                console.log(json)
                
            })
    }, []);

    
    

        const Cozinhar = (event) => {
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
                        "status": "pronto"
                    })
                })
                    .then((response) => response.json()).then((json) => {
                        
                        console.log(json)
                        
                    })
                    
    
        }

    return(

        <div className="App-cozinha">
             <button className="btnExit" onClick={logout}>{<ExitToAppIcon style={{ fontSize: 50 }}/>}</button>
       
        <h1 className="title">Pedidos em Preparo</h1>
            <div className="fazer-pedidos">
                {pedidos && pedidos.map((item) => (
                        
                        <div id={item.id}
                            
                         key={Math.random()} className="container-pedidos">
                        <p key={Math.random()} className="divName">Nome do Cliente: {item.client_name}</p>
                        <p key={Math.random()} className="divFlavor">Id: {item.id}</p>
                        <p key={Math.random()} className="divPrice">Nº Mesa: {item.table}</p>
                        <p key={Math.random()} className="divPrice">Status: {item.status}</p>
                        <div key={Math.random()} className="divPrice">Produtos: {item.Products.map((product) => 
                        <p> {product.name} </p>)}
                       <button className="alterarPedido" onClick={Cozinhar}>Pedido Pronto!</button>
                        </div>

                        </div>
                    ))
                }
            </div>

        </div>
    );
};

        
export default Kitchen;
        