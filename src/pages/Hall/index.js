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
  
    const [cafe, setCafe] = useState('');
    const [menu, setMenu] = useState('');
    const [drinks, setDrinks] = useState('');
    const [unidade, setUnidade] = useState([]);
    const [total, setTotal] = useState(0);
    const [remove, setRemove] = useState([]);


    const addPedido = (item) => {
        setUnidade(prevUnidade =>[...prevUnidade, item]);
         console.log(unidade)
    }

    const soma = () => {
        setTotal(unidade.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.price, 0))

        console.log(total)
        return total
    }


    const removeItens = () => {
        setRemove(unidade.splice(unidade.indexOf(''),1))
        
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
                            const itemObject = {
                                name:name,
                                flavor:flavor,
                                price:price
                            }

                            addPedido(itemObject)
                        }} key={Math.random()} className="container-cafe">
                        <h1 key={Math.random()} className="divName">{item.name}</h1>
                        <h1 key={Math.random()} className="divFlavor">{item.flavor}</h1>
                        <h1 key={Math.random()} className="divPrice">R${item.price},00</h1>
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
                            const itemObject = {
                                name:name,
                                flavor:flavor,
                                price:price,
                                complement:complement
                            }

                            addPedido(itemObject)
                        }} key={Math.random()} className="container-allDay">
                        <h1 key={Math.random()} className="divName">{item.name}</h1>
                        <h1 key={Math.random()} className="divFlavor">{item.flavor}</h1>
                        <h1 key={Math.random()} className="divComplement">{item.complement}</h1>
                        <h1 key={Math.random()} className="divPrice">R${item.price},00</h1>
                        </div>
                    ))
                }
            </div>

           
            <h1 className="title">Comanda</h1>


            <div className="comanda">

            <div className="Register-Client">
                
            <input type='text' className='inputClient' placeholder="Cliente*" name="client"/>
          
            <input type='number'  className='inputTable' placeholder="Mesa*" name="table"/>
            
          
        
                </div>

                {console.log(unidade)}
            {
                    unidade.length > 0 && unidade.map((item) => (

                        <div key={Math.random()} className="container-cardapio">
                        <h1  className="commands-Name">{item.name}</h1>
                        <h1  className="commands-Flavor">{item.flavor}</h1>
                        <h1  className="commands-Price">R${item.price},00</h1>
                        <h1  className="commands-Complement">{item.complement}</h1>
                        
                        </div>
                    ))
                }

            <button className="btn-finalizar" onClick={soma}>Finalizar</button>
            <button className="btn-finalizar" onClick={removeItens}>Cancelar</button>

            <div className="total-itens">
            <h1>Valor total ${total},00</h1>
            </div>



            </div>  

        </div>    
    );
};
 export default Hall;