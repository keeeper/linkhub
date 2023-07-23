<script lang="ts">
    import { currentUser } from "$lib/firebase";
</script>

{#if $currentUser}
    <slot />
{:else}
    <div class="text-error my-10">
        <p class="mb-4">You need to login in order to proceed</p>
        <a href="/login" class="btn btn-primary">Sign in</a>
    </div>
{/if}