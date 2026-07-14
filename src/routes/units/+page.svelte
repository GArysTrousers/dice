<script lang="ts">
  import Fa from 'svelte-fa';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
    import { resolve } from '$app/paths';
  let { data } = $props();
</script>

<svelte:head>
  <title>Units</title>
</svelte:head>

<div class="flex flex-col gap-5">
  <div class="flex flex-row items-center gap-3 text-neutral-400">
    <a href="/">Home</a>
    <Fa icon={faChevronRight} />
    <a href="/units">Factions</a>
  </div>
  <h1 class="text-3xl">Factions</h1>
  <div class="flex flex-col gap-1">
    {#each data.factions as faction (faction.id)}
      <a href={resolve(`/units/${faction.id}`)} class="">{faction.name}</a>
    {/each}
  </div>
</div>

<style>
</style>
