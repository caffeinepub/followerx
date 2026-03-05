import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface AIChatbotProps {
  onBack: () => void;
}

const QUICK_REPLIES = [
  { label: "📦 Followers Pricing", query: "followers pricing" },
  { label: "❤️ Likes Pricing", query: "likes pricing" },
  { label: "👀 Views Pricing", query: "views pricing" },
  { label: "💳 How to Pay", query: "how to pay" },
  { label: "📱 How to Order", query: "how to order" },
  { label: "📞 Contact Support", query: "contact support" },
];

function getBotResponse(input: string): string {
  const text = input.toLowerCase().trim();

  // ── App-knowledge checks ────────────────────────────────────────────────

  if (/follower|follow/.test(text)) {
    return "Here are our **Followers packages**:\n\n• 1,000 Followers – ₹25\n• 5,000 Followers – ₹125\n• 10,000 Followers – ₹250\n• 1,00,000 Followers – ₹2,500\n\nAll packages include real, high-quality followers with fast delivery! 🚀";
  }

  if (/\blike\b|\blikes\b/.test(text)) {
    return "Here are our **Likes packages**:\n\n• 1,000 Likes – ₹8\n• 5,000 Likes – ₹40\n• 10,000 Likes – ₹80\n• 1,00,000 Likes – ₹800\n\nLikes are delivered within 30 minutes to 24 hours! ❤️";
  }

  if (/\bview\b|\bviews\b|\breel\b/.test(text)) {
    return "Here are our **Views packages**:\n\n• 10,000 Views – ₹10\n• 20,000 Views – ₹20\n• 50,000 Views – ₹35\n\nBoost your reel visibility instantly! 👀";
  }

  if (/price|pricing|cost|package|plan|rate|cheap|affordable/.test(text)) {
    return "We offer three types of services:\n\n📦 **Followers**: Starting at ₹25 for 1,000\n❤️ **Likes**: Starting at ₹8 for 1,000\n👀 **Views**: Starting at ₹10 for 10,000\n\nWhich service are you interested in? Just ask and I'll share detailed pricing!";
  }

  if (/\bpay\b|\bpayment\b|\bupi\b|how to pay|gpay|phonepe|paytm/.test(text)) {
    return "Payment is simple and secure! 💳\n\n1. Select your package on the home screen\n2. Fill in your order details\n3. You'll see our **UPI ID** on the payment screen\n4. Make the payment via any UPI app (GPay, PhonePe, Paytm)\n5. Click **Confirm Order** to send your order via WhatsApp\n6. Attach your payment screenshot in WhatsApp\n\nYour order will be processed after payment confirmation!";
  }

  if (
    /\border\b|how to order|\bbuy\b|\bpurchase\b|place order|\bget\b/.test(text)
  ) {
    return "Ordering is super easy! 🛒\n\n1. Go to the **Home screen**\n2. Select a category (Followers, Likes, or Views)\n3. Choose your package\n4. Click **Place Order**\n5. Enter your **Name** and **Instagram Username**\n6. For Likes/Views, paste your **Post/Reel link**\n7. Complete payment via UPI\n8. Your order starts within hours!\n\nNeed help? Contact us on WhatsApp: **8543990002** 📱";
  }

  if (/telegram|channel|t\.me|updates|offer/.test(text)) {
    return "Join our official Telegram channel for exclusive offers and updates! 📢\n\n👉 **https://t.me/trustedsells**\n\nYou'll get notified about special deals, discounts, and service updates!";
  }

  if (/whatsapp|contact|support|\bhelp\b|\bnumber\b|\bphone\b/.test(text)) {
    return "You can reach our support team anytime! 📞\n\n**WhatsApp:** 8543990002\n**Telegram:** https://t.me/trustedsells\n\nOwner: **Atharva**\n\nWe typically respond within a few minutes during business hours!";
  }

  if (/boostly|\bapp\b|\babout\b|what is|\bwho\b/.test(text)) {
    return "**Boostly X** is a premium Instagram growth service! 🚀\n\nWe help you grow your Instagram presence with:\n• Real, high-quality **Followers**\n• Instant **Likes** for your posts\n• Viral **Views** for your reels\n\n**Owner:** Atharva\n**Support:** WhatsApp 8543990002\n**Telegram:** https://t.me/trustedsells\n\nFast delivery, genuine results, affordable prices!";
  }

  if (/delivery|\btime\b|\bfast\b|\bwhen\b|how long/.test(text)) {
    return "Our delivery times are super fast! ⚡\n\n📦 **Followers**: 1–24 hours\n❤️ **Likes**: 30 minutes – 12 hours\n👀 **Views**: 30 minutes – 4 hours\n\nLarger packages may take slightly longer. We always aim for the fastest possible delivery!";
  }

  if (
    /\bhi\b|\bhello\b|\bhey\b|\bhelo\b|\bhii\b|namaste|good morning|good evening/.test(
      text,
    )
  ) {
    return "Hello! 👋 Welcome to **Boostly X AI Assistant**!\n\nI'm here to help you with:\n• Package pricing & details\n• How to place orders\n• Payment information\n• General questions\n\nWhat can I help you with today? 😊";
  }

  if (/thank|thanks|\bthnx\b|\bthx\b/.test(text)) {
    return "You're welcome! 😊 Feel free to ask if you need anything else. Have a great day! 🚀";
  }

  // ── General world knowledge ─────────────────────────────────────────────

  if (/instagram|\binsta\b|\big\b|\baccount\b|\bprofile\b/.test(text)) {
    return "Instagram is one of the world's largest social media platforms with over 2 billion active users! 📸\n\nKey features:\n• Posts, Stories, Reels, IGTV\n• Shopping & Business tools\n• Creator monetization\n\nWant to boost your Instagram presence? Check out our affordable packages! 🚀";
  }

  if (/social media|facebook|twitter|youtube|tiktok|snapchat/.test(text)) {
    return "Social media platforms have revolutionized how we connect and share! 🌐\n\nTop platforms in 2024:\n• Instagram – 2B+ users\n• YouTube – 2.7B users\n• TikTok – 1.5B+ users\n• Facebook – 3B+ users\n\nGrowing your social presence is key to success in today's digital world!";
  }

  if (
    /business|marketing|\bbrand\b|entrepreneur|startup|\bmoney\b|\bearn\b/.test(
      text,
    )
  ) {
    return "Digital marketing and social media are crucial for modern business success! 💼\n\nKey strategies:\n• Build a strong social media presence\n• Create engaging content consistently\n• Use analytics to understand your audience\n• Collaborate with influencers\n\nA strong Instagram presence can significantly boost your business! 📈";
  }

  if (
    /technology|\btech\b|\bai\b|artificial intelligence|machine learning|\bcoding\b|\bprogramming\b|\bsoftware\b/.test(
      text,
    )
  ) {
    return "Technology is advancing faster than ever! 💻\n\nTrending in 2024:\n• Artificial Intelligence & ChatGPT\n• Web3 & Blockchain\n• 5G connectivity\n• Cloud computing\n• Cybersecurity\n\nAI is transforming every industry, from social media algorithms to business automation! 🤖";
  }

  if (/internet|website|\bonline\b|\bdigital\b|\bweb\b/.test(text)) {
    return "The internet connects over 5 billion people worldwide! 🌍\n\nFun facts:\n• 5.4 billion internet users globally\n• 4.9 billion social media users\n• 500 hours of video uploaded to YouTube every minute\n• Internet economy worth $30+ trillion\n\nThe digital world offers unlimited opportunities!";
  }

  // ── Fallback ────────────────────────────────────────────────────────────
  return "That's an interesting question! 🤔 I'm specialized in helping with **Boostly X** services and general knowledge.\n\nFor app support, I can help with:\n• Package pricing (Followers, Likes, Views)\n• How to order\n• Payment process\n• Contact information\n\nFor urgent help, contact us on **WhatsApp: 8543990002** or **Telegram: https://t.me/trustedsells** 📱";
}

