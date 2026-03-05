export default function SplashScreen() {
  return (
    <div
      data-ocid="splash.page"
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.06 0.03 270) 0%, oklch(0.09 0.04 255) 40%, oklch(0.12 0.06 245) 100%)",
      }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.58 0.22 264) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.18 210) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Rocket logo */}
      <div className="rocket-bob mb-6 relative">
        <div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, oklch(0.58 0.22 264 / 0.6) 0%, transparent 60%)",
            filter: "blur(16px)",
            transform: "scale(1.3)",
          }}
          aria-hidden="true"
        />
        <img
          src="/assets/generated/rocket-logo-transparent.dim_200x200.png"
          alt="FollowerX rocket logo"
          className="w-28 h-28 relative z-10 drop-shadow-2xl"
        />
      </div>

      {/* App name */}
      <h1
        className="display-font text-5xl font-black tracking-tight fade-in mb-2"
        style={{
          color: "oklch(0.98 0.01 250)",
          textShadow: "0 0 40px oklch(0.58 0.22 264 / 0.8)",
          animationDelay: "0.2s",
        }}
      >
        FollowerX
      </h1>

      {/* Tagline */}
      <p
        className="fade-in text-base font-medium tracking-widest uppercase"
        style={{
          color: "oklch(0.65 0.1 255)",
          animationDelay: "0.5s",
          opacity: 0,
        }}
      >
        Grow Your Social Presence
      </p>

      {/* Bottom loading dots */}
      <div className="absolute bottom-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "oklch(0.58 0.22 264)",
              animation: `glow-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
}
