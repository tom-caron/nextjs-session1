"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container">
      <h1>Post introuvable</h1>

      <p className="error-message">
        {error.message || "Une erreur est survenue."}
      </p>

      <div className="error-actions">
        <button onClick={() => reset()} className="retry-button">
          Réessayer
        </button>

        <Link href="/" className="back-link">
          ← Retour au fil
        </Link>
      </div>
    </div>
  );
}
