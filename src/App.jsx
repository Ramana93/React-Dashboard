// Add these imports
import Greeting from './Component/Greeting';
import TimeDisplay from './Component/TimeDisplay';
import QuickNotes from './Component/QuickNotes';
import SearchBar from './Component/SearchBar';
import QuoteBox from './Component/QuoteBox';
import TodoList from './Component/TodoList';
import WeatherCard from './Component/WeatherCard';
import ThemeToggle from './Component/ThemeToggle';


import { useState } from 'react';

function App() {
  return (
    <div className="min-h-screen p-8 transition-theme duration-300">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <Greeting />
              <TimeDisplay />
            </div>
            <ThemeToggle />
          </header>

          {/* Rest of your component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <WeatherCard />
            <TodoList />
            <QuickNotes />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuoteBox />
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;  // Correct export placement