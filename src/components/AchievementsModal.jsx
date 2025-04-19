import {
  Activity,
  Droplet,
  Dumbbell,
  Flame,
  Heart,
  Moon as MoonIcon,
  Trophy,
  Utensils,
  X,
} from "lucide-react"; // Added some icons
import React from "react";

const AchievementsModal = ({ data: { streak, theme, isDarkMode, setShowAchievements } }) => {
  const achievements = [
    {
      icon: <Flame size={20} />,
      name: "Streak Master",
      description: `${streak} day streak`,
      progress: Math.min((streak / 7) * 100, 100),
    }, // Dynamic progress
    {
      icon: <Activity size={20} />,
      name: "Step Champion",
      description: "50,000 steps weekly",
      progress: 85,
    },
    {
      icon: <Droplet size={20} />,
      name: "Hydration Hero",
      description: "8 glasses daily for a week",
      progress: 62,
    },
    {
      icon: <Dumbbell size={20} />,
      name: "Strength Builder",
      description: "10 strength workouts",
      progress: 40,
    },
    {
      icon: <Heart size={20} />,
      name: "Heart Healthy",
      description: "5 cardio sessions",
      progress: 80,
    },
    {
      icon: <Trophy size={20} />,
      name: "Goal Crusher",
      description: "Complete 3 weekly goals",
      progress: 70,
    },
    {
      icon: <MoonIcon size={20} />,
      name: "Sleep Savvy",
      description: "Avg. 7+ hours sleep",
      progress: 90,
    },
    {
      icon: <Utensils size={20} />,
      name: "Nutrition Nut",
      description: "Log meals for 7 days",
      progress: 30,
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}
    >
      <div
        className={`${theme.cardBg} ${theme.text} p-6 rounded-xl max-w-lg w-full ${theme.shadow} max-h-[90vh] overflow-y-auto animate-fade-in-scale`}
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-inherit pt-2 pb-4 -mt-2 z-10">
          <h3 className="text-xl font-bold">Your Achievements</h3>
          <button
            onClick={() => setShowAchievements(false)}
            className={`p-1 rounded-full ${theme.iconHover}`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                isDarkMode ? "bg-gray-700/70" : "bg-gray-100"
              } flex flex-col items-center text-center transition-transform hover:scale-105`}
            >
              <div
                className={`p-3 rounded-full ${isDarkMode ? "bg-blue-600/30" : "bg-blue-100"} ${
                  theme.accent
                } mb-2`}
              >
                {achievement.icon}
              </div>
              <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
              <p className={`text-xs ${theme.subText} mb-2 h-8`}>{achievement.description}</p>
              {/* Fixed height */}
              <div className={`w-full ${theme.progressBg} rounded-full h-1.5 mt-auto`}>
                <div
                  className="h-1.5 rounded-full bg-blue-600"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <span className={`text-xs ${theme.subText} mt-1`}>{achievement.progress}%</span>
            </div>
          ))}
        </div>
        <button
          className={`w-full mt-6 py-2 rounded-md font-medium ${
            isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
          } transition-colors`}
          onClick={() => setShowAchievements(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AchievementsModal;
