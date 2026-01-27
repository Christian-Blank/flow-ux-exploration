import { useState } from "react";
import { 
  X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag, 
  RefreshCcw, Gavel, Repeat, ArrowRightLeft, DollarSign, Recycle, 
  Camera, Edit3, Activity, FileText, Link as LinkIcon, Plus, Trash2, ExternalLink, Image as ImageIcon,
  Clock, Map, HelpCircle, ThumbsUp, ThumbsDown, Sparkles, Search, Layers, Shirt, Info
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

// Mock extended data types
interface Artifact {
    id: string;
    type: 'receipt' | 'repair' | 'cleaning' | 'return';
    label: string;
    date: string;
}

interface ExternalLinkItem {
    id: string;
    title: string;
    url: string;
}

interface UsageEvent {
    id: string;
    date: string;
    type: 'worn' | 'placed' | 'verified';
    location: string;
    source: 'photo_ai' | 'manual' | 'check_in';
    imageUrl?: string;
}

interface CapsuleRecommendation {
    id: string;
    name: string;
    situation: string;
    reasoning: string;
    matchScore: number;
    items: { image: string; name: string }[];
}

// Mock extended data for prototype
const MOCK_INITIAL_DATA = {
  purchaseDate: "Oct 12, 2025",
  purchaseLocation: "SOHO Flagship Store, NY",
  userImages: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
  ],
  artifacts: [
      { id: '1', type: 'receipt', label: 'Original Purchase Receipt', date: 'Oct 12, 2025' },
      { id: '2', type: 'cleaning', label: 'Dry Cleaning Slip', date: 'Dec 05, 2025' }
  ] as Artifact[],
  links: [
      { id: '1', title: 'Care & Washing Guide', url: '#' },
      { id: '2', title: 'Styling Inspiration Board', url: '#' }
  ] as ExternalLinkItem[],
  usageHistory: [
      { id: '1', date: 'Jan 15, 2026', type: 'worn', location: 'Gallery Opening, downtown', source: 'photo_ai', imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=60" },
      { id: '2', date: 'Dec 24, 2025', type: 'worn', location: 'Family Dinner', source: 'manual' },
      { id: '3', date: 'Nov 10, 2025', type: 'verified', location: 'Wardrobe Audit', source: 'check_in' }
  ] as UsageEvent[],
  capsules: [
      {
          id: '1',
          name: 'Minimalist Downtown',
          situation: 'Coffee / Creative Work',
          reasoning: 'Pairs the structured denim with soft textures for a balanced, approachable look.',
          matchScore: 98,
          items: [
              { name: 'White Tee', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=100&q=60' },
              { name: 'Leather Boots', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=100&q=60' }
          ]
      },
      {
          id: '2',
          name: 'Evening Gallery',
          situation: 'Social / Evening',
          reasoning: 'Elevates the item with darker tones and sharper silhouettes.',
          matchScore: 92,
          items: [
              { name: 'Black Blazer', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=100&q=60' },
              { name: 'Derby Shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=100&q=60' }
          ]
      }
  ] as CapsuleRecommendation[]
};

type Condition = 'mint' | 'good' | 'fair' | 'broken';

export function InventoryItemDetail({ product, onBack }: InventoryItemDetailProps) {
  const [images, setImages] = useState([product.image, ...MOCK_INITIAL_DATA.userImages]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [condition, setCondition] = useState<Condition>('good');
  const [notes, setNotes] = useState("Really love the fit of this. Wore it to the gallery opening last week.");
  const [artifacts, setArtifacts] = useState<Artifact[]>(MOCK_INITIAL_DATA.artifacts);
  const [links, setLinks] = useState<ExternalLinkItem[]>(MOCK_INITIAL_DATA.links);
  const [usageHistory, setUsageHistory] = useState<UsageEvent[]>(MOCK_INITIAL_DATA.usageHistory);
  const [showStalePrompt, setShowStalePrompt] = useState(true); // Simulate "haven't seen in a while"
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const deleteCurrentImage = () => {
      if (images.length <= 1) {
          alert("Cannot delete the last image.");
          return;
      }
      const newImages = images.filter((_, idx) => idx !== currentImageIndex);
      setImages(newImages);
      setCurrentImageIndex(0);
  };

  const addMockImage = () => {
      const mockNewImage = "https://images.unsplash.com/photo-1550614000-4b9519e09d43?auto=format&fit=crop&w=800&q=80";
      setImages([...images, mockNewImage]);
      setCurrentImageIndex(images.length); // Jump to new image
  };

  const deleteArtifact = (id: string) => {
      setArtifacts(prev => prev.filter(a => a.id !== id));
  };

  const addMockArtifact = () => {
      const newArtifact: Artifact = { 
          id: Date.now().toString(), 
          type: 'repair', 
          label: 'Repair Estimate', 
          date: 'Jan 28, 2026' 
      };
      setArtifacts([...artifacts, newArtifact]);
  };

  const deleteLink = (id: string) => {
      setLinks(prev => prev.filter(l => l.id !== id));
  };

  const addMockLink = () => {
      const newLink: ExternalLinkItem = { 
          id: Date.now().toString(), 
          title: 'Repair Shop Reviews', 
          url: '#' 
      };
      setLinks([...links, newLink]);
  };
  
  const addUsageLog = () => {
      const newEvent: UsageEvent = {
          id: Date.now().toString(),
          date: 'Today',
          type: 'worn',
          location: 'Office',
          source: 'manual'
      };
      setUsageHistory([newEvent, ...usageHistory]);
  };
  
  const handleStaleConfirm = (stillHave: boolean) => {
      if (stillHave) {
          const newEvent: UsageEvent = {
              id: Date.now().toString(),
              date: 'Today',
              type: 'verified',
              location: 'Confirmed by User',
              source: 'check_in'
          };
          setUsageHistory([newEvent, ...usageHistory]);
          setShowStalePrompt(false);
          // Ideally trigger condition update prompt next
      } else {
          // Trigger dispose flow
          alert("Opening disposal options...");
          setShowStalePrompt(false);
      }
  };

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
  
  const DiscoveryButton = ({ icon: Icon, title, description, colorClass, onClick }: any) => (
      <Button 
        variant="outline"
        className={cn("h-auto py-4 px-4 flex items-center justify-between w-full border-2 hover:border-solid transition-all group", colorClass)}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
             <div className={cn("p-2 rounded-full bg-muted/50 group-hover:bg-white/50 transition-colors", colorClass.replace('hover:border-', 'text-'))}>
                 <Icon className="w-5 h-5" />
             </div>
             <div className="text-left">
                 <p className="font-bold text-sm leading-none mb-1">{title}</p>
                 <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">{description}</p>
             </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
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
            
            {/* Left: Visuals & Media Gallery */}
            <div className="relative bg-muted/10 h-[50vh] md:h-auto flex flex-col items-center justify-center p-8 group border-r border-border">
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentImageIndex}
                        src={images[currentImageIndex]} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-h-[70%] max-w-full object-contain shadow-xl rounded-md mb-8"
                    />
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute inset-x-4 top-[40%] -translate-y-1/2 flex justify-between pointer-events-none">
                    <Button variant="secondary" size="icon" onClick={prevImage} className="rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={nextImage} className="rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Delete Image Action */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button 
                        size="icon" 
                        variant="destructive" 
                        className="rounded-full w-8 h-8"
                        onClick={deleteCurrentImage}
                        disabled={images.length <= 1}
                     >
                         <Trash2 className="w-4 h-4" />
                     </Button>
                </div>

                {/* Add Photo Action */}
                <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="gap-2 text-xs font-mono" onClick={addMockImage}>
                        <Camera className="w-3 h-3" /> ADD MEDIA
                    </Button>
                </div>

                {/* Image Dots */}
                <div className="flex justify-center gap-2 mb-4">
                    {images.map((_, idx) => (
                        <div key={idx} className={cn("w-1.5 h-1.5 rounded-full transition-all", idx === currentImageIndex ? "bg-primary w-3" : "bg-primary/20")} />
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Media Gallery ({images.length})</p>
                </div>
            </div>

            {/* Right: Data & Management */}
            <div className="p-6 space-y-8 bg-white">
                
                {/* Stale Check-in Prompt */}
                <AnimatePresence>
                    {showStalePrompt && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-amber-50 border border-amber-200 rounded p-4 mb-4"
                        >
                            <div className="flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-amber-900">Long time no see!</h4>
                                    <p className="text-xs text-amber-800 mt-1 mb-3">We haven't seen this item in any recent photos. Do you still own it?</p>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleStaleConfirm(true)}>
                                            Yes, still have it
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-7 text-xs border-amber-300 text-amber-900 hover:bg-amber-100" onClick={() => handleStaleConfirm(false)}>
                                            No, it's gone
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Meta Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/5 rounded border border-border">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase">Acquired</span>
                        </div>
                        <p className="font-medium text-sm">{MOCK_INITIAL_DATA.purchaseDate}</p>
                    </div>
                    <div className="p-3 bg-muted/5 rounded border border-border">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px] font-mono uppercase">Location</span>
                        </div>
                        <p className="font-medium text-sm truncate">{MOCK_INITIAL_DATA.purchaseLocation}</p>
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

                {/* AI Capsules Section */}
                <div className="space-y-3">
                     <div className="flex items-center justify-between border-b border-border pb-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <Shirt className="w-3 h-3" /> Smart Capsules
                        </label>
                        <Button variant="ghost" size="sm" className="h-6 gap-1 text-[10px]" onClick={() => alert("Launching Capsule Workflow seeded with this item...")}>
                            <Sparkles className="w-3 h-3 text-primary" /> GENERATE NEW
                        </Button>
                     </div>
                     <div className="space-y-3">
                         {MOCK_INITIAL_DATA.capsules.map(capsule => (
                             <div 
                                key={capsule.id} 
                                className={cn(
                                    "p-3 rounded border transition-all cursor-pointer group",
                                    selectedCapsuleId === capsule.id 
                                        ? "bg-primary/5 border-primary shadow-sm" 
                                        : "bg-muted/5 border-border hover:bg-muted/10 hover:border-primary/30"
                                )}
                                onClick={() => setSelectedCapsuleId(selectedCapsuleId === capsule.id ? null : capsule.id)}
                             >
                                 <div className="flex items-start justify-between mb-2">
                                     <div>
                                         <p className="font-bold text-sm">{capsule.name}</p>
                                         <p className="text-[10px] text-muted-foreground font-mono uppercase">{capsule.situation}</p>
                                     </div>
                                     <Badge variant="secondary" className="text-[10px] font-mono bg-white border border-border">
                                         {capsule.matchScore}% MATCH
                                     </Badge>
                                 </div>
                                 
                                 <div className="flex gap-2 mb-3">
                                     {/* Main Item (Current) */}
                                     <div className="w-10 h-10 rounded overflow-hidden border-2 border-primary/20 relative">
                                         <img src={images[0]} className="w-full h-full object-cover" />
                                     </div>
                                     <div className="w-px bg-border mx-1" />
                                     {/* Capsule Items */}
                                     {capsule.items.map((item, i) => (
                                         <div key={i} className="w-10 h-10 rounded overflow-hidden border border-border bg-white" title={item.name}>
                                             <img src={item.image} className="w-full h-full object-cover" />
                                         </div>
                                     ))}
                                     <div className="w-10 h-10 rounded border border-dashed border-border flex items-center justify-center bg-transparent text-muted-foreground text-[10px]">
                                         +2
                                     </div>
                                 </div>
                                 
                                 <AnimatePresence>
                                     {selectedCapsuleId === capsule.id && (
                                         <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                         >
                                             <div className="pt-2 border-t border-border/50 text-xs text-muted-foreground">
                                                 <div className="flex gap-2 items-start">
                                                     <Info className="w-3 h-3 mt-0.5 shrink-0" />
                                                     <p>{capsule.reasoning}</p>
                                                 </div>
                                                 <Button size="sm" className="w-full mt-3 h-7 text-xs bg-primary text-white" onClick={(e) => { e.stopPropagation(); alert(`Opening capsule: ${capsule.name}`); }}>
                                                     VIEW FULL CAPSULE
                                                 </Button>
                                             </div>
                                         </motion.div>
                                     )}
                                 </AnimatePresence>
                             </div>
                         ))}
                     </div>
                </div>

                {/* Usage History Timeline */}
                <div className="space-y-3">
                     <div className="flex items-center justify-between border-b border-border pb-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Usage History
                        </label>
                        <Button variant="ghost" size="sm" className="h-6 gap-1 text-[10px]" onClick={addUsageLog}>
                            <Plus className="w-3 h-3" /> LOG USE
                        </Button>
                     </div>
                     <div className="relative pl-4 border-l border-border space-y-4">
                         {usageHistory.map(event => (
                             <div key={event.id} className="relative">
                                 <div className={cn(
                                     "absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm",
                                     event.type === 'worn' ? "bg-primary" : "bg-muted-foreground"
                                 )} />
                                 <div className="flex items-start justify-between gap-4">
                                     <div>
                                         <p className="text-xs font-medium">
                                             {event.type === 'worn' && "Worn at "}
                                             {event.type === 'placed' && "Placed in "}
                                             {event.type === 'verified' && "Verified in "}
                                             <span className="font-bold">{event.location}</span>
                                         </p>
                                         <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{event.date}</p>
                                     </div>
                                     {event.imageUrl && (
                                         <img src={event.imageUrl} className="w-10 h-10 rounded object-cover border border-border shadow-sm" />
                                     )}
                                     {event.source === 'photo_ai' && (
                                         <Badge variant="outline" className="text-[9px] h-5 px-1 bg-blue-50 text-blue-600 border-blue-200">
                                             AI DETECTED
                                         </Badge>
                                     )}
                                 </div>
                             </div>
                         ))}
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
                        className="bg-muted/5 border-border focus:border-primary min-h-[80px] text-sm resize-none"
                        placeholder="Add details about fit, memories, or defects..."
                    />
                </div>
                
                {/* AI Discovery & Exploration */}
                <div className="space-y-3">
                     <div className="flex items-center justify-between border-b border-border pb-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Discovery & Styling
                        </label>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                         <DiscoveryButton 
                            icon={Layers}
                            title="Find Compliments"
                            description="Browse matching items"
                            colorClass="hover:border-purple-500 hover:bg-purple-50 text-purple-600"
                            onClick={() => alert("Opening Discovery Feed with 'Complimentary' filter...")}
                         />
                         <DiscoveryButton 
                            icon={Search}
                            title="Expand Collection"
                            description="Find similar items"
                            colorClass="hover:border-blue-500 hover:bg-blue-50 text-blue-600"
                            onClick={() => alert("Opening Discovery Feed with 'Similar' filter...")}
                         />
                     </div>
                </div>

                 {/* Linked Resources Section */}
                 <div className="space-y-3">
                     <div className="flex items-center justify-between border-b border-border pb-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <LinkIcon className="w-3 h-3" /> Related Links
                        </label>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={addMockLink}>
                            <Plus className="w-4 h-4 text-primary" />
                        </Button>
                     </div>
                     <div className="space-y-2">
                         {links.length === 0 && <p className="text-xs text-muted-foreground italic">No links added.</p>}
                         {links.map(link => (
                             <div key={link.id} className="flex items-center justify-between p-2 bg-muted/5 border border-border rounded hover:border-primary/50 transition-colors group">
                                 <a href={link.url} className="flex items-center gap-3 hover:text-primary transition-colors">
                                     <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded flex items-center justify-center">
                                         <LinkIcon className="w-4 h-4" />
                                     </div>
                                     <div>
                                         <p className="text-xs font-bold">{link.title}</p>
                                         <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                                             OPEN RESOURCE <ExternalLink className="w-2 h-2" />
                                         </p>
                                     </div>
                                 </a>
                                 <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                                    onClick={() => deleteLink(link.id)}
                                >
                                     <Trash2 className="w-3 h-3" />
                                 </Button>
                             </div>
                         ))}
                     </div>
                </div>

                {/* Lifecycle Management Grid */}
                <div className="space-y-4 pt-4 border-t border-border">
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