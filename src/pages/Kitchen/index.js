import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';


function Kitchen(){
    const history = useHistory()
    const routerBack = () => {
        history.push('/')
    }

    //const logout = () => {
        localStorage.getItem("token");
        localStorage.clear()
        routerBack()
    }



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
    
    const [cadClient, setCadClient] = useState('');
    const [cadTable, setCadTable] = useState('');
    const [status, setStatus] = useState('');


    const pedidoFeito = () => {   
    useEffect (() => {
        fetch('https://lab-api-bq.herokuapp.com/products/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`${token}`
            },
            body: JSON.stringify({
                "client": cadClient,
                "table": cadTable,
                "status": status,
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


     return(
        <h1>Página da cozinha</h1>

        

    );
};
export default Kitchen;