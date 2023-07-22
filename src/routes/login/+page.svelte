<script lang="ts">
    import  { auth, currentUser } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
    }
</script>

<h2>Login</h2>
{#if $currentUser}
    <h3 class="card-title">Welcome {$currentUser.displayName}</h3>
    <p class="text-center text-success">You are logged in</p>
    <button class="btn btn-warning" on:click={()=>signOut(auth)}>Sign out</button>
{:else}
    <button class="btn" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}