import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8000";

const PW_TOPICS = {
  "Class 6": {
    "Science": [
      { title: "Food: Where Does It Come From?", url: "https://www.youtube.com/results?search_query=class+6+food+where+does+it+come+from+physicswallah" },
      { title: "Components of Food", url: "https://www.youtube.com/results?search_query=class+6+components+of+food+physicswallah" },
      { title: "Fibre to Fabric", url: "https://www.youtube.com/results?search_query=class+6+fibre+to+fabric+physicswallah" },
      { title: "Sorting Materials", url: "https://www.youtube.com/results?search_query=class+6+sorting+materials+physicswallah" },
      { title: "Changes Around Us", url: "https://www.youtube.com/results?search_query=class+6+changes+around+us+physicswallah" },
    ],
    "Math": [
      { title: "Knowing Our Numbers", url: "https://www.youtube.com/results?search_query=class+6+knowing+our+numbers+physicswallah" },
      { title: "Whole Numbers", url: "https://www.youtube.com/results?search_query=class+6+whole+numbers+physicswallah" },
      { title: "Playing with Numbers", url: "https://www.youtube.com/results?search_query=class+6+playing+with+numbers+physicswallah" },
      { title: "Basic Geometrical Ideas", url: "https://www.youtube.com/results?search_query=class+6+basic+geometrical+ideas+physicswallah" },
      { title: "Fractions", url: "https://www.youtube.com/results?search_query=class+6+fractions+physicswallah" },
    ],
  },
  "Class 9": {
    "Physics": [
      { title: "Motion", url: "https://www.youtube.com/results?search_query=class+9+motion+physicswallah" },
      { title: "Force and Laws of Motion", url: "https://www.youtube.com/results?search_query=class+9+force+laws+of+motion+physicswallah" },
      { title: "Gravitation", url: "https://www.youtube.com/results?search_query=class+9+gravitation+physicswallah" },
      { title: "Work and Energy", url: "https://www.youtube.com/results?search_query=class+9+work+and+energy+physicswallah" },
      { title: "Sound", url: "https://www.youtube.com/results?search_query=class+9+sound+physicswallah" },
    ],
    "Chemistry": [
      { title: "Matter in Our Surroundings", url: "https://www.youtube.com/results?search_query=class+9+matter+in+our+surroundings+physicswallah" },
      { title: "Is Matter Around Us Pure?", url: "https://www.youtube.com/results?search_query=class+9+is+matter+pure+physicswallah" },
      { title: "Atoms and Molecules", url: "https://www.youtube.com/results?search_query=class+9+atoms+and+molecules+physicswallah" },
      { title: "Structure of the Atom", url: "https://www.youtube.com/results?search_query=class+9+structure+of+atom+physicswallah" },
    ],
    "Biology": [
      { title: "The Fundamental Unit of Life", url: "https://www.youtube.com/results?search_query=class+9+fundamental+unit+of+life+physicswallah" },
      { title: "Tissues", url: "https://www.youtube.com/results?search_query=class+9+tissues+physicswallah" },
      { title: "Diversity in Living Organisms", url: "https://www.youtube.com/results?search_query=class+9+diversity+living+organisms+physicswallah" },
    ],
    "Math": [
      { title: "Number Systems", url: "https://www.youtube.com/results?search_query=class+9+number+systems+physicswallah" },
      { title: "Polynomials", url: "https://www.youtube.com/results?search_query=class+9+polynomials+physicswallah" },
      { title: "Triangles", url: "https://www.youtube.com/results?search_query=class+9+triangles+physicswallah" },
      { title: "Statistics", url: "https://www.youtube.com/results?search_query=class+9+statistics+physicswallah" },
    ],
  },
  "Class 10": {
    "Physics": [
      { title: "Light: Reflection & Refraction", url: "https://www.youtube.com/results?search_query=class+10+light+reflection+refraction+physicswallah" },
      { title: "Human Eye", url: "https://www.youtube.com/results?search_query=class+10+human+eye+physicswallah" },
      { title: "Electricity", url: "https://www.youtube.com/results?search_query=class+10+electricity+physicswallah" },
      { title: "Magnetic Effects of Current", url: "https://www.youtube.com/results?search_query=class+10+magnetic+effects+physicswallah" },
    ],
    "Chemistry": [
      { title: "Chemical Reactions", url: "https://www.youtube.com/results?search_query=class+10+chemical+reactions+physicswallah" },
      { title: "Acids, Bases and Salts", url: "https://www.youtube.com/results?search_query=class+10+acids+bases+salts+physicswallah" },
      { title: "Metals and Non-metals", url: "https://www.youtube.com/results?search_query=class+10+metals+non+metals+physicswallah" },
      { title: "Carbon and Its Compounds", url: "https://www.youtube.com/results?search_query=class+10+carbon+compounds+physicswallah" },
    ],
    "Biology": [
      { title: "Life Processes", url: "https://www.youtube.com/results?search_query=class+10+life+processes+physicswallah" },
      { title: "Control and Coordination", url: "https://www.youtube.com/results?search_query=class+10+control+coordination+physicswallah" },
      { title: "Heredity and Evolution", url: "https://www.youtube.com/results?search_query=class+10+heredity+evolution+physicswallah" },
    ],
    "Math": [
      { title: "Real Numbers", url: "https://www.youtube.com/results?search_query=class+10+real+numbers+physicswallah" },
      { title: "Quadratic Equations", url: "https://www.youtube.com/results?search_query=class+10+quadratic+equations+physicswallah" },
      { title: "Trigonometry", url: "https://www.youtube.com/results?search_query=class+10+trigonometry+physicswallah" },
      { title: "Statistics & Probability", url: "https://www.youtube.com/results?search_query=class+10+statistics+probability+physicswallah" },
    ],
  },
  "Class 11": {
    "Physics": [
      { title: "Laws of Motion", url: "https://www.youtube.com/results?search_query=class+11+laws+of+motion+physicswallah" },
      { title: "Work, Energy and Power", url: "https://www.youtube.com/results?search_query=class+11+work+energy+power+physicswallah" },
      { title: "Thermodynamics", url: "https://www.youtube.com/results?search_query=class+11+thermodynamics+physicswallah" },
      { title: "Waves", url: "https://www.youtube.com/results?search_query=class+11+waves+physicswallah" },
      { title: "Gravitation", url: "https://www.youtube.com/results?search_query=class+11+gravitation+physicswallah" },
    ],
    "Chemistry": [
      { title: "Some Basic Concepts", url: "https://www.youtube.com/results?search_query=class+11+basic+concepts+chemistry+physicswallah" },
      { title: "Atomic Structure", url: "https://www.youtube.com/results?search_query=class+11+atomic+structure+physicswallah" },
      { title: "Chemical Bonding", url: "https://www.youtube.com/results?search_query=class+11+chemical+bonding+physicswallah" },
      { title: "Equilibrium", url: "https://www.youtube.com/results?search_query=class+11+equilibrium+physicswallah" },
    ],
    "Math": [
      { title: "Sets and Functions", url: "https://www.youtube.com/results?search_query=class+11+sets+functions+physicswallah" },
      { title: "Trigonometric Functions", url: "https://www.youtube.com/results?search_query=class+11+trigonometric+functions+physicswallah" },
      { title: "Limits and Derivatives", url: "https://www.youtube.com/results?search_query=class+11+limits+derivatives+physicswallah" },
      { title: "Statistics", url: "https://www.youtube.com/results?search_query=class+11+statistics+physicswallah" },
    ],
  },
  "Class 12": {
    "Physics": [
      { title: "Electrostatics", url: "https://www.youtube.com/results?search_query=class+12+electrostatics+physicswallah" },
      { title: "Current Electricity", url: "https://www.youtube.com/results?search_query=class+12+current+electricity+physicswallah" },
      { title: "Optics", url: "https://www.youtube.com/results?search_query=class+12+optics+physicswallah" },
      { title: "Modern Physics", url: "https://www.youtube.com/results?search_query=class+12+modern+physics+physicswallah" },
      { title: "Semiconductor Electronics", url: "https://www.youtube.com/results?search_query=class+12+semiconductor+electronics+physicswallah" },
    ],
    "Chemistry": [
      { title: "Solid State", url: "https://www.youtube.com/results?search_query=class+12+solid+state+physicswallah" },
      { title: "Electrochemistry", url: "https://www.youtube.com/results?search_query=class+12+electrochemistry+physicswallah" },
      { title: "Organic Chemistry", url: "https://www.youtube.com/results?search_query=class+12+organic+chemistry+physicswallah" },
      { title: "Biomolecules", url: "https://www.youtube.com/results?search_query=class+12+biomolecules+physicswallah" },
    ],
    "Math": [
      { title: "Relations and Functions", url: "https://www.youtube.com/results?search_query=class+12+relations+functions+physicswallah" },
      { title: "Integrals", url: "https://www.youtube.com/results?search_query=class+12+integrals+physicswallah" },
      { title: "Differential Equations", url: "https://www.youtube.com/results?search_query=class+12+differential+equations+physicswallah" },
      { title: "Probability", url: "https://www.youtube.com/results?search_query=class+12+probability+physicswallah" },
    ],
    "Biology": [
      { title: "Reproduction", url: "https://www.youtube.com/results?search_query=class+12+reproduction+physicswallah" },
      { title: "Genetics and Evolution", url: "https://www.youtube.com/results?search_query=class+12+genetics+evolution+physicswallah" },
      { title: "Human Health and Disease", url: "https://www.youtube.com/results?search_query=class+12+human+health+disease+physicswallah" },
      { title: "Biotechnology", url: "https://www.youtube.com/results?search_query=class+12+biotechnology+physicswallah" },
    ],
  },
};

