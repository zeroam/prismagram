import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middelware";

export default {
  Mutation: {
    editUser: async (_, args, { request }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      return await prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar },
      });
    },
  },
};
