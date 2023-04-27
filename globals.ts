export const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_URL
    : process.env.VERCEL_URL;
