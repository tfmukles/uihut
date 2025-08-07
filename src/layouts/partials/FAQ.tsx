import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import FloatingDot from "./FloatingDot";

const FAQ = ({ faqs }: { faqs: any }) => {
  return (
    faqs.enable && (
      <section className="py-[80px] lg:py-[120px]">
        <div className="container">
          <div className="row">
            <div className="col-11 mx-auto sm:col-10 lg:col-8">
              <div className="container mb-14 flex items-center justify-center">
                <div className="text-center">
                  <Heading className="gradient-text mb-2" level="h2">
                    {faqs.title}
                  </Heading>
                  <p className="text-balance text-text-light lg:text-base">
                    {faqs.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-current text-[#EDECF4]/[6%] max-lg:border-l lg:px-2">
            <div className="relative grid grid-cols-1 lg:grid-cols-2">
              {/* left and right border */}
              <Separator
                className="absolute -bottom-8 -top-8 right-0 h-auto max-lg:hidden"
                size="lg"
                orientation="vertical"
              />
              {faqs.faq_items.map((item: any, i: number) => {
                return (
                  <div
                    className="relative items-center gap-3 border-current p-4 max-lg:border-r max-sm:flex-col max-sm:text-center lg:gap-5 lg:p-6 xl:px-[30px]"
                    key={i}
                  >
                    <Heading level={"h4"} className="mb-4 text-text-light">
                      {item.question}
                    </Heading>
                    <p className="text-balance text-muted-foreground lg:text-base">
                      {item.answer}
                    </p>

                    <FloatingDot
                      position="top-left"
                      className="-left-[1.5px] -top-[1.5px] max-lg:hidden"
                    />

                    <FloatingDot
                      position="top-right"
                      className="-right-[1.5px] -top-[1.5px] max-lg:hidden"
                    />
                    <Separator
                      className="absolute -left-12 -right-12 top-0 w-auto"
                      size="lg"
                    />
                    {/* for last 2 item */}
                    {i === faqs.faq_items.length - 2 && (
                      <>
                        <Separator
                          className="absolute -left-12 -right-12 bottom-0 w-auto max-lg:hidden"
                          size="lg"
                        />
                        <FloatingDot
                          position="bottom-right"
                          className="-bottom-[1.5px] -right-[1.5px] max-lg:hidden"
                        />
                        <FloatingDot
                          position="bottom-left"
                          className="-bottom-[1.5px] -left-[1.5px] max-lg:hidden"
                        />
                      </>
                    )}
                    {i === faqs.faq_items.length - 1 && (
                      <>
                        <Separator
                          className="absolute -left-12 -right-12 bottom-0 w-auto"
                          size="lg"
                        />
                        <FloatingDot
                          position="bottom-right"
                          className="-bottom-[1.5px] -right-[1.5px] max-lg:hidden"
                        />

                        <FloatingDot
                          position="bottom-left"
                          className="-bottom-[1.5px] -left-[1.5px] max-lg:hidden"
                        />
                      </>
                    )}
                  </div>
                );
              })}
              <div className="hidden sm:col-span-2 sm:row-start-2 lg:block">
                <div className="grid lg:grid-cols-2">
                  <div>
                    <Separator
                      className="absolute -bottom-8 -top-8 h-auto"
                      size="lg"
                      orientation="vertical"
                    />
                  </div>
                  <div>
                    <Separator
                      className="absolute -bottom-8 -top-8 h-auto"
                      size="lg"
                      orientation="vertical"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default FAQ;
