import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(input).toString();
      setDisplay(result);
      setInput(result);
    } catch {
      setDisplay('Error');
      setInput('');
    }
  };

  const handleAdvancedOperation = (operation: string) => {
    try {
      let result;
      const currentValue = parseFloat(input);
      switch (operation) {
        case 'sqrt':
          result = Math.sqrt(currentValue);
          break;
        case 'pow':
          result = Math.pow(currentValue, 2);
          break;
        case 'percent':
          result = currentValue / 100;
          break;
        case 'log':
          result = Math.log(currentValue);
          break;
        case 'exp':
          result = Math.exp(currentValue);
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setInput(result.toString());
    } catch {
      setDisplay('Error');
      setInput('');
    }
  };

  const handleMemoryStore = () => {
    setMemory(parseFloat(display));
    console.log('Memory Stored:', parseFloat(display));
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setInput(memory.toString());
      setDisplay(memory.toString());
      console.log('Memory Recalled:', memory);
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
    console.log('Memory Cleared');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold dark:text-white">Calculator</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <input
          type="text"
          value={input}
          readOnly
          className="mb-2 w-full text-right text-2xl font-mono bg-gray-200 dark:bg-gray-700 p-2 rounded dark:text-white"
        />
        <div className="mb-4 text-right text-2xl font-mono dark:text-white">{display}</div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          {['4', '5', '6', '*'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          {['1', '2', '3', '-'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          {['0', '.', '=', '+'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => (item === '=' ? handleCalculate() : handleButtonClick(item))}
            >
              {item}
            </button>
          ))}
          <button className="bg-blue-500 dark:bg-blue-600 p-4 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => handleAdvancedOperation('sqrt')}>
            √
          </button>
          <button className="bg-blue-500 dark:bg-blue-600 p-4 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => handleAdvancedOperation('pow')}>
            x²
          </button>
          <button className="bg-blue-500 dark:bg-blue-600 p-4 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => handleAdvancedOperation('percent')}>
            %
          </button>
          <button className="bg-blue-500 dark:bg-blue-600 p-4 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => handleAdvancedOperation('log')}>
            log
          </button>
          <button className="bg-blue-500 dark:bg-blue-600 p-4 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => handleAdvancedOperation('exp')}>
            exp
          </button>
          <button className="bg-green-500 dark:bg-green-600 p-4 rounded text-white hover:bg-green-600 dark:hover:bg-green-700" onClick={handleMemoryStore}>
            MS
          </button>
          <button className="bg-green-500 dark:bg-green-600 p-4 rounded text-white hover:bg-green-600 dark:hover:bg-green-700" onClick={handleMemoryRecall}>
            MR
          </button>
          <button className="bg-green-500 dark:bg-green-600 p-4 rounded text-white hover:bg-green-600 dark:hover:bg-green-700" onClick={handleMemoryClear}>
            MC
          </button>
          {memory !== null && (
            <div className="col-span-4 mb-2 text-right text-xl font-mono text-gray-500 dark:text-gray-400">
              Memory: {memory}
            </div>
          )}
          <button className="col-span-4 bg-red-500 dark:bg-red-600 p-4 rounded text-white hover:bg-red-600 dark:hover:bg-red-700" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
