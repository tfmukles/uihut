"use client";

import { getUserDetails } from "@/actions/user";
import { getUserlog } from "@/actions/userlog";
import useOs from "@/hooks/useOs";
import Axios from "@/lib/utils/axios";
import countryDetector from "@/lib/utils/countryDetector";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCookie, { getCookie } from "react-use-cookie";

const CookieConsent = () => {
  const country = countryDetector();
  const { data: session } = useSession();

  // cookie bar
  const [cookieAccept, setCookieAccept] = useCookie("cookieAccept", "false");
  const [cookieAcceptState, setCookieAcceptState] = useState(true);

  // first visit detection
  const [firstVisit, setFirstVisit] = useCookie("firstVisit", "false");
  const [firstVisitState, setFirstVisitState] = useState(true);

  // bookmark
  const [bookmarkAccept, setBookmarkAccept] = useCookie(
    "bookmarkAccept",
    "false",
  );
  const [bookmarkAcceptState, setBookmarkAcceptState] = useState(false);

  // zoom bookmark bar
  const [zoom, setZoom] = useState(1);
  const [bookmarkText, setBookmarkText] = useState(false);

  // welcome cookies
  const [welcomeDate, setWelcomeDate] = useCookie("welcomeDate", "");
  const [welcomeReferrer, setWelcomeReferrer] = useCookie(
    "welcomeReferrer",
    "",
  );
  const [welcomeLandingPage, setWelcomeLandingPage] = useCookie(
    "welcomeLandingPage",
    "",
  );

  // set cookies
  useEffect(() => {
    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    !welcomeDate &&
      setWelcomeDate(currentDate, {
        days: 365 * 10,
        SameSite: "Strict",
        Secure: true,
      });

    let referrerSite = document.referrer.toString();
    referrerSite = referrerSite.includes("uihut.com") ? "none" : referrerSite;
    !welcomeReferrer &&
      setWelcomeReferrer(referrerSite, {
        days: 365 * 10,
        SameSite: "Strict",
        Secure: true,
      });

    const landingPage = window.location.pathname.toString();
    !welcomeLandingPage &&
      setWelcomeLandingPage(landingPage, {
        days: 365 * 10,
        SameSite: "Strict",
        Secure: true,
      });
  }, []);

  // cookie check from browser
  useEffect(() => {
    // get cookie accept state
    setCookieAcceptState(getCookie("cookieAccept") === "true");
    // get first visit state
    setFirstVisitState(getCookie("firstVisit") === "true");
  }, [cookieAccept, firstVisit]);

  // cookie check from browser
  useEffect(() => {
    // get bookmark accept state
    setBookmarkAcceptState(getCookie("bookmarkAccept") === "true");
  }, [bookmarkAccept]);

  // cookie handler
  const cookieHandler = () => {
    setCookieAccept("true", {
      days: 150,
      SameSite: "Strict",
      Secure: true,
    });
    setFirstVisit("true", {
      days: 1,
      SameSite: "Strict",
      Secure: true,
    });
  };

  // bookmark bar handler
  const bookmarkBarHandler = () => {
    if (zoom <= 2) {
      setZoom((prev) => prev + 0.2);
    }
    setBookmarkText(true);
  };

  // bookmark cookie handler
  const bookmarkHandler = () => {
    setBookmarkAccept("true", {
      days: 365,
      SameSite: "Strict",
      Secure: true,
    });
  };

  // detect OS
  const macOs = useOs();
  const [key, setKey] = useState("");
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (macOs && e.metaKey && e.key === "d") {
        bookmarkHandler();
      } else if (e.ctrlKey && e.key === "d") {
        bookmarkHandler();
      }
    });
    if (macOs) {
      setKey("⌘+D");
    } else {
      setKey("Ctrl+D");
    }
  }, [macOs]);

  // send cookies to server
  useEffect(() => {
    if (session) {
      const updateLog = async () => {
        await Axios.patch(`/user-log/${session?.user?.id}`, {
          first_visit: new Date(getCookie("welcomeDate"))
            .toISOString()
            .slice(0, 10),
          referrer: getCookie("welcomeReferrer"),
          landing_page: getCookie("welcomeLandingPage"),
          device: navigator.platform,
        });
      };

      getUserlog(session?.user?.id!).then((res) => {
        if (!res?.data?.first_visit) {
          updateLog();
        }
      });
    }
  }, [session?.user?.id]);

  // update visit log
  useEffect(() => {
    if (session) {
      const updateVisit = async () => {
        await Axios.patch(`user-log/visit/${session?.user?.id}`, {
          date: new Date().toISOString().slice(0, 10),
        });
      };

      getUserlog(session?.user?.id!).then((res) => {
        if (
          !res?.data?.visits
            .map((visit) => visit.date)
            .includes(new Date().toISOString().slice(0, 10))
        ) {
          updateVisit();
        }
      });
    }
  }, [session?.user?.id]);

  // update user country for the first time
  useEffect(() => {
    if (session) {
      const updateCountry = async () => {
        await Axios.patch(`user/update-country/${session?.user?.id}`, {
          country: country,
        });
      };
      getUserDetails(session?.user?.id!).then((res) => {
        if (!res?.data?.country) {
          updateCountry();
        }
      });
    }
  }, [session?.user?.id]);

  return (
    <>
      {/* cookie box */}
      <div className={`cookie-box ${cookieAcceptState && "hidden"}`}>
        <div className="block md:flex">
          <span className="mr-3 mt-1 hidden flex-shrink-0 md:inline-block">
            <Image
              alt="cookie"
              src="/images/cookie.png"
              height="30"
              width="30"
            />
          </span>
          <span className="font-primary">
            This website use cookies. By using this website, you automatically
            accept that. Check our{" "}
            <Link
              href="/privacy-policy"
              className="d-inline text-text-dark underline"
              aria-label="our privacy policy"
            >
              privacy policy
            </Link>
            <br />
            <button className="cookie-box-closer mt-2" onClick={cookieHandler}>
              Got It!
            </button>
          </span>
        </div>
      </div>

      {/* bookmark box */}
      <div
        onClick={bookmarkBarHandler}
        className={`bookmark-box ${
          cookieAcceptState && !firstVisitState && !bookmarkAcceptState
            ? "md:flex"
            : "hidden"
        } `}
        style={{ transform: `scale(${zoom})` }}
      >
        <div className="bookmark-box-icon">
          <Image alt="pin" src="/images/pin.svg" height="25" width="32" />
        </div>
        <div>
          <small>
            {bookmarkText ? "Use Your Keyboard" : "Bookmark This Site"}
          </small>
          <strong className="block">{key}</strong>
        </div>
        <span onClick={bookmarkHandler} className="bookmark-box-closer">
          ×
        </span>
      </div>
    </>
  );
};

export default CookieConsent;
