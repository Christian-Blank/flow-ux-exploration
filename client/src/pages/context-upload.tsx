import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, Link as LinkIcon, X, Plus, Image as ImageIcon, Film, ChevronRight, Activity, MapPin, Shirt, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReasoningOverlay } from "@/components/reasoning-overlay";

export default function ContextUpload() {
  const [, setLocation] = useLocation();
  const [uploads, setUploads] = useState<{ id: string; type: "image" | "video"; url: string }[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  // Mock Analysis Data with Artifacts
  const analysisData = {
    environment: {
      title: "Work Environment",
      value: "Modern Open Office",
      confidence: 92,
      sources: [
        { id: "s1", type: "image" as const, label: "Workspace Photo", thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=60" },
        { id: "s2", type: "link" as const, label: "Company Page" },
      ],
      reasoning: [
        { 
            id: "1", 
            description: "Glass walls and open floor plan detected in 'workspace.jpg'.", 
            confidence: 95,
            artifacts: [
                { id: "a1", type: "image" as const, label: "Source Image: workspace.jpg", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
            ]
        },
        { 
            id: "2", 
            description: "Natural lighting levels suggest high-exposure environment.", 
            confidence: 88,
             artifacts: [
                { id: "a1", type: "image" as const, label: "Source Image: workspace.jpg", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
            ]
        },
        { 
            id: "3", 
            description: "Minimalist furniture aligns with 'Tech/Startup' aesthetic.", 
            confidence: 92,
             artifacts: [
                { id: "a2", type: "link" as const, label: "Reference: Office Trends 2024", url: "https://archdaily.com/trends" }
            ]
        },
      ],
    },
    style: {
      title: "Current Style",
      value: "Smart Casual / Tech",
      confidence: 85,
      sources: [
        { id: "s3", type: "image" as const, label: "Profile Pic", thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=60" },
      ],
      reasoning: [
        { 
            id: "1", 
            description: "Subject wearing unmarked t-shirt and blazer combo.", 
            confidence: 90,
             artifacts: [
                { id: "a3", type: "image" as const, label: "Detected Outfit", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
            ]
        },
        { 
            id: "2", 
            description: "Sneakers identified as Common Projects Achilles.", 
            confidence: 85,
             artifacts: [
                { id: "a4", type: "image" as const, label: "Product Match", url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
            ]
        },
      ],
    },
    role: {
      title: "Professional Role",
      value: "Creative Director",
      confidence: 78,
      sources: [
        { id: "s4", type: "link" as const, label: "LinkedIn" },
      ],
      reasoning: [
        { 
            id: "1", 
            description: "Inferred from LinkedIn title provided in external links.", 
            confidence: 99,
             artifacts: [
                { id: "a5", type: "link" as const, label: "Extracted Title", url: "linkedin.com/in/user" }
            ]
        },
        { 
            id: "2", 
            description: "Workspace setup includes drawing tablet and dual monitors.", 
            confidence: 75,
             artifacts: [
                { id: "a6", type: "image" as const, label: "Desk Setup Analysis", url: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
            ]
        },
      ],
    }
  };

  const activeInsight = selectedInsight ? analysisData[selectedInsight as keyof typeof analysisData] : null;

  // Mock Upload Handler (same as before)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const newUpload = {
            id: Math.random().toString(36).substr(2, 9),
            type: file.type.startsWith("video") ? "video" as const : "image" as const,
            url: URL.createObjectURL(file)
        };
        setUploads(prev => [...prev, newUpload]);
    }
  };
  
  const handleAddLink = () => {
      if(linkInput.trim()) {
          setLinks(prev => [...prev, linkInput]);
          setLinkInput("");
      }
  }

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
    setUploads(prev => [...prev, { id: "drop-mock", type: "image", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }]);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 md:p-12 pb-32">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-display font-bold text-primary tracking-widest">-CONTEXT_ANALYSIS</span>
                <div className="h-[1px] flex-1 bg-border w-12" />
            </div>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
              Upload source material for environmental & style vectorization
            </p>
          </div>
          <div className="hidden md:block">
             <div className="px-4 py-2 bg-white border border-border text-xs font-mono text-primary shadow-sm">
              PHASE: 02 - DATA_INGESTION
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Analysis Summary (The "Understandable" View) */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                <div className="flex items-center justify-between mb-4">
                     <span className="text-sm font-bold font-display tracking-wide flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        LIVE_ANALYSIS_FEED
                     </span>
                </div>

                {/* Analysis Cards */}
                <div className="space-y-4">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedInsight('environment')}
                        className="p-5 bg-white border border-border shadow-sm chamfer-sm cursor-pointer hover:border-primary/50 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-muted/30 rounded-full">
                                <MapPin className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h4 className="text-xs font-mono text-muted-foreground uppercase mb-1">Detected_Environment</h4>
                                <p className="font-display font-bold text-lg text-primary">{analysisData.environment.value}</p>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    {analysisData.environment.confidence}% Confidence
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedInsight('style')}
                        className="p-5 bg-white border border-border shadow-sm chamfer-sm cursor-pointer hover:border-primary/50 transition-colors group relative overflow-hidden"
                    >
                         <div className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-muted/30 rounded-full">
                                <Shirt className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h4 className="text-xs font-mono text-muted-foreground uppercase mb-1">Style_Archetype</h4>
                                <p className="font-display font-bold text-lg text-primary">{analysisData.style.value}</p>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    {analysisData.style.confidence}% Confidence
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedInsight('role')}
                        className="p-5 bg-white border border-border shadow-sm chamfer-sm cursor-pointer hover:border-primary/50 transition-colors group relative overflow-hidden"
                    >
                         <div className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-muted/30 rounded-full">
                                <Briefcase className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h4 className="text-xs font-mono text-muted-foreground uppercase mb-1">Professional_Context</h4>
                                <p className="font-display font-bold text-lg text-primary">{analysisData.role.value}</p>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                                    {analysisData.role.confidence}% Confidence
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Confirm Button */}
                 <div className="pt-6 border-t border-dashed border-border mt-8">
                     <p className="text-xs text-muted-foreground mb-4 font-mono">
                         *Review the analysis above. If correct, proceed to generation phase. Use chat to correct details.
                     </p>
                    <Button 
                        className="w-full h-14 text-lg font-display tracking-wider bg-primary hover:bg-primary/90 rounded-none chamfer-sm relative overflow-hidden group"
                        onClick={() => console.log("Confirming analysis...")}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            CONFIRM_AND_CONTINUE <ChevronRight className="w-5 h-5" />
                        </span>
                         <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </Button>
                </div>
            </div>

            {/* Right Column: Upload & Data Buffer */}
            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2 lg:border-l border-border lg:pl-12">
                
                 {/* Upload Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <h3 className="font-display font-bold text-lg text-foreground">SOURCE_MATERIAL</h3>
                         <span className="text-[10px] font-mono text-accent animate-pulse">AWAITING_INPUT</span>
                    </div>

                    <div 
                        className={cn(
                            "relative group border-2 border-dashed h-48 flex flex-col items-center justify-center p-8 transition-all duration-300 chamfer-lg cursor-pointer",
                            isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-white hover:border-primary/50"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <div className="flex items-center gap-4">
                             <div className="bg-primary/10 p-3 rounded-full group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-sm text-foreground">DROP_FILES_HERE</h3>
                                <p className="text-xs text-muted-foreground font-mono">
                                    JPG, PNG, MP4
                                </p>
                            </div>
                        </div>
                        <input 
                            type="file" 
                            id="file-upload" 
                            className="hidden" 
                            multiple 
                            accept="image/*,video/*"
                            onChange={handleFileUpload}
                        />
                    </div>
                    
                     <div className="flex gap-0">
                        <Input 
                            value={linkInput}
                            onChange={(e) => setLinkInput(e.target.value)}
                            placeholder="ADD_EXTERNAL_LINK_REFERENCE..."
                            className="rounded-none border-border focus-visible:ring-accent font-mono text-xs h-10"
                        />
                        <Button 
                            onClick={handleAddLink}
                            className="rounded-none bg-muted hover:bg-muted/80 h-10 px-4 text-foreground"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                 {/* Data Buffer Grid */}
                <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase">Ingested_Vectors ({uploads.length + links.length})</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        <AnimatePresence>
                            {uploads.map((file) => (
                                <motion.div
                                    key={file.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="aspect-square relative group bg-muted border border-border overflow-hidden rounded-sm"
                                >
                                    {file.type === "image" ? (
                                        <img src={file.url} alt="upload" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-black/10">
                                            <Film className="w-6 h-6 text-foreground/50" />
                                        </div>
                                    )}
                                     <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </motion.div>
                            ))}
                            
                             {/* Mock Initial Data if empty */}
                             {uploads.length === 0 && (
                                <>
                                    <div className="aspect-square bg-muted/20 border border-dashed border-border flex items-center justify-center">
                                        <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                    </div>
                                    <div className="aspect-square bg-muted/20 border border-dashed border-border flex items-center justify-center">
                                        <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                    </div>
                                </>
                             )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>

        {/* Reasoning Overlay */}
        {activeInsight && (
            <ReasoningOverlay 
                isOpen={!!selectedInsight}
                onClose={() => setSelectedInsight(null)}
                title={activeInsight.title}
                insight={activeInsight.value}
                sources={activeInsight.sources}
                reasoning={activeInsight.reasoning}
            />
        )}
    </div>
  );
}