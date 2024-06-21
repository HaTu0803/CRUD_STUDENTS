import { HiOutlineAcademicCap , HiOutlineHome,   } from "react-icons/hi";
import { HiOutlineCog6Tooth, HiOutlineBanknotes  } from "react-icons/hi2";

export const Adminitems: TMenuItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <HiOutlineHome  />,
  },
  {
    key: "students",
    label: "Students",
    icon: <HiOutlineAcademicCap  />,
  },
  {
    key: "payment",
    label: "Payment",
    icon: <HiOutlineBanknotes />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <HiOutlineCog6Tooth  />,
  },
];

export const DEFAULT_KEY = "home";
