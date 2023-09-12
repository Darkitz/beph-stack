import Html from "@kitajs/html";
import { BaseHtml } from "../html";
import { Context } from "elysia";
import { isLoggedInShallow } from "helpers/LoginSession";
import { GetHandler } from "app";
import { PageTemplate } from "partials/PageTemplate";
import { getIsSignUpEnabled } from "codeToggles/auth";

export const get: GetHandler = async (ctx) => {
  const isLoggedIn = isLoggedInShallow(ctx.cookie);

  if (isLoggedIn) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/",
        "HX-Replace-URL": "/",
      },
    });
  }

  const signUpEnabled = await getIsSignUpEnabled();

  return (
    <PageTemplate
      signUpEnabled={signUpEnabled}
      isLoggedIn={isLoggedIn}
      title="Sign Up!"
    >
      <div class="flex flex-col h-full justify-center">
        {!signUpEnabled && (
          <h1 class="text-red-400">Sign up is currently disabled!</h1>
        )}
        {signUpEnabled && (
          <>
            <form
              id="LoginForm"
              class="text-text flex flex-col justify-center items-stretch gap-1"
            >
              <input
                name="username"
                class="bg-text text-background placeholder-gray-500 p-2"
                placeholder="Username"
                type="text"
              />
              <input
                name="password"
                class="bg-text text-background placeholder-gray-500 p-2"
                placeholder="Password"
                type="password"
              />

              <button
                hx-post="/api/user/signup"
                hx-target=".error"
                class="rounded-sm bg-accent hover:bg-accentHover text-textOnAccent px-1 py-0.5"
              >
                Sign Up!
              </button>
            </form>

            <div class="bg-accent text-textOnAccent error"></div>
          </>
        )}
      </div>
    </PageTemplate>
  );
};
