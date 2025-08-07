"use client";

import config from "@/config/config.json";
import { useFilter } from "@/hooks/useFilter";
import { useRestartSetTimeout } from "@/hooks/useRestartTimeout";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { getCookie, setCookie } from "react-use-cookie";

const Announcement = forwardRef<
  HTMLDivElement,
  {
    className?: string;
  }
>(({ className }, ref) => {
  const { setHeight } = useFilter();
  const { enable, content, name } = config.announcement;
  const [isAnnouncementOpen, setAnnouncement] = useState<boolean>();
  const restart = useRestartSetTimeout();

  useEffect(() => {
    if (typeof isAnnouncementOpen !== "boolean") {
      const cookieValue = getCookie(slugify(name + "-announcement"));

      setAnnouncement(
        cookieValue.length === 0 ? true : JSON.parse(cookieValue),
      );
    }
  }, []);

  useEffect(() => {
    const element = document.querySelector("#navbar") as HTMLDivElement;

    restart(
      setTimeout(() => {
        const height = element.offsetHeight;
        setHeight(height);
      }, 400),
    );
  }, [isAnnouncementOpen]);

  return (
    enable && (
      <AnimatePresence>
        {isAnnouncementOpen && (
          <motion.div
            initial={"close"}
            animate={"open"}
            exit={"close"}
            variants={{
              open: { opacity: 1, height: "auto" },
              close: { opacity: 0, height: 0 },
            }}
            ref={ref}
          >
            <div
              className={`announcement-bar relative px-[19px] py-3 text-center ${className}`}
            >
              <p
                className="mb-0 pr-4"
                dangerouslySetInnerHTML={markdownify(content)}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl leading-none"
                onClick={() => {
                  if (process.env.NODE_ENV === "production") {
                    setCookie(slugify(name + "-announcement"), "false", {
                      days: 7,
                      SameSite: "Strict",
                      Secure: true,
                    });
                  }
                  setAnnouncement(false);
                }}
              >
                <X />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
});

export default Announcement;
