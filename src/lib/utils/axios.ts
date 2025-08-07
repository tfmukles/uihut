import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const BackendURL = process.env.NEXT_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: BackendURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    authorization_token: `Bearer ${TOKEN}`,
  },
});

Axios.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      } else if (!config.headers.Authorization && !TOKEN) {
        console.warn("No authorization token available for request");
      }
    } catch (error) {
      console.error("Error getting session in request interceptor:", error);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to get a fresh session
        const session = await getSession();

        if (session?.user?.accessToken) {
          // Retry with the fresh token
          originalRequest.headers.Authorization = `Bearer ${session.user.accessToken}`;
          return Axios(originalRequest);
        } else {
          // No valid session, redirect to login
          console.warn("No valid session found, signing out user");
          await signOut({ redirect: false });
          // Optionally redirect to login page
          if (typeof window !== "undefined") {
            window.location.href = "/auth/signin";
          }
        }
      } catch (sessionError) {
        console.error("Error refreshing session:", sessionError);
        await signOut({ redirect: false });
      }
    }

    // Log other errors for debugging
    if (error.response?.status >= 500) {
      console.error(
        "Server error:",
        error.response.status,
        error.response.data,
      );
    } else if (error.response?.status === 403) {
      console.error("Forbidden access:", error.response.data);
    } else if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
    }

    return Promise.reject(error);
  },
);

export default Axios;
