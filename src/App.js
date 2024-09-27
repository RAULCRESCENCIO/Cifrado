import React from 'react';
import CifradoCesar from './Components/CifradoCesar';
import CifradoEscítala from './Components/CifradoEscítala';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <div>
         
         <img
           src="/imagenes/cifrado.png"
           alt="Cómo usar"
           className="imagen-cifrado"
         />
       </div>

       <div>
         <h1>Seguridad Informatica: Cifrado y Descifrado</h1>
         <h2>Cifrado César y Escítala</h2>
       </div>

      </header>
      <main>
        <CifradoCesar />
        <CifradoEscítala />
      </main>
      <header className="App-header">

 <div>
   <h3>RAUL CRESCENCIO HERNANDEZ</h3>
 </div>

</header>
    </div>
  );
}

export default App;
