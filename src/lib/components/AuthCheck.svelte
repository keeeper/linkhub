<script lang="ts">
    import { currentUser } from "$lib/firebase";
</script>

{#if $currentUser}
    <slot />
{:else}
    <p class="text-error my-10">
        You need to login in order to proceed
        <a href="/login" class="btn btn-primary">Sign in</a>
    </p>
{/if}