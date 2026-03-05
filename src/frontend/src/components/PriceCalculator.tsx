import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Check, Clock, TrendingUp, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { Package, PackageCategory } from "../App";

// ─── Service Config ──────────────────────────────────────────────────────────

const SERVICES = [
  {
    key: "service-a",
    name: "Followers",
    emoji: "📦",
    ratePerUnit: 35,
    baseUnit: 1000,
    min: 1000,
    max: 100000,
    delivery: "1–2 hours",
    color: "oklch(0.58 0.22 264)",
    glow: "oklch(0.58 0.22 264 / 0.45)",
    accent: "oklch(0.68 0.22 264)",
  },
  {
    key: "service-b",
    name: "Likes",
    emoji: "❤️",
    ratePerUnit: 10,
    baseUnit: 1000,
    min: 1000,
    max: 100000,
    delivery: "30 mins–2 hours",
    color: "oklch(0.60 0.24 15)",
    glow: "oklch(0.60 0.24 15 / 0.45)",
    accent: "oklch(0.70 0.24 15)",
  },
  {
    key: "service-c",
    name: "Views",
    emoji: "👀",
    ratePerUnit: 5,
    baseUnit: 10000,
    min: 10000,
    max: 1000000,
    delivery: "2–4 hours",
    color: "oklch(0.60 0.2 195)",
    glow: "oklch(0.60 0.2 195 / 0.45)",
    accent: "oklch(0.70 0.2 195)",
  },
] as const;

const CATEGORY_MAP: Record<string, PackageCategory> = {
  "service-a": "Followers",
  "service-b": "Likes",
  "service-c": "Views",
};

const SERVICE_TAB_OCIDS = [
  "calculator.service_a.tab",
  "calculator.service_b.tab",
  "calculator.service_c.tab",
] as const;

// ─── Props ───────────────────────────────────────────────────────────────────

interface PriceCalculatorProps {
  onOrderClick: (pkg: Package) => void;
  onBack: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PriceCalculator({
  onOrderClick,
  onBack,
}: PriceCalculatorProps) {
  const [selectedService, setSelectedService] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const service = SERVICES[selectedService];
  const qty = Number.parseInt(quantity) || 0;
  const totalPrice =
    qty > 0
      ? Number.parseFloat(
          ((qty / service.baseUnit) * service.ratePerUnit).toFixed(2),
        )
      : 0;
  const isValid = qty >= service.min && qty <= service.max;

  let errorMsg: string | null = null;
  if (quantity !== "" && qty < service.min) {
    errorMsg = `Minimum quantity is ${service.min.toLocaleString()}`;
  } else if (qty > service.max) {
    errorMsg = `Maximum quantity is ${service.max.toLocaleString()}`;
  }

  const formulaLabel = `₹${service.ratePerUnit} per ${service.baseUnit.toLocaleString()} units`;

  // Trigger scale animation when totalPrice changes
  useEffect(() => {
    if (totalPrice > 0) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(t);
    }
  }, [totalPrice]);

  const handleServiceSwitch = (index: number) => {
    setSelectedService(index);
    setQuantity("");
  };

  const handleConfirmOrder = () => {
    const pkg: Package = {
      quantity: qty.toLocaleString(),
      quantityNum: qty,
      category: CATEGORY_MAP[service.key],
      price: totalPrice,
      priceDisplay: `₹${totalPrice.toFixed(2)}`,
      label: `${qty.toLocaleString()} ${service.name} – ₹${totalPrice.toFixed(2)}`,
      delivery: service.delivery,
    };
    setConfirmOpen(false);
    onOrderClick(pkg);
  };

  const showSummary = quantity !== "" && qty > 0;

