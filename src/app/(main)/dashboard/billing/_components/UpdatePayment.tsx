"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { VENDOR_AUTH_CODE, VENDOR_ID } from "@/lib/constant";
import Axios from "@/lib/utils/axios";
import { useState } from "react";

const UpdatePayment = ({ subscription_id }: { subscription_id: string }) => {
  const [loader, setLoader] = useState(false);

  // handle cancel subscription
  const handleUpdatePayment = async (subscription_id: string) => {
    setLoader(true);
    const paddleResponse = await Axios.post("/paddle/generate-update-url", {
      vendor_id: VENDOR_ID,
      vendor_auth_code: VENDOR_AUTH_CODE,
      subscription_id: subscription_id,
    });

    // @ts-ignore
    Paddle.Checkout.open({
      override: paddleResponse.data.url,
      closeCallback: async () => {
        setLoader(false);
      },
    });
  };

  return (
    <Button
      onClick={() => handleUpdatePayment(subscription_id)}
      className="rounded-full bg-white py-5 before:rounded-full after:rounded-full"
      variant={"outline"}
      type="button"
      disabled={loader}
    >
      {loader ? (
        <>
          Updating
          <Spinner className="size-5" />
        </>
      ) : (
        "Update Card"
      )}
    </Button>
  );
};

export default UpdatePayment;
