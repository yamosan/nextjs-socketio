import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../../stores/store";

export const useRequireLogin = () => {
  const { state } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!state.user) {
      router.push("/");
    }
  }, [state.user]);
};
