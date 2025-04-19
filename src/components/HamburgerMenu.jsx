import { Moon, Music, Settings, Trophy, User } from "lucide-react"; // Added some icons
import React from "react";

const HamburgerMenu = ({
  data: { theme, isDarkMode, setShowProfile, setIsMenuOpen, setShowAchievements, toggleDarkMode },
}) => (
  <div
    className={`absolute left-0 top-16 w-64 ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden z-30 ml-8 mt-4 border ${theme.menuBorder} animate-slide-in-left md:hidden`}
  >
    <div className={`p-4 border-b ${theme.border}`}>
      <div className="flex items-center space-x-3">
        <div
          className={`${
            isDarkMode ? "bg-blue-600" : "bg-blue-500"
          } h-10 w-10 rounded-full flex items-center justify-center text-white font-bold`}
        >
          S
        </div>
        <div>
          <h3 className={`font-medium ${theme.text}`}>Shaggy</h3>
          <p className={`text-xs ${theme.subText}`}>Premium Member ✨</p>
        </div>
      </div>
    </div>
    <nav>
      <button
        onClick={() => {
          setShowProfile(true);
          setIsMenuOpen(false);
        }}
        className={`w-full flex items-center p-3 ${theme.hover} transition-colors`}
      >
        <User size={18} className={`mr-3 ${theme.subText}`} />
        <span className={theme.text}>Profile</span>
      </button>
      <button
        onClick={() => {
          setShowAchievements(true);
          setIsMenuOpen(false);
        }}
        className={`w-full flex items-center p-3 ${theme.hover} transition-colors`}
      >
        <Trophy size={18} className={`mr-3 ${theme.subText}`} />
        <span className={theme.text}>Achievements</span>
      </button>
      <button className={`w-full flex items-center p-3 ${theme.hover} transition-colors`}>
        <Settings size={18} className={`mr-3 ${theme.subText}`} />
        <span className={theme.text}>Settings</span>
      </button>
      <button className={`w-full flex items-center p-3 ${theme.hover} transition-colors`}>
        <Music size={18} className={`mr-3 ${theme.subText}`} />
        <span className={theme.text}>Workout Music</span>
      </button>
    </nav>
    <div className={`border-t ${theme.border} p-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Moon size={18} className={`mr-3 ${theme.subText}`} />
          <span className={theme.text}>Dark Mode</span>
        </div>
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
);

export default HamburgerMenu;
