import React from "react";
import naBrasa from '../../img/naBrasa.gif'
import './Loading.css'

function Loading({id}) {

  return (
    <>
      <div className="App-loading"> 
      <img id={id} className="loading-gif" alt="Loading" src={naBrasa}/>
      <h1>Aquecendo a Brasa...</h1>
      </div>
    </>
  );
}
  
export default Loading;