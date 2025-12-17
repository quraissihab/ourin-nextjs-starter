'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Github,
  Zap,
  Palette,
  Code2,
  Layers,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Terminal,
  Cpu,
  MoveUpRight,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- Components ---

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-pulse-glow delay-1000" />
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.08]" />
    </div>
  );
}

function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
    >
      <div className="glass-card px-4 md:px-6 py-3 flex items-center justify-between rounded-full border border-white/10 shadow-lg backdrop-blur-md bg-background/80 dark:bg-background/60">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ourin Logo"
            width={32}
            height={32}
            className="rounded-full shadow-glow-primary"
          />
          <span className="font-display font-bold text-lg tracking-tight">Ourin</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80 font-sans">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#components" className="hover:text-primary transition-colors">Components</a>
          <a href="#docs" className="hover:text-primary transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="sm" className="rounded-full px-5 hidden sm:flex font-semibold font-jakarta">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  className, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={`group relative p-6 md:p-8 glass-card overflow-hidden border-border/50 hover:border-primary/20 transition-colors bg-card/50 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/10 shadow-sm">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-display font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-sans">
          {description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <MoveUpRight className="w-5 h-5 text-primary" />
      </div>
    </motion.div>
  );
}

function CodeTypewriter({ code }: { code: string }) {
  const [displayedCode, setDisplayedCode] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(code.slice(0, i));
      i++;
      if (i > code.length) clearInterval(interval);
    }, 20); 
    return () => clearInterval(interval);
  }, [code]);

  return (
    <div className="font-mono text-sm leading-relaxed text-blue-400 dark:text-blue-300">
      {displayedCode}
      <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
    </div>
  );
}

function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const displayCommand = "npx create-next-app -e .../ourin-nextjs-starter";
  const fullCommand = "npx create-next-app -e https://github.com/LuckyArch/ourin-nextjs-starter";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      className="relative flex items-center justify-between w-full max-w-xl mx-auto bg-[#1e1e1e] dark:bg-[#121212] rounded-full p-1.5 shadow-2xl ring-1 ring-white/10"
    >
      <div className="flex items-center gap-3 pl-4 overflow-hidden">
        <span className="text-gray-500 shrink-0 font-mono">{`>_`}</span>
        <code className="text-xs sm:text-sm text-gray-300 font-mono truncate">
          {displayCommand}
        </code>
      </div>
      
      <button
        onClick={handleCopy}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </motion.div>
  );
}

// --- Main Page Component ---

