import { useState, useEffect, useRef } from "react";

// ─── DATA LAYER ────────────────────────────────────────────────────────────────

const MEALS = {
  veg: {
    breakfast: [
      { name: "Poha + Green Chutney", cal: 250, protein: 6, carbs: 45, fat: 5, cost: 15 },
      { name: "Moong Dal Chilla (2)", cal: 280, protein: 14, carbs: 38, fat: 6, cost: 20 },
      { name: "Oats Upma + Milk", cal: 320, protein: 12, carbs: 52, fat: 7, cost: 25 },
      { name: "Besan Cheela + Curd", cal: 300, protein: 16, carbs: 36, fat: 8, cost: 18 },
    ],
    lunch: [
      { name: "2 Roti + Dal Tadka + Salad", cal: 420, protein: 18, carbs: 68, fat: 9, cost: 30 },
      { name: "Rajma Chawal + Raita", cal: 480, protein: 16, carbs: 78, fat: 10, cost: 25 },
      { name: "Chole Roti (2) + Sabzi", cal: 500, protein: 20, carbs: 72, fat: 12, cost: 35 },
      { name: "Brown Rice + Palak Paneer", cal: 520, protein: 22, carbs: 65, fat: 14, cost: 40 },
    ],
    dinner: [
      { name: "Khichdi + Ghee + Pickle", cal: 380, protein: 14, carbs: 62, fat: 9, cost: 20 },
      { name: "2 Roti + Sabzi + Dal", cal: 400, protein: 16, carbs: 64, fat: 10, cost: 28 },
      { name: "Paneer Bhurji + Roti (2)", cal: 460, protein: 24, carbs: 48, fat: 16, cost: 45 },
      { name: "Vegetable Daliya + Curd", cal: 320, protein: 12, carbs: 54, fat: 6, cost: 18 },
    ],
    snacks: [
      { name: "Banana + Peanut Butter", cal: 200, protein: 7, carbs: 30, fat: 7, cost: 12 },
      { name: "Roasted Chana (30g)", cal: 150, protein: 9, carbs: 22, fat: 3, cost: 5 },
      { name: "Dahi (200ml) + Honey", cal: 180, protein: 8, carbs: 28, fat: 4, cost: 10 },
      { name: "Mixed Dry Fruits (20g)", cal: 130, protein: 4, carbs: 12, fat: 8, cost: 15 },
    ],
  },
  nonveg: {
    breakfast: [
      { name: "3 Egg Omelette + Toast", cal: 350, protein: 22, carbs: 28, fat: 16, cost: 25 },
      { name: "Egg Bhurji + 2 Roti", cal: 380, protein: 20, carbs: 42, fat: 14, cost: 22 },
      { name: "Boiled Eggs (3) + Poha", cal: 400, protein: 24, carbs: 46, fat: 12, cost: 30 },
      { name: "Chicken Sandwich + Milk", cal: 420, protein: 28, carbs: 38, fat: 14, cost: 40 },
    ],
    lunch: [
      { name: "Chicken Curry + Rice + Salad", cal: 520, protein: 35, carbs: 55, fat: 16, cost: 60 },
      { name: "Egg Curry + 2 Roti + Dal", cal: 480, protein: 28, carbs: 58, fat: 14, cost: 40 },
      { name: "Grilled Chicken + Roti + Sabzi", cal: 500, protein: 40, carbs: 44, fat: 14, cost: 70 },
      { name: "Fish Curry + Rice + Raita", cal: 490, protein: 32, carbs: 52, fat: 15, cost: 55 },
    ],
    dinner: [
      { name: "Chicken Tikka + Roti (2)", cal: 460, protein: 38, carbs: 36, fat: 14, cost: 80 },
      { name: "Egg Fried Rice + Raita", cal: 440, protein: 22, carbs: 58, fat: 12, cost: 35 },
      { name: "Grilled Fish + Vegetable", cal: 380, protein: 35, carbs: 25, fat: 12, cost: 65 },
      { name: "Mutton Stew + 2 Roti", cal: 500, protein: 36, carbs: 42, fat: 18, cost: 90 },
    ],
    snacks: [
      { name: "Boiled Egg (2) + Tea", cal: 160, protein: 12, carbs: 2, fat: 10, cost: 12 },
      { name: "Chicken Tikka Bites", cal: 200, protein: 22, carbs: 5, fat: 8, cost: 40 },
      { name: "Tuna Sandwich", cal: 280, protein: 24, carbs: 28, fat: 8, cost: 35 },
      { name: "Roasted Chana + Egg", cal: 220, protein: 18, carbs: 22, fat: 7, cost: 18 },
    ],
  },
};

