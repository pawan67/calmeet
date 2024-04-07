import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

const HeroComponent = () => {
  return (
    <div>
      <div className=" my-20 max-w-3xl mx-auto ">
        <img
          src="/hero_xmas-rev.webp"
          alt="hero"
          className=" object-cover w-full h-full"
        />
        <div className=" md:text-center mt-10">
          <h1 className=" text-2xl md:text-4xl font-bold ">
            Welcome to CalMeet, Your Ultimate Meeting and Scheduling Solution
          </h1>

          <h3 className=" my-3 md:my-5  md:text-xl font-semibold  text-muted-foreground">
            Your one-stop solution for seamless meeting scheduling. Say goodbye
            to endless email exchanges and hello to streamlined planning and
            collaboration.
          </h3>

          <div>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Everything you need in a <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scheduling app
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default HeroComponent;
