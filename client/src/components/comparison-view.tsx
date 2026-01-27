import { ArrowRightLeft, X, AlertCircle, Eye, EyeOff, Plus, GripVertical } from "lucide-react";
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
  status?: string; // Add status support
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
  onAdd?: (id: string) => void; // New prop for adding items
}

export function ComparisonView({ products, allShortlist, onSwap, onRemove, onBuy, onAdd }: ComparisonViewProps) {
  const [swappingSlotId, setSwappingSlotId] = useState<string | null>(null);
  const [addingToSlotIdx, setAddingToSlotIdx] = useState<number | null>(null);
  const [hiddenProductIds, setHiddenProductIds] = useState<string[]>([]);

  // Helper to ensure we always work with 3 slots for the matrix structure
  const displaySlots = [0, 1, 2].map(i => products[i] || null);

  const toggleHide = (id: string) => {
    setHiddenProductIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const isHidden = (id: string) => hiddenProductIds.includes(id);

  return (
    <div className="h-full flex flex-col bg-white rounded-md border border-border overflow-hidden shadow-sm">
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
            <div className="min-w-full h-full flex flex-col">
                
                {/* 1. Header Row (Images & Actions) */}
                <div className="flex border-b border-border divide-x divide-border">
                    {displaySlots.map((product, idx) => {
                        const productHidden = product && isHidden(product.id);
                        
                        return (
                        <motion.div 
                            layout
                            initial={false}
                            animate={{ flex: productHidden ? 0 : 1, minWidth: productHidden ? "48px" : "200px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            key={product ? product.id : `empty-${idx}`} 
                            className={cn(
                                "relative group overflow-hidden transition-all",
                                productHidden ? "bg-muted/10" : "flex-1",
                                // Highlight Bought/Considering items in matrix too
                                product && product.status === 'bought' && "bg-amber-50/30",
                                product && product.status === 'considering' && "bg-purple-50/30"
                            )}
                        >
                            {product ? (
                                productHidden ? (
                                    // Collapsed State
                                    <div 
                                        className="h-full w-12 flex flex-col items-center py-4 cursor-pointer hover:bg-muted/20 transition-colors"
                                        onClick={() => toggleHide(product.id)}
                                        title="Show Item"
                                    >
                                        <div className="mb-4">
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 w-full flex justify-center">
                                            <span className="writing-vertical-lr rotate-180 text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                                                {product.brand}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    // Expanded State
                                    <>
                                        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                                            <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                                            
                                            {/* Overlay Controls - Always Visible */}
                                            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                                                <button 
                                                    onClick={() => toggleHide(product.id)}
                                                    className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-muted-foreground hover:text-primary transition-colors border border-border/50"
                                                    title="Hide Column"
                                                >
                                                    <EyeOff className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    onClick={() => setSwappingSlotId(product.id)}
                                                    className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-muted-foreground hover:text-primary transition-colors border border-border/50"
                                                    title="Swap Item"
                                                >
                                                    <ArrowRightLeft className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    onClick={() => onRemove(product.id)}
                                                    className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-muted-foreground hover:text-destructive transition-colors border border-border/50"
                                                    title="Remove from Compare"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-muted/5 border-t border-border/50">
                                            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                                            <h3 className="font-bold text-sm leading-tight mt-1 h-10 line-clamp-2">{product.name}</h3>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="font-mono text-sm">${product.price}</span>
                                                <Button 
                                                    size="sm" 
                                                    className="h-7 text-[10px] px-3 font-bold bg-primary hover:bg-primary/90 rounded-sm"
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
                                                    className="absolute inset-0 bg-white/95 z-20 p-4 flex flex-col border-r border-border"
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
                                                                className="flex items-center gap-3 p-2 border border-border hover:border-primary cursor-pointer bg-white rounded-sm"
                                                            >
                                                                <img src={candidate.image} className="w-8 h-8 object-cover rounded-sm" />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-bold truncate">{candidate.name}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {allShortlist.filter(p => !products.find(active => active.id === p.id)).length === 0 && (
                                                            <p className="text-[10px] text-muted-foreground text-center py-4">No other items available</p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )
                            ) : (
                                // Empty Slot
                                <div className="h-full flex flex-col items-center justify-center bg-muted/5 min-h-[300px] p-4 text-center relative">
                                    <Button 
                                        variant="outline"
                                        className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                                        onClick={() => setAddingToSlotIdx(idx)}
                                    >
                                        <Plus className="w-6 h-6" />
                                    </Button>
                                    <p className="text-xs font-bold text-muted-foreground/60">ADD ITEM</p>
                                    <p className="text-[10px] text-muted-foreground/40 mt-1">Select from shortlist</p>

                                    {/* Add Overlay */}
                                    <AnimatePresence>
                                        {addingToSlotIdx === idx && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute inset-0 bg-white z-20 p-4 flex flex-col border-r border-border"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="font-bold text-xs text-primary">ADD TO COMPARE</span>
                                                    <button onClick={() => setAddingToSlotIdx(null)}><X className="w-4 h-4" /></button>
                                                </div>
                                                <div className="flex-1 overflow-y-auto space-y-2 text-left">
                                                    {allShortlist.filter(p => !products.find(active => active.id === p.id)).map(candidate => (
                                                        <div 
                                                            key={candidate.id}
                                                            onClick={() => {
                                                                if (onAdd) onAdd(candidate.id);
                                                                setAddingToSlotIdx(null);
                                                            }}
                                                            className="flex items-center gap-3 p-2 border border-border hover:border-primary cursor-pointer bg-white rounded-sm"
                                                        >
                                                            <img src={candidate.image} className="w-8 h-8 object-cover rounded-sm" />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-bold truncate">{candidate.name}</p>
                                                            </div>
                                                            <Plus className="w-4 h-4 text-muted-foreground" />
                                                        </div>
                                                    ))}
                                                    {allShortlist.filter(p => !products.find(active => active.id === p.id)).length === 0 && (
                                                        <p className="text-[10px] text-muted-foreground text-center py-4">Shortlist empty</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    )})}
                </div>

                {/* 2. AI Analysis Row */}
                <div className="flex divide-x divide-border bg-blue-50/30">
                     {displaySlots.map((product, idx) => {
                         const productHidden = product && isHidden(product.id);
                         return (
                            <motion.div 
                                layout
                                initial={false}
                                animate={{ flex: productHidden ? 0 : 1, minWidth: productHidden ? "48px" : "200px" }}
                                key={product ? `ai-${product.id}` : `empty-ai-${idx}`} 
                                className={cn(
                                    "min-w-0 overflow-hidden",
                                    productHidden ? "bg-muted/10 p-0" : "flex-1 p-4"
                                )}
                            >
                                {product && !productHidden && (
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
                             </motion.div>
                         );
                     })}
                </div>

                {/* 3. Attribute Rows */}
                {["Formality", "Material", "Fit"].map((attr) => (
                    <div key={attr} className="flex divide-x divide-border border-t border-border">
                        {displaySlots.map((product, idx) => {
                            const productHidden = product && isHidden(product.id);
                            return (
                                <motion.div 
                                    layout
                                    initial={false}
                                    animate={{ flex: productHidden ? 0 : 1, minWidth: productHidden ? "48px" : "200px" }}
                                    key={product ? `${attr}-${product.id}` : `empty-${attr}-${idx}`} 
                                    className={cn(
                                        "min-w-0 transition-colors group",
                                        productHidden ? "bg-muted/10 p-0" : "flex-1 p-3 hover:bg-muted/5"
                                    )}
                                >
                                    {product && !productHidden && (
                                        <div>
                                            <span className="text-[10px] text-muted-foreground/50 font-mono uppercase block mb-0.5">{attr}</span>
                                            <span className="text-xs font-medium">
                                                {attr === "Formality" && product.attributes.formality}
                                                {attr === "Material" && product.attributes.material}
                                                {attr === "Fit" && product.attributes.fit}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}