import Navbar from "../components/Navbar"; // adapte le chemin

export default function HomePage() {
  return (
    <div>
      <Navbar />           {/* ← Elle s’affiche ici */}
      <h1>Bienvenue sur la page d'accueil</h1>
      {/* Autres contenus */}
    </div>
  );
}