/** Renders bot message text: \n → <br/>, **text** → <strong> */
function BotMessageContent({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const nodes: React.ReactNode[] = [];

  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={nodes.length}>{part.slice(2, -2)}</strong>);
    } else {
      const lines = part.split("\n");
      lines.forEach((line, li) => {
        nodes.push(line);
        if (li < lines.length - 1)
          nodes.push(<br key={`br-${nodes.length}`} />);
      });
    }
  }

  return <span>{nodes}</span>;
}

export default function AIChatbot({ onBack }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi! I'm Boostly X AI Assistant. I can help you with package pricing, ordering, payments, and general questions. How can I help you today? 😊",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message count or typing change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setShowQuickReplies(false);
    setIsTyping(true);

    const delay = 800 + Math.random() * 400;
    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: getBotResponse(trimmed),
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (query: string) => {
    sendMessage(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div
      data-ocid="chat.page"
      className="flex flex-col min-h-screen"
      style={{ background: "var(--navy-deep)" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3"
        style={{
          background: "oklch(0.08 0.03 260 / 0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.22 0.055 260 / 0.6)",
        }}
      >
        <button
          type="button"
          data-ocid="chat.back.button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 flex-shrink-0"
          style={{
            background: "oklch(0.16 0.045 260)",
            border: "1px solid oklch(0.28 0.06 260 / 0.6)",
            color: "oklch(0.72 0.12 260)",
          }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Bot avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 290) 0%, oklch(0.48 0.2 270) 100%)",
            boxShadow: "0 0 14px oklch(0.55 0.22 290 / 0.5)",
          }}
        >
          🤖
        </div>

        <div className="flex flex-col min-w-0">
          <span
            className="display-font text-base font-black leading-none truncate"
            style={{ color: "oklch(0.97 0.01 250)" }}
          >
            AI Assistant
          </span>
          <span className="flex items-center gap-1.5 mt-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: "oklch(0.72 0.22 145)",
                boxShadow: "0 0 6px oklch(0.72 0.22 145 / 0.8)",
              }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.65 0.14 155)" }}
            >
              Online
            </span>
          </span>
        </div>

        <div className="ml-auto flex-shrink-0">
          <Sparkles
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.2 290)" }}
          />
        </div>
      </header>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            data-ocid={`chat.message.item.${idx + 1}`}
            className={`flex items-end gap-2 fade-in ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Bot avatar */}
            {msg.role === "bot" && (
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mb-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 290) 0%, oklch(0.48 0.2 270) 100%)",
                  boxShadow: "0 0 8px oklch(0.55 0.22 290 / 0.35)",
                }}
              >
                🤖
              </div>
            )}

            {/* Bubble */}
            <div
              className="max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={
                msg.role === "user"
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.58 0.22 264) 0%, oklch(0.52 0.2 272) 100%)",
                      color: "oklch(0.98 0.005 260)",
                      borderBottomRightRadius: "4px",
                      boxShadow: "0 2px 12px oklch(0.58 0.22 264 / 0.4)",
                    }
                  : {
                      background: "oklch(0.16 0.045 260)",
                      color: "oklch(0.90 0.01 250)",
                      border: "1px solid oklch(0.26 0.055 260 / 0.7)",
                      borderBottomLeftRadius: "4px",
                      boxShadow: "0 2px 12px oklch(0.0 0.0 0 / 0.3)",
                    }
              }
            >
              {msg.role === "bot" ? (
                <BotMessageContent text={msg.text} />
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {/* Quick reply chips — shown after welcome until first user message */}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 mt-2 pl-9">
            {QUICK_REPLIES.map((qr, i) => (
              <button
                key={qr.query}
                type="button"
                data-ocid={`chat.quick_reply.button.${i + 1}`}
                onClick={() => handleQuickReply(qr.query)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: "oklch(0.19 0.055 270)",
                  color: "oklch(0.78 0.14 270)",
                  border: "1px solid oklch(0.35 0.1 270 / 0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.24 0.08 270)";
                  e.currentTarget.style.borderColor =
                    "oklch(0.5 0.18 280 / 0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "oklch(0.19 0.055 270)";
                  e.currentTarget.style.borderColor =
                    "oklch(0.35 0.1 270 / 0.6)";
                }}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 290) 0%, oklch(0.48 0.2 270) 100%)",
              }}
            >
              🤖
            </div>
            <div
              className="px-4 py-3 rounded-2xl flex items-center gap-1"
              style={{
                background: "oklch(0.16 0.045 260)",
                border: "1px solid oklch(0.26 0.055 260 / 0.7)",
                borderBottomLeftRadius: "4px",
              }}
            >
              <TypingDot delay={0} />
              <TypingDot delay={0.2} />
              <TypingDot delay={0.4} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area ── */}
      <div
        className="sticky bottom-0 px-4 py-3"
        style={{
          background: "oklch(0.08 0.03 260 / 0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid oklch(0.22 0.055 260 / 0.5)",
        }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            data-ocid="chat.input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "oklch(0.14 0.042 260)",
              border: "1px solid oklch(0.26 0.058 260 / 0.7)",
              color: "oklch(0.92 0.01 250)",
              fontSize: "16px", // prevent iOS zoom
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.55 0.22 290 / 0.7)";
              e.currentTarget.style.boxShadow =
                "0 0 0 2px oklch(0.55 0.22 290 / 0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.26 0.058 260 / 0.7)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            type="submit"
            data-ocid="chat.send.button"
            disabled={!inputValue.trim() || isTyping}
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-95"
            style={
              inputValue.trim() && !isTyping
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.22 290) 0%, oklch(0.52 0.2 272) 100%)",
                    color: "oklch(0.98 0.005 260)",
                    boxShadow: "0 2px 12px oklch(0.55 0.22 290 / 0.5)",
                  }
                : {
                    background: "oklch(0.16 0.04 260)",
                    color: "oklch(0.40 0.05 260)",
                    border: "1px solid oklch(0.24 0.055 260 / 0.5)",
                    cursor: "not-allowed",
                  }
            }
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Typing dot ──────────────────────────────────────────────────────────────

function TypingDot({ delay }: { delay: number }) {
  return (
    <span
      className="w-2 h-2 rounded-full inline-block"
      style={{
        background: "oklch(0.55 0.14 270)",
        animation: `typing-dot 1.4s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}
