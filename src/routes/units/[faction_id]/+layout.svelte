<script lang="ts">
  import Fa from 'svelte-fa';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
  import { setSetting, settings } from '$lib/stores.svelte.js';
  let { data, children } = $props();

  let datasheets = $derived(data.datasheets.filter((v) => v.source_id < 300 || settings.showLegends));

  let categories = $derived([
    {
      name: 'Epic Heros',
      datasheets: datasheets.filter((v) => v.keywords.includes('Character') && v.keywords.includes('Epic Hero')),
    },
    {
      name: 'Charaters',
      datasheets: datasheets.filter((v) => v.keywords.includes('Character') && !v.keywords.includes('Epic Hero')),
    },
    {
      name: 'Battleline',
      datasheets: datasheets.filter((v) => v.keywords.includes('Battleline')),
    },
    {
      name: 'Infantry',
      datasheets: datasheets.filter((v) => v.keywords.includes('Infantry') && !v.keywords.includes('Battleline') && !v.keywords.includes('Character')),
    },
    {
      name: 'Walkers',
      datasheets: datasheets.filter((v) => v.keywords.includes('Walker') && !v.keywords.includes('Battleline') && !v.keywords.includes('Character')),
    },
    {
      name: 'Vehicles',
      datasheets: datasheets.filter((v) => v.keywords.includes('Vehicle') && !v.keywords.includes('Aircraft') && !v.keywords.includes('Character') && !v.keywords.includes('Dedicated Transport')),
    },
    {
      name: 'Flyers',
      datasheets: datasheets.filter((v) => v.keywords.includes('Aircraft') && !v.keywords.includes('Dedicated Transport')),
    },
    {
      name: 'Dedicated Transports',
      datasheets: datasheets.filter((v) => v.keywords.includes('Dedicated Transport')),
    },
  ]);
</script>

<svelte:head>
  <title>{data.faction.name}</title>
</svelte:head>

<div class="flex flex-row gap-7">
  <div class="flex flex-col gap-5">
    <div class="flex flex-row items-center gap-3 text-neutral-400">
      <a href="/">Home</a>
      <Fa icon={faChevronRight} />
      <a href="/units">Factions</a>
      <Fa icon={faChevronRight} />
      <a href="/units/{data.faction.id}">{data.faction.name}</a>
    </div>
    <div>
      <h1 class="text-4xl">{data.faction.name}</h1>
    </div>
    <div class="">
      <button onclick={() => setSetting('showLegends', !settings.showLegends)}>Show Legends</button>
    </div>
    <div class="">
      <table>
        <tbody>
          {#each categories as c}
            <tr>
              <td class="text-2xl" colspan="2">{c.name}</td>
            </tr>
            {#each c.datasheets as ds}
              <tr class="text-neutral-200">
                <td>
                  <div class="">
                    <a href="/units/{data.faction.id}/{ds.id}" class="whitespace-nowrap">{ds.name}</a>{#if ds.source_id > 300}<span class="pl-3 text-neutral-400">[Legends]</span>{/if}
                  </div>
                </td>
                <td>{ds.cost}</td>
              </tr>
            {/each}
            <tr><td class="py-2"></td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <div class=""></div>
  <div class="">
    {@render children()}
  </div>
</div>

<style>
  td {
    padding-right: 20px;
  }
</style>
