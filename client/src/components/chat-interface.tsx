import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
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
  className?: string;
}

export function ChatInterface({
  onSendMessage,
  isAiThinking,
  className,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "I've curated some scenarios for you. Tell me what you're in the mood for, and I'll adapt them.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiThinking]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex w-full",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "glass text-foreground rounded-tl-sm border-white/5"
                  )}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isAiThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start w-full"
              >
                <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 animate-pulse text-primary" />
                  Thinking...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="pt-4 mt-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="pr-12 bg-white/5 border-white/10 hover:bg-white/10 focus-visible:ring-primary h-12 rounded-full backdrop-blur-md transition-all"
            data-testid="chat-input"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]"
            disabled={!input.trim() || isAiThinking}
            data-testid="chat-submit"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}