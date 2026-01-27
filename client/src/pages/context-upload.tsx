import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, Link as LinkIcon, X, Plus, Image as ImageIcon, Film, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ContextUpload() {
  const [, setLocation] = useLocation();
  const [uploads, setUploads] = useState<{ id: string; type: "image" | "video"; url: string }[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Mock Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        // In a real app, this would upload to a server.
        // For mockup, we create a fake object URL or use a placeholder
        const file = e.target.files[0];
        const newUpload = {
            id: Math.random().toString(36).substr(2, 9),
            type: file.type.startsWith("video") ? "video" as const : "image" as const,
            url: URL.createObjectURL(file) // Creates a local preview URL
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
    // Mock drop handling - just simulate one success
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Upload Area */}
            <div className="space-y-8">
                
                {/* Drag & Drop Zone */}
                <div 
                    className={cn(
                        "relative group border-2 border-dashed h-64 flex flex-col items-center justify-center p-8 transition-all duration-300 chamfer-lg cursor-pointer",
                        isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-white hover:border-primary/50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                     {/* Corner Tech Decor */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                    
                    <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">UPLOAD MEDIA</h3>
                    <p className="text-center text-sm text-muted-foreground font-mono max-w-xs">
                        Drag photos/videos of your workspace, outfits, or environment.
                        <br/><span className="text-[10px] opacity-70">SUPPORTED: JPG, PNG, MP4</span>
                    </p>
                    <input 
                        type="file" 
                        id="file-upload" 
                        className="hidden" 
                        multiple 
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                    />
                </div>

                {/* Link Input */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold font-display tracking-wide">ADD EXTERNAL REFERENCES</span>
                    </div>
                    <div className="flex gap-0">
                        <Input 
                            value={linkInput}
                            onChange={(e) => setLinkInput(e.target.value)}
                            placeholder="https://linkedin.com/in/..."
                            className="rounded-none border-border focus-visible:ring-accent font-mono text-sm h-12"
                        />
                        <Button 
                            onClick={handleAddLink}
                            className="rounded-none bg-accent hover:bg-accent/90 h-12 px-6"
                        >
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Column: Preview Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-display tracking-wide">DATA_BUFFER ({uploads.length + links.length})</span>
                    <span className="text-[10px] font-mono text-muted-foreground">READY_FOR_ANALYSIS</span>
                </div>

                {/* Empty State */}
                {uploads.length === 0 && links.length === 0 && (
                    <div className="h-64 border border-border bg-muted/20 flex flex-col items-center justify-center text-muted-foreground font-mono text-xs chamfer-sm">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse mb-2" />
                        NO DATA VECTORS FOUND
                    </div>
                )}

                {/* Content Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {uploads.map((file) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="aspect-square relative group bg-muted border border-border overflow-hidden"
                            >
                                {file.type === "image" ? (
                                    <img src={file.url} alt="upload" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-black/10">
                                        <Film className="w-8 h-8 text-foreground/50" />
                                    </div>
                                )}
                                <button 
                                    onClick={() => setUploads(uploads.filter(u => u.id !== file.id))}
                                    className="absolute top-1 right-1 bg-black/50 text-white p-1 hover:bg-destructive transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-1">
                                    <p className="text-[8px] font-mono text-white truncate">ID.{file.id}</p>
                                </div>
                            </motion.div>
                        ))}
                        {links.map((link, i) => (
                             <motion.div
                                key={`link-${i}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="aspect-square relative group bg-white border border-border p-4 flex flex-col justify-between"
                            >
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                    <LinkIcon className="w-4 h-4 text-accent" />
                                </div>
                                <p className="text-[10px] font-mono text-muted-foreground break-all line-clamp-3">
                                    {link}
                                </p>
                                <button 
                                    onClick={() => setLinks(links.filter((_, idx) => idx !== i))}
                                    className="absolute top-1 right-1 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Action Button */}
                {(uploads.length > 0 || links.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-8"
                    >
                        <Button 
                            className="w-full h-14 text-lg font-display tracking-wider bg-primary hover:bg-primary/90 rounded-none chamfer-sm relative overflow-hidden group"
                            onClick={() => console.log("Analyzing...")}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                INITIATE_ANALYSIS <ChevronRight className="w-5 h-5" />
                            </span>
                             <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    </div>
  );
}