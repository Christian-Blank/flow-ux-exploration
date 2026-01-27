import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles, ChevronRight } from "lucide-react";
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
}

export function WorkflowProgress({ 
  steps, 
  currentStepId, 
  onBack, 
  onNext, 
  canGoNext = true,
  nextLabel = "CONTINUE"
}: WorkflowProgressProps) {
  
  const currentStepIndex = steps.findIndex(s => s.id === currentStepId);

  return (
    <div className="w-full bg-background/95 backdrop-blur-sm border-b border-border z-30 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          disabled={!onBack}
          className={cn("shrink-0", !onBack && "opacity-0 pointer-events-none")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Steps Queue */}
        <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-x">
          <div className="flex items-center gap-2 min-w-max px-2">
            {steps.map((step, idx) => {
              const isCurrent = step.id === currentStepId;
              const isPast = idx < currentStepIndex;
              const isFuture = idx > currentStepIndex;
              const isCalculated = step.status === 'calculated';

              return (
                <div key={step.id} className="flex items-center">
                  {/* Connector Line */}
                  {idx > 0 && (
                    <div className={cn(
                      "w-4 h-0.5 mx-1", 
                      isPast || isCurrent ? "bg-primary/30" : "bg-muted dashed-line"
                    )} />
                  )}

                  {/* Step Chip */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.05 : 1,
                      opacity: isPast ? 0.6 : isCurrent ? 1 : 0.4
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono whitespace-nowrap transition-colors",
                      isCurrent 
                        ? "bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(59,130,246,0.2)]" 
                        : isPast 
                          ? "bg-muted/50 border-transparent text-muted-foreground"
                          : isCalculated
                            ? "border-primary/20 text-primary/60 border-dashed"
                            : "border-border text-muted-foreground"
                    )}
                  >
                    {isPast ? (
                      <Check className="w-3 h-3" />
                    ) : isCalculated ? (
                      <Sparkles className="w-3 h-3 animate-pulse" />
                    ) : (
                      <span className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                        isCurrent ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {idx + 1}
                      </span>
                    )}
                    {step.label}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <Button 
          variant={canGoNext ? "default" : "secondary"}
          onClick={onNext}
          disabled={!canGoNext || !onNext}
          className={cn(
            "shrink-0 gap-2 font-mono text-xs h-9 px-4 rounded-full transition-all",
            canGoNext && "shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
            !onNext && "opacity-0 pointer-events-none"
          )}
        >
          {nextLabel} <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Progress Bar Line */}
      <div className="h-[1px] w-full bg-muted overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