  return (
    <div
      data-ocid="calculator.page"
      className="flex flex-col min-h-screen"
      style={{ background: "var(--navy-deep)" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3"
        style={{
          background: "oklch(0.08 0.03 260 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.22 0.055 260 / 0.6)",
        }}
      >
        <button
          type="button"
          data-ocid="calculator.back.button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
          style={{
            background: "oklch(0.17 0.045 260)",
            color: "oklch(0.7 0.08 260)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "oklch(0.22 0.055 260)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "oklch(0.17 0.045 260)";
          }}
          aria-label="Back to home"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 text-center">
          <h1
            className="display-font text-xl font-black leading-none"
            style={{ color: "oklch(0.98 0.01 250)" }}
          >
            Price Calculator
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.07 260)" }}
          >
            Custom quantity pricing
          </p>
        </div>
        <div className="w-9" aria-hidden="true" />
      </header>

      <div className="flex-1 px-4 py-5 space-y-4 pb-8">
        {/* ── Service Tabs ── */}
        <div>
          <p
            className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.5 0.06 255)" }}
          >
            Select Service
          </p>
          <div
            className="flex rounded-xl p-1 gap-1"
            style={{ background: "oklch(0.14 0.04 260)" }}
          >
            {SERVICES.map((s, i) => {
              const isActive = selectedService === i;
              return (
                <button
                  type="button"
                  key={s.key}
                  data-ocid={SERVICE_TAB_OCIDS[i]}
                  onClick={() => handleServiceSwitch(i)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: s.color,
                          color: "oklch(0.98 0.005 260)",
                          boxShadow: `0 2px 12px ${s.glow}`,
                        }
                      : {
                          color: "oklch(0.55 0.06 255)",
                          background: "transparent",
                        }
                  }
                >
                  <span className="text-base leading-none">{s.emoji}</span>
                  <span className="text-xs">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Service Detail Card ── */}
        <div
          className="rounded-2xl p-5 fade-in"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.06 265) 0%, oklch(0.12 0.04 250) 100%)",
            border: `1px solid ${service.color}`,
            boxShadow: `0 4px 32px ${service.glow}`,
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Service name */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: `${service.color} / 0.15`,
                border: `1px solid ${service.color} / 0.4`,
              }}
            >
              {service.emoji}
            </div>
            <div>
              <p
                className="display-font text-xl font-black leading-none"
                style={{ color: "oklch(0.97 0.01 250)" }}
              >
                {service.name}
              </p>
              <p
                className="text-xs mt-0.5 flex items-center gap-1"
                style={{ color: "oklch(0.6 0.06 255)" }}
              >
                <Zap className="w-3 h-3 inline" />
                {service.delivery} delivery
              </p>
            </div>
          </div>

          {/* Rate rows */}
          <div className="space-y-3">
            <ServiceInfoRow
              label="Rate"
              value={formulaLabel}
              accent={service.accent}
              highlight
            />
            <div
              className="w-full h-px"
              style={{ background: "oklch(0.25 0.055 260 / 0.4)" }}
            />
            <ServiceInfoRow
              label="Min Quantity"
              value={service.min.toLocaleString()}
              accent={service.accent}
            />
            <div
              className="w-full h-px"
              style={{ background: "oklch(0.25 0.055 260 / 0.4)" }}
            />
            <ServiceInfoRow
              label="Max Quantity"
              value={service.max.toLocaleString()}
              accent={service.accent}
            />
          </div>
        </div>

        {/* ── Quantity Input ── */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "oklch(0.14 0.042 260)",
            border: "1px solid oklch(0.24 0.058 260 / 0.7)",
          }}
        >
          <label
            htmlFor="calc-quantity"
            className="block text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.65 0.07 255)" }}
          >
            Enter Quantity
          </label>
          <input
            id="calc-quantity"
            type="number"
            data-ocid="calculator.quantity.input"
            placeholder={`e.g. ${service.min.toLocaleString()}`}
            value={quantity}
            min={service.min}
            max={service.max}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-4 rounded-xl text-2xl font-black outline-none transition-all"
            style={{
              background: "oklch(0.10 0.03 260)",
              border: errorMsg
                ? "1px solid oklch(0.62 0.22 15)"
                : isValid && qty > 0
                  ? `1px solid ${service.color}`
                  : "1px solid oklch(0.22 0.05 260 / 0.7)",
              color: "oklch(0.92 0.01 250)",
              fontFamily: '"Cabinet Grotesk", "Outfit", sans-serif',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = `1px solid ${service.color}`;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${service.glow}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
              if (errorMsg) {
                e.currentTarget.style.border = "1px solid oklch(0.62 0.22 15)";
              } else if (isValid && qty > 0) {
                e.currentTarget.style.border = `1px solid ${service.color}`;
              } else {
                e.currentTarget.style.border =
                  "1px solid oklch(0.22 0.05 260 / 0.7)";
              }
            }}
          />
          {/* Helper text */}
          <p className="text-xs mt-2" style={{ color: "oklch(0.5 0.05 255)" }}>
            Min:{" "}
            <span style={{ color: "oklch(0.65 0.07 255)" }}>
              {service.min.toLocaleString()}
            </span>{" "}
            – Max:{" "}
            <span style={{ color: "oklch(0.65 0.07 255)" }}>
              {service.max.toLocaleString()}
            </span>
          </p>

          {/* Error message */}
          {errorMsg && (
            <p
              data-ocid="calculator.quantity.error_state"
              className="text-xs mt-2 font-semibold flex items-center gap-1.5"
              style={{ color: "oklch(0.72 0.22 15)" }}
            >
              <X className="w-3 h-3 flex-shrink-0" />
              {errorMsg}
            </p>
          )}
        </div>

        {/* ── Live Summary Card ── */}
        {showSummary && (
          <div
            data-ocid="calculator.summary.panel"
            className="rounded-2xl p-5 fade-in-up"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.16 0.055 265 / 0.95) 0%, oklch(0.13 0.04 255 / 0.95) 100%)",
              border: `1px solid ${service.color}`,
              boxShadow: `0 4px 32px ${service.glow}`,
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Summary header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: `${service.color} / 0.15`,
                  border: `1px solid ${service.color} / 0.3`,
                }}
              >
                <TrendingUp
                  className="w-4 h-4"
                  style={{ color: service.accent }}
                />
              </div>
              <p
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.75 0.08 260)" }}
              >
                Live Summary
              </p>
            </div>

            {/* Summary rows */}
            <div className="space-y-3 mb-2">
              <SummaryRow
                label="Selected Service"
                value={`${service.emoji} ${service.name}`}
              />
              <Divider />
              <SummaryRow label="Quantity" value={qty.toLocaleString()} />
              <Divider />
              <SummaryRow label="Price Per Unit" value={formulaLabel} />
              <Divider />
              <SummaryRow
                label="Est. Delivery"
                value={service.delivery}
                icon={<Clock className="w-3 h-3" />}
              />
              <Divider />

              {/* Total price with animation */}
              <div className="flex items-center justify-between pt-1">
                <span
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.6 0.06 255)" }}
                >
                  Total Price
                </span>
                <span
                  className="display-font text-3xl font-black"
                  style={{
                    color: service.accent,
                    textShadow: `0 0 20px ${service.glow}`,
                    transform: animating ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.3s ease",
                    display: "inline-block",
                  }}
                >
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Place Order Button ── */}
        <button
          type="button"
          data-ocid="calculator.place_order.button"
          disabled={!isValid || qty === 0}
          onClick={() => setConfirmOpen(true)}
          className="w-full py-4 rounded-xl text-base font-black flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={
            isValid && qty > 0
              ? {
                  background: `linear-gradient(135deg, ${service.accent} 0%, ${service.color} 100%)`,
                  color: "oklch(0.98 0.005 260)",
                  boxShadow: `0 4px 24px ${service.glow}, 0 2px 8px rgba(0,0,0,0.4)`,
                  cursor: "pointer",
                }
              : {
                  background: "oklch(0.18 0.04 260)",
                  color: "oklch(0.42 0.05 260)",
                  cursor: "not-allowed",
                }
          }
          onMouseEnter={(e) => {
            if (isValid && qty > 0) {
              e.currentTarget.style.opacity = "0.92";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (isValid && qty > 0) {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          🚀 Place Order
          {isValid && qty > 0 && (
            <span
              className="text-sm font-bold opacity-80"
              style={{ marginLeft: "2px" }}
            >
              · ₹{totalPrice.toFixed(2)}
            </span>
          )}
        </button>

        {/* ── Footer ── */}
        <div className="pt-2 text-center">
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
      </div>

      {/* ── Confirmation Dialog ── */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          data-ocid="calculator.confirm_order.dialog"
          className="max-w-[360px] rounded-2xl border-0 p-0 overflow-hidden"
          style={{
            background: "oklch(0.13 0.038 260)",
            border: `1px solid ${service.color}`,
            boxShadow: `0 8px 64px ${service.glow}, 0 2px 16px rgba(0,0,0,0.6)`,
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

          <div className="px-6 pt-4 pb-2 space-y-3">
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: "oklch(0.17 0.048 260)",
                border: "1px solid oklch(0.26 0.06 260 / 0.7)",
              }}
            >
              <ConfirmRow
                label="Service"
                value={`${service.emoji} ${service.name}`}
              />
              <Divider />
              <ConfirmRow label="Quantity" value={qty.toLocaleString()} />
              <Divider />
              <ConfirmRow label="Price Per Unit" value={formulaLabel} />
              <Divider />
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.55 0.06 255)" }}
                >
                  Total Price
                </span>
                <span
                  className="display-font text-2xl font-black"
                  style={{ color: service.accent }}
                >
                  ₹{totalPrice.toFixed(2)}
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

          <DialogFooter className="px-6 pb-6 pt-2 flex gap-3">
            <button
              type="button"
              data-ocid="calculator.confirm_order.cancel_button"
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
              data-ocid="calculator.confirm_order.confirm_button"
              onClick={handleConfirmOrder}
              className="flex-1 py-3 rounded-xl text-sm font-black transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${service.accent} 0%, ${service.color} 100%)`,
                color: "oklch(0.98 0.005 260)",
                boxShadow: `0 4px 16px ${service.glow}`,
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

// ─── Helper components ────────────────────────────────────────────────────────

interface ServiceInfoRowProps {
  label: string;
  value: string;
  accent: string;
  highlight?: boolean;
}

function ServiceInfoRow({
  label,
  value,
  accent,
  highlight,
}: ServiceInfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className="text-sm font-medium flex-shrink-0"
        style={{ color: "oklch(0.6 0.06 255)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold text-right"
        style={{ color: highlight ? accent : "oklch(0.88 0.01 250)" }}
      >
        {value}
      </span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className="text-sm font-medium flex-shrink-0"
        style={{ color: "oklch(0.6 0.06 255)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold text-right flex items-center gap-1"
        style={{ color: "oklch(0.90 0.01 250)" }}
      >
        {icon && <span style={{ color: "oklch(0.55 0.07 255)" }}>{icon}</span>}
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

function Divider() {
  return (
    <div
      className="w-full h-px"
      style={{ background: "oklch(0.25 0.055 260 / 0.5)" }}
    />
  );
}
