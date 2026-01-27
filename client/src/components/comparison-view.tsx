import { ArrowRightLeft, X, AlertCircle, CheckCircle2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Reuse Product Interface
interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  attributes: {
      formality: string;
      material: string;
      fit: string;
  };
}

interface ComparisonViewProps {
  products: Product[];
  allShortlist: Product[];
  onSwap: (oldId: string, newId: string) => void;
  onRemove: (id: string) => void;
  onBuy: (item: Product) => void;
}

export function ComparisonView({ products, allShortlist, onSwap, onRemove, onBuy }: ComparisonViewProps) {
  const [swappingSlotId, setSwappingSlotId] = useState<string | null>(null);

  // Helper to ensure we render empty slots if < 3 items
  const displaySlots = [0, 1, 2].map(i => products[i] || null);

  return (
    <div className="h-full flex flex-col bg-white rounded-md border border-border overflow-hidden">
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
            <div className="min-w-[600px] h-full flex flex-col">
                
                {/* 1. Header Row (Images & Actions) */}
                <div className="flex border-b border-border divide-x divide-border">
                    {displaySlots.map((product, idx) => (
                        <div key={product ? product.id : `empty-${idx}`} className="flex-1 min-w-0 relative group">
                            {product ? (
                                <>
                                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                                        <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                                        
                                        {/* Overlay Controls */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => setSwappingSlotId(product.id)}
                                                className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-muted-foreground hover:text-primary transition-colors"
                                                title="Swap Item"
                                            >
                                                <ArrowRightLeft className="w-3.5 h-3.5" />
                                            </button>
                                            <button 
                                                onClick={() => onRemove(product.id)}
                                                className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-muted-foreground hover:text-destructive transition-colors"
                                                title="Remove from Compare"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-muted/5">
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                                        <h3 className="font-bold text-sm leading-tight mt-1 h-10 line-clamp-2">{product.name}</h3>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="font-mono text-sm">${product.price}</span>
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                className="h-7 text-[10px] px-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
                                                onClick={() => onBuy(product)}
                                            >
                                                BUY
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Swap Overlay */}
                                    <AnimatePresence>
                                         {swappingSlotId === product.id && (
                                             <motion.div 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-white/95 z-20 p-4 flex flex-col"
                                             >
                                                 <div className="flex items-center justify-between mb-4">
                                                     <span className="font-bold text-xs text-primary">REPLACE ITEM</span>
                                                     <button onClick={() => setSwappingSlotId(null)}><X className="w-4 h-4" /></button>
                                                 </div>
                                                 <div className="flex-1 overflow-y-auto space-y-2">
                                                     {allShortlist.filter(p => !products.find(active => active.id === p.id)).map(candidate => (
                                                         <div 
                                                            key={candidate.id}
                                                            onClick={() => {
                                                                onSwap(product.id, candidate.id);
                                                                setSwappingSlotId(null);
                                                            }}
                                                            className="flex items-center gap-3 p-2 border border-border hover:border-primary cursor-pointer bg-white"
                                                         >
                                                             <img src={candidate.image} className="w-8 h-8 object-cover" />
                                                             <div className="flex-1 min-w-0">
                                                                 <p className="text-xs font-bold truncate">{candidate.name}</p>
                                                             </div>
                                                         </div>
                                                     ))}
                                                     {allShortlist.filter(p => !products.find(active => active.id === p.id)).length === 0 && (
                                                         <p className="text-[10px] text-muted-foreground text-center py-4">No other items</p>
                                                     )}
                                                 </div>
                                             </motion.div>
                                         )}
                                     </AnimatePresence>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center bg-muted/5 min-h-[300px] p-4 text-center">
                                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-2">
                                        <span className="text-muted-foreground/40 text-lg">+</span>
                                    </div>
                                    <p className="text-xs font-bold text-muted-foreground/60">Empty Slot</p>
                                    <p className="text-[10px] text-muted-foreground/40 mt-1">Select from list to add</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 2. AI Analysis Row */}
                <div className="flex divide-x divide-border bg-blue-50/30">
                     {displaySlots.map((product, idx) => (
                         <div key={product ? `ai-${product.id}` : `empty-ai-${idx}`} className="flex-1 p-4 min-w-0">
                             {product && (
                                 <>
                                    <div className="flex items-center gap-1.5 mb-2 text-blue-600/80">
                                        <AlertCircle className="w-3 h-3" />
                                        <span className="text-[10px] font-bold font-mono uppercase">AI_ANALYSIS</span>
                                    </div>
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        {idx === 0 && "Optimal for diverse social contexts. High durability score."}
                                        {idx === 1 && "Material breathability exceeds category average by 15%."}
                                        {idx === 2 && "Aesthetic aligns 94% with your 'Future-Tech' preference."}
                                    </p>
                                 </>
                             )}
                         </div>
                     ))}
                </div>

                {/* 3. Attribute Rows */}
                {["Formality", "Material", "Fit"].map((attr) => (
                    <div key={attr} className="flex divide-x divide-border border-t border-border">
                        {displaySlots.map((product, idx) => (
                            <div key={product ? `${attr}-${product.id}` : `empty-${attr}-${idx}`} className="flex-1 p-3 min-w-0 group hover:bg-muted/5 transition-colors">
                                {product && (
                                    <div>
                                        <span className="text-[10px] text-muted-foreground/50 font-mono uppercase block mb-0.5">{attr}</span>
                                        <span className="text-xs font-medium">
                                            {attr === "Formality" && product.attributes.formality}
                                            {attr === "Material" && product.attributes.material}
                                            {attr === "Fit" && product.attributes.fit}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}