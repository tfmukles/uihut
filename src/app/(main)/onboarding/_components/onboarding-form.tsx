"use client";

import { fetchApi } from "@/actions/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/title";
import { packageContext } from "@/helpers/PackageProvider";
import { useSession } from "next-auth/react";
import { useContext, useMemo, useState, useTransition } from "react";
import { Question } from "../type";
import OnboardingSelect from "./onboard-select";

const OnboardingForm = ({
  questions: incomingQuestions,
}: {
  questions: Question[];
}) => {
  const { packageName } = useContext(packageContext) || {};

  const questions = useMemo(() => {
    return incomingQuestions.filter((q) => {
      if (packageName && packageName === "free" && q.id === 5) {
        return false;
      }
      return true;
    });
  }, [packageName]);

  const { data: session } = useSession();
  const [isLoading, setLoading] = useTransition();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [currentQuestionId, setCurrentQuestionId] = useState(
    questions[0].id || 1,
  );
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(
    questions[0].id || 1,
  );

  function navigateNextQuestion({
    values,
    questionId,
  }: {
    values: string[];
    questionId: number;
  }) {
    // Filter questions to include only those with ID greater than currentQuestionId
    const nextQuestion = questions.find(
      (question) =>
        question.id > questionId &&
        !(question.exclude && question.exclude.some((v) => values.includes(v))),
    );

    // Return the ID of the next valid question, or null if none is found
    return nextQuestion ? nextQuestion.id : -1;
  }

  const handleOptionChange = ({
    selectedValue,
    questionId,
  }: {
    selectedValue: string;
    questionId: number;
  }) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [questionId]: selectedValue,
    };

    const updatedOptions = {
      ...selectedOptions,
      ...newSelectedOptions,
    } as Record<any, string>;
    Object.keys(updatedOptions).forEach((key) => {
      if (parseInt(key) > questionId) {
        delete updatedOptions[key];
      }
    });

    setSelectedOptions(updatedOptions);
    const values = Object.values(updatedOptions) as string[];
    const nextId = navigateNextQuestion({ values, questionId });
    setCurrentQuestionId(nextId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData: any = {};

    // Construct submission data
    Object.entries(selectedOptions).forEach(([questionId, selectedValue]) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question) {
        submissionData[question.name] = selectedValue;
      }
    });

    const reqBody = { ...submissionData, user_id: session?.user.id };

    setLoading(async () => {
      const res = await fetchApi({
        endPoint: `/user-persona`,
        method: "POST",
        body: reqBody,
      });

      if (res.status === 200) {
        window.location.href = "/designs";
      }
    });
  };

  const renderQuestion = (questionId: number) => {
    const question = questions.find((q) => q.id === questionId);
    const options = question?.options;

    const isVisible =
      currentQuestionId === questionId ||
      selectedOptions[questionId] !== undefined;
    const isDropdownOpen = openDropdownId === questionId;

    const handleToggleDropdown = (option: string) => {
      const nextId = navigateNextQuestion({
        values: Object.values(selectedOptions),
        questionId,
      });
      setOpenDropdownId(isDropdownOpen ? (option ? nextId : null) : questionId);
    };

    if (!question) return null;

    const questionParts = question.question.split("<COMPONENT>");
    const selectComponent =
      question.field === "input" ? (
        <Input
          variant={"outline"}
          type={question.type}
          className="custom-select-trigger inline-block w-auto"
          name={question.name}
          placeholder="https://example.com"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOptionChange({
                questionId,
                selectedValue: e.currentTarget.value,
              });
              handleToggleDropdown(e.currentTarget.value);
            }
          }}
        />
      ) : (
        <OnboardingSelect
          options={options}
          onSelect={(option: string) =>
            handleOptionChange({ questionId, selectedValue: option })
          }
          isDropdownOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
        />
      );

    return (
      isVisible && (
        <div key={questionId} className="items-center space-x-5">
          <div className="flex items-center space-x-5">
            <span className="gradient-text inline-block flex-shrink-0 text-lg">
              {questionParts[0]}
            </span>{" "}
            {selectComponent}{" "}
            <span className="gradient-text inline-block text-lg">
              {questionParts[1]}
            </span>
          </div>
        </div>
      )
    );
  };

  const isEndOfQuestions = currentQuestionId === -1 || currentQuestionId === 7;

  return (
    <div className="row">
      <div className="col-12">
        <Heading className="mb-4" level={"h3"} variant={"gradient"}>
          Hey {session?.user?.firstName}! Help us improve your experience{" "}
        </Heading>
        <p className="mb-3 max-w-lg text-text-light">
          Help us personalize your experience and continue to create
          high-quality design resources for you by answering a few quick
          questions.
        </p>

        <div className="mt-8 flex space-x-2 *:flex-1">
          {[...Array(questions.length)].map((_, index) => (
            <span
              key={index}
              className={`${index < currentQuestionId ? "bg-primary" : "bg-gray-300"} inline-block h-1 rounded`}
            />
          ))}
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {questions?.map((question) => renderQuestion(question.id))}

          {/* Render submit button when no more questions to navigate */}
          {isEndOfQuestions && (
            <div className="text-left">
              <Button
                type="submit"
                className="mt-8 inline-block"
                disabled={isLoading}
                size={"lg"}
              >
                {isLoading ? (
                  <>
                    Submitting
                    <svg
                      height="25"
                      width="25"
                      className="ml-2"
                      viewBox="0 0 100 100"
                    >
                      <path
                        fill="#fff"
                        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                      >
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          dur="1s"
                          from="0 50 50"
                          to="360 50 50"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </>
                ) : (
                  "Submit And Browse Resources"
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
