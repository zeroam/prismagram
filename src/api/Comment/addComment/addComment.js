import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middelware";

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { text, postId } = args;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        text,
      });
      return comment;
    },
  },
};
