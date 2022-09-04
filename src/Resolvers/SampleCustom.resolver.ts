import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../prisma/generated/type-graphql";
import { MyContext } from "../../prisma/types.context";

@Resolver()
export class SampleCustomResolver {
  @Query(() => String, { description: "just a sample query" })
  hello() {
    return "Funny template lol";
  }

  @Query(() => [User], { description: "Get All users" })
  users(@Ctx() { prisma }: MyContext): Promise<User[]> {
    return prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name", () => String) //graphql-type
    name: string, // orm type
    @Ctx() { prisma }: MyContext
  ): Promise<User> {
    const user = prisma.user.create({ data: { name } });
    return user;
  }
}
