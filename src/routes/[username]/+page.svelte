<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-4xl text-purple-500 mb-10">@{data.username}</h1>

  <img
    src={data.photoURL ?? "/placeholder.png"}
    alt={"PhotoURL"}
    width="120"
    height="140"
    class="mx-auto rounded-full"
  />

  <p class="text-xl my-8">{data.bio ?? "no bio ..."}</p>
  <ul>
    {#each data.links as item}
      {@debug item}
    {/each}
  </ul>
</main>