
interface Prediction{
    typeText: string,
    confidence: number
}

//AI Generated
//Human Written

function Result({typeText,confidence}: Prediction){
    return(
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-800 mt-7">
        
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white text-center">{typeText}</h3>
          <p className="text-center text-white font-bold mt-3">Confidence: {confidence}%</p>
        </div>

        </div>
    )
}

export default Result