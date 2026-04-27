"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from "three";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Users, 
  Target, 
  Globe, 
  Zap,
  ArrowRight, 
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Cpu,
  LineChart,
  Settings,
  Mail,
  MapPin,
  Quote,
  Star,
  ExternalLink,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

// --- Global Three.js Setup Logic: Theme-Aware Background ---
const ThreeBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Create abstract floating Torus Knots
      const knotGeom = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color: isDarkMode ? 0x3b82f6 : 0x2563eb, 
        wireframe: true,
        transparent: true,
        opacity: isDarkMode ? 0.15 : 0.08
      });

      const shapes: THREE.Mesh[] = [];
      for (let i = 0; i < 8; i++) {
        const mesh = new THREE.Mesh(knotGeom, material);
        mesh.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const scale = Math.random() * 0.8 + 0.2;
        mesh.scale.set(scale, scale, scale);
        scene.add(mesh);
        shapes.push(mesh);
      }

      // Particle system
      const particlesGeom = new THREE.BufferGeometry();
      const count = 1500;
      const posArray = new Float32Array(count * 3);
      for(let i=0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40;
      }
      particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: isDarkMode ? 0x6366f1 : 0x3b82f6,
        transparent: true,
        opacity: isDarkMode ? 0.6 : 0.3
      });
      const particlesMesh = new THREE.Points(particlesGeom, particlesMaterial);
      scene.add(particlesMesh);

      // Lights
      const light = new THREE.PointLight(0xffffff, 1.5);
      light.position.set(10, 10, 10);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));

      camera.position.z = 8;

      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      const animate = () => {
        requestAnimationFrame(animate);
        shapes.forEach((shape, i) => {
          shape.rotation.x += 0.002;
          shape.rotation.y += 0.003;
          shape.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.005;
        });
        
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      };
    };
  }, [isDarkMode]);

  return <div ref={mountRef} className={`fixed inset-0 -z-10 pointer-events-none transition-colors duration-1000 ${isDarkMode ? 'bg-[#020617]' : 'bg-slate-50'}`} />;
};

// --- Updated UI Assets & Data ---
const stats = [
  { label: "Professionals trained for exceptional career success", value: "10K+", icon: <Users className="w-5 h-5" /> },
  { label: "Sessions delivered with unmatched learning excellence", value: "200+", icon: <Zap className="w-5 h-5" /> },
  { label: "Active learners engaged in dynamic courses", value: "5K+", icon: <Target className="w-5 h-5" /> }
];

const domainExpertise = [
  { title: "Product & Innovation Hub", icon: <Target className="w-6 h-6" /> },
  { title: "Gen-AI Mastery", icon: <Cpu className="w-6 h-6" /> },
  { title: "Leadership Elevation", icon: <Users className="w-6 h-6" /> },
  { title: "Tech & Data Insights", icon: <LineChart className="w-6 h-6" /> },
  { title: "Operations Excellence", icon: <Settings className="w-6 h-6" /> },
  { title: "Digital Enterprise", icon: <Globe className="w-6 h-6" /> },
  { title: "Fintech Innovation Lab", icon: <Zap className="w-6 h-6" /> }
];

const segments = [
  { type: "Program Specific", c: "Certificate, Executive, PG", color: "from-blue-500/20 to-blue-600/20" },
  { type: "Industry Specific", c: "Healthcare, Finance, IT", color: "from-indigo-500/20 to-indigo-600/20" },
  { type: "Topic Specific", c: "AI, Cyber, Cloud, Analytics", color: "from-purple-500/20 to-purple-600/20" },
  { type: "Level Specific", c: "Executive, Mid, Freshers", color: "from-emerald-500/20 to-emerald-600/20" }
];

// --- Specialized Components ---

