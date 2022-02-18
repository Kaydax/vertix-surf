import prisma from "$lib/prisma.js";

export type game_map = {
  szMap: string;
  nMultiplier: number;
  nTier: number;
  nType: number;
  nBonusMultiplier: number;
  nPlays: number;
  nOptions: number;
}


export async function get(req, res) {
  let maps;
  const map = req.url.searchParams.get("map");
  console.log(req);
  
  if (map)
  {
    maps = await prisma.game_map.findMany({where: {szMap: req.url.searchParams.get("map")}});
  } else {
    maps = await prisma.game_map.findMany();
  }

  return {
    body: maps,
  };
}