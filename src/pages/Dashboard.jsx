import { useEffect, useState } from "react";
import { listarSolicitacoes } from "../services/requests";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await listarSolicitacoes();
    setRequests(data);
  }

  const pendentes = requests.filter(r => r.status === "pendente");

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Pendentes: {pendentes.length}</h3>

      {pendentes.map(r => (
        <div className="card" key={r.id}>
          {r.nome} - {r.documentos.length} docs
        </div>
      ))}
    </div>
  );
}