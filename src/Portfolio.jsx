import { useState, useEffect, useRef, useCallback } from "react";

const BASE_URL = import.meta.env.BASE_URL || "/";
const withBase = (path = "") => `${BASE_URL}${path.replace(/^\/+/, "")}`;

/* ═══════════════════════════════════════════════════════════
   INITIAL CONTENT — edit via UI or update this object
═══════════════════════════════════════════════════════════ */
const DEFAULT_DATA = {
  meta: {
    name: "Swapnil Pharate",
    title: "Data Engineer & AI Engineer",
    subtitle: "Python · PySpark · AWS · LLMs · RAG · GenAI",
    tagline: "Building reliable data pipelines, ETL migration tools, and production-grade AI systems.",
    email: "swapniljpharate@gmail.com",
    phone: "+91-8411911146",
    location: "Pune, India",
    linkedin: "https://linkedin.com/in/swapnil-pharate",
    github: "https://github.com/swapnilpharate",
    resume: withBase("Swapnil_Pharate_resume.pdf"),
    availability: "Open to Opportunities"
  },
  about: {
    bio: "I'm Swapnil — a Data Engineer & AI Engineer with nearly 3 years of hands-on experience building scalable ETL pipelines, PySpark transformations, and AWS-native data infrastructure. I've also dived deep into AI Engineering — building LLM-powered tools, RAG systems, and agentic workflows using Amazon Bedrock. I love bridging traditional data engineering with cutting-edge AI to create systems that are fast, reliable, and intelligent.",
    stats: [
      { label: "Years Exp", value: "3+" },
      { label: "Files/Week", value: "80K+" },
      { label: "Testing Saved", value: "80%" },
      { label: "Pipeline Speed", value: "2x" }
    ]
  },
  skills: [
    { group: "Languages", color: "#6366f1", items: ["Python", "SQL", "PySpark", "Spark SQL", "SQLAlchemy", "PandaSQL"] },
    { group: "Big Data & ETL", color: "#06b6d4", items: ["PySpark", "AWS Glue", "AWS EMR", "Apache Airflow", "Kafka", "Step Functions"] },
    { group: "Cloud — AWS", color: "#8b5cf6", items: ["S3", "Lambda", "Athena", "Redshift", "DynamoDB", "RDS", "Bedrock", "EMR", "Glue"] },
    { group: "AI & GenAI", color: "#ec4899", items: ["LLMs", "RAG", "Amazon Bedrock", "Agentic AI", "Generative AI", "Prompt Engineering"] },
    { group: "Data Stores", color: "#f59e0b", items: ["MySQL", "PostgreSQL", "MS SQL Server", "DynamoDB", "Redshift", "Athena"] },
    { group: "Tools & Quality", color: "#10b981", items: ["Streamlit", "Git", "GitHub", "Bitbucket", "Pylint", "Black", "Jira", "Pytest"] }
  ],
  experience: [
    {
      id: "exp1",
      role: "Data Engineer & AI Engineer",
      company: "Go Digital Technology Consulting LLP",
      location: "Pune, India",
      period: "2022 — Present",
      type: "Full Time",
      bullets: [
        "Designed and built end-to-end ETL pipelines processing 80K+ JSON files weekly with 100% accuracy and 50% faster processing via parallel execution.",
        "Developed an Informatica → PySpark automated conversion tool, dramatically reducing manual migration time and errors.",
        "Architected serverless orchestration using AWS Step Functions and Lambda, integrating Amazon Bedrock (Claude) for AI-powered test case generation.",
        "Built automated data validation frameworks that reduced manual testing by 80% and sped up integrity checks by 70%.",
        "Optimized Athena queries via partitioning and compression; collaborated with data scientists on ML-ready datasets.",
        "Built RAG-based internal knowledge assistant using Amazon Bedrock and Streamlit for engineering teams."
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      number: "01",
      title: "Advanced Load Forecasting (ALF)",
      description: "Scalable ETL pipeline processing 80K+ JSON files weekly. 100% accuracy, 50% speed gain via parallel execution. Partitioned Athena queries for downstream ML forecasting.",
      tech: ["Python", "PySpark", "AWS S3", "EMR", "Athena"],
      github: null,
      demo: null,
      type: "Data Engineering",
      color: "#6366f1"
    },
    {
      id: "p2",
      number: "02",
      title: "NextGenGIS Data Product",
      description: "Automated testing framework cutting manual validation by 80%. Serverless Step Functions + Lambda orchestration. AI-agentic feedback loop via Amazon Bedrock syncing with Jira.",
      tech: ["AWS Glue", "PySpark", "Lambda", "Step Functions", "Bedrock"],
      github: null,
      demo: null,
      type: "Data Engineering",
      color: "#06b6d4"
    },
    {
      id: "p3",
      number: "03",
      title: "Informatica → PySpark Converter",
      description: "Automated ETL migration tool parsing Informatica XML workflows and generating production-ready PySpark code. Enforces Pylint + Black standards.",
      tech: ["Python", "PySpark", "XML Parsing", "Pylint", "Black"],
      github: "https://github.com",
      demo: null,
      type: "Developer Tool",
      color: "#8b5cf6"
    },
    {
      id: "p4",
      number: "04",
      title: "RAG-Powered Doc Assistant",
      description: "Agentic AI assistant built on Amazon Bedrock that indexes pipeline documentation and answers engineering queries using Retrieval-Augmented Generation.",
      tech: ["Python", "Bedrock", "RAG", "LLM", "Streamlit"],
      github: "https://github.com",
      demo: null,
      type: "AI Engineering",
      color: "#ec4899"
    },
    {
      id: "p5",
      number: "05",
      title: "Streamlit File Manager IDE",
      description: "Browser-based file manager and code editor for data files. Lets non-technical stakeholders browse, preview, and validate datasets without CLI.",
      tech: ["Python", "Streamlit", "Pandas", "AWS S3"],
      github: "https://github.com",
      demo: null,
      type: "Developer Tool",
      color: "#f59e0b"
    },
    {
      id: "p6",
      number: "06",
      title: "Automated Data Testing Framework",
      description: "Custom Python framework validating ETL transformations at scale. Compares source/target datasets, generates diff reports, flags anomalies — integrated in CI.",
      tech: ["Python", "PySpark", "Pandas", "Pytest", "S3"],
      github: null,
      demo: null,
      type: "Data Engineering",
      color: "#10b981"
    }
  ],
  certifications: [
    { id: "c1", name: "Apache Airflow", issuer: "Go Digital Technology Consulting LLP", icon: "🌊", link: "#", year: "2023" },
    { id: "c2", name: "AWS Technical Essentials", issuer: "Amazon Web Services", icon: "☁️", link: "#", year: "2023" },
    { id: "c3", name: "Data Analytics", issuer: "Masai School", icon: "📊", link: "#", year: "2023" },
    { id: "c4", name: "SQL — Problem Solving", issuer: "HackerRank", icon: "💻", link: "https://www.hackerrank.com", year: "2022" }
  ],
  education: [
    { id: "e1", degree: "Data Analytics", school: "Masai School", period: "Apr 2022 – Apr 2023", score: null },
    { id: "e2", degree: "Bachelor of Computer Applications", school: "Shri Vasant Pharate Patil College, Pune", period: "Jul 2019 – Aug 2022", score: "79.13%" },
    { id: "e3", degree: "Diploma in Mechanical Engineering", school: "D.Y. Patil College, Pune", period: "Aug 2014 – Jul 2017", score: "67.29%" }
  ]
};

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const injectStyles = () => {
  const id = "portfolio-styles";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #050710;
      --bg2: #080c18;
      --surface: #0d1124;
      --surface2: #111827;
      --border: rgba(99,102,241,0.15);
      --border2: rgba(255,255,255,0.06);
      --primary: #6366f1;
      --cyan: #06b6d4;
      --pink: #ec4899;
      --amber: #f59e0b;
      --green: #10b981;
      --text: #f1f5f9;
      --muted: #64748b;
      --muted2: #94a3b8;
      --card: rgba(13,17,36,0.8);
      --glow-p: rgba(99,102,241,0.2);
      --glow-c: rgba(6,182,212,0.2);
      --font: 'Outfit', sans-serif;
      --mono: 'JetBrains Mono', monospace;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      line-height: 1.6;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 2px; }
    ::selection { background: rgba(99,102,241,0.35); }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      height: 58px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem;
      backdrop-filter: blur(20px) saturate(180%);
      background: rgba(5,7,16,0.85);
      border-bottom: 1px solid var(--border2);
    }
    .nav-brand {
      font-family: var(--mono);
      font-size: 0.8rem;
      color: var(--cyan);
      letter-spacing: 0.1em;
    }
    .nav-brand b { color: var(--pink); }
    .nav-links {
      display: flex; gap: 2rem; list-style: none;
    }
    .nav-links a {
      font-family: var(--mono);
      font-size: 0.7rem;
      color: var(--muted);
      text-decoration: none;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--cyan); }
    .nav-right { display: flex; gap: 0.6rem; align-items: center; }
    .nav-btn {
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-family: var(--mono);
      font-size: 0.68rem;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--muted2);
    }
    .nav-btn:hover { border-color: var(--primary); color: var(--primary); }
    .nav-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

    /* CANVAS */
    .hero-canvas {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      pointer-events: none;
    }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center;
      position: relative; overflow: hidden;
      padding-top: 58px;
    }
    .hero-content {
      position: relative; z-index: 2;
      max-width: 1200px; margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 460px;
      gap: 2rem;
      align-items: center;
    }
    .hero-left { display: flex; flex-direction: column; }
    /* ── TECH ORBIT PANEL ── */
    .hero-tech-panel {
      position: relative;
      height: 500px;
      display: flex; align-items: center; justify-content: center;
      animation: fadeSlideUp 1s 0.9s both;
    }
    .orbit-center {
      position: absolute;
      width: 72px; height: 72px; border-radius: 50%;
      background: linear-gradient(135deg,rgba(99,102,241,0.25),rgba(6,182,212,0.25));
      border: 1px solid rgba(99,102,241,0.6);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; z-index: 5;
      box-shadow: 0 0 40px rgba(99,102,241,0.4);
      animation: cGlow 3s ease-in-out infinite;
    }
    @keyframes cGlow{0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.4)}50%{box-shadow:0 0 70px rgba(99,102,241,0.7),0 0 100px rgba(6,182,212,0.2)}}
    .orbit-ring {
      position: absolute; border-radius: 50%;
      border: 1px dashed rgba(99,102,241,0.15);
    }
    .orbit-ring-1{width:160px;height:160px;animation:spin 14s linear infinite;}
    .orbit-ring-2{width:280px;height:280px;border-color:rgba(6,182,212,0.12);animation:spin 22s linear infinite reverse;}
    .orbit-ring-3{width:420px;height:420px;border-color:rgba(236,72,153,0.08);animation:spin 34s linear infinite;}
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    .t-node {
      position: absolute;
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      transform: translate(-50%,-50%);
      z-index: 4;
    }
    .t-node-box {
      width: 44px; height: 44px; border-radius: 11px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.15rem;
      border: 1px solid;
      backdrop-filter: blur(14px);
      transition: transform 0.25s, box-shadow 0.25s;
      cursor: default;
    }
    .t-node-box:hover { transform: scale(1.3); }
    .t-node-lbl {
      font-family: var(--mono); font-size: 0.56rem;
      color: var(--muted); letter-spacing: 0.04em;
      white-space: nowrap; transition: color 0.2s;
    }
    .t-node:hover .t-node-lbl { color: #e2e8f0; }
    /* SVG lines */
    .orbit-svg {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      pointer-events: none; overflow: visible;
    }
    /* data ticker */
    .data-ticker {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 28px; overflow: hidden;
      border-top: 1px solid rgba(99,102,241,0.08);
      display: flex; align-items: center;
      -webkit-mask-image: linear-gradient(90deg,transparent,black 8%,black 92%,transparent);
      mask-image: linear-gradient(90deg,transparent,black 8%,black 92%,transparent);
    }
    .ticker-inner {
      display: flex; gap: 2rem;
      animation: tick 22s linear infinite;
      white-space: nowrap;
    }
    @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .tick-item {
      font-family: var(--mono); font-size: 0.58rem;
      color: rgba(99,102,241,0.4); letter-spacing: 0.1em;
      display: flex; align-items: center; gap: 0.35rem;
    }
    .tick-dot{width:3px;height:3px;border-radius:50%;background:rgba(6,182,212,0.6);flex-shrink:0;}

    /* RESPONSIVE hero */
    @media (max-width: 900px) {
      .hero-content { grid-template-columns: 1fr; }
      .hero-tech-panel { height: 300px; }
      .orbit-ring-3 { width:280px;height:280px; }
    }

    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.35rem 0.9rem;
      border: 1px solid rgba(6,182,212,0.3);
      border-radius: 100px;
      font-family: var(--mono);
      font-size: 0.7rem;
      color: var(--cyan);
      letter-spacing: 0.08em;
      margin-bottom: 1.5rem;
      background: rgba(6,182,212,0.06);
      animation: fadeSlideUp 0.7s 0.1s both;
    }
    .hero-badge::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--cyan);
      box-shadow: 0 0 8px var(--cyan);
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .hero-name {
      font-size: clamp(3.5rem, 9vw, 7rem);
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.03em;
      margin-bottom: 0.5rem;
      animation: fadeSlideUp 0.7s 0.2s both;
    }
    .hero-name .line2 {
      display: block;
      background: linear-gradient(135deg, var(--primary) 0%, var(--cyan) 50%, var(--pink) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200%;
      animation: gradShift 4s ease infinite alternate, fadeSlideUp 0.7s 0.3s both;
    }
    @keyframes gradShift { from{background-position:0%} to{background-position:100%} }
    .hero-roles {
      display: flex; gap: 1rem; flex-wrap: wrap;
      margin-bottom: 1.5rem;
      animation: fadeSlideUp 0.7s 0.4s both;
    }
    .role-pill {
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .role-data { background: rgba(99,102,241,0.15); color: var(--primary); border: 1px solid rgba(99,102,241,0.3); }
    .role-ai { background: rgba(236,72,153,0.15); color: var(--pink); border: 1px solid rgba(236,72,153,0.3); }
    .hero-tagline {
      font-size: 1.1rem;
      color: var(--muted2);
      max-width: 560px;
      margin-bottom: 2.5rem;
      line-height: 1.8;
      animation: fadeSlideUp 0.7s 0.5s both;
    }
    .hero-ctas {
      display: flex; gap: 1rem; flex-wrap: wrap;
      animation: fadeSlideUp 0.7s 0.6s both;
    }
    .btn {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.7rem 1.5rem;
      border-radius: 8px;
      font-family: var(--font);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #818cf8);
      color: white;
      box-shadow: 0 4px 20px rgba(99,102,241,0.4);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.5); }
    .btn-cyan {
      background: linear-gradient(135deg, var(--cyan), #22d3ee);
      color: #050710;
      box-shadow: 0 4px 20px rgba(6,182,212,0.35);
    }
    .btn-cyan:hover { transform: translateY(-2px); }
    .btn-ghost {
      background: rgba(255,255,255,0.05);
      color: var(--muted2);
      border: 1px solid var(--border2);
      backdrop-filter: blur(8px);
    }
    .btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
    .btn-sm {
      padding: 0.4rem 0.9rem;
      font-size: 0.75rem;
    }
    .btn-danger {
      background: rgba(239,68,68,0.1);
      color: #ef4444;
      border: 1px solid rgba(239,68,68,0.3);
    }
    .btn-danger:hover { background: rgba(239,68,68,0.2); }
    .btn-success {
      background: rgba(16,185,129,0.15);
      color: var(--green);
      border: 1px solid rgba(16,185,129,0.3);
    }
    .btn-success:hover { background: rgba(16,185,129,0.25); }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* SECTIONS */
    .section { padding: 4rem 0; position: relative; }
    .section-alt { background: var(--bg2); }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
    .section-header {
      display: flex; align-items: center; gap: 1.2rem;
      margin-bottom: 2rem;
    }
    .section-num {
      font-family: var(--mono);
      font-size: 0.7rem;
      color: var(--primary);
      letter-spacing: 0.15em;
      flex-shrink: 0;
    }
    .section-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .section-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, var(--border), transparent);
    }

    /* REVEAL */
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ABOUT */
    .about-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 3rem; align-items: start; }
    .about-bio { font-size: 1rem; color: var(--muted2); line-height: 1.8; margin-bottom: 1.5rem; }
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
    .stat-box {
      background: var(--surface);
      border: 1px solid var(--border2);
      border-radius: 12px;
      padding: 1.2rem;
      text-align: center;
      transition: border-color 0.2s, transform 0.2s;
    }
    .stat-box:hover { border-color: var(--primary); transform: translateY(-3px); }
    .stat-val {
      font-size: 1.8rem;
      font-weight: 900;
      background: linear-gradient(135deg, var(--primary), var(--cyan));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stat-label { font-family: var(--mono); font-size: 0.65rem; color: var(--muted); letter-spacing: 0.1em; margin-top: 0.3rem; text-transform: uppercase; }
    .about-right { display: flex; flex-direction: column; gap: 0.8rem; }
    .about-tag {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.8rem 1rem;
      border: 1px solid var(--border2);
      border-radius: 8px;
      background: var(--surface);
      font-family: var(--mono);
      font-size: 0.75rem;
      color: var(--muted2);
      transition: border-color 0.2s, color 0.2s;
    }
    .about-tag:hover { border-color: var(--cyan); color: var(--text); }
    .about-tag-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

    /* SKILLS */
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
    .skill-card {
      background: var(--card);
      border: 1px solid var(--border2);
      border-radius: 14px;
      padding: 1.6rem;
      backdrop-filter: blur(12px);
      transition: border-color 0.25s, transform 0.25s;
      position: relative; overflow: hidden;
    }
    .skill-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      opacity: 0; transition: opacity 0.3s;
    }
    .skill-card:hover { transform: translateY(-4px); }
    .skill-card:hover::before { opacity: 1; }
    .skill-group-name {
      font-family: var(--mono);
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }
    .skill-tag {
      font-family: var(--mono);
      font-size: 0.68rem;
      padding: 0.3rem 0.65rem;
      border-radius: 5px;
      background: var(--bg);
      border: 1px solid var(--border2);
      color: var(--muted2);
      transition: all 0.2s;
      cursor: default;
    }
    .skill-tag:hover { color: white; }

    /* EXPERIENCE */
    .exp-timeline { position: relative; padding-left: 2rem; }
    .exp-timeline::before {
      content: '';
      position: absolute; left: 0; top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, var(--primary), transparent);
    }
    .exp-item {
      position: relative; margin-bottom: 3rem; padding-left: 2rem;
    }
    .exp-dot {
      position: absolute; left: -2.45rem; top: 0.5rem;
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--primary);
      box-shadow: 0 0 14px var(--primary);
    }
    .exp-card {
      background: var(--card);
      border: 1px solid var(--border2);
      border-radius: 14px;
      padding: 1.8rem;
      backdrop-filter: blur(10px);
      transition: border-color 0.2s;
    }
    .exp-card:hover { border-color: rgba(99,102,241,0.3); }
    .exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.3rem; }
    .exp-role { font-size: 1.2rem; font-weight: 700; }
    .exp-badge {
      font-family: var(--mono);
      font-size: 0.68rem;
      padding: 0.25rem 0.7rem;
      border-radius: 4px;
      background: rgba(6,182,212,0.1);
      border: 1px solid rgba(6,182,212,0.25);
      color: var(--cyan);
      letter-spacing: 0.08em;
    }
    .exp-company { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); margin-bottom: 1.2rem; }
    .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
    .exp-bullet {
      display: flex; gap: 0.75rem;
      font-size: 0.88rem; color: var(--muted2); line-height: 1.65;
    }
    .exp-bullet::before { content: '›'; color: var(--primary); font-weight: 700; flex-shrink: 0; margin-top: 0.05rem; }

    /* PROJECTS */
    .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
    .proj-card {
      background: var(--card);
      border: 1px solid var(--border2);
      border-radius: 14px;
      padding: 1.8rem;
      display: flex; flex-direction: column; gap: 0.9rem;
      position: relative; overflow: hidden;
      transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
      cursor: default;
    }
    .proj-card-line {
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s;
    }
    .proj-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
    .proj-card:hover .proj-card-line { transform: scaleX(1); }
    .proj-num { font-family: var(--mono); font-size: 0.68rem; color: var(--muted); }
    .proj-title { font-size: 1.05rem; font-weight: 700; line-height: 1.3; }
    .proj-desc { font-size: 0.82rem; color: var(--muted2); line-height: 1.7; flex: 1; }
    .proj-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .tech-chip {
      font-family: var(--mono);
      font-size: 0.64rem;
      padding: 0.22rem 0.55rem;
      border-radius: 4px;
      border: 1px solid var(--border2);
      color: var(--muted2);
      background: var(--bg);
    }
    .proj-footer { display: flex; align-items: center; justify-content: space-between; }
    .proj-type-tag {
      font-family: var(--mono);
      font-size: 0.62rem;
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
      border: 1px solid;
    }
    .proj-link { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); display: flex; align-items: center; gap: 0.3rem; text-decoration: none; transition: color 0.2s; }
    .proj-link:hover { color: var(--cyan); }

    /* CERTS */
    .certs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .cert-card {
      display: flex; align-items: center; gap: 1.2rem;
      padding: 1.3rem 1.5rem;
      background: var(--card);
      border: 1px solid var(--border2);
      border-radius: 12px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .cert-card:hover { border-color: var(--cyan); transform: translateX(4px); }
    .cert-icon-box {
      width: 46px; height: 46px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem;
      background: var(--surface2);
      border: 1px solid var(--border2);
      flex-shrink: 0;
    }
    .cert-name { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.2rem; }
    .cert-issuer { font-family: var(--mono); font-size: 0.68rem; color: var(--muted); }
    .cert-link-btn { font-family: var(--mono); font-size: 0.68rem; color: var(--cyan); display: flex; align-items: center; gap: 0.3rem; text-decoration: none; margin-top: 0.35rem; transition: opacity 0.2s; }
    .cert-link-btn:hover { opacity: 0.75; }

    /* EDU */
    .edu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .edu-card {
      background: var(--card);
      border: 1px solid var(--border2);
      border-radius: 12px;
      padding: 1.4rem;
      transition: border-color 0.2s;
    }
    .edu-card:hover { border-color: var(--primary); }
    .edu-degree { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; line-height: 1.3; }
    .edu-school { font-size: 0.82rem; color: var(--muted2); margin-bottom: 0.7rem; }
    .edu-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .edu-tag {
      font-family: var(--mono);
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: var(--bg2);
      border: 1px solid var(--border2);
      color: var(--muted);
    }
    .edu-score { color: var(--green); border-color: rgba(16,185,129,0.3); }

    /* CONTACT */
    .contact-center { text-align: center; max-width: 600px; margin: 0 auto; }
    .contact-headline { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 1rem; }
    .contact-headline span {
      background: linear-gradient(135deg, var(--primary), var(--cyan), var(--pink));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .contact-sub { color: var(--muted2); font-size: 1rem; margin-bottom: 2.5rem; line-height: 1.8; }
    .contact-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    .contact-card {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.9rem 1.4rem;
      border: 1px solid var(--border2);
      border-radius: 10px;
      background: var(--card);
      font-family: var(--mono);
      font-size: 0.75rem;
      color: var(--muted2);
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s, transform 0.2s;
    }
    .contact-card:hover { border-color: var(--cyan); color: var(--text); transform: translateY(-3px); }

    /* FOOTER */
    footer { border-top: 1px solid var(--border2); padding: 1.8rem; text-align: center; font-family: var(--mono); font-size: 0.7rem; color: var(--muted); }

    /* EDIT MODE OVERLAY */
    .edit-overlay {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(5,7,16,0.95);
      backdrop-filter: blur(20px);
      overflow-y: auto;
      padding: 2rem;
    }
    .edit-panel {
      max-width: 860px; margin: 0 auto;
      background: var(--surface);
      border: 1px solid var(--border2);
      border-radius: 16px;
      overflow: hidden;
    }
    .edit-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.2rem 1.8rem;
      border-bottom: 1px solid var(--border2);
      background: var(--bg2);
    }
    .edit-title { font-family: var(--mono); font-size: 0.8rem; color: var(--cyan); letter-spacing: 0.1em; }
    .edit-tabs {
      display: flex; gap: 0.4rem;
      padding: 1rem 1.8rem;
      border-bottom: 1px solid var(--border2);
      flex-wrap: wrap;
    }
    .edit-tab {
      padding: 0.35rem 0.9rem;
      border-radius: 6px;
      font-family: var(--mono);
      font-size: 0.68rem;
      cursor: pointer;
      border: 1px solid var(--border2);
      background: transparent;
      color: var(--muted);
      transition: all 0.2s;
      letter-spacing: 0.06em;
    }
    .edit-tab:hover { border-color: var(--primary); color: var(--primary); }
    .edit-tab.active { background: var(--primary); color: white; border-color: var(--primary); }
    .edit-body { padding: 1.8rem; }
    .edit-field { margin-bottom: 1.2rem; }
    .edit-label {
      display: block;
      font-family: var(--mono);
      font-size: 0.68rem;
      color: var(--muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 0.4rem;
    }
    .edit-input, .edit-textarea {
      width: 100%;
      background: var(--bg2);
      border: 1px solid var(--border2);
      border-radius: 8px;
      padding: 0.7rem 1rem;
      color: var(--text);
      font-family: var(--font);
      font-size: 0.88rem;
      transition: border-color 0.2s;
      outline: none;
    }
    .edit-input:focus, .edit-textarea:focus { border-color: var(--primary); }
    .edit-textarea { min-height: 90px; resize: vertical; line-height: 1.6; }
    .edit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .list-item-editor {
      background: var(--bg2);
      border: 1px solid var(--border2);
      border-radius: 10px;
      padding: 1.2rem;
      margin-bottom: 0.8rem;
      position: relative;
    }
    .list-item-editor .del-btn {
      position: absolute; top: 0.8rem; right: 0.8rem;
    }
    .add-btn {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.6rem 1rem;
      border: 1px dashed var(--border);
      border-radius: 8px;
      background: transparent;
      color: var(--muted);
      font-family: var(--mono);
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      justify-content: center;
      margin-top: 0.8rem;
    }
    .add-btn:hover { border-color: var(--primary); color: var(--primary); }
    .edit-actions {
      display: flex; justify-content: flex-end; gap: 0.8rem;
      padding: 1.2rem 1.8rem;
      border-top: 1px solid var(--border2);
    }
    .bullet-list-editor { display: flex; flex-direction: column; gap: 0.5rem; }
    .bullet-row { display: flex; gap: 0.5rem; }
    .bullet-row input { flex: 1; }
    .tags-editor { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
    .tag-x {
      display: flex; align-items: center; gap: 0.3rem;
      padding: 0.25rem 0.6rem;
      border-radius: 5px;
      font-family: var(--mono);
      font-size: 0.68rem;
      background: var(--bg2);
      border: 1px solid var(--border2);
      color: var(--muted2);
    }
    .tag-x button { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9rem; line-height: 1; padding: 0; }
    .tag-x button:hover { color: #ef4444; }
    .tag-add-input {
      background: var(--bg2);
      border: 1px dashed var(--border);
      border-radius: 5px;
      padding: 0.25rem 0.6rem;
      font-family: var(--mono);
      font-size: 0.68rem;
      color: var(--text);
      outline: none;
      width: 110px;
    }
    .tag-add-input:focus { border-color: var(--primary); }

    /* EDIT INDICATOR */
    .edit-mode-bar {
      position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
      z-index: 999;
      display: flex; align-items: center; gap: 1rem;
      padding: 0.7rem 1.5rem;
      background: rgba(99,102,241,0.15);
      border: 1px solid rgba(99,102,241,0.4);
      border-radius: 100px;
      backdrop-filter: blur(20px);
      font-family: var(--mono);
      font-size: 0.72rem;
      color: var(--primary);
    }

    /* HAMBURGER */
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; }
    .hamburger span { display: block; width: 22px; height: 2px; background: var(--muted2); border-radius: 1px; }


    /* ── HERO RIGHT PANEL ── */
    .hero-right-panel {
      position: relative;
      height: 510px;
      display: flex; align-items: center; justify-content: center;
      animation: fadeSlideUp 1s 0.9s both;
    }

    /* Infographic image with transparency layers */
    .agentic-img-wrap {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .agentic-img {
      width: 100%; height: 100%;
      object-fit: contain;
      opacity: 0.18;
      mix-blend-mode: screen;
      filter: saturate(2) brightness(1.4) contrast(1.1);
      animation: imgBreathe 6s ease-in-out infinite alternate;
    }
    @keyframes imgBreathe {
      from { opacity: 0.15; filter: saturate(1.8) brightness(1.3); }
      to   { opacity: 0.24; filter: saturate(2.2) brightness(1.6); }
    }

    /* Floating service icon cards */
    .svc-card {
      position: absolute;
      display: flex; flex-direction: column; align-items: center; gap: 5px;
      animation: svcFloat var(--dur, 4s) ease-in-out infinite alternate;
      animation-delay: var(--dly, 0s);
      cursor: default;
      z-index: 6;
    }
    .svc-icon {
      width: 52px; height: 52px;
      border-radius: 14px;
      border: 1px solid;
      backdrop-filter: blur(16px);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.25s, box-shadow 0.25s;
      position: relative; overflow: hidden;
    }
    .svc-icon::before {
      content: '';
      position: absolute; inset: 0;
      background: inherit;
      opacity: 0.15;
    }
    .svc-icon img {
      width: 28px; height: 28px;
      object-fit: contain;
      position: relative; z-index: 1;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }
    .svc-icon svg {
      width: 26px; height: 26px;
      position: relative; z-index: 1;
    }
    .svc-label {
      font-family: var(--mono);
      font-size: 0.55rem;
      color: var(--muted);
      letter-spacing: 0.06em;
      white-space: nowrap;
      transition: color 0.2s;
      text-align: center;
    }
    .svc-card:hover .svc-icon { transform: scale(1.25) translateY(-3px); }
    .svc-card:hover .svc-label { color: #e2e8f0; }
    @keyframes svcFloat {
      from { transform: translateY(0px) rotate(0deg); }
      to   { transform: translateY(-10px) rotate(1deg); }
    }

    /* Connection lines between service nodes */
    .svc-svg {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      pointer-events: none; overflow: visible;
      z-index: 3;
    }

    /* Glowing ring backdrop */
    .svc-ring-bg {
      position: absolute;
      border-radius: 50%;
      border: 1px dashed rgba(99,102,241,0.15);
      animation: spin var(--spd) linear infinite;
      animation-direction: var(--dir, normal);
    }

    /* Pulsing center node */
    .svc-center {
      position: absolute;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      z-index: 7;
      width: 72px; height: 72px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(6,182,212,0.25));
      border: 1px solid rgba(99,102,241,0.55);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 35px rgba(99,102,241,0.5), 0 0 70px rgba(6,182,212,0.15);
      animation: centerPulse 3s ease-in-out infinite;
      backdrop-filter: blur(16px);
      padding: 6px;
    }
    @keyframes centerPulse {
      0%,100% { box-shadow: 0 0 25px rgba(99,102,241,0.4), 0 0 50px rgba(6,182,212,0.1); }
      50%      { box-shadow: 0 0 55px rgba(99,102,241,0.7), 0 0 90px rgba(6,182,212,0.25); }
    }
    .svc-center-logo {
      width: 36px; height: 36px; object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
    }

    /* Animated data flow lines */
    .flow-line {
      stroke-dasharray: 6 4;
      animation: dash var(--spd, 3s) linear infinite;
    }
    @keyframes dash { to { stroke-dashoffset: -20; } }

    /* Tiny stat badges */
    .stat-badge {
      position: absolute;
      background: rgba(13,17,36,0.85);
      border: 1px solid;
      border-radius: 8px;
      padding: 0.3rem 0.65rem;
      font-family: var(--mono);
      font-size: 0.6rem;
      letter-spacing: 0.06em;
      backdrop-filter: blur(12px);
      z-index: 8;
      animation: badgePop 0.6s var(--dly, 0s) both, svcFloat 5s ease-in-out infinite alternate;
      animation-delay: var(--dly, 0s), var(--fdly, 0s);
      white-space: nowrap;
    }
    @keyframes badgePop {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* ticker */
    .data-ticker {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 28px; overflow: hidden;
      border-top: 1px solid rgba(99,102,241,0.08);
      display: flex; align-items: center;
      -webkit-mask-image: linear-gradient(90deg,transparent,black 8%,black 92%,transparent);
      mask-image: linear-gradient(90deg,transparent,black 8%,black 92%,transparent);
    }
    .ticker-inner {
      display: flex; gap: 2rem;
      animation: tick 22s linear infinite;
      white-space: nowrap;
    }
    @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .tick-item {
      font-family: var(--mono); font-size: 0.58rem;
      color: rgba(99,102,241,0.4); letter-spacing: 0.1em;
      display: flex; align-items: center; gap: 0.35rem;
    }
    .tick-dot{width:3px;height:3px;border-radius:50%;background:rgba(6,182,212,0.6);flex-shrink:0;}

    /* RESPONSIVE */
    @media (max-width: 1100px) {
      .skills-grid { grid-template-columns: repeat(2, 1fr); }
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
      .hero-content { grid-template-columns: 1fr 340px; }
    }
    @media (max-width: 900px) {
      .hero-content { grid-template-columns: 1fr; }
      .hero-tech-panel { height: 300px; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
      /* Hero — tighter on tablet */
      .hero { padding: 5rem 0 3rem; }
      .hero-name { font-size: clamp(2.4rem, 9vw, 3.8rem); }
      .hero-tagline { font-size: 0.92rem; margin-bottom: 1.5rem; }
      .hero-badge { font-size: 0.62rem; margin-bottom: 1rem; }
      .role-pill { font-size: 0.72rem; padding: 0.3rem 0.75rem; }
      .hero-roles { gap: 0.6rem; margin-bottom: 1rem; }
      /* Buttons smaller */
      .btn { padding: 0.55rem 1.1rem; font-size: 0.78rem; }
      /* Sections */
      .section { padding: 2.5rem 0; }
      .section-header { margin-bottom: 1.4rem; }
      .section-title { font-size: 1.8rem; }
      /* Grids to single column */
      .about-grid { grid-template-columns: 1fr; gap: 1.2rem; }
      .stats-row { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
      .stat-card { padding: 1rem; }
      .stat-val { font-size: 1.6rem; }
      .skills-grid { grid-template-columns: 1fr; }
      .skill-card { padding: 1.1rem; }
      .projects-grid { grid-template-columns: 1fr; }
      .certs-grid, .edu-grid { grid-template-columns: 1fr; }
      .edit-row { grid-template-columns: 1fr; }
      /* Experience */
      .timeline-item { padding-left: 1.2rem; }
      /* Cards */
      .project-card, .cert-card, .edu-card { padding: 1.1rem; }
    }
    @media (max-width: 520px) {
      .container { padding: 0 0.85rem; }
      /* Hero — compact on phone */
      .hero { padding: 4.5rem 0 2.5rem; }
      .hero-name { font-size: clamp(2rem, 11vw, 3rem); letter-spacing: -0.02em; }
      .hero-tagline { font-size: 0.85rem; line-height: 1.6; margin-bottom: 1.2rem; }
      .hero-badge { font-size: 0.6rem; padding: 0.28rem 0.7rem; margin-bottom: 0.8rem; }
      .hero-roles { gap: 0.45rem; margin-bottom: 0.9rem; }
      .role-pill { font-size: 0.67rem; padding: 0.28rem 0.65rem; }
      .hero-ctas { flex-direction: column; gap: 0.6rem; }
      .hero-ctas .btn { text-align: center; justify-content: center; padding: 0.6rem 1rem; font-size: 0.78rem; }
      .hero-tech-panel { display: none; }
      /* Nav */
      .nav { padding: 0 0.85rem; }
      .nav-brand { font-size: 1rem; }
      /* Sections tighter */
      .section { padding: 2rem 0; }
      .section-title { font-size: 1.5rem; }
      .section-header { margin-bottom: 1.1rem; }
      /* Stat cards 2-col */
      .stats-row { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
      .stat-card { padding: 0.85rem; }
      .stat-val { font-size: 1.4rem; }
      .stat-label { font-size: 0.65rem; }
      /* Skill items smaller */
      .skill-tag { font-size: 0.7rem; padding: 0.25rem 0.6rem; }
      /* Project cards */
      .project-card { padding: 1rem; }
      .project-title { font-size: 1rem; }
      .project-desc { font-size: 0.82rem; }
      /* Cert / edu */
      .cert-card, .edu-card { padding: 0.9rem; }
      /* Experience */
      .exp-role { font-size: 1rem; }
      .exp-company { font-size: 0.85rem; }
      .timeline-body { font-size: 0.82rem; }
      /* Contact */
      .contact-card { padding: 1rem; }
    }
  `;
  document.head.appendChild(s);
};

/* ═══════════════════════════════════════════════════════════
   THREE.JS 3D HERO CANVAS
═══════════════════════════════════════════════════════════ */
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Pure WebGL particle system — no Three.js needed
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Vertex shader
    const vsSource = `
      attribute vec3 aPos;
      attribute float aSize;
      attribute vec3 aColor;
      attribute float aAlpha;
      uniform float uTime;
      uniform vec2 uRes;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec3 pos = aPos;
        pos.x += sin(uTime * 0.4 + aPos.z * 3.0) * 0.03;
        pos.y += cos(uTime * 0.35 + aPos.z * 2.5) * 0.03;
        gl_Position = vec4(pos.xy, 0.0, 1.0);
        gl_PointSize = aSize * (uRes.y / 600.0);
        vColor = aColor;
        vAlpha = aAlpha;
      }
    `;
    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d) * vAlpha;
        gl_FragColor = vec4(vColor, a);
      }
    `;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const N = 280;
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const colors = new Float32Array(N * 3);
    const alphas = new Float32Array(N);
    const velocities = new Float32Array(N * 3);

    const palette = [
      [0.388, 0.4, 0.949],   // indigo
      [0.024, 0.714, 0.831],  // cyan
      [0.925, 0.282, 0.600],  // pink
      [0.063, 0.725, 0.506],  // green
    ];

    for (let i = 0; i < N; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 2;
      positions[i*3+1] = (Math.random() - 0.5) * 2;
      positions[i*3+2] = Math.random() * 6;
      sizes[i] = 1.5 + Math.random() * 4;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i*3]   = c[0];
      colors[i*3+1] = c[1];
      colors[i*3+2] = c[2];
      alphas[i] = 0.3 + Math.random() * 0.7;
      velocities[i*3]   = (Math.random() - 0.5) * 0.001;
      velocities[i*3+1] = (Math.random() - 0.5) * 0.001;
    }

    const mkBuf = (data, attr, size) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      const loc = gl.getAttribLocation(prog, attr);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return buf;
    };

    const posBuf = mkBuf(positions, "aPos", 3);
    mkBuf(sizes, "aSize", 1);
    mkBuf(colors, "aColor", 3);
    mkBuf(alphas, "aAlpha", 1);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes  = gl.getUniformLocation(prog, "uRes");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let animId, t = 0, mouse = {x: 0, y: 0};
    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      mouse.y = -((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMouse);

    const draw = () => {
      t += 0.008;
      // Update positions
      for (let i = 0; i < N; i++) {
        positions[i*3]   += velocities[i*3];
        positions[i*3+1] += velocities[i*3+1];
        // Wrap
        if (positions[i*3]   >  1.2) positions[i*3]   = -1.2;
        if (positions[i*3]   < -1.2) positions[i*3]   =  1.2;
        if (positions[i*3+1] >  1.2) positions[i*3+1] = -1.2;
        if (positions[i*3+1] < -1.2) positions[i*3+1] =  1.2;

        // Mouse repel
        const dx = positions[i*3]   - mouse.x * 0.5;
        const dy = positions[i*3+1] - mouse.y * 0.5;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 0.2) {
          positions[i*3]   += dx / dist * 0.003;
          positions[i*3+1] += dy / dist * 0.003;
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.POINTS, 0, N);
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
      style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING 3D ORB (CSS + JS)
═══════════════════════════════════════════════════════════ */
function FloatingOrb({ color, size, x, y, delay }) {
  return (
    <div style={{
      position:"absolute", left:x, top:y,
      width:size, height:size,
      borderRadius:"50%",
      background:`radial-gradient(circle at 30% 30%, ${color}40, ${color}10, transparent 70%)`,
      boxShadow:`0 0 ${size/2}px ${color}30, inset 0 0 ${size/3}px ${color}20`,
      border:`1px solid ${color}20`,
      animation:`orbFloat 8s ease-in-out ${delay} infinite alternate`,
      pointerEvents:"none",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ═══════════════════════════════════════════════════════════
   TAG EDITOR
═══════════════════════════════════════════════════════════ */
function TagEditor({ tags, onChange }) {
  const [newTag, setNewTag] = useState("");
  return (
    <div className="tags-editor">
      {tags.map((t, i) => (
        <span key={i} className="tag-x">
          {t}
          <button onClick={() => onChange(tags.filter((_, j) => j !== i))}>×</button>
        </span>
      ))}
      <input
        className="tag-add-input"
        placeholder="+ Add tag"
        value={newTag}
        onChange={e => setNewTag(e.target.value)}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === ",") && newTag.trim()) {
            e.preventDefault();
            onChange([...tags, newTag.trim()]);
            setNewTag("");
          }
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EDIT PANEL
═══════════════════════════════════════════════════════════ */
function EditPanel({ data, onSave, onClose }) {
  const [tab, setTab] = useState("meta");
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(data)));

  const set = (path, val) => {
    const d = JSON.parse(JSON.stringify(draft));
    const keys = path.split(".");
    let obj = d;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = val;
    setDraft(d);
  };

  const TABS = [
    "meta","about","skills","experience","projects","certifications","education","icons"
  ];

  const renderMeta = () => (
    <div>
      <div className="edit-row">
        <div className="edit-field">
          <label className="edit-label">Full Name</label>
          <input className="edit-input" value={draft.meta.name} onChange={e => set("meta.name", e.target.value)} />
        </div>
        <div className="edit-field">
          <label className="edit-label">Title</label>
          <input className="edit-input" value={draft.meta.title} onChange={e => set("meta.title", e.target.value)} />
        </div>
      </div>
      <div className="edit-field">
        <label className="edit-label">Subtitle (tech stack line)</label>
        <input className="edit-input" value={draft.meta.subtitle} onChange={e => set("meta.subtitle", e.target.value)} />
      </div>
      <div className="edit-field">
        <label className="edit-label">Tagline</label>
        <textarea className="edit-textarea" value={draft.meta.tagline} onChange={e => set("meta.tagline", e.target.value)} style={{minHeight:70}} />
      </div>
      <div className="edit-row">
        <div className="edit-field">
          <label className="edit-label">Email</label>
          <input className="edit-input" value={draft.meta.email} onChange={e => set("meta.email", e.target.value)} />
        </div>
        <div className="edit-field">
          <label className="edit-label">Phone</label>
          <input className="edit-input" value={draft.meta.phone} onChange={e => set("meta.phone", e.target.value)} />
        </div>
      </div>
      <div className="edit-row">
        <div className="edit-field">
          <label className="edit-label">LinkedIn URL</label>
          <input className="edit-input" value={draft.meta.linkedin} onChange={e => set("meta.linkedin", e.target.value)} />
        </div>
        <div className="edit-field">
          <label className="edit-label">GitHub URL</label>
          <input className="edit-input" value={draft.meta.github} onChange={e => set("meta.github", e.target.value)} />
        </div>
      </div>
      <div className="edit-row">
        <div className="edit-field">
          <label className="edit-label">Resume PDF URL</label>
          <input className="edit-input" value={draft.meta.resume} onChange={e => set("meta.resume", e.target.value)} />
        </div>
        <div className="edit-field">
          <label className="edit-label">Location</label>
          <input className="edit-input" value={draft.meta.location} onChange={e => set("meta.location", e.target.value)} />
        </div>
      </div>
      <div className="edit-field">
        <label className="edit-label">Availability Banner</label>
        <input className="edit-input" value={draft.meta.availability} onChange={e => set("meta.availability", e.target.value)} />
      </div>
    </div>
  );

  const renderAbout = () => (
    <div>
      <div className="edit-field">
        <label className="edit-label">Bio</label>
        <textarea className="edit-textarea" value={draft.about.bio} onChange={e => set("about.bio", e.target.value)} style={{minHeight:130}} />
      </div>
      <label className="edit-label" style={{display:"block",marginBottom:"0.6rem"}}>Stats</label>
      {draft.about.stats.map((s, i) => (
        <div key={i} className="list-item-editor">
          <button className="btn btn-sm btn-danger del-btn" onClick={() => {
            const arr = [...draft.about.stats]; arr.splice(i,1);
            setDraft({...draft, about:{...draft.about, stats:arr}});
          }}>×</button>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Value</label>
              <input className="edit-input" value={s.value} onChange={e => {
                const arr=[...draft.about.stats]; arr[i]={...arr[i],value:e.target.value};
                setDraft({...draft,about:{...draft.about,stats:arr}});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Label</label>
              <input className="edit-input" value={s.label} onChange={e => {
                const arr=[...draft.about.stats]; arr[i]={...arr[i],label:e.target.value};
                setDraft({...draft,about:{...draft.about,stats:arr}});
              }} />
            </div>
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={() => setDraft({...draft,about:{...draft.about,stats:[...draft.about.stats,{label:"New",value:"0"}]}})}>+ Add Stat</button>
    </div>
  );

  const renderSkills = () => (
    <div>
      {draft.skills.map((sg, i) => (
        <div key={i} className="list-item-editor">
          <button className="btn btn-sm btn-danger del-btn" onClick={() => {
            const arr=[...draft.skills]; arr.splice(i,1);
            setDraft({...draft,skills:arr});
          }}>×</button>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Group Name</label>
              <input className="edit-input" value={sg.group} onChange={e => {
                const arr=[...draft.skills]; arr[i]={...arr[i],group:e.target.value};
                setDraft({...draft,skills:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Color</label>
              <input className="edit-input" type="color" value={sg.color} style={{height:42,cursor:"pointer"}} onChange={e => {
                const arr=[...draft.skills]; arr[i]={...arr[i],color:e.target.value};
                setDraft({...draft,skills:arr});
              }} />
            </div>
          </div>
          <div className="edit-field">
            <label className="edit-label">Skills (press Enter to add)</label>
            <TagEditor tags={sg.items} onChange={items => {
              const arr=[...draft.skills]; arr[i]={...arr[i],items};
              setDraft({...draft,skills:arr});
            }} />
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={() => setDraft({...draft,skills:[...draft.skills,{group:"New Group",color:"#6366f1",items:[]}]})}>+ Add Skill Group</button>
    </div>
  );

  const renderExperience = () => (
    <div>
      {draft.experience.map((ex, i) => (
        <div key={ex.id||i} className="list-item-editor">
          <button className="btn btn-sm btn-danger del-btn" onClick={() => {
            const arr=[...draft.experience]; arr.splice(i,1);
            setDraft({...draft,experience:arr});
          }}>×</button>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Role</label>
              <input className="edit-input" value={ex.role} onChange={e => {
                const arr=[...draft.experience]; arr[i]={...arr[i],role:e.target.value};
                setDraft({...draft,experience:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Period</label>
              <input className="edit-input" value={ex.period} onChange={e => {
                const arr=[...draft.experience]; arr[i]={...arr[i],period:e.target.value};
                setDraft({...draft,experience:arr});
              }} />
            </div>
          </div>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Company</label>
              <input className="edit-input" value={ex.company} onChange={e => {
                const arr=[...draft.experience]; arr[i]={...arr[i],company:e.target.value};
                setDraft({...draft,experience:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Location</label>
              <input className="edit-input" value={ex.location} onChange={e => {
                const arr=[...draft.experience]; arr[i]={...arr[i],location:e.target.value};
                setDraft({...draft,experience:arr});
              }} />
            </div>
          </div>
          <div className="edit-field">
            <label className="edit-label">Bullet Points</label>
            <div className="bullet-list-editor">
              {ex.bullets.map((b, bi) => (
                <div key={bi} className="bullet-row">
                  <input className="edit-input" value={b} onChange={e => {
                    const arr=[...draft.experience];
                    const bullets=[...arr[i].bullets]; bullets[bi]=e.target.value;
                    arr[i]={...arr[i],bullets}; setDraft({...draft,experience:arr});
                  }} />
                  <button className="btn btn-sm btn-danger" onClick={() => {
                    const arr=[...draft.experience];
                    const bullets=arr[i].bullets.filter((_,j)=>j!==bi);
                    arr[i]={...arr[i],bullets}; setDraft({...draft,experience:arr});
                  }}>×</button>
                </div>
              ))}
              <button className="add-btn" onClick={() => {
                const arr=[...draft.experience];
                arr[i]={...arr[i],bullets:[...arr[i].bullets,"New bullet point"]};
                setDraft({...draft,experience:arr});
              }}>+ Add Bullet</button>
            </div>
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={() => setDraft({...draft,experience:[...draft.experience,{id:Date.now().toString(),role:"New Role",company:"Company",location:"Location",period:"2024 — Present",type:"Full Time",bullets:["Key achievement"]}]})}>+ Add Experience</button>
    </div>
  );

  const renderProjects = () => (
    <div>
      {draft.projects.map((p, i) => (
        <div key={p.id||i} className="list-item-editor">
          <button className="btn btn-sm btn-danger del-btn" onClick={() => {
            const arr=[...draft.projects]; arr.splice(i,1);
            setDraft({...draft,projects:arr});
          }}>×</button>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Title</label>
              <input className="edit-input" value={p.title} onChange={e => {
                const arr=[...draft.projects]; arr[i]={...arr[i],title:e.target.value};
                setDraft({...draft,projects:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Type</label>
              <input className="edit-input" value={p.type} onChange={e => {
                const arr=[...draft.projects]; arr[i]={...arr[i],type:e.target.value};
                setDraft({...draft,projects:arr});
              }} />
            </div>
          </div>
          <div className="edit-field">
            <label className="edit-label">Description</label>
            <textarea className="edit-textarea" style={{minHeight:70}} value={p.description} onChange={e => {
              const arr=[...draft.projects]; arr[i]={...arr[i],description:e.target.value};
              setDraft({...draft,projects:arr});
            }} />
          </div>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">GitHub URL</label>
              <input className="edit-input" value={p.github||""} placeholder="https://github.com/..." onChange={e => {
                const arr=[...draft.projects]; arr[i]={...arr[i],github:e.target.value||null};
                setDraft({...draft,projects:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Card Color</label>
              <input className="edit-input" type="color" value={p.color} style={{height:42,cursor:"pointer"}} onChange={e => {
                const arr=[...draft.projects]; arr[i]={...arr[i],color:e.target.value};
                setDraft({...draft,projects:arr});
              }} />
            </div>
          </div>
          <div className="edit-field">
            <label className="edit-label">Tech Stack (Enter to add)</label>
            <TagEditor tags={p.tech} onChange={tech => {
              const arr=[...draft.projects]; arr[i]={...arr[i],tech};
              setDraft({...draft,projects:arr});
            }} />
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={() => setDraft({...draft,projects:[...draft.projects,{id:Date.now().toString(),number:String(draft.projects.length+1).padStart(2,"0"),title:"New Project",description:"Project description...",tech:["Python"],github:null,demo:null,type:"Data Engineering",color:"#6366f1"}]})}>+ Add Project</button>
    </div>
  );

  const renderCerts = () => (
    <div>
      {draft.certifications.map((c, i) => (
        <div key={c.id||i} className="list-item-editor">
          <button className="btn btn-sm btn-danger del-btn" onClick={() => {
            const arr=[...draft.certifications]; arr.splice(i,1);
            setDraft({...draft,certifications:arr});
          }}>×</button>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Name</label>
              <input className="edit-input" value={c.name} onChange={e => {
                const arr=[...draft.certifications]; arr[i]={...arr[i],name:e.target.value};
                setDraft({...draft,certifications:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Issuer</label>
              <input className="edit-input" value={c.issuer} onChange={e => {
                const arr=[...draft.certifications]; arr[i]={...arr[i],issuer:e.target.value};
                setDraft({...draft,certifications:arr});
              }} />
            </div>
          </div>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">Icon (emoji)</label>
              <input className="edit-input" value={c.icon} onChange={e => {
                const arr=[...draft.certifications]; arr[i]={...arr[i],icon:e.target.value};
                setDraft({...draft,certifications:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Year</label>
              <input className="edit-input" value={c.year||""} onChange={e => {
                const arr=[...draft.certifications]; arr[i]={...arr[i],year:e.target.value};
                setDraft({...draft,certifications:arr});
              }} />
            </div>
          </div>
          <div className="edit-field">
            <label className="edit-label">Certificate Link</label>
            <input className="edit-input" value={c.link||""} onChange={e => {
              const arr=[...draft.certifications]; arr[i]={...arr[i],link:e.target.value};
              setDraft({...draft,certifications:arr});
            }} />
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={() => setDraft({...draft,certifications:[...draft.certifications,{id:Date.now().toString(),name:"New Certification",issuer:"Issuer",icon:"🏆",link:"#",year:"2024"}]})}>+ Add Certification</button>
    </div>
  );

  const renderEducation = () => (
    <div>
      {draft.education.map((e, i) => (
        <div key={e.id||i} className="list-item-editor">
          <button className="btn btn-sm btn-danger del-btn" onClick={() => {
            const arr=[...draft.education]; arr.splice(i,1);
            setDraft({...draft,education:arr});
          }}>×</button>
          <div className="edit-field">
            <label className="edit-label">Degree / Program</label>
            <input className="edit-input" value={e.degree} onChange={ev => {
              const arr=[...draft.education]; arr[i]={...arr[i],degree:ev.target.value};
              setDraft({...draft,education:arr});
            }} />
          </div>
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-label">School</label>
              <input className="edit-input" value={e.school} onChange={ev => {
                const arr=[...draft.education]; arr[i]={...arr[i],school:ev.target.value};
                setDraft({...draft,education:arr});
              }} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Period</label>
              <input className="edit-input" value={e.period} onChange={ev => {
                const arr=[...draft.education]; arr[i]={...arr[i],period:ev.target.value};
                setDraft({...draft,education:arr});
              }} />
            </div>
          </div>
          <div className="edit-field">
            <label className="edit-label">Score / Grade (optional)</label>
            <input className="edit-input" value={e.score||""} placeholder="e.g. 79.13%" onChange={ev => {
              const arr=[...draft.education]; arr[i]={...arr[i],score:ev.target.value||null};
              setDraft({...draft,education:arr});
            }} />
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={() => setDraft({...draft,education:[...draft.education,{id:Date.now().toString(),degree:"New Degree",school:"School Name",period:"2020 – 2024",score:null}]})}>+ Add Education</button>
    </div>
  );

  const renderIcons = () => {
    const nodes = draft.orbitIcons || SERVICE_NODES.map(n => ({...n, dataUrl: null}));
    const dragIdx = { current: null };

    const readFile = (file, cb) => {
      const reader = new FileReader();
      reader.onload = ev => cb(ev.target.result);
      reader.readAsDataURL(file);
    };

    const handleUpload = (i, file) => {
      if (!file) return;
      readFile(file, dataUrl => {
        const arr = [...nodes];
        arr[i] = { ...arr[i], file: file.name, dataUrl };
        setDraft(d => ({ ...d, orbitIcons: arr }));
      });
    };

    const handleAddNew = (file) => {
      if (!file) return;
      readFile(file, dataUrl => {
        const label = file.name.replace(/\.[^.]+$/, '').slice(0, 10);
        const arr = [...nodes, { file: file.name, label, color: "#6366f1", dataUrl }];
        setDraft(d => ({ ...d, orbitIcons: arr }));
      });
    };

    const moveIcon = (from, to) => {
      const arr = [...nodes];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      setDraft(d => ({ ...d, orbitIcons: arr }));
    };

    const r1End = Math.ceil(nodes.length * 0.25);
    const r2End = r1End + Math.ceil(nodes.length * 0.35);
    const ringOf = i => i < r1End ? 1 : i < r2End ? 2 : 3;
    const ringColor = i => i < r1End ? "#6366f1" : i < r2End ? "#06b6d4" : "#ec4899";
    const ringBg   = i => i < r1End ? "rgba(99,102,241,0.25)" : i < r2End ? "rgba(6,182,212,0.25)" : "rgba(236,72,153,0.25)";

    return (
      <div>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          marginBottom:"1rem",padding:"0.7rem 1rem",
          background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:10}}>
          <span style={{fontFamily:"var(--mono)",fontSize:"0.64rem",color:"var(--muted2)"}}>
            {nodes.length} icons · <span style={{color:"rgba(148,163,184,0.6)"}}>drag to reorder · ring = position in orbit</span>
          </span>
          <label style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.38rem 0.85rem",
            cursor:"pointer",borderRadius:8,fontFamily:"var(--mono)",fontSize:"0.67rem",color:"#a5b4fc",
            background:"linear-gradient(135deg,rgba(99,102,241,0.22),rgba(6,182,212,0.18))",
            border:"1px solid rgba(99,102,241,0.45)"}}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload PNG
            <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleAddNew(e.target.files[0])} />
          </label>
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"0.6rem"}}>
          {nodes.map((n, i) => {
            const imgSrc = n.dataUrl || withBase(`icons/${n.file}`);
            const ring = ringOf(i);
            return (
              <div key={n.file+i}
                draggable
                onDragStart={e => { dragIdx.current = i; e.dataTransfer.effectAllowed = "move"; e.currentTarget.style.opacity="0.5"; }}
                onDragEnd={e => { e.currentTarget.style.opacity="1"; dragIdx.current = null; }}
                onDragOver={e => { e.preventDefault(); e.currentTarget.style.boxShadow=`0 0 0 2px ${ringColor(i)}`; }}
                onDragLeave={e => { e.currentTarget.style.boxShadow=""; }}
                onDrop={e => {
                  e.preventDefault(); e.currentTarget.style.boxShadow="";
                  if (dragIdx.current !== null && dragIdx.current !== i) moveIcon(dragIdx.current, i);
                }}
                style={{
                  background:"var(--card)",border:"1px solid var(--border2)",borderRadius:12,
                  padding:"0.75rem",position:"relative",cursor:"grab",userSelect:"none",
                  transition:"box-shadow 0.15s",
                }}
              >
                {/* Delete */}
                <button onClick={()=>{const arr=[...nodes];arr.splice(i,1);setDraft(d=>({...d,orbitIcons:arr}));}}
                  style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",
                    background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",
                    color:"#ef4444",fontSize:"0.7rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>

                {/* Top row */}
                <div style={{display:"flex",alignItems:"center",gap:"0.55rem",marginBottom:"0.6rem",paddingRight:"1.4rem"}}>
                  {/* Drag dots */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2.5,flexShrink:0,opacity:0.3}}>
                    {[0,1,2,3,4,5].map(d=><div key={d} style={{width:3,height:3,borderRadius:"50%",background:"#94a3b8"}}/>)}
                  </div>
                  {/* Ring badge */}
                  <div style={{width:20,height:20,borderRadius:"50%",flexShrink:0,
                    background:ringBg(i),border:`1.5px solid ${ringColor(i)}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"var(--mono)",fontSize:"0.48rem",fontWeight:700,color:ringColor(i)}}>
                    R{ring}
                  </div>
                  {/* Icon preview */}
                  <div style={{width:40,height:40,borderRadius:10,flexShrink:0,
                    background:`${n.color}18`,border:`1px solid ${n.color}50`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    boxShadow:`0 3px 10px ${n.color}25,inset 0 1px 0 rgba(255,255,255,0.1)`}}>
                    <img src={imgSrc} alt={n.label}
                      style={{width:24,height:24,objectFit:"contain",filter:`drop-shadow(0 1px 3px ${n.color}60)`}}
                      onError={e=>{e.target.style.opacity=0.15;}}/>
                  </div>
                  {/* Swap upload */}
                  <label style={{width:30,height:40,borderRadius:8,flexShrink:0,cursor:"pointer",
                    border:"1px dashed rgba(99,102,241,0.32)",background:"rgba(99,102,241,0.04)",
                    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1.5}}
                    title="Replace icon">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(165,180,252,0.65)" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span style={{fontFamily:"var(--mono)",fontSize:"0.4rem",color:"rgba(165,180,252,0.55)"}}>swap</span>
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleUpload(i,e.target.files[0])} />
                  </label>
                  {/* File name */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"var(--mono)",fontSize:"0.54rem",color:"var(--muted)",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.file}</div>
                    {n.dataUrl && <div style={{fontFamily:"var(--mono)",fontSize:"0.5rem",color:"#10b981",marginTop:1}}>● saved</div>}
                  </div>
                </div>

                {/* Label + color */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 40px",gap:"0.4rem",alignItems:"end"}}>
                  <div>
                    <div style={{fontFamily:"var(--mono)",fontSize:"0.58rem",color:"var(--muted)",marginBottom:"0.25rem",letterSpacing:"0.08em",textTransform:"uppercase"}}>Label</div>
                    <input value={n.label} maxLength={10}
                      style={{width:"100%",background:"var(--surface)",border:"1px solid var(--border2)",borderRadius:6,
                        padding:"0.35rem 0.55rem",fontFamily:"var(--mono)",fontSize:"0.75rem",color:"var(--text)",outline:"none"}}
                      onChange={e=>{const arr=[...nodes];arr[i]={...arr[i],label:e.target.value};setDraft(d=>({...d,orbitIcons:arr}));}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:"var(--mono)",fontSize:"0.58rem",color:"var(--muted)",marginBottom:"0.25rem",letterSpacing:"0.08em",textTransform:"uppercase"}}>Glow</div>
                    <input type="color" value={n.color}
                      style={{width:"100%",height:33,borderRadius:6,border:"1px solid var(--border2)",cursor:"pointer",padding:2,background:"none"}}
                      onChange={e=>{const arr=[...nodes];arr[i]={...arr[i],color:e.target.value};setDraft(d=>({...d,orbitIcons:arr}));}}/>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add-new upload card */}
          <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.4rem",
            border:"1.5px dashed rgba(99,102,241,0.2)",borderRadius:12,background:"rgba(99,102,241,0.03)",
            cursor:"pointer",minHeight:120,transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(99,102,241,0.5)";e.currentTarget.style.background="rgba(99,102,241,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(99,102,241,0.2)";e.currentTarget.style.background="rgba(99,102,241,0.03)";}}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:"rgba(99,102,241,0.5)"}}>Upload new icon</span>
            <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleAddNew(e.target.files[0])} />
          </label>
        </div>
      </div>
    );
  };

    const panels = { meta:renderMeta, about:renderAbout, skills:renderSkills, experience:renderExperience, projects:renderProjects, certifications:renderCerts, education:renderEducation, icons:renderIcons };

  return (
    <div className="edit-overlay" onClick={e => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="edit-panel">
        <div className="edit-header">
          <span className="edit-title">✦ EDIT PORTFOLIO — {tab.toUpperCase()}</span>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>✕ Close</button>
        </div>
        <div className="edit-tabs">
          {TABS.map(t => (
            <button key={t} className={`edit-tab ${tab===t?"active":""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="edit-body" style={{maxHeight:"60vh",overflowY:"auto"}}>
          {panels[tab]?.()}
        </div>
        <div style={{borderTop:"1px solid var(--border2)",padding:"0.8rem 1.4rem",background:"rgba(6,182,212,0.04)"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.61rem",color:"rgba(148,163,184,0.55)",marginBottom:"0.65rem",lineHeight:1.7}}>
            <span style={{color:"#67e8f9",fontWeight:700}}>How to push changes to production:</span><br/>
            <span style={{color:"#a5b4fc"}}>1.</span> Make edits  <span style={{color:"#a5b4fc"}}>2.</span> Save Changes  <span style={{color:"#a5b4fc"}}>3.</span> Click <span style={{color:"#10b981",fontWeight:600}}>Export for Prod</span><br/>
            <span style={{color:"#a5b4fc"}}>4.</span> Save the downloaded file as <code style={{color:"#fbbf24",background:"rgba(251,191,36,0.1)",padding:"1px 4px",borderRadius:3}}>public/portfolio-data.json</code><br/>
            <span style={{color:"#a5b4fc"}}>5.</span> <code style={{color:"#fbbf24",background:"rgba(251,191,36,0.1)",padding:"1px 4px",borderRadius:3}}>npm run build</code> → deploy → production updated ✓
          </div>
          <div style={{display:"flex",gap:"0.55rem",flexWrap:"wrap",alignItems:"center"}}>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
            <button style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.35)",
              color:"#10b981",borderRadius:6,padding:"0.35rem 0.9rem",cursor:"pointer",
              fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem"}}
              title="Download portfolio-data.json — put it in public/ then npm run build"
              onClick={() => {
                const blob = new Blob([JSON.stringify(draft, null, 2)], {type:"application/json"});
                const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
                a.download = "portfolio-data.json"; a.click();
              }}>⬇ Export for Prod</button>
            <button className="btn btn-success btn-sm" onClick={() => { onSave(draft); onClose(); }}>✓ Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   TECH ORBIT PANEL — right side of hero
═══════════════════════════════════════════════════════════ */
function TechOrbitPanel() {
  // ring1 (r=80): 4 nodes
  // ring2 (r=140): 6 nodes  
  // ring3 (r=210): 8 nodes
  const center = { x: 215, y: 250 };

  const ring1Nodes = [
    { icon: "🐍", label: "Python",   color: "#6366f1", bg: "rgba(99,102,241,0.15)",  angle: 45 },
    { icon: "⚡", label: "PySpark",  color: "#06b6d4", bg: "rgba(6,182,212,0.15)",   angle: 135 },
    { icon: "🗄️", label: "SQL",      color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  angle: 225 },
    { icon: "🤖", label: "LLMs",     color: "#ec4899", bg: "rgba(236,72,153,0.15)",  angle: 315 },
  ];
  const ring2Nodes = [
    { icon: "☁️", label: "AWS S3",    color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  angle: 0   },
    { icon: "🔥", label: "Glue",      color: "#ef4444", bg: "rgba(239,68,68,0.12)",   angle: 60  },
    { icon: "📡", label: "Kafka",     color: "#06b6d4", bg: "rgba(6,182,212,0.12)",   angle: 120 },
    { icon: "🧠", label: "Bedrock",   color: "#ec4899", bg: "rgba(236,72,153,0.12)",  angle: 180 },
    { icon: "🌊", label: "Airflow",   color: "#6366f1", bg: "rgba(99,102,241,0.12)",  angle: 240 },
    { icon: "🔍", label: "Athena",    color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",  angle: 300 },
  ];
  const ring3Nodes = [
    { icon: "🗃️",  label: "Redshift",  color: "#ef4444", bg: "rgba(239,68,68,0.1)",   angle: 22  },
    { icon: "⚙️",  label: "EMR",       color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  angle: 67  },
    { icon: "🔄",  label: "ETL",       color: "#10b981", bg: "rgba(16,185,129,0.1)",  angle: 112 },
    { icon: "📊",  label: "Streamlit", color: "#06b6d4", bg: "rgba(6,182,212,0.1)",   angle: 157 },
    { icon: "🧬",  label: "RAG",       color: "#ec4899", bg: "rgba(236,72,153,0.1)",  angle: 202 },
    { icon: "🏗️",  label: "Lambda",    color: "#6366f1", bg: "rgba(99,102,241,0.1)",  angle: 247 },
    { icon: "🗺️",  label: "DynamoDB",  color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  angle: 292 },
    { icon: "🔮",  label: "GenAI",     color: "#ec4899", bg: "rgba(236,72,153,0.1)",  angle: 337 },
  ];

  const pos = (cx, cy, r, angleDeg) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const allNodes = [
    ...ring1Nodes.map(n => ({ ...n, r: 80,  delay: Math.random() * 2 })),
    ...ring2Nodes.map(n => ({ ...n, r: 140, delay: Math.random() * 2 })),
    ...ring3Nodes.map(n => ({ ...n, r: 210, delay: Math.random() * 2 })),
  ];

  const TICKERS = [
    "ETL PIPELINE","PYSPARK","AWS GLUE","DATA LAKE","APACHE AIRFLOW",
    "AMAZON BEDROCK","RAG SYSTEM","STEP FUNCTIONS","KAFKA STREAMS","ATHENA QUERIES",
    "PYTHON 3.x","DATA MODELING","LLM AGENT","REDSHIFT","ML READY",
    "ETL PIPELINE","PYSPARK","AWS GLUE","DATA LAKE","APACHE AIRFLOW",
    "AMAZON BEDROCK","RAG SYSTEM","STEP FUNCTIONS","KAFKA STREAMS","ATHENA QUERIES",
  ];

  return (
    <div className="hero-tech-panel">
      {/* SVG rings + connection lines */}
      <svg
        className="orbit-svg"
        viewBox="0 0 430 500"
        style={{position:"absolute",inset:0,width:"100%",height:"100%"}}
      >
        {/* Rings */}
        <circle cx={center.x} cy={center.y} r={80}  fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="4 6"/>
        <circle cx={center.x} cy={center.y} r={140} fill="none" stroke="rgba(6,182,212,0.12)"  strokeWidth="1" strokeDasharray="3 8"/>
        <circle cx={center.x} cy={center.y} r={210} fill="none" stroke="rgba(236,72,153,0.08)" strokeWidth="1" strokeDasharray="2 10"/>
        {/* Connection lines from center to ring1 */}
        {ring1Nodes.map((n, i) => {
          const p = pos(center.x, center.y, 80, n.angle);
          return <line key={i} x1={center.x} y1={center.y} x2={p.x} y2={p.y}
            stroke={n.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 4"/>;
        })}
        {/* Connection lines ring1 to ring2 */}
        {ring2Nodes.map((n, i) => {
          const p2 = pos(center.x, center.y, 140, n.angle);
          const nearest = ring1Nodes.reduce((best, r1) => {
            const d = Math.abs(r1.angle - n.angle); const d2 = Math.min(d, 360-d);
            const bestD = Math.abs(best.angle - n.angle); const bestD2 = Math.min(bestD, 360-bestD);
            return d2 < bestD2 ? r1 : best;
          });
          const p1 = pos(center.x, center.y, 80, nearest.angle);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={n.color} strokeWidth="0.4" opacity="0.2" strokeDasharray="2 5"/>;
        })}
        {/* Glow dots on ring intersections */}
        {allNodes.map((n, i) => {
          const p = pos(center.x, center.y, n.r, n.angle);
          return <circle key={i} cx={p.x} cy={p.y} r="3" fill={n.color} opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
          </circle>;
        })}
      </svg>

      {/* Center node */}
      <div className="orbit-center" style={{position:"absolute",left:"50%",top:`${center.y/500*100}%`,transform:"translate(-50%,-50%)"}}>
        🔬
      </div>

      {/* Tech nodes */}
      {allNodes.map((n, i) => {
        const p = pos(center.x, center.y, n.r, n.angle);
        const lx = (p.x / 430) * 100;
        const ly = (p.y / 500) * 100;
        return (
          <div key={i} className="t-node" style={{left:`${lx}%`, top:`${ly}%`}}>
            <div
              className="t-node-box"
              style={{
                background: n.bg,
                borderColor: n.color + "50",
                boxShadow: `0 0 12px ${n.color}20`,
                animationDuration: `${3 + (i % 4) * 0.7}s`,
                animationDelay: `${n.delay}s`,
              }}
            >
              {n.icon}
            </div>
            <span className="t-node-lbl">{n.label}</span>
          </div>
        );
      })}

      {/* Data ticker at bottom */}
      <div className="data-ticker">
        <div className="ticker-inner">
          {TICKERS.map((t, i) => (
            <span key={i} className="tick-item">
              <span className="tick-dot"/>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   HERO RIGHT PANEL — Agentic infographic + AWS service icons
═══════════════════════════════════════════════════════════ */

/* AWS/tech service SVG icons as inline components */

/* ═══════════════════════════════════════════════════════════
   ORBIT ICON SYSTEM — uses /icons/*.png  (auto-layout)
   To add icons: drop PNG in public/icons/, add entry below.
═══════════════════════════════════════════════════════════ */

/*
  SERVICE_NODES drives EVERYTHING:
  - file   : filename inside /icons/
  - label  : short display name  (≤10 chars)
  - color  : glow + line colour
  Icons are auto-placed on 3 concentric rings, evenly spaced.
  To add → just push a new object. Rings auto-adjust.
  To remove → delete the object.
*/
const SERVICE_NODES = [
  { file:"python.png",        label:"Python",     color:"#3776AB" },
  { file:"aws.png",           label:"AWS",        color:"#FF9900" },
  { file:"spark.png",         label:"Spark",      color:"#E25A00" },
  { file:"kafka.png",         label:"Kafka",      color:"#E53935" },
  { file:"airflow.png",       label:"Airflow",    color:"#007A88" },
  { file:"docker.png",        label:"Docker",     color:"#2496ED" },
  { file:"terraform.png",     label:"Terraform",  color:"#7B42BC" },
  { file:"gitlab.png",        label:"GitLab",     color:"#FC6D26" },
  { file:"bitbucket.png",     label:"Bitbucket",  color:"#2684FF" },
  { file:"github_actions.png",label:"GH Actions", color:"#2088FF" },
  { file:"git.png",           label:"Git",        color:"#F05032" },
  { file:"postgres.png",      label:"Postgres",   color:"#336791" },
  { file:"mysql.png",         label:"MySQL",      color:"#00758F" },
  { file:"mssql.png",         label:"MS SQL",     color:"#CC2927" },
  { file:"graphql.png",       label:"GraphQL",    color:"#E535AB" },
  { file:"sqlalchemy.png",    label:"SQLAlchemy", color:"#CC0000" },
  { file:"azure_sql.png",     label:"Azure SQL",  color:"#0089D6" },
  { file:"database.png",      label:"DB Layer",   color:"#4FC3F7" },
  { file:"sqlite.png",        label:"SQLite",     color:"#003B57" },
  { file:"sql_developer.png", label:"SQL Dev",    color:"#4A90D9" },
];

/* Auto-distribute icons across 3 rings */
function distributeRings(nodes) {
  const total = nodes.length;
  // Split: inner gets ~1/4, mid ~1/3, outer rest
  const r1Count = Math.ceil(total * 0.25);
  const r2Count = Math.ceil(total * 0.35);
  const r3Count = total - r1Count - r2Count;
  const rings = [
    { r: 110, nodes: nodes.slice(0, r1Count) },
    { r: 175, nodes: nodes.slice(r1Count, r1Count + r2Count) },
    { r: 235, nodes: nodes.slice(r1Count + r2Count) },
  ];
  const placed = [];
  rings.forEach(({ r, nodes: rNodes }) => {
    rNodes.forEach((n, i) => {
      const angleDeg = (360 / rNodes.length) * i - 90;
      const rad = angleDeg * Math.PI / 180;
      // cx=215, cy=250 is the SVG center
      const x = 215 + r * Math.cos(rad);
      const y = 250 + r * Math.sin(rad);
      placed.push({ ...n, x, y, r,
        dur: `${3.5 + (i % 5) * 0.4}s`,
        dly: `${(i * 0.28) % 2.5}s`,
      });
    });
  });
  return placed;
}

const TICKERS = [
  "PYTHON","AWS GLUE","PYSPARK","KAFKA","AIRFLOW","DOCKER","TERRAFORM",
  "GRAPHQL","POSTGRES","MYSQL","GITLAB","BITBUCKET","GITHUB ACTIONS",
  "AZURE SQL","SQLALCHEMY","ETL PIPELINE","DATA LAKE","RAG SYSTEM","LLM AGENT",
  "PYTHON","AWS GLUE","PYSPARK","KAFKA","AIRFLOW","DOCKER","TERRAFORM",
  "GRAPHQL","POSTGRES","MYSQL","GITLAB","BITBUCKET","GITHUB ACTIONS",
];

function HeroRightPanel({ nodes = SERVICE_NODES }) {
  const placed = distributeRings(nodes);
  // SVG viewBox is 430×500; cx=215, cy=250
  const CX = 215, CY = 250;
  // Convert SVG coords → % for absolute positioning
  const toPos = (svgX, svgY) => ({
    left: `${(svgX / 430 * 100).toFixed(2)}%`,
    top:  `${(svgY / 500 * 100).toFixed(2)}%`,
  });

  return (
    <div className="hero-right-panel">

      {/* ── SVG: rings + animated connection lines ── */}
      <svg
        style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none"}}
        viewBox="0 0 430 500"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dashed orbit rings */}
        <circle cx={CX} cy={CY} r="110" fill="none" stroke="rgba(99,102,241,0.18)"  strokeWidth="1" strokeDasharray="4 6"/>
        <circle cx={CX} cy={CY} r="175" fill="none" stroke="rgba(6,182,212,0.12)"   strokeWidth="1" strokeDasharray="3 8"/>
        <circle cx={CX} cy={CY} r="235" fill="none" stroke="rgba(236,72,153,0.08)"  strokeWidth="1" strokeDasharray="2 10"/>

        {/* Animated connection lines from center to each icon */}
        {placed.map((n, i) => (
          <line key={`ln-${i}`}
            x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke={n.color} strokeWidth="0.7"
            strokeDasharray="5 6" opacity="0.28"
            style={{animation:`dash ${2 + i * 0.22}s linear infinite`}}
          />
        ))}

        {/* Pulse dots at icon positions */}
        {placed.map((n, i) => (
          <circle key={`pt-${i}`} cx={n.x} cy={n.y} r="2.5" fill={n.color} opacity="0.55">
            <animate attributeName="opacity" values="0.2;0.75;0.2"
              dur={`${1.8 + i * 0.15}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </svg>

      {/* ── CENTER: rectangle "AI + Data Eng" label ── */}
      <div style={{
        position:"absolute",
        left:"50%", top:"50%",
        transform:"translate(-50%,-50%)",
        zIndex:8,
        width:88, height:72,
        borderRadius:14,
        background:"linear-gradient(135deg,rgba(99,102,241,0.22),rgba(6,182,212,0.18))",
        border:"1.5px solid rgba(99,102,241,0.6)",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
        backdropFilter:"blur(18px)",
        boxShadow:"0 0 40px rgba(99,102,241,0.45), 0 0 80px rgba(6,182,212,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        animation:"centerPulse 3s ease-in-out infinite",
      }}>
        {/* 3D shimmer top edge */}
        <div style={{
          position:"absolute",top:0,left:8,right:8,height:1,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)",
          borderRadius:1,
        }}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.58rem",fontWeight:700,
          color:"#a5b4fc",letterSpacing:"0.05em",lineHeight:1}}>AI +</span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.7rem",fontWeight:900,
          color:"#e2e8f0",letterSpacing:"0.02em",lineHeight:1,
          textShadow:"0 0 14px rgba(99,102,241,0.9)"}}>Data</span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.58rem",fontWeight:700,
          color:"#67e8f9",letterSpacing:"0.06em",lineHeight:1}}>Eng</span>
        {/* Bottom reflection */}
        <div style={{
          position:"absolute",bottom:-1,left:6,right:6,height:1,
          background:"linear-gradient(90deg,transparent,rgba(6,182,212,0.4),transparent)",
          borderRadius:1,
        }}/>
      </div>

      {/* ── FLOATING ICON NODES ── */}
      {placed.map((n, i) => {
        const pos = toPos(n.x, n.y);
        return (
          <div
            key={n.file}
            title={n.label}
            style={{
              position:"absolute",
              left: pos.left, top: pos.top,
              transform:"translate(-50%,-50%)",
              display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              zIndex:6,
              animation:`nodeFloat ${n.dur} ease-in-out infinite alternate`,
              animationDelay: n.dly,
            }}
          >
            {/* 3D icon box */}
            <div style={{
              width:44, height:44,
              borderRadius:12,
              background:`linear-gradient(145deg, ${n.color}22, ${n.color}08)`,
              border:`1px solid ${n.color}55`,
              boxShadow:`0 4px 16px ${n.color}30, 0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.3) inset`,
              display:"flex",alignItems:"center",justifyContent:"center",
              backdropFilter:"blur(14px)",
              transition:"transform 0.25s, box-shadow 0.25s",
              position:"relative",
              overflow:"hidden",
              cursor:"default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.28) translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 8px 28px ${n.color}55, 0 1px 0 rgba(255,255,255,0.18) inset`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = `0 4px 16px ${n.color}30, 0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.3) inset`;
              }}
            >
              {/* Top-edge 3D highlight */}
              <div style={{position:"absolute",top:0,left:4,right:4,height:1,
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)"}}/>
              {/* Actual icon PNG — uniform 28×28 */}
              <img
                src={n.dataUrl || `/icons/${n.file}`}
                alt={n.label}
                style={{width:28,height:28,objectFit:"contain",imageRendering:"auto",
                  filter:`drop-shadow(0 2px 4px ${n.color}60)`,
                  position:"relative",zIndex:1,
                }}
                onError={e => { e.target.style.display="none"; }}
              />
            </div>
            {/* Label */}
            <span style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:"0.5rem",
              color:"rgba(148,163,184,0.75)",
              letterSpacing:"0.04em",
              whiteSpace:"nowrap",
              textAlign:"center",
              maxWidth:52,
              overflow:"hidden",
              textOverflow:"ellipsis",
            }}>{n.label}</span>
          </div>
        );
      })}

      {/* ── DATA TICKER ── */}
      <div className="data-ticker">
        <div className="ticker-inner">
          {TICKERS.map((t, i) => (
            <span key={i} className="tick-item">
              <span className="tick-dot"/>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [editMode, setEditMode] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  // Add orb keyframes
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @keyframes orbFloat {
        from { transform: translate(0,0) scale(1); opacity:0.6; }
        to   { transform: translate(20px,-30px) scale(1.08); opacity:0.9; }
      }
    `;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  useReveal();

  // ── DEV / PROD toggle ──────────────────────────────────────
  // In .env.local  →  VITE_DEV_MODE=true   (shows Edit button)
  // In .env        →  VITE_DEV_MODE=false  (hides Edit button for prod)
  const IS_DEV = (() => {
    try { return import.meta.env.VITE_DEV_MODE === "true"; }
    catch(e) { return false; }
  })();

  const handleSave = useCallback((newData) => {
    setData(newData);
    // Persist to localStorage
    try {
      const { orbitIcons, ...rest } = newData;
      localStorage.setItem("portfolio_data", JSON.stringify(rest));
      if (orbitIcons && orbitIcons.length)
        localStorage.setItem("portfolio_icons", JSON.stringify(orbitIcons));
    } catch(e) { console.warn("Save failed:", e.message); }
  }, []);

  // ── DATA LOADING PRIORITY ────────────────────────────────
  // 1. localStorage (your dev edits, survive refresh)
  // 2. /portfolio-data.json in /public (written by npm run publish)
  // 3. DEFAULT_DATA hardcoded above (fallback)
  //
  // WORKFLOW FOR PROD:
  //   Edit in dev → "Save Changes" → Editor → "⬇ Export JSON"
  //   → save file as  public/portfolio-data.json
  //   → npm run build  → deploy  ✓
  //
  // OR use:  npm run publish  (auto-patches DEFAULT_DATA)
  useEffect(() => {
    const merge = (parsed) => {
      try {
        const icons = localStorage.getItem("portfolio_icons");
        if (icons) parsed.orbitIcons = JSON.parse(icons);
      } catch(e) {}
      setData(parsed);
    };

    // Step 1 — localStorage (highest priority, dev edits)
    try {
      const saved = localStorage.getItem("portfolio_data");
      if (saved) { merge(JSON.parse(saved)); return; }
    } catch(e) {}

    // Step 2 — /portfolio-data.json (published from dev editor)
    fetch(withBase("portfolio-data.json"))
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(json => merge(json))
      .catch(() => {}); // falls back to DEFAULT_DATA already set
  }, []);

  const { meta, about, skills, experience, projects, certifications, education } = data;

  const typeColors = {
    "Data Engineering": { bg: "rgba(99,102,241,0.12)", color: "#6366f1", border: "rgba(99,102,241,0.3)" },
    "AI Engineering":   { bg: "rgba(236,72,153,0.12)", color: "#ec4899", border: "rgba(236,72,153,0.3)" },
    "Developer Tool":   { bg: "rgba(6,182,212,0.12)",  color: "#06b6d4", border: "rgba(6,182,212,0.3)" },
  };

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:"#050710",color:"#f1f5f9",minHeight:"100vh"}}>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-brand">sp<b>.</b>dev</div>
        <ul className="nav-links">
          {["about","skills","experience","projects","certifications","contact"].map(s => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          {IS_DEV && (
            <>
              <button
                className={`nav-btn ${editMode?"active":""}`}
                onClick={() => { setEditMode(!editMode); if(!editMode) setShowEdit(false); }}
              >
                {editMode ? "✓ Editing" : "✎ Edit"}
              </button>
              {editMode && (
                <button className="nav-btn active" onClick={() => setShowEdit(true)}>
                  ⊞ Open Editor
                </button>
              )}
            </>
          )}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{position:"fixed",top:58,left:0,right:0,background:"#080c18",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"1.5rem 2rem",zIndex:999,display:"flex",flexDirection:"column",gap:"1rem"}}>
          {["about","skills","experience","projects","certifications","contact"].map(s => (
            <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.8rem",color:"#94a3b8",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.1em"}}>{s}</a>
          ))}
        </div>
      )}

      {/* Edit mode bar */}
      {IS_DEV && editMode && !showEdit && (
        <div className="edit-mode-bar">
          <span>✎ Edit Mode Active</span>
          <button className="btn btn-sm" style={{background:"rgba(99,102,241,0.3)",border:"1px solid rgba(99,102,241,0.5)",color:"#a5b4fc",borderRadius:6,padding:"0.3rem 0.8rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",cursor:"pointer"}} onClick={() => setShowEdit(true)}>
            Open Editor →
          </button>
        </div>
      )}

      {/* Edit panel */}
      {IS_DEV && showEdit && (
        <EditPanel data={data} onSave={handleSave} onClose={() => setShowEdit(false)} />
      )}

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <HeroCanvas />
        {/* Subtle left/bottom orbs only — right side used by panel */}
        <FloatingOrb color="#06b6d4" size="280px" x="-6%" y="55%" delay="2s" />
        <FloatingOrb color="#6366f1" size="200px" x="5%" y="-5%" delay="0s" />

        <div className="hero-content">
          {/* LEFT — text */}
          <div className="hero-left">
            <div className="hero-badge">{meta.availability}</div>

            <h1 className="hero-name">
              {meta.name.split(" ")[0]}<br/>
              <span className="line2">{meta.name.split(" ").slice(1).join(" ")}</span>
            </h1>

            <div className="hero-roles">
              <span className="role-pill role-data">⚡ Data Engineer</span>
              <span className="role-pill role-ai">✦ AI Engineer</span>
            </div>

            <p className="hero-tagline">{meta.tagline}</p>

            <div className="hero-ctas">
              <a href={withBase("Swapnil_Pharate_resume.pdf")} download="Swapnil_Pharate_Resume.pdf" className="btn btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </a>
              <a href="#contact" className="btn btn-cyan">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Contact
              </a>
              <a href={meta.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Scroll hint */}
            <div style={{marginTop:"2rem",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"0.4rem",opacity:0.4,animation:"fadeSlideUp 1s 1.2s both"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",letterSpacing:"0.15em",color:"#64748b",textTransform:"uppercase"}}>scroll</span>
              <div style={{width:1,height:32,background:"linear-gradient(to bottom, #6366f1, transparent)"}}/>
            </div>
          </div>

          {/* RIGHT — animated tech orbit */}
          <HeroRightPanel nodes={data.orbitIcons || SERVICE_NODES} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-num">01</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line"/>
          </div>
          <div className="about-grid">
            <div>
              <p className="about-bio reveal">{about.bio}</p>
              <div className="stats-row reveal">
                {about.stats.map((s, i) => (
                  <div key={i} className="stat-box">
                    <div className="stat-val">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-right reveal">
              {[
                {dot:"#6366f1", text:"Python · SQL · PySpark"},
                {dot:"#06b6d4", text:"AWS EMR · Glue · Athena · S3"},
                {dot:"#ec4899", text:"LLMs · RAG · Agentic AI · Bedrock"},
                {dot:"#f59e0b", text:"Apache Airflow · Kafka"},
                {dot:"#10b981", text:"Streamlit · Git · Testing Frameworks"},
                {dot:"#8b5cf6", text:"Data Modeling · ETL Optimization"},
              ].map((item, i) => (
                <div key={i} className="about-tag">
                  <div className="about-tag-dot" style={{background:item.dot, boxShadow:`0 0 6px ${item.dot}`}}/>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section section-alt" id="skills">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-num">02</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-line"/>
          </div>
          <div className="skills-grid">
            {skills.map((sg, i) => (
              <div key={i} className="skill-card reveal" style={{"--delay":`${i*0.05}s`}}
                onMouseEnter={e => { e.currentTarget.style.borderColor = sg.color + "60"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ""; }}
              >
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg, ${sg.color}, transparent)`,opacity:0,transition:"opacity 0.3s"}}
                  ref={el => { if(el) { el.parentElement.addEventListener("mouseenter", ()=>{el.style.opacity=1}); el.parentElement.addEventListener("mouseleave", ()=>{el.style.opacity=0}); }}}
                />
                <div className="skill-group-name" style={{color:sg.color}}>{sg.group}</div>
                <div className="skill-tags">
                  {sg.items.map((item, j) => (
                    <span key={j} className="skill-tag"
                      onMouseEnter={e => { e.target.style.background = sg.color; e.target.style.color = "#fff"; e.target.style.borderColor = sg.color; }}
                      onMouseLeave={e => { e.target.style.background = ""; e.target.style.color = ""; e.target.style.borderColor = ""; }}
                    >{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-num">03</span>
            <h2 className="section-title">Work Experience</h2>
            <div className="section-line"/>
          </div>
          <div className="exp-timeline">
            {experience.map((ex, i) => (
              <div key={ex.id||i} className="exp-item reveal">
                <div className="exp-dot"/>
                <div className="exp-card">
                  <div className="exp-header">
                    <h3 className="exp-role">{ex.role}</h3>
                    <span className="exp-badge">{ex.period}</span>
                  </div>
                  <p className="exp-company">{ex.company} · {ex.location}</p>
                  <ul className="exp-bullets">
                    {ex.bullets.map((b, bi) => (
                      <li key={bi} className="exp-bullet">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section section-alt" id="projects">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-num">04</span>
            <h2 className="section-title">Projects</h2>
            <div className="section-line"/>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => {
              const tc = typeColors[p.type] || typeColors["Developer Tool"];
              return (
                <article key={p.id||i} className="proj-card reveal">
                  <div className="proj-card-line" style={{background:`linear-gradient(90deg, ${p.color}, transparent)`}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span className="proj-num">{String(i+1).padStart(2,"0")}</span>
                    <span className="proj-type-tag" style={{background:tc.bg, color:tc.color, borderColor:tc.border}}>{p.type}</span>
                  </div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-tech">
                    {p.tech.map((t, ti) => <span key={ti} className="tech-chip">{t}</span>)}
                  </div>
                  <div className="proj-footer">
                    {p.github ? (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View Code
                      </a>
                    ) : <span className="proj-link" style={{opacity:0.4,cursor:"default"}}>Professional</span>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="section" id="certifications">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-num">05</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-line"/>
          </div>
          <div className="certs-grid">
            {certifications.map((c, i) => (
              <div key={c.id||i} className="cert-card reveal">
                <div className="cert-icon-box">{c.icon}</div>
                <div style={{flex:1}}>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer}{c.year ? ` · ${c.year}` : ""}</div>
                  {c.link && c.link !== "#" && (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-link-btn">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-num">06</span>
            <h2 className="section-title">Education</h2>
            <div className="section-line"/>
          </div>
          <div className="edu-grid">
            {education.map((e, i) => (
              <div key={e.id||i} className="edu-card reveal">
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-meta">
                  <span className="edu-tag">{e.period}</span>
                  {e.score && <span className="edu-tag edu-score">{e.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-center">
            <div className="section-num reveal" style={{display:"block",textAlign:"center",marginBottom:"0.8rem"}}>07</div>
            <h2 className="contact-headline reveal">
              Let's <span>build</span><br/>something great.
            </h2>
            <p className="contact-sub reveal">
              Open to full-time Data & AI Engineering roles, freelance pipelines, and interesting technical collaborations. I reply fast.
            </p>
            <div className="contact-links reveal">
              <a href={`mailto:${meta.email}`} className="contact-card">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {meta.email}
              </a>
              <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href={meta.github} target="_blank" rel="noopener noreferrer" className="contact-card">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href={`tel:${meta.phone}`} className="contact-card">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.3 19.79 19.79 0 0 1 1.61 4.68 2 2 0 0 1 3.58 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17z"/></svg>
                {meta.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built by {meta.name} · {meta.location} · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
