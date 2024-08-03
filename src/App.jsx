import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css'; 

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%&*";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-5 bg-white rounded-lg shadow-md text-blue-500">
      <h1 className="text-xl font-bold mb-4 text-blue-600">Password Generator</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Length: {length}</label>
        <input
          type="range"
          min={8}
          max={50}
          value={length}
          className="w-full"
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={number}
            className="mr-2"
            onChange={() => setNumber(prev => !prev)}
          />
          Number Allowed
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={character}
            className="mr-2"
            onChange={() => setChar(prev => !prev)}
          />
          Character Allowed
        </label>
      </div>
    </div>
  );
}

export default App;
