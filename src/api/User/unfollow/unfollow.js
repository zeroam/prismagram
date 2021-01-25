import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
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
