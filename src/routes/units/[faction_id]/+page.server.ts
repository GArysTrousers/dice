import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const faction = sql.getOne(`SELECT * FROM factions WHERE id = :faction_id`, params);
  const datasheets = sql.get(`SELECT d.*, mc.cost FROM datasheets d INNER JOIN datasheets_models_cost mc ON d.id = mc.datasheet_id WHERE faction_id = :faction_id AND mc.line = '1' ORDER BY name`, params);

  return { datasheets, faction };
};
