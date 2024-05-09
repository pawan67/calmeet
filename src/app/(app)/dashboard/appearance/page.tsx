"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTheme } from "next-themes";

const AppearancePage = () => {
  return (
    <div className=" max-w-3xl mx-auto">
      <h1 className=" text-xl font-semibold">Appearance</h1>
      <p>Manage settings for your booking appearance</p>

      <div className=" my-5">
        <Card className=" ">
          <CardHeader className=" border-b">
            <h3 className="  font-semibold">App Theme</h3>
            <p className=" text-sm">
              This applies to the current device and browser
            </p>
          </CardHeader>

          <CardContent>
            <div className=" grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
              <AppearanceCard
                title="System"
                img="/images/theme/theme-system.svg"
                theme="system"
              />
              <AppearanceCard
                title="Light"
                img="/images/theme/theme-light.svg"
                theme="light"
              />
              <AppearanceCard
                title="Dark"
                img="/images/theme/theme-dark.svg"
                theme="dark"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AppearanceCard = ({
  title,
  img,
  theme,
}: {
  title: string;
  img: string;
  theme: string;
}) => {
  const { setTheme, theme: currentTheme } = useTheme();

  return (
    <div
      onClick={() => {
        setTheme(theme);
      }}
      className=" flex flex-col items-center justify-center"
    >
      <img
        src={img}
        alt="theme"
        className={`rounded-lg ${
          currentTheme === theme && " border-4"
        } border-primary`}
      />

      <p className=" mt-2">{title}</p>
    </div>
  );
};

export default AppearancePage;
