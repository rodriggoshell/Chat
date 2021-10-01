import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

//socet.io
let socket;


function App() {
    const ENDPOINT = 'http://localhost:8080/';
    
    const [logado] = useState(false);
    const [name, setName] = useState("");
    const [sala, setSala] = useState("");
    
    useEffect(()=>{ 
      socket = socketIOClient(ENDPOINT);   
    }, []);
    
    const conectarSala = (e) => {
      e.preventDefault();
      console.log('Acessou a sala de ' + sala + ' com o usuario ' + name);
     }
    
    return (
      <div>
        <h1>Bem-Vindo(a) ao ChatApp</h1>
        <form>
          <div>
            <label>Nome:</label>
            <input type="text" placeholder="Nome" name="nome" value={name} onChange={(e)=> setName(e.target.value)} />
          </div>
          {/*<div>
            <label>Sala:</label>
            <input type="text" placeholder="Sala" value={sala} onChange={(e)=> setSala(e.target.value)} />
          </div>*/}
          <div>  
            <select name="sala" value={sala} onChange={e =>setSala(e.target.value)}>
              <option value="">Selecione</option>
              <option value="1">Saúde</option>
              <option value="2">Cultura</option>
              <option value="3">Esporte</option>
              <option value="4">Educação</option>
            </select> 
          </div>  
          <button onClick={conectarSala}>Acessar</button>
        </form>
        {! logado ? "Você precisa Está Logado" : "Logado"}
      </div>
    );
}

export default App;
