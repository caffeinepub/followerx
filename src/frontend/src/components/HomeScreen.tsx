import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Clock, Rocket, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Package, PackageCategory } from "../App";

interface HomeScreenProps {
  onOrderClick: (pkg: Package) => void;
  onGoToCalculator: () => void;
  onGoToChat: () => void;
}

const PACKAGES: Record<PackageCategory, Package[]> = {
  Followers: [
    {
      quantity: "1,000",
      quantityNum: 1000,
      category: "Followers",
      price: 35,
      priceDisplay: "₹35",
      label: "1,000 Followers – ₹35",
      delivery: "1–2 hours",
    },
    {
      quantity: "5,000",
      quantityNum: 5000,
      category: "Followers",
      price: 175,
      priceDisplay: "₹175",
      label: "5,000 Followers – ₹175",
      delivery: "2–4 hours",
    },
    {
      quantity: "10,000",
      quantityNum: 10000,
      category: "Followers",
      price: 350,
      priceDisplay: "₹350",
      label: "10,000 Followers – ₹350",
      delivery: "4–8 hours",
    },
    {
      quantity: "50,000",
      quantityNum: 50000,
      category: "Followers",
      price: 1750,
      priceDisplay: "₹1,750",
      label: "50,000 Followers – ₹1,750",
      delivery: "12–24 hours",
    },
    {
      quantity: "1,00,000",
      quantityNum: 100000,
      category: "Followers",
      price: 3500,
      priceDisplay: "₹3,500",
      label: "1,00,000 Followers – ₹3,500",
      delivery: "1–2 days",
      bestValue: true,
    },
  ],
  Likes: [
    {
      quantity: "1,000",
      quantityNum: 1000,
      category: "Likes",
      price: 10,
      priceDisplay: "₹10",
      label: "1,000 Likes – ₹10",
      delivery: "30 mins",
    },
    {
      quantity: "5,000",
      quantityNum: 5000,
      category: "Likes",
      price: 50,
      priceDisplay: "₹50",
      label: "5,000 Likes – ₹50",
      delivery: "1–2 hours",
    },
    {
      quantity: "10,000",
      quantityNum: 10000,
      category: "Likes",
      price: 100,
      priceDisplay: "₹100",
      label: "10,000 Likes – ₹100",
      delivery: "2–4 hours",
    },
    {
      quantity: "50,000",
      quantityNum: 50000,
      category: "Likes",
      price: 500,
      priceDisplay: "₹500",
      label: "50,000 Likes – ₹500",
      delivery: "6–12 hours",
    },
    {
      quantity: "1,00,000",
      quantityNum: 100000,
      category: "Likes",
      price: 1000,
      priceDisplay: "₹1,000",
      label: "1,00,000 Likes – ₹1,000",
      delivery: "12–24 hours",
      bestValue: true,
    },
  ],
  Views: [
    {
      quantity: "10,000",
      quantityNum: 10000,
      category: "Views",
      price: 5,
      priceDisplay: "₹5",
      label: "10,000 Views – ₹5",
      delivery: "30 mins",
    },
    {
      quantity: "50,000",
      quantityNum: 50000,
      category: "Views",
      price: 25,
      priceDisplay: "₹25",
      label: "50,000 Views – ₹25",
      delivery: "1–2 hours",
    },
    {
      quantity: "1,00,000",
      quantityNum: 100000,
      category: "Views",
      price: 50,
      priceDisplay: "₹50",
      label: "1,00,000 Views – ₹50",
      delivery: "2–4 hours",
    },
    {
      quantity: "2,00,000",
      quantityNum: 200000,
      category: "Views",
      price: 100,
      priceDisplay: "₹100",
      label: "2,00,000 Views – ₹100",
      delivery: "4–8 hours",
    },
    {
      quantity: "10,00,000",
      quantityNum: 1000000,
      category: "Views",
      price: 500,
      priceDisplay: "₹500",
      label: "10,00,000 Views – ₹500",
      delivery: "2–3 days",
      bestValue: true,
    },
  ],
};

