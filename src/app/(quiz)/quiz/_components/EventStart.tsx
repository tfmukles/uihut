import Heading from "@/components/ui/title";
import React, { useEffect, useState } from "react";
import { eventDate } from "./constant";

// Define the state type for time left
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventMessage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Format event date for display
  const formattedEventDate: string = eventDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Function to calculate time left until the event
  const calculateTimeLeft = (): TimeLeft | null => {
    const currentDate: Date = new Date();
    const timeDiff: number = eventDate.getTime() - currentDate.getTime(); // Difference in milliseconds

    if (timeDiff > 0) {
      const days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes: number = Math.floor(
        (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds: number = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return null; // Event has started or passed
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="container bg-background pt-10">
      <div className="flex h-[calc(100svh_-_183px)] items-center justify-center">
        <div className="text-center">
          <Heading className="mb-1.5" level="h3" variant="gradient">
            Event Will Start on {formattedEventDate}
          </Heading>
          {timeLeft ? (
            <p className="mb-2 text-lg">
              {timeLeft.days > 0 && <>{timeLeft.days} days, </>}
              {timeLeft.hours > 0 && <>{timeLeft.hours} hours, </>}
              {timeLeft.minutes > 0 && <>{timeLeft.minutes} minutes, </>}
              {timeLeft.seconds > 0 && <>{timeLeft.seconds} seconds.</>}
            </p>
          ) : (
            <p className="mb-2 text-lg">
              The event has started or already passed!
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Don't miss it! Mark your calendars and set a reminder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventMessage;
