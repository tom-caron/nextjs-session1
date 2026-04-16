import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container">
      <h1>À propos de LinkUp</h1>

      <p>
        LinkUp est une plateforme sociale moderne permettant de partager des idées,
        découvrir des profils et échanger autour du développement web et de la tech.
      </p>

      <h2>Notre équipe</h2>

      <div className="team">
        <div className="team-card">
          <h3>Alice Martin</h3>
          <p>Développeuse Full-Stack</p>
        </div>

        <div className="team-card">
          <h3>Bob Nguyen</h3>
          <p>Backend & DevOps</p>
        </div>

        <div className="team-card">
          <h3>Clara Dubois</h3>
          <p>UI/UX Designer</p>
        </div>
      </div>

      <Link href="/" className="back-link">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}