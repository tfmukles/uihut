import { cn } from "@/lib/utils/shadcn";

export default function QuizCard({
  children,
  title,
  className,
  dir,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  dir?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-border",
        dir === "top-bottom" && "flex flex-col-reverse",
      )}
    >
      <div className="btn-gradient px-2 py-1.5 text-center capitalize text-text-dark">
        {title}
      </div>
      <div
        className={cn(
          "flex justify-center space-x-2 py-4 text-center text-text-dark",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
