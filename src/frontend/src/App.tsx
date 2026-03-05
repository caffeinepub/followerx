import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import AIChatbot from "./components/AIChatbot";
import HomeScreen from "./components/HomeScreen";
import PaymentScreen from "./components/PaymentScreen";
import PriceCalculator from "./components/PriceCalculator";
import SplashScreen from "./components/SplashScreen";
import TelegramPopup from "./components/TelegramPopup";

export type PackageCategory = "Followers" | "Likes" | "Views";

export interface Package {
  quantity: string;
  quantityNum?: number;
  category: PackageCategory;
  price: number;
  priceDisplay: string;
  label: string;
  delivery: string;
  bestValue?: boolean;
}

export interface OrderDetails {
  fullName: string;
  instagramUsername: string;
  selectedPackage: Package;
  postLink: string;
}

type View = "splash" | "home" | "payment" | "calculator" | "chat";

export default function App() {
  const [view, setView] = useState<View>("splash");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setView("home");
      const alreadyShown = localStorage.getItem("followerx_telegram_shown");
      if (!alreadyShown) {
        setShowTelegramPopup(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleTelegramClose = () => {
    localStorage.setItem("followerx_telegram_shown", "true");
    setShowTelegramPopup(false);
  };

  const handleOrderClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setView("payment");
  };

  const handleBackToHome = () => {
    setView("home");
    setSelectedPackage(null);
  };

  const handleGoToCalculator = () => setView("calculator");
  const handleBackFromCalculator = () => setView("home");

  const handleGoToChat = () => setView("chat");
  const handleBackFromChat = () => setView("home");

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{ background: "var(--navy-deep)" }}
    >
      <div className="w-full max-w-[480px] min-h-screen relative flex flex-col">
        {view === "splash" && <SplashScreen />}
        {view === "home" && (
          <HomeScreen
            onOrderClick={handleOrderClick}
            onGoToCalculator={handleGoToCalculator}
            onGoToChat={handleGoToChat}
          />
        )}
        {view === "payment" && selectedPackage && (
          <PaymentScreen
            selectedPackage={selectedPackage}
            onBackToHome={handleBackToHome}
          />
        )}
        {view === "calculator" && (
          <PriceCalculator
            onOrderClick={handleOrderClick}
            onBack={handleBackFromCalculator}
          />
        )}
        {view === "chat" && <AIChatbot onBack={handleBackFromChat} />}
      </div>
      {showTelegramPopup && <TelegramPopup onClose={handleTelegramClose} />}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.19 0.05 260)",
            border: "1px solid oklch(0.3 0.08 260)",
            color: "oklch(0.95 0.01 250)",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
    </div>
  );
}
