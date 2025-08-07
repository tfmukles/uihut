import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookies = req.cookies;
  const partneroKey = cookies.get("partnero_partner")?.value;
  const partneroAPI = process.env.PARTNERO_API_KEY;
  const { email, first_name, last_name } = await req.json();

  if (!partneroKey || !partneroAPI) {
    return NextResponse.json(
      { error: "Missing partnero key or API key" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch("https://api.partnero.com/v1/customers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${partneroAPI}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partner: {
          key: partneroKey,
        },
        key: email,
        email: email,
        name: first_name + " " + last_name,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", success: false },
      { status: 200 },
    );
  }
}