const ALL_CLASSES = ["Class 6", "Class 9", "Class 10", "Class 11", "Class 12"];
const SUBJECT_COLORS = { Physics: "#4f8ef7", Chemistry: "#10b981", Math: "#f59e0b", Biology: "#ec4899", Science: "#8b5cf6" };

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("upload");
  const [sessionId, setSessionId] = useState(null);
  const [bookName, setBookName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [selectedClass, setSelectedClass] = useState(user.class && PW_TOPICS[user.class] ? user.class : "Class 10");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const fileRef = useRef();
  const chatRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const subjects = Object.keys(PW_TOPICS[selectedClass] || {});
    if (subjects.length > 0) setSelectedSubject(subjects[0]);
  }, [selectedClass]);

  useEffect(() => {
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [stream]);

  const handleFile = async (file) => {
    if (!file || !file.name.endsWith(".pdf")) { alert("Please upload a PDF file only."); return; }
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${API}/upload`, formData, {
        onUploadProgress: (e) => setUploadProgress(Math.round((e.loaded / e.total) * 100)),
      });
      setSessionId(res.data.session_id);
      setBookName(file.name.replace(".pdf", ""));
      setUploadDone(true);
      setMessages([{ role: "assistant", text: `📚 ${file.name} processed! Found ${res.data.chapters_found} chapters. Ask me anything!`, time: new Date().toLocaleTimeString() }]);
      setActiveTab("chat");
    } catch { alert("Upload failed. Make sure backend is running on port 8000."); }
    setUploading(false);
  };

  const openCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(s);
      setCameraOpen(true);
      setCapturedImage(null);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = s; }, 100);
    } catch { alert("Camera access denied. Please allow camera permission."); }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);
    stream.getTracks().forEach(t => t.stop());
    setStream(null);
  };

  const askWithPhoto = async () => {
    if (!capturedImage) return;
    setCameraOpen(false);
    setMessages(prev => [...prev, {
      role: "user",
      text: "📸 Sent a photo question",
      image: capturedImage,
      time: new Date().toLocaleTimeString()
    }]);
    setAsking(true);
    setActiveTab("chat");
    try {
      const res = await axios.post(`${API}/ask`, {
        session_id: sessionId || "photo_session",
        question: "Please help me solve or explain what is shown in this image. Describe the problem and provide a step-by-step solution."
      });
      setMessages(prev => [...prev, {
        role: "assistant",
        text: res.data.answer,
        time: new Date().toLocaleTimeString(),
      }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "❌ Could not process photo. Please try again.", time: new Date().toLocaleTimeString() }]);
    }
    setAsking(false);
    setCapturedImage(null);
  };

  const askQuestion = async () => {
    if (!question.trim() || !sessionId) return;
    const q = question.trim();
    setQuestion("");
    setMessages(prev => [...prev, { role: "user", text: q, time: new Date().toLocaleTimeString() }]);
    setAsking(true);
    try {
      const res = await axios.post(`${API}/ask`, { session_id: sessionId, question: q });
      const stats = res.data.context_stats;
      setTotalSaved(prev => prev + stats.reduction_percent);
      setTotalTokens(prev => prev + res.data.tokens_used.total_tokens);
      setMessages(prev => [...prev, {
        role: "assistant", text: res.data.answer, time: new Date().toLocaleTimeString(),
        stats: { saved: stats.reduction_percent, chapters: stats.chapters_used, total: stats.total_chapters, tokens: res.data.tokens_used.total_tokens }
      }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "❌ Error. Please try again.", time: new Date().toLocaleTimeString() }]);
    }
    setAsking(false);
  };

  const subjects = Object.keys(PW_TOPICS[selectedClass] || {});

  return (
    <div style={styles.container}>
      <div style={styles.bgGrid}></div>

      {cameraOpen && (
        <div style={styles.cameraOverlay}>
          <div style={styles.cameraModal}>
            <div style={styles.cameraHeader}>
              <h3 style={styles.cameraTitle}>📸 Camera Scanner</h3>
              <button onClick={() => { setCameraOpen(false); if (stream) stream.getTracks().forEach(t => t.stop()); }} style={styles.closeBtn}>✕</button>
            </div>
            {!capturedImage ? (
              <>
                <video ref={videoRef} autoPlay playsInline style={styles.video}/>
                <canvas ref={canvasRef} style={{ display: "none" }}/>
                <div style={styles.cameraActions}>
                  <p style={styles.cameraTip}>Point camera at your question or problem</p>
                  <button className="btn-primary" onClick={capturePhoto} style={styles.captureBtn}>📷 Capture</button>
                </div>
              </>
            ) : (
              <>
                <img src={capturedImage} alt="captured" style={styles.preview}/>
                <div style={styles.cameraActions}>
                  <button onClick={() => { setCapturedImage(null); openCamera(); }} style={styles.retakeBtn}>🔄 Retake</button>
                  <button className="btn-primary" onClick={askWithPhoto} style={{ flex: 1 }}>🤖 Ask AI →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.sideLogoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L28 8V16C28 22.627 22.627 29.254 16 30C9.373 29.254 4 22.627 4 16V8L16 2Z" fill="url(#g2)"/>
              <path d="M11 16L14.5 19.5L21 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs><linearGradient id="g2" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#4f8ef7"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs>
            </svg>
          </div>
          <span style={styles.sideLogoText} className="glow-text">VidyAI</span>
        </div>

        <nav style={styles.nav}>
          {[
            { id: "upload", icon: "📤", label: "Upload Book" },
            { id: "chat", icon: "💬", label: "Ask Tutor" },
            { id: "topics", icon: "🎓", label: "PW Topics" },
            { id: "stats", icon: "📊", label: "Cost Savings" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ ...styles.navBtn, ...(activeTab === tab.id ? styles.navBtnActive : {}) }}>
              <span>{tab.icon}</span>
              <span style={{ flex: 1 }}>{tab.label}</span>
              {activeTab === tab.id && <span style={styles.navDot}></span>}
            </button>
          ))}
        </nav>

        <div style={styles.sideBottom}>
          {uploadDone && (
            <div style={styles.activeBook}>
              <span>📖</span>
              <div style={{ minWidth: 0 }}>
                <div style={styles.bookName}>{bookName}</div>
                <div style={styles.bookSub}>Active Textbook</div>
              </div>
            </div>
          )}
          <button onClick={openCamera} style={styles.cameraBtn}>
            📸 Scan Question
          </button>
          <div style={styles.userCard}>
            <div style={styles.userAvatar}>{user.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userRole}>{user.role} · {user.class}</div>
            </div>
            <button onClick={onLogout} style={styles.logoutBtn} title="Logout">⏻</button>
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        {activeTab === "upload" && (
          <div style={styles.content} className="animate-fadeInUp">
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>Upload Textbook</h1>
              <p style={styles.pageSub}>Upload any state-board PDF to get started</p>
            </div>
            <div style={{ ...styles.dropzone, ...(dragOver ? styles.dropzoneActive : {}) }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current.click()}>
              <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])}/>
              {uploading ? (
                <div style={styles.uploadingState}>
                  <div style={styles.progressRing}>
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="6"/>
                      <circle cx="40" cy="40" r="32" fill="none" stroke="url(#pg)" strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - uploadProgress / 100)}`}
                        strokeLinecap="round" transform="rotate(-90 40 40)" style={{ transition: "stroke-dashoffset 0.3s" }}/>
                      <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#4f8ef7"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs>
                    </svg>
                    <span style={styles.progressText}>{uploadProgress}%</span>
                  </div>
                  <p style={{ fontWeight: 600 }}>Processing textbook...</p>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Extracting chapters & building index</p>
                </div>
              ) : (
                <div style={styles.dropContent}>
                  <div style={styles.dropIcon}>📄</div>
                  <h3 style={styles.dropTitle}>Drop your PDF here</h3>
                  <p style={styles.dropSub}>or click to browse files</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
                    <span className="badge badge-blue">PDF Only</span>
                    <span className="badge badge-green">Any Size</span>
                    <span className="badge badge-purple">State Board Ready</span>
                  </div>
                </div>
              )}
            </div>
            <div style={styles.infoGrid}>
              {[
                { icon: "✂️", title: "Context Pruning", desc: "Only relevant chapters sent to AI — saves 80%+ cost", color: "#4f8ef7" },
                { icon: "🔒", title: "Local Processing", desc: "Embeddings built locally, no data leaves your device", color: "#10b981" },
                { icon: "📡", title: "Low Bandwidth", desc: "Minimal data transfer — works on 2G connections", color: "#f59e0b" },
              ].map((item, i) => (
                <div key={i} className="card" style={styles.infoCard}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{item.icon}</div>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px", color: item.color }}>{item.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div style={styles.chatLayout} className="animate-fadeIn">
            <div style={styles.chatHeader}>
              <div>
                <h2 style={styles.chatTitle}>AI Tutor</h2>
                <p style={styles.chatSub}>{uploadDone ? `📖 ${bookName}` : "Upload a textbook first"}</p>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button onClick={openCamera} style={styles.camHeaderBtn}>📸 Scan</button>
                <span className="badge badge-green">● Live</span>
              </div>
            </div>
            <div ref={chatRef} style={styles.chatMessages}>
              {messages.length === 0 && (
                <div style={styles.emptyChat}>
                  <div style={{ fontSize: "48px" }}>🎓</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600 }}>Upload a textbook to begin</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Your AI tutor is ready to help you learn</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} style={{ ...styles.msgWrap, ...(msg.role === "user" ? styles.msgWrapUser : {}) }}>
                  {msg.role === "assistant" && <div style={styles.msgAvatar}>🤖</div>}
                  <div style={{ maxWidth: "75%" }}>
                    <div style={{ ...styles.msgBubble, ...(msg.role === "user" ? styles.msgUser : styles.msgBot) }}>
                      {msg.image && <img src={msg.image} alt="question" style={styles.msgImg}/>}
                      <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.6 }}>{msg.text}</p>
                    </div>
                    {msg.stats && (
                      <div style={styles.statsRow}>
                        <span style={styles.chip}>✂️ {msg.stats.saved}% pruned</span>
                        <span style={styles.chip}>📚 {msg.stats.chapters}/{msg.stats.total} chapters</span>
                        <span style={styles.chip}>🔤 {msg.stats.tokens} tokens</span>
                      </div>
                    )}
                    <div style={styles.msgTime}>{msg.time}</div>
                  </div>
                  {msg.role === "user" && <div style={styles.msgAvatarUser}>{user.name[0]}</div>}
                </div>
              ))}
              {asking && (
                <div style={styles.msgWrap}>
                  <div style={styles.msgAvatar}>🤖</div>
                  <div style={styles.typingBubble}>
                    {[0, 0.2, 0.4].map((d, i) => <span key={i} style={{ ...styles.dot, animationDelay: `${d}s` }}></span>)}
                  </div>
                </div>
              )}
            </div>
            <div style={styles.inputArea}>
              <input className="input-field" style={{ flex: 1 }}
                placeholder={uploadDone ? "Ask anything from your textbook..." : "Upload a textbook first..."}
                value={question} onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && askQuestion()}
                disabled={!uploadDone || asking}/>
              <button onClick={openCamera} style={styles.camInputBtn}>📸</button>
              <button className="btn-primary" onClick={askQuestion} disabled={!uploadDone || asking || !question.trim()}>
                {asking ? <span className="loader"></span> : "Send →"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "topics" && (
          <div style={styles.content} className="animate-fadeInUp">
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>📺 PhysicsWallah Topics</h1>
              <p style={styles.pageSub}>Click any topic to watch on YouTube</p>
            </div>
            <div style={styles.classRow}>
              {ALL_CLASSES.map(c => (
                <button key={c} onClick={() => setSelectedClass(c)}
                  style={{ ...styles.classBtn, ...(selectedClass === c ? styles.classBtnActive : {}) }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={styles.subjectRow}>
              {subjects.map(s => (
                <button key={s} onClick={() => setSelectedSubject(s)}
                  style={{ ...styles.subjectBtn, ...(selectedSubject === s ? { ...styles.subjectBtnActive, borderColor: SUBJECT_COLORS[s], color: SUBJECT_COLORS[s], background: `${SUBJECT_COLORS[s]}18` } : {}) }}>
                  {s}
                </button>
              ))}
            </div>
            {selectedSubject && PW_TOPICS[selectedClass][selectedSubject] && (
              <div style={styles.topicsGrid}>
                {PW_TOPICS[selectedClass][selectedSubject].map((topic, i) => (
                  <a key={i} href={topic.url} target="_blank" rel="noopener noreferrer" style={styles.topicCard}>
                    <div style={{ ...styles.topicNum, background: SUBJECT_COLORS[selectedSubject] }}>{i + 1}</div>
                    <div style={styles.topicTitle}>{topic.title}</div>
                    <div style={styles.ytBadge}>▶ YouTube</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div style={styles.content} className="animate-fadeInUp">
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>Cost Savings Dashboard</h1>
              <p style={styles.pageSub}>Context Pruning vs Baseline RAG comparison</p>
            </div>
            <div style={styles.statsGrid}>
              {[
                { label: "Avg Context Reduction", value: messages.filter(m => m.stats).length > 0 ? `${Math.round(totalSaved / messages.filter(m => m.stats).length)}%` : "—", icon: "✂️", color: "#10b981" },
                { label: "Total Tokens Used", value: totalTokens || "—", icon: "🔤", color: "#4f8ef7" },
                { label: "Questions Asked", value: messages.filter(m => m.role === "user").length, icon: "💬", color: "#7c3aed" },
                { label: "Est. Cost Saved", value: totalTokens ? `$${((totalTokens * 0.8 * 0.0001) / 1000).toFixed(4)}` : "—", icon: "💰", color: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: s.color, fontFamily: "JetBrains Mono, monospace", marginBottom: "6px" }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "24px" }}>Baseline RAG vs Context Pruning</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#ef4444", marginBottom: "4px" }}>❌ Baseline RAG</div>
                  {["Sends entire textbook every query", "~50,000 tokens per query", "High latency on slow networks", "Expensive for rural students", "Not viable on 2G"].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }}><span style={{ color: "#ef4444" }}>✗</span>{t}</div>
                  ))}
                </div>
                <div style={{ width: "1px", background: "var(--border)" }}></div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#10b981", marginBottom: "4px" }}>✅ Context Pruning</div>
                  {["Sends only 2-3 relevant chapters", "~3,000 tokens per query", "Fast even on 2G networks", "80%+ cost reduction", "Built for rural India"].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }}><span style={{ color: "#10b981" }}>✓</span>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { display: "flex", minHeight: "100vh", background: "var(--bg-primary)", position: "relative" },
  bgGrid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(79,142,247,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" },
  sidebar: { width: "240px", flexShrink: 0, background: "var(--bg-secondary)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "20px 14px", position: "sticky", top: 0, height: "100vh" },
  sidebarLogo: { display: "flex", alignItems: "center", gap: "10px", padding: "6px 10px", marginBottom: "28px" },
  sideLogoIcon: { width: "36px", height: "36px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" },
  sideLogoText: { fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px" },
  nav: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  navBtn: { display: "flex", alignItems: "center", gap: "10px", padding: "11px 12px", borderRadius: "var(--radius-sm)", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 500, transition: "all 0.2s", width: "100%" },
  navBtnActive: { background: "rgba(79,142,247,0.1)", color: "var(--accent-primary)", fontWeight: 600 },
  navDot: { width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-primary)" },
  sideBottom: { display: "flex", flexDirection: "column", gap: "10px" },
  activeBook: { display: "flex", alignItems: "center", gap: "8px", padding: "10px", background: "rgba(79,142,247,0.08)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(79,142,247,0.2)", fontSize: "20px" },
  bookName: { fontSize: "11px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "140px" },
  bookSub: { fontSize: "10px", color: "var(--accent-primary)", marginTop: "1px" },
  cameraBtn: { width: "100%", padding: "11px", background: "linear-gradient(135deg, rgba(79,142,247,0.15), rgba(124,58,237,0.15))", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
  userCard: { display: "flex", alignItems: "center", gap: "8px", padding: "10px", background: "var(--bg-card)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" },
  userAvatar: { width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #4f8ef7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0 },
  userName: { fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  userRole: { fontSize: "10px", color: "var(--text-secondary)" },
  logoutBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "var(--text-muted)" },
  main: { flex: 1, overflow: "auto", display: "flex", flexDirection: "column" },
  content: { padding: "36px", maxWidth: "900px", width: "100%" },
  pageHeader: { marginBottom: "28px" },
  pageTitle: { fontSize: "26px", fontWeight: 700, marginBottom: "6px" },
  pageSub: { fontSize: "14px", color: "var(--text-secondary)" },
  dropzone: { border: "2px dashed var(--border)", borderRadius: "var(--radius)", padding: "56px 40px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", background: "var(--bg-card)", marginBottom: "20px" },
  dropzoneActive: { borderColor: "var(--accent-primary)", background: "rgba(79,142,247,0.05)", boxShadow: "var(--shadow-glow)" },
  uploadingState: { display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" },
  progressRing: { position: "relative", width: "80px", height: "80px" },
  progressText: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "14px", fontWeight: 700, color: "var(--accent-primary)" },
  dropContent: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  dropIcon: { fontSize: "44px", marginBottom: "6px" },
  dropTitle: { fontSize: "18px", fontWeight: 600 },
  dropSub: { fontSize: "13px", color: "var(--text-secondary)" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" },
  infoCard: { textAlign: "center", padding: "22px 16px" },
  chatLayout: { display: "flex", flexDirection: "column", height: "100vh" },
  chatHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" },
  chatTitle: { fontSize: "18px", fontWeight: 700 },
  chatSub: { fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" },
  chatMessages: { flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: "18px" },
  emptyChat: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: "10px", opacity: 0.5, marginTop: "80px" },
  msgWrap: { display: "flex", alignItems: "flex-start", gap: "10px" },
  msgWrapUser: { flexDirection: "row-reverse" },
  msgAvatar: { width: "34px", height: "34px", borderRadius: "50%", background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 },
  msgAvatarUser: { width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,#4f8ef7,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0 },
  msgBubble: { padding: "12px 16px", borderRadius: "14px" },
  msgBot: { background: "var(--bg-card)", border: "1px solid var(--border)", borderTopLeftRadius: "4px" },
  msgUser: { background: "linear-gradient(135deg,#4f8ef7,#7c3aed)", borderTopRightRadius: "4px" },
  msgImg: { width: "100%", maxWidth: "280px", borderRadius: "8px", marginBottom: "8px", display: "block" },
  msgTime: { fontSize: "10px", color: "var(--text-muted)", marginTop: "4px", paddingLeft: "4px" },
  statsRow: { display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" },
  chip: { fontSize: "10px", padding: "3px 8px", background: "rgba(79,142,247,0.1)", border: "1px solid rgba(79,142,247,0.2)", borderRadius: "20px", color: "var(--accent-primary)" },
  typingBubble: { padding: "14px 18px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", borderTopLeftRadius: "4px", display: "flex", gap: "6px", alignItems: "center" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-primary)", animation: "pulse-glow 1.2s ease infinite", display: "block" },
  inputArea: { padding: "16px 28px", borderTop: "1px solid var(--border)", background: "var(--bg-secondary)", display: "flex", gap: "10px" },
  camHeaderBtn: { padding: "8px 14px", background: "rgba(79,142,247,0.1)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", cursor: "pointer", fontFamily: "Sora,sans-serif", fontSize: "12px", fontWeight: 600 },
  camInputBtn: { padding: "12px 16px", background: "rgba(79,142,247,0.1)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "16px", flexShrink: 0 },
  classRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" },
  classBtn: { padding: "8px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "Sora,sans-serif", fontSize: "13px", fontWeight: 500, transition: "all 0.2s" },
  classBtnActive: { background: "rgba(79,142,247,0.15)", borderColor: "var(--accent-primary)", color: "var(--accent-primary)", fontWeight: 700 },
  subjectRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" },
  subjectBtn: { padding: "7px 18px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "Sora,sans-serif", fontSize: "13px", fontWeight: 500, transition: "all 0.2s" },
  subjectBtnActive: { fontWeight: 700 },
  topicsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "14px" },
  topicCard: { display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--text-primary)", transition: "all 0.2s", cursor: "pointer" },
  topicNum: { width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "white", flexShrink: 0 },
  topicTitle: { flex: 1, fontSize: "13px", fontWeight: 500, lineHeight: 1.4 },
  ytBadge: { fontSize: "10px", padding: "3px 8px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", color: "#f87171", flexShrink: 0 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "20px" },
  cameraOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  cameraModal: { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "16px" },
  cameraHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  cameraTitle: { fontSize: "16px", fontWeight: 700 },
  closeBtn: { background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", cursor: "pointer", padding: "6px 10px", fontSize: "14px" },
  video: { width: "100%", borderRadius: "var(--radius-sm)", background: "#000", minHeight: "240px" },
  preview: { width: "100%", borderRadius: "var(--radius-sm)", maxHeight: "300px", objectFit: "contain", background: "#000" },
  cameraActions: { display: "flex", gap: "10px", alignItems: "center" },
  cameraTip: { flex: 1, fontSize: "12px", color: "var(--text-secondary)" },
  captureBtn: { flexShrink: 0 },
  retakeBtn: { padding: "11px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", cursor: "pointer", fontFamily: "Sora,sans-serif", fontSize: "13px", fontWeight: 600 },
};
