<script lang="ts">
  import type { RollOptions } from '$lib/types';
  import { fraction } from 'mathjs';

  let {options = $bindable()}: {options:RollOptions} = $props()


  let rolls = [6, 5, 4, 3, 2];

  let result = $derived(calculate(options));

  function calculate(options: RollOptions) {
    let res = {
      unsavedWoundChance: 0,
    };

    let f = fraction(1, 1);
    // to hit
    f = f.mul(7 - options.toHit.roll, 6);

    if (options.toHit.reroll === '1s') {
      f = f.add(7 - options.toHit.roll, 36);
    } else if (options.toHit.reroll === 'all') {
      f = f.add((options.toHit.roll - 1) * (7 - options.toHit.roll), 36);
    }
    // console.log('Hit', f.n + '/' + f.d);

    // to wound
    f = f.mul(7 - options.toWound.roll, 6);
    if (options.toWound.reroll === '1s') {
      f = f.add(7 - options.toWound.roll, 36);
    } else if (options.toWound.reroll === 'all') {
      f = f.add((options.toWound.roll - 1) * (7 - options.toWound.roll), 36);
    }
    // console.log('Wound', f.n + '/' + f.d);

    // to save
    f = f.mul(options.toSave.roll - 1, 6);
    // console.log('Save', f.n + '/' + f.d);

    res.unsavedWoundChance = Number(f.n) / Number(f.d);
    return res;
  }
</script>

<div class="flex flex-row gap-3">
  <div class="border-l-4 border-y-4 w-4 -mb-3"></div>
  <div class="flex w-48 flex-col gap-1">
    <h3>To Hit</h3>
    {#each rolls as roll (roll)}
      <button
        class="{options.toHit.roll === roll ? 'active' : ''}"
        onclick={() => {
          options.toHit.roll = roll;
        }}>{roll}+</button
      >
    {/each}
    <div>Options</div>
    <button class="sm {options.toHit.reroll === '1s' ? 'active' : ''}" onclick={() => (options.toHit.reroll = options.toHit.reroll === '1s' ? 'none' : '1s')}>Reroll 1s</button>
    <button class="sm {options.toHit.reroll === 'all' ? 'active' : ''}" onclick={() => (options.toHit.reroll = options.toHit.reroll === 'all' ? 'none' : 'all')}>Reroll All</button>
    <!-- <button class="sm {options.toHit.lethal === true ? 'active' : ''}" onclick={() => (options.toHit.lethal = !options.toHit.lethal)}>Lethal Hits</button>
    <button
      class="sm {options.toHit.sustained === 1 ? 'active' : ''}"
      onclick={() => (options.toHit.sustained = options.toHit.sustained === 1 ? 0 : 1)}>Sustained Hits 1</button
    > -->
  </div>
  <div class="flex w-48 flex-col gap-1">
    <h3>To Wound</h3>
    {#each rolls as roll (roll)}
      <button
        class={options.toWound.roll === roll ? 'active' : ''}
        onclick={() => {
          options.toWound.roll = roll;
        }}>{roll}+</button
      >
    {/each}
    <div>Options</div>
    <button class="sm {options.toWound.reroll === '1s' ? 'active' : ''}" onclick={() => (options.toWound.reroll = options.toWound.reroll === '1s' ? 'none' : '1s')}>Reroll 1s</button>
    <button class="sm {options.toWound.reroll === 'all' ? 'active' : ''}" onclick={() => (options.toWound.reroll = options.toWound.reroll === 'all' ? 'none' : 'all')}>Reroll All</button>
    <!-- <button class="sm {options.toWound.devistating === true ? 'active' : ''}" onclick={() => (options.toWound.devistating = !options.toWound.devistating)}>Devistating Wounds</button> -->
  </div>
  <div class="flex w-48 flex-col gap-1">
    <h3>To Save</h3>
    {#each rolls as roll (roll)}
      <button
        class={options.toSave.roll === roll ? 'active' : ''}
        onclick={() => {
          options.toSave.roll = roll;
        }}>{roll}+</button
      >
    {/each}
    <button
      class={options.toSave.roll === 7 ? 'active' : ''}
      onclick={() => {
        options.toSave.roll = 7;
      }}>None</button
    >
  </div>
  <!-- <div class="flex flex-col gap-3">
		<h3>Feel No Pain</h3>
		<button>6+</button>
		<button>5+</button>
		<button>4+</button>
		<button>3+</button>
		<button>2+</button>
		<button>None</button>
	</div> -->
  <div class="flex flex-col gap-3">
    <div class="grid grid-cols-2 gap-3">
      <div>Unsaved Wound Chance:</div>
      <div>{(result.unsavedWoundChance * 100).toFixed(0)}%</div>
    </div>
  </div>
</div>

<style>
</style>
