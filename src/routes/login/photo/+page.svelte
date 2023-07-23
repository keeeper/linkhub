<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { currentUser, userData, storage, db } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  let previewURL: string;
  let isUploading = false;
  $: href = `/${$userData?.username}/edit`;

  async function upload(e: any) {
    isUploading = true;
    const file = e.target.files[0];
    previewURL = URL.createObjectURL(file);
    const storageRef = ref(storage, `users/${$currentUser!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc(db, "users", $currentUser!.uid), {photoURL: url})
    isUploading = false;
  }
</script>

<AuthCheck>
  <h2 class="card-title">Upload profile photo</h2>
  <form class="max-w-screen-md w-full mt-10 mb-4">
    <div class="form-control items-center w-full max-w-x mx-auto text-center">
      <img 
        src={previewURL ?? $userData?.photoUrl ?? "/placeholder.png"}
        alt={"Profile image"}
        width="120"
        height="120"
        class="rounded-full mx-auto mb-4"
      />
      <label for="photoURL" class="label">
        <span class="label-text">Choose an image</span>
      </label>
      <input
        type="file"
        name="photoURL"
        class="file-input file-input-bordered w-full max-w-xs"
        on:change={upload}
        accept="image/png, image/jpeg, image/webp"
      />
      {#if isUploading}
        <p>Uploading...</p>
        <progress class="progress progress-info w-50 mt-6" />
      {/if}
    </div>
  </form>
  <a {href} class="btn btn-primary">Finish</a>
</AuthCheck>