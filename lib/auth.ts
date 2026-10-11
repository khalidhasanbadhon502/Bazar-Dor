
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";


const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
      }
    : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
      }
    : {}),
};

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders,
  plugins: [nextCookies()],
});