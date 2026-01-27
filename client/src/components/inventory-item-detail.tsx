import { useState } from "react";
import { 
  X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag, 
  RefreshCcw, Gavel, Repeat, ArrowRightLeft, DollarSign, Recycle, 
  Camera, Edit3, AlertTriangle, CheckCircle2, Heart, Activity 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Product } from "./shortlist-overlay";

interface InventoryItemDetailProps {
  product: Product;
  onBack: () => void;
}

// Mock extended data for prototype
const MOCK_EXTENDED_DATA = {
  purchaseDate: "Oct 12, 2025",
  purchaseLocation: "SOHO Flagship Store, NY",
  userImages: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
  ]
};

type Condition = 'mint' | 'good' | 'fair' | 'broken';

export function InventoryItemDetail({ product, onBack }: InventoryItemDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [condition, setCondition] = useState<Condition>('good');
  const [notes, setNotes] = useState("Really love the fit of this. Wore it to the gallery opening last week.");
  
  // Combine product image with user mock images
  const allImages = [product.image, ...MOCK_EXTENDED_DATA.userImages];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const ActionButton = ({ icon: Icon, label, colorClass, onClick }: any) => (
    <Button 
      variant="outline" 
      className={cn("h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed border-2 hover:border-solid transition-all group", colorClass)}
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </Button>
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-white z-10">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h2 className="font-display font-bold text-lg leading-none">{product.name}</h2>
          <p className="text-xs font-mono text-muted-foreground uppercase">{product.brand}</p>
        </div>
        <div className="ml-auto">
             <Badge variant="outline" className={cn(
                 "uppercase tracking-widest",
                 product.status === 'owned' ? "text-cyan-600 border-cyan-200 bg-cyan-50" : "text-amber-600 border-amber-200 bg-amber-50"
             )}>
                 {product.status === 'owned' ? 'Verified Owner' : 'Purchase Confirmed'}
             </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-0 min-h-full">
            
            {/* Left: Visuals */}
            <div className="relative bg-muted/10 h-[50vh] md:h-auto flex items-center justify-center p-8 group">
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentImageIndex}
                        src={allImages[currentImageIndex]} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-h-full max-w-full object-contain shadow-xl rounded-md"
                    />
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <Button variant="secondary" size="icon" onClick={prevImage} className="rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={nextImage} className="rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Image Source Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {allImages.map((_, idx) => (
                        <div key={idx} className={cn("w-1.5 h-1.5 rounded-full transition-all", idx === currentImageIndex ? "bg-primary w-3" : "bg-primary/20")} />
                    ))}
                </div>

                <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="gap-2 text-xs font-mono">
                        <Camera className="w-3 h-3" /> ADD PHOTO
                    </Button>
                </div>
            </div>

            {/* Right: Data & Management */}
            <div className="p-6 space-y-8 bg-white">
                
                {/* Meta Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/5 rounded border border-border">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase">Acquired</span>
                        </div>
                        <p className="font-medium text-sm">{MOCK_EXTENDED_DATA.purchaseDate}</p>
                    </div>
                    <div className="p-3 bg-muted/5 rounded border border-border">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase">Location</span>
                        </div>
                        <p className="font-medium text-sm truncate">{MOCK_EXTENDED_DATA.purchaseLocation}</p>
                    </div>
                    <div className="p-3 bg-muted/5 rounded border border-border">
                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Tag className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase">Price</span>
                        </div>
                        <p className="font-medium text-sm">${product.price}</p>
                    </div>
                    <div className="p-3 bg-muted/5 rounded border border-border">
                         <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Activity className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase">Condition</span>
                        </div>
                        <select 
                            value={condition}
                            onChange={(e) => setCondition(e.target.value as Condition)}
                            className="bg-transparent font-medium text-sm w-full outline-none cursor-pointer text-primary"
                        >
                            <option value="mint">✨ Mint</option>
                            <option value="good">👍 Good</option>
                            <option value="fair">🤔 Fair</option>
                            <option value="broken">💔 Broken</option>
                        </select>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <Edit3 className="w-3 h-3" /> User Notes
                    </label>
                    <Textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="bg-muted/5 border-border focus:border-primary min-h-[100px] text-sm resize-none"
                        placeholder="Add details about fit, memories, or defects..."
                    />
                </div>

                {/* Lifecycle Management Grid */}
                <div className="space-y-4">
                    <h3 className="font-display font-bold text-sm text-muted-foreground border-b border-border pb-2">LIFECYCLE ACTIONS</h3>
                    
                    <div className="grid grid-cols-3 gap-3">
                        <ActionButton 
                            icon={RefreshCcw} 
                            label="Return" 
                            colorClass="hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50"
                            onClick={() => alert("Generating Return Label & Instructions...")}
                        />
                        <ActionButton 
                            icon={Gavel} 
                            label="Repair" 
                            colorClass="hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => alert("Finding certified repair shops near you...")}
                        />
                         <ActionButton 
                            icon={Repeat} 
                            label="Replace" 
                            colorClass="hover:border-green-500 hover:text-green-600 hover:bg-green-50"
                            onClick={() => alert("Searching for identical item in stock...")}
                        />
                         <ActionButton 
                            icon={ArrowRightLeft} 
                            label="Swap / Trade" 
                            colorClass="hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50"
                            onClick={() => alert("Item marked 'Available for Trade'. Notifying friends...")}
                        />
                         <ActionButton 
                            icon={DollarSign} 
                            label="Sell" 
                            colorClass="hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                            onClick={() => alert("Drafting marketplace listing...")}
                        />
                         <ActionButton 
                            icon={Recycle} 
                            label="Donate / Recycle" 
                            colorClass="hover:border-stone-500 hover:text-stone-600 hover:bg-stone-50"
                            onClick={() => alert("Locating nearest drop-off points for textiles...")}
                        />
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}