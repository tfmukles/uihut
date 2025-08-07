"use client";

import Heading from "@/components/ui/title";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { Separator } from "@/layouts/components/ui/separator";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
  name: string;
  url: string;
};

type MenuSection = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const Footer = () => {
  const [menus, setMenus] = useState<MenuSection[]>([]);
  const { copyright } = config.params;

  useEffect(() => {
    // convert JSON data to the required format and filter out 'main'
    const filteredMenus = Object.keys(menu)
      .filter((key) => !key.startsWith("main") && !key.startsWith("dashboard"))
      .map((key) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        links: (menu[key as keyof typeof menu] as MenuItem[]).map((item) => ({
          label: item.name,
          href: item.url,
        })),
      }));
    setMenus(filteredMenus);
  }, [menu]);

  return (
    <footer className="relative z-10 bg-background">
      <Separator />
      <div className="container-md pb-10 pt-[52px]">
        <div className="columns-2 lg:row lg:row-cols-5 md:columns-3">
          {menus.map((menu) => (
            <div key={menu.title} className="mb-10 break-inside-avoid">
              <Heading className="mb-3 !text-base text-foreground" level="h3">
                {menu.title}
              </Heading>
              <ul className="space-y-2.5">
                {menu.links.map((link, i) => (
                  <li key={link.label + i}>
                    <Link
                      className="text-sm text-text-light transition-all hover:text-text hover:underline"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="py-7">
        <div className="container text-center">
          <p
            className="text-sm text-text-light"
            dangerouslySetInnerHTML={markdownify(copyright)}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
