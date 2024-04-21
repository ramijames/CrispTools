<template>
  <main id="register-form" class="flex flex-col justify-center pt-20 pb-36">
    <section class="flex flex-col justify-center px-12">
      <h2 class="text-slate-900 dark:text-white text-4xl mb-2 self-center">Register an account</h2>
      <p class="text-slate-500 dark:text-white/50 text-lg mb-2 self-center">Already have an account? <router-link class="underline text-blue-500" to="/sign-in">Sign in</router-link></p>
      <!-- Sign in with Google -->
      <Button
        btnType="primary"
        btnText="Sign in with Google"
        :onClick="signInWithGoogle"
        class="self-start mt-4 mb-1 self-center"
      />
      <section class="w-full lg:w-1/2 mx-auto flex flex-row my-6 justify-center">
        <div class="flex w-1/4 h-0.5 bg-slate-100 dark:bg-slate-800 self-center"></div>
        <p class="flex text-slate-500 dark:text-white/30 text-sm uppercase self-center mx-6">Or</p>
        <div class="flex w-1/4 h-0.5 bg-slate-100 dark:bg-slate-800 self-center"></div>
      </section>

      <!-- Sign in with Email/password -->
      <input class="dark:bg-slate-900 mb-2 dark:text-white w-full lg:w-1/2 mx-auto border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='text' placeholder="Email" v-model='email'/>
      <input class="dark:bg-slate-900 dark:text-white w-full lg:w-1/2 mx-auto border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='password' placeholder="Password" v-model='password'/>
      <p v-if="errMsg">{{ errMsg }}</p>
      <Button
            btnType="primary"
            btnText="Register account with email"
            :onClick="register"
            class="self-center mt-8" 
          />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Button from '@/components/shared/Button.vue';

const errMsg = ref('');

const email = ref('')
const password = ref('')

const router = useRouter()

// Register with email and password
const register = () => {
  createUserWithEmailAndPassword(getAuth(),email.value, password.value) 
  .then((data) => {
    console.log('Successfully registered!');
    router.push('/')
  })
  .catch(error => {
    console.log(error.code)
    alert(error.message);
  });
}

// Sign in with Google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Successfully logged in with Google!');
      router.push('/');
    })
    .catch((error) => {
      errMsg.value = 'Failed to log in with Google';
    });
};

</script>