const TAB_CONFIG: {
  key: PackageCategory;
  label: string;
  emoji: string;
  ocid: string;
  color: string;
  glow: string;
}[] = [
  {
    key: "Followers",
    label: "Followers",
    emoji: "📦",
    ocid: "home.followers.tab",
    color: "oklch(0.58 0.22 264)",
    glow: "oklch(0.58 0.22 264 / 0.45)",
  },
  {
    key: "Likes",
    label: "Likes",
    emoji: "❤️",
    ocid: "home.likes.tab",
    color: "oklch(0.60 0.24 15)",
    glow: "oklch(0.60 0.24 15 / 0.45)",
  },
  {
    key: "Views",
    label: "Views",
    emoji: "👀",
    ocid: "home.views.tab",
    color: "oklch(0.60 0.2 195)",
    glow: "oklch(0.60 0.2 195 / 0.45)",
  },
];

const CATEGORY_COLORS: Record<
  PackageCategory,
  {
    accent: string;
    glow: string;
    badge: string;
    badgeBg: string;
    border: string;
  }
> = {
  Followers: {
    accent: "oklch(0.68 0.22 264)",
    glow: "oklch(0.58 0.22 264 / 0.5)",
    badge: "oklch(0.82 0.18 75)",
    badgeBg: "oklch(0.30 0.12 75)",
    border: "oklch(0.58 0.22 264)",
  },
  Likes: {
    accent: "oklch(0.70 0.24 15)",
    glow: "oklch(0.60 0.24 15 / 0.5)",
    badge: "oklch(0.82 0.18 75)",
    badgeBg: "oklch(0.30 0.12 75)",
    border: "oklch(0.60 0.24 15)",
  },
  Views: {
    accent: "oklch(0.70 0.2 195)",
    glow: "oklch(0.60 0.2 195 / 0.5)",
    badge: "oklch(0.82 0.18 75)",
    badgeBg: "oklch(0.30 0.12 75)",
    border: "oklch(0.60 0.2 195)",
  },
};

