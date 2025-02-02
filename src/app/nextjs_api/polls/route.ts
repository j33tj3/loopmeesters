import { pollsUrl } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const api_user = process.env.API_USER;
    const api_passwd = process.env.API_PASSWD;

    const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + Buffer.from(api_user + ":" + api_passwd).toString("base64")
    );

    const response = await fetch(pollsUrl, { headers: headers });
    if (!response.ok) {
      throw new Error("Failed to fetch polls");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
