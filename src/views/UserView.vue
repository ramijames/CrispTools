<script>

import { ref, watchEffect, watch, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const isLoggedIn = ref(true)
    const isGoogleUser = ref(false)
    const user = ref(null);

    const auth = getAuth();

    // runs after firebase is initialized
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        isLoggedIn.value = true
        user.value = currentUser
        if (currentUser.providerData[0].providerId === 'google.com') {
          isGoogleUser.value = true
        }
      } else {
        isLoggedIn.value = false
        user.value = null
      }
    })

    const handleSignOut = () => {
      signOut(getAuth())
      router.push('/')
      isLoggedIn.value = false
      console.log('Signed out')
    }

    return {
      handleSignOut,
      user,
      auth,
      isLoggedIn
    }
  },
  components: {

  }
}

</script>

<template>
  <main id="register-form" class="max-w-screen-2xl mx-auto lg:px-4 w-full flex flex-col justify-start">
    <section v-if="isLoggedIn" class="flex flex-col justify-center">
      <h1 class="text-2xl dark:text-white font-semibold mb-2">Welcome, {{ user.displayName }}</h1>
      <p class="text-slate-900 dark:text-white text-lg mb-4 mt-4">Account details</p>
      <div v-if="user" class="flex flex-row justify-between py-2 border-b border-slate-200 dark:border-slate-200/10">
        <p class="text-slate-500 dark:text-white/50 text-sm">Display name</p>
        <p class="text-slate-900 dark:text-white text-sm">{{ user.displayName }}</p>
      </div>
      <div v-if="user" class="flex flex-row justify-between py-2 border-b border-slate-200 dark:border-slate-200/10">
        <p class="text-slate-500 dark:text-white/50 text-sm">Account type</p>
        <p class="text-slate-900 dark:text-white text-sm">{{ user.providerData[0].providerId }}</p>
      </div>
      <div v-if="user" class="flex flex-row justify-between py-2">
        <p class="text-slate-500 dark:text-white/50 text-sm">Associated email</p>
        <p class="text-slate-900 dark:text-white text-sm">{{ user.email }}</p>
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
    <section v-else class="flex flex-col justify-center px-4 lg:px-12">
      <h2 class="text-slate-900 dark:text-white text-4xl mb-2">Restricted</h2>
      <p class="text-slate">Please sign in or register.</p>
    </section>  
  </main>
</template>