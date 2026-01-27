import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Share2, FileImage, Database, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceNode {
  id: string;
  type: "image" | "link" | "text";
  thumbnail?: string;
  label: string;
}

interface ReasoningStep {
  id: string;
  description: string;
  confidence: number;
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
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
            {/* Backdrop with Blur */}
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
                className="relative z-[70] w-full max-w-4xl h-[80vh] bg-white border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row chamfer-lg"
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
                 <div className="flex-1 bg-muted/5 p-8 border-r border-border relative overflow-hidden flex flex-col">
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

                    {/* Visualization Area (Mock Graph) */}
                    <div className="flex-1 relative flex items-center justify-center">
                        <div className="relative w-full max-w-md aspect-video">
                            {/* Central Insight Node */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] z-20">
                                <Fingerprint className="w-10 h-10 text-primary" />
                            </div>

                            {/* Connected Source Nodes */}
                            {sources.map((source, i) => {
                                const angle = (i / sources.length) * 2 * Math.PI;
                                const radius = 120; // px
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
                                        {/* Connector Line */}
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none overflow-visible z-[-1]" style={{ marginLeft: -x, marginTop: -y }}>
                                            <line x1="150" y1="150" x2={150 + x} y2={150 + y} stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
                                        </svg>

                                        {source.thumbnail ? (
                                            <img src={source.thumbnail} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Database className="w-5 h-5 text-muted-foreground" />
                                        )}
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                 </div>

                 {/* Right Panel: Logical Steps */}
                 <div className="w-full md:w-80 bg-white p-8 overflow-y-auto">
                    <h3 className="font-display font-bold text-sm tracking-wider text-muted-foreground mb-6">DEDUCTION_CHAIN</h3>
                    
                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute top-2 bottom-2 left-3 w-[2px] bg-border" />

                        {reasoning.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="relative pl-10"
                            >
                                {/* Dot on timeline */}
                                <div className="absolute top-1 left-[5px] w-4 h-4 rounded-full bg-white border-2 border-primary z-10" />
                                
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[10px] text-primary">STEP_0{i + 1}</span>
                                        <span className="font-mono text-[10px] text-muted-foreground">{step.confidence}% CONF</span>
                                    </div>
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-border">
                         <div className="bg-accent/5 border border-accent/20 p-4 chamfer-sm">
                             <h4 className="font-bold text-accent text-xs mb-1">USER_FEEDBACK</h4>
                             <p className="text-xs text-muted-foreground">Incorrect deduction? Use the chat below to provide clarification.</p>
                         </div>
                    </div>
                 </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}