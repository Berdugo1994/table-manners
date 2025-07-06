"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  addRecentBoardIdToCookie,
  getRecentBoardsIds,
} from "./cookies_actions";
import { RequestType } from "../types/load";
import { getRecentBoardsMetadata } from "../actions/game_actions";

export async function GET(request: NextRequest) {
  const gameId = request.nextUrl.searchParams.get("gameId");

  if (gameId) {
    await addRecentBoardIdToCookie(gameId);
  }

  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  const { requestType } = await request.json();

  switch (requestType) {
    case RequestType.GET_RECENT_BOARDS:
      const recentBoardsIds = await getRecentBoardsIds();
      const recentBoardsMetadata = await getRecentBoardsMetadata(
        recentBoardsIds.map(Number)
      );
      return NextResponse.json(recentBoardsMetadata);
    default:
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 }
      );
  }
}
