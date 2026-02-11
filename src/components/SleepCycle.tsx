import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./SleepCycle.css";

interface SleepRating {
  date: string;
  rating: number;
  wakeTime: string;
}

const SleepCycle = () => {
  const [bedtime, setBedtime] = useState<string>("");
  const [wakeupTimes, setWakeupTimes] = useState<string[]>([]);
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");
  const [ratings, setRatings] = useState<SleepRating[]>([]);
  const [todayRating, setTodayRating] = useState<number>(0);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    try {
      const data = await invoke<string>("load_data", {
        key: "sleep_ratings",
      });
      if (data) {
        setRatings(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load ratings:", error);
    }
  };

  const saveRating = async (rating: number) => {
    const newRating: SleepRating = {
      date: new Date().toISOString().split("T")[0],
      rating,
      wakeTime: new Date().toLocaleTimeString(),
    };
    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);

    try {
      await invoke("save_data", {
        key: "sleep_ratings",
        value: JSON.stringify(updatedRatings),
      });
    } catch (error) {
      console.error("Failed to save rating:", error);
    }
  };

  const calculateWakeupTimes = () => {
    if (!bedtime) return;

    const [hours, minutes] = bedtime.split(":").map(Number);
    const bedtimeDate = new Date();
    bedtimeDate.setHours(hours, minutes, 0, 0);

    // Add 14 minutes for fall asleep time
    bedtimeDate.setMinutes(bedtimeDate.getMinutes() + 14);

    const times: string[] = [];
    // Calculate 5-6 sleep cycles (90 minutes each)
    for (let i = 4; i <= 6; i++) {
      const wakeTime = new Date(bedtimeDate);
      wakeTime.setMinutes(wakeTime.getMinutes() + i * 90);
      times.push(
        wakeTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }

    setWakeupTimes(times);
  };

  const setAlarm = async (time: string) => {
    setSelectedAlarm(time);
    try {
      await invoke("schedule_notification", {
        title: "Good morning! 🌅",
        body: "Time to wake up!",
        delayMs: 0, // Would calculate actual delay in production
      });
    } catch (error) {
      console.error("Failed to set alarm:", error);
    }
  };

  const handleRatingClick = (rating: number) => {
    setTodayRating(rating);
    saveRating(rating);
  };

  const getAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const emojis = ["😫", "😴", "😐", "😊", "🤩"];

  return (
    <div className="sleep-container">
      <div className="glass-card">
        <h2 className="sleep-title">Sleep Cycle Calculator</h2>
        <p className="sleep-subtitle">90-minute sleep cycles</p>

        <div className="bedtime-input">
          <label htmlFor="bedtime">When do you plan to sleep?</label>
          <input
            type="time"
            id="bedtime"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="time-input"
          />
          <button className="btn btn-primary" onClick={calculateWakeupTimes}>
            Calculate Wake Times
          </button>
        </div>

        {wakeupTimes.length > 0 && (
          <div className="wake-times">
            <h3>Optimal Wake-up Times</h3>
            <div className="time-grid">
              {wakeupTimes.map((time, index) => (
                <div
                  key={index}
                  className={`time-card ${
                    selectedAlarm === time ? "selected" : ""
                  }`}
                  onClick={() => setAlarm(time)}
                >
                  <span className="cycle-count">{index + 4} cycles</span>
                  <span className="wake-time">{time}</span>
                  {selectedAlarm === time && (
                    <span className="alarm-badge">⏰ Alarm Set</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rating-section">
          <h3>How did you sleep?</h3>
          <div className="emoji-rating">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className={`emoji-btn ${
                  todayRating === index + 1 ? "selected" : ""
                }`}
                onClick={() => handleRatingClick(index + 1)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Average Rating</span>
            <span className="stat-value">{getAverageRating()} ⭐</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Ratings</span>
            <span className="stat-value">{ratings.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepCycle;
