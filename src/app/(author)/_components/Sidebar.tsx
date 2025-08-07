import { NavLink } from "@/partials/NavLink";
import { House, Landmark, Layers2 } from "lucide-react";

const Sidebar = () => {
  const MENU = [
    {
      name: "Dashboard",
      link: "/author/dashboard",
      icon: House,
    },
    {
      name: "Products",
      link: "/author/products",
      icon: Layers2,
    },
    {
      name: "Bank Info",
      link: "/author/bank-info",
      icon: Landmark,
    },
  ];

  return (
    <div className="sticky top-[78px] h-[calc(100svh-78px)] w-64 border-r border-border">
      <div className="flex items-start px-4 py-10">
        <ul className="w-full space-y-2">
          {MENU.map((item, index) => (
            <li key={index}>
              <NavLink
                className="flex items-center rounded-full px-5 py-2"
                activeClassName="bg-white/5"
                href={item.link}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
