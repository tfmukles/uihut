"use client";

import Expandable from "@/components/Expandable";
import Heading from "@/components/ui/title";

const AuthorFaq = () => {
  const data = [
    {
      accordion_title: "How long does it take to review my submission?",
      accordion_content:
        "Reviews typically take up to 7 days. You will be notified via email",
    },
    {
      accordion_title: "When will I get paid?",
      accordion_content:
        "You will receive payment after your design is reviewed and approved by our team.",
    },
    {
      accordion_title: "Can I sell the same design on other platforms?",
      accordion_content:
        "No, once we purchase the design, it becomes the sole property of UIHut.",
    },
    {
      accordion_title: "How much will I get paid?",
      accordion_content:
        "Payment varies depending on the quality and complexity of the design. Each design is assessed individually. We will schedule a meeting with you to discuss and set a price.",
    },
    {
      accordion_title: "Have Any Further Questions?",
      accordion_content:
        "If you have any additional questions or need more information, feel free to contact us. https://uihut.com/contact",
    },
  ];

  return (
    <div>
      <Heading className="gradient-text mb-8 text-center" level="h2">
        Frequently Asked Questions
      </Heading>
      {data.map((accordion: any, i: number) => (
        <div key={i}>
          <Expandable
            title={accordion.accordion_title}
            content={accordion.accordion_content}
          />
        </div>
      ))}
    </div>
  );
};

export default AuthorFaq;
