import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login() {
    try {
      const res = await signInWithEmailAndPassword(auth, email, senha);
      setUser(res.user);
    } catch {
      alert("Erro no login");
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
      <br />

      <button onClick={login}>Entrar</button>
    </div>
  );
}