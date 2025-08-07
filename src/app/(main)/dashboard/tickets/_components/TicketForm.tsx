import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import Heading from "@/components/ui/title";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const departments = [
  {
    label: "Product Support",
    value: "Product Support",
  },
  {
    label: "Payment Problem",
    value: "Payment Problem",
  },
  {
    label: "Others",
    value: "Others",
  },
];

const TicketForm = ({ session }: { session: any }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [department, setDepartment] = useState("");

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // form submit
      const response = await axios.post(
        "https://formsubmit.co/ajax/uihut@themefisher.thrivedesk.email",
        {
          _subject:
            department === "Others" ? formData.get("subject") : department,
          name: session.user?.firstName + " " + session.user?.lastName,
          email: session.user?.email,
          subject:
            department === "Others" ? formData.get("subject") : department,
          message: formData.get("message"),
        },
        {
          headers: { "Content-type": "application/json" },
        },
      );
      setSubmitted(response.data.success);
    } catch (error: any) {
      setSubmitted(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {!submitted ? (
        <div className="row mx-0">
          <div className="mb-8 rounded-lg border border-border p-8 lg:col-7">
            <Link
              className="mb-8 inline-flex items-center"
              href="/dashboard/tickets"
            >
              <ArrowLeft className="mr-1 size-5" />
              All Tickets
            </Link>
            <form
              className="row items-center"
              id="form"
              method="POST"
              onSubmit={formHandler}
            >
              <fieldset className="col-12 mb-3">
                <Label htmlFor="Department">Department*</Label>
                <Select
                  key={"Department"}
                  value={department}
                  name="department"
                  onValueChange={(e) => setDepartment(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-text-light">
                    {departments.map((item, i) => (
                      <SelectItem
                        key={i}
                        value={item.value}
                        className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </fieldset>

              {department === "Others" && (
                <div className="col-12 mb-4">
                  <fieldset className="mb-3">
                    <Label htmlFor="subject">Subject*</Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Enter Subject"
                    />
                  </fieldset>
                </div>
              )}

              <div className="col-12 mb-4">
                <Label htmlFor="message">Message*</Label>
                <Textarea
                  rows={3}
                  name="message"
                  id="message"
                  placeholder="Your message..."
                  required
                />
              </div>
              <div className="col-12 mb-4">
                <Button type="submit" disabled={loader}>
                  {loader ? (
                    <>
                      Submitting
                      <Spinner className="ml-2" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
              <div className="col-12">
                <small
                  style={{ fontSize: "12px" }}
                  className="mb-3 inline-block pt-1"
                >
                  Your data is safe with us. We take your privacy seriously and
                  never share your data with anyone. Check our{" "}
                  <Link href="/privacy-policy" className="underline">
                    privacy policy
                  </Link>
                </small>
              </div>
            </form>
          </div>
          <div className="pl-8 lg:col-5 lg:mt-8">
            <div className="mb-12">
              <Heading className="mb-4" level={"h3"}>
                Dedicated Support Agents For You
              </Heading>
              <div className="assistant-users flex items-center *:size-14">
                <Image
                  className="border-body rounded-full border-2"
                  src="/images/support-team/somrat.png"
                  alt="somrat"
                  height="60"
                  width="60"
                />
                <Image
                  className="border-body rounded-full border-2"
                  src="/images/support-team/farhad.png"
                  alt="farhad"
                  height="60"
                  width="60"
                />
                <Image
                  className="border-body rounded-full border-2"
                  src="/images/support-team/tuhin.png"
                  alt="tuhin"
                  height="60"
                  width="60"
                />
                <Image
                  className="border-body rounded-full border-2"
                  src="/images/support-team/monsurul.png"
                  alt="monsurul"
                  height="60"
                  width="60"
                />
                <Image
                  className="border-body rounded-full border-2"
                  src="/images/support-team/sajib.png"
                  alt="sajib"
                  height="60"
                  width="60"
                />
              </div>
            </div>
            <div className="mb-12">
              <Heading className="mb-4" level={"h3"}>
                Support Availability
              </Heading>
              <p className="text-sm">
                Technical support services for our themes are{" "}
                <strong>
                  available Saturday to Thursday 9 AM - 5 PM (GMT+6)
                </strong>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <Image
            src="/images/ticket-submitted.svg"
            alt="success"
            height="120"
            width="145"
            className="mx-auto mb-6"
          />
          <Heading className="mb-4" level={"h3"}>
            Ticket Submitted
          </Heading>
          <p className="mx-auto mb-5 max-w-[400px]">
            Your Ticket Has Been Submitted. We Will Get Back To You Soon.
          </p>
          <Button>
            <a href={`/dashboard/tickets?submitted=true`}>View Tickets</a>
          </Button>
        </div>
      )}
    </>
  );
};

export default TicketForm;
