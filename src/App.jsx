import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NovaSolicitacao from "./pages/NovaSolicitacao";
import Rota from "./pages/Rota";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  if (!user) return <Login setUser={setUser} />;

  return (
    <div className="container">
      <h1>Sistema Contábil</h1>

      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("nova")}>Nova</button>
      <button onClick={() => setPage("rota")}>Rota</button>

      {page === "dashboard" && <Dashboard />}
      {page === "nova" && <NovaSolicitacao user={user} />}
      {page === "rota" && <Rota />}
    </div>
  );
}