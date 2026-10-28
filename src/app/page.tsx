"use client";

import { useState, useEffect } from "react";
import { Download, Play, Plus, Trash, Target, CheckCircle2, AlertCircle, Award, FileText, ExternalLink, RefreshCw, RotateCcw, X, Shield } from "lucide-react";
import CreatableSelect from "react-select/creatable";

// --- React-Select Styling for Industrial Dark Theme ---
const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: 'rgba(255,255,255,0.03)',
    borderColor: state.isFocused ? '#ffffff' : 'rgba(255,255,255,0.12)',
    boxShadow: state.isFocused ? '0 0 0 1px #ffffff' : 'none',
    color: '#ffffff',
    borderRadius: '4px',
    padding: '2px',
    fontSize: '13px',
    transition: 'all 0.15s ease',
    '&:hover': {
      borderColor: 'rgba(255,255,255,0.3)',
    }
  }),
  menu: (base: any) => ({
    ...base,
    background: '#121212',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '4px',
    zIndex: 100,
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isFocused ? 'rgba(255,255,255,0.08)' : 'transparent',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer',
    '&:active': {
      background: 'rgba(255,255,255,0.15)',
    }
  }),
  multiValue: (base: any) => ({
    ...base,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '3px',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: '#f4f4f5',
    fontSize: '12px',
    fontWeight: 500,
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: '#a1a1aa',
    '&:hover': {
      background: '#ef4444',
      color: '#ffffff',
    }
  }),
  input: (base: any) => ({
    ...base,
    color: '#ffffff',
  }),
};

// --- Presets ---
const languageOptions = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C", "C#", "Go", "Rust", "Swift", "Kotlin", "Ruby", "PHP", "SQL", "HTML/CSS"].map(l => ({ value: l, label: l }));
const frameworkOptions = ["React", "Next.js", "Vue", "Angular", "Node.js", "Express", "Django", "Flask", "Spring Boot", ".NET", "Ruby on Rails", "Tailwind CSS"].map(l => ({ value: l, label: l }));
const toolOptions = ["Git", "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Linux", "Jenkins", "GitHub Actions", "Figma", "Postman"].map(l => ({ value: l, label: l }));
const csOptions = ["Data Structures", "Algorithms", "Object-Oriented Programming", "System Design", "Databases", "Operating Systems", "Computer Networks"].map(l => ({ value: l, label: l }));

