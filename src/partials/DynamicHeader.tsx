import Html from "@kitajs/html";
import { GetHandler, PostHandler, PutHandler, DelHandler, Context } from "app";
import { isLoggedInShallow } from "helpers/LoginSession";
import { BaseHtml } from "html";
import classNames from "classnames";
import { getIsSignUpEnabled } from "codeToggles/auth";

interface HeaderProps {
  class?: string;
  isLoggedIn?: boolean;
  username?: string;
  signUpEnabled?: boolean;
}

export const DynamicHeader = (props: HeaderProps) => {
  props.isLoggedIn = props.isLoggedIn ?? false;
  props.username = props.username ?? "undefined";
  props.signUpEnabled = props.signUpEnabled ?? true;
  //
  return (
    <header
      transition={false}
      class={classNames(
        "bg-slate-500 w-full h-8 flex flex-row justify-between gap-4 pl-2 items-center",
        props.class
      )}
    >
      <div class="flex-grow-0">
        {"Logged in: "}
        {props.isLoggedIn + ""}
      </div>
      <div class="flex-1"></div>
      <div class="flex-grow-0 self-stretch flex justify-stretch items-stretch relative">
        {props.isLoggedIn && (
          <div class="flex flex-row justify-start items-stretch gap-1">
            <button
              class="bg-secondary hover:bg-secondaryHover text-text flex flex-col justify-end px-6 pb-1 cursor-pointer outline-none border-none"
              onclick='document.querySelector("#accountDropdown")?.classList.toggle("invisible");'
            >
              <h5 class="align-text-bottom">Account</h5>
            </button>

            <ul
              id="accountDropdown"
              class="absolute top-full right-0 flex flex-col items-stretch justify-start w-48 bg-secondaryHover border-secondaryHover border-2 gap-0.5 invisible"
            >
              <li class="block bg-secondary text-right hover:bg-secondaryHover">
                <a class="block w-full h-full py-1 px-4 text-right" href="/">
                  My Account
                </a>
              </li>
              <li class="block bg-secondary text-right hover:bg-secondaryHover">
                <button
                  class="w-full h-full py-1 px-3 text-right"
                  hx-get="api/user/logout"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        {!props.isLoggedIn && (
          <div class="flex flex-row justify-start items-stretch gap-1">
            {props.signUpEnabled && (
              <a
                href="/signup"
                class="bg-accent hover:bg-accentHover text-textOnAccent flex flex-col justify-end px-6 pb-1 cursor-pointer outline-none border-none"
              >
                <h5 class="align-text-bottom text-textOnAccent">Sign Up!</h5>
              </a>
            )}

            <button
              class="bg-secondary hover:bg-secondaryHover text-text flex flex-col justify-end px-6 pb-1 cursor-pointer outline-none border-none"
              onclick='document.querySelector("#loginForm")?.classList.toggle("invisible");'
            >
              <h5 class="align-text-bottom">Login</h5>
            </button>
            <div
              id="loginForm"
              class="absolute top-full right-0 bg-secondary py-3 px-4 invisible"
            >
              <form class="text-text flex flex-col justify-center items-stretch gap-1">
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
                  hx-post="/api/user/login"
                  hx-target=".error"
                  class="rounded-sm bg-accent hover:bg-accentHover text-textOnAccent px-1 py-0.5"
                >
                  Login!
                </button>
              </form>
              <div class="bg-accent text-textOnAccent error"></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
  //
};
