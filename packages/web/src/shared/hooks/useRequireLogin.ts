import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../providers/user";

export const useRequireLogin = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
};