const InputField = ({ label, placeholder, value, onChange, className = "" }: any) => (
  <div className={className}>
    <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">{label}</label>
    <input className="dark-input" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

// --- Sample Resume & JD for One-Click Demo (Sister Nivedita University Placement Format) ---
const sampleResumeData = {
  personal: {
    name: "Samira Mehta",
    role: "Mechanical Engineer",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    address: "123 Anywhere St., Any City, ST 12345",
    portfolio: "www.reallygreatsite.com",
    linkedin: "linkedin.com/in/samiramehta",
    github: "github.com/samiramehta",
    summary: "A highly motivated and detail-oriented Mechanical Engineer with a strong foundation in design, manufacturing, and maintenance principles. Proficient in applying engineering concepts to solve real-world problems, with hands-on experience in tools such as AutoCAD, SolidWorks, and MATLAB. Demonstrates strong analytical, problem-solving, and teamwork skills, along with the ability to manage projects efficiently under deadlines. Seeking to contribute technical expertise and innovative thinking to a dynamic organization.",
  },
  education: {
    university: "Sister Nivedita University",
    location: "Kolkata, WB",
    degree: "Bachelor of Science in Mechanical Engineering",
    dates: "2025-2027",
    gpa: "8.5",
    awards: "Best Thesis Awardee, Recognition for Extended Research Paper",
    school12: "South City School",
    dates12: "2023-2025",
    board12: "WBCHSE",
    percentage12: "95%",
    stream12: "Science",
    school10: "South City School",
    dates10: "2019-2025",
    board10: "WBBSE",
    percentage10: "90%",
  },
  skills: {
    languages: "Python, MATLAB",
    frameworks: "AutoCAD, SolidWorks",
    tools: "ANSYS, MATLAB, Git",
    csFundamentals: "Finite Element Analysis, Thermodynamics, CAD/CAM",
  },
  experience: [
    {
      title: "Mechanical Engineer",
      company: "Science and Tech Co.",
      location: "Kolkata, WB",
      dates: "2027-2030",
      description: "Assisted in optimizing mechanical systems for manufacturing processes",
      bullets: [
        "Assisted in optimizing mechanical systems for manufacturing processes, improving production speed by 20%.",
        "Drafted and implemented quality control procedures, reducing defects and inconsistencies by 30%.",
        "Supported the creation of detailed project reports and documentation for senior stakeholders."
      ],
      feedback: "",
    }
  ],
  projects: [
    {
      name: "Automated Conveyor Optimization",
      technologies: "SolidWorks, ANSYS, Arduino",
      dates: "2026",
      description: "Designed prototype sensor-driven conveyor",
      bullets: [
        "Modeled conveyor tension mechanisms in SolidWorks, validating stress tolerances under dynamic loads in ANSYS.",
        "Integrated sensor feedback loop using Arduino microcontroller, cutting sorting latency by 25%."
      ],
      feedback: "",
    }
  ],
  certifications: [
    { name: "Project Management", issuer: "The Project Management Institute", date: "2027" },
    { name: "System Optimization", issuer: "Scrum Learning Society", date: "2028" },
    { name: "Risk Management and Mitigation", issuer: "Internal Auditors Team", date: "2028" },
    { name: "Vendor Relations", issuer: "South City College", date: "2030" }
  ],
};

const sampleJobDescription = `Mechanical Engineer / Graduate Trainee Engineer
Requirements:
- Degree in Mechanical Engineering, Manufacturing, or related field
- Solid grasp of CAD/CAM modeling (AutoCAD, SolidWorks) and simulation (ANSYS/MATLAB)
- Experience in manufacturing processes, quality control, and engineering documentation
- Strong analytical, problem-solving, and cross-functional team communication skills`;

const emptyResumeData = {
  personal: { name: "", role: "", email: "", phone: "", address: "", portfolio: "", linkedin: "", github: "", summary: "" },
  education: { university: "", location: "", degree: "", dates: "", gpa: "", awards: "", school12: "", dates12: "", board12: "", percentage12: "", stream12: "", school10: "", dates10: "", board10: "", percentage10: "" },
  skills: { languages: "", frameworks: "", tools: "", csFundamentals: "" },
  experience: [{ title: "", company: "", location: "", dates: "", description: "", bullets: [] as string[], feedback: "" }],
  projects: [{ name: "", technologies: "", dates: "", description: "", bullets: [] as string[], feedback: "" }],
  certifications: [{ name: "", issuer: "", date: "" }],
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [texCode, setTexCode] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [atsLoading, setAtsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [atsResult, setAtsResult] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const [data, setData] = useState({
    personal: { name: "", role: "", email: "", phone: "", address: "", portfolio: "", linkedin: "", github: "", summary: "" },
    education: { university: "", location: "", degree: "", dates: "", gpa: "", awards: "", school12: "", dates12: "", board12: "", percentage12: "", stream12: "", school10: "", dates10: "", board10: "", percentage10: "" },
    skills: { languages: "", frameworks: "", tools: "", csFundamentals: "" },
    experience: [{ title: "", company: "", location: "", dates: "", description: "", bullets: [] as string[], feedback: "" }],
    projects: [{ name: "", technologies: "", dates: "", description: "", bullets: [] as string[], feedback: "" }],
    certifications: [{ name: "", issuer: "", date: "" }],
  });

  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("Synced locally");

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("rb_resume_data");
      const savedTemplate = localStorage.getItem("rb_resume_template");
      const savedJD = localStorage.getItem("rb_resume_jd");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
      if (savedTemplate) {
        setSelectedTemplate(savedTemplate);
      }
      if (savedJD) {
        setJobDescription(savedJD);
      }
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  // Auto-save to localStorage whenever data or template changes
  useEffect(() => {
    if (!hasLoadedStorage) return;
    try {
      localStorage.setItem("rb_resume_data", JSON.stringify(data));
      localStorage.setItem("rb_resume_template", selectedTemplate);
      localStorage.setItem("rb_resume_jd", jobDescription);
      setSaveStatus("Saved");
      const timer = setTimeout(() => setSaveStatus("Synced locally"), 1500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [data, selectedTemplate, jobDescription, hasLoadedStorage]);

  const loadSampleProfile = () => {
    setData(sampleResumeData);
    setJobDescription(sampleJobDescription);
    setSelectedTemplate("placement");
    setAtsResult(null);
  };

  const resetForm = () => {
    if (confirm("Reset resume back to blank? All fields will be cleared.")) {
      setData(emptyResumeData);
      setJobDescription("");
      setAtsResult(null);
      setTexCode("");
      try {
        localStorage.removeItem("rb_resume_data");
        localStorage.removeItem("rb_resume_jd");
      } catch (e) {}
    }
  };

  const updatePersonal = (field: string, value: string) => setData({ ...data, personal: { ...data.personal, [field]: value } });
  const updateEducation = (field: string, value: string) => setData({ ...data, education: { ...data.education, [field]: value } });
  const updateSkills = (field: string, value: string) => setData({ ...data, skills: { ...data.skills, [field]: value } });

  const addExperience = () => setData({ ...data, experience: [...data.experience, { title: "", company: "", location: "", dates: "", description: "", bullets: [], feedback: "" }] });
  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setData({ ...data, experience: newExp });
  };
  const removeExperience = (index: number) => setData({ ...data, experience: data.experience.filter((_, i) => i !== index) });

  const addProject = () => setData({ ...data, projects: [...data.projects, { name: "", technologies: "", dates: "", description: "", bullets: [], feedback: "" }] });
  const updateProject = (index: number, field: string, value: string) => {
    const newProj = [...data.projects];
    newProj[index] = { ...newProj[index], [field]: value };
    setData({ ...data, projects: newProj });
  };
  const removeProject = (index: number) => setData({ ...data, projects: data.projects.filter((_, i) => i !== index) });

  const addCertification = () => setData({ ...data, certifications: [...data.certifications, { name: "", issuer: "", date: "" }] });
  const updateCertification = (index: number, field: string, value: string) => {
    const newCerts = [...data.certifications];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setData({ ...data, certifications: newCerts });
  };
  const removeCertification = (index: number) => setData({ ...data, certifications: data.certifications.filter((_, i) => i !== index) });

  const enhanceDescription = async (index: number, type: 'experience' | 'projects') => {
    setLoading(true);
    try {
      const item = data[type][index];
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: item.description, type }),
      });
      const result = await res.json();
      
      if (result.isVague) {
        if (type === 'experience') {
          const newExp = [...data.experience];
          newExp[index].feedback = result.feedbackQuestion;
          newExp[index].bullets = [];
          setData({ ...data, experience: newExp });
        } else {
          const newProj = [...data.projects];
          newProj[index].feedback = result.feedbackQuestion;
          newProj[index].bullets = [];
          setData({ ...data, projects: newProj });
        }
      } else if (result.bullets) {
        if (type === 'experience') {
          const newExp = [...data.experience];
          newExp[index].bullets = result.bullets;
          newExp[index].feedback = "";
          setData({ ...data, experience: newExp });
        } else {
          const newProj = [...data.projects];
          newProj[index].bullets = result.bullets;
          newProj[index].feedback = "";
          setData({ ...data, projects: newProj });
        }
      } else {
        alert(result.error || "Failed to enhance");
      }
    } catch (e) {
      console.error(e);
      alert("Error enhancing description.");
    }
    setLoading(false);
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, templateId: selectedTemplate }),
      });
      const result = await res.json();
      if (result.tex) {
        setTexCode(result.tex);
        setTimeout(() => {
          document.getElementById('latex-output')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        alert("Failed to generate LaTeX");
      }
    } catch (e) {
      console.error(e);
      alert("Error generating resume.");
    }
    setLoading(false);
  };

  const downloadTex = () => {
    const blob = new Blob([texCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    a.click();
    URL.revokeObjectURL(url);
  };

  const openInOverleaf = () => {
    if (!texCode) return;
    const form = document.createElement('form');
    form.action = 'https://www.overleaf.com/docs';
    form.method = 'POST';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'snip';
    input.value = texCode;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateAtsScore = async () => {
    setAtsLoading(true);
    try {
      const res = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, jobDescription }),
      });
      const result = await res.json();
      if (result.error) {
        alert(result.error);
      } else {
        setAtsResult(result);
      }
    } catch (e) {
      console.error(e);
      alert("Error calculating ATS score.");
    }
    setAtsLoading(false);
  };

  const parseSkills = (val: string) => val ? val.split(', ').filter(Boolean).map(s => ({ label: s, value: s })) : [];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neutral-800">
      
      {/* Top Application Bar */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center font-mono font-bold text-sm text-white">
              RB
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white text-base">ResumeBuilder</span>
              <span className="ml-2 font-mono text-[10px] text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-800 bg-neutral-900">v1.2 // LATEX WORKSTATION</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 ml-4 font-mono text-[11px] text-neutral-400 border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{saveStatus}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={loadSampleProfile}
              type="button"
              className="text-xs font-mono font-medium px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-400 bg-neutral-900 text-neutral-200 transition-colors flex items-center gap-1.5"
              title="Pre-populate with realistic Software Engineering candidate profile"
            >
              <FileText size={13} className="text-neutral-400" />
              <span className="hidden sm:inline">Load</span> Demo
            </button>
            <button 
              onClick={resetForm}
              type="button"
              className="text-xs font-mono font-medium px-2.5 py-1.5 rounded border border-neutral-800 hover:border-neutral-600 bg-neutral-950 text-neutral-400 hover:text-white transition-colors"
              title="Clear all fields"
            >
              <RotateCcw size={13} />
            </button>
            <button 
              onClick={calculateAtsScore}
              disabled={atsLoading}
              className="text-xs font-mono font-medium px-3.5 py-2 rounded border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Target size={14} />
              <span className="hidden sm:inline">{atsLoading ? "Evaluating..." : "Run ATS Check"}</span>
              <span className="sm:hidden">ATS</span>
            </button>
            <button 
              onClick={generateResume}
              disabled={loading}
              className="text-xs font-mono font-medium px-4 py-2 rounded bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <FileText size={14} />
              <span className="hidden sm:inline">{loading ? "Compiling..." : "Build LaTeX"}</span>
              <span className="sm:hidden">Build</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Column Workstation Grid */}
      <main className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: FORM EDITOR ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header intro */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <h1 className="text-xl font-semibold tracking-tight text-white mb-1">Engineering Resume Compiler</h1>
              <p className="text-xs text-neutral-400 font-mono">
                Compile ATS-compliant LaTeX resumes with automated keyword gap analysis and real-time document preview.
              </p>
            </div>

            {/* Template Selector */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="text-neutral-500">00.</span> Resume Specification & Format
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("classic")}
                  className={`text-left p-3.5 rounded border transition-all ${
                    selectedTemplate === "classic" 
                      ? "border-white bg-neutral-900/90 text-white" 
                      : "border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Template 01: Classic Tech</div>
                  <div className="text-[11px] text-neutral-500 mt-1">Jake's Resume standard • Horizontal rules • Single-column ATS</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("bold")}
                  className={`text-left p-3.5 rounded border transition-all ${
                    selectedTemplate === "bold" 
                      ? "border-white bg-neutral-900/90 text-white" 
                      : "border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Template 02: Bold Compact</div>
                  <div className="text-[11px] text-neutral-500 mt-1">Deep Mehta architecture • Tabular skill matrix • Tight margins</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("placement")}
                  className={`text-left p-3.5 rounded border transition-all ${
                    selectedTemplate === "placement" 
                      ? "border-white bg-neutral-900/90 text-white" 
                      : "border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Template 03: College Placement</div>
                  <div className="text-[11px] text-neutral-500 mt-1">Sister Nivedita University (SNU) format • Left margins • 10th/12th breakdown</div>
                </button>
              </div>
            </div>

            {/* Section 1: Personal Info */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-5 flex items-center gap-2">
                <span className="text-neutral-500">01.</span> Candidate Identification
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Full Name" placeholder="e.g. Samira Mehta" value={data.personal.name} onChange={(v: string) => updatePersonal("name", v)} />
                <InputField label="Role / Discipline Title" placeholder="e.g. Mechanical Engineer / Software Engineer" value={data.personal.role} onChange={(v: string) => updatePersonal("role", v)} />
                <InputField label="Email Address" placeholder="e.g. hello@reallygreatsite.com" value={data.personal.email} onChange={(v: string) => updatePersonal("email", v)} />
                <InputField label="Phone Number" placeholder="e.g. +91 98765 43210" value={data.personal.phone} onChange={(v: string) => updatePersonal("phone", v)} />
                <InputField label="Address / Current Location" placeholder="e.g. Kolkata, West Bengal" value={data.personal.address} onChange={(v: string) => updatePersonal("address", v)} />
                <InputField label="LinkedIn Handle / URL" placeholder="e.g. linkedin.com/in/samiramehta" value={data.personal.linkedin} onChange={(v: string) => updatePersonal("linkedin", v)} />
                <InputField label="GitHub Profile URL" placeholder="e.g. github.com/samiramehta" value={data.personal.github} onChange={(v: string) => updatePersonal("github", v)} className="sm:col-span-2" />
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Profile Summary / Career Objective</label>
                  <textarea 
                    className="dark-input h-24 resize-none text-xs leading-relaxed" 
                    placeholder="Brief career objective or profile summary highlighting technical foundations, domain tools, analytical skills, and career focus..." 
                    value={data.personal.summary} 
                    onChange={e => updatePersonal("summary", e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Education */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-5 flex items-center gap-2">
                <span className="text-neutral-500">02.</span> Academic Credentials
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-3">Undergraduate / College Degree</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Institution / University" placeholder="e.g. Sister Nivedita University" value={data.education.university} onChange={(v: string) => updateEducation("university", v)} />
                    <InputField label="Campus Location" placeholder="e.g. Kolkata, WB" value={data.education.location} onChange={(v: string) => updateEducation("location", v)} />
                    <InputField label="Degree & Major" placeholder="e.g. Bachelor of Science in Mechanical Engineering" value={data.education.degree} onChange={(v: string) => updateEducation("degree", v)} />
                    <InputField label="Enrollment Dates" placeholder="e.g. 2025-2027" value={data.education.dates} onChange={(v: string) => updateEducation("dates", v)} />
                    <InputField label="Grade Point Average (GPA / CGPA)" placeholder="e.g. 8.5" value={data.education.gpa} onChange={(v: string) => updateEducation("gpa", v)} />
                    <InputField label="Academic Honors / Research Award" placeholder="e.g. Best Thesis Awardee, Extended Research Paper" value={data.education.awards} onChange={(v: string) => updateEducation("awards", v)} />
                  </div>
                </div>

                <div className="border-t border-neutral-800/80 pt-4">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-3">Class 12 / Higher Secondary (Placement Format)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InputField label="School / College Name" placeholder="e.g. South City School" value={data.education.school12} onChange={(v: string) => updateEducation("school12", v)} />
                    <InputField label="Board" placeholder="e.g. WBCHSE / CBSE / ISC" value={data.education.board12} onChange={(v: string) => updateEducation("board12", v)} />
                    <InputField label="Percentage / Marks" placeholder="e.g. 95%" value={data.education.percentage12} onChange={(v: string) => updateEducation("percentage12", v)} />
                    <InputField label="Stream" placeholder="e.g. Science" value={data.education.stream12} onChange={(v: string) => updateEducation("stream12", v)} />
                    <InputField label="Year / Duration" placeholder="e.g. 2023-2025" value={data.education.dates12} onChange={(v: string) => updateEducation("dates12", v)} className="sm:col-span-2" />
                  </div>
                </div>

                <div className="border-t border-neutral-800/80 pt-4">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-3">Class 10 / Secondary (Placement Format)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <InputField label="School Name" placeholder="e.g. South City School" value={data.education.school10} onChange={(v: string) => updateEducation("school10", v)} className="sm:col-span-2" />
                    <InputField label="Board" placeholder="e.g. WBBSE / CBSE / ICSE" value={data.education.board10} onChange={(v: string) => updateEducation("board10", v)} />
                    <InputField label="Percentage / Marks" placeholder="e.g. 90%" value={data.education.percentage10} onChange={(v: string) => updateEducation("percentage10", v)} />
                    <InputField label="Year / Duration" placeholder="e.g. 2019-2025" value={data.education.dates10} onChange={(v: string) => updateEducation("dates10", v)} className="sm:col-span-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Skills */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-5 flex items-center gap-2">
                <span className="text-neutral-500">03.</span> Technical Competencies
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Languages</label>
                  <CreatableSelect instanceId="select-languages" isMulti options={languageOptions} styles={selectStyles} placeholder="Select or type languages (C, Python, TypeScript)..."
                    value={parseSkills(data.skills.languages)}
                    onChange={(opts) => updateSkills('languages', opts ? opts.map((o: any) => o.value).join(', ') : '')}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Frameworks & Libraries</label>
                  <CreatableSelect instanceId="select-frameworks" isMulti options={frameworkOptions} styles={selectStyles} placeholder="Select or type frameworks (React, Next.js, FastAPI)..."
                    value={parseSkills(data.skills.frameworks)}
                    onChange={(opts) => updateSkills('frameworks', opts ? opts.map((o: any) => o.value).join(', ') : '')}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Developer Tools & Infrastructure</label>
                  <CreatableSelect instanceId="select-tools" isMulti options={toolOptions} styles={selectStyles} placeholder="Select or type tools (Docker, AWS, Git, Linux)..."
                    value={parseSkills(data.skills.tools)}
                    onChange={(opts) => updateSkills('tools', opts ? opts.map((o: any) => o.value).join(', ') : '')}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Computer Science Fundamentals</label>
                  <CreatableSelect instanceId="select-cs" isMulti options={csOptions} styles={selectStyles} placeholder="Select or type fundamentals (Data Structures, OOP, OS)..."
                    value={parseSkills(data.skills.csFundamentals)}
                    onChange={(opts) => updateSkills('csFundamentals', opts ? opts.map((o: any) => o.value).join(', ') : '')}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Work Experience */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="text-neutral-500">04.</span> Professional Experience
                </h2>
                <button 
                  type="button" 
                  onClick={addExperience}
                  className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 flex items-center gap-1.5"
                >
                  <Plus size={13} /> Add Position
                </button>
              </div>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-8 border-b border-neutral-800/70 pb-8 last:border-0 last:pb-0 last:mb-0 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField label="Position Title" placeholder="e.g. Software Engineering Intern" value={exp.title} onChange={(v: string) => updateExperience(i, "title", v)} />
                    <InputField label="Company Name" placeholder="e.g. Stripe" value={exp.company} onChange={(v: string) => updateExperience(i, "company", v)} />
                    <InputField label="Location" placeholder="e.g. San Francisco, CA" value={exp.location} onChange={(v: string) => updateExperience(i, "location", v)} />
                    <InputField label="Duration" placeholder="e.g. May 2024 – Aug 2024" value={exp.dates} onChange={(v: string) => updateExperience(i, "dates", v)} />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Raw Description (Action & Impact)</label>
                    <textarea 
                      className="dark-input h-24 resize-none text-xs" 
                      placeholder="Draft what you built, technologies used, and outcomes achieved. AI will optimize this into strong ATS bullet points..." 
                      value={exp.description} 
                      onChange={e => updateExperience(i, "description", e.target.value)} 
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => enhanceDescription(i, "experience")} 
                      disabled={loading || !exp.description}
                      className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-700 hover:border-white bg-neutral-900 text-white flex items-center gap-1.5 disabled:opacity-40"
                    >
                      <Play size={12} /> {loading ? "Enhancing..." : "Format with AI"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => removeExperience(i)}
                      className="text-xs font-mono px-3 py-1.5 rounded border border-red-900/60 text-red-400 hover:bg-red-950/40 flex items-center gap-1"
                    >
                      <Trash size={12} /> Remove
                    </button>
                  </div>

                  {exp.feedback && (
                    <div className="bg-amber-950/20 border border-amber-800/40 text-amber-300 p-3.5 rounded text-xs flex gap-2.5 items-start">
                      <AlertCircle size={15} className="mt-0.5 shrink-0 text-amber-400" />
                      <p>{exp.feedback}</p>
                    </div>
                  )}

                  {exp.bullets.length > 0 && (
                    <div className="space-y-2 mt-3 bg-neutral-900/50 p-3.5 rounded border border-neutral-800">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Engineered Bullets (Editable)</div>
                      {exp.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-neutral-500 text-xs mt-1">•</span>
                          <input 
                            className="dark-input !bg-transparent !border-b-neutral-800 !border-t-0 !border-l-0 !border-r-0 !rounded-none !px-0 !py-1 text-xs" 
                            value={b} 
                            onChange={(e) => {
                              const newExp = [...data.experience];
                              newExp[i].bullets[bIdx] = e.target.value;
                              setData({ ...data, experience: newExp });
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 5: Projects */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="text-neutral-500">05.</span> Technical Projects
                </h2>
                <button 
                  type="button" 
                  onClick={addProject}
                  className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 flex items-center gap-1.5"
                >
                  <Plus size={13} /> Add Project
                </button>
              </div>

              {data.projects.map((proj, i) => (
                <div key={i} className="mb-8 border-b border-neutral-800/70 pb-8 last:border-0 last:pb-0 last:mb-0 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField label="Project Title" placeholder="e.g. Distributed Task Queue" value={proj.name} onChange={(v: string) => updateProject(i, "name", v)} />
                    <InputField label="Technologies Leveraged" placeholder="e.g. Go, Redis, Docker, gRPC" value={proj.technologies} onChange={(v: string) => updateProject(i, "technologies", v)} />
                    <InputField label="Project Timeline" placeholder="e.g. Oct 2024 – Dec 2024" value={proj.dates} onChange={(v: string) => updateProject(i, "dates", v)} className="sm:col-span-2" />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-mono font-medium text-neutral-400 tracking-wider uppercase mb-1.5">Project Scope & Technical Details</label>
                    <textarea 
                      className="dark-input h-24 resize-none text-xs" 
                      placeholder="Describe the architecture, problem solved, performance gains, or concurrent users handled..." 
                      value={proj.description} 
                      onChange={e => updateProject(i, "description", e.target.value)} 
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => enhanceDescription(i, "projects")} 
                      disabled={loading || !proj.description}
                      className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-700 hover:border-white bg-neutral-900 text-white flex items-center gap-1.5 disabled:opacity-40"
                    >
                      <Play size={12} /> {loading ? "Enhancing..." : "Format with AI"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => removeProject(i)}
                      className="text-xs font-mono px-3 py-1.5 rounded border border-red-900/60 text-red-400 hover:bg-red-950/40 flex items-center gap-1"
                    >
                      <Trash size={12} /> Remove
                    </button>
                  </div>

                  {proj.feedback && (
                    <div className="bg-amber-950/20 border border-amber-800/40 text-amber-300 p-3.5 rounded text-xs flex gap-2.5 items-start">
                      <AlertCircle size={15} className="mt-0.5 shrink-0 text-amber-400" />
                      <p>{proj.feedback}</p>
                    </div>
                  )}

                  {proj.bullets.length > 0 && (
                    <div className="space-y-2 mt-3 bg-neutral-900/50 p-3.5 rounded border border-neutral-800">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Engineered Bullets (Editable)</div>
                      {proj.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-neutral-500 text-xs mt-1">•</span>
                          <input 
                            className="dark-input !bg-transparent !border-b-neutral-800 !border-t-0 !border-l-0 !border-r-0 !rounded-none !px-0 !py-1 text-xs" 
                            value={b} 
                            onChange={(e) => {
                              const newProj = [...data.projects];
                              newProj[i].bullets[bIdx] = e.target.value;
                              setData({ ...data, projects: newProj });
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 6: Certifications */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="text-neutral-500">06.</span> Certifications & Credentials
                </h2>
                <button 
                  type="button" 
                  onClick={addCertification}
                  className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 flex items-center gap-1.5"
                >
                  <Plus size={13} /> Add Entry
                </button>
              </div>

              {data.certifications.map((cert, i) => (
                <div key={i} className="flex gap-3 items-end mb-4 border-b border-neutral-800/70 pb-4 last:border-0 last:pb-0 last:mb-0">
                  <InputField label="Certification" placeholder="e.g. AWS Certified Developer" value={cert.name} onChange={(v: string) => updateCertification(i, "name", v)} className="flex-1" />
                  <InputField label="Issuing Body" placeholder="e.g. Amazon Web Services" value={cert.issuer} onChange={(v: string) => updateCertification(i, "issuer", v)} className="flex-1" />
                  <InputField label="Date" placeholder="e.g. 2025" value={cert.date} onChange={(v: string) => updateCertification(i, "date", v)} className="w-28" />
                  <button 
                    type="button" 
                    onClick={() => removeCertification(i)}
                    className="p-2.5 rounded border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-900/60"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Section 7: Target Job Match & ATS Optimization */}
            <div className="border border-neutral-800 bg-neutral-950/40 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="text-neutral-500">07.</span> Target Job Match & ATS Parsing
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setJobDescription(sampleJobDescription)}
                    className="text-[11px] font-mono text-neutral-400 hover:text-white underline underline-offset-2"
                  >
                    Load Sample JD
                  </button>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Optional</span>
                </div>
              </div>
              <textarea
                className="dark-input h-32 resize-none text-xs font-mono leading-relaxed"
                placeholder="Paste employer job description here (requirements, tech stack, responsibilities). The ATS engine will calculate exact keyword coverage and identify missing requirements..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* Main Action Bar */}
            <div className="flex flex-wrap gap-4 py-4">
              <button
                type="button"
                onClick={generateResume}
                disabled={loading}
                className="flex-1 py-3 px-6 rounded bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FileText size={16} />
                {loading ? "Compiling LaTeX AST..." : "Generate Final Resume"}
              </button>
              <button
                type="button"
                onClick={calculateAtsScore}
                disabled={atsLoading}
                className="py-3 px-6 rounded border border-neutral-700 bg-neutral-900 text-white font-semibold text-sm hover:border-neutral-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Target size={16} />
                {atsLoading ? "Evaluating ATS..." : "Audit ATS Score"}
              </button>
            </div>

            {/* ATS Audit Report Panel */}
            {atsResult && (
              <div className="border border-neutral-700 bg-neutral-950 rounded-lg p-6 space-y-6" id="ats-scorecard">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">ATS Algorithmic Audit</h3>
                    <p className="text-xs text-neutral-400 font-mono">Simulated parsing under enterprise Applicant Tracking Systems</p>
                  </div>
                  <div className="flex items-center gap-4 font-mono">
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-500 uppercase">Overall Index</div>
                      <div className={`text-2xl font-bold ${atsResult.overallScore >= 80 ? 'text-emerald-400' : atsResult.overallScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {atsResult.overallScore}/100
                      </div>
                    </div>
                    {atsResult.matchRate !== null && atsResult.matchRate !== undefined && (
                      <div className="text-right border-l border-neutral-800 pl-4">
                        <div className="text-[10px] text-neutral-500 uppercase">JD Match</div>
                        <div className={`text-2xl font-bold ${atsResult.matchRate >= 75 ? 'text-emerald-400' : atsResult.matchRate >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {atsResult.matchRate}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {atsResult.breakdown && (
                    <>
                      <div className="border border-neutral-800/80 bg-neutral-900/40 p-3.5 rounded">
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-neutral-400">Impact & Metrics</span>
                          <span className="text-white font-bold">{atsResult.breakdown.impactAndMetrics?.score}/25</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-white h-full" style={{ width: `${(atsResult.breakdown.impactAndMetrics?.score / 25) * 100}%` }} />
                        </div>
                        <p className="text-[11px] text-neutral-400">{atsResult.breakdown.impactAndMetrics?.feedback}</p>
                      </div>

                      <div className="border border-neutral-800/80 bg-neutral-900/40 p-3.5 rounded">
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-neutral-400">Technical Depth</span>
                          <span className="text-white font-bold">{atsResult.breakdown.technicalSkills?.score}/25</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-emerald-400 h-full" style={{ width: `${(atsResult.breakdown.technicalSkills?.score / 25) * 100}%` }} />
                        </div>
                        <p className="text-[11px] text-neutral-400">{atsResult.breakdown.technicalSkills?.feedback}</p>
                      </div>

                      <div className="border border-neutral-800/80 bg-neutral-900/40 p-3.5 rounded">
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-neutral-400">Action Verbs</span>
                          <span className="text-white font-bold">{atsResult.breakdown.actionVerbs?.score}/25</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-neutral-300 h-full" style={{ width: `${(atsResult.breakdown.actionVerbs?.score / 25) * 100}%` }} />
                        </div>
                        <p className="text-[11px] text-neutral-400">{atsResult.breakdown.actionVerbs?.feedback}</p>
                      </div>

                      <div className="border border-neutral-800/80 bg-neutral-900/40 p-3.5 rounded">
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-neutral-400">Completeness</span>
                          <span className="text-white font-bold">{atsResult.breakdown.completeness?.score}/25</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-amber-400 h-full" style={{ width: `${(atsResult.breakdown.completeness?.score / 25) * 100}%` }} />
                        </div>
                        <p className="text-[11px] text-neutral-400">{atsResult.breakdown.completeness?.feedback}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Skills tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-neutral-800 bg-neutral-900/30 p-3.5 rounded">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">Matched Competencies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.matchedSkills?.map((s: string, idx: number) => (
                        <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border border-neutral-800 bg-neutral-900/30 p-3.5 rounded">
                    <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2">Missing Target Keywords</div>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.missingSkills?.map((s: string, idx: number) => (
                        <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/40 border border-rose-800/50 text-rose-300">
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="border border-neutral-800 bg-neutral-900/30 p-3.5 rounded">
                  <div className="text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Actionable Improvements</div>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    {atsResult.criticalFixes?.map((fix: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-mono">→</span>
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Compiled LaTeX View */}
            {texCode && (
              <div className="border border-neutral-800 bg-neutral-950 rounded-lg p-6 print-hide" id="latex-output">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300">Generated LaTeX Source</h3>
                    <p className="text-[11px] text-neutral-500 font-mono">LaTeX code compiled successfully. Export to Overleaf or save as PDF.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={downloadTex} className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 flex items-center gap-1">
                      <Download size={12} /> .tex
                    </button>
                    <button onClick={openInOverleaf} className="text-xs font-mono px-3.5 py-1.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors flex items-center gap-1.5" title="Open complete document directly in Overleaf without length limits">
                      <ExternalLink size={12} /> Open in Overleaf
                    </button>
                    <button onClick={handlePrint} className="text-xs font-mono px-3.5 py-1.5 rounded bg-white text-black font-medium hover:bg-neutral-200 transition-colors flex items-center gap-1.5">
                      <Download size={12} /> Print / Save PDF
                    </button>
                  </div>
                </div>
                <textarea className="dark-input h-64 font-mono text-[11px] leading-relaxed bg-black resize-none" readOnly value={texCode} />
              </div>
            )}
          </div>


          {/* ================= RIGHT COLUMN: LIVE WORKSTATION CANVAS ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            
            {/* Canvas Header Toolbar */}
            <div className="flex items-center justify-between border border-neutral-800 bg-neutral-950/80 px-4 py-3 rounded-lg print-hide">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-mono text-xs text-neutral-300 font-medium">LIVE DOCUMENT CANVAS</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="text-xs font-mono font-medium px-3 py-1 rounded bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-1"
                  title="Print or Save A4 PDF directly from canvas"
                >
                  <Download size={12} /> Print / Save PDF
                </button>
                <span className="text-[11px] font-mono text-neutral-500 uppercase">
                  {selectedTemplate === "classic" ? "Template: Classic Tech" : selectedTemplate === "bold" ? "Template: Bold Compact" : "Template: SNU Placement"}
                </span>
              </div>
            </div>

            {/* Physical A4 Paper Canvas Mirror */}
            <div className="border border-neutral-800 rounded-lg bg-neutral-900/60 p-4 shadow-2xl" id="resume-canvas-wrapper">
              <div className="bg-white text-neutral-900 rounded shadow-md p-8 min-h-[700px] max-h-[calc(100vh-210px)] overflow-y-auto font-serif text-[11px] leading-relaxed" id="resume-canvas-paper">
                
                {selectedTemplate === "placement" ? (
                  <div>
                    {/* Header: Candidate Photo | Candidate Name + Role + Contact Details | SNU Official Logo */}
                    <div className="flex items-start justify-between pb-3 mb-3 border-b border-neutral-300">
                      {/* Photo */}
                      <div className="shrink-0 mr-4 select-none">
                        <img 
                          src="/candidate_photo.jpg" 
                          alt={data.personal.name || "Candidate Photo"} 
                          className="w-20 h-24 object-cover rounded shadow-sm border border-neutral-300"
                        />
                      </div>

                      {/* Name, Role & 2-Column Contact Info */}
                      <div className="flex-1 pr-4">
                        <h2 className="text-xl font-bold tracking-tight text-neutral-900 font-sans">
                          {data.personal.name || "Candidate Name"}
                        </h2>
                        <div className="text-xs font-medium text-neutral-600 tracking-wide mt-0.5 mb-2.5 font-sans">
                          {data.personal.role || "Engineer"}
                        </div>

                        {/* 2-Column Contact Details */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9.5px] font-sans text-neutral-700">
                          <div><strong className="font-semibold text-neutral-800">Phone:</strong> {data.personal.phone || "+123-456-7890"}</div>
                          <div><strong className="font-semibold text-neutral-800">Address:</strong> {data.personal.address || "123 Anywhere St., Any City"}</div>
                          <div><strong className="font-semibold text-neutral-800">Email:</strong> {data.personal.email || "hello@reallygreatsite.com"}</div>
                          {data.personal.github && (
                            <div><strong className="font-semibold text-neutral-800">GitHub:</strong> {data.personal.github}</div>
                          )}
                        </div>
                      </div>

                      {/* Official SNU College Logo from PDF */}
                      <div className="shrink-0 text-right select-none">
                        <img 
                          src="/snu_college_logo.png" 
                          alt="Sister Nivedita University - A Satyam Roychowdhury Initiative" 
                          className="h-14 w-auto object-contain max-w-[150px]" 
                        />
                      </div>
                    </div>

                    {/* PROFILE */}
                    {data.personal.summary && (
                      <div className="grid grid-cols-12 gap-3 py-3 border-b border-neutral-200 font-sans">
                        <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-800">PROFILE</div>
                        <div className="col-span-9 text-[10px] text-neutral-700 leading-relaxed text-justify">
                          {data.personal.summary}
                        </div>
                      </div>
                    )}

                    {/* EDUCATION */}
                    <div className="grid grid-cols-12 gap-3 py-3 border-b border-neutral-200 font-sans">
                      <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-800">EDUCATION</div>
                      <div className="col-span-9 space-y-3 text-[10px] text-neutral-700">
                        {/* College */}
                        <div>
                          <div className="font-semibold text-neutral-900">
                            {data.education.university || "Sister Nivedita University"} {data.education.dates && <span className="font-normal text-neutral-500">| {data.education.dates}</span>}
                          </div>
                          <div className="text-neutral-600">{data.education.degree || "Bachelor of Science in Mechanical Engineering"}</div>
                          <ul className="list-disc list-inside mt-1 space-y-0.5 text-neutral-600">
                            {data.education.gpa && <li>CGPA / Score: {data.education.gpa}</li>}
                            {data.education.awards && <li>{data.education.awards}</li>}
                          </ul>
                        </div>

                        {/* 12th */}
                        {data.education.school12 && (
                          <div>
                            <div className="font-semibold text-neutral-900">
                              {data.education.school12} {data.education.dates12 && <span className="font-normal text-neutral-500">| {data.education.dates12}</span>}
                            </div>
                            <div className="text-neutral-600">Higher Secondary (12th)</div>
                            <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-neutral-600">
                              {data.education.board12 && <li>Board: {data.education.board12}</li>}
                              {data.education.percentage12 && <li>Percentage: {data.education.percentage12}</li>}
                              {data.education.stream12 && <li>Stream: {data.education.stream12}</li>}
                            </ul>
                          </div>
                        )}

                        {/* 10th */}
                        {data.education.school10 && (
                          <div>
                            <div className="font-semibold text-neutral-900">
                              {data.education.school10} {data.education.dates10 && <span className="font-normal text-neutral-500">| {data.education.dates10}</span>}
                            </div>
                            <div className="text-neutral-600">Secondary (10th)</div>
                            <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-neutral-600">
                              {data.education.board10 && <li>Board: {data.education.board10}</li>}
                              {data.education.percentage10 && <li>Percentage: {data.education.percentage10}</li>}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PROFESSIONAL EXPERIENCE / PROJECTS */}
                    <div className="grid grid-cols-12 gap-3 py-3 border-b border-neutral-200 font-sans">
                      <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-800 leading-tight">
                        PROFESSIONAL EXPERIENCE / PROJECTS
                      </div>
                      <div className="col-span-9 space-y-3 text-[10px] text-neutral-700">
                        {data.experience.map((exp, idx) => (
                          <div key={idx}>
                            <div className="font-semibold text-neutral-900">
                              {exp.title || "Mechanical Engineer"} {exp.dates && <span className="font-normal text-neutral-500">| {exp.dates}</span>}
                            </div>
                            <div className="italic text-neutral-600">
                              {exp.company || "Company Name"} {exp.location && <span>— {exp.location}</span>}
                            </div>
                            {exp.bullets.length > 0 ? (
                              <ul className="list-disc list-inside mt-1 space-y-0.5 text-neutral-600">
                                {exp.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            ) : exp.description ? (
                              <p className="mt-1 text-neutral-600">{exp.description}</p>
                            ) : null}
                          </div>
                        ))}

                        {data.projects.map((proj, idx) => (
                          <div key={idx}>
                            <div className="font-semibold text-neutral-900">
                              {proj.name || "Project Title"} {proj.dates && <span className="font-normal text-neutral-500">| {proj.dates}</span>}
                            </div>
                            <div className="italic text-neutral-600">{proj.technologies}</div>
                            {proj.bullets.length > 0 ? (
                              <ul className="list-disc list-inside mt-1 space-y-0.5 text-neutral-600">
                                {proj.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            ) : proj.description ? (
                              <p className="mt-1 text-neutral-600">{proj.description}</p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CERTIFICATES / ACHIEVEMENTS */}
                    {data.certifications.length > 0 && data.certifications.some(c => c.name) && (
                      <div className="grid grid-cols-12 gap-3 py-3 border-b border-neutral-200 font-sans">
                        <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-800 leading-tight">
                          CERTIFICATES / ACHIEVEMENTS
                        </div>
                        <div className="col-span-9 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-neutral-700">
                          {data.certifications.map((cert, idx) => (
                            <div key={idx}>
                              <div className="font-semibold text-neutral-900">
                                {cert.name} {cert.date && <span className="font-normal text-neutral-500">| {cert.date}</span>}
                              </div>
                              <div className="italic text-[9.5px] text-neutral-500">{cert.issuer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SKILLS */}
                    <div className="grid grid-cols-12 gap-3 py-3 font-sans">
                      <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-800">SKILLS</div>
                      <div className="col-span-9 grid grid-cols-2 gap-4 text-[10px] text-neutral-700">
                        <ul className="list-disc list-inside space-y-1">
                          {data.skills.languages && <li><strong className="font-medium text-neutral-800">Languages:</strong> {data.skills.languages}</li>}
                          {data.skills.frameworks && <li><strong className="font-medium text-neutral-800">Frameworks:</strong> {data.skills.frameworks}</li>}
                          {data.skills.tools && <li><strong className="font-medium text-neutral-800">Tools:</strong> {data.skills.tools}</li>}
                        </ul>
                        <ul className="list-disc list-inside space-y-1">
                          {data.skills.csFundamentals && <li><strong className="font-medium text-neutral-800">Core Concepts:</strong> {data.skills.csFundamentals}</li>}
                          <li>Problem-solving & analytical thinking</li>
                          <li>Teamwork & technical communication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Header */}
                    <div className="text-center border-b border-neutral-300 pb-3 mb-4">
                      <h2 className="text-xl font-bold tracking-tight text-neutral-950 mb-1">
                        {data.personal.name || "[Candidate Full Name]"}
                      </h2>
                      <div className="text-[10px] text-neutral-600 space-x-1.5 font-sans">
                        <span>{data.personal.phone || "(555) 000-0000"}</span>
                        <span>•</span>
                        <span className="underline">{data.personal.email || "candidate@email.com"}</span>
                        {data.personal.linkedin && (
                          <>
                            <span>•</span>
                            <span className="underline">LinkedIn</span>
                          </>
                        )}
                        {data.personal.github && (
                          <>
                            <span>•</span>
                            <span className="underline">GitHub</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                      <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 mb-2">
                        Education
                      </div>
                      <div className="flex justify-between items-baseline font-sans text-[10.5px]">
                        <span className="font-bold">{data.education.university || "[University Name]"}</span>
                        <span className="text-neutral-600">{data.education.location || "City, State"}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-[10.5px] italic text-neutral-700">
                        <span>{data.education.degree || "[Degree Title]"} {data.education.gpa && <span className="font-sans not-italic">| GPA: {data.education.gpa}</span>}</span>
                        <span className="not-italic font-sans text-neutral-600">{data.education.dates || "Dates"}</span>
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div className="mb-4">
                      <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 mb-2">
                        Technical Skills
                      </div>
                      <div className="font-sans text-[10px] space-y-1">
                        <div><span className="font-semibold">Languages:</span> {data.skills.languages || "Python, Java, TypeScript, C++"}</div>
                        <div><span className="font-semibold">Frameworks:</span> {data.skills.frameworks || "React, Next.js, Node.js, Spring Boot"}</div>
                        <div><span className="font-semibold">Tools:</span> {data.skills.tools || "Git, Docker, AWS, Linux"}</div>
                        {data.skills.csFundamentals && (
                          <div><span className="font-semibold">Fundamentals:</span> {data.skills.csFundamentals}</div>
                        )}
                      </div>
                    </div>

                    {/* Experience */}
                    {data.experience.length > 0 && data.experience.some(e => e.title || e.company) && (
                      <div className="mb-4">
                        <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 mb-2">
                          Experience
                        </div>
                        {data.experience.map((exp, idx) => (
                          <div key={idx} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-baseline font-sans text-[10.5px]">
                              <span className="font-bold">{exp.title || "Software Engineering Role"}</span>
                              <span className="text-neutral-600">{exp.dates || "Dates"}</span>
                            </div>
                            <div className="flex justify-between items-baseline text-[10.5px] italic text-neutral-700 mb-1">
                              <span>{exp.company || "Company Name"}</span>
                              <span className="not-italic font-sans text-neutral-600">{exp.location || "Location"}</span>
                            </div>
                            {exp.bullets.length > 0 ? (
                              <ul className="list-disc list-inside text-[10px] text-neutral-800 space-y-0.5">
                                {exp.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[10px] text-neutral-500 italic">
                                {exp.description ? "Click 'Format with AI' to generate bullet points." : "[Role description & quantified achievements...]"}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Projects */}
                    {data.projects.length > 0 && data.projects.some(p => p.name) && (
                      <div className="mb-4">
                        <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 mb-2">
                          Projects
                        </div>
                        {data.projects.map((proj, idx) => (
                          <div key={idx} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-baseline font-sans text-[10.5px]">
                              <span className="font-bold">{proj.name || "Project Name"}</span>
                              <span className="text-neutral-600">{proj.dates || "Timeline"}</span>
                            </div>
                            <div className="text-[10px] italic text-neutral-700 mb-1">
                              {proj.technologies || "Tech Stack"}
                            </div>
                            {proj.bullets.length > 0 ? (
                              <ul className="list-disc list-inside text-[10px] text-neutral-800 space-y-0.5">
                                {proj.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[10px] text-neutral-500 italic">
                                {proj.description ? "Click 'Format with AI' to generate bullet points." : "[Project achievements & system architecture...]"}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Certifications */}
                    {data.certifications.length > 0 && data.certifications.some(c => c.name) && (
                      <div>
                        <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 mb-2">
                          Certifications
                        </div>
                        {data.certifications.map((cert, idx) => (
                          <div key={idx} className="flex justify-between items-baseline text-[10px] font-sans">
                            <span><strong className="font-semibold">{cert.name}</strong> – {cert.issuer}</span>
                            <span className="text-neutral-600">{cert.date}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Helper Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 px-2 print-hide">
              <span>Auto-synced with editor</span>
              <span>8.5" × 11" US Letter Ratio</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer with Legal Policies */}
      <footer className="border-t border-neutral-800 bg-neutral-950 mt-20 py-8 text-xs text-neutral-500 font-mono">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-medium">ResumeBuilder</span>
            <span>•</span>
            <span>Client-First LaTeX Compiler Workstation</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              type="button" 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              type="button" 
              onClick={() => setActiveModal('terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-neutral-600">MIT Open Source</span>
          </div>
        </div>
      </footer>

      {/* Privacy Policy & Terms Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-neutral-800 bg-neutral-950 rounded-lg max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="text-base font-semibold text-white">
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
              </h3>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {activeModal === 'privacy' ? (
              <div className="text-xs text-neutral-300 space-y-3 leading-relaxed font-sans">
                <p><strong>Effective Date:</strong> 2026</p>
                <p>ResumeBuilder operates strictly on a client-first, privacy-respecting architecture:</p>
                
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">1. Local Storage Only</h4>
                <p>All resume fields, candidate identification, and credentials you input are stored strictly inside your browser's local storage (localStorage). We do not operate remote user databases, tracking cookies, or commercial telemetry.</p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">2. AI Inference Processing</h4>
                <p>When you explicitly trigger "Format with AI" or "Run ATS Check", your submitted resume text is transmitted securely over encrypted HTTPS directly to the Google Gemini API for stateless inference. Neither ResumeBuilder nor third-party data brokers store, log, or sell this content.</p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">3. Data Deletion</h4>
                <p>You can permanently delete all cached information at any moment by clicking the Reset button in the top navigation bar or clearing your browser's local storage.</p>
              </div>
            ) : (
              <div className="text-xs text-neutral-300 space-y-3 leading-relaxed font-sans">
                <p><strong>Effective Date:</strong> 2026</p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">1. Acceptance & Permitted Use</h4>
                <p>By using ResumeBuilder, you agree to these terms. The platform is provided as an open developer workstation for drafting, compiling, and formatting professional resumes.</p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">2. Ownership of Artifacts</h4>
                <p>You retain full intellectual property ownership of all resume content, generated LaTeX source code, and compiled documents created using this service.</p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">3. Disclaimer of ATS Outcomes</h4>
                <p>The ATS Audit Report provides algorithmic keyword matching estimates based on standard software engineering heuristics. ResumeBuilder does not guarantee interview callbacks, employment offers, or compatibility with specific proprietary recruiting software.</p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">4. Software License</h4>
                <p>The software is provided "as is", without warranty of any kind, express or implied, under the standard MIT Open Source License.</p>
              </div>
            )}

            <div className="pt-3 border-t border-neutral-800 text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
