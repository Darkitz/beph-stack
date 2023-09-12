import Html from "@kitajs/html";
import { BaseHtml } from "html";

import { GetHandler } from "app";
import { prisma } from "db/db";
import { getRemoveLogInHeader, getSessionToken } from "helpers/LoginSession";

export const get: GetHandler = async (ctx) => {
  const sessionId = getSessionToken(ctx.cookie);

  if (sessionId) {
    try {
      await prisma.session.delete({
        where: { id: sessionId },
      });
    } catch (e) {
      console.log("Couldnt delete Session: " + sessionId);
    }
  }

  const headers: HeadersInit = {
    "Set-Cookie": getRemoveLogInHeader(),
  };

  const currentUrl = ctx.request.headers.get("HX-Current-URL");
  if (currentUrl) {
    headers["HX-Location"] = currentUrl;
  }
  return new Response(null, {
    status: 303,
    headers: headers,
  });
};
