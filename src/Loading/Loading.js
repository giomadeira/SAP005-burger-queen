import React from "react";
import naBrasa from './../img/naBrasa.gif'

function Loading({id}) {

  return (
    <>
      <img id={id} className="loading-gif" alt="Loading" src={naBrasa}/>
    </>
  );
}
  
export default Loading;