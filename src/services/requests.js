import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

export async function criarSolicitacao(data) {
  return await addDoc(collection(db, "requests"), data);
}

export async function listarSolicitacoes() {
  const snapshot = await getDocs(collection(db, "requests"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function atualizarDocumento(reqId, documentos) {
  const ref = doc(db, "requests", reqId);
  await updateDoc(ref, { documentos });
}