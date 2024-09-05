import Decoration from "@/components/home-screen/decoration";
import Header from "@/components/home-screen/header";
import Hero from "@/components/home-screen/hero";
import { memo } from "react";

export default memo(function HomePage() {
  return (
    <div className="min-h-dvh relative pt-10">
      <Decoration />
      <Header />
      <Hero />
    </div>
  );
});
