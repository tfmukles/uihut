import config from "@/config/config.json";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
export const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY!;
export const ENV = process.env.NODE_ENV;
export const VENDOR_ID = Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID);
export const VENDOR_AUTH_CODE = process.env.NEXT_PUBLIC_PADDLE_VENDOR_AUTH_CODE;
export const BASE_URL = config.site.base_url;
export const QUIZ_TIME = 180; // in seconds
