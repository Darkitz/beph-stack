import Html from "@kitajs/html";
import { GetHandler } from "app";
import { getIsSignUpEnabled } from "codeToggles/auth";
import { Context } from "elysia";
import { isLoggedInShallow } from "helpers/LoginSession";
import { PageTemplate } from "partials/PageTemplate";

export const get: GetHandler = async (ctx) => {
  return (
    <PageTemplate
      signUpEnabled={await getIsSignUpEnabled()}
      title="Hello Friend!"
      isLoggedIn={isLoggedInShallow(ctx.cookie)}
    >
      <div class="flex flex-col h-full justify-center">
        <h1 class="block text-accent">Hello, Friend.</h1>
      </div>
    </PageTemplate>
  );
};
