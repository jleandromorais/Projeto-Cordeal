// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
// IMPORTANTE: Adicione as importações do Auth e Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// (O getAnalytics é opcional, mas vamos manter o que você colou)
import { getAnalytics } from "firebase/analytics";

// Suas chaves corretas que você acabou de colar
const firebaseConfig = {
  apiKey: "AIzaSyDsCC1NRCBkdLs8Upx9E-lKd0zmGfVPAgw",
  authDomain: "projeto-cordeal.firebaseapp.com",
  projectId: "projeto-cordeal",
  storageBucket: "projeto-cordeal.firebasestorage.app",
  messagingSenderId: "1062964883330",
  appId: "1:1062964883330:web:27306be528073c037e699b",
  measurementId: "G-KM66MHT8HY"
};

// Initialize Firebase
// ... (teus imports)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ADICIONA 'export' AQUI:
export const analytics = getAnalytics(app); 

export { auth, db };