export default function HomeScreen({
  onOrderClick,
  onGoToCalculator,
  onGoToChat,
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<PackageCategory>("Followers");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const packages = PACKAGES[activeTab];
  const colors = CATEGORY_COLORS[activeTab];
  const activeTabConfig = TAB_CONFIG.find((t) => t.key === activeTab)!;
  const selectedPkg = selectedIndex !== null ? packages[selectedIndex] : null;

  // Reset selection when tab changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: setSelectedIndex is stable
  useEffect(() => {
    setSelectedIndex(null);
  }, [activeTab]);

  // Scroll to summary when a card is selected
  useEffect(() => {
    if (selectedIndex !== null && summaryRef.current) {
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 150);
    }
  }, [selectedIndex]);

  const handleCardSelect = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  const handlePlaceOrder = () => {
    setConfirmOpen(true);
  };

  const handleConfirmOrder = () => {
    if (selectedPkg) {
      setConfirmOpen(false);
      onOrderClick(selectedPkg);
    }
  };

  return (
    <div
      data-ocid="home.page"
      className="flex flex-col min-h-screen"
      style={{ background: "var(--navy-deep)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between"
        style={{
          background: "oklch(0.08 0.03 260 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.22 0.055 260 / 0.6)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.58 0.22 264 / 0.2)",
              border: "1px solid oklch(0.58 0.22 264 / 0.4)",
            }}
          >
            <Rocket
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.2 260)" }}
            />
          </div>
          <span
            className="display-font text-xl font-black tracking-tight"
            style={{
              color: "oklch(0.98 0.01 250)",
              textShadow: "0 0 20px oklch(0.58 0.22 264 / 0.5)",
            }}
          >
            FollowerX
          </span>
        </div>
        <div
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{
            background: "oklch(0.58 0.22 264 / 0.15)",
            color: "oklch(0.72 0.2 260)",
            border: "1px solid oklch(0.58 0.22 264 / 0.3)",
          }}
        >
          🔥 Fast Delivery
        </div>
      </header>

      {/* Hero banner */}
      <div
        className="mx-4 mt-4 rounded-2xl p-5 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.06 265) 0%, oklch(0.12 0.04 250) 100%)",
          border: "1px solid oklch(0.3 0.09 264 / 0.5)",
          boxShadow: "0 4px 32px oklch(0.58 0.22 264 / 0.15)",
        }}
      >
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.58 0.22 264) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "oklch(0.65 0.18 260)" }}
          >
            Premium Growth Services
          </p>
          <h2
            className="display-font text-2xl font-black leading-tight"
            style={{ color: "oklch(0.98 0.01 250)" }}
          >
            Boost Your Instagram
            <br />
            <span style={{ color: "oklch(0.72 0.22 260)" }}>Instantly</span>
          </h2>
          <p className="text-xs mt-2" style={{ color: "oklch(0.6 0.06 255)" }}>
            Real, high-quality followers, likes & views
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 mt-5">
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ background: "oklch(0.14 0.04 260)" }}
        >
          {TAB_CONFIG.map(({ key, label, emoji, ocid, color, glow }) => {
            const isActive = activeTab === key;
            return (
              <button
                type="button"
                key={key}
                data-ocid={ocid}
                onClick={() => setActiveTab(key)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: color,
                        color: "oklch(0.98 0.005 260)",
                        boxShadow: `0 2px 12px ${glow}`,
                      }
                    : {
                        color: "oklch(0.55 0.06 255)",
                        background: "transparent",
                      }
                }
              >
                <span className="text-base leading-none">{emoji}</span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Package grid */}
      <div className="px-4 mt-4">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "oklch(0.5 0.06 255)" }}
        >
          Choose a Package
        </p>
        <div className="grid grid-cols-2 gap-3">
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.label}
              pkg={pkg}
              index={i + 1}
              colors={colors}
              isSelected={selectedIndex === i}
              onSelect={() => handleCardSelect(i)}
            />
          ))}
        </div>
      </div>

      {/* Custom Price Calculator CTA */}
      <div className="px-4 mt-4">
        <button
          type="button"
          data-ocid="home.calculator.button"
          onClick={onGoToCalculator}
          className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={{
            background: "oklch(0.58 0.22 264 / 0.08)",
            color: "oklch(0.72 0.2 260)",
            border: "1px solid oklch(0.58 0.22 264 / 0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "oklch(0.58 0.22 264 / 0.15)";
            e.currentTarget.style.borderColor = "oklch(0.58 0.22 264 / 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "oklch(0.58 0.22 264 / 0.08)";
            e.currentTarget.style.borderColor = "oklch(0.58 0.22 264 / 0.35)";
          }}
        >
          ⚡ Custom Quantity? Use Price Calculator
        </button>
      </div>

      {/* Order Summary Panel */}
      {selectedPkg && (
        <div
          ref={summaryRef}
          data-ocid="home.order_summary.panel"
          className="mx-4 mt-5 rounded-2xl p-5 fade-in-up"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.055 265 / 0.95) 0%, oklch(0.13 0.04 255 / 0.95) 100%)",
            border: `1px solid ${colors.border} `,
            boxShadow: `0 4px 32px ${colors.glow}, 0 0 0 1px ${colors.border} / 0.3`,
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Summary header */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: `${colors.accent} / 0.15`,
                border: `1px solid ${colors.accent} / 0.3`,
              }}
            >
              <ShoppingBag
                className="w-4 h-4"
                style={{ color: colors.accent }}
              />
            </div>
            <p
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.75 0.08 260)" }}
            >
              Order Summary
            </p>
          </div>

          {/* Summary rows */}
          <div className="space-y-3 mb-5">
            <SummaryDetailRow
              label="Service Type"
              value={`${activeTabConfig.emoji} ${activeTab}`}
            />
            <div
              className="w-full h-px"
              style={{ background: "oklch(0.25 0.055 260 / 0.5)" }}
            />
            <SummaryDetailRow
              label="Package"
              value={`${selectedPkg.quantity} ${activeTab}`}
            />
            <div
              className="w-full h-px"
              style={{ background: "oklch(0.25 0.055 260 / 0.5)" }}
            />
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.6 0.06 255)" }}
              >
                Total Price
              </span>
              <span
                className="display-font text-3xl font-black"
                style={{
                  color: colors.accent,
                  textShadow: `0 0 20px ${colors.glow}`,
                }}
              >
                {selectedPkg.priceDisplay}
              </span>
            </div>
          </div>

          {/* Place Order button */}
          <button
            type="button"
            data-ocid="home.place_order.button"
            onClick={handlePlaceOrder}
            className="w-full py-4 rounded-xl text-base font-black flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
              color: "oklch(0.98 0.005 260)",
              boxShadow: `0 4px 24px ${colors.glow}, 0 2px 8px rgba(0,0,0,0.4)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.92";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🚀 Place Order
          </button>
        </div>
      )}

      {/* AI Chat FAB */}
      <button
        type="button"
        data-ocid="home.ai_chat.button"
        onClick={onGoToChat}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.58 0.22 290) 0%, oklch(0.50 0.20 272) 100%)",
          color: "oklch(0.98 0.005 260)",
          boxShadow:
            "0 4px 24px oklch(0.55 0.22 290 / 0.55), 0 2px 8px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px) scale(1.04)";
          e.currentTarget.style.boxShadow =
            "0 6px 32px oklch(0.55 0.22 290 / 0.7), 0 2px 8px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 24px oklch(0.55 0.22 290 / 0.55), 0 2px 8px rgba(0,0,0,0.4)";
        }}
        aria-label="Open AI Assistant"
      >
        <span className="text-base leading-none">✨</span>
        <span>AI</span>
      </button>

      {/* Footer */}
      <div className="mt-auto px-4 pb-6 pt-6 text-center">
        <p className="text-xs" style={{ color: "oklch(0.38 0.04 260)" }}>
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.5 0.1 260)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          data-ocid="home.confirm_order.dialog"
          className="max-w-[360px] rounded-2xl border-0 p-0 overflow-hidden"
          style={{
            background: "oklch(0.13 0.038 260)",
            border: `1px solid ${colors.border}`,
            boxShadow: `0 8px 64px ${colors.glow}, 0 2px 16px rgba(0,0,0,0.6)`,
          }}
        >
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle
              className="display-font text-xl font-black text-center"
              style={{ color: "oklch(0.97 0.01 250)" }}
            >
              Confirm Your Order
            </DialogTitle>
          </DialogHeader>

          {selectedPkg && (
            <div className="px-6 pt-4 pb-2 space-y-3">
              {/* Details card */}
              <div
                className="rounded-xl p-4 space-y-3"
                style={{
                  background: "oklch(0.17 0.048 260)",
                  border: "1px solid oklch(0.26 0.06 260 / 0.7)",
                }}
              >
                <ConfirmRow
                  label="Service"
                  value={`${activeTabConfig.emoji} ${activeTab}`}
                />
                <div
                  className="w-full h-px"
                  style={{ background: "oklch(0.24 0.055 260 / 0.5)" }}
                />
                <ConfirmRow
                  label="Package"
                  value={`${selectedPkg.quantity} ${activeTab}`}
                />
                <div
                  className="w-full h-px"
                  style={{ background: "oklch(0.24 0.055 260 / 0.5)" }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.55 0.06 255)" }}
                  >
                    Price
                  </span>
                  <span
                    className="display-font text-2xl font-black"
                    style={{ color: colors.accent }}
                  >
                    {selectedPkg.priceDisplay}
                  </span>
                </div>
              </div>

              <p
                className="text-xs text-center pb-1"
                style={{ color: "oklch(0.5 0.05 255)" }}
              >
                You'll complete payment on the next screen
              </p>
            </div>
          )}

          <DialogFooter className="px-6 pb-6 pt-2 flex gap-3">
            <button
              type="button"
              data-ocid="home.confirm_order.cancel_button"
              onClick={() => setConfirmOpen(false)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "oklch(0.19 0.05 260)",
                color: "oklch(0.65 0.06 255)",
                border: "1px solid oklch(0.28 0.06 260 / 0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(0.23 0.056 260)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "oklch(0.19 0.05 260)";
              }}
            >
              <X className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Cancel
            </button>
            <button
              type="button"
              data-ocid="home.confirm_order.confirm_button"
              onClick={handleConfirmOrder}
              className="flex-1 py-3 rounded-xl text-sm font-black transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.border} 100%)`,
                color: "oklch(0.98 0.005 260)",
                boxShadow: `0 4px 16px ${colors.glow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <Check className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Confirm & Pay
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── PackageCard ────────────────────────────────────────────────────────────

interface PackageCardProps {
  pkg: Package;
  index: number;
  colors: {
    accent: string;
    glow: string;
    badge: string;
    badgeBg: string;
    border: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

function PackageCard({
  pkg,
  index,
  colors,
  isSelected,
  onSelect,
}: PackageCardProps) {
  return (
    <div
      data-ocid={`home.package.item.${index}`}
      className="relative rounded-xl p-4 flex flex-col gap-3 select-none"
      style={{
        background: isSelected
          ? "oklch(0.17 0.055 260)"
          : "oklch(0.14 0.042 260)",
        border: isSelected
          ? `2px solid ${colors.border}`
          : "2px solid oklch(0.24 0.058 260 / 0.6)",
        boxShadow: isSelected
          ? `0 0 20px ${colors.glow}, 0 4px 24px rgba(0,0,0,0.4)`
          : "0 2px 12px rgba(0,0,0,0.3)",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Best Value badge */}
      {pkg.bestValue && (
        <div
          className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider z-10"
          style={{
            background: colors.badgeBg,
            color: colors.badge,
            border: `1px solid ${colors.badge} / 0.4`,
            boxShadow: `0 2px 8px ${colors.badgeBg} / 0.6`,
          }}
        >
          ⭐ Best Value
        </div>
      )}

      {/* Selected checkmark overlay */}
      {isSelected && (
        <div
          className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: colors.border,
            boxShadow: `0 0 8px ${colors.glow}`,
          }}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Price */}
      <div
        className="display-font text-2xl font-black leading-none"
        style={{
          color: isSelected ? colors.accent : "oklch(0.95 0.01 250)",
          textShadow: isSelected ? `0 0 16px ${colors.glow}` : "none",
          transition: "color 0.2s ease",
          marginTop: isSelected ? "0" : "0",
        }}
      >
        {pkg.priceDisplay}
      </div>

      {/* Quantity */}
      <div>
        <p
          className="text-sm font-bold"
          style={{ color: "oklch(0.82 0.06 255)" }}
        >
          {pkg.quantity}
        </p>
        <p
          className="text-xs font-medium"
          style={{ color: "oklch(0.55 0.05 255)" }}
        >
          {pkg.category}
        </p>
      </div>

      {/* Delivery time */}
      <div className="flex items-center gap-1">
        <Clock
          className="w-3 h-3 flex-shrink-0"
          style={{ color: "oklch(0.52 0.07 255)" }}
        />
        <span className="text-xs" style={{ color: "oklch(0.52 0.07 255)" }}>
          {pkg.delivery}
        </span>
      </div>

      {/* Select button */}
      <button
        type="button"
        data-ocid={`home.package.select_button.${index}`}
        onClick={onSelect}
        className="w-full py-2 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5"
        style={
          isSelected
            ? {
                background: colors.border,
                color: "oklch(0.98 0.005 260)",
                boxShadow: `0 2px 12px ${colors.glow}`,
              }
            : {
                background: "oklch(0.20 0.05 260)",
                color: "oklch(0.65 0.08 260)",
                border: "1px solid oklch(0.28 0.06 260 / 0.6)",
              }
        }
      >
        {isSelected ? (
          <>
            <Check className="w-3 h-3" />
            Selected
          </>
        ) : (
          "Select"
        )}
      </button>
    </div>
  );
}

// ─── Helper components ───────────────────────────────────────────────────────

function SummaryDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className="text-sm font-medium flex-shrink-0"
        style={{ color: "oklch(0.6 0.06 255)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold text-right"
        style={{ color: "oklch(0.90 0.01 250)" }}
      >
        {value}
      </span>
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className="text-xs font-medium"
        style={{ color: "oklch(0.55 0.06 255)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold"
        style={{ color: "oklch(0.88 0.01 250)" }}
      >
        {value}
      </span>
    </div>
  );
}
