import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App({ keycloak }) {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Salva tokens se disponíveis
  useEffect(() => {
    if (keycloak?.token) {
      localStorage.setItem('keycloak.token', keycloak.token);
      localStorage.setItem('keycloak.refreshToken', keycloak.refreshToken);
    }
  }, [keycloak]);

  const token = keycloak?.token || localStorage.getItem('keycloak.token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const carregar = () => {
    axios.get('http://localhost:8081/pessoas', { headers })
      .then(r => {
        setPessoas(r.data);
        setErro('');
      })
      .catch(() => setErro('Erro ao carregar dados.'));
  };

  const adicionar = () => {
    if (!nome || !idade) {
      setErro('Preencha todos os campos.');
      return;
    }

    axios.post('http://localhost:8081/pessoas', { nome, idade }, { headers })
      .then(() => {
        carregar();
        setNome('');
        setIdade('');
      })
      .catch(() => setErro('Erro ao adicionar.'));
  };

  const iniciarEdicao = (pessoa) => {
    setNome(pessoa.nome);
    setIdade(pessoa.idade);
    setEditandoId(pessoa.id);
  };

  const atualizar = () => {
    if (!editandoId) return;

    axios.put(`http://localhost:8081/pessoas/${editandoId}`, { nome, idade }, { headers })
      .then(() => {
        carregar();
        setNome('');
        setIdade('');
        setEditandoId(null);
      })
      .catch(() => setErro('Erro ao atualizar.'));
  };

  const deletar = (id) => {
    axios.delete(`http://localhost:8081/pessoas/${id}`, { headers })
      .then(() => carregar())
      .catch(() => setErro('Erro ao deletar.'));
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container">
      <h1>Pessoas</h1>

      <form onSubmit={e => e.preventDefault()} className="form">
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          placeholder="Idade"
          type="number"
          value={idade}
          onChange={e => setIdade(e.target.value)}
        />
        {editandoId ? (
          <button type="button" onClick={atualizar}>Salvar alterações</button>
        ) : (
          <button type="button" onClick={adicionar}>Adicionar</button>
        )}
      </form>

      {erro && <div className="erro">{erro}</div>}

      <ul className="lista">
        {pessoas.map(p => (
          <li key={p.id}>
            <strong>{p.nome}</strong> – {p.idade} anos
            <div className="botoes">
              <button onClick={() => iniciarEdicao(p)}>Editar</button>
              {keycloak?.hasRealmRole('admin') && (
                <button className="danger" onClick={() => deletar(p.id)}>Deletar</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
