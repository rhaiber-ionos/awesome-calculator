import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState<number | null>(null);

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
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setInput(memory.toString());
      setDisplay(memory.toString());
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <input
          type="text"
          value={input}
          readOnly
          className="mb-2 w-full text-right text-2xl font-mono bg-gray-200 p-2 rounded"
        />
        <div className="mb-4 text-right text-2xl font-mono">{display}</div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 p-4 rounded"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          {['4', '5', '6', '*'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 p-4 rounded"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          {['1', '2', '3', '-'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 p-4 rounded"
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          {['0', '.', '=', '+'].map((item) => (
            <button
              key={item}
              className="bg-gray-200 p-4 rounded"
              onClick={() => (item === '=' ? handleCalculate() : handleButtonClick(item))}
            >
              {item}
            </button>
          ))}
          <button className="bg-blue-500 p-4 rounded text-white" onClick={() => handleAdvancedOperation('sqrt')}>
            √
          </button>
          <button className="bg-blue-500 p-4 rounded text-white" onClick={() => handleAdvancedOperation('pow')}>
            x²
          </button>
          <button className="bg-blue-500 p-4 rounded text-white" onClick={() => handleAdvancedOperation('percent')}>
            %
          </button>
          <button className="bg-blue-500 p-4 rounded text-white" onClick={() => handleAdvancedOperation('log')}>
            log
          </button>
          <button className="bg-blue-500 p-4 rounded text-white" onClick={() => handleAdvancedOperation('exp')}>
            exp
          </button>
          <button className="bg-green-500 p-4 rounded text-white" onClick={handleMemoryStore}>
            MS
          </button>
          <button className="bg-green-500 p-4 rounded text-white" onClick={handleMemoryRecall}>
            MR
          </button>
          <button className="bg-green-500 p-4 rounded text-white" onClick={handleMemoryClear}>
            MC
          </button>
          <button className="col-span-4 bg-red-500 p-4 rounded text-white" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
