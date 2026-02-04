<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
<div class="flex flex-col p-10">
  {@render children()}
</div>
