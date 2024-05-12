"use client";
import { changeThemeOfUser, getAuthorById } from "@/actions/user.actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AppearancePage = () => {
  return (
    <div className=" max-w-3xl mx-auto">
      <h1 className=" text-xl font-semibold">Appearance</h1>
      <p>Manage settings for your booking appearance</p>

      <div className=" my-5">
        <Card className=" ">
          <CardHeader className=" border-b">
            <h3 className="  font-semibold">Dashboard Theme</h3>
            <p className=" text-sm">
              This only applies to your logged in dashboard
            </p>
          </CardHeader>

          <CardContent>
            <div className=" grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
              <AppearanceCard
                title="System default"
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
      <div className=" my-5">
        <Card className=" ">
          <CardHeader className=" border-b">
            <h3 className="  font-semibold">Booking Page Theme</h3>
            <p className=" text-sm">
              This only applies to your public booking pages
            </p>
          </CardHeader>

          <CardContent>
            <div className=" grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
              <AppearanceCard
                forBookingPage
                title="System"
                img="/images/theme/theme-system.svg"
                theme="system"
              />
              <AppearanceCard
                forBookingPage
                title="Light"
                img="/images/theme/theme-light.svg"
                theme="light"
              />
              <AppearanceCard
                forBookingPage
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
  forBookingPage = false,
}: {
  title: string;
  img: string;
  theme: string;
  forBookingPage?: boolean;
}) => {
  const { setTheme, theme: currentTheme } = useTheme();
  const { userId } = useAuth();
  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      return await getAuthorById(userId!!);
    },
    enabled: !!userId,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (theme: string) => {
      // change theme of user
      console.log("change theme of user", theme);
      if (!userId) return;
      await changeThemeOfUser(userId, theme);
      return theme;
    },
    onSuccess: (data) => {
      toast.success(`Theme changed successfully to ${data} mode `);
      queryClient.invalidateQueries();
    },
  });

  return (
    <div
      onClick={() => {
        if (forBookingPage) {
          // change booking page theme
          console.log("change booking page theme", theme);
          mutate(theme);
        } else {
          setTheme(theme);
        }
      }}
      className=" cursor-pointer hover:scale-95 active:scale-100 flex flex-col items-center justify-center"
    >
      <img
        src={img}
        alt="theme"
        className={`rounded-lg ${
          forBookingPage
            ? userData?.publicMetadata?.theme === theme && " border-4"
            : currentTheme === theme && " border-4"
        } border-primary`}
      />

      <p className=" mt-2">{title}</p>
    </div>
  );
};

export default AppearancePage;
