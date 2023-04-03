import { MessengerChat } from "react-messenger-chat-plugin";
import { env } from "~/env.mjs";
import type { FCC } from "~/types";

export const Layout: FCC = (props) => {
  const { children } = props;

  return (
    <>
      <main className="flex justify-center">
        <div className="flex w-full max-w-2xl flex-col gap-4 px-2 py-4 md:gap-6 md:py-6">
          {children}
        </div>
      </main>
      <MessengerChat
        pageId={env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        language="en_US"
        themeColor={"#000000"}
        bottomSpacing={300}
        loggedInGreeting="loggedInGreeting"
        loggedOutGreeting="loggedOutGreeting"
        greetingDialogDisplay={"show"}
        debugMode={true}
        onMessengerShow={() => {
          console.log("onMessengerShow");
        }}
        onMessengerHide={() => {
          console.log("onMessengerHide");
        }}
        onMessengerDialogShow={() => {
          console.log("onMessengerDialogShow");
        }}
        onMessengerDialogHide={() => {
          console.log("onMessengerDialogHide");
        }}
        onMessengerMounted={() => {
          console.log("onMessengerMounted");
        }}
        onMessengerLoad={() => {
          console.log("onMessengerLoad");
        }}
      />
    </>
  );
};
