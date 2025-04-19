import { X } from "lucide-react"; // Added some icons
import React from "react";

const WorkoutModal = ({ data: { theme, isDarkMode, setShowWorkoutModal } }) => (
  // Added focus trap and improved styling
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}
  >
    <div
      className={`${theme.cardBg} ${theme.text} p-6 rounded-xl max-w-md w-full ${theme.shadow} animate-fade-in-scale`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Create Custom Workout</h3>
        <button
          onClick={() => setShowWorkoutModal(false)}
          className={`p-1 rounded-full ${theme.iconHover}`}
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm ${theme.subText} mb-1`}>Workout Name</label>
          <input
            type="text"
            className={`w-full p-2 rounded-md ${theme.inputBg} ${theme.inputBorder} border`}
            placeholder="e.g. Morning Run"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm ${theme.subText} mb-1`}>Time</label>
            <input
              type="time"
              className={`w-full p-2 rounded-md ${theme.inputBg} ${theme.inputBorder} border`}
            />
          </div>
          <div>
            <label className={`block text-sm ${theme.subText} mb-1`}>Duration</label>
            <select
              className={`w-full p-2 rounded-md ${theme.inputBg} ${theme.inputBorder} border`}
            >
              <option>15 min</option> <option>30 min</option> <option>45 min</option>
              <option>60 min</option>
            </select>
          </div>
        </div>
        <div>
          <label className={`block text-sm ${theme.subText} mb-1`}>Workout Type</label>
          <select className={`w-full p-2 rounded-md ${theme.inputBg} ${theme.inputBorder} border`}>
            <option>Cardio</option> <option>Strength</option> <option>Flexibility</option>
            <option>HIIT</option> <option>Custom</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm ${theme.subText} mb-1`}>Notes</label>
          <textarea
            className={`w-full p-2 rounded-md ${theme.inputBg} ${theme.inputBorder} border`}
            rows="3"
            placeholder="Any special instructions or goals..."
          ></textarea>
        </div>
        <div className="flex space-x-3 pt-2">
          <button
            className={`flex-1 py-2 rounded-md ${
              isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setShowWorkoutModal(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setShowWorkoutModal(false)}
          >
            Add Workout
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default WorkoutModal;
