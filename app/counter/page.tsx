"use client";
// 🔵 Composant Client — "use client" doit être la PREMIÈRE ligne
// Ce composant sera hydraté dans le navigateur
import { useState } from "react";
export default function CounterPage() {
 const [count, setCount] = useState(0);
 return (
 <div>
    <h1>Compteur</h1>
    <p>Ce composant utilise useState — il doit être un Composant Client.</p>
    <div style={{ fontSize: "3rem", fontWeight: "bold", margin: "1rem 0" }}>{count}</div>
    <button onClick={() => setCount(count - 1)}>− Décrémenter</button>
    <button onClick={() => setCount(count + 1)}>+ Incrémenter</button>
    <button onClick={() => setCount(0)}>Réinitialiser</button>
</div>
    )};