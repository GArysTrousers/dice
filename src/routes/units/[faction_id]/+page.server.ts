import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const faction = sql.getOne(`SELECT * FROM factions WHERE id = :faction_id`, params);
  const datasheets = sql.get(`SELECT * FROM datasheets WHERE faction_id = :faction_id ORDER BY name`, params);
  return { datasheets, faction };
};
