import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, Link as LinkIcon, Search, Archive, Globe, Plus, ArrowRight, X, Shirt, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InventorySelection() {
  const [, setLocation] = useLocation();
  const [uploads, setUploads] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Mock Inventory State - simulating items added from searches
  const [inventory, setInventory] = useState([
      { id: "1", name: "Acne Studios Jeans", brand: "Acne Studios", img: "https://images.unsplash.com/photo-1542272617-08f086303b9f?auto=format&fit=crop&w=300&q=80" },
      { id: "2", name: "Uniqlo T-Shirt", brand: "Uniqlo", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80" }
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock drop
    setUploads(prev => [...prev, "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"]);
  };

  const removeInventoryItem = (id: string) => {
      setInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 md:p-12 pb-32">
        {/* Header */}
        <header className="mb-12 flex items-end justify-between border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-display font-bold text-primary tracking-widest">-ASSET_DIGITIZATION</span>
                <div className="h-[1px] flex-1 bg-border w-12" />
            </div>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
              Define existing inventory parameters for compatibility analysis
            </p>
          </div>
          <div className="hidden md:block">
             <div className="px-4 py-2 bg-white border border-border text-xs font-mono text-primary shadow-sm">
              PHASE: 03 - WARDROBE_INDEXING
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Input Methods */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
                <div className="grid gap-6">
                    {/* Search My Inventory */}
                    <motion.div 
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setLocation("/my-inventory")}
                        className="p-8 bg-white border border-border shadow-sm chamfer-sm cursor-pointer hover:border-primary/50 transition-colors group relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-4">
                                <div className="p-3 bg-blue-50 w-fit rounded-sm border border-blue-100">
                                    <Archive className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-xl text-foreground mb-2">SEARCH_MY_INVENTORY</h4>
                                    <p className="text-sm text-muted-foreground font-mono leading-relaxed max-w-xs">
                                        Access your historical digital wardrobe. Select from previously digitized assets.
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </motion.div>

                    {/* Global Database Search */}
                    <motion.div 
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setLocation("/global-search")}
                        className="p-8 bg-white border border-border shadow-sm chamfer-sm cursor-pointer hover:border-primary/50 transition-colors group relative overflow-hidden"
                    >
                         {/* Decorative Background */}
                         <div className="absolute inset-0 opacity-5 pointer-events-none" 
                            style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} 
                        />
                        
                        <div className="flex items-start justify-between relative z-10">
                            <div className="space-y-4">
                                <div className="p-3 bg-amber-50 w-fit rounded-sm border border-amber-100">
                                    <Globe className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-xl text-foreground mb-2">GLOBAL_ITEM_DATABASE</h4>
                                    <p className="text-sm text-muted-foreground font-mono leading-relaxed max-w-xs">
                                        Search the global crawler index. Find items you own without photographing them.
                                    </p>
                                </div>
                            </div>
                            <Search className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </motion.div>
                </div>

                {/* Direct Upload Area */}
                <div 
                    className={cn(
                        "relative group border-2 border-dashed h-48 flex flex-col items-center justify-center p-8 transition-all duration-300 chamfer-lg cursor-pointer bg-white",
                        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-full group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-sm text-foreground">DIRECT_UPLOAD</h3>
                            <p className="text-xs text-muted-foreground font-mono">
                                Drag photos of specific items here
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Asset Manifest (Summary View) */}
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 lg:border-l border-border lg:pl-12">
                <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-bold font-display tracking-wide flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-primary" />
                        ASSET_MANIFEST ({inventory.length + uploads.length})
                     </span>
                </div>

                <div className="bg-muted/10 border border-border chamfer-sm p-4 min-h-[400px] flex flex-col">
                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[500px] pr-2">
                        <AnimatePresence>
                            {/* Inventory Items */}
                            {inventory.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-3 border border-border shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-muted overflow-hidden flex-shrink-0 border border-border">
                                        <img src={item.img} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.brand}</p>
                                        <p className="text-sm font-bold truncate">{item.name}</p>
                                    </div>
                                    <button 
                                        onClick={() => removeInventoryItem(item.id)}
                                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                            
                            {/* Uploaded Items */}
                            {uploads.map((url, i) => (
                                <motion.div
                                    key={`upload-${i}`}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-3 border border-border shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-muted overflow-hidden flex-shrink-0 border border-border">
                                        <img src={url} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase">DIRECT_UPLOAD</p>
                                        <p className="text-sm font-bold truncate">IMG_ASSET_{i+1}</p>
                                    </div>
                                    <button 
                                        onClick={() => setUploads(uploads.filter((_, idx) => idx !== i))}
                                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                            
                            {inventory.length === 0 && uploads.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
                                    <Shirt className="w-12 h-12 text-muted-foreground mb-4" />
                                    <p className="text-xs font-mono">NO ASSETS INDEXED</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Continue Button */}
                    <div className="pt-6 border-t border-border mt-4">
                        <Button 
                            className="w-full h-12 text-md font-display tracking-wider bg-primary hover:bg-primary/90 rounded-none chamfer-sm relative overflow-hidden group"
                            onClick={() => setLocation("/avatar-selection")}
                            disabled={inventory.length === 0 && uploads.length === 0}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                CONFIRM_MANIFEST <ArrowRight className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}