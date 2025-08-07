// @ts-nocheck
import Script from "next/script";

const VENDOR_ID = Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID);
const ENV = process.env.NODE_ENV;

export default function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onLoad={() => {
        if (ENV === "development") {
          Paddle.Environment.set("sandbox");
        }
        Paddle.Setup({
          vendor: VENDOR_ID,
        });

        // Partnero script
        const partneroQueryParam = "aff";
        const partneroCookieName = "partnero_partner";

        function getCookie(name) {
          const cookieArr = document.cookie
            .split(";")
            .map((cookie) => cookie.trim());
          for (const cookie of cookieArr) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (name === cookieName) {
              return decodeURIComponent(cookieValue);
            }
          }
          return null;
        }

        function injectCustomData() {
          const customerKey =
            new URLSearchParams(window.location.search).get(
              partneroQueryParam,
            ) || getCookie(partneroCookieName);

          if (customerKey) {
            const originalOpen = Paddle.Checkout.open;

            Paddle.Checkout.open = function (options) {
              options.passthrough = options.passthrough || {};
              options.passthrough.customer_key = customerKey;
              originalOpen.call(Paddle.Checkout, options);
            };
          }
        }

        injectCustomData();
      }}
    />
  );
}
