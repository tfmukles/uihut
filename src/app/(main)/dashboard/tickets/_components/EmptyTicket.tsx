import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import Image from "next/image";
import Link from "next/link";

const EmptyTicket = () => {
  return (
    <div className="py-5 text-center">
      <Image
        src="/images/empty-tickets.svg"
        width={100}
        height={117}
        alt="empty"
        className="mx-auto mb-4"
      />
      <Heading className="mb-4" level="h3">
        No Tickets Found
      </Heading>
      <p className="mx-auto mb-5 max-w-[400px]">
        You Have Not Created Any Tickets Yet. To Create a New Ticket Click The
        Button Below
      </p>
      <Button size={"sm"}>
        <Link href={`/dashboard/tickets?new=true`}>Create New Ticket</Link>
      </Button>
    </div>
  );
};

export default EmptyTicket;
