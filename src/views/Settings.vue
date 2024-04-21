<script>

import { ref, watchEffect, watch, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const isLoggedIn = ref(true)

    // runs after firebase is initialized
    onAuthStateChanged(getAuth(),function(user) {
        if (user) {
          isLoggedIn.value = true // if we have a user
        } else {
          isLoggedIn.value = false // if we do not
        }
    })

    const handleSignOut = () => {
      signOut(getAuth())
      router.push('/')
      console.log('Signed out')
    }

    const uid = ref('')

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      }
    });

    return {
      isLoggedIn,
      handleSignOut,
      uid,
      auth,
      user: auth.currentUser
    }
  },
  components: {

  }
}

</script>

<template>
  <main id="register-form" class="flex flex-col justify-center py-8">
    <section class="flex flex-col justify-center px-4 lg:px-12">
      <h2 class="text-slate-900 dark:text-white text-4xl mb-2">Settings</h2>
      <p class="text-slate-900 dark:text-white text-lg mb-4 mt-4">Account details</p>
      <div class="flex flex-row justify-between py-2 border-b border-slate-200 dark:border-slate-200/10">
        <p class="text-slate-500 dark:text-white/50 text-sm">Account type</p>
        <p class="text-slate-900 dark:text-white text-sm">{{ auth.currentUser.providerData[0].providerId }}</p>
      </div>
      <div class="flex flex-row justify-between py-2">
        <p class="text-slate-500 dark:text-white/50 text-sm">Associated email</p>
        <p class="text-slate-900 dark:text-white text-sm">{{ auth.currentUser.email }}</p>
      </div>
      <p class="text-slate-900 dark:text-white text-lg mb-4 mt-4">Sign out of your account</p>
      <button @click="handleSignOut" class="btn text-xs py-1 px-2 bg-blue-500 rounded text-white font-semibold uppercase self-start">Sign out</button>
    <!-- - Logout button
    - User details
    - Change password?
    - Delete account?
    - App settings
      - Default Theme
      - Default ViewType -->
    </section>
  </main>
</template>