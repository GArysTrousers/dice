import { browser } from '$app/environment';
import z from 'zod';

const schema = z.object({
  showLegends: z.boolean().default(false)
})

type Settings = z.infer<typeof schema>;
type SettingsKeys = keyof Settings;

export const settings = $state(getLocalSettings())

function getLocalSettings() {
  if (!browser) return schema.parse({});
  let settingsString = localStorage.getItem('dice_settings')
  if (settingsString === null) {
    return schema.parse({})
  } else {
    return schema.parse(JSON.parse(settingsString))
  }
}

export function setSetting(key:SettingsKeys, value:any) {
  settings[key] = value
  localStorage.setItem('dice_settings', JSON.stringify(settings))
}
