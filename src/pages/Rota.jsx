import { useEffect, useState } from "react";
import { listarSolicitacoes, atualizarDocumento } from "../services/requests";
import { criarNotificacao } from "../services/notifications";

export default function Rota() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await listarSolicitacoes();
    setRequests(data);
  }

  async function entregar(req, index) {
    const novosDocs = [...req.documentos];

    novosDocs[index] = {
      ...novosDocs[index],
      status: "entregue"
    };

    await atualizarDocumento(req.id, novosDocs);

    await criarNotificacao(req.user_id, "Documento entregue");

    load();
  }

  return (
    <div>
      <h2>Em rota</h2>

      {requests.map(req => (
        <div key={req.id} className="card">
          <h4>{req.nome}</h4>

          {req.documentos.map((d, i) => (
            <div key={i}>
              {d.tipo} - {d.destino} - {d.status}

              {d.status !== "entregue" && (
                <button onClick={() => entregar(req, i)}>Entregar</button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}