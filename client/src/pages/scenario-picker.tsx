import { useState } from "react";
import { useLocation } from "wouter";
import { ScenarioCard } from "@/components/scenario-card";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const INITIAL_SCENARIOS = [
  {
    id: "work",
    title: "Work",
    description: "Minimalist holographic workspaces for deep focus.",
    imageUrl: "/images/scenario-work.png",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Futuristic escapes to floating islands and ethereal landscapes.",
    imageUrl: "/images/scenario-travel.png",
  },
  {
    id: "home",
    title: "Home",
    description: "Cozy smart interiors with warm ambient lighting.",
    imageUrl: "/images/scenario-home.png",
  },
  {
    id: "explore",
    title: "Explore",
    description: "Abstract digital maps and glowing nodes of discovery.",
    imageUrl: "/images/scenario-explore.png",
  },
];

// ... MOCK_UPDATES (same as before)
const MOCK_UPDATES = [
    [
      {
        id: "adventure",
        title: "Adventure",
        description: "High-octane thrill seeking in neon-lit cyber cities.",
        imageUrl: "/images/scenario-explore.png",
      },
      {
        id: "relax",
        title: "Relaxation",
        description: "Zen gardens suspended in zero-gravity space.",
        imageUrl: "/images/scenario-home.png",
      },
    ],
    // ...
];

export default function ScenarioPicker() {
  const [, setLocation] = useLocation();
  const [scenarios, setScenarios] = useState(INITIAL_SCENARIOS);

  const handleScenarioClick = (id: string) => {
    if (id === "work") {
      setLocation("/upload-context");
    } else {
      console.log("Selected scenario:", id);
      // Future navigation for other scenarios
    }
  };

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden">
      
      {/* Decorative Frame Lines */}
      <div className="absolute inset-4 border border-border/50 pointer-events-none rounded-xl" />
      <div className="absolute top-8 left-8 w-32 h-[1px] bg-primary/40" />
      <div className="absolute top-8 left-8 w-[1px] h-32 bg-primary/40" />
      <div className="absolute bottom-8 right-8 w-32 h-[1px] bg-primary/40" />
      <div className="absolute bottom-8 right-8 w-[1px] h-32 bg-primary/40" />

      {/* Main Content Area - Scenarios */}
      <div className="flex-1 p-8 md:p-12 flex flex-col z-10 overflow-y-auto pb-32">
        <header className="mb-10 flex items-end justify-between border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-display font-bold text-primary tracking-widest">-SCENARIO_PICKER</span>
                <div className="h-[1px] flex-1 bg-border w-12" />
            </div>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
              Select initialization vector or refine with AI
            </p>
          </div>
          <div className="hidden md:block">
            <div className="px-4 py-2 bg-white border border-border text-xs font-mono text-primary shadow-sm">
              SYS.STATUS: ONLINE
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start content-start">
          <AnimatePresence mode="popLayout">
            {scenarios.map((scenario, index) => (
              <ScenarioCard
                key={scenario.id}
                {...scenario}
                index={index}
                onClick={handleScenarioClick}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}