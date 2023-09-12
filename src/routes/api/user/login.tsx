import { PostHandler } from "app";
import { prisma } from "db/db";
import { getLogInHeader } from "helpers/LoginSession";

interface loginFormData {
  username?: string;
  password?: string;
}

export const post: PostHandler = async (ctx) => {
  const input = ctx.body as loginFormData;

  if (!input || !input.password || !input.username) {
    return new Response("Please enter a username or Password", {
      status: 422,
    });
  }
  const username = input.username;
  const password = input.password;
  const directAccount = await prisma.directAccount.findFirst({
    where: { username: username, password: password },
  });

  if (!directAccount) {
    return new Response("No Account with credentials found", {
      status: 401,
    });
  }

  const newSession = await prisma.session.create({
    data: {
      userId: directAccount.userId,
    },
  });

  const headers: HeadersInit = {
    "Set-Cookie": getLogInHeader(
      newSession.id,
      newSession.expiresAfter.toString()
    ),
  };
  const currentUrl = ctx.request.headers.get("HX-Current-URL");
  if (currentUrl) {
    headers["HX-Location"] = currentUrl;
    //headers["HX-Replace-Url"] = currentUrl;
  }

  return new Response(null, {
    status: 200,
    headers: headers,
  });
};
