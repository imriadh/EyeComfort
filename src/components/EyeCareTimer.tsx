import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { sendNotification } from "@tauri-apps/plugin-notification";
import "./EyeCareTimer.css";

const EyeCareTimer = () => {
  const [interval, setInterval] = useState(20); // minutes
  const [timeLeft, setTimeLeft] = useState(interval * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Load saved data
    loadData();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const loadData = async () => {
    try {
      const sessions = await invoke<string>("load_data", {
        key: "eye_care_sessions",
      });
      if (sessions) setTotalSessions(parseInt(sessions) || 0);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const saveData = async (sessions: number) => {
    try {
      await invoke("save_data", {
        key: "eye_care_sessions",
        value: sessions.toString(),
      });
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const handleTimerComplete = async () => {
    setIsRunning(false);
    const newTotal = totalSessions + 1;
    setTotalSessions(newTotal);
    saveData(newTotal);

    // Send notification
    try {
      await sendNotification({
        title: "Time for a break! 👁️",
        body: "Look at something 20 feet away for 20 seconds",
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }

    setTimeLeft(interval * 60);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(interval * 60);
  };

  const handleIntervalChange = (newInterval: number) => {
    setInterval(newInterval);
    if (!isRunning) {
      setTimeLeft(newInterval * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = ((interval * 60 - timeLeft) / (interval * 60)) * 100;

  return (
    <div className="timer-container">
      <div className="glass-card">
        <h2 className="timer-title">Eye Care Timer</h2>
        <p className="timer-subtitle">20-20-20 Rule</p>

        <div className="circular-progress">
          <svg className="progress-ring" viewBox="0 0 200 200">
            <circle
              className="progress-ring-bg"
              cx="100"
              cy="100"
              r="85"
              fill="none"
              strokeWidth="12"
            />
            <circle
              className="progress-ring-fill"
              cx="100"
              cy="100"
              r="85"
              fill="none"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 85}`}
              strokeDashoffset={`${
                2 * Math.PI * 85 * (1 - progress / 100)
              }`}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="timer-display">{formatTime(timeLeft)}</div>
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button className="btn btn-primary btn-large" onClick={handleStart}>
              <span className="btn-icon">▶️</span> Start
            </button>
          ) : (
            <button className="btn btn-secondary btn-large" onClick={handlePause}>
              <span className="btn-icon">⏸️</span> Pause
            </button>
          )}
          <button className="btn btn-outline" onClick={handleReset}>
            <span className="btn-icon">🔄</span> Reset
          </button>
        </div>

        <div className="interval-selector">
          <label>Interval (minutes):</label>
          <div className="interval-buttons">
            {[15, 20, 30, 45, 60].map((min) => (
              <button
                key={min}
                className={`btn btn-sm ${interval === min ? "active" : ""}`}
                onClick={() => handleIntervalChange(min)}
                disabled={isRunning}
              >
                {min}
              </button>
            ))}
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Sessions Today</span>
            <span className="stat-value">{totalSessions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeCareTimer;
