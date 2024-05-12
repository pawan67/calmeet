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
import RetroGrid from "@/components/magicui/retro-grid";
import Link from "next/link";
import DotPattern from "@/components/magicui/dot-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
const HeroComponent = () => {
  return (
    <div className=" ">
      <div className="">
        <TextRevealByWord
          className=" -mt-10"
          text="Never Miss a Meeting Again: Calmeet Makes Scheduling Simple"
        />
      </div>

      <div className="relative border flex h-full w-full items-center justify-center overflow-hidden rounded-lg  bg-background py-20 md:shadow-xl">
        <DotPattern
          className={cn(
            " z-0 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="relative rounded-xl">
          <img
            src="/images/screenshots/screenshot-1-dark.png"
            alt="Hero Image"
            className="hidden z-10 w-[700px] rounded-[inherit] border object-contain shadow-lg dark:block"
          />
          <img
            src="/images/screenshots/screenshot-1-light.png"
            alt="Hero Image"
            className="block z-10 w-[700px] rounded-[inherit] border object-contain shadow-lg dark:hidden"
          />

          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </div>
      <div className="relative my-10  flex h-full w-full  items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <Link href="/dashboard">
          <div
            className={cn(
              "group rounded-full border max-w-[300px]  mt-5 border-black/5 mx-auto  bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Access Calmeet</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </TextShimmer>
          </div>
        </Link>
        <RetroGrid />
      </div>
      <BentoDemo />
    </div>
  );
};

export default HeroComponent;
