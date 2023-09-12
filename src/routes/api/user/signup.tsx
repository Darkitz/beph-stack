import Html from "@kitajs/html";
import { BaseHtml } from "html";

import { GetHandler, PostHandler } from "app";
import { prisma } from "db/db";
import { getLogInHeader } from "helpers/LoginSession";
import { getIsSignUpEnabled } from "codeToggles/auth";

interface signupPostData {
  username?: string;
  password?: string;
}

export const post: PostHandler = async (ctx) => {
  if (!(await getIsSignUpEnabled())) {
    return new Response("Sign up currently disabled", {
      status: 503,
    });
  }

  const input = ctx.body as signupPostData;

  if (!input || !input.password || !input.username) {
    return new Response("Please enter a username or Password", {
      status: 422,
    });
  }
  const username = input.username;
  const password = input.password;

  if (username.length < 3 || password.length < 3) {
    return new Response("Please enter a longer username or Password", {
      status: 422,
    });
  }
  try {
    const result = await prisma.user.create({
      data: {
        directAccount: {
          create: {
            username: username,
            password: password,
          },
        },
        Sessions: { create: {} },
      },
      select: {
        Sessions: true,
      },
    });

    const headers: HeadersInit = {
      "Set-Cookie": getLogInHeader(
        result.Sessions[0].id,
        result.Sessions[0].expiresAfter.toString()
      ),
    };
    const currentUrl = ctx.request.headers.get("HX-Current-URL");
    if (currentUrl) {
      headers["HX-Location"] = currentUrl;
    }
    return new Response(null, {
      status: 204,
      headers: headers,
    });
  } catch (e) {
    return new Response("Couldn't create user", {
      status: 500,
    });
  }
  /*
  if (username == "test" && password == "test") {
    return new Response(null, {
      status: 200,
      headers: {
        "HX-Refresh": "true",
        "Set-Cookie": "",
      },
    });
  } else {
    return new Response("Wrong password or something idk", {
      status: 401,
    });
  }*/
};
