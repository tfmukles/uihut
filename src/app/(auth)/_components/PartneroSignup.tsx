"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function PartneroSignup() {
  const { data: session, status } = useSession();
  const dbUser = session?.user;

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .post("/api/partnero", {
          email: dbUser?.email,
          first_name: dbUser?.firstName,
          last_name: dbUser?.lastName,
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);

  return null;
}
