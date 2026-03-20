# VidyAI — AI Education Tutor for Rural India 🇮🇳

<div align="center">

![VidyAI Banner](https://img.shields.io/badge/VidyAI-Education%20Tutor-4f8ef7?style=for-the-badge&logo=graduation-cap)
![Intel Unnati](https://img.shields.io/badge/Intel%20Unnati-GenAI%202025-0071C5?style=for-the-badge&logo=intel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

**An intelligent AI tutoring system that ingests state-board textbooks and provides personalized, curriculum-aligned answers — optimized for low-cost, low-bandwidth rural India.**

[Live Demo](#) • [GitHub Repo](https://github.com/vivek-XD/vidyai-education-tutor-india) • [Video Demo](#)

</div>

---

## 🎯 Problem Statement

AI tutors are revolutionizing education — but they are **expensive to run**.

In rural India:
- Internet is **spotty** (2G/3G connections)
- Computing power is **low**
- Students **cannot afford** high-latency, high-cost queries to massive models like GPT-4

**The challenge:** Build an intelligent tutoring system capable of ingesting entire state-board textbooks and providing personalized, curriculum-aligned answers — while optimizing for **lowest cost per query** and **minimal data transfer**.

---

## 💡 Solution — Context Pruning

Traditional RAG systems send the **entire textbook** to the LLM on every query — wasteful and expensive.

VidyAI uses **Context Pruning** to solve this:

```
Student asks: "What is photosynthesis?"
                    ↓
    FAISS searches all chapters locally
                    ↓
    Top 3 relevant chapters selected ✂️
                    ↓
    Only ~3,000 tokens sent to LLM
    (instead of ~50,000 for full book)
                    ↓
    Answer returned — 94% cheaper! 💰
```

---

## 💰 Cost Comparison

| Method | Tokens per Query | Est. Cost per Query | Monthly Cost (1000 queries) |
|--------|----------------|--------------------|-----------------------------|
| ❌ Baseline RAG | ~50,000 tokens | ~$0.005 | ~$5.00 |
| ✅ VidyAI Context Pruning | ~3,000 tokens | ~$0.0003 | ~$0.30 |
| **💰 Savings** | **94% reduction** | **~$0.0047 saved** | **~$4.70 saved** |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📚 PDF Textbook Ingestion | Upload any state-board PDF textbook |
| ✂️ Context Pruning | Only relevant chapters sent to LLM — saves 80-94% cost |
| 💬 AI Tutor Chat | Ask questions, get curriculum-aligned answers instantly |
| 📸 Camera Scanner | Scan handwritten questions with your phone camera |
| 🎓 PhysicsWallah Topics | Class 6-12 topic browser with direct YouTube links |
| 📊 Cost Savings Dashboard | Real-time token usage and cost comparison metrics |
| 🔐 Auth System | Login + Sign Up with Student/Teacher/Parent roles |
| ⚡ Groq Powered | Ultra-fast LLaMA 3.1 inference — low latency |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (React)                  │
│  Login/SignUp → Upload PDF → Chat → PW Topics       │
└─────────────────┬───────────────────────────────────┘
                  │ HTTP API calls
┌─────────────────▼───────────────────────────────────┐
│                  BACKEND (FastAPI)                   │
│                                                      │
│  1. PDF Upload                                       │
│     └── PyMuPDF extracts chapters                   │
│     └── sentence-transformers creates embeddings    │
│     └── FAISS index stored locally (FREE)           │
│                                                      │
│  2. Question Answering                               │
│     └── Query embedded locally                      │
│     └── FAISS finds top-3 relevant chapters ✂️      │
│     └── Context Pruning reduces tokens by 94%       │
│     └── Groq LLaMA 3.1 generates answer             │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React.js | Fast, component-based UI |
| Backend | Python FastAPI | Async, high performance |
| PDF Processing | PyMuPDF | Fast chapter extraction |
| Embeddings | sentence-transformers | Local, FREE, no API cost |
| Vector Store | FAISS | Local vector search, no cloud needed |
| LLM | Groq LLaMA 3.1 8B | Ultra-fast, affordable inference |
| Context Pruning | Cosine similarity | Smart chapter filtering |

---

## 🚀 Setup & Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key — free at [console.groq.com](https://console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/vivek-XD/vidyai-education-tutor-india.git
cd vidyai-education-tutor-india
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Start backend:
```bash
python -m uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000` 🎉

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Student | student@vidyai.in | student123 |
| Teacher | teacher@vidyai.in | teacher123 |

---

## 📁 Project Structure

```
vidyai-education-tutor-india/
├── README.md
├── render.yaml                  # Backend deployment config
├── backend/
│   ├── main.py                  # FastAPI server & API endpoints
│   ├── pdf_processor.py         # PDF extraction + FAISS indexing
│   ├── context_pruner.py        # Core context pruning logic ✂️
│   ├── tutor_engine.py          # Groq LLM integration
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.js               # Main app with routing
        ├── App.css              # Global design system
        └── pages/
            ├── Login.js         # Auth — Login + Sign Up
            └── Dashboard.js     # Upload, Chat, PW Topics, Stats
```

---

## 🔑 Key Innovation

### Context Pruning Algorithm

```python
def prune_context(query, index, chapters, top_k=3):
    query_embedding = model.encode([query])
    distances, indices = index.search(query_embedding, top_k)
    selected_chapters = [chapters[i] for i in indices[0]]
    return selected_chapters
```

1. Student asks a question
2. Question is embedded locally using sentence-transformers
3. FAISS finds the **top 3 most similar chapters** using cosine similarity
4. Only those 3 chapters (~3,000 tokens) are sent to Groq
5. Result: **94% fewer tokens** = massive cost savings

This makes AI tutoring viable for students in rural India who need affordable, fast answers.

---

## 📸 Screenshots

| Login Page | Dashboard | AI Chat | PW Topics |
|-----------|-----------|---------|-----------|
| Sign In / Sign Up | Upload Textbook | Ask Questions | Class-wise Topics |

---

## 👨‍💻 Author

**Vivek Chauhan**
- GitHub: [@vivek-XD](https://github.com/vivek-XD)
- Project: Intel Unnati GenAI 2025

---

## 📄 License

MIT License — free to use, modify and distribute.

---

<div align="center">
Made with ❤️ for rural India 🇮🇳
</div>
