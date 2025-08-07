"use client";

import { createQuiz, getQuiz } from "@/actions/quiz";
import { quizUserSchema } from "@/lib/validate";
import SeoMeta from "@/partials/SeoMeta";
import { Quiz as IQuiz, QuizResult as IQuizResult } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import EventEnd from "./_components/EventEnd";
import EventStart from "./_components/EventStart";
import Main from "./_components/Main";
import Quiz from "./_components/Quiz";
import QuizResult from "./_components/QuizResult";
import UserInfo from "./_components/UserInfo";
import { endDate, eventDate } from "./_components/constant";

export default function QuizPage() {
  const [isLoading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<IQuiz[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isUserDataCollectionStarted, setIsUserDataCollectionStarted] =
    useState(false);

  const [resultData, setResultData] = useState<IQuizResult>({
    correctAnswers: 0,
    totalQuestions: 0,
    timeTaken: 0,
    questionsAndAnswers: [],
    gift: "",
    id: "",
    name: "",
  });

  const userInfoForm = useForm<z.infer<typeof quizUserSchema>, any>({
    resolver: zodResolver(quizUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  const endQuiz = async (resultData: IQuizResult) => {
    startTransition(async () => {
      const data = await createQuiz({
        name: userInfoForm.getValues("name"),
        email: userInfoForm.getValues("email"),
        phone: userInfoForm.getValues("phone_number"),
        play_time: resultData.timeTaken / 1000,
        points: resultData.correctAnswers,
      });

      if (data.isError) {
        toast.error(data.message);
      } else {
        setIsQuizStarted(false);
        setIsQuizCompleted(true);
        setResultData({
          ...resultData,
          gift: data.data?.gift || "",
          id: data.data?.id || "",
          name: data.data?.name || "",
        });
        localStorage.setItem("participateId", data.data?.id || "");
      }
    });
  };

  useEffect(() => {
    const quizResult = async () => {
      try {
        const participateId = localStorage.getItem("participateId");
        if (!participateId) return;
        const { data } = await getQuiz(participateId);
        if (data?.id) {
          setIsUserDataCollectionStarted(true);
          setIsUserDataCollectionStarted(true);
          setIsQuizCompleted(true);
          setResultData({
            correctAnswers: data?.points || 0,
            gift: data?.gift || "",
            id: data?.id || "",
            questionsAndAnswers: [],
            timeTaken: data.play_time * 1000,
            totalQuestions: 10,
            name: data?.name || "",
          });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    quizResult();
  }, []);

  const currentDate = new Date();

  if (currentDate < eventDate) {
    return <EventStart />;
  }

  if (currentDate > endDate) {
    return <EventEnd />;
  }

  return (
    <>
      <SeoMeta title={"Quiz"} />
      <section className="py-14 md:py-8">
        <div className="container">
          {isLoading ? (
            <div className="flex h-[calc(100svh_-_183px)] items-center justify-center">
              <Loader2 className="mx-auto size-6 animate-spin" />
            </div>
          ) : (
            <div className="mx-auto max-w-md">
              {!isQuizStarted && !isUserDataCollectionStarted && (
                <Main
                  setIsUserDataCollectionStarted={
                    setIsUserDataCollectionStarted
                  }
                  setData={setData}
                />
              )}
              {!isQuizStarted &&
                isUserDataCollectionStarted &&
                !isQuizCompleted && (
                  <UserInfo
                    userInfoForm={userInfoForm}
                    setIsQuizStarted={setIsQuizStarted}
                  />
                )}
              {isQuizStarted && isUserDataCollectionStarted && (
                <Quiz data={data} endQuiz={endQuiz} isPending={isPending} />
              )}

              {isQuizCompleted && <QuizResult {...resultData} />}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
