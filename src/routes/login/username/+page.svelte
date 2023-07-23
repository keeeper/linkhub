<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import {db, currentUser, userData } from "$lib/firebase";
  import {doc, getDoc, writeBatch} from "firebase/firestore";

  const userNameRe = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid = username?.length > 2 && username.length < 16 && userNameRe.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !isLoading

  let username = "";
  let isLoading = false;
  let isAvailable = false;
  let debounceTimer: NodeJS.Timeout;

  async function checkAvailability() {
    isAvailable = false;
    isLoading = true;
    debounceTimer = setTimeout(async ()=> {
        const ref = doc(db, "usernames", username);
        const exists = await getDoc(ref).then((doc) => doc.exists());
        isAvailable = !exists;
        isLoading = false;
      }, 500)
  }

  async function confirmUsername() {
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $currentUser?.uid });
    batch.set(doc(db, "users", $currentUser!.uid), {
        username,
        photoURL: $currentUser?.photoURL ?? null,
        published: true,
        bio: "I am the Walrus",
        links: [
        {
            title: "Test Link",
            url: "https://g.com",
            icon: "custom",
        },
        ],
    });

    await batch.commit();

    username = "";
    isAvailable = false;
  }
</script>

<AuthCheck>
  {#if $userData?.username}
    <p class="text-lg">
        Hello <span class="text-success font-bold">@{$userData.username}</span>
    </p>
    <p class="text-sm">(Username can not be changed)</p>
    <a class="btn btn-primary" href="/login/photo">Upload profile image</a>
  {:else}
    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
        <input 
            type="text" 
            placeholder="Username"
            class="input w-full" 
            bind:value={username}
            on:input={checkAvailability}
            class:input-error={(!isValid && isTouched)}
            class:input-warning={isTaken}
            class:input-success={isAvailable && isValid && !isLoading}
        />
        <div class="w-full my-4 min-h-16 px-8">
            {#if isLoading}
                <p class="text-secondary">Checking availability of @{username}...</p>
            {/if}
            {#if !isValid && isTouched && !isLoading}
                <p class="text-error text-sm">
                    must be 3-16 characters long and alphanumeric
                </p>
            {/if}
            {#if isValid && !isAvailable && !isLoading}
                <p class="text-warning text-sm">
                    @{username} is taken
                </p>
            {/if}
            {#if isAvailable && isValid && !isLoading}
                <button type="submit" class="btn btn-success">Confirm username @{username}</button>
            {/if}
        </div>
    </form>
  {/if}
</AuthCheck>
