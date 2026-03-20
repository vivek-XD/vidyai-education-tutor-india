import React, { useState } from "react";

const CLASSES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cls, setCls] = useState("Class 10");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([
    { email: "student@vidyai.in", password: "student123", name: "Arjun Kumar", role: "Student", class: "Class 10" },
    { email: "teacher@vidyai.in", password: "teacher123", name: "Ms. Priya Sharma", role: "Teacher", class: "Faculty" },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 900);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const exists = users.find(u => u.email === email);
      if (exists) {
        setError("Email already registered. Please login.");
        setLoading(false);
        return;
      }
      const newUser = { email, password, name, role, class: cls };
      setUsers(prev => [...prev, newUser]);
      onLogin(newUser);
      setLoading(false);
    }, 900);
  };

  const fillDemo = (u) => {
    setEmail(u.email);
    setPassword(u.password);
    setError("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgGrid}></div>
      <div style={styles.bgGlow1}></div>
      <div style={styles.bgGlow2}></div>

      <div style={styles.wrapper} className="animate-fadeInUp">
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L28 8V16C28 22.627 22.627 29.254 16 30C9.373 29.254 4 22.627 4 16V8L16 2Z" fill="url(#g1)"/>
              <path d="M11 16L14.5 19.5L21 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="g1" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4f8ef7"/><stop offset="1" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 style={styles.logoTitle} className="glow-text">VidyAI</h1>
            <p style={styles.logoSub}>Education Tutor for Rural India</p>
          </div>
        </div>

        <div className="card" style={styles.card}>
          <div style={styles.tabs}>
            <button onClick={() => { setMode("login"); setError(""); }} style={{ ...styles.tab, ...(mode === "login" ? styles.tabActive : {}) }}>
              Sign In
            </button>
            <button onClick={() => { setMode("signup"); setError(""); }} style={{ ...styles.tab, ...(mode === "signup" ? styles.tabActive : {}) }}>
              Sign Up
            </button>
          </div>

          {mode === "login" ? (
            <>
              <p style={styles.cardSub}>Welcome back! Continue your learning journey</p>
              <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Password</label>
                  <div style={styles.passWrap}>
                    <input className="input-field" type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: "48px" }}/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>{showPassword ? "🙈" : "👁"}</button>
                  </div>
                </div>
                {error && <div style={styles.errorBox}>⚠️ {error}</div>}
                <button className="btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "14px" }}>
                  {loading ? <span className="loader"></span> : "Sign In →"}
                </button>
              </form>

              <div style={styles.divider}>
                <span style={styles.divLine}></span>
                <span style={styles.divText}>Demo Accounts</span>
                <span style={styles.divLine}></span>
              </div>
              <div style={styles.demoGrid}>
                {users.slice(0, 2).map((u, i) => (
                  <button key={i} onClick={() => fillDemo(u)} style={styles.demoBtn}>
                    <div style={styles.demoAvatar}>{u.name[0]}</div>
                    <div>
                      <div style={styles.demoName}>{u.name}</div>
                      <div style={styles.demoRole}>{u.role} · {u.class}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p style={styles.cardSub}>Create your free account and start learning!</p>
              <form onSubmit={handleSignUp} style={styles.form}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input className="input-field" type="text" placeholder="Arjun Kumar" value={name} onChange={e => setName(e.target.value)} required/>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div style={styles.row}>
                  <div style={{ ...styles.fieldGroup, flex: 1 }}>
                    <label style={styles.label}>Role</label>
                    <select className="input-field" value={role} onChange={e => setRole(e.target.value)}>
                      <option>Student</option>
                      <option>Teacher</option>
                      <option>Parent</option>
                    </select>
                  </div>
                  <div style={{ ...styles.fieldGroup, flex: 1 }}>
                    <label style={styles.label}>Class</label>
                    <select className="input-field" value={cls} onChange={e => setCls(e.target.value)}>
                      {CLASSES.map(c => <option key={c}>{c}</option>)}
                      <option>Faculty</option>
                    </select>
                  </div>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Password</label>
                  <div style={styles.passWrap}>
                    <input className="input-field" type={showPassword ? "text" : "password"} placeholder="Create password" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: "48px" }}/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>{showPassword ? "🙈" : "👁"}</button>
                  </div>
                </div>
                {error && <div style={styles.errorBox}>⚠️ {error}</div>}
                <button className="btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "14px" }}>
                  {loading ? <span className="loader"></span> : "Create Account →"}
                </button>
              </form>
            </>
          )}
        </div>

        <div style={styles.footer}>
          <span className="badge badge-green">🟢 Free Forever</span>
          <span className="badge badge-blue">⚡ Powered by Groq</span>
          <span className="badge badge-purple">🇮🇳 Made for India</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", position: "relative", overflow: "hidden", padding: "20px" },
  bgGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" },
  bgGlow1: { position: "absolute", top: "-20%", left: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)", pointerEvents: "none" },
  bgGlow2: { position: "absolute", bottom: "-20%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", pointerEvents: "none" },
  wrapper: { width: "100%", maxWidth: "460px", position: "relative", zIndex: 1 },
  logoSection: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px", justifyContent: "center" },
  logoIcon: { width: "50px", height: "50px", borderRadius: "14px", background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" },
  logoTitle: { fontSize: "30px", fontWeight: "800", letterSpacing: "-1px" },
  logoSub: { fontSize: "12px", color: "var(--text-secondary)" },
  card: { padding: "32px" },
  tabs: { display: "flex", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "4px", marginBottom: "20px", gap: "4px" },
  tab: { flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "transparent", color: "var(--text-secondary)", fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease" },
  tabActive: { background: "var(--bg-card)", color: "var(--text-primary)", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" },
  cardSub: { fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "7px" },
  row: { display: "flex", gap: "12px" },
  label: { fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)", letterSpacing: "0.3px" },
  passWrap: { position: "relative" },
  eyeBtn: { position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px" },
  errorBox: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-sm)", padding: "11px 14px", fontSize: "13px", color: "#fca5a5" },
  divider: { display: "flex", alignItems: "center", gap: "10px", margin: "20px 0 16px" },
  divLine: { flex: 1, height: "1px", background: "var(--border)" },
  divText: { fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" },
  demoGrid: { display: "flex", flexDirection: "column", gap: "8px" },
  demoBtn: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", textAlign: "left", width: "100%", color: "var(--text-primary)", fontFamily: "Sora, sans-serif", transition: "all 0.2s ease" },
  demoAvatar: { width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #4f8ef7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", flexShrink: 0 },
  demoName: { fontSize: "13px", fontWeight: "600" },
  demoRole: { fontSize: "11px", color: "var(--text-secondary)", marginTop: "1px" },
  footer: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" },
};
