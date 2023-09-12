import Html, { PropsWithChildren } from "@kitajs/html";
import { BaseHtml } from "html";
import { DynamicHeader } from "./DynamicHeader";

interface PageTemplateProps {
  title?: string;

  isLoggedIn?: boolean;

  signUpEnabled?: boolean;
}

export const PageTemplate = (props: PropsWithChildren<PageTemplateProps>) => {
  //
  return (
    <BaseHtml title={props.title}>
      <body
        hx-boost="true"
        class="no-transition bg-background  slide-it flex-reverse text-text flex flex-col w-full h-screen justify-stretch items-stretch"
      >
        <DynamicHeader
          signUpEnabled={props.signUpEnabled}
          isLoggedIn={props.isLoggedIn}
          class="no-transition flex-grow-0 flex-shrink-0"
        />
        <main class="flex-1 flex flex-col gap-5 items-center">
          {props.children}
        </main>
      </body>
    </BaseHtml>
  );
  //
};
