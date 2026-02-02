import { readFile } from 'node:fs/promises';
import { Sql } from './sql';
import { DATA_DIR } from '$env/static/private';

export let sql = new Sql(':memory:');

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

export async function loadData() {
  sql.db.close();
  sql.db.open();

  for (const file of dataFiles) {
    const rows: string[][] = [];
    const text = String(await readFile(`${DATA_DIR}/wahapedia/${file}`));
    for (const row of text.split(/\|?\r?\n/)) {
      if (row !== '') {
        rows.push(row.split('|'));
      }
    }
    let tableName = file.replace('.csv', '').toLowerCase()
    let cols = rows[0].map((v) => `${v} TEXT`).join(', ')
    let tableQuery = `CREATE TABLE ${tableName} (${cols});`;
    console.log(tableQuery);
    sql.db.exec(tableQuery);
    for (let i = 1; i < rows.length; i++) {
      let insertQuery = `INSERT INTO ${tableName} (${rows[0].join(', ')}) VALUES (${rows[0].map((v, i) => (`:${i}`)).join(', ')})`
      // console.log(insertQuery);
      sql.set(insertQuery, rows[i]);
    }
    // console.log(sql.get('select * from factions'));
  }
}
