<script lang="ts">
  import Fa from 'svelte-fa';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
  let { data } = $props();

  console.log();
  let wargearAbilities = $derived(data.abilities.filter((v) => v.type === 'Wargear'));
  let datasheetAbilities = $derived(data.abilities.filter((v) => v.type === 'Datasheet'));
  let coreAbilities = $derived(data.commonAbilities.filter((v) => v.type === 'Core'));
  let factionAbilities = $derived(data.commonAbilities.filter((v) => v.type === 'Faction'));
  let rangedWeapons = $derived(data.wargear.filter((v) => v.type === 'Ranged'));
  let meleeWeapons = $derived(data.wargear.filter((v) => v.type === 'Melee'));
  let stratagems = $derived(data.stratagems.filter((v) => !v.type.match('Boarding Actions – ')));

  let innerWidth = $state(1080);
  let isMobile = $derived(innerWidth < 768);
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{data.datasheet.name} | {data.faction.name}</title>
</svelte:head>

<div class="flex max-w-4xl flex-col gap-5">
  {#if isMobile}
    <div class="flex flex-row items-center gap-3 text-neutral-400">
      <a href="/">Home</a>
      <Fa icon={faChevronRight} />
      <a href="/units">Factions</a>
      <Fa icon={faChevronRight} />
      <a href="/units/{data.faction.id}">{data.faction.name}</a>
    </div>
  {:else}
    <div class="flex flex-row items-center gap-3 text-neutral-400">
      <a href="/">Home</a>
      <Fa icon={faChevronRight} />
      <a href="/units">Factions</a>
      <Fa icon={faChevronRight} />
      <a href="/units/{data.faction.id}">{data.faction.name}</a>
      <Fa icon={faChevronRight} />
      <a href="/units/{data.faction.id}/{data.datasheet.id}">{data.datasheet.name}</a>
    </div>
  {/if}

  <h1 class="text-2xl">{data.datasheet.name}</h1>
  <div class="max-w-4xl">
    <table class="w-full table-fixed">
      <colgroup>
        {#if !isMobile}
          <col width="auto" />
        {/if}
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
      </colgroup>
      <tbody>
        <tr class="font-bold">
          {#if !isMobile}
            <td>Model Name</td>
          {/if}
          <td class="stat">M</td>
          <td class="stat">T</td>
          <td class="stat">Sv</td>
          <td class="stat">W</td>
          <td class="stat">Ld</td>
          <td class="stat">OC</td>
        </tr>
        {#each data.models as model}
          {#if isMobile}
            <tr>
              <td colspan="6">
                <div class="flex flex-row">
                  <div>{model.name}</div>
                  <div class="ml-auto text-neutral-400">⌀<span class="text-xs">{model.base_size}</span></div>
                </div>
              </td>
            </tr>
          {/if}
          <tr>
            {#if !isMobile}
              <td>
                <div class="flex flex-row">
                  <div>{model.name}</div>
                  <div class="ml-auto text-neutral-400">⌀<span class="text-xs">{model.base_size}</span></div>
                </div>
              </td>
            {/if}
            <td class="stat">{model.M}</td>
            <td class="stat">{model.T}</td>
            <td class="stat">{model.Sv} {@html model.inv_sv === '-' ? '' : `<br/>${model.inv_sv}++`}</td>
            <td class="stat">{model.W}</td>
            <td class="stat">{model.Ld}</td>
            <td class="stat">{model.OC}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-col text-neutral-300">
    <div class="">Keywords:</div>
    <div class="text-xs">{data.keywords.map((v) => v.keyword).join(', ')}</div>
  </div>

  <div class="max-w-4xl">
    <table class="w-full table-fixed">
      <colgroup>
        {#if !isMobile}
          <col width="auto" />
        {/if}
        <col width="80px" />
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
        <col width="55px" />
      </colgroup>
      <tbody>
        <tr class="font-bold">
          {#if !isMobile}
            <td>Ranged Weapons</td>
          {/if}
          <td class="stat">Range</td>
          <td class="stat">A</td>
          <td class="stat">BS</td>
          <td class="stat">S</td>
          <td class="stat">AP</td>
          <td class="stat">D</td>
        </tr>
        {#each rangedWeapons as wargear}
          {#if isMobile}
            <tr>
              <td colspan="6"
                ><div class="flex flex-col items-baseline gap-0">
                  <div class="whitespace-nowrap">{wargear.name}</div>
                  <div class="text-xs text-neutral-300 uppercase">{wargear.description}</div>
                </div></td
              >
            </tr>
          {/if}
          <tr>
            {#if !isMobile}
              <td
                ><div class="flex flex-row items-baseline gap-3">
                  <div class="whitespace-nowrap">{wargear.name}</div>
                  <div class="text-xs text-neutral-300 uppercase">{wargear.description}</div>
                </div></td
              >
            {/if}
            <td class="stat">{wargear.range}"</td>
            <td class="stat">{wargear.A}</td>
            <td class="stat">{wargear.BS_WS !== 'N/A' ? `${wargear.BS_WS}+` : 'N/A'}</td>
            <td class="stat">{wargear.S}</td>
            <td class="stat">{wargear.AP}</td>
            <td class="stat">{wargear.D}</td>
          </tr>
        {/each}
        <tr><td class="h-4" style="border: none;"></td></tr>
        <tr class="font-bold">
          {#if !isMobile}
            <td>Melee Weapons</td>
          {/if}
          <td class="stat">Range</td>
          <td class="stat">A</td>
          <td class="stat">BS</td>
          <td class="stat">S</td>
          <td class="stat">AP</td>
          <td class="stat">D</td>
        </tr>
        {#each meleeWeapons as wargear}
          {#if isMobile}
            <tr>
              <td colspan="6"
                ><div class="flex flex-col items-baseline gap-0">
                  <div class="whitespace-nowrap">{wargear.name}</div>
                  <div class="text-xs text-neutral-300 uppercase">{wargear.description}</div>
                </div></td
              >
            </tr>
          {/if}
          <tr>
            {#if !isMobile}
              <td
                ><div class="flex flex-row items-baseline gap-3">
                  <div class="whitespace-nowrap">{wargear.name}</div>
                  <div class="text-xs text-neutral-300 uppercase">{wargear.description}</div>
                </div></td
              >
            {/if}
            <td class="stat">Melee</td>
            <td class="stat">{wargear.A}</td>
            <td class="stat">{wargear.BS_WS}+</td>
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
        <span class="pr-1 font-bold">{ability.name}:</span><span class="text-sm text-neutral-300">{@html ability.description}</span>
      </div>
    {/each}
    <div class="flex flex-wrap gap-2 items-center">
      <div>Core:</div>
      {#each coreAbilities as ability}
        <div class="text-sm text-neutral-300 underline">{ability.name} {ability.parameter}</div>
      {/each}
    </div>
    <div class="flex flex-wrap gap-2 items-center">
      <div>Faction:</div>
      {#each factionAbilities as ability}
        <div class="text-sm text-neutral-300 underline">{ability.name}</div>
      {/each}
    </div>
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
        <span class="pr-1 font-bold">{ability.name}:</span><span class="text-sm">{@html ability.description}</span>
      </div>
    {/each}
  </div>
  <div class="flex flex-col gap-1 border-2 p-2">
    <h2 class="text-xl font-bold">Unit Composition</h2>
    {#each data.unitComposition as com}
      <div class="text-neutral-300">
        <span>{@html com.description}</span>
      </div>
    {/each}
    <div class="text-neutral-300">{@html data.datasheet.loadout}</div>
    <h2 class="pt-2 text-xl font-bold">Costs</h2>
    {#each data.modelsCost as mc}
      <div class="text-neutral-300">{@html mc.description} - {mc.cost}pts</div>
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

    {#if isMobile}
      <table class="table-fixed">
        <colgroup>
          <col width="auto" />
        </colgroup>
        <tbody>
          {#each stratagems as s}
            <tr>
              <td class="">
                <div class="flex flex-col">
                  <div class="pt-2">{s.cp_cost}CP {s.name}</div>
                  <div class="pb-2 text-neutral-400">Detachment: {s.detachment === '' ? 'Core' : s.detachment}</div>
                  <div class="text-sm text-neutral-300">{@html s.description}</div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
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
                  <div class="">{s.cp_cost}CP {s.name}</div>
                  <div class="text-neutral-400">Detachment: {s.detachment === '' ? 'Core' : s.detachment}</div>
                </div></td
              >
              <td class="text-sm">{@html s.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
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
