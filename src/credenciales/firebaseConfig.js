import { initializeApp } from 'firebase/app';
// importamos unicamente firestore (ya no usamos storage por el cobro)
import { getFirestore } from 'firebase/firestore';

// =========================================================
// reto 1: credenciales de firebase
// =========================================================
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// =========================================================

const app = initializeApp(firebaseConfig);

// inicializamos y exportamos firestore
export const db = getFirestore(app);