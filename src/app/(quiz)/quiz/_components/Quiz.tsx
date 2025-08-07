import { Button } from "@/components/ui/button";
import { QUIZ_TIME } from "@/lib/constant";
import { cn } from "@/lib/utils/shadcn";
import { CorrectAnswer, Quiz as IQuiz, QuizOption, QuizResult } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Countdown from "./CountDown";

export default function Quiz({
  data,
  endQuiz,
  isPending,
}: {
  data: IQuiz[];
  isPending: boolean;
  endQuiz: (result: QuizResult) => void;
}) {
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userSelectedAns, setUserSelectedAns] = useState<QuizOption["label"]>();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    CorrectAnswer[]
  >([]);

  const handleNext = () => {
    if (!userSelectedAns) {
      return;
    }

    let point = 0;
    if (userSelectedAns === data[questionIndex].correct_answer) {
      point = 1;
    }

    const qna = questionsAndAnswers;
    qna.push({
      question: data[questionIndex].question,
      correctAnswer: data[questionIndex].correct_answer,
      isCorrect: userSelectedAns === data[questionIndex].correct_answer,
      givenAnswer: userSelectedAns,
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        correctAnswers: correctAnswers + point,
        questionsAndAnswers: qna,
        timeTaken: timeTaken || QUIZ_TIME * 1000,
        totalQuestions: data.length,
        id: "",
        gift: "",
        name: "",
      });
    }

    setQuestionIndex(questionIndex + 1);
    setCorrectAnswers(correctAnswers + point);
    setUserSelectedAns(undefined);
    setQuestionsAndAnswers(qna);
  };

  const currentQuestion = data[questionIndex];
  const handleAnswer = (answer: QuizOption) => {
    setUserSelectedAns(answer.label);
  };

  return (
    <div>
      <Countdown
        setTimeTaken={setTimeTaken}
        totalQuestions={data.length}
        currentQuestion={questionIndex + 1}
        isPending={isPending}
      />
      <p className="mb-4 text-xl text-text-dark">{currentQuestion?.question}</p>
      <div
        className={cn(
          "grid grid-cols-2 gap-4",
          currentQuestion.options[0].src &&
            !currentQuestion.options[1].src?.startsWith("#") &&
            "gap-8",
        )}
      >
        {currentQuestion.options.map((option, index) => {
          if (option.src?.startsWith("#")) {
            return (
              <Button
                size={"xl"}
                variant={"outline"}
                className={cn(
                  "col-span-2 w-full",
                  option.label === userSelectedAns &&
                    "text-text-dark before:bg-transparent before:opacity-100 after:bg-transparent after:opacity-100",
                )}
                key={index}
                onClick={() => handleAnswer(option)}
              >
                <div
                  className="h-[18px] w-[35px] rounded"
                  style={{
                    backgroundColor: option.src,
                  }}
                />
                <span className="text-xl">{option.label}</span>
              </Button>
            );
          }

          if (option.src) {
            return (
              <Button
                size={"xl"}
                variant={"outline"}
                className={cn(
                  "h-auto",
                  option.label === userSelectedAns &&
                    "text-text-dark before:bg-transparent before:opacity-100 after:bg-transparent after:opacity-100",
                )}
                key={index}
                onClick={() => handleAnswer(option)}
              >
                <div className="space-y-4 py-5">
                  <Image
                    className="h-[97px] w-[132px] rounded object-cover"
                    src={option.src}
                    alt={option.label}
                    width={132}
                    height={97}
                  />
                  <span className="block text-center text-lg text-text-dark">
                    {option.label}
                  </span>
                </div>
              </Button>
            );
          }

          return (
            <Button
              size={"xl"}
              variant={"outline"}
              className={cn(
                "col-span-2 w-full text-lg",
                option.label === userSelectedAns &&
                  "text-text-dark before:bg-transparent before:opacity-100 after:bg-transparent after:opacity-100",
              )}
              key={index}
              onClick={() => handleAnswer(option)}
            >
              {option.label}
            </Button>
          );
        })}

        <div className="col-span-2">
          <Button
            type="button"
            onClick={handleNext}
            size={"xl"}
            className="mt-3 w-full text-xl font-medium"
            disabled={!userSelectedAns || isPending}
          >
            {questionIndex === data.length - 1
              ? isPending
                ? "Submitting"
                : "Submit"
              : "Next"}
            {isPending && <Loader2 className="size-5 animate-spin" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
