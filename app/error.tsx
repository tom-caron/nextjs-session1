"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container">
      <h1>Oups — quelque chose s’est mal passé</h1>

      <p className="error-message">{error.message}</p>

      <button onClick={() => reset()} className="retry-button">
        Réessayer
      </button>
    </div>
  );
}