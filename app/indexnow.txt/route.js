import { INDEXNOW_KEY } from "@/lib/indexnow";

/* Serves the IndexNow key file at /indexnow.txt. IndexNow fetches this to
   confirm site ownership before accepting submitted URLs. */
export const dynamic = "force-static";

export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
