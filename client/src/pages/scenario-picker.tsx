import { useState } from "react";
import { ScenarioCard } from "@/components/scenario-card";
import { ChatInterface } from "@/components/chat-interface";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const INITIAL_SCENARIOS = [
  {
    id: "travel",
    title: "Travel",
    description: "Futuristic escapes to floating islands and ethereal landscapes.",
    imageUrl: "/images/scenario-travel.png",
  },
  {
    id: "work",
    title: "Work",
    description: "Minimalist holographic workspaces for deep focus.",
    imageUrl: "/images/scenario-work.png",
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

const MOCK_UPDATES = [
  [
    {
      id: "adventure",
      title: "Adventure",
      description: "High-octane thrill seeking in neon-lit cyber cities.",
      imageUrl: "/images/scenario-explore.png", // Reusing for mock
    },
    {
      id: "relax",
      title: "Relaxation",
      description: "Zen gardens suspended in zero-gravity space.",
      imageUrl: "/images/scenario-home.png", // Reusing for mock
    },
  ],
  [
    {
      id: "luxury",
      title: "Luxury",
      description: "Gold-plated orbital stations with premium services.",
      imageUrl: "/images/scenario-work.png", // Reusing for mock
    },
    {
      id: "wild",
      title: "Wilderness",
      description: "Bioluminescent forests untouched by civilization.",
      imageUrl: "/images/scenario-travel.png", // Reusing for mock
    },
    {
      id: "retro",
      title: "Retro",
      description: "Analog nostalgia in a digital age.",
      imageUrl: "/images/scenario-home.png", // Reusing for mock
    },
  ],
];

export default function ScenarioPicker() {
  const [scenarios, setScenarios] = useState(INITIAL_SCENARIOS);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const handleScenarioClick = (id: string) => {
    console.log("Selected scenario:", id);
    // TODO: Navigate to next screen
  };

  const handleSendMessage = (message: string) => {
    setIsAiThinking(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Rotate through mock updates based on interaction count
      const nextUpdate = MOCK_UPDATES[interactionCount % MOCK_UPDATES.length];
      
      // Keep one random scenario from current set and add new ones
      const keptScenario = scenarios[0]; 
      const newScenarios = [keptScenario, ...nextUpdate].slice(0, 4);
      
      setScenarios(newScenarios);
      setIsAiThinking(false);
      setInteractionCount(prev => prev + 1);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Decorative Frame Lines */}
      <div className="absolute inset-4 border border-border/50 pointer-events-none rounded-xl" />
      <div className="absolute top-8 left-8 w-32 h-[1px] bg-primary/40" />
      <div className="absolute top-8 left-8 w-[1px] h-32 bg-primary/40" />
      <div className="absolute bottom-8 right-8 w-32 h-[1px] bg-primary/40" />
      <div className="absolute bottom-8 right-8 w-[1px] h-32 bg-primary/40" />

      {/* Main Content Area - Scenarios */}
      <div className="flex-1 p-8 md:p-12 flex flex-col z-10 overflow-y-auto md:overflow-hidden relative">
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

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center content-center pb-24 md:pb-0">
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

      {/* Chat Sidebar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 md:relative md:w-[400px] z-20 flex flex-col shadow-2xl md:shadow-none"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-[350px] md:h-screen flex flex-col bg-background md:pt-12 md:pb-12 md:pr-12">
            <div className="h-full border border-border shadow-xl bg-white relative overflow-hidden">
                {/* Tech details on chat container */}
                <div className="absolute top-0 right-0 p-2 z-10">
                    <div className="w-16 h-16 border-t-2 border-r-2 border-accent/50 rounded-tr-xl" />
                </div>
                <ChatInterface 
                    onSendMessage={handleSendMessage} 
                    isAiThinking={isAiThinking}
                    className="h-full"
                />
            </div>
        </div>
      </motion.div>
    </div>
  );
}