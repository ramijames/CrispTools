<template>
  <div class="flex flex-row justify-between w-full py-2 px-4 border-b bg-slate-50">
    <div class="flex flex-row gap-2">  
      <svg class="w-8 h-auto self-center" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-slate-500" d="m3.77123617 12.0448291-3.77123617-3.77123617 3.77123617-3.77123617 1.07749604 1.07749605-2.69374011 2.69374012 2.69374011 2.69374007zm7.97292653-7.54247234 3.7712362 3.77123617-3.7712362 3.77123617-1.077496-1.0774961 2.6937401-2.69374007-2.6937401-2.69374012zm-3.64007835-2.50235676 1.50065944.26460675-2.11685398 12.00527545-1.50065943-.2646067z" fill="#000"/>
      </svg>
      <h2 class="text-xl font-semibold text-slate-500 self-center">Css Tools</h2>
    </div>
    <router-link v-if="$route.path !== '/css-tools'" to="/css-tools" class="flex flex-row justify-between px-4 btn bg-slate-500 rounded py-2 text-center text-white">View all</router-link>
  </div>
</template>