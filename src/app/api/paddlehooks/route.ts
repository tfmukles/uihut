import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { verifyPaddleWebhook } from "verify-paddle-webhook";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const BackendURL = process.env.NEXT_PUBLIC_API_URL;
const PublicKey = `
-----BEGIN PUBLIC KEY-----
${process.env.PADDLE_PUBLIC_KEY}
-----END PUBLIC KEY-----
`;
const postHeaders = {
  authorization_token: `Bearer ${TOKEN}`,
};

type TPackage = "basic" | "premium" | "team" | "b2b" | "minihut";

// get expires date
const getExpiresDate = (packageName: TPackage) => {
  const months = { basic: 6, premium: 12, team: 12, b2b: 12, minihut: 1 };
  const date = new Date();
  date.setMonth(date.getMonth() + months[packageName]);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().split("T")[0] + "T00:00:00.000Z";
};

// get previous date
const getPrevDate = (dateStr: string | number | Date) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString();
};

// user_id generator
const userIdGenerator = (email: string) =>
  "@uih_" + email.replace(/[@.!#$%&'*+-/=?^_`{|}~]/g, "_").toLowerCase();

export async function POST(req: NextRequest) {
  const reqBody = await req.text();
  const params = new URLSearchParams(reqBody);
  const body = Object.fromEntries(params.entries());

  if (!body) {
    return NextResponse.json(
      { error: "No request body found" },
      { status: 401 },
    );
  } else if (body.alert_name === "payment_succeeded") {
    // product payment succeeded
    if (verifyPaddleWebhook(PublicKey, body)) {
      const customData = JSON.parse(body.custom_data || "{}");
      const packageName = String(customData.package || body.product_name)
        .toLowerCase()
        .replace(/ /g, "-");
      const postOrderData = {
        checkout_id: String(body.checkout_id),
        order_id: String(body.order_id),
        subscription_id: "",
        user_id: String(customData.user_id || userIdGenerator(body.email)),
        user_email: String(body.email),
        package: packageName,
        next_payment_amount: String("0"),
        expires_date:
          packageName === "minihut" ? getExpiresDate("minihut") : "never",
        current_time: new Date().toISOString(),
      };

      const postPaymentData = {
        order_id: String(body.order_id),
        checkout_id: String(body.checkout_id),
        plan_name: packageName,
        currency: String(body.currency),
        coupon: String(body.coupon),
        method: String(body.payment_method),
        earnings: String(body.earnings),
        expires_date:
          packageName === "minihut" ? getExpiresDate("minihut") : "never",
        next_payment_amount: String("0"),
        total: String(body.balance_gross),
        tax: String(body.payment_tax),
        fee: String(body.fee),
        receipt_url: String(body.receipt_url),
      };

      try {
        const orderResponse = await axios.post(
          `${BackendURL}/order`,
          postOrderData,
          {
            headers: postHeaders,
          },
        );

        const paymentResponse = await axios.post(
          `${BackendURL}/payment`,
          postPaymentData,
          {
            headers: postHeaders,
          },
        );

        if (orderResponse.status === 200 && paymentResponse.status === 200) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
        return NextResponse.json({ error: error }, { status: 501 });
      }
    }
  } else if (body.alert_name === "payment_refunded") {
    // product payment refunded
    if (verifyPaddleWebhook(PublicKey, body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } else if (body.alert_name === "locker_processed") {
    // product locker processed
    if (verifyPaddleWebhook(PublicKey, body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } else if (body.alert_name === "subscription_created") {
    // subscription created
    if (verifyPaddleWebhook(PublicKey, body)) {
      const customData = JSON.parse(body.custom_data || "{}");
      const postOrderData = {
        checkout_id: String(body.checkout_id),
        order_id: "",
        subscription_id: String(body.subscription_id),
        user_id: String(customData.user_id || userIdGenerator(body.email)),
        user_email: String(body.email),
        package: String(customData.package || body.subscription_plan_id),
        expires_date: getExpiresDate(customData.package.toLowerCase()),
        next_payment_amount: String(body.unit_price),
        current_time: new Date().toISOString(),
      };

      try {
        const orderResponse = await axios.post(
          `${BackendURL}/order`,
          postOrderData,
          {
            headers: postHeaders,
          },
        );

        if (orderResponse.status === 200) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
        return NextResponse.json({ error: error }, { status: 501 });
      }
    }
  } else if (body.alert_name === "subscription_payment_succeeded") {
    // subscription payment succeeded
    if (verifyPaddleWebhook(PublicKey, body)) {
      const postPaymentData = {
        order_id: String(body.order_id),
        checkout_id: String(body.checkout_id),
        plan_name: String(body.plan_name),
        currency: String(body.balance_currency),
        coupon: String(body.coupon),
        method: String(body.payment_method),
        earnings: String(body.balance_earnings),
        expires_date: getPrevDate(body.next_bill_date),
        next_payment_amount: String(body.next_payment_amount),
        total: String(body.balance_gross),
        tax: String(body.payment_tax),
        fee: String(body.balance_fee),
        receipt_url: String(body.receipt_url),
      };

      try {
        const paymentResponse = await axios.post(
          `${BackendURL}/payment`,
          postPaymentData,
          {
            headers: postHeaders,
          },
        );

        if (paymentResponse.status === 200) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
        return NextResponse.json({ error: error }, { status: 501 });
      }
    }
  } else if (body.alert_name === "subscription_cancelled") {
    // subscription canceled
    if (verifyPaddleWebhook(PublicKey, body)) {
      const postPaymentData = {
        checkout_id: String(body.checkout_id),
        expires_date: new Date(body.cancellation_effective_date).toISOString(),
        cancel_date: new Date().toISOString(),
      };

      try {
        const paymentResponse = await axios.post(
          `${BackendURL}/order/cancel`,
          postPaymentData,
          {
            headers: postHeaders,
          },
        );

        if (paymentResponse.status === 200) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          return NextResponse.json({ success: true }, { status: 200 });
        }
        return NextResponse.json({ error: error }, { status: 501 });
      }
    }
  } else if (body.alert_name === "subscription_payment_refunded") {
    // subscription payment refunded
    if (verifyPaddleWebhook(PublicKey, body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } else {
    // unknown webhook
    if (verifyPaddleWebhook(PublicKey, body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  }
}
