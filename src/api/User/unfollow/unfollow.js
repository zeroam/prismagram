import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middelware";

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {
                id,
              },
            },
          },
        });
      } catch {
        return false;
      }

      return true;
    },
  },
};
