import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SignInButtons } from "./login/page";
import { HStack } from "@/styled-system/jsx";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // console.log(session);
  return (
    <HStack
      justify="center"
      align="center"
      css={{
        flex: 1,
      }}
    >
      <SignInButtons session={session} />
    </HStack>
  );
}
