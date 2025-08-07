"use client";

import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { usePackage } from "@/hooks/usePackage";
import axios from "axios";
import { useSession } from "next-auth/react";
import { use, useEffect, useMemo, useState } from "react";
import EmptyTicket from "./_components/EmptyTicket";
import TicketForm from "./_components/TicketForm";
import TicketList from "./_components/TicketList";
import TicketSingle from "./_components/TicketSingle";

export type TTicket = {
  id: string;
  ticket_id: string;
  subject: string;
  assignable_id: string;
  messages_count: unknown;
  created_at: string;
  closed_at: string;
  contact: any;
  status: string;
};

export default function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ id: string; new: string; submitted: string }>;
}) {
  const packageName = usePackage();
  const params = use(searchParams);
  const newTicket = params.new;
  const ticketSubmitted = params.submitted;
  const ticketId = params.id;

  const { data: session, status } = useSession();
  const [allTickets, setAllTickets] = useState<TTicket[]>([]);
  const [filterTickets, setFilterTickets] = useState<TTicket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Td-Organization-Slug": process.env.NEXT_PUBLIC_THRIVEDESK_SLUG,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_THRIVEDESK_API_KEY}`,
  };

  // get all tickets
  useEffect(() => {
    !newTicket && setLoadingTickets(true);
    const thriveDeskData = async () => {
      try {
        const res = await axios.get(
          `https://api.thrivedesk.com/v1/customer/conversations?customer_email=${session?.user.email}`,
          {
            headers: headers,
          },
        );
        const filterByInbox = res.data.data.filter(
          (item: any) =>
            item.inbox_id === process.env.NEXT_PUBLIC_THRIVEDESK_SLUG,
        );
        setAllTickets(filterByInbox);
        setFilterTickets(filterByInbox);
        !ticketSubmitted && setLoadingTickets(false);
      } catch (error) {
        setLoadingTickets(false);
        console.error("Error fetching ThriveDesk data:", error);
      }
    };
    session && thriveDeskData();
  }, [newTicket]);

  // set loader if ticketSubmitted
  useEffect(() => {
    if (ticketSubmitted) {
      if (allTickets?.length < 1) {
        setLoadingTickets(true);
      } else {
        setLoadingTickets(false);
      }
    }
  }, [ticketSubmitted, allTickets?.length]);

  const singleTicket = useMemo(() => {
    const data = allTickets?.find(
      (item: TTicket) => item.ticket_id.toString() === ticketId,
    );
    return data;
  }, [ticketId, allTickets]);

  const isPackageLoading = !packageName?.length;

  if (isPackageLoading) {
    return (
      <div className="py-32">
        <Spinner className="mx-auto" />
      </div>
    );
  } else if (packageName === "free") {
    return (
      <div className="py-12 text-center">
        <Heading className="mb-4" level="h3">
          You Don't Have Access To This Feature
        </Heading>
        <p>Please upgrade your package to access this feature.</p>
      </div>
    );
  } else if (loadingTickets) {
    return (
      <div className="py-32">
        <Spinner className="mx-auto" />
      </div>
    );
  } else if (newTicket) {
    return <TicketForm session={session} key={status} />;
  } else if (ticketId) {
    return (
      <TicketSingle
        session={session}
        data={singleTicket as TTicket}
        headers={headers}
        key={status}
      />
    );
  } else if (allTickets?.length > 0) {
    return (
      <TicketList
        allTickets={allTickets}
        filterTickets={filterTickets}
        setFilterTickets={setFilterTickets}
      />
    );
  } else {
    return <EmptyTicket />;
  }
}
