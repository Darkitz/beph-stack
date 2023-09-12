import Html from "@kitajs/html";
import { GetHandler, PostHandler, PutHandler, DelHandler, Context } from "app";
import { isLoggedInShallow } from "helpers/LoginSession";
import { BaseHtml } from "html";
import classNames from "classnames";

const dropdown = () => {
  <div class="relative bg-slate-400">
    <button
      class="p-2"
      onclick='document.querySelector("#dropDownList")?.classList.toggle("invisible");'
    >
      Toggle the thing
    </button>
    <ul
      id="dropDownList"
      class="absolute top-full right-0 flex flex-col items-stretch justify-start w-96 gap-0.5 bg-pink-400 invisible border-pink-400 border-2"
    >
      <li class="block bg-purple-950 text-right hover:bg-purple-900">
        <button class="w-full h-full p-1">what</button>
      </li>
      <li class="block bg-purple-950 text-right hover:bg-purple-200">
        <button class="w-full h-full p-1">what2</button>
      </li>
    </ul>
  </div>;
};
