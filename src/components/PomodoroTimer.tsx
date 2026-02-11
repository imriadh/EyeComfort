import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { sendNotification } from "@tauri-apps/plugin-notification";
import "./PomodoroTimer.css";

interface PomodoroStats {
  sessionsToday: number;
  sessionsThisWeek: number;
  totalMinutes: number;
}

type Phase = "work" | "break";

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("work");
  const [stats, setStats] = useState<PomodoroStats>({
    sessionsToday: 0,
    sessionsThisWeek: 0,
    totalMinutes: 0,
  });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handlePhaseComplete();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const loadStats = async () => {
    try {
      const data = await invoke<string>("load_data", {
        key: "pomodoro_stats",
      });
      if (data) {
        setStats(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const saveStats = async (newStats: PomodoroStats) => {
    try {
      await invoke("save_data", {
        key: "pomodoro_stats",
        value: JSON.stringify(newStats),
      });
    } catch (error) {
      console.error("Failed to save stats:", error);
    }
  };

  const handlePhaseComplete = async () => {
    setIsRunning(false);

    if (phase === "work") {
      // Update stats
      const newStats = {
        ...stats,
        sessionsToday: stats.sessionsToday + 1,
        sessionsThisWeek: stats.sessionsThisWeek + 1,
        totalMinutes: stats.totalMinutes + workDuration,
      };
      setStats(newStats);
      saveStats(newStats);

      // Start break
      setPhase("break");
      setTimeLeft(breakDuration * 60);

      try {
        await sendNotification({
          title: "Great work! 🎯",
          body: `Time for a ${breakDuration}-minute break`,
        });
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    } else {
      // Start new work session
      setPhase("work");
      setTimeLeft(workDuration * 60);

      try {
        await sendNotification({
          title: "Break's over! 💪",
          body: "Ready to focus?",
        });
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("work");
    setTimeLeft(workDuration * 60);
  };

  const handleWorkDurationChange = (duration: number) => {
    setWorkDuration(duration);
    if (!isRunning && phase === "work") {
      setTimeLeft(duration * 60);
    }
  };

  const handleBreakDurationChange = (duration: number) => {
    setBreakDuration(duration);
    if (!isRunning && phase === "break") {
      setTimeLeft(duration * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const totalTime =
    phase === "work" ? workDuration * 60 : breakDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="pomodoro-container">
      <div className={`glass-card phase-${phase}`}>
        <h2 className="pomodoro-title">Pomodoro Timer</h2>
        <p className="pomodoro-subtitle">
          {phase === "work" ? "Focus Time 🎯" : "Break Time ☕"}
        </p>

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

        <div className="duration-settings">
          <div className="setting-group">
            <label>Work Duration (min):</label>
            <div className="duration-buttons">
              {[15, 25, 30, 45].map((min) => (
                <button
                  key={min}
                  className={`btn btn-sm ${
                    workDuration === min ? "active" : ""
                  }`}
                  onClick={() => handleWorkDurationChange(min)}
                  disabled={isRunning}
                >
                  {min}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-group">
            <label>Break Duration (min):</label>
            <div className="duration-buttons">
              {[5, 10, 15].map((min) => (
                <button
                  key={min}
                  className={`btn btn-sm ${
                    breakDuration === min ? "active" : ""
                  }`}
                  onClick={() => handleBreakDurationChange(min)}
                  disabled={isRunning}
                >
                  {min}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Today</span>
            <span className="stat-value">{stats.sessionsToday}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">This Week</span>
            <span className="stat-value">{stats.sessionsThisWeek}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Minutes</span>
            <span className="stat-value">{stats.totalMinutes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