const BentoCard = ({ children, className = "", gradient = "", isDarkMode, forceGradient = false }) => (
  <div className={`group relative overflow-hidden rounded-[2.5rem] transition-all duration-700 shadow-2xl ${className} 
    ${isDarkMode 
      ? 'bg-white/[0.03] backdrop-blur-xl border-white/10' 
      : (forceGradient ? 'border-transparent' : 'bg-white/80 backdrop-blur-md border-slate-200')
    } border hover:border-blue-500/50`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${forceGradient ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-700`}></div>
    <div className="relative z-10">{children}</div>
  </div>
);

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ["Home", "Stats", "Clients", "Edge", "CAT", "Process", "FAQs"];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 px-6 lg:px-12 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-3 rounded-full border transition-all duration-500 
        ${scrolled 
          ? (isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/70 border-slate-200 shadow-lg') 
          : 'bg-transparent border-transparent'} backdrop-blur-2xl`}>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000">
            <Zap size={22} fill="white" />
          </div>
          <span className={`text-xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ACCREDIAN <span className="text-blue-500 italic">ENT.</span>
          </span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`${isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-blue-600'} font-bold text-xs uppercase tracking-widest transition-all`}>
              {link}
            </a>
          ))}
          
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl 
              ${isDarkMode ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              Enquire Now
            </button>
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white/5 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={isDarkMode ? 'text-white' : 'text-slate-900'}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-x-0 top-0 transition-transform duration-500 h-screen z-[-1] flex flex-col items-center justify-center space-y-8 backdrop-blur-3xl 
        ${isOpen ? 'translate-y-0' : '-translate-y-full'} 
        ${isDarkMode ? 'bg-black/95' : 'bg-white/95'}`}>
         {links.map(l => (
           <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setIsOpen(false)} className={`text-3xl font-black transition-colors ${isDarkMode ? 'text-white hover:text-blue-500' : 'text-slate-900 hover:text-blue-600'}`}>
            {l}
           </a>
         ))}
      </div>
    </nav>
  );
};

const Hero = ({ isDarkMode }) => (
  <section id="home" className="relative min-h-screen flex items-center pt-32 lg:pt-20">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
      <div className="space-y-10">
        <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] 
          ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
          <Sparkles size={14} className="animate-pulse" />
          The Future of Learning
        </div>
        <h1 className={`text-6xl lg:text-9xl font-black leading-[0.85] tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
          Master the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">Enterprise</span> <br />
          Edge.
        </h1>
        <p className={`text-xl max-w-xl leading-relaxed font-bold ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
          Cultivate high-performance teams through elite expert learning. Bespoke frameworks for global scale and local impact.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 pt-6">
          <button className="group bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
            Enquire Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <button className={`px-12 py-6 rounded-[2rem] font-black text-xl transition-all border backdrop-blur-xl
            ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
            Watch Story
          </button>
        </div>

        <div className="flex items-center gap-10 pt-10">
           <div className="flex -space-x-4">
             {[1,2,3,4].map(i => (
               <img key={i} src={`https://i.pravatar.cc/100?u=${i*10}`} className={`w-14 h-14 rounded-full border-4 ${isDarkMode ? 'border-slate-950' : 'border-white'}`} alt="" />
             ))}
           </div>
           <div className={`text-xs font-black uppercase tracking-widest leading-loose ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
             Joined by <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>500+</span> <br /> Fortune Global Companies
           </div>
        </div>
      </div>

      <div className="relative group perspective-1000 hidden lg:block">
        <div className={`absolute inset-0 blur-[150px] animate-pulse ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200/50'}`}></div>
        <BentoCard isDarkMode={isDarkMode} className="p-4 rotate-x-12 -rotate-y-12 translate-z-20 group-hover:rotate-0 group-hover:translate-z-0 transition-all duration-1000 shadow-[0_100px_100px_rgba(0,0,0,0.5)]">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
            alt="Enterprise" 
            className={`rounded-[2rem] w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${isDarkMode ? 'opacity-80' : ''}`}
          />
          <div className="absolute top-10 right-10 bg-blue-600 p-8 rounded-[2rem] text-white animate-float shadow-2xl">
             <Star size={40} className="mb-4 text-yellow-400" />
             <p className="text-4xl font-black">4.9/5</p>
             <p className="text-xs font-bold uppercase opacity-60">Global Satisfaction</p>
          </div>
        </BentoCard>
      </div>
    </div>
  </section>
);

const StatsSection = ({ isDarkMode }) => (
  <section id="stats" className="py-40 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-3 gap-10">
        {stats.map((stat, i) => (
          <BentoCard key={i} isDarkMode={isDarkMode} className="p-16 text-center group" gradient="from-blue-600/10 to-indigo-600/10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform
              ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              {stat.icon}
            </div>
            <h3 className={`text-7xl font-black mb-6 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
            <p className={`font-bold leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>{stat.label}</p>
          </BentoCard>
        ))}
      </div>
    </div>
  </section>
);

const EdgeSection = ({ isDarkMode }) => (
  <section id="edge" className={`py-40 rounded-[4rem] mx-4 lg:mx-12 border overflow-hidden transition-colors duration-700
    ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-32">
        <h2 className={`text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The Accredian Edge.</h2>
        <p className={`text-xl font-bold leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Specialized programs meticulously engineered to fuel the next wave of corporate innovation.</p>
      </div>

      <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-6 mb-32">
        {domainExpertise.map((domain, i) => (
          <div key={i} className="flex flex-col items-center group cursor-pointer">
            <div className={`w-full aspect-square rounded-[2rem] border flex flex-col items-center justify-center p-4 group-hover:bg-blue-600 transition-all duration-500
              ${isDarkMode ? 'bg-white/[0.03] border-white/5 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="mb-4 group-hover:text-white group-hover:scale-125 transition-transform">{domain.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight group-hover:text-white">
                {domain.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {segments.map((s, i) => (
          <BentoCard key={i} isDarkMode={isDarkMode} className="p-10" gradient={s.color}>
             <h4 className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] mb-4">{s.type}</h4>
             <p className={`text-2xl font-black mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.c}</p>
             <button className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-colors 
               ${isDarkMode ? 'text-white/40 group-hover:text-white' : 'text-slate-400 group-hover:text-blue-600'}`}>
               Explore Path <ChevronRight size={18} />
             </button>
          </BentoCard>
        ))}
      </div>
    </div>
  </section>
);

const CATSection = ({ isDarkMode }) => (
  <section id="cat" className="py-40">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 space-y-8">
           <h2 className={`text-6xl font-black leading-none tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>The CAT <br/> Framework.</h2>
           <p className={`font-bold text-lg leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Our proprietary strategy for operational excellence through three distinct phases of evolutionary growth.</p>
           <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg">Download Brochure</button>
        </div>
        <div className="lg:w-1/2 grid grid-cols-1 gap-6 w-full">
           {['Competency', 'Application', 'Transformation'].map((step, i) => (
             <BentoCard key={step} isDarkMode={isDarkMode} className="p-10 flex items-center gap-8 group" gradient="from-blue-600/10 to-indigo-600/10">
                <div className={`text-7xl font-black transition-colors ${isDarkMode ? 'text-blue-500/20 group-hover:text-blue-500' : 'text-slate-200 group-hover:text-blue-600'}`}>0{i+1}</div>
                <div>
                   <h4 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{step}</h4>
                   <p className={`font-bold text-sm ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Phase {i+1} focusing on foundational {step.toLowerCase()} development.</p>
                </div>
             </BentoCard>
           ))}
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = ({ isDarkMode }) => (
  <section id="process" className={`py-40 rounded-[4rem] mx-4 lg:mx-12 relative overflow-hidden transition-colors duration-700
    ${isDarkMode ? 'bg-black/40 border border-white/5' : 'bg-slate-100 border border-slate-200 shadow-sm'}`}>
     <div className="absolute -left-32 top-0 w-96 h-96 bg-blue-600/10 blur-[150px]"></div>
     <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className={`text-6xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>How We Deliver Results.</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-16 relative">
          <div className={`hidden lg:block absolute top-24 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-transparent
            ${isDarkMode ? 'via-white/5' : 'via-slate-300'}`}></div>
          {[
            { n: "01", t: "Skill Gap Analysis", d: "Deep intelligence gathering on your team's current technical posture." },
            { n: "02", t: "Custom Training", d: "Bespoke curricula built to solve your unique business bottlenecks." },
            { n: "03", t: "Agile Delivery", d: "Live mentor-led sessions with immediate ROI tracking mechanisms." }
          ].map((item, i) => (
            <div key={i} className="relative z-10 space-y-10 group cursor-pointer">
              <div className={`w-20 h-20 border rounded-[2rem] flex items-center justify-center text-3xl font-black transition-all duration-700 mx-auto lg:mx-0
                ${isDarkMode 
                  ? 'bg-white/5 border-white/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white' 
                  : 'bg-white border-slate-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent shadow-sm'}`}>
                {item.n}
              </div>
              <div className="space-y-4 text-center lg:text-left">
                <h4 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.t}</h4>
                <p className={`font-bold leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
     </div>
  </section>
);

const FAQSection = ({ isDarkMode }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const faqs = [
    { category: "Curriculum", q: "What domains do you cover?", a: "We provide end-to-end expertise in Gen-AI, Product Management, Fintech, and Digital Operations Hubs." },
    { category: "Delivery", q: "Is the training online or offline?", a: "We offer flexible program delivery including live virtual classrooms led by industry practitioners and blended learning formats." },
    { category: "Certification", q: "Are the certifications industry-recognized?", a: "Yes, Accredian certifications are recognized by Fortune 500 companies and leading tech enterprises globally." }
  ];

  return (
    <section id="faqs" className="py-40">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className={`text-5xl lg:text-7xl font-black text-center mb-24 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>FAQs.</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-[2rem] border overflow-hidden transition-all duration-500 hover:border-blue-500/30 
              ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
              <button 
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className={`w-full px-10 py-8 flex items-center justify-between text-left font-bold transition-all ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                <span className="text-xl">
                  <span className="text-blue-500 text-[10px] uppercase tracking-[0.3em] block mb-2">{faq.category}</span>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 
                  ${activeIdx === i ? 'bg-blue-600 rotate-180 border-transparent text-white' : (isDarkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-500')}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${activeIdx === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className={`px-10 pb-10 font-bold text-lg leading-relaxed border-t pt-6 ${isDarkMode ? 'text-white/40 border-white/5' : 'text-slate-500 border-slate-50'}`}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ isDarkMode }) => (
  <section id="clients" className="py-40">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-32">
        <h2 className={`text-5xl font-black tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Clients Speak.</h2>
        <div className="flex justify-center gap-1 text-blue-500">
           {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-10">
        {[
          { q: "Accredian turned our vision into reality with unparalleled dedication. Our teams are now 3x more productive in Gen-AI ops.", n: "David Chen", t: "CTO, Fintech Solutions" },
          { q: "The CAT framework is a game changer. We scaled our product managers across 5 countries with consistent learning quality.", n: "Sarah Miller", t: "VP Talent, Tech Global" }
        ].map((t, i) => (
          <BentoCard key={i} isDarkMode={isDarkMode} className="p-16 relative" gradient="from-indigo-600/10 to-blue-600/10">
            <Quote className="text-blue-500/20 w-32 h-32 absolute -top-10 -right-10" />
            <p className={`text-3xl font-bold italic leading-[1.4] mb-12 relative z-10 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>"{t.q}"</p>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl">
                 {t.n[0]}
               </div>
               <div>
                 <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.n}</p>
                 <p className="text-blue-500 font-black uppercase text-[10px] tracking-widest">{t.t}</p>
               </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ isDarkMode }) => (
  <footer className={`pt-40 pb-20 relative border-t transition-colors duration-700
    ${isDarkMode ? 'bg-slate-950 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-4 gap-20 mb-32">
        <div className="lg:col-span-1 space-y-10">
          <div className="flex items-center gap-3">
             <Zap size={32} className="text-blue-500" fill="currentColor" />
             <span className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ACCREDIAN</span>
          </div>
          <p className={`font-bold text-sm leading-relaxed ${isDarkMode ? 'text-white/30' : 'text-slate-500'}`}>
            Revolutionizing enterprise education through 3D immersive learning and elite industry mentorship. Gurugram, India.
          </p>
          <div className="flex gap-4">
             <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:bg-blue-600 hover:text-white
               ${isDarkMode ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-400'}`}><Globe size={20} /></div>
             <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:bg-blue-600 hover:text-white
               ${isDarkMode ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-400'}`}><ExternalLink size={20} /></div>
          </div>
        </div>

        <div>
          <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-10">Quick Links</h4>
          <ul className={`space-y-6 text-sm font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Our Vision</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Research Blog</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Career Hub</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-10">Expertise</h4>
          <ul className={`space-y-6 text-sm font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Product Hub</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Gen-AI Labs</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Fintech Mastery</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Digital Ops</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-10">Connect</h4>
          <div className={`space-y-6 font-bold text-sm ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
             <div className="flex items-center gap-4 group">
               <Mail size={18} className="text-blue-500" />
               <span className="group-hover:text-blue-600 transition-colors">enterprise@accredian.com</span>
             </div>
             <div className="flex items-start gap-4">
               <MapPin size={18} className="text-blue-500 shrink-0 mt-1" />
               <span className="leading-relaxed text-wrap">Sector 18, Udyog Vihar <br/> Gurugram, Haryana</span>
             </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col md:flex-row justify-between items-center border-t pt-12 gap-8 ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>© 2026 Accredian Enterprise. A FullStack Education Brand.</p>
        <div className={`flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>
           <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
           <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
           <a href="#" className="hover:text-blue-600 transition-colors">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-600 selection:text-white antialiased transition-colors duration-1000 ${isDarkMode ? 'dark' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');
        
        body {
          font-family: 'Plus+Jakarta+Sans', sans-serif;
          margin: 0;
          overflow-x: hidden;
        }

        .perspective-1000 { perspective: 1000px; }
        .rotate-x-12 { transform: rotateX(12deg); }
        .rotate-y-12 { transform: rotateY(-12deg); }
        .translate-z-20 { transform: translateZ(20px); }
        .translate-z-0 { transform: translateZ(0); }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }

        .light ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .light ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
        }
      `}</style>
      
      <ThreeBackground isDarkMode={isDarkMode} />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="relative">
        <Hero isDarkMode={isDarkMode} />
        <StatsSection isDarkMode={isDarkMode} />
        <EdgeSection isDarkMode={isDarkMode} />
        <CATSection isDarkMode={isDarkMode} />
        <ProcessSection isDarkMode={isDarkMode} />
        <Testimonials isDarkMode={isDarkMode} />
        <FAQSection isDarkMode={isDarkMode} />
        
        <section className="py-40 px-6">
          <div className="max-w-6xl mx-auto">
             <BentoCard 
              isDarkMode={isDarkMode} 
              forceGradient={true}
              className="p-20 lg:p-40 text-center" 
              gradient="from-blue-600 to-indigo-600"
             >
               <h2 className="text-5xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-12">
                 Ignite Your <br /> Future.
               </h2>
               <div className="flex flex-wrap justify-center gap-6">
                 <button className={`px-14 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl 
                   ${isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>Start Training</button>
                 <button className="bg-white/10 border border-white/20 text-white px-14 py-6 rounded-full font-black text-xl hover:bg-white/20 transition-all">Talk to Expert</button>
               </div>
             </BentoCard>
          </div>
        </section>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}