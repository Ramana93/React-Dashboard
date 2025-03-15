import { useState, useEffect } from 'react';

export default function QuickNotes() {
  const [notes, setNotes] = useState(
    localStorage.getItem('notes') || ''
  );

  useEffect(() => {
    const saveNotes = setTimeout(() => {
      localStorage.setItem('notes', notes);
    }, 500);

    return () => clearTimeout(saveNotes);
  }, [notes]);

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-48 bg-transparent border rounded-lg p-4 resize-none focus:outline-none"
        placeholder="Start typing your notes here..."
      />
      <div className="mt-2 text-sm text-gray-500">
        {notes.length} characters
      </div>
    </div>
  );
}