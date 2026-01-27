import { useState } from "react";
import { ArrowLeft, Check, Search } from "lucide-react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_INVENTORY = [
    { id: "1", date: "2023-11-12", type: "Jacket", img: "https://images.unsplash.com/photo-1551028919-383718eccf3b?auto=format&fit=crop&w=300&q=80" },
    { id: "2", date: "2023-10-05", type: "Shirt", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80" },
    { id: "3", date: "2023-09-20", type: "Shoes", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=300&q=80" },
];

export default function MyInventory() {
  const [, setLocation] = useLocation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border p-4 md:p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setLocation("/inventory-selection")}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="font-display font-bold text-lg">MY_DIGITAL_INVENTORY</h1>
                </div>
                <div className="relative w-64 hidden md:block">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                     <Input className="pl-9 h-9 text-xs font-mono rounded-full bg-muted/30 border-transparent" placeholder="FILTER_ASSETS..." />
                </div>
            </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 pb-32">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {MOCK_INVENTORY.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={cn(
                                "group relative aspect-square bg-muted border cursor-pointer overflow-hidden transition-all chamfer-sm",
                                isSelected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
                            )}
                            onClick={() => toggleItem(item.id)}
                        >
                            <img src={item.img} className="w-full h-full object-cover" />
                            
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 text-[8px] font-mono rounded-sm">
                                {item.date}
                            </div>

                            <div className={cn(
                                "absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-md",
                                isSelected ? "bg-primary text-white" : "bg-white/80 text-transparent group-hover:bg-white group-hover:text-muted-foreground"
                            )}>
                                <Check className="w-3 h-3" />
                            </div>
                        </motion.div>
                    );
                })}
                 {/* Add New Placeholder */}
                 <div 
                    onClick={() => setLocation("/inventory-selection")}
                    className="aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-primary"
                 >
                     <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2">
                         <Search className="w-4 h-4" />
                     </div>
                     <span className="text-[10px] font-mono font-bold">UPLOAD_NEW</span>
                 </div>
            </div>
        </div>
        
         {/* Floating Action Bar */}
         {selectedItems.length > 0 && (
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-24 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none"
            >
                <div className="bg-primary text-white pl-6 pr-2 py-2 rounded-full shadow-xl flex items-center gap-4 pointer-events-auto">
                    <span className="font-mono text-xs font-bold">{selectedItems.length} ASSETS SELECTED</span>
                    <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-full h-8 px-4 text-xs font-bold">
                        CONFIRM SELECTION
                    </Button>
                </div>
            </motion.div>
        )}
    </div>
  );
}