<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Units</title>
</svelte:head>

{#each data.factions as faction}
  <a href="/units/{faction.id}" class="">{faction.name}</a>
{/each}

<style>
</style>
