import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MessengerChat } from "react-messenger-chat-plugin";
import { PulseLoader } from "react-spinners";
import { env } from "~/env.mjs";
import { FCC } from "~/types";

export const Layout: FCC = (props) => {
  const { children } = props;

  const [search, setSearch] = useState("");

  return (
    <>
      <main className="flex justify-center">
        <div className="flex w-full max-w-2xl flex-col gap-4 px-2 py-4 md:gap-6 md:py-6">
          <div className="form-control relative">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input bg-white pl-12 pr-14"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <div className="absolute bottom-0 left-0 top-0 flex w-14 items-center justify-center">
              <BsSearch className="h-5 w-5" />
            </div>
            <div className="absolute bottom-0 right-0 top-0 flex w-16 items-center justify-center">
              <PulseLoader
                loading={Boolean(search.length)}
                size={8}
                color={"#2b2f38"}
              />
            </div>
          </div>
          {children}
        </div>
      </main>
      <MessengerChat
        pageId={env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        language="ro_RO"
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
