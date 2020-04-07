import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepository] = useState([]);

  //List
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Front end com ReactJs",
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["node", "js", "react"]
    });

    const repository = response.data;

    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id} >
            {repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