const WORKOUTS = {
  beginner: {
    home: [
      { day: "Mon", focus: "Full Body", exercises: ["20 Jumping Jacks", "10 Push-ups", "15 Squats", "10 Lunges", "30s Plank"], duration: "25 min" },
      { day: "Tue", focus: "Rest / Light Walk", exercises: ["20 min brisk walk", "Stretching"], duration: "25 min" },
      { day: "Wed", focus: "Core + Arms", exercises: ["15 Crunches", "10 Tricep Dips", "20 Leg Raises", "15 Mountain Climbers", "10 Push-ups"], duration: "30 min" },
      { day: "Thu", focus: "Active Rest", exercises:["Yoga/Stretching", "Deep breathing"], duration: "20 min" },
      { day: "Fri", focus: "Lower Body", exercises: ["25 Squats", "20 Glute Bridges", "15 Calf Raises", "12 Lunges each leg"], duration: "30 min" },
      { day: "Sat", focus: "Cardio", exercises: ["30 min jog/walk", "Stair climbing"], duration: "35 min" },
      { day: "Sun", focus: "Rest", exercises: ["Light stretching"], duration: "15 min" },
    ],
    gym: [
      { day: "Mon", focus: "Chest + Triceps", exercises: ["Bench Press 3×10", "Incline DB Press 3×10", "Tricep Pushdown 3×12", "Dips 3×8"], duration: "45 min" },
      { day: "Tue", focus: "Back + Biceps", exercises: ["Lat Pulldown 3×10", "Seated Row 3×10", "Barbell Curl 3×12", "Hammer Curl 3×12"], duration: "45 min" },
      { day: "Wed", focus: "Cardio", exercises: ["Treadmill 20 min", "Cycling 10 min", "Cool down"], duration: "35 min" },
      { day: "Thu", focus: "Shoulders", exercises: ["Overhead Press 3×10", "Lateral Raise 3×15", "Front Raise 3×12", "Face Pull 3×15"], duration: "40 min" },
      { day: "Fri", focus: "Legs", exercises: ["Squats 3×10", "Leg Press 3×12", "Lunges 3×10", "Calf Raises 4×15"], duration: "50 min" },
      { day: "Sat", focus: "Full Body", exercises: ["Deadlift 3×8", "Pull-ups 3×8", "Plank 3×45s"], duration: "45 min" },
      { day: "Sun", focus: "Rest", exercises: ["Active recovery", "Foam rolling"], duration: "20 min" },
    ],
  },
};

const MOTIVATION = [
  "💪 Kal se nahi — Aaj se! Your transformation starts NOW.",
  "🔥 Every roti earned is a roti deserved. Grind on!",
  "🌟 Slow progress is still progress. You've got this!",
  "🏆 Consistency beats perfection every single time.",
  "⚡ Your only competition is yesterday's version of you.",
  "🇮🇳 From chai breaks to gains — balance is everything.",
];

// ─── BMI & CALORIE LOGIC ───────────────────────────────────────────────────────

function calcBMI(weight, height) {
  const h = height / 100;
  return (weight / (h * h)).toFixed(1);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "#60a5fa" };
  if (bmi < 25) return { label: "Normal", color: "#34d399" };
  if (bmi < 30) return { label: "Overweight", color: "#fbbf24" };
  return { label: "Obese", color: "#f87171" };
}

function calcTDEE(age, weight, height, gender, activity) {
  let bmr = gender === "male"
    ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
    : 447.6 + 9.25 * weight + 3.1 * height - 4.33 * age;
  const multipliers = { sedentary: 1.2, moderate: 1.55, active: 1.725 };
  return Math.round(bmr * (multipliers[activity] || 1.2));
}

function getTargetCalories(tdee, goal) {
  if (goal === "fat_loss") return tdee - 400;
  if (goal === "muscle_gain") return tdee + 300;
  return tdee;
}

