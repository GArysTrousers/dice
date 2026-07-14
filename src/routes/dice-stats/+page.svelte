<script lang="ts">
  import { newRollOptions } from '$lib/types';
  import Profile from '../Profile.svelte';

  let profiles = $state([newRollOptions()]);

  function reset() {
    profiles = [newRollOptions()];
  }

  function addProfile() {
    profiles.push(newRollOptions());
  }
</script>

<div class="flex flex-col gap-5">
  <div class="flex flex-row gap-3">
    <button class="md" onclick={reset}>Reset</button>
  </div>
  <div class="flex flex-col gap-7">
    {#each profiles as p (p)}
      <Profile options={p}></Profile>
    {/each}
  </div>
  <button onclick={addProfile}>Add Profile</button>
</div>

<style>
</style>
