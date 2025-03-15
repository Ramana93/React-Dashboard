import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize state from localStorage
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme
      ? JSON.parse(savedTheme)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply class to HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? (
        <FiSun size={24} className="text-yellow-400" />
      ) : (
        <FiMoon size={24} className="text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}
