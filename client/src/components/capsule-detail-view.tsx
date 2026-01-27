import { ChevronLeft, Share2, Calendar, ShoppingBag, Shirt, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CapsuleItem {
  name: string;
  image: string;
}

export interface CapsuleData {
  id: string;
  name: string;
  situation: string;
  reasoning: string;
  matchScore: number;
  items: CapsuleItem[];
}

interface CapsuleDetailViewProps {
  capsule: CapsuleData;
  onBack: () => void;
}

export function CapsuleDetailView({ capsule, onBack }: CapsuleDetailViewProps) {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-white z-10">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h2 className="font-display font-bold text-lg leading-none">{capsule.name}</h2>
          <div className="flex items-center gap-2 mt-1">
             <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-mono uppercase bg-purple-50 text-purple-700 border-purple-200">
                {capsule.matchScore}% MATCH
             </Badge>
             <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {capsule.situation}
             </span>
          </div>
        </div>
        <div className="ml-auto">
            <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
            </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
          {/* Main Visual Composition */}
          <div className="aspect-[4/3] bg-muted/10 p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
               
               {/* Simplified collage layout */}
               <div className="flex items-end justify-center gap-4 relative z-10">
                   {capsule.items.map((item, idx) => (
                       <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={cn(
                              "relative shadow-2xl rounded-md bg-white border border-border p-1",
                              idx === 0 ? "w-40 z-20 -rotate-2" : "w-32 z-10 rotate-3 -ml-8 mb-4 opacity-90"
                          )}
                       >
                           <div className="aspect-[3/4] overflow-hidden rounded bg-muted">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="p-2 text-center">
                               <p className="text-[10px] font-bold truncate">{item.name}</p>
                           </div>
                       </motion.div>
                   ))}
               </div>
          </div>

          <div className="p-6 space-y-8">
              {/* Reasoning */}
              <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                          <h3 className="font-bold text-sm text-purple-900 mb-1">AI Stylist Notes</h3>
                          <p className="text-sm text-purple-800 leading-relaxed">
                              {capsule.reasoning} This combination leverages your existing wardrobe while introducing key pieces that elevate the overall aesthetic for {capsule.situation.toLowerCase()} contexts.
                          </p>
                      </div>
                  </div>
              </div>

              {/* Item Breakdown */}
              <div>
                  <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                      <Shirt className="w-5 h-5" /> In This Capsule
                  </h3>
                  <div className="space-y-3">
                      {capsule.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 border border-border rounded-lg bg-white hover:border-primary/30 transition-colors">
                              <div className="w-16 h-16 bg-muted rounded overflow-hidden shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                  <p className="font-bold text-sm">{item.name}</p>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">
                                      {idx === 0 ? "From your inventory" : "Recommended Addition"}
                                  </p>
                              </div>
                              {idx === 0 ? (
                                  <Badge variant="outline" className="gap-1 text-green-600 bg-green-50 border-green-200">
                                      <Check className="w-3 h-3" /> OWNED
                                  </Badge>
                              ) : (
                                  <Button size="sm" variant="secondary" className="h-8 text-xs">
                                      <ShoppingBag className="w-3 h-3 mr-1" /> SHOP
                                  </Button>
                              )}
                          </div>
                      ))}
                  </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="h-12 border-2 border-dashed">
                      <Calendar className="w-4 h-4 mr-2" /> PLAN OUTFIT
                  </Button>
                  <Button className="h-12 bg-primary text-white font-bold tracking-wide">
                      SAVE CAPSULE
                  </Button>
              </div>
          </div>
      </div>
    </div>
  );
}
