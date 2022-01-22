import { useRequireLogin } from "../../shared/hooks/useRequireLogin";
import MessageProvider from "../../stores/message";
import { Messages } from "./Messages";

export const MessagesPage = () => {
  useRequireLogin();

  return (
    <>
      <MessageProvider>
        <Messages />
      </MessageProvider>
    </>
  );
};
