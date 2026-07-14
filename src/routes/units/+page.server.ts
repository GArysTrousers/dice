import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const factions = sql.get(`SELECT * FROM factions ORDER BY name`);
  return { factions };
};
