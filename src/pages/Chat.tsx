import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, 
  Send, 
  Mic, 
  MicOff,
  Plus,
  Menu,
  X,
  User,
  Sparkles,
  ArrowLeft
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  date: string;
}

const mockChatHistory: ChatHistory[] = [
  { id: "1", title: "Digestive Health Query", preview: "What are the best herbs for...", date: "Today" },
  { id: "2", title: "Stress Management", preview: "I've been feeling stressed...", date: "Yesterday" },
  { id: "3", title: "Sleep Issues", preview: "Having trouble sleeping...", date: "Dec 28" },
  { id: "4", title: "Immunity Boost", preview: "How can I improve my...", date: "Dec 25" },
];

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: `🙏 Namaste! I am your AI Vaidya, here to guide you on your Ayurvedic wellness journey.

I can help you with:
• Understanding your Prakriti (body constitution)
• Ayurvedic remedies for common ailments
• Diet and lifestyle recommendations
• Herbal supplements guidance
• Stress management and mental wellness

How may I assist you today?`,
  timestamp: new Date(),
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-vaidya-chat`;

const Chat = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasProcessedSymptoms, setHasProcessedSymptoms] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle symptom context from SymptomsChecker
  useEffect(() => {
    const symptomContext = location.state?.symptomContext;
    if (symptomContext && !hasProcessedSymptoms) {
      setHasProcessedSymptoms(true);
      
      const { symptoms, dominantDosha, herbs, lifestyle, diet } = symptomContext;
      
      const contextMessage = `Based on my symptom analysis, I have the following symptoms: ${symptoms.join(', ')}. 
      
My analysis shows a ${dominantDosha} dosha imbalance. 

The recommended herbs are: ${herbs.join(', ')}.

Recommended lifestyle changes: ${lifestyle.slice(0, 3).join('; ')}.

Recommended diet tips: ${diet.slice(0, 3).join('; ')}.

Please provide me with personalized Ayurvedic advice based on these symptoms and my ${dominantDosha} imbalance. What additional remedies, practices, or precautions should I follow?`;

      // Auto-send the symptom context as a user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: contextMessage,
        timestamp: new Date(),
      };

      setMessages([welcomeMessage, userMessage]);
      
      // Trigger AI response
      setTimeout(async () => {
        setIsLoading(true);
        try {
          const historyMessages = [{ role: "user", content: contextMessage }];
          await streamChatWithMessages(historyMessages);
        } catch (error) {
          console.error("Chat error:", error);
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to get response",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, 500);
    }
  }, [location.state, hasProcessedSymptoms]);

  const streamChatWithMessages = async (userMessages: { role: string; content: string }[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment and try again.");
      }
      if (resp.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to continue.");
      }
      throw new Error(errorData.error || "Failed to get AI response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: assistantContent } : m
              )
            );
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: assistantContent } : m
              )
            );
          }
        } catch {
          /* ignore */
        }
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Build message history for context (last 10 messages)
      const historyMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      await streamChatWithMessages(historyMessages);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast({
        title: "Not Supported",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Error",
          description: "Could not capture voice input. Please try again.",
          variant: "destructive",
        });
      };
      
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  const startNewChat = () => {
    setMessages([welcomeMessage]);
    toast({
      title: "New Consultation",
      description: "Started a new consultation with AI Vaidya.",
    });
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-serif font-semibold text-foreground">AI Vaidya</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button className="w-full gap-2" onClick={startNewChat}>
              <Plus className="w-4 h-4" />
              New Consultation
            </Button>
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium mb-2">Recent Chats</p>
              {mockChatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full p-3 text-left rounded-lg hover:bg-secondary transition-colors"
                >
                  <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                  <p className="text-xs text-muted-foreground mt-1">{chat.date}</p>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/patient">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">AI Vaidya</h1>
                <p className="text-xs text-muted-foreground">Powered by Lovable AI</p>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
                  ${message.role === "user" ? "bg-primary" : "bg-primary/10"}
                `}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Leaf className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className={`
                  max-w-[80%] rounded-2xl px-4 py-3
                  ${message.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-br-md" 
                    : "bg-card border border-border rounded-bl-md"
                  }
                `}>
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  placeholder="Ask about Ayurvedic remedies, lifestyle tips..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute right-1 top-1/2 -translate-y-1/2 ${isListening ? "text-destructive" : "text-muted-foreground"}`}
                  onClick={toggleVoiceInput}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              AI Vaidya provides general Ayurvedic guidance. Always consult a qualified practitioner for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
