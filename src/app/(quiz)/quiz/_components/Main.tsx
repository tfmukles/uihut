import { Button } from "@/components/ui/button";
import { Quiz } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useTransition } from "react";

export default function Main({
  setIsUserDataCollectionStarted,
  setData,
}: {
  setIsUserDataCollectionStarted: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Quiz[]>>;
}) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [pending, startTransition] = useTransition();

  return (
    <>
      <div className="mb-[4.2rem] text-center">
        <h3 className="mb-1 text-2xl font-medium text-text-dark">
          <Image
            src="/images/quiz/wave.jpg"
            width={20}
            height={20}
            alt="wave"
            className="wave-img mr-2 inline-block"
          />
          Play Quizzes to win amazing prizes!
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="overflow-hidden rounded bg-white">
          <Image
            className="mx-auto"
            src={"/images/quiz/prize/t-shirt.png"}
            width={179}
            height={132}
            alt="t-shirt"
          />
        </div>
        <div className="overflow-hidden rounded bg-white">
          <Image
            className="mx-auto"
            src={"/images/quiz/prize/bottle.png"}
            width={179}
            height={132}
            alt="t-shirt"
          />
        </div>

        <div className="overflow-hidden rounded bg-white">
          <Image
            className="mx-auto"
            src={"/images/quiz/prize/crafted-key-ring.png"}
            width={179}
            height={132}
            alt="t-shirt"
          />
        </div>

        <div className="overflow-hidden rounded bg-white">
          <Image
            className="mx-auto"
            src={"/images/quiz/prize/key-ring.png"}
            width={179}
            height={132}
            alt="t-shirt"
          />
        </div>
      </div>
      <Button
        onClick={() => {
          startTransition(async () => {
            const response = await fetch("/api/quiz");
            const data = await response.json();
            setData(data);
            setIsUserDataCollectionStarted(true);
          });
        }}
        size={"xl"}
        className="mt-12 w-full text-[20px]"
        disabled={pending}
      >
        Start Quiz
        {pending && <Loader2 className="size-5 animate-spin" />}
      </Button>
    </>
  );
}
