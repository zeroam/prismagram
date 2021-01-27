import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      return await prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    },
  },
};
