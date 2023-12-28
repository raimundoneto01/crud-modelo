import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [user, setUser] = useState([]);

  const [form, setForm] = useState({});
  const [id, setId] = useState("");

  const handleValue = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  async function GetUser() {
    const respostas = await axios.get(
      "https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios"
    );
    setUser(respostas.data);
  }
  useEffect(() => {
    GetUser();
  }, []);

  async function GetDeletar(id) {
    await axios.delete(
      `https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios/${id}`
    );
    await GetUser();
  }

  async function PutUser(id) {
    await axios.put(
      `https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios/${id}`,
      form
    );
    setId("");
    setForm({});

    const findIndexUser = user.findIndex((u) => u.id === id);

    user[findIndexUser] = {
      ...user[findIndexUser],
      name: form.name,
      sobrenome: form.sobrenome,
      phone: form.phone,
      cidade: form.cidade,
      estado: form.estado,
    };
  }

  async function FormPost(data) {
    const dadosPost = await axios.post(
      "https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios",
      data
    );
    setUser([...user, dadosPost.data]);
  }

  const Edite = (user) => {
    setForm(user);
    setId(user.id);
  };

  const handleSubmite = (event) => {
    event.preventDefault();
    FormPost({
      name: event.target["name"].value,
      sobrenome: event.target["sobrenome"].value,
      phone: event.target["phone"].value,
      cidade: event.target["cidade"].value,
      estado: event.target["estado"].value,
    });
    event.target["name"].value = "";
    event.target["sobrenome"].value = "";
    event.target["phone"].value = "";
    event.target["cidade"].value = "";
    event.target["estado"].value = "";
  };

  return (
    <div>
      <div>
        <h1>Lista de dados</h1>
        {user.map((use) => (
          <ol key={use.id}>
            <li>
              NOME:{" "}
              {id === use.id ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleValue}
                />
              ) : (
                use.name
              )}{" "}
            </li>
            <li>SOBRE NOME: {" "}
            {id === use.id ? (
                <input
                  type="text"
                  id="sobrenome"
                  name="sobrenome"
                  value={form.sobrenome}
                  onChange={handleValue}
                />
              ) : (
                use.sobrenome
              )}{" "}
            </li>
            <li>TELEFONE: {" "}
            {id === use.id ? (
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleValue}
                />
              ) : (
                use.phone
              )}{" "}
            </li>
              <li>CIDADE: {" "}
              {id === use.id ? (
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleValue}
                />
              ) : (
                use.cidade
              )}{" "}
              </li>
              <li>ESTADO: {" "}
                { id === use.id ? (
                  <input
                    type="text"
                    id="estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleValue}
                  />
                ) : (
                  use.estado
                )}{" "}
              </li>
            <li>
              {id === use.id ? (
                <button onClick={() => PutUser(use.id)}>Salvar</button>
              ) : (
                <button onClick={() => Edite(use)}>Editar</button>
              )}

              <button onClick={() => GetDeletar(use.id)}>Excluir</button>
            </li>
          </ol>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmite}>
          <label htmlFor="name">Nome: </label>
          <input type="text" id="name" name="name" /> <br />

          <label htmlFor="sobrenome"> SobreNome: </label>
          <input type="text" id="sobrenome" name="sobrenome" /> <br />

          <label htmlFor="phone"> Telefone: </label>
          <input type="text" id="phone" name="phone" /> <br />

          <label htmlFor="cidade"> Cidade: </label>
          <input type="text" id="cidade" name="cidade" /> <br />

          <label htmlFor="estado"> Estado: </label>
          <input type="text" id="estado" name="estado" /> <br />
          <button>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
