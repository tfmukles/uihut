"use client";

import { createFigmaToken } from "@/actions/figma-token";
import { TFigmaToken } from "@/actions/figma-token/type";
import Heading from "@/components/ui/title";
import { useSubmitForm } from "@/hooks/useSubmit";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const page = (params: { searchParams: Promise<{ token: string }> }) => {
  const searchParams = use(params.searchParams);
  const { data: session, status: authState } = useSession();
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const tokenName = searchParams.token;

  const { action } = useSubmitForm<TFigmaToken>(createFigmaToken, {
    onSuccess: () => {
      setStatus("success");
    },
  });

  useEffect(() => {
    if (authState === "authenticated" && tokenName) {
      action({
        user_id: session?.user?.id!,
        token_name: tokenName,
        expires_in: "9999d",
        currentTime: new Date().toISOString(),
      });
    }
  }, [authState, tokenName]);

  return (
    <>
      <SeoMeta title="Figma Connect" noindex={true} />
      <BoxLayout>
        <section className="pt-28">
          <div className="container">
            <div className="row">
              <div className="text-center">
                {status === "success" ? (
                  <>
                    <div className="mb-8 flex items-center justify-center space-x-4">
                      <Image
                        src="/images/svgs/figma.svg"
                        width={20}
                        height={30}
                        alt="success"
                      />
                      <Image
                        src="/images/svgs/right-left-arrow.svg"
                        width={30}
                        height={30}
                        alt="success"
                      />
                      <Image
                        src="/images/svgs/uihut.svg"
                        width={30}
                        height={30}
                        alt="success"
                      />
                    </div>
                    <Heading className="mb-4" level="h3" variant="gradient">
                      Account successfully linked
                    </Heading>
                    <p>
                      Close this tab and head back to Figma to start using the
                      plugin.
                    </p>
                  </>
                ) : tokenName ? (
                  <>
                    <Loader className="mx-auto mb-8 h-8 w-8 animate-spin" />
                    <Heading className="mb-6" level="h3" variant="gradient">
                      Connecting, Please wait...
                    </Heading>
                  </>
                ) : (
                  <>
                    <Heading className="mb-6" level="h2" variant="gradient">
                      Something went wrong
                    </Heading>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
};

export default page;
