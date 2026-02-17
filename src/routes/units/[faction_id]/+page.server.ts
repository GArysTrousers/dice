import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const faction = sql.getOne(`SELECT * FROM factions WHERE id = :faction_id`, params);
  let datasheets = sql.get(`SELECT d.*, mc.cost FROM datasheets d INNER JOIN datasheets_models_cost mc ON d.id = mc.datasheet_id WHERE faction_id = :faction_id AND mc.line = '1' ORDER BY name`, params);
  const keywords = sql.get(`SELECT dk.* FROM datasheets_keywords dk INNER JOIN datasheets d ON d.id = dk.datasheet_id WHERE d.faction_id = :faction_id AND dk.keyword IN ('Character', 'Epic Hero', 'Infantry', 'Battleline', 'Vehicle', 'Walker', 'Aircraft', 'Dedicated Transport')`, params)

  datasheets = datasheets.map((d) => ({...d, keywords: keywords.filter((k) => (d.id === k.datasheet_id)).map((k) => (k.keyword))}))

  return { datasheets, faction };
};
