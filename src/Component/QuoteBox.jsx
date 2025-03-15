import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

const QUOTE_APIS = [
  'https://api.quotable.io/random',
  'https://zenquotes.io/api/random',
  'https://type.fit/api/quotes'
];

export default function QuoteBox() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [loading, setLoading] = useState(true);

  const fetchSecureQuote = async (apiIndex = 0) => {
    try {
      setLoading(true);
      const response = await fetch(QUOTE_APIS[apiIndex], {
        referrerPolicy: 'strict-origin-when-cross-origin'
      });
      
      const data = await response.json();
      
      // Handle different API response formats
      const formattedQuote = QUOTE_APIS[apiIndex].includes('zenquotes') ? {
        content: data[0].q,
        author: data[0].a
      } : QUOTE_APIS[apiIndex].includes('type.fit') ? {
        content: data[Math.floor(Math.random() * data.length)].text,
        author: data[Math.floor(Math.random() * data.length)].author
      } : data;

      setQuote(formattedQuote);
    } catch (error) {
      if (apiIndex < QUOTE_APIS.length - 1) {
        await fetchSecureQuote(apiIndex + 1);
      } else {
        setQuote({
          content: "Learning is not attained by chance, it must be sought for with ardor.",
          author: "Abigail Adams"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecureQuote();
  }, []);

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Daily Inspiration</h2>
      <motion.div
        key={quote.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <p className="text-lg italic">"{quote.content}"</p>
        <p className="text-right font-medium">— {quote.author || 'Unknown'}</p>
      </motion.div>
      <button
        onClick={() => fetchSecureQuote()}
        className="w-full mt-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        <FiRefreshCw className="inline-block mr-2" />
        {loading ? 'Loading...' : 'New Quote'}
      </button>
    </div>
  );
}