export default function Home() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <FloatingNav />
      
      {/* --- Hero Section --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        <HeroBackground />
        
        <div className="container max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs md:text-sm font-semibold mb-6 md:mb-8 hover:bg-primary/10 transition-colors cursor-default"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="font-inter tracking-wide uppercase text-[10px] md:text-xs">v1.0 is now available</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 md:mb-8 leading-[1.15] md:leading-[1.1]"
          >
            Ship your startup <br />
            <span className="text-gradient-rainbow drop-shadow-sm pb-2 font-serif italic pr-2">
              in record time.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-medium"
          >
            The ultimate Next.js boilerplate. Packed with 
            <span className="text-foreground font-bold font-display"> 145+ utilities</span>, 
            <span className="text-foreground font-bold font-display"> custom hooks</span>, and 
            <span className="text-foreground font-bold font-display"> premium UI components</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-bold shadow-glow-primary hover:scale-105 transition-transform font-jakarta">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full text-base backdrop-blur-sm bg-background/50 border-foreground/10 hover:bg-muted/50 font-medium font-jakarta">
              <Github className="mr-2 w-4 h-4" />
              Star on GitHub
            </Button>
          </motion.div>

          {/* Code Preview/Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md px-4"
          >
            <CopyCommand />
          </motion.div>
        </div>
      </section>

      {/* --- Bento Grid Features --- */}
      <section id="features" className="py-20 md:py-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">Everything you need</h2>
            <p className="text-muted-foreground text-lg text-balance font-serif italic">
              "Painstakingly crafted components and utilities to help you build better apps faster."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Large Card 1 */}
            <FeatureCard 
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-card to-muted/30"
              icon={<Zap className="w-6 h-6" />}
              title="Next.js 16 + Turbopack"
              description="Experience lightning-fast HMR and build times. Pre-configured with the latest Next.js 16 features including Server Actions, Partial Prerendering ready, and Turbopack for instant feedback loops."
            />

            {/* Tall Card */}
            <FeatureCard 
              className="md:row-span-2 bg-gradient-to-b from-card to-primary/5"
              icon={<Palette className="w-6 h-6" />}
              title="Tailwind CSS 4"
              description="The future of CSS is here. Zero-runtime, engine-first configuration with native cascade layers, container queries, and 850+ lines of custom utility templates."
            />

            {/* Standard Cards */}
            <FeatureCard 
              icon={<Layers className="w-6 h-6" />}
              title="shadcn/ui"
              description="Beautiful, accessible components built with Radix UI and Tailwind. Fully customizable and copy-paste ready."
              delay={0.1}
            />

            <FeatureCard 
              icon={<Code2 className="w-6 h-6" />}
              title="145+ Utilities"
              description="A massive library of helper functions for string manipulation, dates, arrays, numbers, and validation."
              delay={0.2}
            />

            <FeatureCard 
              className="md:col-span-2 bg-gradient-to-r from-card to-muted/30"
              icon={<Cpu className="w-6 h-6" />}
              title="Production Ready"
              description="Type-safe, fully optimized, and SEO friendly. Includes a comprehensive hook library with 14+ essential React hooks for modern web development workflows."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- Interactive Code Section --- */}
      <section id="components" className="py-20 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        <div className="container px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight"
            >
              Code that looks <br />
              <span className="text-gradient">as good as it runs.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8 text-balance max-w-md mx-auto lg:mx-0 font-sans"
            >
              Our utilities and hooks are documented, type-safe, and designed to be intuitive. 
              <span className="font-hand text-2xl text-primary block mt-2 rotate-[-2deg]">No more copying utils.ts from old projects!</span>
            </motion.p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border shadow-sm">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm font-medium">Strictly Typed</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border shadow-sm">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm font-medium">Tree Shakeable</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]"
            >
              {/* IDE Header */}
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs font-mono text-muted-foreground">page.tsx</div>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm sm:text-base leading-relaxed">
                  <code className="block text-gray-400">
                    <span className="text-purple-400">import</span> {`{`} <span className="text-yellow-300">useDebounce</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-400">'@/hooks'</span>;<br />
                    <span className="text-purple-400">import</span> {`{`} <span className="text-yellow-300">formatCurrency</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-400">'@/lib/utils'</span>;<br />
                    <br />
                    <span className="text-blue-400">export default function</span> <span className="text-yellow-300">ProductPage</span>() {`{`}<br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> [<span className="text-red-300">v</span>, <span className="text-red-300">setV</span>] = <span className="text-yellow-300">useState</span>(<span className="text-green-400">''</span>);<br />
                    &nbsp;&nbsp;<span className="text-gray-500">// Automatically debounced search</span><br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-red-300">search</span> = <span className="text-yellow-300">useDebounce</span>(<span className="text-red-300">v</span>, <span className="text-orange-400">500</span>);<br />
                    <br />
                    &nbsp;&nbsp;<CodeTypewriter code={`return (
    <div className="p-4 glass-card">
      <h1>{formatCurrency(50000)}</h1>
      <input 
        className="input-primary"
        onChange={(e) => setV(e.target.value)} 
      />
    </div>
  );`} />
                    <br />
                    {`}`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 border-t border-border/40 bg-background/50 backdrop-blur-md">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="Ourin Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="font-display font-bold text-xl">Ourin</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                The ultimate Next.js boilerplate for modern web development. Ship your startup in record time with 145+ utilities and premium components.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#components" className="hover:text-primary transition-colors">Components</a></li>
                <li><a href="https://github.com/LuckyArch/ourin-nextjs-starter" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="https://github.com/LuckyArch/ourin-nextjs-starter/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MIT License</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-inter">
              © {new Date().getFullYear()} Ourin. Built with ❤️ by{' '}
              <a 
                href="https://github.com/LuckyArch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Fauzan Adyatma P
              </a>
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/LuckyArch/ourin-nextjs-starter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
