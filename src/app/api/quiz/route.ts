import { getListPage } from "@/lib/contentParser";
import shuffle from "@/lib/utils/shuffle";
import { Quiz } from "@/types";
import { NextResponse } from "next/server";

export function GET() {
  const { frontmatter: questions } = getListPage<Quiz[]>("quiz/question.md");
  const shuffledQuestions = shuffle(questions).slice(0, 10);
  shuffledQuestions.forEach((question) => {
    question.options = shuffle(question.options);
  });

  return NextResponse.json(shuffledQuestions);
}
