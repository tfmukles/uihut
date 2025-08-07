"use client";

import config from "@/config/config.json";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function GoogleTagManager() {
  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 12000);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  return null;
}
