import React, {useState,useEffect} from 'react';
import { Fragment } from 'react';


export default function Loading() {
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 6000));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const element = document.querySelector(".loader-container");
      if (element) {
        element.remove();
        setLoading(!isLoading);
      }
    });
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="loader-container">
        <span>Aquecendo a Brasa...</span>
        <div className="loader">
          <div></div>
          <div></div>
        </div>
      </div>
      
     
    
    </>
  );
}

