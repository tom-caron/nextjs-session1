export default function Loading() {
  return (
    <div className="container">
      <h1>Explorer</h1>

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="user-card">
          <div className="user-row">
            <div style={{ flex: 1 }}>
              <div className="skeleton-user-name" />
              <div className="skeleton-user-line medium" />
              <div className="skeleton-user-line long" />
              <div className="skeleton-user-line short" />
            </div>

            <div className="skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  );
}