import timeConverter from "@/lib/utils/timeConverter";
import { QuizResult as IQuizResult } from "@/types";
import confetti from "canvas-confetti";
import { AlarmClock } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import QuizCard from "./Card";

export default function QuizResult({
  totalQuestions,
  correctAnswers,
  gift,
  timeTaken,
  name,
  id,
}: IQuizResult) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { minutes, seconds } = timeConverter(timeTaken) || {};

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    let end = Date.now() + 2 * 1000;
    // go Buckeyes!
    let colors = ["#ab5cfa", "#ff628a", "#FBDF85"];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="relative h-[calc(100svh_-_183px)] text-center">
      <audio ref={audioRef} src={"/images/quiz/confetti-music.mp3"} />

      <div className="mb-6">
        <p className="mb-1 text-2xl text-text-dark">
          Congratulations! <strong> {name}</strong>
        </p>
        {/* <p className="text-xl text-text-dark">Your Gift token ID is: #{id}</p> */}

        <p className="text-xl text-text-dark">
          Check Your Email For Gift token ID
        </p>
      </div>
      <div className="mb-10">
        <QuizCard
          className="bg-white p-0 capitalize"
          title={`You won: ${gift}`}
          dir="top-bottom"
        >
          <Image
            width={200}
            height={200}
            className="size-[200px]"
            src={`/images/quiz/prize/${gift}.png`}
            alt="sticker"
          />
        </QuizCard>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <QuizCard title="Time">
            <div className="flex justify-center space-x-2 text-center text-text-dark">
              <AlarmClock className="inline-block size-6" />
              <span>
                {minutes}.{seconds}
              </span>
            </div>
          </QuizCard>

          <QuizCard title="Result">
            <span>
              {correctAnswers}/{totalQuestions}
            </span>
          </QuizCard>
        </div>
      </div>
    </div>
  );
}
