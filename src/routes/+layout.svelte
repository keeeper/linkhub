<script lang="ts">
  import {currentUser, userData } from "$lib/firebase";
  import { page } from '$app/stores';
  import "../app.css";
  $currentUser;
  $userData;
</script>

<div class="min-h-screen flex flex-col">
  <div class="flex flex-col fixed top-5 right-0">
    {#if $page?.url.pathname !== "/"}
      <a href="/" class="btn btn-neutral rounded-r-none mb-2">
        <img src={`/icons/home.svg`} alt="Home" width={24} height={24}} />
      </a>
    {/if}
    {#if $currentUser?.uid && $page?.url.pathname !== "/"}
      <a href={`/${$userData?.username}/edit`} class="btn btn-neutral rounded-r-none">
        <img src={`/icons/edit.svg`} alt="Edit" width={24} height={24}} />
      </a>
    {/if}
  </div>
  <slot />
</div>