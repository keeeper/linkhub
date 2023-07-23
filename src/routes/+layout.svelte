<script lang="ts">
  import {currentUser, userData } from "$lib/firebase";
  import "../app.css";
  
  $currentUser;
  $userData;
</script>

<div class="min-h-screen flex flex-col">
  <slot />
</div>