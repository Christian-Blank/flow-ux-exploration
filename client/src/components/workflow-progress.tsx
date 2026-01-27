import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles, ChevronRight, CornerUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export interface WorkflowStep {
  id: string;
  label: string;
  path?: string;
  status: 'completed' | 'current' | 'pending' | 'calculated';
}

interface WorkflowProgressProps {
  steps: WorkflowStep[];
  currentStepId: string;
  onBack?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

export function WorkflowProgress({ 
  steps, 
  currentStepId, 
  onBack, 
  onNext, 
  canGoNext = true,
  nextLabel = "PROCEED",
  backLabel = "RETURN"
}: WorkflowProgressProps) {
  
  const currentStepIndex = steps.findIndex(s => s.id === currentStepId);
  const prevStep = steps[currentStepIndex - 1];
  const nextStep = steps[currentStepIndex + 1];

  return (
    <div className="w-full bg-background/95 backdrop-blur-md border-b border-border z-30 sticky top-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Back Button - Prominent & Playful */}
        <div className="flex-1 flex justify-start">
            <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            disabled={!onBack}
            className={cn(
                "group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all px-0 hover:bg-transparent",
                !onBack && "opacity-0 pointer-events-none"
            )}
            >
            <div className="w-8 h-8 rounded-full bg-muted/50 group-hover:bg-muted flex items-center justify-center transition-colors">
                <CornerUpLeft className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Previous</span>
                <span className="text-xs font-bold font-display tracking-tight">{backLabel}</span>
            </div>
            </Button>
        </div>

        {/* Central HUD - Focused View */}
        <div className="flex-2 flex items-center justify-center gap-1 md:gap-4 relative">
             {/* Previous Dot (Ghost) */}
             {prevStep && (
                 <div className="hidden md:flex items-center gap-2 opacity-40 scale-90 grayscale">
                    <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center bg-muted">
                        <Check className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-mono uppercase hidden lg:block">{prevStep.label}</span>
                    <div className="w-8 h-[1px] bg-border" />
                 </div>
             )}

             {/* Current Step - Hero */}
             <div className="flex flex-col items-center relative z-10">
                <motion.div 
                    layoutId="activeStep"
                    className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary text-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)] mb-1"
                >
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                        {currentStepIndex + 1}
                    </span>
                    <span className="text-xs font-bold tracking-wider font-display">{steps[currentStepIndex].label}</span>
                </motion.div>
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    Step {currentStepIndex + 1} of {steps.length}
                </span>
             </div>

             {/* Next Step (Ghost) */}
             {nextStep && (
                 <div className="hidden md:flex items-center gap-2 opacity-40 scale-90 grayscale">
                    <div className="w-8 h-[1px] bg-border" />
                    <div className="w-6 h-6 rounded-full border border-dashed border-primary/40 flex items-center justify-center">
                        <span className="text-[9px]">{currentStepIndex + 2}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase hidden lg:block">{nextStep.label}</span>
                 </div>
             )}
        </div>

        {/* Next Button - Prominent & Playful */}
        <div className="flex-1 flex justify-end">
            <Button 
            variant={canGoNext ? "default" : "secondary"}
            onClick={onNext}
            disabled={!canGoNext || !onNext}
            className={cn(
                "h-10 px-5 rounded-sm chamfer-sm font-bold tracking-wide transition-all group relative overflow-hidden",
                canGoNext 
                    ? "bg-primary hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5" 
                    : "opacity-50 pointer-events-none",
                !onNext && "opacity-0 pointer-events-none"
            )}
            >
            <div className="flex flex-col items-end mr-3">
                 <span className="text-[9px] font-mono opacity-80 leading-none mb-0.5">NEXT_PHASE</span>
                 <span className="text-xs leading-none">{nextLabel}</span>
            </div>
            <div className="h-full w-[1px] bg-white/20 mr-2" />
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
            </Button>
        </div>

      </div>
      
      {/* Micro Progress Bar */}
      <div className="h-[2px] w-full bg-muted overflow-hidden absolute bottom-0">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
