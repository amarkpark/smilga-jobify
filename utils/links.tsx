import { NotebookPen, NotebookTabs, RollerCoaster } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add job",
    icon: <NotebookPen />,
  },
  {
    href: "/jobs",
    label: "all jobs",
    icon: <NotebookTabs />,
  },
  {
    href: "/stats",
    label: "stats",
    icon: <RollerCoaster />,
  },
];

export default links;