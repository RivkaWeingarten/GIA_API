import React from 'react';
import './App.css';

function App() {
  return (
    <div className='container'>
      <div classname='row'>
     <div classname='col-6'>
     <h1 className='title'>Download Certs</h1>
     </div>
     <div classname='col-6 search-cert'>
    <div classname='card'>
      <div classname='card-header'>
               Enter GIA Number
      </div>
      <div className='card-body'>
      <input className='search-option' type='text'/>
      </div>
    </div>
    <div classname='btn btn-warning btn-lg'  >
      <button>GO!</button>
    </div>
    <div classname='btn btn-warning btn-lg'  >
      <button>GIA PDF</button>
    </div>
    <div classname='btn btn-warning btn-lg'  >
      <button>AGS PDF</button>
    </div>
     </div>
<div className='details'> Round Brilliant 4.00 H VS2 Medium Blue </div>
      </div>
   
    </div>
  );
}

export default App;
