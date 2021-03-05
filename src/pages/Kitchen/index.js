import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from './logo.png';
import './Kitchen.css';
import CardPedido from '../../components/CardPedido'

function Kitchen(){

    const token  = localStorage.getItem("token");
    const [pedidos, setPedidos] = useState('');
    const [loading, setLoading] = useState(true);
    

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
               setTimeout(() => {
                    setLoading(false)
                    }, 10000);
                    
                
                console.log(json)
                
            })
    }, []);

    
    

        const cozinhar = (event) => {
        const token = localStorage.getItem("token");


        const parent = event.target.parentNode.parentNode.parentNode;
        const idMudar = parent.getAttribute('id'); 
        localStorage.setItem("id", idMudar);
        const idPedido = Number (localStorage.getItem('id'))
        console.log(idPedido);

        
                fetch(`https://lab-api-bq.herokuapp.com/orders/${idPedido}`, {

                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`${token}`,
                        'Access-Control-Allow-Origin': '*', 
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'

                    },
                    body:JSON.stringify({
                        "status": "pronto"
                    })
                })
                    .then((response) => response.json()).then((json) => {
                        const filtroPedido = pedidos.filter (item => item.id !== idPedido )
                        setPedidos(filtroPedido) 
                        console.log(pedidos)
                        console.log(idPedido)
                        console.log(filtroPedido)
                        
                    })
                    
    
        }
    return(
        loading?(
            <Loading/>
        ):(
        <div className="App-cozinha">
            <div className="cabecalho-kitchen">
            <p className="img-logo"> <img src={logo}/></p>
            <button className="btnExit" onClick={logout}>{<ExitToAppIcon style={{ fontSize: 50 }}/>}</button>
            </div>

            <h1 className="title">Pedidos em Preparo</h1>
            <div className="place-orders">
                {pedidos && pedidos.map((item) => (
                        <CardPedido 
                        item={item}
                        cozinhar={cozinhar}/>
                        
                    ))
                }
            </div>


        </div>
        )

    );
};

        
export default Kitchen;