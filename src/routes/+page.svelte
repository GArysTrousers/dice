<script lang="ts">
  import { faFileLines, faAddressCard, faHourglass } from '@fortawesome/free-regular-svg-icons';
  import { faDice, faBookSkull } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  let links = [
    {
      lable: 'Rules',
      url: 'http://wahapedia.ru/wh40k10ed/the-rules/core-rules/',
      icon: faBookSkull,
    },
    {
      lable: 'Units',
      url: '/units',
      icon: faAddressCard,
    },
    {
      lable: 'Timeline',
      url: '/turn-timeline',
      icon: faHourglass,
    },
    {
      lable: 'Dice Stats',
      url: '/dice-stats',
      icon: faDice,
    },
    {
      lable: 'Score Sheet',
      url: '/score-sheet',
      icon: faFileLines,
    },
  ];
</script>

<svelte:head>
  <title>Dice</title>
</svelte:head>

<div class="flex flex-col items-center gap-5">
  <div class="grid gap-5 grid-cols-2 md:grid-cols-3">
    {#each links as link (link.lable)}
      <a class="flex h-32 w-32 flex-col items-center justify-center border-3 border-white text-center" href={link.url}
        ><div class="flex flex-col items-center justify-center gap-3 text-center">
          <Fa class="text-5xl" icon={link.icon} />
          <div>{link.lable}</div>
        </div></a
      >
    {/each}
  </div>
</div>

<style>
</style>
