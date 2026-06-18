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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white text-center">AI Text Detector</h1>
          <p className="text-gray-400 text-sm mt-1 text-center">
            Paste any text and find out if it was written by a human or AI.
          </p>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full mt-5 h-48 bg-gray-800 text-gray-100 rounded-xl p-4 text-sm resize-none outline-none border border-gray-700 focus:border-gray-500 transition-colors placeholder-gray-500"
          placeholder="Paste your text here..."
          value={text}
          onChange={e => {
            setText(e.target.value) 
            setError("") }}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Button */}
        <button className="mt-10 w-full bg-white text-gray-950 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
         onClick={handleAnalyze}
         disabled={loading}
         >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button className="mt-10 w-full bg-white text-gray-950 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
         onClick={handleClear}>
          Clear
        </button>

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