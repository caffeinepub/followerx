import {
  ArrowRight,
  AtSign,
  Link as LinkIcon,
  Loader2,
  Package,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { OrderDetails, Package as PackageType } from "../App";

interface OrderModalProps {
  selectedPackage: PackageType;
  onSubmit: (details: OrderDetails) => Promise<void>;
  onClose: () => void;
}

export default function OrderModal({
  selectedPackage,
  onSubmit,
  onClose,
}: OrderModalProps) {
  const [fullName, setFullName] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [postLink, setPostLink] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const needsPostLink =
    selectedPackage.category === "Likes" ||
    selectedPackage.category === "Views";

  useEffect(() => {
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!instagramUsername.trim())
      newErrors.instagramUsername = "Instagram username is required";
    if (needsPostLink && !postLink.trim()) {
      newErrors.postLink = "Post/Reel link is required for this package";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await onSubmit({
        fullName: fullName.trim(),
        instagramUsername: instagramUsername.trim().replace(/^@/, ""),
        selectedPackage,
        postLink: postLink.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: "oklch(0.04 0.02 260 / 0.85)",
        backdropFilter: "blur(4px)",
      }}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        data-ocid="order.modal"
        className="slide-up-modal w-full max-w-[480px] rounded-t-3xl overflow-hidden"
        style={{
          background: "oklch(0.12 0.038 260)",
          border: "1px solid oklch(0.25 0.06 260 / 0.7)",
          borderBottom: "none",
          boxShadow:
            "0 -8px 48px oklch(0.58 0.22 264 / 0.2), 0 -2px 12px rgba(0,0,0,0.5)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "oklch(0.3 0.06 260)" }}
          />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid oklch(0.22 0.05 260 / 0.6)" }}
        >
          <h2
            className="display-font text-xl font-black"
            style={{ color: "oklch(0.98 0.01 250)" }}
          >
            Place Order
          </h2>
          <button
            type="button"
            data-ocid="order.close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "oklch(0.2 0.05 260)",
              color: "oklch(0.6 0.06 255)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.25 0.07 260)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.2 0.05 260)";
            }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected package banner */}
        <div
          className="mx-5 mt-4 p-3 rounded-xl flex items-center gap-3"
          style={{
            background: "oklch(0.58 0.22 264 / 0.12)",
            border: "1px solid oklch(0.58 0.22 264 / 0.35)",
          }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "oklch(0.58 0.22 264 / 0.2)" }}
          >
            <Package
              className="w-5 h-5"
              style={{ color: "oklch(0.72 0.2 260)" }}
            />
          </div>
          <div>
            <p
              className="text-xs font-medium"
              style={{ color: "oklch(0.6 0.08 260)" }}
            >
              Selected Package
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: "oklch(0.95 0.01 250)" }}
            >
              {selectedPackage.quantity} {selectedPackage.category} —{" "}
              {selectedPackage.priceDisplay}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 pb-6 mt-5 space-y-4"
          noValidate
        >
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "oklch(0.75 0.06 255)" }}
            >
              <User className="w-3.5 h-3.5" />
              Full Name
            </label>
            <input
              ref={firstInputRef}
              id="fullName"
              data-ocid="order.name.input"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((p) => ({ ...p, fullName: "" }));
              }}
              autoComplete="name"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "oklch(0.16 0.04 260)",
                border: `1px solid ${errors.fullName ? "oklch(0.65 0.2 25)" : "oklch(0.28 0.065 260)"}`,
                color: "oklch(0.95 0.01 250)",
                fontSize: "16px",
              }}
              onFocus={(e) => {
                if (!errors.fullName)
                  e.currentTarget.style.borderColor = "oklch(0.58 0.22 264)";
              }}
              onBlur={(e) => {
                if (!errors.fullName)
                  e.currentTarget.style.borderColor = "oklch(0.28 0.065 260)";
              }}
            />
            {errors.fullName && (
              <p
                data-ocid="order.name.error_state"
                className="text-xs font-medium"
                style={{ color: "oklch(0.65 0.2 25)" }}
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Instagram Username */}
          <div className="space-y-1.5">
            <label
              htmlFor="instagram"
              className="flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "oklch(0.75 0.06 255)" }}
            >
              <AtSign className="w-3.5 h-3.5" />
              Instagram Username
            </label>
            <input
              id="instagram"
              data-ocid="order.instagram.input"
              type="text"
              placeholder="@username"
              value={instagramUsername}
              onChange={(e) => {
                setInstagramUsername(e.target.value);
                setErrors((p) => ({ ...p, instagramUsername: "" }));
              }}
              autoComplete="username"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "oklch(0.16 0.04 260)",
                border: `1px solid ${errors.instagramUsername ? "oklch(0.65 0.2 25)" : "oklch(0.28 0.065 260)"}`,
                color: "oklch(0.95 0.01 250)",
                fontSize: "16px",
              }}
              onFocus={(e) => {
                if (!errors.instagramUsername)
                  e.currentTarget.style.borderColor = "oklch(0.58 0.22 264)";
              }}
              onBlur={(e) => {
                if (!errors.instagramUsername)
                  e.currentTarget.style.borderColor = "oklch(0.28 0.065 260)";
              }}
            />
            {errors.instagramUsername && (
              <p
                data-ocid="order.instagram.error_state"
                className="text-xs font-medium"
                style={{ color: "oklch(0.65 0.2 25)" }}
              >
                {errors.instagramUsername}
              </p>
            )}
          </div>

          {/* Post/Reel Link (conditional) */}
          {needsPostLink && (
            <div className="space-y-1.5">
              <label
                htmlFor="postLink"
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "oklch(0.75 0.06 255)" }}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Post / Reel Link
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                  style={{
                    background: "oklch(0.58 0.22 264 / 0.2)",
                    color: "oklch(0.72 0.2 260)",
                  }}
                >
                  Required
                </span>
              </label>
              <input
                id="postLink"
                data-ocid="order.postlink.input"
                type="url"
                placeholder="https://www.instagram.com/p/..."
                value={postLink}
                onChange={(e) => {
                  setPostLink(e.target.value);
                  setErrors((p) => ({ ...p, postLink: "" }));
                }}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: "oklch(0.16 0.04 260)",
                  border: `1px solid ${errors.postLink ? "oklch(0.65 0.2 25)" : "oklch(0.28 0.065 260)"}`,
                  color: "oklch(0.95 0.01 250)",
                  fontSize: "16px",
                }}
                onFocus={(e) => {
                  if (!errors.postLink)
                    e.currentTarget.style.borderColor = "oklch(0.58 0.22 264)";
                }}
                onBlur={(e) => {
                  if (!errors.postLink)
                    e.currentTarget.style.borderColor = "oklch(0.28 0.065 260)";
                }}
              />
              {errors.postLink && (
                <p
                  data-ocid="order.postlink.error_state"
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  {errors.postLink}
                </p>
              )}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            data-ocid="order.submit_button"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
            style={{
              background: isSubmitting
                ? "oklch(0.4 0.1 264)"
                : "oklch(0.58 0.22 264)",
              color: "oklch(0.98 0.005 260)",
              boxShadow: isSubmitting
                ? "none"
                : "0 4px 20px oklch(0.58 0.22 264 / 0.5)",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
