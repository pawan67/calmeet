"use client";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
const HeroComponent = () => {
  const { isSignedIn, isLoaded, user } = useUser();

  return (
    <div className=" ">
      <div className=" my-20   max-w-3xl  ">
        <motion.img
          animate={{
            scale: [0.8, 1],
            // jiggle effect
            rotate: [0, 5, -5, 5, -5, 0],
            // jiggle effect with position
            y: [0, -5, 5, -5, 5, 0],
            x: [0, 5, -5, 5, -5, 0],
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          src="/images/logo.png"
          alt="hero"
          className=" w-36 "
        />
        <div className="  mt-10">
          <h1 className=" text-2xl md:text-4xl font-bold ">
            Welcome to Calmeet,
          </h1>

          <h3 className=" my-3 md:my-5  md:text-xl   text-muted-foreground">
            Your one-stop solution for seamless meeting scheduling. Say goodbye
            to endless email exchanges and hello to streamlined planning and
            collaboration.
          </h3>

          <div>
            {isSignedIn ? (
              <Button className="    rounded-full font-semibold px-5">
                Enter Calmeet
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button className="  rounded-full font-semibold px-5">
                  Get Started
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      <HeroParallax products={products} />
    </div>
  );
};

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export default HeroComponent;
