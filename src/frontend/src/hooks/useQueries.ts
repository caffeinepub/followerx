import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      fullName,
      instagramUsername,
      packageName,
      postLink,
    }: {
      fullName: string;
      instagramUsername: string;
      packageName: string;
      postLink: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitOrder(
        fullName,
        instagramUsername,
        packageName,
        postLink,
      );
    },
  });
}
