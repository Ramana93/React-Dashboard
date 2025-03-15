import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-lg font-medium"
    >
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </motion.div>
  );
}