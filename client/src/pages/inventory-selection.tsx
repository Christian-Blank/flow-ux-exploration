import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, Link as LinkIcon, Search, Archive, Globe, Plus, ArrowRight, Shirt } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function InventorySelection() {
  const [, setLocation] = useLocation();
  const [uploads, setUploads] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Direct Upload */}
            <div className="space-y-8">
                <div className="flex items-center gap-2 mb-4">
                     <div className="w-2 h-2 bg-primary rounded-full" />
                     <h3 className="font-display font-bold text-lg">DIRECT_UPLOAD</h3>
                </div>

                <div 
                    className={cn(
                        "relative group border-2 border-dashed h-80 flex flex-col items-center justify-center p-8 transition-all duration-300 chamfer-lg cursor-pointer bg-white",
                        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                    
                    <div className="bg-muted p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">DROP_APPAREL_PHOTOS</h3>
                    <p className="text-center text-sm text-muted-foreground font-mono max-w-xs mb-6">
                        Upload detailed shots of specific items you want to include in the styling matrix.
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="font-mono text-xs">BROWSE_FILES</Button>
                        <Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground">PASTE_LINK</Button>
                    </div>
                </div>

                {/* Uploaded Preview */}
                {uploads.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                        {uploads.map((url, i) => (
                            <div key={i} className="aspect-[3/4] bg-muted border border-border relative group overflow-hidden">
                                <img src={url} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] font-mono p-1">
                                    IMG_{i}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column: Database Search Tools */}
            <div className="space-y-8">
                <div className="flex items-center gap-2 mb-4">
                     <div className="w-2 h-2 bg-accent rounded-full" />
                     <h3 className="font-display font-bold text-lg">DATABASE_RETRIEVAL</h3>
                </div>

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
                        
                        <div className="mt-6 flex gap-2">
                             <span className="px-2 py-1 bg-muted border border-border text-[10px] font-mono text-muted-foreground">NIKE</span>
                             <span className="px-2 py-1 bg-muted border border-border text-[10px] font-mono text-muted-foreground">ZARA</span>
                             <span className="px-2 py-1 bg-muted border border-border text-[10px] font-mono text-muted-foreground">UNIQLO</span>
                             <span className="px-2 py-1 bg-muted border border-border text-[10px] font-mono text-muted-foreground">+40k Brands</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Continue Action */}
        <div className="mt-16 border-t border-border pt-8 flex justify-end">
            <Button 
                className="w-full md:w-auto h-14 px-12 text-lg font-display tracking-wider bg-primary hover:bg-primary/90 rounded-none chamfer-sm relative overflow-hidden group"
                onClick={() => console.log("Proceeding to matching...")}
            >
                <span className="relative z-10 flex items-center gap-2">
                    COMPILE_ASSETS <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Button>
        </div>
    </div>
  );
}