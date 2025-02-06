# File: src/components/ParabolaPointGame.jsx
import React, { useState, useRef } from 'react';

const ParabolaPointGame = () => {
  const [mode, setMode] = useState('learn');
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState([]);
  const [feedback, setFeedback] = useState('Ready to learn about parabolas?');
  const svgRef = useRef(null);

  const lessons = [
    {
      title: "Let's make a simple parabola!",
      points: [
        {x: 0, y: 0, message: "First, let's plot the starting point at (0,0)"},
        {x: 1, y: 1, message: "Next point is at (1,1)"},
        {x: 2, y: 4, message: "The next point is at (2,4)"},
        {x: 3, y: 9, message: "And finally (3,9). See how it curves?"}
      ]
    }
  ];

  const handleClick = (e) => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    
    const x = Math.round((rawX - 192) / 48);
    const y = -Math.round((rawY - 192) / 48);
    
    const currentTarget = lessons[0].points[step];
    const isCorrect = x === currentTarget.x && y === currentTarget.y;
    
    if (isCorrect) {
      const newPoints = [...points, { x: rawX, y: rawY }];
      setPoints(newPoints);
      setFeedback("Perfect! You found the right point! 🎯");
      
      if (step < lessons[0].points.length - 1) {
        setStep(step + 1);
      } else {
        setFeedback("Awesome! You've created a parabola! Each point follows y = x²");
      }
    } else {
      setFeedback(`Try again! We're looking for the point (${currentTarget.x}, ${currentTarget.y})`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Point by Point Parabola Builder 📈</h1>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {step < lessons[0].points.length ? lessons[0].points[step].message : "Great job!"}
            </h2>
          </div>

          <div className="relative bg-gray-100 rounded-lg">
            <svg
              ref={svgRef}
              className="w-96 h-96 cursor-crosshair"
              viewBox="0 0 384 384"
              onClick={handleClick}
            >
              {[...Array(9)].map((_, i) => (
                <React.Fragment key={`grid-${i}`}>
                  <line
                    x1={0}
                    y1={i * 48}
                    x2={384}
                    y2={i * 48}
                    stroke="#ddd"
                    strokeWidth="1"
                  />
                  <line
                    x1={i * 48}
                    y1={0}
                    x2={i * 48}
                    y2={384}
                    stroke="#ddd"
                    strokeWidth="1"
                  />
                </React.Fragment>
              ))}
              
              <line x1="0" y1="192" x2="384" y2="192" stroke="#666" strokeWidth="2"/>
              <line x1="192" y1="0" x2="192" y2="384" stroke="#666" strokeWidth="2"/>
              
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((num) => (
                <React.Fragment key={`num-${num}`}>
                  <text 
                    x={num * 48 + 192} 
                    y="208" 
                    textAnchor="middle" 
                    className="text-lg"
                  >
                    {num}
                  </text>
                  <text 
                    x="178" 
                    y={-num * 48 + 196} 
                    textAnchor="end"
                    className="text-lg"
                  >
                    {num}
                  </text>
                </React.Fragment>
              ))}
              
              {points.map((point, index) => (
                <React.Fragment key={`point-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={6}
                    fill="#22c55e"
                  />
                  {index > 0 && (
                    <line
                      x1={points[index - 1].x}
                      y1={points[index - 1].y}
                      x2={point.x}
                      y2={point.y}
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                  )}
                </React.Fragment>
              ))}
            </svg>
          </div>

          <div className="text-center mt-4">
            <p className="text-lg text-gray-700">{feedback}</p>
            {step === lessons[0].points.length && (
              <button
                onClick={() => {
                  setStep(0);
                  setPoints([]);
                  setFeedback("Let's try again!");
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParabolaPointGame;