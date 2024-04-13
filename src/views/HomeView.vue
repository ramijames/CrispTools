<script setup>

</script>

<template>
  <main class="flex flex-start">

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-10">

      <!-- Color Tools -->
      <div class="flex flex-col gap-2 w-full">
        <div class="flex flex-row justify-between w-full p-2 border-b border-l-4 border-l-lime-500 bg-lime-50">
          <h2 class="text-xl font-semibold">Color Tools</h2>
          <!-- <img src="/palette.svg" class="w-8 h-auto self-center fill-lime-500" alt="Color palette"> -->
          <svg width="153" class="w-8 h-auto self-center" height="145" viewBox="0 0 153 145" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-lime-500" fill-rule="evenodd" clip-rule="evenodd" d="M152.04 72.4C152.04 112.522 117.952 144.8 76.02 144.8C41.5373 144.8 45.0631 125.695 48.1754 108.831C48.8749 105.041 49.5535 101.363 49.775 98.0417C51.8867 60.635 30.1667 53.9983 25.6417 82.9583C19.6083 122.175 0 104.075 0 72.4C0 32.58 34.0883 0 76.02 0C117.952 0 152.04 32.2783 152.04 72.4ZM101.36 24.7366C101.36 31.2342 96.0927 36.5016 89.595 36.5016C83.0974 36.5016 77.83 31.2342 77.83 24.7366C77.83 18.239 83.0974 12.9716 89.595 12.9716C96.0927 12.9716 101.36 18.239 101.36 24.7366ZM52.49 42.8366C58.9876 42.8366 64.255 37.5693 64.255 31.0716C64.255 24.574 58.9876 19.3066 52.49 19.3066C45.9924 19.3066 40.725 24.574 40.725 31.0716C40.725 37.5693 45.9924 42.8366 52.49 42.8366ZM132.733 45.5516C132.733 52.0492 127.466 57.3166 120.968 57.3166C114.471 57.3166 109.203 52.0492 109.203 45.5516C109.203 39.054 114.471 33.7866 120.968 33.7866C127.466 33.7866 132.733 39.054 132.733 45.5516ZM128.208 95.3266C134.706 95.3266 139.973 90.0593 139.973 83.5616C139.973 77.064 134.706 71.7966 128.208 71.7966C121.711 71.7966 116.443 77.064 116.443 83.5616C116.443 90.0593 121.711 95.3266 128.208 95.3266ZM112.823 112.522C112.823 119.019 107.556 124.287 101.058 124.287C94.5607 124.287 89.2934 119.019 89.2934 112.522C89.2934 106.024 94.5607 100.757 101.058 100.757C107.556 100.757 112.823 106.024 112.823 112.522Z" fill="black"/>
          </svg>
        </div>
        <div class="p-2">
          <p class="text-sm text-gray-600 pb-2">Tools for building palettes and colors</p>
          <ul>
            <li class="py-2 border-b"><router-link to="/palette-generator" class="btn mt-4 text-lime-500">Color Palette Generator</router-link></li>
          </ul>
        </div>
        <router-link to="/color-tools" class="btn bg-gray-50 rounded py-1 text-center text-gray-500">More Color Tools</router-link>
      </div>

      <!-- Typography Tools -->
      <div class="flex flex-col gap-2 w-full">
        <div class="flex flex-row justify-between w-full p-2 border-b border-l-4 border-l-blue-500 bg-blue-50">
          <h2 class="text-xl font-semibold">Typography Tools</h2>
          <!-- <img src="/palette.svg" class="w-8 h-auto self-center fill-lime-500" alt="Color palette"> -->
          <svg class="w-8 h-auto self-center" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-blue-500" fill-rule="evenodd" clip-rule="evenodd" d="M64.35 50.05H50.05V57.2H35.75V35.75H107.25V57.2H92.95V50.05H78.65V92.95H85.8V107.25H57.2V92.95H64.35V50.05ZM14.3 0H128.7C136.598 0 143 6.40233 143 14.3V128.7C143 136.598 136.598 143 128.7 143H14.3C6.40233 143 0 136.598 0 128.7V14.3C0 6.40233 6.40233 0 14.3 0ZM14.3 14.3V128.7H128.7V14.3H14.3Z" fill="black"/>
          </svg>
        </div>
        <div class="p-2">
          <p class="text-sm text-gray-600 pb-2">Tools for working with text and typography</p>
          <ul>
            <li class="py-2 border-b"><router-link to="/word-counter" class="btn mt-4  text-blue-500">Lorem Ipsum</router-link></li>
            <li class="py-2 border-b"><router-link to="/static-type-scale" class="btn mt-4  text-blue-500">Static Type Scale</router-link></li>
            <li class="py-2"><router-link to="/word-counter" class="btn mt-4  text-blue-500">Word Counter and Keywords Analysis</router-link></li>
          </ul>
        </div>  
        <router-link to="/typography-tools" class="btn bg-gray-50 rounded py-1 text-center text-gray-500">More Typography Tools</router-link>
      </div>
    </section>

  </main>
</template>