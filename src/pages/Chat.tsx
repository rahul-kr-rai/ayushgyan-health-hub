import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulated AI response - this would connect to Lovable AI in production
    const responses: { [key: string]: string } = {
      digestion: `For digestive health, Ayurveda recommends:

🌿 **Triphala** - Take 1 tsp with warm water before bed for gentle detoxification and regular bowel movements.

🍵 **Ginger Tea** - Drink before meals to stimulate Agni (digestive fire).

🥗 **Dietary Tips**:
- Eat your largest meal at noon when Agni is strongest
- Avoid cold drinks with meals
- Include ghee in your diet for lubrication

Would you like specific recommendations based on your Prakriti type?`,
      stress: `For stress and anxiety relief, here's the Ayurvedic approach:

🧘 **Ashwagandha** - This adaptogenic herb helps balance cortisol levels. Take 500mg twice daily.

🌸 **Brahmi** - Excellent for calming the mind and improving mental clarity.

🛢️ **Abhyanga (Self-Massage)** - Daily warm oil massage with sesame oil can significantly reduce Vata imbalance causing anxiety.

🧘‍♀️ **Lifestyle Practices**:
- Practice Pranayama (breathing exercises) for 10 mins daily
- Follow a consistent daily routine (Dinacharya)
- Avoid screen time 1 hour before bed

Should I explain more about any of these remedies?`,
      sleep: `For better sleep, Ayurveda suggests:

🌙 **Ashwagandha Milk** - Mix 1/2 tsp Ashwagandha in warm milk with a pinch of nutmeg before bed.

🦶 **Foot Massage** - Massage feet with warm ghee or sesame oil before sleep.

⏰ **Sleep Hygiene**:
- Aim to sleep by 10 PM (Kapha time)
- Dinner should be light and before 7 PM
- Keep your bedroom cool and dark

🍵 **Calming Herbs**:
- Jatamansi
- Tagara (Indian Valerian)
- Shankhpushpi

Would you like me to recommend specific products from our store?`,
      immunity: `To boost your immunity naturally:

🍯 **Chyawanprash** - Take 1-2 tsp daily, preferably in the morning with warm milk.

🌿 **Tulsi (Holy Basil)** - Have Tulsi tea 2-3 times daily. It's excellent for respiratory health.

🧄 **Golden Milk** - Turmeric with warm milk, black pepper, and ghee before bed.

**Daily Practices**:
- Start morning with warm lemon water
- Practice oil pulling (Gandusha)
- Include all 6 tastes in your meals

**Seasonal Tip**: During monsoon and winter, increase warm, cooked foods and reduce raw foods.

Would you like personalized recommendations based on your dosha?`,
      default: `Thank you for your question. Based on Ayurvedic principles, I'd be happy to help you.

Could you tell me more about:
1. Your primary health concern
2. Your current diet and lifestyle
3. Any specific symptoms you're experiencing

This will help me provide more personalized Ayurvedic recommendations.

You can also take our **Prakriti Assessment** to understand your unique body constitution! 🌿`,
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("digest") || lowerMessage.includes("stomach") || lowerMessage.includes("constip")) {
      return responses.digestion;
    } else if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety") || lowerMessage.includes("relax")) {
      return responses.stress;
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia") || lowerMessage.includes("rest")) {
      return responses.sleep;
    } else if (lowerMessage.includes("immun") || lowerMessage.includes("cold") || lowerMessage.includes("flu") || lowerMessage.includes("sick")) {
      return responses.immunity;
    }
    
    return responses.default;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse = await generateAIResponse(inputValue);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // In production, this would use the Web Speech API
      setTimeout(() => setIsListening(false), 3000);
    }
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
            <Button className="w-full gap-2" onClick={() => setMessages([welcomeMessage])}>
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
                <p className="text-xs text-muted-foreground">Ayurvedic Health Assistant</p>
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
            
            {isLoading && (
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
