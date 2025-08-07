import { NextRequest, NextResponse } from "next/server";

// Extract username and tweetId from a tweet URL
function extractTweetInfo(
  url: string,
): { username: string; tweetId: string } | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/([^/]+)\/status\/(\d+)/i);
  return match ? { username: match[1], tweetId: match[2] } : null;
}

export async function POST(req: NextRequest) {
  const { tweetUrl } = await req.json();
  if (!tweetUrl) {
    return NextResponse.json({ error: "Missing tweetUrl" }, { status: 400 });
  }

  const tweetInfo = extractTweetInfo(tweetUrl);
  if (!tweetInfo) {
    return NextResponse.json({ error: "Invalid tweet URL" }, { status: 400 });
  }
  const { username, tweetId } = tweetInfo;

  // Try both domains and www variants for oEmbed
  const domains = ["twitter.com", "x.com"];
  let data = null;
  let lastError = null;

  for (const domain of domains) {
    for (const prefix of ["", "www."]) {
      const tweetPageUrl = `https://${prefix}${domain}/${username}/status/${tweetId}`;
      const oEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetPageUrl)}`;
      try {
        const res = await fetch(oEmbedUrl);
        if (res.ok) {
          data = await res.json();
          break;
        } else {
          lastError = `Failed to fetch tweet from ${tweetPageUrl}: ${res.status} ${res.statusText}`;
        }
      } catch (err) {
        lastError = `Error fetching from ${tweetPageUrl}: ${err}`;
      }
    }
    if (data) break;
  }

  if (!data) {
    return NextResponse.json(
      { error: "Failed to fetch tweet", details: lastError },
      { status: 500 },
    );
  }

  // Extract text from oEmbed HTML and check for keywords
  const html = data.html as string;
  const text = html.replace(/<[^>]+>/g, "").toLowerCase();
  const hasUihut = text.includes("uihutofficial");
  const hasFigma = text.includes("figma");

  return NextResponse.json({
    found: hasUihut && hasFigma,
    hasUihut,
    hasFigma,
  });
}
