import React  from 'react';


 function CardPedido({item, cozinhar}){
        
    
    return(
        <div id={item.id}
                            
        key={Math.random()} className="container-requests">
       <div className="requests-name"><p key={Math.random()} className="divName">Nome do Cliente: {item.client_name}</p></div>
       <div className="requests-Id"><p key={Math.random()} className="divId">Id: {item.id}</p></div>
       <div className="requests-table"><p key={Math.random()} className="divTable">Mesa: {item.table}</p></div>
       <div className="requests-status"><p key={Math.random()} className="divStatus">Status: {item.status}</p></div>
       <div className="requests-products"><div key={Math.random()} className="divProducts">Produtos: {item.Products.map((product) => 
       <p> {product.name} </p>)}
      <button className="btn-alterar-Pedido" onClick={cozinhar}>Pedido Pronto!</button>
       </div>
               </div>
       </div>
     );
 };
  export default CardPedido;