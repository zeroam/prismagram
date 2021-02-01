import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const canSee = await prisma.$exists.room({
        participants_some: {
          id: user.id,
        },
      });
      if (canSee) {
        return await prisma.room({ id }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("You can't see this");
      }
    },
  },
};