// ─── ICONS ────────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 20 }) => {
  const icons = {
    home: "🏠", diet: "🥗", workout: "🏋️", progress: "📊", profile: "👤",
    fire: "🔥", water: "💧", steps: "👟", sleep: "😴", star: "⭐",
    check: "✅", arrow: "→", clock: "⏰", trophy: "🏆", heart: "❤️",
    apple: "🍎", dumbbell: "💪", chart: "📈", bell: "🔔", edit: "✏️",
    leaf: "🌿", egg: "🥚", rice: "🍚", run: "🏃", sun: "☀️", moon: "🌙",
  };
  return <span style={{ fontSize: size }}>{icons[name] || "•"}</span>;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function FitBharatApp() {
  const [screen, setScreen] = useState("onboarding");
  const [tab, setTab] = useState("home");
  const [profile, setProfile] = useState({
    name: "", age: 21, weight: 65, height: 170, gender: "male",
    goal: "fat_loss", activity: "moderate", diet: "veg", budget: "low",
  });
  const [water, setWater] = useState(0);
  const [steps, setSteps] = useState(3240);
  const [workoutType, setWorkoutType] = useState("home");
  const [motIdx, setMotIdx] = useState(0);
  const [dayMeals, setDayMeals] = useState(null);
  const [progress, setProgress] = useState([
    { week: "W1", weight: 68 }, { week: "W2", weight: 67.2 }, { week: "W3", weight: 66.5 }, { week: "W4", weight: 65.8 },
  ]);

  const bmi = calcBMI(profile.weight, profile.height);
  const bmiCat = getBMICategory(parseFloat(bmi));
  const tdee = calcTDEE(profile.age, profile.weight, profile.height, profile.gender, profile.activity);
  const targetCal = getTargetCalories(tdee, profile.goal);
  const waterGoal = Math.round(profile.weight * 0.033 * 10) / 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setMotIdx(i => (i + 1) % MOTIVATION.length);
      setSteps(s => s + Math.floor(Math.random() * 50));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const diet = profile.diet === "nonveg" ? "nonveg" : "veg";
    const meals = MEALS[diet];
    setDayMeals({
      breakfast: meals.breakfast[Math.floor(Math.random() * meals.breakfast.length)],
      lunch: meals.lunch[Math.floor(Math.random() * meals.lunch.length)],
      dinner: meals.dinner[Math.floor(Math.random() * meals.dinner.length)],
      snacks: meals.snacks[Math.floor(Math.random() * meals.snacks.length)],
    });
  }, [profile.diet]);

  const totalMealCal = dayMeals
    ? dayMeals.breakfast.cal + dayMeals.lunch.cal + dayMeals.dinner.cal + dayMeals.snacks.cal
    : 0;
  const totalProtein = dayMeals
    ? dayMeals.breakfast.protein + dayMeals.lunch.protein + dayMeals.dinner.protein + dayMeals.snacks.protein
    : 0;

  // ─── STYLES ─────────────────────────────────────────────────────────────────

  const S = {
    app: {
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      background: "#0a0f1a",
      color: "#e8eaf0",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      overflowX: "hidden",
    },
    header: {
      background: "linear-gradient(135deg, #0f2027 0%, #1a1a2e 50%, #16213e 100%)",
      padding: "16px 20px 12px",
      borderBottom: "1px solid rgba(255,165,0,0.2)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: 22,
      fontWeight: 900,
      background: "linear-gradient(90deg, #ff6b35, #f7c59f)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    navBar: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "#0d1421",
      borderTop: "1px solid rgba(255,107,53,0.3)",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0 14px",
      zIndex: 100,
    },
    navItem: (active) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      cursor: "pointer",
      padding: "4px 12px",
      borderRadius: 12,
      background: active ? "rgba(255,107,53,0.15)" : "transparent",
      transition: "all 0.2s",
    }),
    navLabel: (active) => ({
      fontSize: 10,
      fontWeight: 700,
      color: active ? "#ff6b35" : "#6b7280",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    }),
    card: {
      background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 18,
      padding: "16px",
      marginBottom: 14,
      backdropFilter: "blur(10px)",
    },
    accentCard: (color = "#ff6b35") => ({
      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
      border: `1px solid ${color}44`,
      borderRadius: 18,
      padding: "16px",
      marginBottom: 14,
    }),
    btn: (variant = "primary") => ({
      background: variant === "primary"
        ? "linear-gradient(135deg, #ff6b35, #f7931e)"
        : "rgba(255,255,255,0.08)",
      color: variant === "primary" ? "#fff" : "#ccc",
      border: "none",
      borderRadius: 14,
      padding: "14px 28px",
      fontSize: 15,
      fontWeight: 800,
      cursor: "pointer",
      width: "100%",
      marginTop: 8,
      letterSpacing: 0.3,
      transition: "all 0.2s",
    }),
    label: {
      fontSize: 12,
      fontWeight: 700,
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
    },
    input: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: "12px 14px",
      color: "#e8eaf0",
      fontSize: 15,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
      marginBottom: 14,
    },
    select: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: "12px 14px",
      color: "#e8eaf0",
      fontSize: 15,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
      marginBottom: 14,
      appearance: "none",
    },
    chipRow: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 14,
    },
    chip: (active) => ({
      padding: "8px 16px",
      borderRadius: 30,
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      border: active ? "1.5px solid #ff6b35" : "1.5px solid rgba(255,255,255,0.12)",
      background: active ? "rgba(255,107,53,0.2)" : "rgba(255,255,255,0.04)",
      color: active ? "#ff6b35" : "#9ca3af",
      transition: "all 0.2s",
    }),
    progressBar: (pct, color = "#ff6b35") => ({
      height: 8,
      background: "rgba(255,255,255,0.08)",
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
    }),
    progressFill: (pct, color = "#ff6b35") => ({
      height: "100%",
      width: `${Math.min(pct, 100)}%`,
      background: `linear-gradient(90deg, ${color}, ${color}aa)`,
      borderRadius: 10,
      transition: "width 0.8s ease",
    }),
    sectionTitle: {
      fontSize: 18,
      fontWeight: 900,
      color: "#f0f4ff",
      marginBottom: 14,
      letterSpacing: -0.3,
    },
    statGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginBottom: 14,
    },
    statBox: (color = "#ff6b35") => ({
      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
      border: `1px solid ${color}33`,
      borderRadius: 16,
      padding: "14px 12px",
      textAlign: "center",
    }),
    macroRow: {
      display: "flex",
      gap: 8,
      marginTop: 10,
    },
    macroChip: (color) => ({
      flex: 1,
      textAlign: "center",
      background: `${color}22`,
      border: `1px solid ${color}44`,
      borderRadius: 10,
      padding: "6px 4px",
    }),
    scroll: {
      paddingBottom: 90,
      padding: "16px 16px 100px",
      overflowY: "auto",
    },
  };

  // ─── ONBOARDING ─────────────────────────────────────────────────────────────

  if (screen === "onboarding") {
    return (
      <div style={S.app}>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0a0f1a 0%, #1a0a05 50%, #0f1a0a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 72, marginBottom: 12 }}>🇮🇳</div>
          <div style={{
            fontSize: 38,
            fontWeight: 900,
            background: "linear-gradient(90deg, #ff6b35, #f7c59f, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
            lineHeight: 1.1,
          }}>
            FitBharat
          </div>
          <div style={{ fontSize: 14, color: "#6b7280", marginTop: 6, marginBottom: 32, fontWeight: 600 }}>
            Your Desi Fitness Companion 💪
          </div>

          <div style={{ ...S.card, width: "100%", maxWidth: 380, textAlign: "left" }}>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16, fontWeight: 600 }}>TELL US ABOUT YOU</div>

            <div style={S.label}>Your Name</div>
            <input style={S.input} placeholder="e.g. Arjun Sharma" value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <div>
                <div style={S.label}>Age</div>
                <input style={{ ...S.input, marginBottom: 0 }} type="number" value={profile.age}
                  onChange={e => setProfile({ ...profile, age: +e.target.value })} />
              </div>
              <div>
                <div style={S.label}>Weight (kg)</div>
                <input style={{ ...S.input, marginBottom: 0 }} type="number" value={profile.weight}
                  onChange={e => setProfile({ ...profile, weight: +e.target.value })} />
              </div>
              <div>
                <div style={S.label}>Height (cm)</div>
                <input style={{ ...S.input, marginBottom: 0 }} type="number" value={profile.height}
                  onChange={e => setProfile({ ...profile, height: +e.target.value })} />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={S.label}>Gender</div>
              <div style={S.chipRow}>
                {["male", "female", "other"].map(g => (
                  <div key={g} style={S.chip(profile.gender === g)}
                    onClick={() => setProfile({ ...profile, gender: g })}>
                    {g === "male" ? "👨 Male" : g === "female" ? "👩 Female" : "🧑 Other"}
                  </div>
                ))}
              </div>
            </div>

            <div style={S.label}>Your Goal</div>
            <div style={S.chipRow}>
              {[["fat_loss", "🔥 Fat Loss"], ["muscle_gain", "💪 Muscle Gain"], ["maintenance", "⚖️ Maintain"]].map(([v, l]) => (
                <div key={v} style={S.chip(profile.goal === v)} onClick={() => setProfile({ ...profile, goal: v })}>{l}</div>
              ))}
            </div>

            <div style={S.label}>Activity Level</div>
            <div style={S.chipRow}>
              {[["sedentary", "🪑 Desk Job"], ["moderate", "🚶 Moderate"], ["active", "🏃 Active"]].map(([v, l]) => (
                <div key={v} style={S.chip(profile.activity === v)} onClick={() => setProfile({ ...profile, activity: v })}>{l}</div>
              ))}
            </div>

            <div style={S.label}>Diet Preference</div>
            <div style={S.chipRow}>
              {[["veg", "🌿 Veg"], ["nonveg", "🍗 Non-Veg"], ["vegan", "🥦 Vegan"]].map(([v, l]) => (
                <div key={v} style={S.chip(profile.diet === v)} onClick={() => setProfile({ ...profile, diet: v })}>{l}</div>
              ))}
            </div>

            <div style={S.label}>Budget</div>
            <div style={S.chipRow}>
              {[["low", "💰 Low (₹100-150/day)"], ["mid", "💳 Mid (₹200-300/day)"]].map(([v, l]) => (
                <div key={v} style={S.chip(profile.budget === v)} onClick={() => setProfile({ ...profile, budget: v })}>{l}</div>
              ))}
            </div>

            <button style={S.btn("primary")} onClick={() => setScreen("main")}>
              🚀 Start My Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── HOME TAB ───────────────────────────────────────────────────────────────

  const HomeTab = () => (
    <div style={S.scroll}>
      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>
          {new Date().getHours() < 12 ? "☀️ Good Morning" : new Date().getHours() < 18 ? "🌤 Good Afternoon" : "🌙 Good Evening"}
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#f0f4ff", letterSpacing: -0.5 }}>
          {profile.name || "Fitness Warrior"} 👋
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
          {profile.goal === "fat_loss" ? "🔥 Cutting Phase" : profile.goal === "muscle_gain" ? "💪 Bulking Phase" : "⚖️ Maintenance Phase"}
        </div>
      </div>

      {/* Motivation Banner */}
      <div style={{
        ...S.accentCard("#f7931e"),
        padding: "14px 18px",
        marginBottom: 16,
        transition: "all 0.5s",
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#f7c59f", lineHeight: 1.5 }}>
          {MOTIVATION[motIdx]}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={S.statGrid}>
        <div style={S.statBox("#3b82f6")}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#60a5fa" }}>{bmi}</div>
          <div style={{ fontSize: 11, color: bmiCat.color, fontWeight: 800, marginTop: 2 }}>BMI • {bmiCat.label}</div>
        </div>
        <div style={S.statBox("#f7931e")}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fbbf24" }}>{targetCal}</div>
          <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800, marginTop: 2 }}>Target kcal/day</div>
        </div>
        <div style={S.statBox("#34d399")}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#34d399" }}>{waterGoal}L</div>
          <div style={{ fontSize: 11, color: "#34d399", fontWeight: 800, marginTop: 2 }}>Daily Water Goal</div>
        </div>
        <div style={S.statBox("#a78bfa")}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#a78bfa" }}>{steps.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 800, marginTop: 2 }}>Steps Today</div>
        </div>
      </div>

      {/* Water Tracker */}
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>💧 Water Tracker</div>
          <div style={{ fontSize: 13, color: "#60a5fa", fontWeight: 700 }}>{water} / {waterGoal * 4} glasses</div>
        </div>
        <div style={S.progressBar(water / (waterGoal * 4) * 100)}>
          <div style={S.progressFill(water / (waterGoal * 4) * 100, "#3b82f6")} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {[1, 2, 3].map(n => (
            <button key={n} style={{
              ...S.btn("secondary"),
              width: "auto",
              flex: 1,
              marginTop: 0,
              padding: "10px 8px",
              fontSize: 13,
            }} onClick={() => setWater(w => Math.min(w + n, waterGoal * 4))}>
              +{n} 🥛
            </button>
          ))}
          <button style={{
            ...S.btn("secondary"),
            width: "auto",
            flex: 1,
            marginTop: 0,
            padding: "10px 8px",
            fontSize: 13,
            color: "#f87171",
          }} onClick={() => setWater(0)}>Reset</button>
        </div>
      </div>

      {/* Today's Calorie Summary */}
      {dayMeals && (
        <div style={S.card}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🍽 Today's Calorie Summary</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#9ca3af", fontSize: 14 }}>Calories from meals</span>
            <span style={{ fontWeight: 800, color: "#fbbf24" }}>{totalMealCal} kcal</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#9ca3af", fontSize: 14 }}>Target calories</span>
            <span style={{ fontWeight: 800, color: "#34d399" }}>{targetCal} kcal</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#9ca3af", fontSize: 14 }}>Total protein</span>
            <span style={{ fontWeight: 800, color: "#a78bfa" }}>{totalProtein}g</span>
          </div>
          <div style={S.progressBar(totalMealCal / targetCal * 100)}>
            <div style={S.progressFill(totalMealCal / targetCal * 100)} />
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6, textAlign: "right" }}>
            {Math.abs(targetCal - totalMealCal)} kcal {totalMealCal < targetCal ? "remaining" : "over target"}
          </div>
        </div>
      )}

      {/* Reminders */}
      <div style={S.card}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🔔 Today's Reminders</div>
        {[
          ["⏰", "8:00 AM", "Breakfast + Morning Walk", "#fbbf24"],
          ["💧", "10:30 AM", "Drink 2 glasses of water", "#60a5fa"],
          ["🏋️", "6:00 PM", "Workout session", "#f87171"],
          ["🌙", "9:00 PM", "Dinner — keep it light", "#a78bfa"],
        ].map(([ic, time, msg, color]) => (
          <div key={time} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <span style={{ fontSize: 20 }}>{ic}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color }}>{time}</div>
              <div style={{ fontSize: 13, color: "#d1d5db" }}>{msg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── DIET TAB ───────────────────────────────────────────────────────────────

  const DietTab = () => {
    if (!dayMeals) return <div style={{ padding: 20, color: "#9ca3af" }}>Loading meals...</div>;
    const meals = [
      ["🌅 Breakfast", "7:30 AM", dayMeals.breakfast, "#f7931e"],
      ["☀️ Lunch", "1:00 PM", dayMeals.lunch, "#34d399"],
      ["🌙 Dinner", "8:00 PM", dayMeals.dinner, "#a78bfa"],
      ["🍎 Snack", "4:30 PM", dayMeals.snacks, "#60a5fa"],
    ];
    const dietLabels = { veg: "🌿 Vegetarian", nonveg: "🍗 Non-Vegetarian", vegan: "🥦 Vegan" };
    const totalCost = Object.values(dayMeals).reduce((a, m) => a + m.cost, 0);

    return (
      <div style={S.scroll}>
        <div style={S.sectionTitle}>🥗 Today's Meal Plan</div>
        <div style={{ ...S.accentCard("#34d399"), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>DIET TYPE</div>
            <div style={{ fontWeight: 800, color: "#34d399" }}>{dietLabels[profile.diet]}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>DAILY COST</div>
            <div style={{ fontWeight: 800, color: "#fbbf24", fontSize: 20 }}>₹{totalCost}</div>
          </div>
        </div>

        {meals.map(([title, time, meal, color]) => (
          <div key={title} style={S.accentCard(color)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 16, color }}>{title}</div>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>{time}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color }}>{meal.cal}</div>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>kcal</div>
              </div>
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, color: "#e8eaf0", marginBottom: 10 }}>
              🍽 {meal.name}
            </div>

            <div style={S.macroRow}>
              {[
                ["Protein", meal.protein + "g", "#a78bfa"],
                ["Carbs", meal.carbs + "g", "#fbbf24"],
                ["Fat", meal.fat + "g", "#f87171"],
                ["Cost", "₹" + meal.cost, "#34d399"],
              ].map(([label, val, col]) => (
                <div key={label} style={S.macroChip(col)}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: col }}>{val}</div>
                  <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 700 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Daily Totals */}
        <div style={S.card}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>📊 Daily Totals</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Total Calories", totalMealCal + " kcal", "#fbbf24"],
              ["Total Protein", totalProtein + "g", "#a78bfa"],
              ["Total Carbs", Object.values(dayMeals).reduce((a, m) => a + m.carbs, 0) + "g", "#60a5fa"],
              ["Total Fat", Object.values(dayMeals).reduce((a, m) => a + m.fat, 0) + "g", "#f87171"],
            ].map(([label, val, col]) => (
              <div key={label} style={S.statBox(col)}>
                <div style={{ fontSize: 20, fontWeight: 900, color: col }}>{val}</div>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Tip */}
        <div style={{ ...S.accentCard("#fbbf24"), padding: "12px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: "#fbbf24", marginBottom: 6 }}>💡 Budget Tip</div>
          <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.5 }}>
            {profile.budget === "low"
              ? "Buy dals, rice & oats in bulk from D-Mart or local bazaar. Eggs are the cheapest protein source at ₹6-7 each. Seasonal vegetables are always cheaper!"
              : "Paneer (homemade) costs ~₹30 less per 100g. Replace chicken with eggs 3x/week to save ₹150+. Whey protein is cheaper per gram than meat!"}
          </div>
        </div>
      </div>
    );
  };

  // ─── WORKOUT TAB ────────────────────────────────────────────────────────────

  const WorkoutTab = () => {
    const schedule = WORKOUTS.beginner[workoutType];
    const today = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];

    return (
      <div style={S.scroll}>
        <div style={S.sectionTitle}>🏋️ Weekly Workout Plan</div>

        <div style={{ ...S.chipRow, marginBottom: 16 }}>
          {[["home", "🏠 Home"], ["gym", "🏢 Gym"]].map(([v, l]) => (
            <div key={v} style={{ ...S.chip(workoutType === v), flex: 1, textAlign: "center" }}
              onClick={() => setWorkoutType(v)}>{l}</div>
          ))}
        </div>

        <div style={{ ...S.accentCard("#f87171"), display: "flex", justifyContent: "space-between", padding: "12px 16px" }}>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>LEVEL</div>
            <div style={{ fontWeight: 800, color: "#f87171" }}>🟢 Beginner</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>FREQUENCY</div>
            <div style={{ fontWeight: 800, color: "#f87171" }}>5 days/week</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>REST</div>
            <div style={{ fontWeight: 800, color: "#f87171" }}>2 days</div>
          </div>
        </div>

        {schedule.map((day) => (
          <div key={day.day} style={{
            ...S.card,
            border: day.day === today
              ? "1.5px solid rgba(255,107,53,0.6)"
              : "1px solid rgba(255,255,255,0.08)",
            background: day.day === today
              ? "linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,255,255,0.02))"
              : S.card.background,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <span style={{
                  fontSize: 13,
                  fontWeight: 900,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: day.day === today ? "#ff6b35" : "rgba(255,255,255,0.08)",
                  color: day.day === today ? "#fff" : "#9ca3af",
                  marginRight: 8,
                }}>{day.day}</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#f0f4ff" }}>{day.focus}</span>
                {day.day === today && <span style={{ fontSize: 11, color: "#ff6b35", fontWeight: 700, marginLeft: 8 }}>TODAY</span>}
              </div>
              <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>⏱ {day.duration}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {day.exercises.map(ex => (
                <span key={ex} style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.06)",
                  color: "#d1d5db",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontWeight: 600,
                }}>{ex}</span>
              ))}
            </div>
          </div>
        ))}

        <div style={{ ...S.accentCard("#34d399"), padding: "12px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: "#34d399", marginBottom: 6 }}>🔥 Pro Tips</div>
          <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>
            • Warm up 5 min before every session<br />
            • Rest 60-90s between sets<br />
            • Stay hydrated — drink 500ml before workout<br />
            • Progressive overload: add 1 rep/week<br />
            • Sleep 7-8 hours for maximum recovery
          </div>
        </div>
      </div>
    );
  };

  // ─── PROGRESS TAB ───────────────────────────────────────────────────────────

  const ProgressTab = () => {
    const maxW = Math.max(...progress.map(p => p.weight));
    const minW = Math.min(...progress.map(p => p.weight));
    const range = maxW - minW || 1;

    return (
      <div style={S.scroll}>
        <div style={S.sectionTitle}>📊 Progress Tracker</div>

        <div style={S.statGrid}>
          <div style={S.statBox("#34d399")}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#34d399" }}>
              {(progress[0].weight - progress[progress.length - 1].weight).toFixed(1)} kg
            </div>
            <div style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>Total Lost 🔥</div>
          </div>
          <div style={S.statBox("#a78bfa")}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#a78bfa" }}>4 Weeks</div>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 800 }}>Active Streak 🏆</div>
          </div>
        </div>

        {/* Weight Chart */}
        <div style={S.card}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>⚖️ Weight Trend</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120, padding: "0 4px" }}>
            {progress.map((p, i) => {
              const height = 30 + ((p.weight - minW) / range) * 70;
              return (
                <div key={p.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#fbbf24" }}>{p.weight}</div>
                  <div style={{
                    width: "100%",
                    height,
                    background: i === progress.length - 1
                      ? "linear-gradient(180deg, #ff6b35, #f7931e)"
                      : "linear-gradient(180deg, #374151, #1f2937)",
                    borderRadius: "6px 6px 0 0",
                    transition: "height 0.5s",
                  }} />
                  <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>{p.week}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges */}
        <div style={S.card}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🏅 Achievements</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["🔥", "First Workout", "Completed!", "#f87171", true],
              ["💧", "Hydration Hero", "7 day streak", "#60a5fa", true],
              ["🏃", "Step Master", "10K steps/day", "#34d399", false],
              ["💪", "Strength King", "Month Complete", "#a78bfa", false],
            ].map(([ic, title, sub, col, done]) => (
              <div key={title} style={{
                ...S.statBox(done ? col : "#374151"),
                opacity: done ? 1 : 0.5,
                padding: "12px 10px",
              }}>
                <div style={{ fontSize: 28 }}>{ic}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: done ? col : "#6b7280", marginTop: 4 }}>{title}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div style={{ ...S.accentCard("#a78bfa"), padding: "14px 16px" }}>
          <div style={{ fontWeight: 900, fontSize: 15, color: "#a78bfa", marginBottom: 8 }}>🤖 AI Suggestion</div>
          <div style={{ fontSize: 14, color: "#d1d5db", lineHeight: 1.6 }}>
            Great progress this month! You've lost <span style={{ color: "#34d399", fontWeight: 800 }}>2.2 kg</span> in 4 weeks.
            Based on your trend, increase protein intake by <span style={{ color: "#fbbf24", fontWeight: 800 }}>10g/day</span> to preserve
            muscle while cutting. Consider adding one extra 20-min walk on rest days.
          </div>
        </div>
      </div>
    );
  };

  // ─── PROFILE TAB ────────────────────────────────────────────────────────────

  const ProfileTab = () => (
    <div style={S.scroll}>
      <div style={S.sectionTitle}>👤 My Profile</div>

      <div style={{
        ...S.card,
        textAlign: "center",
        padding: "24px 16px",
        background: "linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,107,53,0.3)",
      }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>
          {profile.gender === "male" ? "🧑‍💪" : profile.gender === "female" ? "👩‍💪" : "🧑‍🏋️"}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#f0f4ff" }}>{profile.name || "FitBharat User"}</div>
        <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>
          {profile.age} yrs • {profile.weight} kg • {profile.height} cm
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          <span style={{ ...S.chip(true), fontSize: 12 }}>{profile.goal.replace("_", " ").toUpperCase()}</span>
          <span style={{ ...S.chip(true), fontSize: 12 }}>{profile.diet.toUpperCase()}</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={S.statGrid}>
        {[
          ["BMI", bmi, bmiCat.label, bmiCat.color],
          ["TDEE", tdee + " kcal", "Daily Burn", "#fbbf24"],
          ["Target", targetCal + " kcal", "Eat per day", "#34d399"],
          ["Water", waterGoal + " L", "Daily Goal", "#60a5fa"],
        ].map(([label, val, sub, col]) => (
          <div key={label} style={S.statBox(col)}>
            <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: col }}>{val}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Tech Stack Info */}
      <div style={S.card}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>🛠 App Tech Stack</div>
        {[
          ["⚛️", "Frontend", "React Native (iOS + Android)", "#60a5fa"],
          ["🟩", "Backend", "Node.js + Express.js", "#34d399"],
          ["🗄", "Database", "MongoDB + Redis (cache)", "#fbbf24"],
          ["🤖", "AI Engine", "Claude API (Anthropic)", "#a78bfa"],
          ["☁️", "Cloud", "AWS / Firebase", "#f87171"],
          ["🔔", "Push", "FCM Notifications", "#f7931e"],
        ].map(([ic, label, val, col]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: 20 }}>{ic}</span>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 13, color: col, fontWeight: 700 }}>{val}</div>
            </div>
          </div>
        ))}
      </div>

      <button style={S.btn("secondary")} onClick={() => setScreen("onboarding")}>
        ✏️ Edit Profile
      </button>
    </div>
  );

  const tabs = [
    ["home", "🏠", "Home"],
    ["diet", "🥗", "Diet"],
    ["workout", "🏋️", "Workout"],
    ["progress", "📊", "Progress"],
    ["profile", "👤", "Profile"],
  ];

  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>⚡ FitBharat</div>
        <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}
        </div>
      </div>

      {/* Content */}
      <div>
        {tab === "home" && <HomeTab />}
        {tab === "diet" && <DietTab />}
        {tab === "workout" && <WorkoutTab />}
        {tab === "progress" && <ProgressTab />}
        {tab === "profile" && <ProfileTab />}
      </div>

      {/* Bottom Nav */}
      <div style={S.navBar}>
        {tabs.map(([id, icon, label]) => (
          <div key={id} style={S.navItem(tab === id)} onClick={() => setTab(id)}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={S.navLabel(tab === id)}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
