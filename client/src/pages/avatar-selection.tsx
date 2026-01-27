import { useState } from "react";
import { useLocation } from "wouter";
import { Check, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types for selection hierarchy
type BodyZone = "head" | "upper" | "lower" | "feet";

const CATEGORIES: Record<BodyZone, string[]> = {
  head: ["Hat", "Glasses", "Earrings", "Necklace"],
  upper: ["Jacket", "T-Shirt", "Shirt", "Sweater", "Coat"],
  lower: ["Pants", "Shorts", "Skirt", "Underwear", "Belt"],
  feet: ["Shoes", "Socks", "Boots", "Sandals"]
};

export default function AvatarSelection() {
  const [, setLocation] = useLocation();
  const [selectedZone, setSelectedZone] = useState<BodyZone | null>(null);
  const [selections, setSelections] = useState<Record<string, boolean>>({});

  const toggleSelection = (item: string) => {
    setSelections(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const getSelectedCount = (zone: BodyZone) => {
    return CATEGORIES[zone].filter(item => selections[item]).length;
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-80px)] p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 pb-4 mb-8">
        <div>
           <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl font-display font-bold text-primary tracking-widest">-TARGET_ACQUISITION</span>
          </div>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
            Select target apparel categories for generation
          </p>
        </div>
        <div className="text-right">
             <div className="text-xs font-mono text-muted-foreground mb-1">TOTAL_TARGETS</div>
             <div className="text-xl font-display font-bold text-primary">
                 {Object.values(selections).filter(Boolean).length.toString().padStart(2, '0')}
             </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden relative">
          
          {/* Avatar Area (Center/Left) */}
          <div className="flex-1 relative flex items-center justify-center bg-white border border-border chamfer-lg overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} 
              />
              
              {/* Abstract Avatar SVG */}
              <div className="relative w-64 h-[500px]">
                  {/* Head Zone */}
                  <motion.div 
                    onClick={() => setSelectedZone("head")}
                    className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2 w-20 h-24 cursor-pointer group transition-all duration-300",
                        selectedZone === "head" ? "scale-105" : "hover:scale-105"
                    )}
                  >
                      <div className={cn(
                          "w-full h-full rounded-full border-2 transition-colors flex items-center justify-center relative",
                          selectedZone === "head" ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-muted-foreground/30 group-hover:border-primary/60 bg-white"
                      )}>
                           {getSelectedCount("head") > 0 && (
                               <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full text-[10px] font-mono flex items-center justify-center border-2 border-white">
                                   {getSelectedCount("head")}
                               </div>
                           )}
                      </div>
                      <div className="absolute top-1/2 left-full ml-4 w-20 h-[1px] bg-border pointer-events-none" />
                      <span className="absolute top-1/2 left-full ml-24 -translate-y-1/2 text-[10px] font-mono text-muted-foreground pointer-events-none">CRANIAL</span>
                  </motion.div>

                  {/* Upper Body Zone */}
                  <motion.div 
                    onClick={() => setSelectedZone("upper")}
                    className={cn(
                        "absolute top-24 left-1/2 -translate-x-1/2 w-40 h-48 cursor-pointer group transition-all duration-300",
                        selectedZone === "upper" ? "scale-105" : "hover:scale-105"
                    )}
                  >
                       <div className={cn(
                          "w-full h-full rounded-2xl border-2 transition-colors flex items-center justify-center relative",
                          selectedZone === "upper" ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-muted-foreground/30 group-hover:border-primary/60 bg-white"
                      )}>
                           {getSelectedCount("upper") > 0 && (
                               <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full text-[10px] font-mono flex items-center justify-center border-2 border-white">
                                   {getSelectedCount("upper")}
                               </div>
                           )}
                      </div>
                      <div className="absolute top-1/2 left-full ml-4 w-10 h-[1px] bg-border pointer-events-none" />
                      <span className="absolute top-1/2 left-full ml-14 -translate-y-1/2 text-[10px] font-mono text-muted-foreground pointer-events-none">TORSO</span>
                  </motion.div>

                  {/* Lower Body Zone */}
                  <motion.div 
                    onClick={() => setSelectedZone("lower")}
                    className={cn(
                        "absolute top-[290px] left-1/2 -translate-x-1/2 w-36 h-48 cursor-pointer group transition-all duration-300",
                        selectedZone === "lower" ? "scale-105" : "hover:scale-105"
                    )}
                  >
                       <div className={cn(
                          "w-full h-full rounded-2xl border-2 transition-colors flex items-center justify-center relative",
                          selectedZone === "lower" ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-muted-foreground/30 group-hover:border-primary/60 bg-white"
                      )}>
                           {getSelectedCount("lower") > 0 && (
                               <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full text-[10px] font-mono flex items-center justify-center border-2 border-white">
                                   {getSelectedCount("lower")}
                               </div>
                           )}
                      </div>
                      <div className="absolute top-1/2 left-full ml-4 w-12 h-[1px] bg-border pointer-events-none" />
                      <span className="absolute top-1/2 left-full ml-16 -translate-y-1/2 text-[10px] font-mono text-muted-foreground pointer-events-none">PELVIC/LEG</span>
                  </motion.div>

                   {/* Feet Zone */}
                   <motion.div 
                    onClick={() => setSelectedZone("feet")}
                    className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-16 cursor-pointer group transition-all duration-300",
                        selectedZone === "feet" ? "scale-105" : "hover:scale-105"
                    )}
                  >
                       <div className={cn(
                          "w-full h-full rounded-xl border-2 transition-colors flex items-center justify-center relative",
                          selectedZone === "feet" ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-muted-foreground/30 group-hover:border-primary/60 bg-white"
                      )}>
                           {getSelectedCount("feet") > 0 && (
                               <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full text-[10px] font-mono flex items-center justify-center border-2 border-white">
                                   {getSelectedCount("feet")}
                               </div>
                           )}
                      </div>
                      <div className="absolute top-1/2 left-full ml-4 w-6 h-[1px] bg-border pointer-events-none" />
                      <span className="absolute top-1/2 left-full ml-10 -translate-y-1/2 text-[10px] font-mono text-muted-foreground pointer-events-none">PEDAL</span>
                  </motion.div>
              </div>
          </div>

          {/* Selection Panel (Overlay) */}
          <AnimatePresence>
            {selectedZone && (
                <motion.div 
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    className="absolute inset-y-0 right-0 w-full md:w-80 bg-white border-l border-border shadow-2xl z-20 flex flex-col"
                >
                    <div className="p-6 border-b border-border bg-muted/10 flex items-center justify-between">
                         <div>
                            <h3 className="font-display font-bold text-lg uppercase">{selectedZone}_ZONE</h3>
                            <p className="text-xs font-mono text-muted-foreground">SELECT_TARGET_ITEMS</p>
                         </div>
                         <Button variant="ghost" size="icon" onClick={() => setSelectedZone(null)}>
                             <X className="w-5 h-5" />
                         </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-2">
                         {CATEGORIES[selectedZone].map((item) => (
                             <motion.div
                                key={item}
                                onClick={() => toggleSelection(item)}
                                className={cn(
                                    "p-4 border chamfer-sm cursor-pointer flex items-center justify-between transition-all",
                                    selections[item] ? "bg-primary/5 border-primary" : "bg-white border-border hover:border-primary/50"
                                )}
                             >
                                 <span className="font-mono text-sm">{item}</span>
                                 <div className={cn(
                                     "w-5 h-5 rounded-sm border flex items-center justify-center transition-colors",
                                     selections[item] ? "bg-primary border-primary text-white" : "border-muted-foreground"
                                 )}>
                                     {selections[item] && <Check className="w-3 h-3" />}
                                 </div>
                             </motion.div>
                         ))}
                    </div>

                    <div className="p-6 border-t border-border bg-muted/5">
                        <Button 
                            className="w-full h-12 rounded-none chamfer-sm font-bold"
                            onClick={() => setSelectedZone(null)}
                        >
                            CONFIRM SELECTION
                        </Button>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
      </div>

       {/* Continue Button */}
       <div className="mt-8 flex justify-end">
            <Button 
                className="w-full md:w-auto h-14 px-12 text-lg font-display tracking-wider bg-primary hover:bg-primary/90 rounded-none chamfer-sm relative overflow-hidden group"
                onClick={() => console.log("Generating look...")}
                disabled={Object.keys(selections).filter(k => selections[k]).length === 0}
            >
                <span className="relative z-10 flex items-center gap-2">
                    INITIATE_GENERATION <ChevronRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Button>
        </div>
    </div>
  );
}