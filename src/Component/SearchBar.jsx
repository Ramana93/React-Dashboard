import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.startsWith('!g ')) {
      window.open(`https://google.com/search?q=${searchQuery.slice(3)}`);
    } else if (searchQuery.startsWith('!yt ')) {
      window.open(`https://youtube.com/results?search_query=${searchQuery.slice(4)}`);
    } else {
      window.open(`https://google.com/search?q=${searchQuery}`);
    }
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Search</h2>
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="!g Search Google, !yt Search YouTube"
        />
        <button type="submit" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          🔍
        </button>
      </div>
    </form>
  );
}