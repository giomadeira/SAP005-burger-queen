/*import React, {useState,useEffect} from 'react';
import { Fragment } from 'react';
import './Loading.css'

function Loading({loading, setLoading}) {
  const [loading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 8000));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const element = document.querySelector(".loader-container");
      if (element) {
        element.remove();
        setLoading(!loading);
      }
    });
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <>
      <div className="loader-container">
        <p>Aquecendo a Brasa...</p>
        <div className="loader">
          <div></div>
          <div></div>
        </div>
      </div>
      
    </>
 );
 
}
export default Loading
*/