import { useState, useRef, useEffect } from "react";
import { Cpu, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  isAiThinking: boolean;
  isExpanded: boolean;
  onExpandToggle: () => void;
  className?: string;
}

export function ChatInterface({
  onSendMessage,
  isAiThinking,
  isExpanded,
  onExpandToggle,
  className,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Initializing session... I've prepared 4 scenarios. Adjust parameters below.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiThinking, isExpanded]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className={cn("flex flex-col bg-white h-full relative", className)}>
      {/* Header / Click Area for Expansion */}
      <div 
        className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors select-none"
        onClick={onExpandToggle}
      >
        <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full transition-colors", isAiThinking ? "bg-amber-500 animate-pulse" : "bg-green-500")} />
            <span className="font-display font-bold text-lg tracking-wider text-primary">AI_ASSISTANT</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground hidden sm:inline-block">
                {isExpanded ? "CLICK TO COLLAPSE" : "CLICK TO EXPAND"}
            </span>
            {isExpanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronUp className="w-4 h-4 text-primary" />}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden relative bg-white">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-6 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex w-full flex-col",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                   <span className={cn(
                       "text-[10px] font-mono mb-1 uppercase opacity-70",
                       msg.role === "user" ? "text-accent" : "text-primary"
                   )}>
                       {msg.role === "user" ? "User_Input" : "System_Response"}
                   </span>

                  <div
                    className={cn(
                      "max-w-[85%] p-4 text-sm relative border",
                      msg.role === "user"
                        ? "bg-accent/5 border-accent/20 text-foreground chamfer-sm"
                        : "bg-white border-primary/20 text-foreground chamfer-sm shadow-sm"
                    )}
                    style={{
                        clipPath: msg.role === "user" 
                          ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                          : "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                    }}
                  >
                      {msg.role === "ai" && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary/10" />
                      )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isAiThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start w-full"
                >
                  <span className="text-[10px] font-mono mb-1 uppercase opacity-70 text-primary">System_Process</span>
                  <div className="bg-muted/30 border border-dashed border-primary/30 px-4 py-3 text-xs text-primary font-mono flex items-center gap-3 w-3/4">
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span className="animate-pulse">PROCESSING_DATA...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-muted/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2"
          onClick={(e) => e.stopPropagation()} // Prevent collapsing when clicking input area
        >
          <div className="relative flex-1">
            <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => !isExpanded && onExpandToggle()} // Auto-expand on focus
                placeholder={isExpanded ? "Enter parameters..." : "Click to chat..."}
                className="pr-12 bg-white border-border focus-visible:ring-accent focus-visible:border-accent font-mono text-sm h-12 rounded-none"
                data-testid="chat-input"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          </div>
          
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-none border-none relative group overflow-hidden"
            disabled={!input.trim() || isAiThinking}
            data-testid="chat-submit"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            <ChevronRight className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}