import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function criarNotificacao(userId, mensagem) {
  await addDoc(collection(db, "notifications"), {
    user_id: userId,
    mensagem,
    created_at: new Date()
  });
}