"use client";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import TextShimmer from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import TextRevealByWord from "@/components/magicui/text-reveal";
import { BentoDemo } from "./bento";
import { cn } from "@/lib/utils";
const HeroComponent = () => {
  return (
    <div className=" ">
      <div className="">
        <TextRevealByWord
          className=" -mt-10"
          text="Never Miss a Meeting Again: Calmeet Makes Scheduling Simple"
        />
        
      </div>
      <BentoDemo />
    </div>
  );
};

export default HeroComponent;
