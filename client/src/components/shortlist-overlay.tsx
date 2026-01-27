import { useState } from "react";
import { X, ShoppingBag, ArrowRight, Trash2, Bookmark, Check, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComparisonView } from "@/components/comparison-view";

// Reuse Product Type
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

// Mock Shortlist Data
const MOCK_SHORTLIST: Product[] = [
    { id: "1", brand: "Acne Studios", name: "North Skinny Jeans", price: 240, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80", attributes: { formality: "Casual", material: "Denim", fit: "Skinny" } },
    { id: "2", brand: "Uniqlo U", name: "Crew Neck T-Shirt", price: 19, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80", attributes: { formality: "Basic", material: "Cotton", fit: "Regular" } },
    { id: "3", brand: "Nike", name: "Air Force 1 '07", price: 110, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=300&q=80", attributes: { formality: "Street", material: "Leather", fit: "Standard" } },
    { id: "4", brand: "Patagonia", name: "Better Sweater", price: 149, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80", attributes: { formality: "Outdoor", material: "Fleece", fit: "Relaxed" } },
    { id: "5", brand: "Common Projects", name: "Achilles Low", price: 410, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=300&q=80", attributes: { formality: "Smart Casual", material: "Leather", fit: "Narrow" } },
];

export function ShortlistOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [shortlist, setShortlist] = useState<Product[]>(MOCK_SHORTLIST);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [buyConfirmationItem, setBuyConfirmationItem] = useState<Product | null>(null);

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
        setSelectedForCompare(prev => prev.filter(i => i !== id));
    } else {
        if (selectedForCompare.length < 3) {
            setSelectedForCompare(prev => [...prev, id]);
        }
    }
  };

  const removeItem = (id: string) => {
      setShortlist(prev => prev.filter(i => i.id !== id));
      setSelectedForCompare(prev => prev.filter(i => i !== id));
  };

  const handleBuyClick = (item: Product) => {
      // Open in new tab (mock)
      window.open('#', '_blank');
      // Show confirmation modal on return
      setBuyConfirmationItem(item);
  };

  const handlePostPurchaseFeedback = (feedback: string) => {
      console.log("Purchase feedback:", feedback);
      setBuyConfirmationItem(null);
      // Logic to move to "Archive" or remove from shortlist would go here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full md:w-[600px] lg:w-[800px] bg-background border-l border-border shadow-2xl h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-white z-10 relative">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-display font-bold text-primary tracking-widest">
                                {isComparing ? "COMPARISON_MATRIX" : "ACTIVE_SHORTLIST"}
                            </span>
                            {!isComparing && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-mono rounded-sm">
                                    {shortlist.length} ITEMS
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                            {isComparing ? "Analyzing 3-way vector compatibilities" : "Select up to 3 items to compare nuances"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                         {isComparing ? (
                             <Button 
                                variant="default" 
                                size="sm" 
                                onClick={() => setIsComparing(false)}
                                className="h-9 text-xs font-mono bg-primary hover:bg-primary/90"
                            >
                                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> BACK_TO_LIST
                            </Button>
                         ) : (
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="w-5 h-5" />
                            </Button>
                         )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto relative bg-muted/5">
                    {isComparing ? (
                         <div className="h-full min-h-[600px] p-6">
                             <ComparisonView 
                                products={shortlist.filter(p => selectedForCompare.includes(p.id))}
                                allShortlist={shortlist}
                                onSwap={(oldId: string, newId: string) => {
                                    setSelectedForCompare(prev => prev.map(id => id === oldId ? newId : id));
                                }}
                                onRemove={(id: string) => setSelectedForCompare(prev => prev.filter(i => i !== id))}
                                onBuy={handleBuyClick}
                             />
                         </div>
                    ) : (
                        <div className="p-6 grid grid-cols-2 gap-4">
                            {shortlist.map((item) => {
                                const isSelected = selectedForCompare.includes(item.id);
                                return (
                                    <motion.div 
                                        layout
                                        key={item.id}
                                        onClick={() => toggleCompareSelect(item.id)}
                                        className={cn(
                                            "bg-white border transition-all duration-300 relative group overflow-hidden chamfer-sm cursor-pointer",
                                            isSelected 
                                                ? "border-primary ring-2 ring-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02] z-10" 
                                                : "border-border hover:border-primary/50 hover:shadow-md"
                                        )}
                                    >
                                        <div className="aspect-[4/3] relative">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                            
                                            {/* Selection Indicator (Subtle Check) */}
                                            <AnimatePresence>
                                                {isSelected && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="absolute top-2 right-2 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Actions Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                                                 <button 
                                                    className="text-white hover:text-red-400 transition-colors p-1"
                                                    onClick={() => removeItem(item.id)}
                                                 >
                                                     <Trash2 className="w-4 h-4" />
                                                 </button>
                                                 <button 
                                                    className="bg-white text-black px-3 py-1 text-[10px] font-bold font-mono hover:bg-white/90"
                                                    onClick={() => handleBuyClick(item)}
                                                 >
                                                     BUY_NOW
                                                 </button>
                                            </div>
                                        </div>
                                        <div className={cn("p-3 transition-colors", isSelected && "bg-primary/5")}>
                                            <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.brand}</p>
                                            <p className="text-sm font-bold truncate">{item.name}</p>
                                            <p className="text-xs font-mono mt-1">${item.price}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Action Bar */}
                {!isComparing && (
                    <div className="p-6 border-t border-border bg-white">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-muted-foreground">
                                {selectedForCompare.length}/3 SELECTED FOR COMPARISON
                            </span>
                            <Button 
                                disabled={selectedForCompare.length < 2}
                                onClick={() => setIsComparing(true)}
                                className="rounded-none chamfer-sm font-bold bg-primary hover:bg-primary/90"
                            >
                                RUN_COMPARISON_MATRIX <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}
                
                {/* Post-Purchase Modal (Overlay on Drawer) */}
                <AnimatePresence>
                    {buyConfirmationItem && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md flex items-center justify-center p-8"
                        >
                            <div className="max-w-sm w-full space-y-6 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingBag className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl">Did you acquire this asset?</h3>
                                    <p className="text-muted-foreground text-sm mt-2">{buyConfirmationItem.name}</p>
                                </div>
                                
                                <div className="grid gap-3">
                                    <Button 
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        onClick={() => handlePostPurchaseFeedback("bought")}
                                    >
                                        YES, PURCHASE CONFIRMED
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="w-full"
                                        onClick={() => handlePostPurchaseFeedback("considering")}
                                    >
                                        STILL DECIDING / NEED INFO
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full text-muted-foreground hover:text-destructive"
                                        onClick={() => handlePostPurchaseFeedback("failed")}
                                    >
                                        NO, SOMETHING WENT WRONG
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground max-w-xs mx-auto">
                                    Your feedback refines future selection algorithms. We do not track external transaction data.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}