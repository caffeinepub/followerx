import {
  AlertCircle,
  ArrowLeft,
  AtSign,
  Check,
  Copy,
  CreditCard,
  Link as LinkIcon,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Package } from "../App";

interface PaymentScreenProps {
  selectedPackage: Package;
  onBackToHome: () => void;
}

const UPI_ID = "shivesh10@fam";
const WHATSAPP_NUMBER = "916388029405";

const CATEGORY_COLORS: Record<string, { accent: string; glow: string }> = {
  Followers: {
    accent: "oklch(0.68 0.22 264)",
    glow: "oklch(0.58 0.22 264 / 0.5)",
  },
  Likes: {
    accent: "oklch(0.70 0.24 15)",
    glow: "oklch(0.60 0.24 15 / 0.5)",
  },
  Views: {
    accent: "oklch(0.70 0.2 195)",
    glow: "oklch(0.60 0.2 195 / 0.5)",
  },
};

export default function PaymentScreen({
  selectedPackage,
  onBackToHome,
}: PaymentScreenProps) {
  const [fullName, setFullName] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [postLink, setPostLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors =
    CATEGORY_COLORS[selectedPackage.category] ?? CATEGORY_COLORS.Followers;
  const needsPostLink =
    selectedPackage.category === "Likes" ||
    selectedPackage.category === "Views";

  const isFormValid =
    fullName.trim().length > 0 &&
    instagramUsername.trim().length > 0 &&
    (!needsPostLink || postLink.trim().length > 0);

  const inputBorder = (filled: boolean) =>
    filled
      ? `1px solid ${colors.accent}`
      : "1px solid oklch(0.22 0.05 260 / 0.7)";

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("input");
      el.value = UPI_ID;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      toast.success("UPI ID copied!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleConfirmOrder = () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    const now = new Date();
    const orderTime = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const message = [
      "Hello, I have completed my payment.",
      "",
      "Order Details",
      `Username: @${instagramUsername.trim()}`,
      `Service: ${selectedPackage.category}`,
      `Quantity: ${selectedPackage.quantity}`,
      `Package Price: ${selectedPackage.priceDisplay}`,
      "",
      `Payment UPI: ${UPI_ID}`,
      `Order Time: ${orderTime}`,
      "",
      "I am attaching the payment screenshot. Please start my order.",
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
  };

  return (
    <div
      data-ocid="payment.page"
      className="flex flex-col min-h-screen"
      style={{ background: "var(--navy-deep)" }}
    >
      {/* Header */}
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
          data-ocid="payment.back_home.button"
          onClick={onBackToHome}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
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
        <div>
          <h1
            className="display-font text-xl font-black leading-none"
            style={{ color: "oklch(0.98 0.01 250)" }}
          >
            Complete Payment
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.07 260)" }}
          >
            {selectedPackage.quantity} {selectedPackage.category} ·{" "}
            {selectedPackage.priceDisplay}
          </p>
        </div>
      </header>

      <div className="flex-1 px-4 py-5 space-y-4 pb-8">
        {/* Order Details Form */}
        <section
          className="rounded-2xl overflow-hidden fade-in"
          style={{
            background: "oklch(0.14 0.042 260)",
            border: "1px solid oklch(0.24 0.058 260 / 0.7)",
          }}
        >
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ borderBottom: "1px solid oklch(0.2 0.05 260 / 0.6)" }}
          >
            <User className="w-4 h-4" style={{ color: colors.accent }} />
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.55 0.08 260)" }}
            >
              Your Details
            </p>
          </div>
          <div className="p-4 space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "oklch(0.65 0.07 255)" }}
              >
                Full Name *
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(0.5 0.06 260)" }}
                />
                <input
                  id="full-name"
                  type="text"
                  data-ocid="payment.full_name.input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                  style={{
                    background: "oklch(0.10 0.03 260)",
                    border: inputBorder(!!fullName),
                    color: "oklch(0.92 0.01 250)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = `1px solid ${colors.accent}`;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.glow}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = inputBorder(!!fullName);
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Instagram Username */}
            <div>
              <label
                htmlFor="instagram-username"
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "oklch(0.65 0.07 255)" }}
              >
                Instagram Username *
              </label>
              <div className="relative">
                <AtSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(0.5 0.06 260)" }}
                />
                <input
                  id="instagram-username"
                  type="text"
                  data-ocid="payment.instagram_username.input"
                  placeholder="your_username"
                  value={instagramUsername}
                  onChange={(e) => setInstagramUsername(e.target.value)}
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                  style={{
                    background: "oklch(0.10 0.03 260)",
                    border: inputBorder(!!instagramUsername),
                    color: "oklch(0.92 0.01 250)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = `1px solid ${colors.accent}`;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.glow}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = inputBorder(
                      !!instagramUsername,
                    );
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Post/Reel Link — only for Likes and Views */}
            {needsPostLink && (
              <div>
                <label
                  htmlFor="post-link"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "oklch(0.65 0.07 255)" }}
                >
                  Post / Reel Link *
                  <span
                    className="ml-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.62 0.22 15 / 0.15)",
                      color: "oklch(0.72 0.18 15)",
                    }}
                  >
                    Required for {selectedPackage.category}
                  </span>
                </label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: "oklch(0.5 0.06 260)" }}
                  />
                  <input
                    id="post-link"
                    type="url"
                    data-ocid="payment.post_link.input"
                    placeholder="https://instagram.com/p/..."
                    value={postLink}
                    onChange={(e) => setPostLink(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                    style={{
                      background: "oklch(0.10 0.03 260)",
                      border: inputBorder(!!postLink),
                      color: "oklch(0.92 0.01 250)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = `1px solid ${colors.accent}`;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.glow}`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = inputBorder(!!postLink);
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Payment Card */}
        <section
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.14 0.042 260)",
            border: "1px solid oklch(0.24 0.058 260 / 0.7)",
          }}
        >
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ borderBottom: "1px solid oklch(0.2 0.05 260 / 0.6)" }}
          >
            <CreditCard
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.18 260)" }}
            />
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.55 0.08 260)" }}
            >
              Pay via UPI
            </p>
          </div>

          <div className="p-4 space-y-4">
            {/* Amount */}
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "oklch(0.1 0.03 260)" }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.6 0.06 255)" }}
              >
                Amount to Pay
              </span>
              <span
                className="display-font text-2xl font-black"
                style={{
                  color: colors.accent,
                  textShadow: `0 0 16px ${colors.glow}`,
                }}
              >
                {selectedPackage.priceDisplay}
              </span>
            </div>

            {/* UPI ID */}
            <div>
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "oklch(0.6 0.06 255)" }}
              >
                UPI ID
              </p>
              <div
                className="flex items-center justify-between gap-3 p-3 rounded-xl"
                style={{
                  background: "oklch(0.58 0.22 264 / 0.08)",
                  border: "1px solid oklch(0.58 0.22 264 / 0.35)",
                }}
              >
                <div>
                  <p
                    className="font-bold text-base tracking-wide"
                    style={{
                      color: "oklch(0.95 0.01 250)",
                      fontFamily: "monospace",
                    }}
                  >
                    {UPI_ID}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.08 260)" }}
                  >
                    Tap to copy
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="payment.copy_upi.button"
                  onClick={handleCopyUPI}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 flex-shrink-0"
                  style={{
                    background: copied
                      ? "oklch(0.55 0.18 150 / 0.25)"
                      : "oklch(0.58 0.22 264 / 0.2)",
                    color: copied
                      ? "oklch(0.72 0.18 150)"
                      : "oklch(0.72 0.2 260)",
                    border: `1px solid ${copied ? "oklch(0.55 0.18 150 / 0.4)" : "oklch(0.58 0.22 264 / 0.4)"}`,
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <div
          className="flex gap-3 p-4 rounded-2xl"
          style={{
            background: "oklch(0.16 0.06 75 / 0.15)",
            border: "1px solid oklch(0.65 0.18 75 / 0.3)",
          }}
        >
          <AlertCircle
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.75 0.18 75)" }}
          />
          <div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: "oklch(0.85 0.1 75)" }}
            >
              How to complete your order
            </p>
            <ol
              className="text-xs space-y-1.5 list-decimal list-inside"
              style={{ color: "oklch(0.65 0.08 255)" }}
            >
              <li>Fill in your details above</li>
              <li>Copy the UPI ID and make the payment</li>
              <li>Click "Confirm Order" to open WhatsApp</li>
              <li>Attach your payment screenshot in the chat</li>
              <li>Press Send — we'll process your order!</li>
            </ol>
          </div>
        </div>

        {/* Confirm Order button */}
        <button
          type="button"
          data-ocid="payment.confirm_order.button"
          onClick={handleConfirmOrder}
          disabled={!isFormValid || isSubmitting}
          className="w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] glow-green"
          style={{
            background: isFormValid
              ? "linear-gradient(135deg, oklch(0.52 0.18 150) 0%, oklch(0.45 0.2 145) 100%)"
              : "oklch(0.18 0.04 260)",
            color: isFormValid
              ? "oklch(0.98 0.005 150)"
              : "oklch(0.42 0.05 260)",
            boxShadow: isFormValid
              ? "0 4px 24px oklch(0.65 0.19 150 / 0.5), 0 2px 8px rgba(0,0,0,0.4)"
              : "none",
            cursor: isFormValid ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (isFormValid) {
              e.currentTarget.style.background =
                "linear-gradient(135deg, oklch(0.58 0.2 150) 0%, oklch(0.5 0.22 145) 100%)";
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid) {
              e.currentTarget.style.background =
                "linear-gradient(135deg, oklch(0.52 0.18 150) 0%, oklch(0.45 0.2 145) 100%)";
            }
          }}
        >
          <MessageCircle className="w-5 h-5" />
          {isSubmitting ? "Processing..." : "Confirm Order via WhatsApp"}
        </button>

        {!isFormValid && (
          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.5 0.07 15)" }}
          >
            {needsPostLink
              ? "Please fill in your name, Instagram username, and post link"
              : "Please fill in your name and Instagram username to continue"}
          </p>
        )}

        {/* Back to Home */}
        <button
          type="button"
          data-ocid="payment.back_home.button"
          onClick={onBackToHome}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: "oklch(0.16 0.04 260)",
            color: "oklch(0.55 0.06 255)",
            border: "1px solid oklch(0.24 0.055 260 / 0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "oklch(0.2 0.05 260)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "oklch(0.16 0.04 260)";
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6 pt-2 text-center">
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
  );
}
