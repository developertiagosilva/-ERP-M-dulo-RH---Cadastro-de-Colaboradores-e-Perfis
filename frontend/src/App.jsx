import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // --- ESTADOS DA APLICAÇÃO ---
  const [funcionarios, setFuncionarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para armazenar os dados do novo funcionário do formulário
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome_completo: '',
    email: '',
    cpf: '',
    data_admissao: '',
    cargo: '', // Guardará o ID do cargo selecionado
    ativo: true,
  });

  // --- REQUISIÇÕES (API) ---

  // 1. Buscar Lista de Funcionários
  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/funcionarios/');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  // 2. Buscar Lista de Cargos (necessário para o <select> do formulário)
  const fetchCargos = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/cargos/');
    console.log("Cargos retornados da API:", response.data); // <--- Adicione este log
    setCargos(response.data);
  } catch (error) {
    console.error('Erro ao buscar cargos:', error);
  }
};

  // Executado ao carregar o componente na tela
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      await Promise.all([fetchFuncionarios(), fetchCargos()]);
      setLoading(false);
    };

    carregarDados();
  }, []);

  // --- MANIPULADORES DE EVENTOS ---

  // Atualiza o estado conforme o usuário digita nos campos
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovoFuncionario({
      ...novoFuncionario,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Envia os dados do formulário para o Django REST (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!novoFuncionario.cargo) {
      alert('Por favor, selecione um cargo para o colaborador.');
      return;
    }

    try {
      // Envia os dados no corpo da requisição HTTP POST
      await axios.post('http://127.0.0.1:8000/api/funcionarios/', novoFuncionario);
      
      alert('Colaborador cadastrado com sucesso!');

      // Limpa os campos do formulário
      setNovoFuncionario({
        nome_completo: '',
        email: '',
        cpf: '',
        data_admissao: '',
        cargo: '',
        ativo: true,
      });

      // Recarrega a tabela de funcionários atualizada
      fetchFuncionarios();
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error.response?.data || error);
      alert('Erro ao cadastrar funcionário. Verifique os dados digitados.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Gestão de RH - Projeto 1</h1>

      {/* --- SEÇÃO DO FORMULÁRIO DE CADASTRO --- */}
      <section style={{ background: '#f4f4f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>Cadastrar Novo Colaborador</h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Nome Completo:</label>
            <input
              type="text"
              name="nome_completo"
              value={novoFuncionario.nome_completo}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>E-mail:</label>
            <input
              type="email"
              name="email"
              value={novoFuncionario.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={novoFuncionario.cpf}
              onChange={handleInputChange}
              placeholder="000.000.000-00"
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Data de Admissão:</label>
            <input
              type="date"
              name="data_admissao"
              value={novoFuncionario.data_admissao}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Cargo:</label>
            <select
              name="cargo"
              value={novoFuncionario.cargo}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="">-- Selecione um Cargo --</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome} ({cargo.departamento}) - R$ {cargo.salario_base}
                </option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="ativo"
              name="ativo"
              checked={novoFuncionario.ativo}
              onChange={handleInputChange}
              style={{ marginRight: '0.5rem' }}
            />
            <label htmlFor="ativo">Colaborador Ativo</label>
          </div>

          <button
            type="submit"
            style={{
              gridColumn: 'span 2',
              padding: '0.75rem',
              backgroundColor: '#0066cc',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Cadastrar Colaborador
          </button>
        </form>
      </section>

      {/* --- SEÇÃO DA TABELA --- */}
      <section>
        <h2>Lista de Colaboradores</h2>

        {loading ? (
          <p>Carregando dados da API...</p>
        ) : (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th>Nome Completo</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    Nenhum funcionário cadastrado.
                  </td>
                </tr>
              ) : (
                funcionarios.map((func) => (
                  <tr key={func.id}>
                    <td>{func.nome_completo}</td>
                    <td>{func.email}</td>
                    <td>{func.cpf}</td>
                    <td>{func.cargo_detalhes?.nome || 'N/A'}</td>
                    <td>{func.cargo_detalhes?.departamento || 'N/A'}</td>
                    <td>{func.ativo ? '✅ Ativo' : '❌ Inativo'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;