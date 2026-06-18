
interface Prediction{
    typeText: string,
    confidence: number
}

function Result({typeText,confidence}: Prediction){
    const isAI = typeText.toLowerCase().includes("ai")

    const accent = isAI ? "text-amber-400" : "text-emerald-400"
    const barColor = isAI ? "bg-amber-400" : "bg-emerald-400"

    return(
      <div className="w-full bg-slate-800/60 rounded-2xl p-6 border border-slate-700 mt-6">

        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Result</span>
          <h3 className={`text-lg font-bold ${accent}`}>{typeText}</h3>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Confidence</span>
            <span className="text-slate-200 font-medium">{confidence}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(Math.max(confidence, 0), 100)}%` }}
            />
          </div>
        </div>

      </div>
    )
}

export default Result
