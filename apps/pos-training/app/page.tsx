// apps/pos-training/app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { css } from "@/styled-system/css";
import { SignInButtons } from "./login/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // console.log(session);
  return (
    <div className={css({ h: "100vh" })}>
      <div
        className={css({
          display: "flex",
          h: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <SignInButtons session={session} />
      </div>
    </div>
  );
}
