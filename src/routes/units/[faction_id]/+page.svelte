<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.faction.name}</title>
</svelte:head>

<div class="flex flex-col gap-5">
  <div>
    <h1 class="text-4xl">{data.faction.name}</h1>
  </div>
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Characters</h2>
    {#each data.datasheets.filter((v) => v.role === 'Characters') as ds}
      <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
    {/each}
  </div>
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Battleline</h2>
    {#each data.datasheets.filter((v) => v.role === 'Battleline') as ds}
      <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
    {/each}
  </div>
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Dedicated Transports</h2>
    {#each data.datasheets.filter((v) => v.role === 'Dedicated Transports') as ds}
      <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
    {/each}
  </div>
  
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Fortifications</h2>
    {#each data.datasheets.filter((v) => v.role === 'Fortifications') as ds}
      <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
    {/each}
  </div>
  
  <div class="flex flex-col gap-1">
    <h2 class="text-2xl">Other</h2>
    {#each data.datasheets.filter((v) => v.role === 'Other') as ds}
      <a href="/units/{data.faction.id}/{ds.id}" class="">{ds.name}</a>
    {/each}
  </div>
</div>

<style>
</style>
