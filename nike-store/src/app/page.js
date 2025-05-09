"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Footer from "./components/footer";
import InspiringStories from "./components/InspiringStories";
import Navbar from "./components/Navbar";
import MenSection from "./components/MenSection";
import WomenSection from "./components/WomenSection";
import KidsSection from "./components/KidSection";
import OtherProductsSection from "./components/OtherProduct";
import MemberSection from "./components/memberSection";
import { SubscriptionProvider } from "./context/subcriptionContext"; // Import SubscriptionContext

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);

  const handleCartUpdate = () => {
    setCartUpdateTrigger((prev) => prev + 1);
  };

  return (
    <SubscriptionProvider>
      <div>
        <Navbar onCartUpdate={cartUpdateTrigger} />
        <Hero />
        <ProductSection products={products} />
        <MenSection />
        <WomenSection />
        <KidsSection />
        <OtherProductsSection />
        <InspiringStories />
        <MemberSection /> {/* MemberSection will now have access to SubscriptionContext */}
        <Footer />
      </div>
    </SubscriptionProvider>
  );
}
