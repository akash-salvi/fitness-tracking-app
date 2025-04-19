import {
    Activity,
    Droplet,
    Dumbbell,
    Flame,
    Heart,
    Moon as MoonIcon,
    RefreshCw,
    TrendingUp
} from "lucide-react"; // Added some icons
import React from "react";

export const goalTypes = [
    {
        id: 1,
        name: "Daily Steps",
        target: "10,000 steps",
        progress: 85,
        icon: <Activity size={20} />,
    },
    { id: 2, name: "Weekly Workout", target: "5 workouts", progress: 60, icon: <Flame size={20} /> },
    {
        id: 3,
        name: "Weight Goal",
        target: "Lose 2 lbs",
        progress: 40,
        icon: <TrendingUp size={20} />,
    },
    {
        id: 4,
        name: "Heart Health",
        target: "30 min cardio / day",
        progress: 75,
        icon: <Heart size={20} />,
    },
    {
        id: 5,
        name: "Hydration",
        target: "8 glasses / day",
        progress: 50,
        icon: <Droplet size={20} />,
    },
    {
        id: 6,
        name: "Sleep Duration",
        target: "7-8 hours / night",
        progress: 90,
        icon: <MoonIcon size={20} />,
    },
];

export const dailyWorkoutPlan = [
    {
        time: "7:00 AM",
        activity: "Morning Run",
        duration: "30 min",
        completed: true,
        type: "Cardio",
        icon: <Flame />,
    },
    {
        time: "12:30 PM",
        activity: "Quick Stretch",
        duration: "10 min",
        completed: true,
        type: "Flexibility",
        icon: <RefreshCw />,
    },
    {
        time: "6:00 PM",
        activity: "Strength Training",
        duration: "45 min",
        completed: false,
        type: "Strength",
        icon: <Dumbbell />,
    },
];

export const notifications = [
    {
        id: 1,
        message: "You've reached 50% of your daily step goal!",
        time: "2 hours ago",
        read: true,
    },
    { id: 2, message: "Time for a hydration break! 💧", time: "4 hours ago", read: true },
    { id: 3, message: "New workout plan available!", time: "Yesterday", read: false },
    {
        id: 4,
        message: "Alex just completed the 'Morning Rush' challenge!",
        time: "Yesterday",
        read: false,
    },
];

// Activity streak data
export const streakData = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: true },
    { day: "S", completed: false },
    { day: "S", completed: false },
];

// Mood tracking
export const moodOptions = [
    { id: 1, emoji: "😊", label: "Energetic" },
    { id: 2, emoji: "😌", label: "Relaxed" },
    { id: 3, emoji: "😓", label: "Tired" },
    { id: 4, emoji: "🤕", label: "Sore" },
    { id: 5, emoji: "😤", label: "Motivated" },
];

// Sleep data
export const sleepData = [
    { day: "Mon", hours: 7.2 },
    { day: "Tue", hours: 6.8 },
    { day: "Wed", hours: 8.1 },
    { day: "Thu", hours: 7.5 },
    { day: "Fri", hours: 6.5 },
    { day: "Sat", hours: 8.5 },
    { day: "Sun", hours: 7.8 },
];

// Meal tracking
export const mealData = [
    { name: "Breakfast", calories: 420, protein: 25, carbs: 45, fat: 15 },
    { name: "Lunch", calories: 650, protein: 40, carbs: 60, fat: 20 },
    { name: "Dinner", calories: 580, protein: 35, carbs: 50, fat: 18 },
    { name: "Snacks", calories: 250, protein: 10, carbs: 30, fat: 8 },
];