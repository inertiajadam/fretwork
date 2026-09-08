import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { INDEXNOW_KEY, INDEXNOW_KEY_PATH } from "@/lib/indexnow";
import { allPaths } from "@/lib/routes";

/* Submits every site URL to IndexNow (Bing, Copilot, Yandex, and others) in one
   request, so new and changed pages get crawled in hours instead of waiting for
   a scheduled recrawl. Trigger it after a deploy:

       https://www.fretwork.studio/api/indexnow?key=<INDEXNOW_KEY>

   The key gate is light on purpose (the key is public), but the endpoint only
   ever submits our own URLs, so there is nothing to abuse. */
export const dynamic = "force-dynamic";

export async function GET(request) {
  const key = new URL(request.url).searchParams.get("key");
  if (key !== INDEXNOW_KEY) {
    return Response.json(
      { ok: false, error: "Pass ?key=<INDEXNOW_KEY> to submit." },
      { status: 401 }
    );
  }

  const urlList = allPaths().map((p) => absoluteUrl(p));
  const body = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: absoluteUrl(INDEXNOW_KEY_PATH),
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    return Response.json({
      ok: res.ok,
      indexNowStatus: res.status,
      submitted: urlList.length,
      host: body.host,
    });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 502 });
  }
}
