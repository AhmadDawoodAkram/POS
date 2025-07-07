import { SquareClient, SquareEnvironment } from "square";

export interface SquareSession {
  user?: {
    accessToken?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export default function Square({ session }: { session: SquareSession }) {
  const client = new SquareClient({
    token: session.user?.accessToken,
    environment: SquareEnvironment.Sandbox,
  });

  return client;
}
