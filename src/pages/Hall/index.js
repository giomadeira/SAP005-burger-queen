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
        const token  = localStorage.getItem("token");
        localStorage.clear()
        routerBack()
    }


    const addPedido = (item) => {
        const newArray = unidade;
        newArray.push(item);
        console.log(newArray)
        setUnidade(newArray)
    }

    const [cafe, setCafe] = useState('');
    const [menu, setMenu] = useState('');
    const [unidade, setUnidade] = useState([]);
    
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
  
  
    // console.log(Object.keys(hamburgerSelect))
  
    Object.keys(hamburgerSelect).map((item, i) => {
  	// console.log(hamburgerSelect[item])
    hamburgerSelect[item].map((flavors) =>{
    	//  console.log(flavors)
    })
  })
                setCafe(breakfast);
                setMenu(allDay);
                console.log(breakfast)
            })
    }, []);
    
    
    return(
        <div className="App-menu">
             <button className="btnExit" onClick={logout}>Logout</button>

            {/* <div className="cafe">
                <h1>Café da Manhã</h1>
            <Cardapio key={Math.random()} onClick={add} className="container-cafe" title="" array={cafe} />
            </div>
           

            <div className="allDay">
                <h1>Almoço e Jantar</h1>
            <Cardapio key={Math.random()} className="container-allDay" title="" array={menu} />
            </div>

            <div className="pedido">
                <h1>Comanda</h1>
            <Cardapio key={Math.random()} className="container-allDay" title="" array={unidade} />
            </div> */}
            <h1>Cardápio Café da Manhã</h1>
            <div className="cafe">
                {cafe && cafe.map((item) => (

                        <div onClick={() => {
                            const name = item.name
                            const flavor = item.flavor
                            const price = item.price
                            const itemObject = {
                                name:name,
                                flavor:flavor,
                                price:price
                            }

                            addPedido(itemObject)
                        }} key={Math.random()} className="container-cafe">
                        <h1 key={Math.random()} className="divName">{item.name}</h1>,
                        <h1 key={Math.random()} className="divName">{item.flavor}</h1>,
                        <h1 key={Math.random()} className="divPrice">R${item.price},00</h1>
                        </div>
                    ))
                }
            </div>

            <h1>Cardápio Almoço e Jantar</h1>

            <div className="menu">
                {
                    menu && menu.map((item) => (

                        <div onClick={() => {
                            const name = item.name
                            const flavor = item.flavor
                            const price = item.price
                            const itemObject = {
                                name:name,
                                flavor:flavor,
                                price:price
                            }

                            addPedido(itemObject)
                        }} key={Math.random()} className="container-allDay">
                        <h1 key={Math.random()} className="divName">{item.name}</h1>,
                        <h1 key={Math.random()} className="divName">{item.flavor}</h1>,
                        <h1 key={Math.random()} className="divPrice">R${item.price},00</h1>
                        </div>
                    ))
                }
            </div>

            <h1>Comanda</h1>

            <div className="comanda">
            {
                    unidade && unidade.map((item) => (

                        <div key={Math.random()} className="container-cardapio">
                        <h1  className="divName">{item.name}</h1>,
                        <h1  className="divName">{item.flavor}</h1>,
                        <h1  className="divName">{item.price}</h1>
                        
                        </div>
                    ))
                }
            </div>

        </div>    
    );
};
 export default Hall;