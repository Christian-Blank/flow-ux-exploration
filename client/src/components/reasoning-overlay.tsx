import { useState } from "react";
import { X, Share2, Database, Fingerprint, ExternalLink, FileImage, Film, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Artifact {
  id: string;
  type: "image" | "video" | "link" | "file";
  url?: string;
  thumbnail?: string;
  label: string;
}

interface ReasoningStep {
  id: string;
  description: string;
  confidence: number;
  artifacts: Artifact[];
}

interface SourceNode {
  id: string;
  type: "image" | "link" | "text";
  thumbnail?: string;
  label: string;
}

interface ReasoningOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  insight: string;
  sources: SourceNode[];
  reasoning: ReasoningStep[];
}

export function ReasoningOverlay({
  isOpen,
  onClose,
  title,
  insight,
  sources,
  reasoning,
}: ReasoningOverlayProps) {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const selectedStep = reasoning.find(r => r.id === selectedStepId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Main Content Card */}
            <motion.div
                layoutId={`reasoning-${title}`}
                className="relative z-[70] w-full max-w-6xl h-[85vh] bg-white border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row chamfer-lg"
                onClick={(e) => e.stopPropagation()}
            >
                 {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors rounded-full"
                 >
                     <X className="w-5 h-5" />
                 </button>

                 {/* Left Panel: The Insight & Visualization */}
                 <div className="w-full md:w-[40%] bg-muted/5 p-8 border-r border-border relative overflow-hidden flex flex-col">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                    />
                    
                    <div className="relative z-10 mb-8">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs mb-2">
                            <Share2 className="w-4 h-4" />
                            <span>REASONING_TRACE_LOG</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold text-foreground mb-2">{title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">"{insight}"</p>
                    </div>

                    {/* Visualization Area */}
                    <div className="flex-1 relative flex items-center justify-center">
                        <div className="relative w-full max-w-xs aspect-square">
                            {/* Central Insight Node */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] z-20">
                                <Fingerprint className="w-10 h-10 text-primary" />
                            </div>

                            {/* Connected Source Nodes */}
                            {sources.map((source, i) => {
                                const angle = (i / sources.length) * 2 * Math.PI;
                                const radius = 100;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;

                                return (
                                    <motion.div
                                        key={source.id}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="absolute top-1/2 left-1/2 w-12 h-12 bg-white border border-border rounded-lg overflow-hidden shadow-sm z-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                        style={{ x, y, marginLeft: -24, marginTop: -24 }}
                                    >
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none overflow-visible z-[-1]" style={{ marginLeft: -x, marginTop: -y }}>
                                            <line x1="125" y1="125" x2={125 + x} y2={125 + y} stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
                                        </svg>

                                        {source.thumbnail ? (
                                            <img src={source.thumbnail} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Database className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                 </div>

                 {/* Middle Panel: Logical Steps (Clickable) */}
                 <div className="w-full md:w-[30%] bg-white p-6 overflow-y-auto border-r border-border">
                    <h3 className="font-display font-bold text-sm tracking-wider text-muted-foreground mb-6">DEDUCTION_CHAIN</h3>
                    
                    <div className="space-y-8 relative">
                        <div className="absolute top-2 bottom-2 left-3 w-[2px] bg-border" />

                        {reasoning.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className={cn(
                                    "relative pl-10 cursor-pointer group transition-all duration-300",
                                    selectedStepId === step.id ? "opacity-100 scale-[1.02]" : "opacity-70 hover:opacity-100"
                                )}
                                onClick={() => setSelectedStepId(step.id === selectedStepId ? null : step.id)}
                            >
                                {/* Dot on timeline */}
                                <div className={cn(
                                    "absolute top-1 left-[5px] w-4 h-4 rounded-full border-2 z-10 transition-colors duration-300",
                                    selectedStepId === step.id 
                                        ? "bg-primary border-primary shadow-[0_0_10px_hsl(var(--primary))]" 
                                        : "bg-white border-muted-foreground group-hover:border-primary"
                                )} />
                                
                                <div className={cn(
                                    "p-3 rounded-lg border transition-all duration-300",
                                    selectedStepId === step.id 
                                        ? "bg-primary/5 border-primary shadow-sm" 
                                        : "bg-transparent border-transparent group-hover:bg-muted/30"
                                )}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={cn("font-mono text-[10px]", selectedStepId === step.id ? "text-primary font-bold" : "text-muted-foreground")}>STEP_0{i + 1}</span>
                                        <span className="font-mono text-[10px] text-muted-foreground">{step.confidence}% CONF</span>
                                    </div>
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                    {step.artifacts.length > 0 && (
                                        <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                                            <Database className="w-3 h-3" />
                                            {step.artifacts.length} ARTIFACTS LINKED
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                 </div>

                 {/* Right Panel: Artifact Viewer (Dynamic) */}
                 <div className="w-full md:w-[30%] bg-muted/10 p-6 overflow-y-auto relative">
                     <AnimatePresence mode="wait">
                         {selectedStep ? (
                             <motion.div
                                key="artifacts"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="h-full flex flex-col"
                             >
                                <div className="mb-6 pb-4 border-b border-border">
                                    <h3 className="font-display font-bold text-sm tracking-wider text-foreground mb-1">EVIDENCE_LOCKER</h3>
                                    <p className="text-xs text-muted-foreground font-mono">
                                        Linked to Step {reasoning.findIndex(r => r.id === selectedStep.id) + 1}
                                    </p>
                                </div>

                                <div className="flex-1 space-y-4">
                                    {selectedStep.artifacts.map((artifact) => (
                                        <div key={artifact.id} className="group">
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                                                    {artifact.type === 'image' && <FileImage className="w-3 h-3" />}
                                                    {artifact.type === 'link' && <ExternalLink className="w-3 h-3" />}
                                                    {artifact.type === 'video' && <Film className="w-3 h-3" />}
                                                    {artifact.label}
                                                </span>
                                                <span className="text-[10px] font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ID.{artifact.id}
                                                </span>
                                            </div>
                                            
                                            <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:border-primary/50 transition-all cursor-zoom-in group-hover:shadow-md">
                                                {artifact.type === 'image' && (
                                                    <img src={artifact.url || artifact.thumbnail} alt={artifact.label} className="w-full h-auto object-cover" />
                                                )}
                                                {artifact.type === 'link' && (
                                                    <div className="p-4 flex items-center gap-3">
                                                        <div className="p-2 bg-accent/10 rounded-full">
                                                            <ExternalLink className="w-4 h-4 text-accent" />
                                                        </div>
                                                        <span className="text-xs font-mono text-foreground truncate">{artifact.url}</span>
                                                    </div>
                                                )}
                                                 {artifact.type === 'video' && (
                                                    <div className="aspect-video bg-black flex items-center justify-center">
                                                         <Film className="w-8 h-8 text-white/50" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </motion.div>
                         ) : (
                             <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center opacity-40"
                             >
                                 <Fingerprint className="w-12 h-12 text-muted-foreground mb-4" />
                                 <h3 className="font-display font-bold text-sm">NO_SELECTION</h3>
                                 <p className="text-xs font-mono mt-1 max-w-[200px]">
                                     Select a deduction step on the left to inspect source artifacts.
                                 </p>
                             </motion.div>
                         )}
                     </AnimatePresence>
                 </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}