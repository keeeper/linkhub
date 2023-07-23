<script lang="ts">
    import { page } from '$app/stores';
</script>

<main class="min-h-screen flex flex-col items-center justify-center">
  <h1 class="text-4xl font-bold mb-4">Error {$page.status}: {$page.error?.message}</h1>
</main>