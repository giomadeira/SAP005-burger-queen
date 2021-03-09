import React from 'react';

function PedidoEntregue({ item }) {
    return (
        <div id={item.id}

            key={Math.random()} className="container-pedidos">
            <p key={Math.random()} className="divName">Nome do Cliente: {item.client_name}</p>
            <p key={Math.random()} className="divFlavor">Id: {item.id}</p>
            <p key={Math.random()} className="divPrice">Nº Mesa: {item.table}</p>
            <p key={Math.random()} className="divPrice">Status: {item.status}</p>
            <div key={Math.random()} className="divPrice">Produtos: {item.Products.map((product) =>

                <p>{product.qtd} {product.name} </p>)}

                <p key={Math.random()} className="divData"> {new Date(item.updatedAt).toLocaleString()}</p>

            </div>

        </div>
    )
}
export default PedidoEntregue;