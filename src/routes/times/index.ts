import prisma from "$lib/prisma.js";

export type game_times = {
  nID: number;
  szSID: string;
  szPlayer?: string;
  szMap: string;
  nStyle: number;
  nTime: number;
  nPoints: number;
  vData?: string;
  szDate?: string;
}


export async function get(req, res) {
  let times: game_times[];
  const map = req.url.searchParams.get("map");
  if (map)
  {
    times = await prisma.game_times.findMany({where: {szMap: req.url.searchParams.get("map")}, orderBy: {nTime: "asc"}});
  } else {
    times = await prisma.game_times.findMany();
  }

  return {
    body: times,
  };
}