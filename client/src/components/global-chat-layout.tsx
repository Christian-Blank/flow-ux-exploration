import { useState, useRef, useEffect } from "react";
import { Cpu, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function GlobalChatLayout({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "System online. I'm ready to assist with your style analysis.",
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [location] = useLocation();

  // Context-aware initial messages based on route
  useEffect(() => {
    if (location === "/upload-context") {
      setMessages(prev => [...prev, {
        role: "ai",
        content: "Please upload photos of your workplace, current outfits, or provide a link to your professional profile. This helps me analyze your context."
      }]);
      setIsExpanded(true); // Auto-expand on new context
    }
  }, [location]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiThinking, isExpanded]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsAiThinking(true);

    // Mock AI Response
    setTimeout(() => {
      setIsAiThinking(false);
      setMessages(prev => [...prev, {
        role: "ai",
        content: "I've processed that input. Please continue with the flow or ask for specific adjustments."
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground">
      {/* Main Content Rendered Here */}
      <div className="flex-1 overflow-y-auto pb-24 relative z-10">
        {children}
      </div>

      {/* Backdrop for Expanded Chat */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Persistent Chat Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl border-t border-border bg-white"
        initial={{ height: "80px" }}
        animate={{ 
          height: isExpanded ? "70vh" : "80px",
          y: 0 
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <div className="h-full border-x border-border max-w-7xl mx-auto bg-white relative flex flex-col">
           {/* Header / Click Area */}
          <div 
            className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors select-none"
            onClick={() => setIsExpanded(!isExpanded)}
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
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1">
                <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => !isExpanded && setIsExpanded(true)}
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
      </motion.div>
    </div>
  );
}