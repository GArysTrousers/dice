import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const faction = sql.getOne(`SELECT * FROM factions WHERE id = :faction_id`, params);
  const datasheet = sql.getOne(`SELECT * FROM datasheets WHERE id = :datasheet_id ORDER BY name`, params);
  const datasheetKeywords = sql.get(`SELECT * FROM datasheets_keywords WHERE datasheet_id = :datasheet_id`, params);
  const datasheetAbilities = sql.get(`SELECT * FROM datasheets_abilities WHERE datasheet_id = :datasheet_id`, params);
  const datasheetModels = sql.get(`SELECT * FROM datasheets_models WHERE datasheet_id = :datasheet_id`, params);
  const datasheetOptions = sql.get(`SELECT * FROM datasheets_options WHERE datasheet_id = :datasheet_id`, params);
  const datasheetWargear = sql.get(`SELECT * FROM datasheets_wargear WHERE datasheet_id = :datasheet_id`, params);
  const datasheetUnitComposition = sql.get(`SELECT * FROM datasheets_unit_composition WHERE datasheet_id = :datasheet_id`, params);
  const datasheetModelsCost = sql.get(`SELECT * FROM datasheets_models_cost WHERE datasheet_id = :datasheet_id`, params);
  const datasheetStratagems = sql.get(`SELECT * FROM datasheets_stratagems WHERE datasheet_id = :datasheet_id`, params);
  const datasheetEnhancements = sql.get(`SELECT * FROM datasheets_enhancements WHERE datasheet_id = :datasheet_id`, params);
  const datasheetDetachmentAbilities = sql.get(`SELECT * FROM datasheets_detachment_abilities WHERE datasheet_id = :datasheet_id`, params);
  const datasheetLeader = sql.get(`SELECT name, id FROM datasheets_leader dl INNER JOIN datasheets d ON d.id = dl.attached_id WHERE leader_id = :datasheet_id`, params);
console.log(datasheetModelsCost);
  return {
    faction,
    datasheet,
    datasheetKeywords,
    datasheetAbilities,
    datasheetModels,
    datasheetOptions,
    datasheetWargear,
    datasheetUnitComposition,
    datasheetModelsCost,
    datasheetStratagems,
    datasheetEnhancements,
    datasheetDetachmentAbilities,
    datasheetLeader,
  };
};
