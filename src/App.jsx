import {
  Activity,
  Bell,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Moon,
  Moon as MoonIcon,
  Plus,
  Sun,
  Trophy,
  User,
  Zap,
} from "lucide-react"; // Added some icons
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dailyWorkoutPlan,
  goalTypes,
  mealData,
  notifications,
  sleepData,
  streakData,
} from "./utils/constants";
import {
  Celebration,
  generateWeekData,
  MoodSelector,
  ProgressCircle,
  SmartTip,
} from "./utils/helpers";

import AchievementsModal from "./components/AchievementsModal";
import HamburgerMenu from "./components/HamburgerMenu";
import NotificationsPanel from "./components/NotificationsPanel";
import ProfileModal from "./components/ProfileModal";
import WorkoutModal from "./components/WorkoutModal";

export default function FitnessFreak() {
  const [activeTab, setActiveTab] = useState("overview");
  const [weekData, setWeekData] = useState(generateWeekData(8500, 320));
  const [todaySteps, setTodaySteps] = useState(7823);
  const [caloriesBurned, setCaloriesBurned] = useState(285);
  const [stepGoal, setStepGoal] = useState(10000);
  const [calorieGoal, setCalorieGoal] = useState(350);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeek, setCurrentWeek] = useState("This Week");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length); // Calculate dynamically
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [currentView, setCurrentView] = useState("daily"); // Used? Seems unused.
  const [waterIntake, setWaterIntake] = useState(4);
  const [maxWaterIntake, setMaxWaterIntake] = useState(8);
  const [showWaterAnimation, setShowWaterAnimation] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [temperature, setTemperature] = useState("28°C"); // Example temperature
  const [weather, setWeather] = useState("Partly Cloudy"); // Example weather
  const [selectedMetric, setSelectedMetric] = useState("steps");
  const [streak, setStreak] = useState(streakData.filter((d) => d.completed).length); // Calculate dynamically
  const [currentMood, setCurrentMood] = useState(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [sleepHours, setSleepHours] = useState(sleepData[3].hours); // Example sleep hours for today
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation on load
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    const tipTimer = setTimeout(() => {
      setShowTip(true);
      const hideTipTimer = setTimeout(() => setShowTip(false), 8000);
      return () => clearTimeout(hideTipTimer);
    }, 2000);

    // Set today's date dynamically
    // (Can implement logic here if needed, but keeping the hardcoded one for now)

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(tipTimer);
    };
  }, []);

  // Simulate steps increasing in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setTodaySteps((prev) => {
        const newValue = prev + Math.floor(Math.random() * 10);
        if (newValue >= stepGoal && prev < stepGoal) {
          setIsPulsing(true);
          setShowCelebration(true);
          setTimeout(() => {
            setIsPulsing(false);
            setShowCelebration(false);
          }, 3000);
        }
        return Math.min(newValue, stepGoal + 2000); // Cap steps slightly above goal
      });
      setCaloriesBurned((prev) =>
        Math.min(prev + Math.floor(Math.random() * 0.5), calorieGoal + 100)
      ); // Cap calories
      setHeartRate((prev) => {
        const change = (Math.random() - 0.5) * 2; // More realistic fluctuation
        return Math.max(60, Math.min(120, Math.round(prev + change))); // Wider range
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [stepGoal, calorieGoal]); // Add calorieGoal dependency

  // Update goal progress dynamically (Example for steps goal)
  useEffect(() => {
    const stepsGoalIndex = goalTypes.findIndex((g) => g.name === "Daily Steps");
    if (stepsGoalIndex !== -1) {
      goalTypes[stepsGoalIndex].progress = Math.min(Math.round((todaySteps / stepGoal) * 100), 100);
    }
    // Add similar logic for other dynamic goals if needed (e.g., water, workouts)
  }, [todaySteps, stepGoal]);

  // Color settings based on theme
  const theme = isDarkMode
    ? {
        bg: "bg-gray-900",
        cardBg: "bg-gray-800",
        text: "text-gray-100",
        subText: "text-gray-300",
        border: "border-gray-700",
        accent: "text-blue-400",
        success: "text-green-400",
        warning: "text-yellow-400",
        tooltipBg: "#374151",
        chartGrid: "#4B5563",
        shadow: "shadow-lg shadow-gray-900/50",
        hover: "hover:bg-gray-700",
        tableBorder: "divide-gray-700",
        tableHover: "hover:bg-gray-700/50",
        iconBg: "bg-gray-700",
        iconHover: "hover:bg-gray-600",
        tabActiveBorder: "border-blue-400",
        tabInactiveText: "text-gray-400",
        tabHoverText: "hover:text-gray-200",
        progressBg: "bg-gray-700",
        inputBg: "bg-gray-700",
        inputBorder: "border-gray-600",
      }
    : {
        bg: "bg-gray-50",
        cardBg: "bg-white",
        text: "text-gray-800",
        subText: "text-gray-500",
        border: "border-gray-200",
        accent: "text-blue-600",
        success: "text-green-600",
        warning: "text-yellow-500",
        tooltipBg: "#ffffff",
        chartGrid: "#e5e7eb",
        shadow: "shadow-lg shadow-gray-200/50",
        hover: "hover:bg-gray-100",
        tableBorder: "divide-gray-200",
        tableHover: "hover:bg-gray-50",
        iconBg: "bg-gray-200",
        iconHover: "hover:bg-gray-300",
        tabActiveBorder: "border-blue-600",
        tabInactiveText: "text-gray-500",
        tabHoverText: "hover:text-gray-700",
        progressBg: "bg-gray-200",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
      };

  const COLORS = isDarkMode
    ? ["#6366f1", "#22c55e", "#eab308", "#ec4899", "#3b82f6", "#06b6d4"] // Added cyan
    : ["#4f46e5", "#16a34a", "#ca8a04", "#db2777", "#2563eb", "#0891b2"]; // Added cyan

  const stepProgressColor =
    todaySteps >= stepGoal
      ? isDarkMode
        ? "#22c55e"
        : "#16a34a"
      : isDarkMode
      ? "#3b82f6"
      : "#2563eb";

  const calorieProgressColor =
    caloriesBurned >= calorieGoal
      ? isDarkMode
        ? "#22c55e"
        : "#16a34a"
      : isDarkMode
      ? "#f59e0b"
      : "#ea580c";

  const waterProgressColor = isDarkMode ? "#38bdf8" : "#0ea5e9";

  // --- Utility Functions ---
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const changeWeek = (direction) => {
    if (direction === "prev") {
      setCurrentWeek("Last Week");
      setWeekData(generateWeekData(7200, 280));
    } else {
      setCurrentWeek("This Week");
      setWeekData(generateWeekData(8500, 320));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    // Add class to body for global styles if needed
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Add effect to set dark mode on initial load based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const markAllAsRead = () => {
    // In a real app, update notification state here
    notifications.forEach((n) => (n.read = true));
    setUnreadCount(0);
    // Optionally close the panel after marking read
    //setShowNotifications(false);
  };

  const addWater = () => {
    if (waterIntake < maxWaterIntake) {
      setShowWaterAnimation(true);
      setTimeout(() => {
        setWaterIntake((prev) => prev + 1);
        setShowWaterAnimation(false);
        // Update hydration goal progress
        const hydrationGoalIndex = goalTypes.findIndex((g) => g.name === "Hydration");
        if (hydrationGoalIndex !== -1) {
          goalTypes[hydrationGoalIndex].progress = Math.min(
            Math.round(((waterIntake + 1) / maxWaterIntake) * 100),
            100
          );
        }
      }, 300); // Shorter animation time
    }
  };

  const getTotalNutrients = () => {
    return mealData.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };
  const totalNutrients = getTotalNutrients();

  // --- Main Render ---
  return (
    // Added wrapper div for background and padding
    <div className={`min-h-screen ${theme.bg} p-4 md:p-8 transition-colors duration-300 font-sans`}>
      {/* Modals Rendered First */}
      {showWorkoutModal && <WorkoutModal data={{ theme, isDarkMode, setShowWorkoutModal }} />}
      {showProfile && (
        <ProfileModal
          data={{ theme, isDarkMode, streak, setShowProfile, setShowAchievements, toggleDarkMode }}
        />
      )}
      {showAchievements && (
        <AchievementsModal data={{ streak, theme, isDarkMode, setShowAchievements }} />
      )}
      {showCelebration && <Celebration isDarkMode={isDarkMode} />}
      {showTip && <SmartTip data={{ theme, isDarkMode, setShowTip }} />}
      {/* Main Dashboard Card */}
      <div
        className={`${theme.cardBg} ${
          theme.shadow
        } rounded-lg p-4 md:p-6 max-w-5xl mx-auto transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } border ${theme.border}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b ${theme.border}">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${theme.iconBg} p-2 rounded-lg ${theme.text} md:hidden ${theme.iconHover} transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div
              className={`${
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              } p-2 rounded-lg text-white shadow-md`}
            >
              <Activity size={24} />
            </div>
            <h1 className={`text-xl md:text-2xl font-bold ${theme.text}`}>FitnessFreak Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <button
                onClick={() => {
                  setShowMoodSelector(!showMoodSelector);
                  if (showNotifications) setShowNotifications(false);
                }}
                className={`p-2 rounded-full ${theme.hover} relative transition-colors`}
              >
                {currentMood ? (
                  <span className="text-xl">{currentMood.emoji}</span>
                ) : (
                  <span className={`text-xl ${theme.subText}`}>🤔</span>
                )}
                {/* Default thinking face */}
              </button>
              {showMoodSelector && (
                <MoodSelector data={{ theme, setCurrentMood, setShowMoodSelector }} />
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (showMoodSelector) setShowMoodSelector(false);
                }}
                className={`p-2 rounded-full ${theme.hover} relative transition-colors`}
              >
                <Bell size={20} className={theme.text} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-inherit">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <NotificationsPanel data={{ theme, isDarkMode, markAllAsRead, unreadCount }} />
              )}
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${theme.hover} transition-colors`}
            >
              {isDarkMode ? (
                <Sun size={20} className={theme.text} />
              ) : (
                <Moon size={20} className={theme.text} />
              )}
            </button>
            <button
              onClick={() => setShowProfile(true)}
              className={`${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              } px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors hidden md:flex`}
            >
              <User size={16} className={`mr-1.5 ${theme.subText}`} />
              <span className={theme.text}>Shaggy</span>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <HamburgerMenu
            data={{
              theme,
              isDarkMode,
              setShowProfile,
              setIsMenuOpen,
              setShowAchievements,
              toggleDarkMode,
            }}
          />
        )}
        {/* Date and Weather Section */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div
            className={`flex items-center ${
              isDarkMode ? "bg-gray-700/70" : "bg-gray-100"
            } px-4 py-2 rounded-lg`}
          >
            <Calendar size={18} className={`mr-2 ${theme.subText}`} />
            <span className={`text-sm font-medium ${theme.text}`}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {/* Dynamic Date */}
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center ${
                isDarkMode ? "bg-gray-700/70" : "bg-gray-100"
              } rounded-lg overflow-hidden border ${theme.border}`}
            >
              {streakData.map((item, index) => (
                <div
                  key={index}
                  title={`Day ${index + 1}: ${item.completed ? "Completed" : "Pending"}`}
                  className={`px-2 py-1.5 flex flex-col items-center justify-center border-r ${
                    theme.border
                  } last:border-r-0 transition-colors ${
                    item.completed
                      ? isDarkMode
                        ? "bg-green-600/20 text-green-400"
                        : "bg-green-100 text-green-700"
                      : theme.subText
                  }`}
                >
                  <span className="text-xs font-semibold">{item.day}</span>
                  {item.completed && <Check size={12} className="mt-0.5" />}
                </div>
              ))}
            </div>
            <div
              className={`flex items-center ${
                isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800"
              } px-3 py-2 rounded-lg font-medium`}
            >
              <Flame size={16} className="mr-1.5" />
              <span className="text-sm">{streak} Day Streak</span>
            </div>
          </div>

          <div
            className={`flex items-center ${
              isDarkMode ? "bg-gray-700/70" : "bg-gray-100"
            } px-4 py-2 rounded-lg`}
          >
            {/* Add weather icon based on 'weather' state */}
            <Sun size={18} className={`mr-2 ${theme.warning}`} />
            <span className={`text-sm font-medium ${theme.text}`}>{weather}</span>
            <span className={`mx-2 ${theme.subText}`}>|</span>
            <span className={`text-sm font-medium ${theme.text}`}>{temperature}</span>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className={`flex border-b ${theme.border} mb-6 overflow-x-auto scrollbar-hide`}>
          {["overview", "goals", "workouts", "nutrition", "sleep", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm capitalize border-b-2 transition-colors duration-200 whitespace-nowrap -mb-px ${
                activeTab === tab
                  ? `${theme.accent} ${theme.tabActiveBorder}`
                  : `${theme.tabInactiveText} border-transparent ${theme.tabHoverText}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="animate-fade-in">
          {/* Apply animation wrapper */}
          {activeTab === "overview" && (
            <div>
              {/* Key Metrics Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Steps Metric */}
                <div
                  className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border} flex flex-col transition-transform hover:scale-[1.02]`}
                >
                  <span className={`text-xs uppercase font-medium ${theme.subText} mb-1`}>
                    Steps
                  </span>
                  <div className="flex items-end justify-between mt-1">
                    <span className={`text-2xl font-bold ${theme.text}`}>
                      {formatNumber(todaySteps)}
                    </span>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        todaySteps >= stepGoal
                          ? isDarkMode
                            ? "bg-green-900/50 text-green-400"
                            : "bg-green-100 text-green-800"
                          : isDarkMode
                          ? "bg-blue-900/50 text-blue-300"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {Math.round((todaySteps / stepGoal) * 100)}%
                    </div>
                  </div>
                  <div className={`mt-2 w-full ${theme.progressBg} rounded-full h-1.5`}>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        todaySteps >= stepGoal ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${Math.min((todaySteps / stepGoal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                {/* Calories Metric */}
                <div
                  className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border} flex flex-col transition-transform hover:scale-[1.02]`}
                >
                  <span className={`text-xs uppercase font-medium ${theme.subText} mb-1`}>
                    Calories
                  </span>
                  <div className="flex items-end justify-between mt-1">
                    <span className={`text-2xl font-bold ${theme.text}`}>{caloriesBurned}</span>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        caloriesBurned >= calorieGoal
                          ? isDarkMode
                            ? "bg-green-900/50 text-green-400"
                            : "bg-green-100 text-green-800"
                          : isDarkMode
                          ? "bg-orange-900/50 text-orange-400"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {Math.round((caloriesBurned / calorieGoal) * 100)}%
                    </div>
                  </div>
                  <div className={`mt-2 w-full ${theme.progressBg} rounded-full h-1.5`}>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        caloriesBurned >= calorieGoal ? "bg-green-500" : "bg-orange-500"
                      }`}
                      style={{ width: `${Math.min((caloriesBurned / calorieGoal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                {/* Heart Rate Metric */}
                <div
                  className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border} flex flex-col transition-transform hover:scale-[1.02]`}
                >
                  <span className={`text-xs uppercase font-medium ${theme.subText} mb-1`}>
                    Heart Rate
                  </span>
                  <div className="flex items-end justify-between mt-1">
                    <span className={`text-2xl font-bold ${theme.text}`}>{heartRate}</span>
                    <div
                      className={`flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${
                        isDarkMode ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <Heart size={12} className="mr-1" /> BPM
                    </div>
                  </div>
                  <div className={`mt-2 w-full ${theme.progressBg} rounded-full h-1.5`}>
                    <div
                      className="h-1.5 rounded-full bg-red-500 transition-all duration-300"
                      style={{
                        width: `${Math.max(10, Math.min(((heartRate - 50) / 100) * 100, 100))}%`,
                      }}
                    ></div>
                    {/* Basic HR visualization */}
                  </div>
                </div>
                {/* Water Metric */}
                <div
                  className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border} flex flex-col transition-transform hover:scale-[1.02]`}
                >
                  <span className={`text-xs uppercase font-medium ${theme.subText} mb-1`}>
                    Water Intake
                  </span>
                  <div className="flex items-end justify-between mt-1">
                    <span className={`text-2xl font-bold ${theme.text} flex items-baseline`}>
                      {waterIntake}
                      <span className={`text-sm ml-1 ${theme.subText}`}>/ {maxWaterIntake} gl</span>
                    </span>
                    <button
                      onClick={addWater}
                      disabled={waterIntake >= maxWaterIntake}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isDarkMode
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      + Add
                    </button>
                  </div>
                  <div
                    className={`mt-2 w-full ${theme.progressBg} rounded-full h-1.5 overflow-hidden`}
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        showWaterAnimation ? "animate-pulse" : ""
                      }`}
                      style={{
                        width: `${Math.min((waterIntake / maxWaterIntake) * 100, 100)}%`,
                        backgroundColor: waterProgressColor,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Progress Circles Section (Column 1) */}
                <div
                  className={`${theme.cardBg} p-6 rounded-xl ${theme.shadow} border ${theme.border}`}
                >
                  <h2 className={`text-lg font-semibold mb-4 ${theme.text}`}>Today's Key Goals</h2>
                  <div className="flex flex-col md:flex-row justify-around items-center">
                    <div className="flex flex-col items-center mb-4 md:mb-0">
                      <ProgressCircle
                        value={todaySteps}
                        max={stepGoal}
                        color={stepProgressColor}
                        isDarkMode={isDarkMode}
                        isPulsing={isPulsing}
                      >
                        <p className={`text-2xl font-bold ${theme.text}`}>
                          {formatNumber(todaySteps)}
                        </p>
                        <p className={`${theme.subText} text-sm`}>steps</p>
                      </ProgressCircle>
                      <p className={`mt-2 ${theme.subText} text-sm`}>
                        Goal: {formatNumber(stepGoal)}
                      </p>
                      <p
                        className={`font-medium ${
                          todaySteps >= stepGoal ? theme.success : theme.accent
                        }`}
                      >
                        {todaySteps >= stepGoal
                          ? "Goal reached! 🎉"
                          : `${Math.floor((todaySteps / stepGoal) * 100)}% complete`}
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <ProgressCircle
                        value={caloriesBurned}
                        max={calorieGoal}
                        color={calorieProgressColor}
                        isDarkMode={isDarkMode}
                        isPulsing={isPulsing}
                      >
                        <p className={`text-2xl font-bold ${theme.text}`}>{caloriesBurned}</p>
                        <p className={`${theme.subText} text-sm`}>calories</p>
                      </ProgressCircle>
                      <p className={`mt-2 ${theme.subText} text-sm`}>Goal: {calorieGoal}</p>
                      <p
                        className={`font-medium ${
                          caloriesBurned >= calorieGoal ? theme.success : "text-orange-500"
                        }`}
                      >
                        {caloriesBurned >= calorieGoal
                          ? "Goal reached! 🔥"
                          : `${Math.floor((caloriesBurned / calorieGoal) * 100)}% complete`}
                      </p>
                    </div>
                  </div>
                  {/* Pro Tip moved outside circles */}
                  <div
                    className={`mt-6 ${
                      isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
                    } p-3 rounded-lg flex items-start border ${
                      isDarkMode ? "border-blue-800/50" : "border-blue-200"
                    }`}
                  >
                    <Zap
                      size={18}
                      className={`mr-2 mt-0.5 flex-shrink-0 ${
                        isDarkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    />
                    <p className={`${isDarkMode ? "text-blue-300" : "text-blue-700"} text-sm`}>
                      <span className="font-medium">Pro Tip:</span> Try short walking breaks every
                      hour to boost steps & energy!
                    </p>
                  </div>
                </div>

                {/* Metrics Chart Section (Column 2 & 3) */}
                <div
                  className={`${theme.cardBg} p-6 rounded-xl ${theme.shadow} border ${theme.border}`}
                >
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                    <h2 className={`text-lg font-semibold ${theme.text}`}>Weekly Metrics</h2>
                    <div className="flex">
                      <div
                        className={`rounded-lg overflow-hidden flex text-xs border ${theme.border} shadow-sm`}
                      >
                        {["steps", "calories", "heartRate"].map((metric) => (
                          <button
                            key={metric}
                            onClick={() => setSelectedMetric(metric)}
                            className={`px-3 py-1 font-medium transition-colors ${
                              selectedMetric === metric
                                ? metric === "steps"
                                  ? "bg-blue-500 text-white"
                                  : metric === "calories"
                                  ? "bg-orange-500 text-white"
                                  : "bg-red-500 text-white"
                                : `${
                                    isDarkMode
                                      ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                                      : "text-gray-600 bg-white hover:bg-gray-100"
                                  }`
                            }`}
                          >
                            {metric === "heartRate"
                              ? "Heart"
                              : metric.charAt(0).toUpperCase() + metric.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <button
                        onClick={() => changeWeek("prev")}
                        className={`p-1 rounded-full ${theme.hover} transition-colors`}
                        aria-label="Previous Week"
                      >
                        <ChevronLeft size={20} className={theme.text} />
                      </button>
                      <span className={`mx-2 font-medium ${theme.text} text-sm`}>
                        {currentWeek}
                      </span>
                      <button
                        onClick={() => changeWeek("next")}
                        className={`p-1 rounded-full ${theme.hover} transition-colors ${
                          currentWeek === "This Week" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={currentWeek === "This Week"}
                        aria-label="Next Week"
                      >
                        <ChevronRight size={20} className={theme.text} />
                      </button>
                    </div>
                    <div className={`text-xs ${theme.subText}`}>
                      {selectedMetric === "steps" &&
                        `Total: ${formatNumber(
                          weekData.reduce((sum, d) => sum + d.steps, 0)
                        )} steps`}
                      {selectedMetric === "calories" &&
                        `Total: ${formatNumber(
                          weekData.reduce((sum, d) => sum + d.calories, 0)
                        )} cal`}
                      {selectedMetric === "heartRate" &&
                        `Avg: ${Math.round(
                          weekData.reduce((sum, d) => sum + d.heartRate, 0) / weekData.length
                        )} BPM`}
                    </div>
                  </div>

                  <div className="h-64 mt-4">
                    {/* Added top margin */}
                    <ResponsiveContainer width="100%" height="100%">
                      {selectedMetric === "steps" ? (
                        <BarChart
                          data={weekData}
                          margin={{ top: 5, right: 5, left: -12, bottom: 5 }}
                        >
                          {/* Adjusted margins */}
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={theme.chartGrid}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.tooltipBg,
                              borderColor: theme.border,
                              borderRadius: "8px",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                            labelStyle={{
                              color: isDarkMode ? "#e5e7eb" : "#374151",
                              fontWeight: "bold",
                            }}
                            itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                            formatter={(value) => [`${formatNumber(value)} steps`, null]}
                            cursor={{
                              fill: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                              radius: 4,
                            }}
                          />
                          <Bar
                            dataKey="steps"
                            fill={isDarkMode ? "#3b82f6" : "#2563eb"}
                            animationDuration={1000}
                            radius={[4, 4, 0, 0]}
                            barSize={20}
                          >
                            {weekData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.active
                                    ? isDarkMode
                                      ? "#60a5fa"
                                      : "#3b82f6"
                                    : isDarkMode
                                    ? "#3b82f6"
                                    : "#2563eb"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : selectedMetric === "calories" ? (
                        <AreaChart
                          data={weekData}
                          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={theme.chartGrid}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.tooltipBg,
                              borderColor: theme.border,
                              borderRadius: "8px",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                            labelStyle={{
                              color: isDarkMode ? "#e5e7eb" : "#374151",
                              fontWeight: "bold",
                            }}
                            itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                            formatter={(value) => [`${value} cal`, null]}
                            cursor={{ stroke: theme.accent, strokeWidth: 1 }}
                          />
                          <defs>
                            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                              <stop
                                offset="5%"
                                stopColor={isDarkMode ? "#f97316" : "#ea580c"}
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor={isDarkMode ? "#f97316" : "#ea580c"}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="calories"
                            stroke={isDarkMode ? "#f97316" : "#ea580c"}
                            fillOpacity={1}
                            fill="url(#colorCalories)"
                            strokeWidth={2}
                            animationDuration={1000}
                            dot={{
                              stroke: isDarkMode ? "#f97316" : "#ea580c",
                              strokeWidth: 1,
                              r: 3,
                            }}
                            activeDot={{ r: 5 }}
                          />
                        </AreaChart>
                      ) : (
                        // heartRate
                        <LineChart
                          data={weekData}
                          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={theme.chartGrid}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            domain={["dataMin - 5", "dataMax + 5"]}
                            tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.tooltipBg,
                              borderColor: theme.border,
                              borderRadius: "8px",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                            labelStyle={{
                              color: isDarkMode ? "#e5e7eb" : "#374151",
                              fontWeight: "bold",
                            }}
                            itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                            formatter={(value) => [`${value} BPM`, null]}
                            cursor={{ stroke: theme.accent, strokeWidth: 1 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="heartRate"
                            stroke={isDarkMode ? "#ef4444" : "#dc2626"}
                            strokeWidth={2}
                            dot={{ fill: isDarkMode ? "#ef4444" : "#dc2626", r: 3 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                            animationDuration={1000}
                          />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* --- COMPLETION OF ORIGINAL SNIPPET --- */}
              {/* Activity Breakdown and Today's Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Activity Breakdown (Column 1) */}
                <div
                  className={`${theme.cardBg} p-6 rounded-xl ${theme.shadow} border ${theme.border} lg:col-span-1`}
                >
                  <h2 className={`text-lg font-semibold mb-4 ${theme.text}`}>Activity Breakdown</h2>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Walking", value: 45 },
                            { name: "Running", value: 20 },
                            { name: "Cycling", value: 15 },
                            { name: "Other", value: 20 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          animationDuration={1200}
                          labelLine={false}
                          /* label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => { const radius = innerRadius + (outerRadius - innerRadius) * 0.5; const x = cx + radius * Math.cos(-midAngle * Math.PI / 180); const y = cy + radius * Math.sin(-midAngle * Math.PI / 180); return (<text x={x} y={y} fill={isDarkMode ? '#fff' : '#000'} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>{`${(percent * 100).toFixed(0)}%`}</text>);}} */
                        >
                          {COLORS.slice(0, 4).map((color, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={color}
                              stroke={theme.cardBg}
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, ""]}
                          contentStyle={{
                            backgroundColor: theme.tooltipBg,
                            borderColor: theme.border,
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: theme.text }}
                          itemStyle={{ color: theme.text }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                    {[
                      { name: "Walking", value: 45, color: COLORS[0] },
                      { name: "Running", value: 20, color: COLORS[1] },
                      { name: "Cycling", value: 15, color: COLORS[2] },
                      { name: "Other", value: 20, color: COLORS[3] },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className={`text-xs ${theme.text}`}>
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Today's Schedule (Column 2 & 3) */}
                <div
                  className={`${theme.cardBg} p-6 rounded-xl ${theme.shadow} border ${theme.border} lg:col-span-2`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-lg font-semibold ${theme.text}`}>Today's Schedule</h2>
                    <button
                      onClick={() => setShowWorkoutModal(true)}
                      className={`text-xs flex items-center px-3 py-1.5 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white transition-colors shadow-sm`}
                    >
                      <Plus size={14} className="mr-1" /> Add Workout
                    </button>
                  </div>
                  {/* This is where the original code was cut off */}
                  <div className="space-y-3">
                    {dailyWorkoutPlan.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          theme.border
                        } ${
                          item.completed
                            ? isDarkMode
                              ? "bg-green-900/20 border-green-800/30"
                              : "bg-green-50 border-green-200"
                            : isDarkMode
                            ? "bg-gray-700/50"
                            : ""
                        } transition-colors`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`mr-3 p-1.5 rounded-full ${
                              item.completed
                                ? isDarkMode
                                  ? "bg-green-600/30"
                                  : "bg-green-100"
                                : isDarkMode
                                ? "bg-gray-600"
                                : "bg-gray-100"
                            } ${
                              item.completed
                                ? isDarkMode
                                  ? "text-green-400"
                                  : "text-green-600"
                                : theme.subText
                            }`}
                          >
                            {item.icon || <Activity size={16} />}
                          </div>
                          <div>
                            <p
                              className={`font-medium ${theme.text} ${
                                item.completed ? "line-through " + theme.subText : ""
                              }`}
                            >
                              {item.activity}
                            </p>
                            <p className={`text-xs ${theme.subText}`}>
                              {item.time} - {item.duration}
                            </p>
                          </div>
                        </div>
                        <div>
                          {item.completed ? (
                            <Check
                              size={20}
                              className={isDarkMode ? "text-green-400" : "text-green-600"}
                            />
                          ) : (
                            <button
                              className={`text-xs px-2 py-1 rounded ${
                                isDarkMode
                                  ? "bg-blue-600 hover:bg-blue-500"
                                  : "bg-blue-500 hover:bg-blue-600"
                              } text-white transition-colors`}
                            >
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Closing space-y-3 */}
                </div>
                {/* Closing Today's Schedule Card */}
              </div>
              {/* Closing Activity/Schedule Grid */}
            </div> /* Closing Overview Tab Div */
          )}
          {activeTab === "goals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goalTypes.map((goal) => (
                <div
                  key={goal.id}
                  className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border} flex flex-col`}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
                      } ${theme.accent}`}
                    >
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${theme.text}`}>{goal.name}</h3>
                      <p className={`text-xs ${theme.subText}`}>{goal.target}</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`text-xs font-medium ${
                          goal.progress >= 100 ? theme.success : theme.accent
                        }`}
                      >
                        {goal.progress}% Complete
                      </span>
                      {goal.progress >= 100 && <Trophy size={14} className={theme.success} />}
                    </div>
                    <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
                      <div
                        className={`h-2 rounded-full ${
                          goal.progress >= 100 ? "bg-green-500" : "bg-blue-500"
                        } transition-all duration-500`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className={`border-2 border-dashed ${theme.border} rounded-lg flex flex-col items-center justify-center p-4 ${theme.hover} text-center ${theme.subText} transition-colors`}
              >
                <Plus size={24} className="mb-2" />
                <span className="text-sm font-medium">Add New Goal</span>
              </button>
            </div>
          )}
          {activeTab === "workouts" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${theme.text}`}>Workout Log</h2>
                <button
                  onClick={() => setShowWorkoutModal(true)}
                  className={`text-sm flex items-center px-3 py-1.5 rounded-lg ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors shadow-sm`}
                >
                  <Plus size={16} className="mr-1" /> Add Workout
                </button>
              </div>
              <div
                className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border}`}
              >
                <h3 className={`text-lg font-medium mb-3 ${theme.text}`}>Today's Plan</h3>
                <div className="space-y-3 mb-6">
                  {dailyWorkoutPlan.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        theme.border
                      } ${
                        item.completed
                          ? isDarkMode
                            ? "bg-green-900/20 border-green-800/30"
                            : "bg-green-50 border-green-200"
                          : isDarkMode
                          ? "bg-gray-700/50"
                          : ""
                      } transition-colors`}
                    >
                      {/* ... (same rendering as on overview tab) ... */}
                      <div className="flex items-center">
                        <div
                          className={`mr-3 p-1.5 rounded-full ${
                            item.completed
                              ? isDarkMode
                                ? "bg-green-600/30"
                                : "bg-green-100"
                              : isDarkMode
                              ? "bg-gray-600"
                              : "bg-gray-100"
                          } ${
                            item.completed
                              ? isDarkMode
                                ? "text-green-400"
                                : "text-green-600"
                              : theme.subText
                          }`}
                        >
                          {item.icon || <Activity size={16} />}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${theme.text} ${
                              item.completed ? "line-through " + theme.subText : ""
                            }`}
                          >
                            {item.activity}
                          </p>
                          <p className={`text-xs ${theme.subText}`}>
                            {item.time} - {item.duration} ({item.type})
                          </p>
                        </div>
                      </div>
                      <div>
                        {item.completed ? (
                          <Check
                            size={20}
                            className={isDarkMode ? "text-green-400" : "text-green-600"}
                          />
                        ) : (
                          <button
                            className={`text-xs px-2 py-1 rounded ${
                              isDarkMode
                                ? "bg-blue-600 hover:bg-blue-500"
                                : "bg-blue-500 hover:bg-blue-600"
                            } text-white transition-colors`}
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <h3
                  className={`text-lg font-medium mb-3 pt-4 border-t ${theme.border} ${theme.text}`}
                >
                  Past Week
                </h3>
                {/* Placeholder for past workouts */}
                <p className={`${theme.subText} text-sm text-center py-4`}>
                  Workout history from the past week will appear here.
                </p>
              </div>
            </div>
          )}
          {activeTab === "nutrition" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${theme.text}`}>Today's Nutrition</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meal Breakdown */}
                <div
                  className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border}`}
                >
                  <h3 className={`text-lg font-medium mb-3 ${theme.text}`}>Meal Log</h3>
                  <div className={`divide-y ${theme.tableBorder}`}>
                    {mealData.map((meal, index) => (
                      <div
                        key={index}
                        className={`py-2 flex justify-between items-center ${theme.tableHover}`}
                      >
                        <div>
                          <p className={`font-medium ${theme.text}`}>{meal.name}</p>
                          <p className={`text-xs ${theme.subText}`}>
                            P: {meal.protein}g / C: {meal.carbs}g / F: {meal.fat}g
                          </p>
                        </div>
                        <span className={`font-semibold ${theme.text}`}>
                          {meal.calories} <span className="text-xs ${theme.subText}">kcal</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`mt-4 w-full text-sm flex items-center justify-center px-3 py-1.5 rounded-lg border-2 border-dashed ${theme.border} ${theme.hover} ${theme.subText} transition-colors`}
                  >
                    <Plus size={16} className="mr-1" /> Log Food Item
                  </button>
                </div>

                {/* Macro & Calorie Summary */}
                <div className="space-y-4">
                  <div
                    className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border}`}
                  >
                    <h3 className={`text-lg font-medium mb-3 ${theme.text}`}>Total Intake</h3>
                    <div className="flex justify-around text-center">
                      <div>
                        <p className={`text-2xl font-bold ${theme.accent}`}>
                          {formatNumber(totalNutrients.calories)}
                        </p>
                        <p className={`text-xs ${theme.subText}`}>Calories</p>
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${theme.accent}`}>
                          {totalNutrients.protein}g
                        </p>
                        <p className={`text-xs ${theme.subText}`}>Protein</p>
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${theme.accent}`}>
                          {totalNutrients.carbs}g
                        </p>
                        <p className={`text-xs ${theme.subText}`}>Carbs</p>
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${theme.accent}`}>
                          {totalNutrients.fat}g
                        </p>
                        <p className={`text-xs ${theme.subText}`}>Fat</p>
                      </div>
                    </div>
                  </div>
                  {/* Water Intake Card (Duplicated from Overview for context) */}
                  <div
                    className={`${theme.cardBg} p-4 rounded-lg ${theme.shadow} border ${theme.border} flex flex-col`}
                  >
                    <span className={`text-sm font-medium ${theme.subText} mb-1`}>
                      Water Intake
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xl font-bold ${theme.text} flex items-baseline`}>
                        {waterIntake}
                        <span className={`text-xs ml-1 ${theme.subText}`}>
                          / {maxWaterIntake} glasses
                        </span>
                      </span>
                      <button
                        onClick={addWater}
                        disabled={waterIntake >= maxWaterIntake}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          isDarkMode
                            ? "bg-blue-600 hover:bg-blue-500"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        +1
                      </button>
                    </div>
                    <div
                      className={`mt-2 w-full ${theme.progressBg} rounded-full h-1.5 overflow-hidden`}
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          showWaterAnimation ? "animate-pulse" : ""
                        }`}
                        style={{
                          width: `${Math.min((waterIntake / maxWaterIntake) * 100, 100)}%`,
                          backgroundColor: waterProgressColor,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "sleep" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${theme.text}`}>Sleep Analysis</h2>
              <div
                className={`${theme.cardBg} p-6 rounded-lg ${theme.shadow} border ${theme.border}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium ${theme.text}`}>
                    Last 7 Days Sleep Duration
                  </h3>
                  <div className={`${theme.text} text-right`}>
                    <p className="text-2xl font-bold">
                      {(sleepData.reduce((sum, d) => sum + d.hours, 0) / sleepData.length).toFixed(
                        1
                      )}
                      <span className="text-sm font-normal">hrs</span>
                    </p>
                    <p className={`text-xs ${theme.subText}`}>Average Sleep</p>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme.chartGrid}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        unit="h"
                        tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme.tooltipBg,
                          borderColor: theme.border,
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                        itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                        formatter={(value) => [`${value} hours`, "Sleep"]}
                      />
                      <Bar
                        dataKey="hours"
                        fill={isDarkMode ? "#8b5cf6" : "#7c3aed"}
                        animationDuration={1000}
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      >
                        {sleepData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={isDarkMode ? "#8b5cf6" : "#7c3aed"}
                            opacity={
                              entry.day ===
                              new Date().toLocaleDateString("en-US", { weekday: "short" })
                                ? 1
                                : 0.7
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div
                  className={`mt-6 ${
                    isDarkMode ? "bg-purple-900/30" : "bg-purple-50"
                  } p-3 rounded-lg flex items-start border ${
                    isDarkMode ? "border-purple-800/50" : "border-purple-200"
                  }`}
                >
                  <MoonIcon
                    size={18}
                    className={`mr-2 mt-0.5 flex-shrink-0 ${
                      isDarkMode ? "text-purple-300" : "text-purple-600"
                    }`}
                  />
                  <p className={`${isDarkMode ? "text-purple-300" : "text-purple-700"} text-sm`}>
                    <span className="font-medium">Sleep Tip:</span> Aim for consistent sleep and
                    wake times, even on weekends, for better recovery.
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "history" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${theme.text}`}>Activity History</h2>
              {/* Reusing the weekly chart section for demonstration */}
              <div
                className={`${theme.cardBg} p-6 rounded-xl ${theme.shadow} border ${theme.border}`}
              >
                <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                  <h2 className={`text-lg font-semibold ${theme.text}`}>Metrics History</h2>
                  <div className="flex">
                    <div
                      className={`rounded-lg overflow-hidden flex text-xs border ${theme.border} shadow-sm`}
                    >
                      {["steps", "calories", "heartRate"].map((metric) => (
                        <button
                          key={metric}
                          onClick={() => setSelectedMetric(metric)}
                          className={`px-3 py-1 font-medium transition-colors ${
                            selectedMetric === metric
                              ? metric === "steps"
                                ? "bg-blue-500 text-white"
                                : metric === "calories"
                                ? "bg-orange-500 text-white"
                                : "bg-red-500 text-white"
                              : `${
                                  isDarkMode
                                    ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                                    : "text-gray-600 bg-white hover:bg-gray-100"
                                }`
                          }`}
                        >
                          {metric === "heartRate"
                            ? "Heart"
                            : metric.charAt(0).toUpperCase() + metric.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <button
                      onClick={() => changeWeek("prev")}
                      className={`p-1 rounded-full ${theme.hover} transition-colors`}
                      aria-label="Previous Week"
                    >
                      <ChevronLeft size={20} className={theme.text} />
                    </button>
                    <span className={`mx-2 font-medium ${theme.text} text-sm`}>{currentWeek}</span>
                    <button
                      onClick={() => changeWeek("next")}
                      className={`p-1 rounded-full ${theme.hover} transition-colors ${
                        currentWeek === "This Week" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={currentWeek === "This Week"}
                      aria-label="Next Week"
                    >
                      <ChevronRight size={20} className={theme.text} />
                    </button>
                  </div>
                  <div className={`text-xs ${theme.subText}`}>
                    {selectedMetric === "steps" &&
                      `Total: ${formatNumber(weekData.reduce((sum, d) => sum + d.steps, 0))} steps`}
                    {selectedMetric === "calories" &&
                      `Total: ${formatNumber(
                        weekData.reduce((sum, d) => sum + d.calories, 0)
                      )} cal`}
                    {selectedMetric === "heartRate" &&
                      `Avg: ${Math.round(
                        weekData.reduce((sum, d) => sum + d.heartRate, 0) / weekData.length
                      )} BPM`}
                  </div>
                </div>
                <div className="h-72 mt-4">
                  {/* Chart rendering logic (same as overview) */}
                  <ResponsiveContainer width="100%" height="100%">
                    {selectedMetric === "steps" ? (
                      <BarChart data={weekData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={theme.chartGrid}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme.tooltipBg,
                            borderColor: theme.border,
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                          itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                          formatter={(value) => [`${formatNumber(value)} steps`, null]}
                          cursor={{
                            fill: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                            radius: 4,
                          }}
                        />
                        <Bar
                          dataKey="steps"
                          fill={isDarkMode ? "#3b82f6" : "#2563eb"}
                          animationDuration={1000}
                          radius={[4, 4, 0, 0]}
                          barSize={20}
                        >
                          {weekData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.active
                                  ? isDarkMode
                                    ? "#60a5fa"
                                    : "#3b82f6"
                                  : isDarkMode
                                  ? "#3b82f6"
                                  : "#2563eb"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    ) : selectedMetric === "calories" ? (
                      <AreaChart
                        data={weekData}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={theme.chartGrid}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme.tooltipBg,
                            borderColor: theme.border,
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                          itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                          formatter={(value) => [`${value} cal`, null]}
                          cursor={{ stroke: theme.accent, strokeWidth: 1 }}
                        />
                        <defs>
                          <linearGradient id="colorCaloriesHist" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor={isDarkMode ? "#f97316" : "#ea580c"}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={isDarkMode ? "#f97316" : "#ea580c"}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="calories"
                          stroke={isDarkMode ? "#f97316" : "#ea580c"}
                          fillOpacity={1}
                          fill="url(#colorCaloriesHist)"
                          strokeWidth={2}
                          animationDuration={1000}
                          dot={{ stroke: isDarkMode ? "#f97316" : "#ea580c", r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </AreaChart>
                    ) : (
                      <LineChart
                        data={weekData}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={theme.chartGrid}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          domain={["dataMin - 5", "dataMax + 5"]}
                          tick={{ fill: isDarkMode ? "#e5e7eb" : "#6b7280", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme.tooltipBg,
                            borderColor: theme.border,
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                          itemStyle={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                          formatter={(value) => [`${value} BPM`, null]}
                          cursor={{ stroke: theme.accent, strokeWidth: 1 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="heartRate"
                          stroke={isDarkMode ? "#ef4444" : "#dc2626"}
                          strokeWidth={2}
                          dot={{ fill: isDarkMode ? "#ef4444" : "#dc2626", r: 3 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                          animationDuration={1000}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Closing Tab Content Animation Wrapper */}
      </div>
      {/* Closing Main Dashboard Card */}
      <footer className={`text-center mt-6 text-xs ${theme.subText}`}>
        FitnessFreak &copy; {new Date().getFullYear()}
      </footer>
    </div> // Closing Main Background Wrapper
  );
}
