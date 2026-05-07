export default function Loading() {
  return (
    <div className="container">
      <div className="skeleton skeleton-post-title" />

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="skeleton skeleton-post-line"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}

      <div className="comment-form">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line short" />
      </div>
    </div>
  );
}
