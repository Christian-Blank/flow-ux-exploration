import { ArrowRightLeft, X, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Reuse Product Interface (in a real app, keep in types file)
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

  return (
    <div className="h-full flex flex-col">
        {/* Comparison Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-border overflow-hidden">
            {products.map((product, index) => (
                <div key={product.id} className="relative flex flex-col h-full bg-white group">
                    {/* Header Image */}
                    <div className="relative aspect-[4/3] border-b border-border overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover" />
                        
                        {/* Swap Button */}
                        <button 
                            onClick={() => setSwappingSlotId(product.id)}
                            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-muted-foreground hover:text-primary"
                            title="Swap Item"
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                        </button>

                         <button 
                            onClick={() => onRemove(product.id)}
                            className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-muted-foreground hover:text-destructive"
                            title="Remove from Compare"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="mb-6">
                             <p className="text-[10px] font-mono text-muted-foreground uppercase">{product.brand}</p>
                             <h3 className="font-display font-bold text-lg leading-tight">{product.name}</h3>
                             <p className="font-mono text-sm mt-1">${product.price}</p>
                        </div>

                        {/* AI Comparison Points */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs uppercase text-muted-foreground mb-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> UNIQUE_ADVANTAGE
                                </h4>
                                <p className="text-sm leading-relaxed text-foreground">
                                    {index === 0 && "Most versatile option. Fits both 'Work' and 'Casual' contexts seamlessly."}
                                    {index === 1 && "Highest comfort rating. Material choice offers superior breathability."}
                                    {index === 2 && "Strongest style statement. Aligns best with 'Avant-Garde' vector."}
                                </p>
                            </div>

                             {/* Attributes Grid */}
                             <div className="grid grid-cols-2 gap-2 text-xs">
                                 <div className="p-2 bg-muted/20 border border-border rounded-sm">
                                     <span className="text-[10px] text-muted-foreground block">FORMALITY</span>
                                     <span className="font-bold">{product.attributes.formality}</span>
                                 </div>
                                 <div className="p-2 bg-muted/20 border border-border rounded-sm">
                                     <span className="text-[10px] text-muted-foreground block">MATERIAL</span>
                                     <span className="font-bold">{product.attributes.material}</span>
                                 </div>
                                 <div className="p-2 bg-muted/20 border border-border rounded-sm">
                                     <span className="text-[10px] text-muted-foreground block">FIT_PROFILE</span>
                                     <span className="font-bold">{product.attributes.fit}</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                     {/* Action Footer */}
                     <div className="p-4 border-t border-border mt-auto">
                         <Button 
                            className="w-full rounded-sm font-bold bg-primary hover:bg-green-600"
                            onClick={() => onBuy(product)}
                         >
                             BUY NOW
                         </Button>
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
                                     <span className="font-bold text-sm">SELECT REPLACEMENT</span>
                                     <button onClick={() => setSwappingSlotId(null)}><X className="w-5 h-5" /></button>
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
                                             <img src={candidate.image} className="w-10 h-10 object-cover" />
                                             <div className="flex-1 min-w-0">
                                                 <p className="text-xs font-bold truncate">{candidate.name}</p>
                                                 <p className="text-[10px] text-muted-foreground">{candidate.brand}</p>
                                             </div>
                                             <RefreshCw className="w-4 h-4 text-muted-foreground" />
                                         </div>
                                     ))}
                                     {allShortlist.filter(p => !products.find(active => active.id === p.id)).length === 0 && (
                                         <p className="text-xs text-muted-foreground text-center py-8">No other items in shortlist</p>
                                     )}
                                 </div>
                             </motion.div>
                         )}
                     </AnimatePresence>
                </div>
            ))}
            
             {/* Empty Slot Placeholder (if < 3 selected) */}
             {products.length < 3 && (
                 <div className="hidden lg:flex flex-col items-center justify-center p-8 text-center bg-muted/5">
                     <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
                         <span className="text-muted-foreground font-bold text-lg">+</span>
                     </div>
                     <p className="text-sm font-bold text-muted-foreground">OPEN SLOT</p>
                     <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">Select another item from shortlist to compare</p>
                 </div>
             )}
        </div>
    </div>
  );
}