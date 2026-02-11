<script lang="ts">
  import Fa from 'svelte-fa';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
  import { setSetting, settings } from '$lib/stores.svelte.js';
  let { data } = $props();

  let datasheets = $derived(data.datasheets.filter((v) => v.source_id < 300 || settings.showLegends));

  let categories = $derived([
    {
      name: 'Charaters',
      datasheets: datasheets.filter((v) => v.role === 'Characters')
    }
  ])
</script>

<svelte:head>
  <title>{data.faction.name}</title>
</svelte:head>

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
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Characters</h2>
    {#each datasheets.filter((v) => v.role === 'Characters') as ds}
      <div class="">
        <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
        {#if ds.source_id > 300}<span class="text-neutral-400">[Legends]</span>{/if}
<span>{ds.cost}pts</span>
      </div>
    {/each}
  </div>
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Battleline</h2>
    {#each datasheets.filter((v) => v.role === 'Battleline') as ds}
      <div class="">
        <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
        {#if ds.source_id > 300}<span class="text-neutral-400">[Legends]</span>{/if}
      </div>
    {/each}
  </div>
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Dedicated Transports</h2>
    {#each datasheets.filter((v) => v.role === 'Dedicated Transports') as ds}
      <div class="">
        <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
        {#if ds.source_id > 300}<span class="text-neutral-400">[Legends]</span>{/if}
      </div>
    {/each}
  </div>

  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Other</h2>
    {#each datasheets.filter((v) => v.role === 'Other') as ds}
      <div class="">
        <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
        {#if ds.source_id > 300}<span class="text-neutral-400">[Legends]</span>{/if}
      </div>
    {/each}
  </div>
  
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Fortifications</h2>
    {#each datasheets.filter((v) => v.role === 'Fortifications') as ds}
      <div class="">
        <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
        {#if ds.source_id > 300}<span class="text-neutral-400">[Legends]</span>{/if}
      </div>
    {/each}
  </div>

</div>

<style>
</style>
