import React, {useState, useEffect} from 'react';
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
 export default Hall;