import { useState, useEffect } from "react";
import EyeCareTimer from "./components/EyeCareTimer";
import SleepCycle from "./components/SleepCycle";
import PomodoroTimer from "./components/PomodoroTimer";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/App.css";

type Tab = "timer" | "sleep" | "focus";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("timer");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">VisionBreak</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="app-main">
        {activeTab === "timer" && <EyeCareTimer />}
        {activeTab === "sleep" && <SleepCycle />}
        {activeTab === "focus" && <PomodoroTimer />}
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeTab === "timer" ? "active" : ""}`}
          onClick={() => setActiveTab("timer")}
        >
          <span className="nav-icon">👁️</span>
          <span className="nav-label">Timer</span>
        </button>
        <button
          className={`nav-item ${activeTab === "sleep" ? "active" : ""}`}
          onClick={() => setActiveTab("sleep")}
        >
          <span className="nav-icon">😴</span>
          <span className="nav-label">Sleep</span>
        </button>
        <button
          className={`nav-item ${activeTab === "focus" ? "active" : ""}`}
          onClick={() => setActiveTab("focus")}
        >
          <span className="nav-icon">🎯</span>
          <span className="nav-label">Focus</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
