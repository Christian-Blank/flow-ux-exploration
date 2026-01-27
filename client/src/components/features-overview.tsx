import { 
  X, Layers, Sparkles, Shirt, ShoppingBag, 
  RotateCcw, History, Camera, GitMerge, 
  Database, Zap, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturesOverviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURES = [
    {
        category: "Interface",
        icon: Zap,
        title: "Flow UX",
        description: "Zero mental overhead. The interface attunes to your brain, adapting flows and information density to keep you in a state of flow at all times."
    },
    {
        category: "Insight",
        icon: Layers,
        title: "Live Feedback Loop",
        description: "Your Shortlist and Shopping List are living entities. The system learns instantly from what you save, reject, or hesitate on, refining its understanding of your taste in real-time."
    },
    {
        category: "Workflow",
        icon: GitMerge,
        title: "Adaptive Smart Workflows",
        description: "The AI creates custom workflows on the fly. Whether you're in a specific scenario or need a unique process, it generates and adapts steps dynamically to fit exactly what you need right now."
    },
    {
        category: "Discovery",
        icon: Sparkles,
        title: "Contextual AI Shopping",
        description: "Shopping that understands 'where' and 'why', not just 'what'. Filters by social context, formality, and mood."
    },
    {
        category: "Visual Learning",
        icon: Camera,
        title: "Smart Context Extraction",
        description: "Upload photos of yourself, scenes, or items instead of typing. The system analyzes visual cues to understand your style, environment, and needs automatically."
    },
    {
        category: "Interaction",
        icon: GitMerge,
        title: "Adaptive Conversation",
        description: "The AI learns from every interaction. Chat naturally to refine recommendations, nerd out on details, or confirm choices. It asks clarifying questions only when necessary."
    },
    {
        category: "Analysis",
        icon: GitMerge,
        title: "Transparent Reasoning",
        description: "Clickable deduction graphs show exactly why an item was recommended, citing style rules, visual analysis, and your unique preferences."
    },
    {
        category: "Inventory",
        icon: Database,
        title: "Digital Wardrobe Twin",
        description: "Full digitization of your assets. Track purchase history, condition, and location of every item you own."
    },
    {
        category: "Styling",
        icon: Shirt,
        title: "Smart Capsule Engine",
        description: "Generate entire outfits around a single item. AI suggests situations and explains the styling logic based on your owned items."
    },
    {
        category: "Lifestyle",
        icon: History,
        title: "Usage Lifecycle Tracking",
        description: "Log when items are worn via photo uploads or manual entry. Get 'Stale Item' prompts to help declutter or rediscover forgotten pieces."
    },
    {
        category: "Management",
        icon: RotateCcw,
        title: "Full-Circle Lifecycle",
        description: "Integrated workflows for repair, resale, donation, and recycling directly from the item view."
    },
    {
        category: "Architecture",
        icon: ShieldCheck,
        title: "Privacy-First Design",
        description: "No ad-based tracking. Your data is used solely to refine your personal style algorithm."
    }
];

export function FeaturesOverview({ isOpen, onClose }: FeaturesOverviewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/90 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-white border border-border shadow-2xl overflow-hidden flex flex-col max-h-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Header */}
                <div className="h-2 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 w-full" />
                
                <div className="p-8 border-b border-border flex items-start justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="font-display font-bold text-3xl tracking-tight mb-2">System Capabilities</h2>
                        <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
                            Module Overview v1.0 • Clinical Sci-Fi Interface
                        </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <div className="overflow-y-auto p-8 bg-muted/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <feature.icon className="w-12 h-12 text-primary rotate-12 transform translate-x-4 -translate-y-4" />
                                </div>
                                
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-sm">
                                        {feature.category}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 mb-3">
                                    <feature.icon className="w-5 h-5 text-foreground" />
                                    <h3 className="font-bold text-lg leading-tight">{feature.title}</h3>
                                </div>
                                
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer / Mission Statement */}
                    <div className="mt-12 p-8 bg-black text-white text-center rounded-sm">
                        <p className="font-display font-bold text-xl mb-2">"Buy less, choose well, make it last."</p>
                        <p className="text-sm text-white/60 font-mono">
                            Optimized for conscious consumption and long-term asset management.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
