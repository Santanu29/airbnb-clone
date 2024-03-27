import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
// import { User } from "@prisma/client";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // Some issues with the toISOString(). So I have just returned the string right now
    return {
      ...currentUser,
      createdAt: currentUser.createAt?.toISOString(),
      updatedAt: currentUser.updatedAt?.toISOString(),
      emailVerfied: currentUser?.emailVerfied?.toISOString() || null,
    };
  } catch (error: any) {
    console.log("error has occured in catch", error);
    return null;
  }
}
