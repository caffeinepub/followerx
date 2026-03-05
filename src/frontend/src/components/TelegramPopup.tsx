import { useEffect, useState } from "react";

interface TelegramPopupProps {
  onClose: () => void;
}

export default function TelegramPopup({ onClose }: TelegramPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    const raf = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleJoinChannel = () => {
    window.open(
      "https://t.me/bdgpridiction1234",
      "_blank",
      "noopener,noreferrer",
    );
    onClose();
  };

  return (
    <dialog
      data-ocid="telegram_popup.modal"
      open
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transition: "opacity 0.3s ease",
        opacity: visible ? 1 : 0,
        border: "none",
        margin: 0,
        maxWidth: "100vw",
        maxHeight: "100vh",
        width: "100%",
        height: "100%",
      }}
      aria-labelledby="telegram-popup-title"
      aria-describedby="telegram-popup-desc"
    >
      {/* Modal Card */}
      <div
        style={{
          background: "oklch(0.16 0.045 260)",
          border: "1px solid oklch(0.28 0.07 260)",
          borderRadius: "1.25rem",
          padding: "2rem 1.5rem",
          maxWidth: "360px",
          width: "100%",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px oklch(0.3 0.08 260 / 0.3)",
          transition:
            "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.88) translateY(20px)",
          opacity: visible ? 1 : 0,
          textAlign: "center",
        }}
      >
        {/* Telegram Icon Circle */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, oklch(0.58 0.22 220), oklch(0.65 0.24 200))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "0 0 24px 6px oklch(0.58 0.22 220 / 0.35)",
          }}
        >
          {/* Telegram Paper-Plane SVG */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-8.609 3.33c-2 .774-3.99 1.555-5.993 2.328-.757.27-1.44.717-1.44 1.578 0 .83.68 1.235 1.39 1.523 1.521.617 3.063 1.188 4.59 1.78l1.34.518c.11.044.163.093.171.204.036.52.066 1.04.099 1.56l.237 3.626c.038.578.332 1.019.933 1.034.35.009.638-.159.892-.383.622-.557 1.23-1.128 1.847-1.69.129-.118.256-.12.384-.004l2.903 2.237c.604.467 1.215.593 1.782.076.36-.327.536-.785.603-1.253.524-3.61 1.036-7.222 1.56-10.832.06-.415.04-.823-.169-1.197a1.502 1.502 0 00-.498-.536z"
              fill="white"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2
          id="telegram-popup-title"
          style={{
            fontFamily: "'Cabinet Grotesk', 'Outfit', system-ui, sans-serif",
            fontSize: "1.375rem",
            fontWeight: 800,
            color: "oklch(0.97 0.01 250)",
            marginBottom: "0.625rem",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Join Our Channel
        </h2>

        {/* Body text */}
        <p
          id="telegram-popup-desc"
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontSize: "0.9375rem",
            color: "oklch(0.62 0.06 255)",
            lineHeight: 1.55,
            marginBottom: "1.75rem",
            padding: "0 0.25rem",
          }}
        >
          Join our official Telegram channel to get updates and offers.
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "oklch(0.25 0.055 260 / 0.6)",
            marginBottom: "1.25rem",
          }}
        />

        {/* Buttons */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {/* Join Channel button */}
          <button
            type="button"
            data-ocid="telegram_popup.primary_button"
            onClick={handleJoinChannel}
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              borderRadius: "0.875rem",
              border: "none",
              background: "linear-gradient(135deg, #2AABEE, #229ED9)",
              color: "#ffffff",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 16px rgba(42, 171, 238, 0.3)",
              transition: "filter 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.filter =
                "brightness(1.1)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.filter =
                "brightness(1)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            {/* Telegram icon small */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-8.609 3.33c-2 .774-3.99 1.555-5.993 2.328-.757.27-1.44.717-1.44 1.578 0 .83.68 1.235 1.39 1.523 1.521.617 3.063 1.188 4.59 1.78l1.34.518c.11.044.163.093.171.204.036.52.066 1.04.099 1.56l.237 3.626c.038.578.332 1.019.933 1.034.35.009.638-.159.892-.383.622-.557 1.23-1.128 1.847-1.69.129-.118.256-.12.384-.004l2.903 2.237c.604.467 1.215.593 1.782.076.36-.327.536-.785.603-1.253.524-3.61 1.036-7.222 1.56-10.832.06-.415.04-.823-.169-1.197a1.502 1.502 0 00-.498-.536z"
                fill="white"
              />
            </svg>
            Join Channel
          </button>

          {/* Close / Continue button */}
          <button
            type="button"
            data-ocid="telegram_popup.close_button"
            onClick={onClose}
            style={{
              width: "100%",
              padding: "0.8125rem 1rem",
              borderRadius: "0.875rem",
              border: "1px solid oklch(0.3 0.07 260)",
              background: "oklch(0.2 0.05 260 / 0.5)",
              color: "oklch(0.65 0.06 255)",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition:
                "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(0.24 0.055 260)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.82 0.04 255)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(0.38 0.08 260)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(0.2 0.05 260 / 0.5)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.65 0.06 255)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "oklch(0.3 0.07 260)";
            }}
          >
            Close / Continue
          </button>
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.75rem",
            color: "oklch(0.38 0.04 255)",
            fontFamily: "'Outfit', system-ui, sans-serif",
          }}
        >
          This message will not appear again.
        </p>
      </div>
    </dialog>
  );
}
