import { useUser } from "@clerk/nextjs";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Settings2,
  Timer,
  Globe,
  SquareArrowOutUpRight,
  SwatchBook,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getPages(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/event-types",
          label: "Event Types",
          active: pathname.includes("/dashboard/event-types"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/bookings",
          label: "Bookings",
          active: pathname.includes("/dashboard/bookings"),
          icon: Timer,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/appearance",
          label: "Appearance",
          active: pathname.includes("/dashboard/appearance"),
          icon: SwatchBook,
          submenus: [],
        },
        {
          href: "/dashboard/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
