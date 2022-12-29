import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

// 4 - custom hook
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/produtos"

function App() {

  const [produtos, setProdutos] = useState([]);

// 4 - custom
const {data:itens,httpConfig,loading,error} = useFetch(url)

  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")


  

  // 1 - resgatando dados 

  // useEffect(() => {

  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProdutos(data);
  //   }
  //   fetchData();
  // }, []);

  // console.log(produtos)


  // 2 - adicionado produtos

  const handleSubmit = async (e) => {
    e.preventDefault();
    const produto = {
      nome,
      preco
    }
    // const res = await fetch(url,{
    //   method: "POST",
    //   headers : {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify(produto),
    // });
    
      // 3 - carregamento dinamico
  // const addProdutos = await res.json();
  // setProdutos((prevProdutos) => [...prevProdutos, addProdutos])

  httpConfig(produto,"POST")

  setNome("")
  setPreco("")

  }

  // 6 - loading
  // 7- loading no POST

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando Dados... </p>}
      {error && <p>{error}</p>}
      {!loading && (
           <ul>
           {itens && itens.map((produto) => (
             <li key={produto.id}>{produto.nome} - ${produto.preco}</li>
           ))}
         </ul>
      )}
      <div className='add-produto'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type={"text"} value={nome} name="nome" onChange={(e) => setNome(e.target.value)}></input>
          </label>
          <label>
            Preço:
            <input type={"number"} value={preco} name="preco" onChange={(e) => setPreco(e.target.value)}></input>
          </label>
          {loading && <input type={"submit"} disabled value="Aguarde"></input> }
          {!loading && <input type={"submit"} value="Adicionar"></input> }
        </form>
      </div>
    </div>
  );
}

export default App;
