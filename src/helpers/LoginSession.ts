import { prisma } from "../db/db";

export function getLogInHeader(sessionId: string, maxAge: string | number) {
  return `Token=${sessionId};Path=/;Max-Age=${maxAge}`;
}

export function getRemoveLogInHeader() {
  return `Token=;Path=/;Max-Age=0`;
}
export function isLoggedInShallow(cookies: Record<string, string>) {
  //Create a new function for high-security
  return (cookies.Token ?? "").length > 0;
}

export async function isLoggedInComplex(cookies: Record<string, string>) {
  const cookie = cookies.Token ?? "";
  if (cookie.length > 0) {
    const session = await prisma.session.findFirst({
      where: {
        id: cookie,
      },
    });
    return session;
  }
  return false;
}

export function getSessionToken(cookies: Record<string, string>) {
  return cookies.Token ?? "";
}
