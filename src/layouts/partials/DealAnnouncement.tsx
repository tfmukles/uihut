"use client";

import { Button } from "@/components/ui/button";
import config from "@/config/config.json";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DealAnnouncement = () => {
  // Function to calculate time left until the event
  const calculateTimeLeft = () => {
    const eventDate = new Date(config.deal_announcement.end_date);
    const currentDate = new Date();
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return null;
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    config.deal_announcement && (
      <div className={`bg-[#130b30] py-4`}>
        <div className="container-fluid row gx-0 mx-auto items-center justify-center px-0">
          <div className="col-7 flex items-center space-x-4 lg:col-4">
            <h4 className="text-h6 text-white lg:text-h4">New Year Sale!</h4>
          </div>
          <div className="col-1 lg:col-4 max-lg:hidden">
            {timeLeft ? (
              <div className="flex justify-center space-x-4 text-center text-white">
                <div className="lg:block">
                  <strong className="text-2xl text-white">
                    {timeLeft.days === 0 ? "0" : timeLeft.days}
                  </strong>
                  <span className="ml-2 text-sm text-gray-400">
                    {timeLeft.days > 1 ? "Days" : "Day"}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <strong className="text-2xl text-white">
                    {timeLeft.hours === 0 ? "0" : timeLeft.hours}
                  </strong>
                  <span className="ml-2 text-sm text-gray-400">
                    {timeLeft.hours > 1 ? "Hours" : "Hour"}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <strong className="text-2xl text-white">
                    {timeLeft.minutes === 0 ? "0" : timeLeft.minutes}
                  </strong>
                  <span className="ml-2 text-sm text-gray-400">
                    {timeLeft.minutes > 1 ? "Mins" : "Min"}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <strong className="text-2xl text-white">
                    {timeLeft.seconds === 0 ? "0" : timeLeft.seconds}
                  </strong>
                  <span className="ml-2 text-sm text-gray-400">
                    {timeLeft.seconds > 1 ? "Secs" : "Sec"}
                  </span>
                </div>
              </div>
            ) : (
              <h3 className="mb-2 text-lg text-white">The Deals are over!</h3>
            )}
          </div>
          <div className="col-4 text-right">
            <Button>
              <Link href={"/deals"} className="btn btn-sm btn-primary">
                <span className="hidden xl:block">Grab the Deals</span>
                <span className="block xl:hidden">Check It</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default DealAnnouncement;
