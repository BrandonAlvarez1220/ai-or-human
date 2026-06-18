import Result from "./components/Result"
import {useState } from "react"
import axios from "axios"


function App() {
  const [visible,setVisible] = useState(false)
  const [text,setText] = useState("")
  const [error,setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{label: string, confidence: number} | null>(null)  // nuevo


  async function handleAnalyze() {
    if (text.trim() === '') {
      setError("Please enter some text before analyzing.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:8000/predict", {
        text: text
      })

      setResult(response.data)   // { label: "AI", confidence: 97.3 }
      setVisible(true)

    } catch (err) {
      setError("Error connecting to the API. Make sure the server is running.")
    } finally {
      setLoading(false)
    }
  }

  function handleClear(){
    setText("")
    setVisible(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100 text-center">AI Text Detector</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">
            Paste any text and find out if it was written by a human or AI.
          </p>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full h-48 bg-slate-800/60 text-slate-100 rounded-xl p-4 text-sm leading-relaxed resize-none outline-none border border-slate-700 focus:border-indigo-500 transition-colors placeholder-slate-500"
          placeholder="Paste your text here..."
          value={text}
          onChange={e => {
            setText(e.target.value)
            setError("") }}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-500 active:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
           onClick={handleAnalyze}
           disabled={loading}
           >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button className="px-6 bg-transparent text-slate-300 font-medium py-3 rounded-xl border border-slate-700 hover:bg-slate-800 hover:text-slate-100 transition-colors cursor-pointer"
           onClick={handleClear}>
            Clear
          </button>
        </div>

        {visible && result && <Result
        typeText={result.label}
        confidence={result.confidence}
        />
        }

      </div>
    </div>
  )
}

export default App