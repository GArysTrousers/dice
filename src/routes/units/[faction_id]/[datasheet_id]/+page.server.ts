import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const faction = sql.getOne(`SELECT * FROM factions WHERE id = :faction_id`, params);
  const datasheet = sql.getOne(`SELECT * FROM datasheets WHERE id = :datasheet_id ORDER BY name`, params);
  const keywords = sql.get(`SELECT * FROM datasheets_keywords WHERE datasheet_id = :datasheet_id`, params);
  const abilities = sql.get(`SELECT * FROM datasheets_abilities WHERE datasheet_id = :datasheet_id AND name != ''`, params);
  const commonAbilities = sql.get(`SELECT * FROM datasheets_abilities da INNER JOIN abilities a ON a.id = da.ability_id WHERE datasheet_id = :datasheet_id`, params);
  const models = sql.get(`SELECT * FROM datasheets_models WHERE datasheet_id = :datasheet_id`, params);
  const options = sql.get(`SELECT * FROM datasheets_options WHERE datasheet_id = :datasheet_id`, params);
  const wargear = sql.get(`SELECT * FROM datasheets_wargear WHERE datasheet_id = :datasheet_id`, params);
  const unitComposition = sql.get(`SELECT * FROM datasheets_unit_composition WHERE datasheet_id = :datasheet_id`, params);
  const modelsCost = sql.get(`SELECT * FROM datasheets_models_cost WHERE datasheet_id = :datasheet_id`, params);
  const stratagems = sql.get(`SELECT s.* FROM datasheets_stratagems ds INNER JOIN stratagems s ON s.id = ds.stratagem_id WHERE datasheet_id = :datasheet_id ORDER BY detachment, name`, params);
  const enhancements = sql.get(`SELECT * FROM datasheets_enhancements WHERE datasheet_id = :datasheet_id`, params);
  const detachmentAbilities = sql.get(`SELECT * FROM datasheets_detachment_abilities WHERE datasheet_id = :datasheet_id`, params);
  const leader = sql.get(`SELECT name, id, faction_id FROM datasheets_leader dl INNER JOIN datasheets d ON d.id = dl.attached_id WHERE leader_id = :datasheet_id`, params);
  const ledBy = sql.get(`SELECT name, id, faction_id FROM datasheets_leader dl INNER JOIN datasheets d ON d.id = dl.leader_id WHERE attached_id = :datasheet_id`, params);
  
  // console.log(commonAbilities);
  
  return {
    faction,
    datasheet,
    keywords,
    abilities,
    commonAbilities,
    models,
    options,
    wargear,
    unitComposition,
    modelsCost,
    stratagems,
    enhancements,
    detachmentAbilities,
    leader,
    ledBy
  };
};
