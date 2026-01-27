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
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden relative selection:bg-primary/30">
      
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content Area - Scenarios */}
      <div className="flex-1 p-6 md:p-8 flex flex-col z-10 overflow-y-auto md:overflow-hidden">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Choose your Vibe
            </h1>
            <p className="text-muted-foreground mt-2">
              Select a scenario or chat with AI to tailor your experience.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground backdrop-blur-md">
              AI Assisted Shopping
            </div>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-center content-center pb-24 md:pb-0">
          <AnimatePresence mode="popLayout">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                {...scenario}
                onClick={handleScenarioClick}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Sidebar / Bottom Sheet */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 md:relative md:w-[400px] md:border-l border-white/10 bg-black/40 backdrop-blur-xl md:backdrop-blur-none md:bg-transparent z-20 flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4 md:p-8 h-[300px] md:h-screen flex flex-col">
          <div className="md:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          <ChatInterface 
            onSendMessage={handleSendMessage} 
            isAiThinking={isAiThinking}
            className="flex-1"
          />
        </div>
      </motion.div>
    </div>
  );
}