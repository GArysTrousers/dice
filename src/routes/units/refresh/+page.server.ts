import { writeFile } from 'node:fs/promises';
import type { PageServerLoad } from './$types';
import { DATA_DIR } from '$env/static/private';
import { loadData } from '$lib/db';

const baseUrl = 'https://wahapedia.ru/wh40k10ed';

const dataFiles = [
  'Factions.csv',
  'Source.csv',
  'Datasheets.csv',
  'Datasheets_abilities.csv',
  'Datasheets_keywords.csv',
  'Datasheets_models.csv',
  'Datasheets_options.csv',
  'Datasheets_wargear.csv',
  'Datasheets_unit_composition.csv',
  'Datasheets_models_cost.csv',
  'Datasheets_stratagems.csv',
  'Datasheets_enhancements.csv',
  'Datasheets_detachment_abilities.csv',
  'Datasheets_leader.csv',
  'Stratagems.csv',
  'Abilities.csv',
  'Enhancements.csv',
  'Detachment_abilities.csv',
  'Detachments.csv',
  'Last_update.csv',
];

export const load: PageServerLoad = async ({ fetch }) => {
  for (const file of dataFiles) {
    let res = await fetch(`${baseUrl}/${file}`);
    await writeFile(`${DATA_DIR}/wahapedia/${file}`, await res.text());
    console.log('done:', file);
  }
  await loadData()
};
