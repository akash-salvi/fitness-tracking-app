import { X, Zap } from "lucide-react"; // Added some icons
import React from "react";
import { moodOptions } from "./constants";

// Mock data generator (assuming it's defined above as in the original snippet)
export const generateWeekData = (baseSteps, baseCalories) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, index) => {
    const randomFactor = 0.7 + Math.random() * 0.6;
    const steps = Math.floor(baseSteps * randomFactor);
    const calories = Math.floor(baseCalories * randomFactor);
    const distance = +(steps / 1312.33558).toFixed(1); // Example conversion
    const heartRate = Math.floor(70 + Math.random() * 30);
    return {
      name: day,
      steps,
      calories,
      distance,
      heartRate,
      completed: index < 5 + Math.floor(Math.random() * 3), // Randomize completion slightly
      active: day === new Date().toLocaleDateString("en-US", { weekday: "short" }), // Highlight current day dynamically
    };
  });
};

export const ProgressCircle = ({
  value,
  max,
  color,
  size = 120,
  strokeWidth = 8,
  isDarkMode,
  isPulsing,
  children,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={isDarkMode ? "#374151" : "#e6e6e6"}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          className={`transition-all duration-1000 ease-out ${
            isPulsing && value >= max ? "animate-pulse" : ""
          }`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
};

export const MoodSelector = ({ data: { theme, setCurrentMood, setShowMoodSelector } }) => (
  <div
    className={`${theme.cardBg} ${theme.shadow} rounded-lg p-4 absolute z-20 right-0 mt-2 w-60 border ${theme.border} animate-fade-in-down`}
  >
    <h4 className={`text-sm font-medium ${theme.text} mb-3`}>How are you feeling today?</h4>
    <div className="grid grid-cols-3 gap-2">
      {moodOptions.map((mood) => (
        <button
          key={mood.id}
          onClick={() => {
            setCurrentMood(mood);
            setShowMoodSelector(false);
          }}
          className={`flex flex-col items-center p-2 rounded-lg ${theme.hover}`}
        >
          <span className="text-2xl mb-1">{mood.emoji}</span>
          <span className={`text-xs ${theme.subText} text-center`}>{mood.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export const Celebration = (isDarkMode) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-sm">
    <div className="text-center animate-celebrate">
      <div className="text-6xl mb-2">🎉</div>
      <div
        className={`text-2xl font-bold p-2 rounded ${
          isDarkMode ? "text-green-400 bg-gray-800" : "text-green-600 bg-white"
        } shadow-lg`}
      >
        Goal Reached! 🎉
      </div>
    </div>
  </div>
);

export const SmartTip = ({ data: { theme, isDarkMode, setShowTip } }) => (
  <div
    className={`fixed bottom-4 right-4 ${theme.cardBg} ${theme.shadow} p-4 rounded-lg max-w-xs animate-fade-in-up z-40 border ${theme.border}`}
  >
    <div className="flex">
      <div
        className={`p-2 rounded-full ${
          isDarkMode ? "bg-blue-900/40" : "bg-blue-100"
        } mr-3 flex-shrink-0`}
      >
        <Zap size={18} className={isDarkMode ? "text-blue-300" : "text-blue-600"} />
      </div>
      <div className="flex-1">
        <h4 className={`font-medium text-sm ${theme.text} mb-1`}>Smart Tip</h4>
        <p className={`text-xs ${theme.subText}`}>
          Your step count is higher in the mornings. Try scheduling demanding tasks later when you
          might have more energy!
        </p>
      </div>
      <button
        onClick={() => setShowTip(false)}
        className={`ml-2 ${theme.subText} hover:${theme.text} flex-shrink-0`}
      >
        <X size={16} />
      </button>
    </div>
  </div>
);
