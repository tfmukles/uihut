import timeConverter from "@/lib/utils/timeConverter";
import { motion } from "framer-motion";
import { AlarmClock } from "lucide-react";
import { useEffect, useState } from "react";

const Countdown = ({
  setTimeTaken,
  totalQuestions,
  currentQuestion,
  isPending = false,
}: {
  setTimeTaken: (time: number) => void;
  totalQuestions: number;
  currentQuestion: number;
  isPending?: boolean;
}) => {
  const [timerTime, setTimerTime] = useState(0);
  const { minutes, seconds } = timeConverter(timerTime) || {};

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime + 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);
        // on time out set time to 0
      }
    }, 1000);

    if (isPending) {
      clearInterval(timer);
      setTimeTaken(timerTime);
    }

    return () => {
      clearInterval(timer);
      setTimeTaken(timerTime);
    };
  }, [timerTime, isPending]);

  return (
    <div className="mb-12">
      <motion.div className="relative h-3 w-full rounded-lg bg-light">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-lg bg-success"
          animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        />
      </motion.div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2 text-text-dark">
          <AlarmClock className="inline-block size-6" />
          <span className="text-xl">
            {minutes}.{seconds}
          </span>
        </div>
        <p className="text-xl text-text-dark">
          {currentQuestion}/{totalQuestions}
        </p>
      </div>
    </div>
  );
};

export default Countdown;
