import { useRequireLogin } from "../../shared/hooks/useRequireLogin";
import { Messages } from "./Messages";

export const MessagesPage = () => {
  useRequireLogin();

  return (
    <>
      <Messages />
    </>
  );
};
