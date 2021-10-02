import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

//socet.io
let socket;


function App() {
    const ENDPOINT = 'http://localhost:8080/';
    
    const [logado, setLogado] = useState(false);
    const [name, setName] = useState("");
    const [sala, setSala] = useState("");
    
    const [mensagem, setMensagem] = useState("");
    const [listaMensagem, setListaMensagem] = useState([]);
    
    useEffect(()=>{ 
      socket = socketIOClient(ENDPOINT);   
    }, []);
     
    useEffect(() => {
      socket.on("receber_mensagem", (dados) => {
         setListaMensagem([...listaMensagem, dados]);
      });
    }); 

    const conectarSala = (e) => {
      e.preventDefault();
      console.log('Acessou a sala de ' + sala + ' com o usuario ' + name);
      setLogado(true);
      socket.emit("sala_conectar", sala);
     };
    
    const enviarMessagem = async () => {
      console.log('Mesagem: ' + mensagem);
      const conteudoMesagem = {
        sala: sala,
        conteudo: {
          nome: name,
          mensagem: mensagem
        }
      };
      console.log(conteudoMesagem);

      await socket.emit('enviar_mensagem', conteudoMesagem);
      setListaMensagem([...listaMensagem, conteudoMesagem.conteudo]);
      setMensagem('');
    };  

    return (
      <div>
        <h1>Bem-Vindo(a) ao ChatApp</h1>
        {!logado ?
          <form>
            <div>
              <label>Nome:</label>
              <input type="text" placeholder="Nome" name="nome" value={name} onChange={(e)=> {setName(e.target.value)}} />
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
        :
          <>
            {listaMensagem.map((msg,key)=>{
              return(
                <div key={key}>
                  {msg.nome}: {msg.mensagem}
                </div>
              )
            })}
            <input type="text" name="mensagem" placeholder="Mensagem.." value={mensagem} onChange={(e)=>{setMensagem(e.target.value)}}/>

            <button onClick={enviarMessagem}>Enviar</button>
          </>
        }
      </div>
    );
}

export default App;
