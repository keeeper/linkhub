<script lang="ts">
  import type { PageData } from './$types';
  import UserLink from '$lib/components/UserLink.svelte';
  import { currentUser } from "$lib/firebase";
  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-3xl text-purple-500 font-bold mb-10">@{data.username}</h1>
  <img
    src={data.photoURL ?? "/placeholder.png"}
    alt={"PhotoURL"}
    width="120"
    height="120"
    class="mx-auto rounded-full"
  />

  <p class="text-xl my-8">{data.bio ?? "no bio ..."}</p>
  <ul class="list-none p-0 flex flex-col items-center">
    {#each data.links as item, index}
      <li
        class="border-2 border-dashed border-transparent p-2 transition-all max-w-md w-full"
        data-index={index}
      >
        <UserLink {...item} />
      </li>
    {/each}
  </ul>
</main>