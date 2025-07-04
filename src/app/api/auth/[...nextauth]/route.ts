import { authOptions } from "@/server/auth";
import NextAuth from "next-auth";

// eslint-disable-next-line
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
