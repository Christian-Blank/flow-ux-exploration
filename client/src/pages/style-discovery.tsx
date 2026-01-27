import { useState, useRef, useEffect } from "react";
import { Heart, X, RefreshCw, ArrowRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

// Mock Data representing a spectrum of styles
const STYLE_SPECTRUM = [
  { id: "1", name: "Structured Wool Coat", style: "Minimalist", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=400&q=80" },
  { id: "2", name: "Oversized Graphic Tee", style: "Streetwear", img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=400&q=80" },
  { id: "3", name: "Leather Chelsea Boots", style: "Classic", img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?auto=format&fit=crop&w=400&q=80" },
  { id: "4", name: "Technical Cargo Pants", style: "Techwear", img: "https://images.unsplash.com/photo-1552160753-117159d7419d?auto=format&fit=crop&w=400&q=80" },
  { id: "5", name: "Silk Button Down", style: "Luxury", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80" },
  { id: "6", name: "Chunky Knit Sweater", style: "Cozy", img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=400&q=80" },
  { id: "7", name: "Pleated Trousers", style: "Smart Casual", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=80" },
  { id: "8", name: "Denim Jacket", style: "Americana", img: "https://images.unsplash.com/photo-1523205565295-f8e91625443b?auto=format&fit=crop&w=400&q=80" },
  { id: "9", name: "Performance Blazer", style: "Tech-Formal", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" },
  { id: "10", name: "Avant-Garde Tunic", style: "Avant-Garde", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" },
  { id: "11", name: "Suede Loafers", style: "Preppy", img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80" },
  { id: "12", name: "Bomber Jacket", style: "Utility", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" },
];

export default function StyleDiscovery() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState(STYLE_SPECTRUM);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const observerTarget = useRef(null);

  // Toggle selection
  const toggleLike = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Mock infinite scroll loading
  const loadMoreItems = () => {
    const moreItems = STYLE_SPECTRUM.map(item => ({
      ...item,
      id: item.id + Math.random().toString(36).substr(2, 5) // unique IDs
    }));
    setItems(prev => [...prev, ...moreItems]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-32">
       {/* Header */}
       <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border p-4 md:p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-display font-bold text-primary tracking-widest">-STYLE_MATRIX_CALIBRATION</span>
                  </div>
                  <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
                    Select items to calibrate the aesthetic vector
                  </p>
                </div>
                
                 <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-mono h-8 border-border">
                        <Filter className="w-3 h-3 mr-2" />
                        DIVERGE_SPECTRUM
                    </Button>
                     <Button variant="outline" size="sm" className="rounded-full text-xs font-mono h-8 border-border">
                        <RefreshCw className="w-3 h-3 mr-2" />
                        RESHUFFLE_VECTORS
                    </Button>
                </div>
            </div>
        </div>

        {/* Masonry Grid */}
        <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">
             <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                 <AnimatePresence>
                     {items.map((item, index) => {
                         const isSelected = selectedIds.has(item.id);
                         return (
                             <motion.div
                                key={`${item.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (index % 10) * 0.05 }}
                                className="break-inside-avoid relative group"
                             >
                                 <div 
                                    className={cn(
                                        "relative overflow-hidden bg-white border transition-all duration-300 cursor-pointer chamfer-sm",
                                        isSelected 
                                            ? "border-primary shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-primary" 
                                            : "border-border hover:border-primary/50"
                                    )}
                                    onClick={() => toggleLike(item.id)}
                                 >
                                      {/* Image */}
                                      <div className="relative aspect-[3/4] overflow-hidden">
                                          <img 
                                            src={item.img} 
                                            alt={item.name} 
                                            className={cn(
                                                "w-full h-full object-cover transition-transform duration-700",
                                                isSelected ? "scale-105" : "group-hover:scale-105"
                                            )} 
                                          />
                                          {/* Overlay Gradient */}
                                          <div className={cn(
                                              "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300",
                                              isSelected ? "opacity-90" : "opacity-0 group-hover:opacity-70"
                                          )} />
                                          
                                          {/* Selection Indicator */}
                                          <div className={cn(
                                              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                                              isSelected 
                                                ? "bg-primary text-white scale-100 shadow-lg" 
                                                : "bg-white/10 backdrop-blur-md text-white border border-white/20 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                                          )}>
                                              <Heart className={cn("w-4 h-4", isSelected && "fill-current")} />
                                          </div>
                                      </div>

                                      {/* Content (Visible on Hover/Select) */}
                                      <div className={cn(
                                          "p-4 bg-white transition-all duration-300 border-t border-border",
                                          isSelected ? "bg-primary/5" : ""
                                      )}>
                                          <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1 flex justify-between">
                                              <span>{item.style}</span>
                                              {isSelected && <span className="text-primary font-bold">SELECTED</span>}
                                          </p>
                                          <h3 className="font-bold text-sm text-foreground leading-tight">{item.name}</h3>
                                      </div>
                                 </div>
                             </motion.div>
                         );
                     })}
                 </AnimatePresence>
             </div>
             
             {/* Infinite Scroll Trigger */}
             <div ref={observerTarget} className="h-20 flex items-center justify-center mt-12">
                 <div className="flex flex-col items-center gap-2 opacity-50">
                     <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                 </div>
             </div>
        </div>

        {/* Floating Action Bar */}
        <AnimatePresence>
            {selectedIds.size > 0 && (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none"
                >
                    <div className="bg-primary text-white pl-6 pr-2 py-2 rounded-full shadow-2xl flex items-center gap-6 pointer-events-auto border border-white/10 backdrop-blur-md">
                        <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold">{selectedIds.size} VECTORS CALIBRATED</span>
                            <span className="text-[10px] opacity-80">Ready to synthesize shopping feed</span>
                        </div>
                        <Button 
                            size="sm" 
                            className="bg-white text-primary hover:bg-white/90 rounded-full h-10 px-6 text-xs font-bold tracking-wide shadow-md"
                            onClick={() => console.log("Finalizing preferences...")}
                        >
                            FINALIZE_STYLE_PROFILE <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}