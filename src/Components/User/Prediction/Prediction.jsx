import React from 'react'

const Prediction = () => {
  return (
    <div>
        <div style={{width: '98%', margin: 'auto', justifyContent:'center'}}>
            <gradio-app src="https://abhicodes-t20i-cricket-score-predictor.hf.space"></gradio-app>
        </div>
        <div style={{width: '98%', margin: 'auto', justifyContent:'center'}}>
            <gradio-app src="https://abhicodes-icc-world-cup-score-predictor.hf.space"></gradio-app>
        </div>
    </div>
  )
}

export default Prediction