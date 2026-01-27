import { useState, useEffect } from "react";
import { X, ShoppingBag, ArrowRight, Trash2, Bookmark, Check, ExternalLink, RefreshCw, AlertCircle, Box, Archive, Shirt, Sparkles, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComparisonView } from "@/components/comparison-view";
import { InventoryItemDetail, CapsuleRecommendation } from "@/components/inventory-item-detail";
import { CapsuleDetailView, CapsuleData } from "@/components/capsule-detail-view";

// Extended Product Type with Status
export type ProductStatus = 'shortlisted' | 'bought' | 'considering' | 'problem' | 'owned';

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  status: ProductStatus;
  attributes: {
      formality: string;
      material: string;
      fit: string;
  };
}

// Mock Shortlist Data
const MOCK_SHORTLIST: Product[] = [
    { id: "1", brand: "Acne Studios", name: "North Skinny Jeans", price: 240, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80", status: 'shortlisted', attributes: { formality: "Casual", material: "Denim", fit: "Skinny" } },
    { id: "2", brand: "Uniqlo U", name: "Crew Neck T-Shirt", price: 19, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80", status: 'owned', attributes: { formality: "Basic", material: "Cotton", fit: "Regular" } },
    { id: "3", brand: "Nike", name: "Air Force 1 '07", price: 110, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=300&q=80", status: 'shortlisted', attributes: { formality: "Street", material: "Leather", fit: "Standard" } },
    { id: "4", brand: "Patagonia", name: "Better Sweater", price: 149, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80", status: 'bought', attributes: { formality: "Outdoor", material: "Fleece", fit: "Relaxed" } },
    { id: "5", brand: "Common Projects", name: "Achilles Low", price: 410, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=300&q=80", status: 'considering', attributes: { formality: "Smart Casual", material: "Leather", fit: "Narrow" } },
];

interface ShortlistOverlayProps {
    isOpen: boolean; 
    onClose: () => void;
    initialTab?: 'shortlist' | 'inventory';
}

export function ShortlistOverlay({ isOpen, onClose, initialTab = 'shortlist' }: ShortlistOverlayProps) {
  const [shortlist, setShortlist] = useState<Product[]>(MOCK_SHORTLIST);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [buyConfirmationItem, setBuyConfirmationItem] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'shortlist' | 'inventory'>('shortlist');
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<Product | null>(null);
  const [viewingCapsule, setViewingCapsule] = useState<CapsuleData | null>(null);
  
  // New State for Multi-Selection Capsule Seeding
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedForCapsule, setSelectedForCapsule] = useState<string[]>([]);

  // Sync tab with props
  useEffect(() => {
    if (isOpen) {
        setActiveTab(initialTab);
        setSelectedInventoryItem(null); // Reset detail view when opening fresh
        setViewingCapsule(null);
        setIsSelectionMode(false);
        setSelectedForCapsule([]);
    }
  }, [isOpen, initialTab]);

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
        setSelectedForCompare(prev => prev.filter(i => i !== id));
    } else {
        if (selectedForCompare.length < 3) {
            setSelectedForCompare(prev => [...prev, id]);
        }
    }
  };

  const toggleCapsuleSelect = (id: string) => {
      if (selectedForCapsule.includes(id)) {
          setSelectedForCapsule(prev => prev.filter(i => i !== id));
      } else {
          setSelectedForCapsule(prev => [...prev, id]);
      }
  };

  const removeItem = (id: string) => {
      setShortlist(prev => prev.filter(i => i.id !== id));
      setSelectedForCompare(prev => prev.filter(i => i !== id));
      setSelectedForCapsule(prev => prev.filter(i => i !== id));
  };

  const updateStatus = (id: string, status: ProductStatus) => {
      setShortlist(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleBuyClick = (item: Product) => {
      window.open('#', '_blank');
      setBuyConfirmationItem(item);
  };

  const handlePostPurchaseFeedback = (feedback: 'bought' | 'considering' | 'failed') => {
      if (buyConfirmationItem) {
          const newStatus = feedback === 'bought' ? 'bought' : feedback === 'considering' ? 'considering' : 'problem';
          updateStatus(buyConfirmationItem.id, newStatus);
      }
      setBuyConfirmationItem(null);
  };

  // Helper for Status Colors
  const getStatusColor = (status: ProductStatus) => {
      switch (status) {
          case 'bought': return "bg-amber-50/50 border-amber-200 text-amber-800 ring-amber-100";
          case 'considering': return "bg-purple-50/50 border-purple-200 text-purple-800 ring-purple-100";
          case 'problem': return "bg-stone-50/50 border-stone-200 text-stone-600 grayscale ring-stone-100";
          case 'owned': return "bg-cyan-50/50 border-cyan-200 text-cyan-800 ring-cyan-100";
          default: return "bg-white border-border hover:border-primary/30";
      }
  };

  // Filter List Logic
  const displayedItems = shortlist.filter(item => {
      if (activeTab === 'inventory') {
          return item.status === 'owned' || item.status === 'bought';
      } else {
          // Shortlist shows everything EXCEPT purely owned items (owned items go to inventory)
          // But 'bought' items stay in shortlist temporarily to show success, or can move.
          // For now, let's keep 'bought' in both or just shortlist. 
          // Let's say Shortlist is active decision making. Inventory is "Done".
          // 'bought' items are technically owned, but maybe user wants to see them in context.
          return item.status !== 'owned';
      }
  });

  const handleSelectionModeToggle = () => {
      if (isSelectionMode) {
          setIsSelectionMode(false);
          setSelectedForCapsule([]);
      } else {
          setIsSelectionMode(true);
      }
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
                className="relative w-full bg-background border-l border-border shadow-2xl h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Tabs */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-white z-10 relative">
                    <div className="flex-1">
                        <div className="flex items-center gap-6 mb-2">
                             {/* Tabs */}
                             <button 
                                onClick={() => !isComparing && setActiveTab('shortlist')}
                                className={cn(
                                    "text-lg font-display font-bold tracking-widest transition-colors relative",
                                    activeTab === 'shortlist' ? "text-primary" : "text-muted-foreground hover:text-foreground",
                                    isComparing && "opacity-50 cursor-not-allowed"
                                )}
                             >
                                 SHORTLIST
                                 {activeTab === 'shortlist' && <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />}
                             </button>
                             <button 
                                onClick={() => !isComparing && setActiveTab('inventory')}
                                className={cn(
                                    "text-lg font-display font-bold tracking-widest transition-colors relative",
                                    activeTab === 'inventory' ? "text-cyan-600" : "text-muted-foreground hover:text-foreground",
                                    isComparing && "opacity-50 cursor-not-allowed"
                                )}
                             >
                                 INVENTORY
                                 {activeTab === 'inventory' && <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-600" />}
                             </button>
                        </div>
                        <div className="flex items-center justify-between mr-4">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-mono rounded-sm">
                                    {displayedItems.length} ITEMS
                                </span>
                                <p className="text-xs font-mono text-muted-foreground">
                                    {isComparing 
                                        ? "Analyzing 3-way vector compatibilities" 
                                        : activeTab === 'shortlist' ? "Select items to compare nuances" : "Digital twin assets you own"}
                                </p>
                            </div>

                            {/* Selection Toggle for Inventory */}
                            {activeTab === 'inventory' && !selectedInventoryItem && !viewingCapsule && (
                                <Button 
                                    variant={isSelectionMode ? "secondary" : "ghost"} 
                                    size="sm" 
                                    className={cn("h-7 text-xs gap-2", isSelectionMode && "bg-cyan-100 text-cyan-800 hover:bg-cyan-200")}
                                    onClick={handleSelectionModeToggle}
                                >
                                    {isSelectionMode ? (
                                        <>
                                            <X className="w-3 h-3" /> CANCEL SELECTION
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-3 h-3" /> SELECT ITEMS
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
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
                    {viewingCapsule ? (
                        <CapsuleDetailView 
                            capsule={viewingCapsule}
                            onBack={() => setViewingCapsule(null)}
                        />
                    ) : selectedInventoryItem ? (
                        <InventoryItemDetail 
                            product={selectedInventoryItem}
                            onBack={() => setSelectedInventoryItem(null)}
                            onOpenCapsule={(capsule) => setViewingCapsule(capsule as unknown as CapsuleData)}
                        />
                    ) : isComparing ? (
                         <div className="h-full min-h-[600px] p-6">
                             <ComparisonView 
                                products={selectedForCompare.map(id => shortlist.find(p => p.id === id)!).filter(Boolean)}
                                allShortlist={shortlist}
                                onSwap={(oldId: string, newId: string) => {
                                    setSelectedForCompare(prev => prev.map(id => id === oldId ? newId : id));
                                }}
                                onRemove={(id: string) => setSelectedForCompare(prev => prev.filter(i => i !== id))}
                                onBuy={handleBuyClick}
                                onAdd={(id: string) => {
                                    if (!selectedForCompare.includes(id) && selectedForCompare.length < 3) {
                                        setSelectedForCompare(prev => [...prev, id]);
                                    }
                                }}
                             />
                         </div>
                    ) : (
                        <div className="p-6 grid grid-cols-2 gap-4 pb-24"> 
                            {/* pb-24 for footer clearance */}
                            {displayedItems.map((item) => {
                                const isSelectedCompare = selectedForCompare.includes(item.id);
                                const isSelectedCapsule = selectedForCapsule.includes(item.id);
                                
                                const isSelected = activeTab === 'shortlist' ? isSelectedCompare : isSelectedCapsule;
                                
                                return (
                                    <motion.div 
                                        layout
                                        key={item.id}
                                        onClick={() => {
                                            if (activeTab === 'shortlist') {
                                                toggleCompareSelect(item.id);
                                            } else if (activeTab === 'inventory') {
                                                if (isSelectionMode) {
                                                    toggleCapsuleSelect(item.id);
                                                } else {
                                                    setSelectedInventoryItem(item);
                                                }
                                            }
                                        }}
                                        className={cn(
                                            "border transition-all duration-300 relative group overflow-hidden chamfer-sm",
                                            "cursor-pointer",
                                            isSelected 
                                                ? "border-primary ring-2 ring-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02] z-10" 
                                                : cn(getStatusColor(item.status), "hover:shadow-md"),
                                            // Dim non-selected items in selection mode
                                            (isSelectionMode && !isSelected) && "opacity-60 grayscale-[0.5]"
                                        )}
                                    >
                                        <div className="aspect-[4/3] relative">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                            
                                            {/* Status Badge */}
                                            {item.status !== 'shortlisted' && (
                                                <div className={cn(
                                                    "absolute top-2 left-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm rounded-sm shadow-sm",
                                                    item.status === 'bought' && "text-amber-600",
                                                    item.status === 'owned' && "text-cyan-600",
                                                    item.status === 'considering' && "text-purple-600",
                                                    item.status === 'problem' && "text-stone-500",
                                                )}>
                                                    {item.status}
                                                </div>
                                            )}
                                            
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

                                            {/* Actions Overlay - Only show in shortlist mode or non-selection inventory mode */}
                                            {activeTab === 'shortlist' && (
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
                                            )}
                                        </div>
                                        <div className={cn("p-3 transition-colors", isSelected && "bg-primary/5")}>
                                            <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.brand}</p>
                                            <p className="text-sm font-bold truncate">{item.name}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs font-mono">${item.price}</p>
                                                {item.status === 'considering' && <span className="text-[10px] text-purple-600 font-bold">DECIDING...</span>}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Action Bar - Dynamic based on Tab */}
                <AnimatePresence>
                    {/* Shortlist Comparison Footer */}
                    {activeTab === 'shortlist' && !isComparing && selectedForCompare.length > 0 && (
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="p-6 border-t border-border bg-white absolute bottom-0 left-0 right-0 z-20"
                        >
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
                        </motion.div>
                    )}

                    {/* Inventory Capsule Footer */}
                    {activeTab === 'inventory' && isSelectionMode && selectedForCapsule.length > 0 && (
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="p-6 border-t border-border bg-white absolute bottom-0 left-0 right-0 z-20"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-muted-foreground">
                                    {selectedForCapsule.length} ITEMS SELECTED
                                </span>
                                <Button 
                                    onClick={() => alert(`Creating capsule with ${selectedForCapsule.length} items... This would launch the capsule generation workflow.`)}
                                    className="rounded-none chamfer-sm font-bold bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" /> CREATE CAPSULE
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
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
                                        className="w-full bg-amber-500 hover:bg-amber-600 text-white border-none"
                                        onClick={() => handlePostPurchaseFeedback("bought")}
                                    >
                                        YES, PURCHASE CONFIRMED
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                                        onClick={() => handlePostPurchaseFeedback("considering")}
                                    >
                                        STILL DECIDING / NEED INFO
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full text-muted-foreground hover:text-stone-600"
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