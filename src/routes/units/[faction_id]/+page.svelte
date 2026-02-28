<script lang="ts">
  let { data } = $props();
  let selectedDetachmentId = $state(0)
  let filteredDetachments = $derived(data.detachments.filter((v) => (selectedDetachmentId === 0 || selectedDetachmentId === v.id)))

</script>

<div class="flex flex-wrap gap-2">
    <button class="px-1" onclick={() => (selectedDetachmentId = 0)}>All</button>
  {#each data.detachments as d}
    <button class="px-1" onclick={() => (selectedDetachmentId = d.id)}>{d.name}</button>
  {/each}
</div>

<div class="flex max-w-5xl flex-col gap-3">
  <table>
    <tbody>
      {#each filteredDetachments as d}
        <tr class="detachment-row">
          <td class="pt-5 pb-2 text-xl font-bold underline" colspan="3">{d.name}</td>
        </tr>
        <tr class="category-row">
          <td class="py-3 text-center text-lg font-bold" colspan="3">Enhancements</td>
        </tr>
        {#each data.enhancements.filter((v) => v.detachment_id === d.id) as en}
          <tr class="enhancement-row">
            <td class="whitespace-nowrap">{en.name}</td>
            <td>{en.cost}pts</td>
            <td>{@html en.description}</td>
          </tr>
        {/each}

        <tr class="category-row">
          <td class="py-3 text-center text-lg font-bold" colspan="3">Stratagems</td>
        </tr>
        {#each data.stratagems.filter((v) => v.detachment_id === d.id) as en}
          <tr class="enhancement-row">
            <td class="whitespace-nowrap">{en.name}</td>
            <td>{en.cp_cost}cp</td>
            <td>{@html en.description}</td>
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>

<style>
  .category-row td {
    border: solid white 1px;
  }
  .enhancement-row td {
    padding: 5px 10px;
    border: solid white 1px;
    vertical-align: top;
  }
</style>
