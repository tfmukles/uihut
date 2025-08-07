import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import dateFormat from "@/lib/utils/dateFormat";
import { heroId } from "@/lib/utils/supportHero";
import axios from "axios";
import { ArrowLeft, Paperclip } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { TTicket } from "../page";

type TTicketMessage = {
  actor: any;
  event: any;
  actor_type: string;
  id: string;
  created_at: string;
  message: string;
  type: string;
};

const TicketSingle = ({
  session,
  data,
  headers,
}: {
  session: any;
  data: TTicket;
  headers: any;
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<TTicketMessage[]>([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const [messageLoader, setMessageLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const ticketBodyClassNames =
    "text-[15px] prose-a:text-primary prose-headings:text-lg prose-pre:bg-theme-light prose-pre:rounded prose-pre:px-4 prose-pre:py-2 prose-pre:my-2 prose-img:max-h-[200px] prose-img:my-2 prose-img:mx-auto [word-break:break-word]";

  useEffect(() => {
    setMessageLoader(true);
  }, []);

  useEffect(() => {
    const thriveDeskData = async () => {
      if (!data?.id || !data?.contact?.email) {
        setMessageLoader(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.thrivedesk.com/v1/customer/conversations/${data.id}?customer_email=${data.contact.email}`,
          {
            headers: headers,
            timeout: 10000, // 10 second timeout
          },
        );

        if (res.data?.data?.events) {
          const filterMessageEvents = res.data.data.events.filter(
            (d: { action: string }) =>
              d.action === "replied" || d.action === "started",
          );
          setAllMessages(filterMessageEvents);
        } else {
          console.warn("No events data received from ThriveDesk API");
          setAllMessages([]);
        }
      } catch (error) {
        console.error("Failed to fetch ThriveDesk data:", error);
        setAllMessages([]);
      } finally {
        setMessageLoader(false);
      }
    };

    data && thriveDeskData();
  }, [data?.messages_count, updateMessage, data?.id, data?.contact?.email]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!newMessage.trim() || !data?.id || !data?.contact?.email) {
      return;
    }

    setLoader(true);
    try {
      const res = await axios.post(
        `https://api.thrivedesk.com/v1/customer/conversations/${data.id}/reply`,
        {
          customer_email: data.contact.email,
          message: newMessage.trim(),
        },
        {
          headers: headers,
          timeout: 15000, // 15 second timeout
        },
      );
      if (res.status === 201) {
        setNewMessage("");
        setUpdateMessage(Date.now() + "");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // You might want to show a user-friendly error message here
    } finally {
      setLoader(false);
    }
  };

  const parseMessage = (message: string) => {
    if (!message) return "";

    const startIndex = message.indexOf("<strong>message: ");
    if (startIndex !== -1) {
      message = message.substring(startIndex);
    }

    const endIndex = message.indexOf(
      '<p style="text-align: center">Submitted at ',
    );
    if (endIndex !== -1) {
      message = message.substring(0, endIndex);
    }

    const signatureIndex = message.indexOf(
      '<div name="messageSignatureSection',
    );
    if (signatureIndex !== -1) {
      message = message.substring(0, signatureIndex);
    }

    const quoteIndex = message.indexOf(
      '<br id="lineBreakAtBeginningOfMessage"/>',
    );
    if (quoteIndex !== -1) {
      message = message.substring(0, quoteIndex);
    }

    const finalMessage = message
      .replace("<strong>message: </strong><br/>", "")
      .replace('<pre style="margin: 0;white-space: pre-wrap">', "")
      .replace("<hr/>", "")
      .replace("safe-src", "src")
      .trim();

    return finalMessage;
  };

  return (
    <div className="row">
      {/* Ticket header */}
      <div className="mb-5 lg:col-5 xl:col-4">
        <Link className="inline-flex items-center" href="/dashboard/tickets">
          <ArrowLeft className="mr-1 size-5" />
          All Tickets
        </Link>
      </div>
      <div className="mb-5 lg:col-7 xl:col-8">
        <p className="text-text-dark text-lg font-medium capitalize lg:text-center">
          Subject: {data?.subject}
        </p>
      </div>

      {/* Ticket Details */}
      <div className="mb-8 lg:col-5 xl:col-4">
        <ul className="space-y-4 font-medium">
          <li className="bg-background flex items-center rounded px-5 py-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="mr-2"
            >
              <path
                d="M12.75 9C14.4069 9 15.75 7.65685 15.75 6C15.75 4.34315 14.4069 3 12.75 3C11.0931 3 9.75 4.34315 9.75 6C9.75 7.65685 11.0931 9 12.75 9Z"
                fill="#ac66f3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.25 6C8.25 5.47405 8.34023 4.96917 8.50605 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25C3 5.66421 3.33579 6 3.75 6H8.25ZM8.85203 8.25C9.20033 8.8521 9.68408 9.366 10.2617 9.75H3.75C3.33579 9.75 3 9.41423 3 9C3 8.58577 3.33579 8.25 3.75 8.25H8.85203ZM3.75 12C3.33579 12 3 12.3358 3 12.75C3 13.1642 3.33579 13.5 3.75 13.5H14.25C14.6642 13.5 15 13.1642 15 12.75C15 12.3358 14.6642 12 14.25 12H3.75Z"
                fill="#868B99"
              />
            </svg>
            Status :
            <span
              className={`ml-2 ${
                data?.status === "Active" ? "text-green-500" : "text-red-500"
              }`}
            >
              {data?.status}
            </span>
          </li>
          <li className="bg-background flex items-center rounded px-5 py-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 1.6875C6.31066 1.6875 6.5625 1.93934 6.5625 2.25V3.1875H11.4375V2.25C11.4375 1.93934 11.6893 1.6875 12 1.6875C12.3107 1.6875 12.5625 1.93934 12.5625 2.25V3.1875H13.5C14.6391 3.1875 15.5625 4.11092 15.5625 5.25V14.25C15.5625 15.3891 14.6391 16.3125 13.5 16.3125H4.5C3.36092 16.3125 2.4375 15.3891 2.4375 14.25V5.25C2.4375 4.11091 3.36091 3.1875 4.5 3.1875H5.4375V2.25C5.4375 1.93934 5.68934 1.6875 6 1.6875ZM5.4375 4.3125H4.5C3.98223 4.3125 3.5625 4.73223 3.5625 5.25V6.9375H14.4375V5.25C14.4375 4.73223 14.0178 4.3125 13.5 4.3125H12.5625V5.25C12.5625 5.56066 12.3107 5.8125 12 5.8125C11.6893 5.8125 11.4375 5.56066 11.4375 5.25V4.3125H6.5625V5.25C6.5625 5.56066 6.31066 5.8125 6 5.8125C5.68934 5.8125 5.4375 5.56066 5.4375 5.25V4.3125ZM14.4375 8.0625H3.5625V14.25C3.5625 14.7678 3.98223 15.1875 4.5 15.1875H13.5C14.0178 15.1875 14.4375 14.7678 14.4375 14.25V8.0625Z"
                fill="#ac66f3"
              />
              <path
                d="M6.375 9H4.875C4.66789 9 4.5 9.16789 4.5 9.375V10.875C4.5 11.0821 4.66789 11.25 4.875 11.25H6.375C6.58211 11.25 6.75 11.0821 6.75 10.875V9.375C6.75 9.16789 6.58211 9 6.375 9Z"
                fill="#868B99"
              />
              <path
                d="M9.75 9H8.25C8.04289 9 7.875 9.16789 7.875 9.375V10.875C7.875 11.0821 8.04289 11.25 8.25 11.25H9.75C9.95711 11.25 10.125 11.0821 10.125 10.875V9.375C10.125 9.16789 9.95711 9 9.75 9Z"
                fill="#868B99"
              />
              <path
                d="M13.125 9H11.625C11.4179 9 11.25 9.16789 11.25 9.375V10.875C11.25 11.0821 11.4179 11.25 11.625 11.25H13.125C13.3321 11.25 13.5 11.0821 13.5 10.875V9.375C13.5 9.16789 13.3321 9 13.125 9Z"
                fill="#868B99"
              />
            </svg>
            Ticket Created :{" "}
            <span className="ml-2">
              {data?.created_at && dateFormat(data?.created_at)}
            </span>
          </li>
          <li className="bg-background flex items-center rounded px-5 py-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="mr-2"
            >
              <path
                d="M16.3877 7.68C16.7289 7.66947 17 7.38988 17 7.04856V4.63175C17 4.28288 16.7172 4 16.3682 4H1.63175C1.28284 4.00003 1 4.28288 1 4.63175V7.04697C1 7.39584 1.28284 7.67872 1.63175 7.67872C2.41981 7.67872 3.06094 8.31984 3.06094 9.10791C3.06094 9.89597 2.41981 10.5371 1.63175 10.5371C1.28284 10.5371 1 10.82 1 11.1688V13.5841C1 13.9329 1.28284 14.2158 1.63175 14.2158H16.3683C16.7172 14.2158 17 13.933 17 13.5841V11.1672C17 10.8259 16.7289 10.5463 16.3878 10.5358C15.6117 10.5118 15.0037 9.88466 15.0037 9.10791C15.0037 8.33116 15.6117 7.70397 16.3877 7.68ZM6.08578 12.9523H2.26347V11.7257C3.44447 11.4407 4.32441 10.3752 4.32441 9.10791C4.32441 7.84066 3.44447 6.77503 2.26347 6.49003V5.2635H6.08578V12.9523ZM14.5015 10.9837C14.8452 11.3373 15.2708 11.5853 15.7366 11.7092V12.9523H7.34925V5.2635H15.7365V6.50656C15.2708 6.6305 14.8452 6.87853 14.5015 7.23209C14.0106 7.73722 13.7402 8.40341 13.7402 9.10794C13.7402 9.81241 14.0106 10.4786 14.5015 10.9837Z"
                fill="#ac66f3"
              />
              <path
                d="M12.6329 7.31641H8.69425C8.34538 7.31641 8.0625 7.59925 8.0625 7.94816C8.0625 8.29706 8.34534 8.57991 8.69425 8.57991H12.6329C12.9818 8.57991 13.2647 8.29706 13.2647 7.94816C13.2647 7.59925 12.9818 7.31641 12.6329 7.31641Z"
                fill="#868B99"
              />
              <path
                d="M12.6329 9.63574H8.69425C8.34538 9.63574 8.0625 9.91859 8.0625 10.2675C8.0625 10.6164 8.34534 10.8992 8.69425 10.8992H12.6329C12.9818 10.8992 13.2647 10.6164 13.2647 10.2675C13.2647 9.91859 12.9818 9.63574 12.6329 9.63574Z"
                fill="#868B99"
              />
            </svg>
            Ticket ID : <span className="ml-2">#{data?.ticket_id}</span>
          </li>
          {data?.assignable_id && (
            <li className="bg-background flex items-center rounded px-5 py-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M11.9922 5.25C11.9922 6.90686 10.649 8.25 8.99219 8.25C7.33533 8.25 5.99219 6.90686 5.99219 5.25C5.99219 3.59314 7.33533 2.25 8.99219 2.25C10.649 2.25 11.9922 3.59314 11.9922 5.25Z"
                  stroke="#A1ABB6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.99219 10.501C6.0927 10.501 3.74219 12.8515 3.74219 15.751H14.2422C14.2422 12.8515 11.8917 10.501 8.99219 10.501Z"
                  stroke="#ac66f3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Support Hero :{" "}
              <Image
                className="border-border mx-2 inline-block rounded-full border-2"
                src={`/images/support-team/${heroId(data?.assignable_id)}.png`}
                width={24}
                height={24}
                alt={heroId(data?.assignable_id)}
              />
              <span className="capitalize">{heroId(data?.assignable_id)}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Messages */}
      <div className="lg:col-7 xl:col-8">
        <div className="bg-background rounded p-4">
          {messageLoader ? (
            <div className="text-primary p-10 text-center">
              <Spinner className="mx-auto" />
            </div>
          ) : (
            allMessages?.map((item) =>
              item.actor_type === "ThriveDesk\\Models\\Contact" ? (
                <div
                  key={item.id}
                  className="bg-muted mb-4 flex justify-end rounded p-4 text-right"
                >
                  <div className="mr-3">
                    <div className="mb-1 flex items-center justify-end">
                      <span className="text-text-light text-sm">
                        {dateFormat(item.created_at, " hh:mm a, dd MMM, yyyy")}
                      </span>
                      <span className="bg-primary mx-3 h-1 w-1 rounded-full"></span>
                      <strong>
                        {session.user?.firstName + " " + session.user?.lastName}
                      </strong>
                    </div>
                    <div
                      className={ticketBodyClassNames}
                      dangerouslySetInnerHTML={{
                        __html: parseMessage(item?.event?.html_body),
                      }}
                    />
                  </div>
                  <div className="mt-2 shrink-0">
                    {session.user?.image ? (
                      <Image
                        className="rounded-full object-cover"
                        src={session.user?.image}
                        height={30}
                        width={30}
                        alt="user image"
                      />
                    ) : (
                      // @ts-ignore
                      <Gravatar
                        email={session.user?.email || ""}
                        size={30}
                        className="rounded-full"
                        default="mp"
                        alt="user image"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div key={item.id} className="bg-muted mb-4 flex rounded p-4">
                  <div className="mt-2 shrink-0">
                    <img
                      height={30}
                      width={30}
                      src={item.actor.avatar}
                      alt={item.actor.name}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="mb-1 flex items-center">
                      <strong>{item.actor.name}</strong>
                      <span className="bg-primary mx-3 h-1 w-1 rounded-full"></span>
                      <span className="text-text-light text-sm">
                        {dateFormat(item.created_at, " hh:mm a, dd MMM, yyyy")}
                      </span>
                    </div>
                    <div
                      className={ticketBodyClassNames}
                      dangerouslySetInnerHTML={{
                        __html: parseMessage(item?.event?.html_body),
                      }}
                    />
                    {item?.event?.downloadable_attachments.length > 0 && (
                      <div className="mt-2">
                        {item?.event?.downloadable_attachments?.map(
                          (attachment: any) => (
                            <a
                              key={attachment.id}
                              href={attachment.url}
                              className="font-medium"
                              target="_blank"
                              rel="noreferrer"
                              download={true}
                            >
                              <Paperclip className="text-lg" />{" "}
                              {attachment.name} (
                              {Number(attachment.size / 1024).toFixed(2)}kb)
                            </a>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )
          )}
          {data?.status === "Closed" && (
            <p className="flex justify-between">
              This ticket is closed.
              <span>
                {data?.closed_at &&
                  dateFormat(data?.closed_at, " hh:mm a, dd MMM, yyyy")}
              </span>
            </p>
          )}

          {/* New message */}
          <form onSubmit={handleSubmit} className="mt-12 text-right">
            <Textarea
              className="mb-4 py-3"
              rows={3}
              name="message"
              id="message"
              placeholder="Your message..."
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" disabled={loader}>
              {loader ? (
                <>
                  Sending <Spinner />
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketSingle;
