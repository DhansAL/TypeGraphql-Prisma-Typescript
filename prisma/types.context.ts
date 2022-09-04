import { PrismaClient } from "@prisma/client";

export type MyContext = {
  prisma: PrismaClient;
};
