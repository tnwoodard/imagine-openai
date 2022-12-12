import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import './App.css';

function App() {
  // design a state for the input
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  // configuation will take the API key
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main min-h-screen flex flex-col bg-slate-100 text-black">
      <main className="container mx-auto px-6 pt-16 flex-1 text-center">
        <h1 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase mb-8">
          Imagine
        </h1>
        <h3 className="text-2xl md:text-4xl lg:text-6xl uppercase">
          Generate an Image Using Open AI
        </h3>
        <input
          className='app-input block w-full p-4 pl-2 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          type="text"
          placeholder='e.g. Defacement by Jean-Michel Basquiat'
          onChange={(e) => setPrompt(e.target.value)}
          />
        <button onClick={generateImage} class="bg-blue-500 hover:bg-pink-500 text-gray-100 font-bold hover:text-white py-2 px-4 border border-blue-500 hover:border-pink-500 rounded">
          Generate Image</button>
          {result.length > 0 ? (
            <img className="result-image block w-full" src={result} alt="result" />
            ) : (
            <></>
          )}
      </main>
    </div>
  );

}

export default App;
