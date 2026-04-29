import { useState } from "react";
import { criarSolicitacao } from "../services/requests";

export default function NovaSolicitacao({ user }) {
  const [nome, setNome] = useState("");
  const [docs, setDocs] = useState([]);

  function addDoc() {
    setDocs([
      ...docs,
      { tipo: "", destino: "", prioridade: "normal", status: "pendente" }
    ]);
  }

  function updateDoc(i, field, value) {
    const novos = [...docs];
    novos[i] = { ...novos[i], [field]: value };
    setDocs(novos);
  }

  async function salvar() {
    if (!nome || docs.length === 0) {
      alert("Preencha tudo");
      return;
    }

    await criarSolicitacao({
      nome,
      user_id: user.uid,
      status: "pendente",
      created_at: new Date(),
      documentos: docs
    });

    alert("Salvo!");
    setNome("");
    setDocs([]);
  }

  return (
    <div>
      <h2>Nova Solicitação</h2>

      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />

      {docs.map((d, i) => (
        <div key={i} className="card">
          <input placeholder="Tipo" onChange={e => updateDoc(i, "tipo", e.target.value)} />
          <input placeholder="Destino" onChange={e => updateDoc(i, "destino", e.target.value)} />
        </div>
      ))}

      <button onClick={addDoc}>+ Documento</button>
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}