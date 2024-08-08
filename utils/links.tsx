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
    icon: <NotebookTabs />,
  },
  {
    href: "/jobs",
    label: "all jobs",
    icon: <RollerCoaster />,
  },
  {
    href: "/stats",
    label: "stats",
    icon: <NotebookPen />,
  },
];

export default links;