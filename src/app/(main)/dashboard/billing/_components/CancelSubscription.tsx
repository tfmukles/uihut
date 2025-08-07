"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { VENDOR_AUTH_CODE, VENDOR_ID } from "@/lib/constant";
import Axios from "@/lib/utils/axios";
import { useState } from "react";

const CancelSubscription = ({
  subscription_id,
}: {
  subscription_id: string;
}) => {
  const [loader, setLoader] = useState(false);

  // handle cancel subscription
  const handleCancelSubscription = async (subscription_id: string) => {
    setLoader(true);
    const paddleResponse = await Axios.post("/paddle/cancel-subscription", {
      vendor_id: VENDOR_ID,
      vendor_auth_code: VENDOR_AUTH_CODE,
      subscription_id: subscription_id,
    });

    if (paddleResponse.status === 200) {
      setLoader(false);
    }
  };

  return (
    <Button
      onClick={() => handleCancelSubscription(subscription_id)}
      className="rounded-full py-5 before:rounded-full after:rounded-full"
      variant={"destructive"}
      type="button"
      disabled={loader}
    >
      {loader ? (
        <>
          Cancelling
          <Spinner className="size-5" />
        </>
      ) : (
        "Cancel Subscription"
      )}
    </Button>
  );
};

export default CancelSubscription;
