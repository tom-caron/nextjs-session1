"use client";

import { useState } from "react";

type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  createdAt: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
    const data = await res.json();

    setResults(data.posts);
    setLoading(false);
  }

  return (
    <div className="search-wrapper">
      <input
        type="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher..."
        className="search-input"
      />

      {query && (
        <div className="search-results">
          {loading && <p>Recherche...</p>}

          {!loading && results.length === 0 && <p>Aucun résultat</p>}

          {!loading &&
            results.map((post) => (
              <div key={post.id} className="search-result-item">
                <strong>{post.author}</strong>
                <p>{post.content}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}