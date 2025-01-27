import { pollsUrl } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(pollsUrl);
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
