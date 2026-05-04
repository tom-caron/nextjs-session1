export default function Loading() {
  return (
    <div className="container">
      <h1>Fil d’actualité</h1>

      {[1, 2, 3].map((i) => (
        <div key={i} className="api-post-card">
          <div className="skeleton-title" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}