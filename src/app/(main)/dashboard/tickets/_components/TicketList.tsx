import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dateFormat from "@/lib/utils/dateFormat";
import { heroId } from "@/lib/utils/supportHero";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TTicket } from "../page";

const TicketList = ({
  allTickets,
  filterTickets,
  setFilterTickets,
}: {
  allTickets: TTicket[];
  filterTickets: TTicket[];
  setFilterTickets: React.Dispatch<React.SetStateAction<TTicket[]>>;
}) => {
  const [activeButton, setActiveButton] = useState("all");

  const closedTickets = useMemo(() => {
    const data = allTickets?.filter(
      (item: TTicket) => item.status === "Closed",
    );
    return data;
  }, [allTickets]);

  const openTickets = useMemo(() => {
    const data = allTickets?.filter(
      (item: { status: string }) => item.status === "Active",
    );
    return data;
  }, [allTickets]);

  const filterTicketsHandler = (type: string) => {
    if (type === "closed") {
      setFilterTickets(closedTickets);
      setActiveButton("closed");
    } else if (type === "open") {
      setFilterTickets(openTickets);
      setActiveButton("open");
    } else {
      setFilterTickets(allTickets);
      setActiveButton("all");
    }
  };
  return (
    <>
      {/* filter tickets */}
      <div className="mb-6 flex items-center justify-between">
        <ul className="flex rounded bg-background p-1">
          <li>
            <button
              onClick={() => filterTicketsHandler("all")}
              className={`rounded px-3 py-2 text-sm ${
                activeButton === "all" && "btn-gradient text-text-dark"
              }`}
            >
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => filterTicketsHandler("open")}
              className={`rounded px-3 py-2 text-sm ${
                activeButton === "open" && "btn-gradient text-text-dark"
              }`}
            >
              Active
            </button>
          </li>
          <li>
            <button
              onClick={() => filterTicketsHandler("closed")}
              className={`rounded px-3 py-2 text-sm ${
                activeButton === "closed" && "btn-gradient text-text-dark"
              }`}
            >
              Closed
            </button>
          </li>
        </ul>
        <Button>
          <Link href={`/dashboard/tickets?new=true`}>Create New Ticket</Link>
        </Button>
      </div>

      {/* tickets list */}
      <div className="overflow-auto">
        <table className="min-w-full table-auto border-separate border-spacing-y-5">
          <thead className="mb-3">
            <tr className="bg-dark px-4 py-3">
              <th className="rounded-l px-6 py-3 text-left text-text-dark">
                Subject
              </th>
              <th className="px-6 py-3 text-text-dark">Support Hero</th>
              <th className="px-6 py-3 text-text-dark">Date</th>
              <th className="rounded-r px-6 py-3 text-text-dark">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterTickets?.map((data: TTicket) => (
              <tr className="relative" key={data.ticket_id}>
                <td className="px-4 py-3 text-left text-sm">
                  <Link
                    className="stretched-link"
                    href={`/dashboard/tickets?id=${data.ticket_id}`}
                  >
                    {data.subject}
                  </Link>
                </td>
                <td className="flex items-center justify-center px-4 py-3 text-center text-sm">
                  {data.assignable_id ? (
                    <>
                      <Image
                        className="mr-2 rounded-full border-2 border-border"
                        src={`/images/support-team/${heroId(
                          data.assignable_id,
                        )}.png`}
                        width={24}
                        height={24}
                        alt={heroId(data.assignable_id)}
                      />
                      <span className="capitalize">
                        {heroId(data.assignable_id)}
                      </span>
                    </>
                  ) : (
                    <span>Not Assigned Yet</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  {dateFormat(data.created_at)}
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  <Badge
                    variant={
                      data.status === "Active" ? "default" : "destructive"
                    }
                  >
                    {data.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketList;
