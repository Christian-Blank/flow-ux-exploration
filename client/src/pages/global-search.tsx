import { useState } from "react";
import { Search, ArrowLeft, Filter, Check } from "lucide-react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_DB_ITEMS = [
    { id: "1", brand: "Acne Studios", name: "North Skinny Jeans", img: "https://images.unsplash.com/photo-1542272617-08f086303b9f?auto=format&fit=crop&w=300&q=80" },
    { id: "2", brand: "Uniqlo", name: "U Crew Neck T-Shirt", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80" },
    { id: "3", brand: "Nike", name: "Air Force 1 '07", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=300&q=80" },
    { id: "4", brand: "Patagonia", name: "Better Sweater", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80" },
    { id: "5", brand: "Adidas", name: "Stan Smith", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=300&q=80" },
    { id: "6", brand: "COS", name: "Relaxed Fit Blazer", img: "https://images.unsplash.com/photo-1591369822096-35c9389ea060?auto=format&fit=crop&w=300&q=80" },
];

export default function GlobalSearch() {
  const [, setLocation] = useLocation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
        {/* Search Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setLocation("/inventory-selection")}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="SEARCH_GLOBAL_DATABASE (e.g., 'Levis 501', 'Zara Linen Shirt')..." 
                            className="pl-10 h-12 font-mono text-sm rounded-none border-border focus-visible:ring-primary"
                        />
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-mono h-7"><Filter className="w-3 h-3 mr-1"/> BRAND</Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-mono h-7">CATEGORY</Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-mono h-7">COLOR</Button>
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-mono h-7">YEAR</Button>
                </div>
            </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 pb-32">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {MOCK_DB_ITEMS.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={cn(
                                "group relative aspect-[3/4] bg-white border cursor-pointer overflow-hidden transition-all",
                                isSelected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
                            )}
                            onClick={() => toggleItem(item.id)}
                        >
                            <img src={item.img} className="w-full h-full object-cover" />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="text-[10px] font-mono text-white/70 uppercase mb-1">{item.brand}</p>
                                <p className="text-sm font-bold text-white leading-tight">{item.name}</p>
                            </div>

                            <div className={cn(
                                "absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                                isSelected ? "bg-primary text-white" : "bg-black/30 text-transparent border border-white/30 group-hover:border-white"
                            )}>
                                <Check className="w-3 h-3" />
                            </div>
                        </motion.div>
                    );
                })}
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
                    <span className="font-mono text-xs font-bold">{selectedItems.length} ITEMS SELECTED</span>
                    <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-full h-8 px-4 text-xs font-bold">
                        ADD TO WARDROBE
                    </Button>
                </div>
            </motion.div>
        )}
    </div>
  );
}