import Heading from "@/components/ui/title";

export default function EventEnd() {
  return (
    <div className="container bg-background pt-10">
      <div className="flex h-[calc(100svh_-_183px)] items-center justify-center">
        <div className="text-center">
          <Heading className="mb-1.5" level="h3" variant="gradient">
            The Event Has Ended
          </Heading>
          <p className="mb-2 text-lg">
            Thank you for attending! Stay tuned for future events.
          </p>
          <p className="text-sm text-muted-foreground">
            For more updates, check our website or follow us on social media.
          </p>
        </div>
      </div>
    </div>
  );
}
