import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScenarioCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick: (id: string) => void;
  className?: string;
}

export function ScenarioCard({
  id,
  title,
  description,
  imageUrl,
  onClick,
  className,
}: ScenarioCardProps) {
  return (
    <motion.div
      layoutId={id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-2xl glass-card aspect-[3/4] flex flex-col justify-end p-6",
        className
      )}
      onClick={() => onClick(id)}
      data-testid={`scenario-${id}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-2xl font-display font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}