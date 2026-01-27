import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Heart, X, Bookmark, ChevronLeft, ChevronRight, Info, Maximize2, Sparkles, Shirt, DollarSign, Activity, Star, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReasoningOverlay } from "@/components/reasoning-overlay";

// Types
type VoteStatus = "liked" | "disliked" | "shortlisted" | "pending" | "owned";

interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  status: VoteStatus;
  matchReason: string;
}

// Mock Data Generator
const generateMockProduct = (id: string): Product => {
  const brands = ["Acne Studios", "Uniqlo U", "Arc'teryx", "Lemaire", "COS", "Nike Lab", "Common Projects"];
  const names = ["Structured Wool Coat", "Oversized Airism Tee", "Beta AR Jacket", "Pleated Trousers", "Boiled Wool Sweater", "ACG Mountain Fly", "Achilles Low"];
  const images = [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?auto=format&fit=crop&w=800&q=80"
  ];
  
  return {
    id,
    brand: brands[Math.floor(Math.random() * brands.length)],
    name: names[Math.floor(Math.random() * names.length)],
    price: Math.floor(Math.random() * 500) + 50,
    description: "Constructed from premium Japanese high-density nylon with a water-repellent finish. Features articulated sleeves for range of motion and hidden pockets.",
    images: [images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]],
    status: "pending",
    matchReason: "Aligns with your 'Tech-Minimalist' style vector. The color palette compliments your existing 'Uniqlo U' inventory items."
  };
};

