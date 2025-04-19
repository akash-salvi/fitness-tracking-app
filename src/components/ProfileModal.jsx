import { Settings, TrendingUp, Trophy, X } from "lucide-react"; // Added some icons
import React from "react";

const ProfileModal = ({
  data: { theme, isDarkMode, streak, setShowProfile, setShowAchievements, toggleDarkMode },
}) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}
  >
    <div
      className={`${theme.cardBg} ${theme.text} p-6 rounded-xl max-w-md w-full ${theme.shadow} animate-fade-in-scale`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Profile</h3>
        <button
          onClick={() => setShowProfile(false)}
          className={`p-1 rounded-full ${theme.iconHover}`}
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div
          className={`h-24 w-24 rounded-full ${
            isDarkMode ? "bg-blue-600" : "bg-blue-500"
          } flex items-center justify-center text-white text-3xl font-bold mb-3 ring-4 ${
            isDarkMode ? "ring-blue-600/30" : "ring-blue-500/20"
          }`}
        >
          S
        </div>
        <h4 className="text-lg font-semibold">Shaggy</h4>
        <p className={`${theme.subText} text-sm`}>Premium Member ✨</p>
      </div>
      <div className="space-y-4">
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/70" : "bg-gray-100"}`}>
          <div className="flex items-center mb-2">
            <Trophy size={16} className={`mr-2 ${theme.accent}`} />
            <span className="font-medium">Achievements</span>
          </div>
          <p className={`text-sm ${theme.subText}`}>12 badges earned this month</p>
          <button
            onClick={() => {
              setShowProfile(false);
              setShowAchievements(true);
            }}
            className={`text-xs ${theme.accent} hover:underline mt-1`}
          >
            View All
          </button>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/70" : "bg-gray-100"}`}>
          <div className="flex items-center mb-2">
            <TrendingUp size={16} className={`mr-2 ${theme.accent}`} />
            <span className="font-medium">Stats</span>
          </div>
          <p className={`text-sm ${theme.subText}`}>Consistent for {streak} days</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/70" : "bg-gray-100"}`}>
          <div className="flex items-center mb-2">
            <Settings size={16} className={`mr-2 ${theme.accent}`} />
            <span className="font-medium">Preferences</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className={theme.subText}>Dark Mode</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDarkMode ? "bg-blue-600 focus:ring-blue-500" : "bg-gray-300 focus:ring-indigo-500"
              }`}
              aria-pressed={isDarkMode}
            >
              <span
                className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <button
        className={`w-full mt-6 py-2 rounded-md font-medium ${
          isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
        } transition-colors`}
        onClick={() => setShowProfile(false)}
      >
        Close
      </button>
    </div>
  </div>
);

export default ProfileModal;
