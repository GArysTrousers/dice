<script lang="ts">
  import Fa from 'svelte-fa';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
  let { data } = $props();

  console.log();
  let wargearAbilities = $derived(data.abilities.filter((v) => v.type === 'Wargear'));
  let datasheetAbilities = $derived(data.abilities.filter((v) => v.type === 'Datasheet'));
  let rangedWeapons = $derived(data.wargear.filter((v) => v.type === 'Ranged'));
  let meleeWeapons = $derived(data.wargear.filter((v) => v.type === 'Melee'));
  let stratagems = $derived(data.stratagems.filter((v) => !v.type.match('Boarding Actions – ')));
</script>

<svelte:head>
  <title>{data.datasheet.name} | {data.faction.name}</title>
</svelte:head>

<div class="flex flex-col gap-5">
  <div class="flex flex-row items-center gap-3 text-neutral-400">
    <a href="/">Home</a>
    <Fa icon={faChevronRight} />
    <a href="/units">Factions</a>
    <Fa icon={faChevronRight} />
    <a href="/units/{data.faction.id}">{data.faction.name}</a>
  </div>
  <h1 class="text-2xl">{data.datasheet.name}</h1>
  <div class="max-w-4xl">
    <table class="w-full table-fixed">
      <colgroup>
        <col width="auto" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
      </colgroup>
      <tbody>
        <tr class="font-bold">
          <td>Model Name</td>
          <td class="stat">M</td>
          <td class="stat">T</td>
          <td class="stat">Sv</td>
          <td class="stat">W</td>
          <td class="stat">Ld</td>
          <td class="stat">OC</td>
        </tr>
        {#each data.models as model}
          <tr>
            <td>
              <div class="flex flex-row">
                <div>{model.name}</div>
                <div class="ml-auto text-neutral-400">⌀<span class="text-xs">{model.base_size}</span></div>
              </div>
            </td>
            <td class="stat">{model.M}</td>
            <td class="stat">{model.T}</td>
            <td class="stat">{model.Sv} {model.inv_sv === '-' ? '' : `${model.inv_sv}++`}</td>
            <td class="stat">{model.W}</td>
            <td class="stat">{model.Ld}</td>
            <td class="stat">{model.OC}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-row items-center text-neutral-400">
    <div class="">Keywords:</div>
    <div class="text-xs">{data.keywords.map((v) => v.keyword).join(', ')}</div>
  </div>

  <div class="max-w-4xl">
    <table class="w-full table-fixed">
      <colgroup>
        <col width="auto" />
        <col width="80px" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
        <col width="50px" />
      </colgroup>
      <tbody>
        <tr class="font-bold">
          <td>Ranged Weapons</td>
          <td class="stat">Range</td>
          <td class="stat">A</td>
          <td class="stat">BS</td>
          <td class="stat">S</td>
          <td class="stat">AP</td>
          <td class="stat">D</td>
        </tr>
        {#each rangedWeapons as wargear}
          <tr>
            <td
              ><div class="flex flex-row items-baseline gap-3">
                <div class="whitespace-nowrap">{wargear.name}</div>
                <div class="text-xs text-neutral-300 uppercase">{wargear.description}</div>
              </div></td
            >
            <td class="stat">{wargear.range}"</td>
            <td class="stat">{wargear.A}</td>
            <td class="stat">{wargear.BS_WS}</td>
            <td class="stat">{wargear.S}</td>
            <td class="stat">{wargear.AP}</td>
            <td class="stat">{wargear.D}</td>
          </tr>
        {/each}
        <tr><td class="h-4" style="border: none;"></td></tr>
        <tr class="font-bold">
          <td>Melee Weapons</td>
          <td class="stat">Range</td>
          <td class="stat">A</td>
          <td class="stat">BS</td>
          <td class="stat">S</td>
          <td class="stat">AP</td>
          <td class="stat">D</td>
        </tr>
        {#each meleeWeapons as wargear}
          <tr>
            <td
              ><div class="flex flex-row items-baseline gap-3">
                <div class="whitespace-nowrap">{wargear.name}</div>
                <div class="text-xs text-neutral-300 uppercase">{wargear.description}</div>
              </div></td
            >
            <td class="stat">Melee</td>
            <td class="stat">{wargear.A}</td>
            <td class="stat">{wargear.BS_WS}</td>
            <td class="stat">{wargear.S}</td>
            <td class="stat">{wargear.AP}</td>
            <td class="stat">{wargear.D}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-col gap-2 border-2 p-2">
    <h2 class="text-xl font-bold">Abilities</h2>
    {#each datasheetAbilities as ability}
      <div class="">
        <span class="pr-1 font-bold underline">{ability.name}:</span><span>{@html ability.description}</span>
      </div>
    {/each}
  </div>

  <div class="flex flex-col gap-2 border-2 p-2">
    <h2 class="text-xl font-bold">Wargear Options</h2>
    {#each data.options as o}
      <div class="text-sm">{@html o.description}</div>
    {/each}
  </div>

  <div class="flex flex-col gap-2 border-2 p-2">
    <h2 class="text-xl font-bold">Wargear Abilities</h2>
    {#each wargearAbilities as ability}
      <div class="">
        <span class="pr-1 font-bold underline">{ability.name}:</span><span>{@html ability.description}</span>
      </div>
    {/each}
  </div>
  <div class="flex flex-col gap-1 border-2 p-2">
    <h2 class="text-xl font-bold">Unit Composition</h2>
    {#each data.unitComposition as com}
      <div class="">
        <span>{@html com.description}</span>
      </div>
    {/each}
    <div>{@html data.datasheet.loadout}</div>
    <h2 class="pt-2 text-xl font-bold">Costs</h2>
    {#each data.modelsCost as mc}
      <div class="">{@html mc.description} - {mc.cost}pts</div>
    {/each}
  </div>

  <div class="flex flex-col gap-0 border-2 p-2">
    <h2 class="text-xl font-bold">Leader</h2>
    {#each data.leader as bodyguard}
      <a href="/units/{bodyguard.faction_id}/{bodyguard.id}">{bodyguard.name}</a>
    {/each}
  </div>

  <div class="flex flex-col gap-0 border-2 p-2">
    <h2 class="text-xl font-bold">Led By</h2>
    {#each data.ledBy as leader}
      <a href="/units/{leader.faction_id}/{leader.id}">{leader.name}</a>
    {/each}
  </div>

  <div class="flex flex-col gap-2">
    <h2 class="text-xl font-bold">Stratagems</h2>

    <table class="table-fixed">
      <colgroup>
        <col width="40%" />
        <col width="auto" />
      </colgroup>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Description</td>
        </tr>
        {#each stratagems as s}
          <tr>
            <td class="">
              <div class="flex flex-col">
                <div class="">{s.cp_cost}CP - {s.name}</div>
                <div class="text-neutral-400">Detachment: {s.detachment === '' ? 'Core' : s.detachment}</div>
              </div></td
            >
            <td class="text-sm">{@html s.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  td {
    padding: 2px 10px;
    border: solid white 1px;
  }

  .stat {
    text-align: center;
  }
</style>
