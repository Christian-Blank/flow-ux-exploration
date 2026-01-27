import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScenarioCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick: (id: string) => void;
  className?: string;
  index: number;
}

export function ScenarioCard({
  id,
  title,
  description,
  imageUrl,
  onClick,
  className,
  index,
}: ScenarioCardProps) {
  // Generate a mock ID for the tech look
  const techId = `ID. ${Math.floor(Math.random() * 9000) + 1000}.${id.substring(0, 2).toUpperCase()}`;

  return (
    <motion.div
      layoutId={id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group cursor-pointer bg-white overflow-hidden chamfer-sm border border-border/60 hover:border-primary/50 transition-colors shadow-sm",
        className
      )}
      onClick={() => onClick(id)}
      data-testid={`scenario-${id}`}
    >
      {/* Tech Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-2 bg-white/90 backdrop-blur-sm border-b border-border/40">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{techId}</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="w-1 h-1 rounded-full bg-primary" />
        </div>
      </div>

      {/* Image Area with Grid Overlay */}
      <div className="relative aspect-[4/3] mt-[33px] mx-1 overflow-hidden bg-muted/20">
         <div className="absolute inset-0 z-10 opacity-10 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .3) 25%, rgba(0, 0, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .3) 75%, rgba(0, 0, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .3) 25%, rgba(0, 0, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .3) 75%, rgba(0, 0, 0, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} 
         />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Corner notches on image */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-3 bg-white relative">
        {/* Connecting Line Decoration */}
        <div className="absolute -top-6 left-6 w-[2px] h-6 bg-accent/40" />
        <div className="absolute -top-1 left-5 w-2 h-2 rounded-full border border-accent bg-white z-20" />

        <div className="flex justify-between items-start">
            <h3 className="text-xl font-display font-bold text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
            {title}
            </h3>
            <span className="text-xs font-mono text-primary/60 border border-primary/20 px-2 py-0.5 rounded-sm">V.0{index + 1}</span>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">
          {description}
        </p>

        <div className="pt-3 border-t border-dashed border-border flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Status: Ready</span>
            <div className="h-6 w-6 rounded-sm border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-white">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
        </div>
      </div>
      
      {/* Outer frame decoration */}
      <div className="absolute inset-0 border border-border pointer-events-none chamfer-sm mix-blend-multiply" />
    </motion.div>
  );
}