export default function ProductFeed() {
  const [, setLocation] = useLocation();
  const [queue, setQueue] = useState<Product[]>(Array.from({ length: 5 }, (_, i) => generateMockProduct(i.toString())));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReasoningOpen, setIsReasoningOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProduct = queue[currentIndex];

  // Queue Management Logic
  useEffect(() => {
    // Check how many unviewed items are left
    const unviewedCount = queue.slice(currentIndex + 1).length;
    
    // If fewer than 2 unviewed items, add 3 more
    if (unviewedCount < 2) {
      const newItems = Array.from({ length: 3 }, (_, i) => 
        generateMockProduct((queue.length + i).toString())
      );
      setQueue(prev => [...prev, ...newItems]);
    }
  }, [currentIndex, queue.length]);

  const handleVote = (vote: VoteStatus) => {
    // 1. Update status of current item
    const updatedQueue = [...queue];
    updatedQueue[currentIndex].status = vote;
    setQueue(updatedQueue);

    // 2. Move to next item (with delay for animation)
    setTimeout(() => {
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setCurrentImageIndex(0); // Reset carousel
        }
    }, 400);
  };

  const jumpToProduct = (index: number) => {
      setCurrentIndex(index);
      setCurrentImageIndex(0);
  };

  const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % currentProduct.images.length);
  };

  const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length);
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col pb-20 overflow-hidden">
        {/* Top: Product Queue */}
        <div className="h-24 border-b border-border bg-white z-20 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
                <span className="font-display font-bold text-xs tracking-widest text-primary">CURATION_QUEUE</span>
                <span className="font-mono text-[10px] text-muted-foreground">AUTO_GENERATING...</span>
            </div>
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center px-4 gap-3">
                {queue.map((item, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div 
                            key={item.id}
                            onClick={() => jumpToProduct(index)}
                            className={cn(
                                "relative flex-shrink-0 w-12 h-12 cursor-pointer transition-all duration-300 rounded-sm border overflow-hidden group",
                                isActive ? "w-16 h-16 border-primary ring-2 ring-primary ring-offset-2" : "border-border opacity-70 hover:opacity-100 hover:border-primary/50",
                                item.status === 'liked' && !isActive && "border-green-500",
                                item.status === 'disliked' && !isActive && "border-destructive opacity-40 grayscale",
                                item.status === 'shortlisted' && !isActive && "border-blue-500",
                                item.status === 'owned' && !isActive && "border-cyan-500"
                            )}
                        >
                            <img src={item.images[0]} className="w-full h-full object-cover" />
                            
                            {/* Status Indicator Overlay */}
                            {item.status !== 'pending' && (
                                <div className={cn(
                                    "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]",
                                    isActive && "opacity-0" // Hide overlay if active to show image clearly
                                )}>
                                    {item.status === 'liked' && <Heart className="w-4 h-4 text-green-400 fill-current" />}
                                    {item.status === 'disliked' && <X className="w-4 h-4 text-destructive" />}
                                    {item.status === 'shortlisted' && <Bookmark className="w-4 h-4 text-blue-400 fill-current" />}
                                    {item.status === 'owned' && <Box className="w-4 h-4 text-cyan-400 fill-current" />}
                                </div>
                            )}
                            
                            {isActive && (
                                <motion.div 
                                    layoutId="active-marker"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary" 
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row relative">
            
            {/* Left: Product Imagery (Carousel) */}
            <div className="flex-1 lg:h-full relative bg-muted/10 flex flex-col justify-center overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={`${currentProduct.id}-${currentImageIndex}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full max-h-[60vh] lg:max-h-full flex items-center justify-center p-4 lg:p-12 cursor-zoom-in"
                        onClick={() => setExpandedImage(currentProduct.images[currentImageIndex])}
                    >
                         <img 
                            src={currentProduct.images[currentImageIndex]} 
                            className="w-auto h-full max-h-full object-contain shadow-2xl rounded-sm"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <Button 
                        variant="secondary" 
                        size="icon" 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button 
                        variant="secondary" 
                        size="icon" 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {currentProduct.images.map((_, idx) => (
                        <div 
                            key={idx}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                idx === currentImageIndex ? "bg-primary w-4" : "bg-primary/20"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Right: Product Details & Actions */}
            <div className="w-full lg:w-[450px] bg-white border-l border-border flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                    {/* Brand & Title */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{currentProduct.brand}</span>
                            <span className="text-xs font-mono px-2 py-1 bg-muted rounded-sm text-foreground">ID.{currentProduct.id}</span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-foreground leading-tight mb-4">{currentProduct.name}</h1>
                        <div className="flex items-center gap-2 text-xl font-mono text-foreground">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                            {currentProduct.price}
                        </div>
                    </div>

                    {/* Reasoning Trigger */}
                    <div 
                        className="p-4 bg-primary/5 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors group"
                        onClick={() => setIsReasoningOpen(true)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="font-bold text-sm text-primary">WHY THIS MATCH?</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
                            {currentProduct.matchReason}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                            <Info className="w-4 h-4 text-muted-foreground" /> DETAILS
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                            {currentProduct.description}
                        </p>
                    </div>
                </div>

                {/* Action Bar (Sticky Bottom) */}
                <div className="p-6 border-t border-border bg-white space-y-4">
                     {/* Feedback overlay on action bar based on current status */}
                     {currentProduct.status !== 'pending' && (
                         <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center">
                             <span className={cn(
                                 "font-display font-bold text-xl uppercase tracking-widest animate-in zoom-in duration-300",
                                 currentProduct.status === 'liked' && "text-green-600",
                                 currentProduct.status === 'disliked' && "text-destructive",
                                 currentProduct.status === 'shortlisted' && "text-blue-600",
                             )}>
                                 {currentProduct.status === 'liked' && "LIKED"}
                                 {currentProduct.status === 'disliked' && "DISMISSED"}
                                 {currentProduct.status === 'shortlisted' && "SHORTLISTED"}
                                 {currentProduct.status === 'owned' && "ADDED TO INVENTORY"}
                             </span>
                         </div>
                     )}

                    <div className="grid grid-cols-4 gap-2 h-16">
                        <Button 
                            variant="outline"
                            className="h-full rounded-xl border-2 border-muted hover:border-destructive hover:bg-destructive/5 hover:text-destructive transition-all flex flex-col gap-1 items-center justify-center group"
                            onClick={() => handleVote('disliked')}
                        >
                            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-mono font-bold">NO</span>
                        </Button>

                        <Button 
                            variant="outline"
                            className="h-full rounded-xl border-2 border-muted hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex flex-col gap-1 items-center justify-center group"
                            onClick={() => handleVote('shortlisted')}
                        >
                            <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-mono font-bold">SHORTLIST</span>
                        </Button>

                         <Button 
                            variant="outline"
                            className="h-full rounded-xl border-2 border-muted hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all flex flex-col gap-1 items-center justify-center group"
                            onClick={() => handleVote('owned')}
                        >
                            <Box className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-mono font-bold">OWN IT</span>
                        </Button>

                        <Button 
                            className="h-full rounded-xl bg-primary hover:bg-green-600 text-white transition-all flex flex-col gap-1 items-center justify-center shadow-lg hover:shadow-green-500/25 group"
                            onClick={() => handleVote('liked')}
                        >
                            <Heart className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
                            <span className="text-[9px] font-mono font-bold">LIKE</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Reasoning Overlay (Reused) */}
        {isReasoningOpen && (
             <ReasoningOverlay 
                isOpen={isReasoningOpen}
                onClose={() => setIsReasoningOpen(false)}
                title="Match Analysis"
                insight={currentProduct.matchReason}
                sources={[
                    { id: "s1", type: "image", label: "User Inventory", thumbnail: "https://images.unsplash.com/photo-1542272617-08f086303b9f?auto=format&fit=crop&w=150&q=60" },
                    { id: "s2", type: "text", label: "Style Profile", thumbnail: "" }
                ]}
                reasoning={[
                    { id: "1", description: "Color compatibility vector matches your 'Navy' preferences.", confidence: 95, artifacts: [] },
                    { id: "2", description: "Silhouette complements your 'Slim Fit' inventory items.", confidence: 88, artifacts: [] },
                    { id: "3", description: "Brand affinity detected for 'Japanese Minimalism'.", confidence: 92, artifacts: [] }
                ]}
            />
        )}

        {/* Expanded Image Modal */}
        <AnimatePresence>
            {expandedImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setExpandedImage(null)}
                >
                    <img src={expandedImage} className="max-w-full max-h-full object-contain" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}