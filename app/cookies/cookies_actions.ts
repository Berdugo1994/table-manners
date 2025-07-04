import { cookies } from "next/headers";

export const RECENT_BOARDS_COOKIE_NAME = "recent_boards_ids";
const SEPARATOR = "_";

export const addRecentBoardIdToCookie = async (boardId: string) => {
  let recentBoardsIdsArray: string[] = [];
  const recentBoardsIds = await get(RECENT_BOARDS_COOKIE_NAME);

  if (recentBoardsIds) {
    recentBoardsIdsArray = recentBoardsIds.value.split(SEPARATOR);
    // Remove the boardId if it already exists
    recentBoardsIdsArray = recentBoardsIdsArray.filter((id) => id !== boardId);
  }

  // Add the new boardId at the beginning and keep only the last 5
  recentBoardsIdsArray = [boardId, ...recentBoardsIdsArray].slice(0, 5);

  await create({
    name: RECENT_BOARDS_COOKIE_NAME,
    value: recentBoardsIdsArray.join(SEPARATOR),
  });
};

export async function getRecentBoardsIds(): Promise<string[]> {
  const recentBoardsIds = await get(RECENT_BOARDS_COOKIE_NAME);
  return recentBoardsIds?.value.split(SEPARATOR) || [];
}

export async function create(data: { name: string; value: string }) {
  const cookieStore = await cookies();

  cookieStore.set(data.name, data.value, {
    secure: true,
    httpOnly: true,
    path: "/",
  });
}

export async function get(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}
