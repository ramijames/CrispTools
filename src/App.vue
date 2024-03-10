<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="/crisp-logo-white.svg"
                    alt="Crisp Tools"
                  />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            v-if="!item.children"
                            :href="item.href"
                            :class="[
                              item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                              'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700',
                            ]"
                            >{{ item.name }}</a
                          >
                          <Disclosure as="div" v-else v-slot="{ open }">
                            <DisclosureButton
                              :class="[
                                item.current
                                  ? 'bg-gray-50'
                                  : 'hover:bg-gray-50',
                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700',
                              ]"
                            >
                              <ChevronRightIcon
                                :class="[
                                  open
                                    ? 'rotate-90 text-gray-500'
                                    : 'text-gray-400',
                                  'h-5 w-5 shrink-0',
                                ]"
                                aria-hidden="true"
                              />
                              {{ item.name }}
                            </DisclosureButton>
                            <DisclosurePanel as="ul" class="mt-1 px-2">
                              <li
                                v-for="subItem in item.children"
                                :key="subItem.name"
                              >
                                <DisclosureButton
                                  as="a"
                                  :href="subItem.href"
                                  :class="[
                                    subItem.current
                                      ? 'bg-gray-50'
                                      : 'hover:bg-gray-50',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700',
                                  ]"
                                  >{{ subItem.name }}</DisclosureButton
                                >
                              </li>
                            </DisclosurePanel>
                          </Disclosure>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-black bg-black p-6"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img
            class="w-auto h-12"
            src="/crisp-logo-black.svg"
            alt="Crisp Tools"
          />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a
                    v-if="!item.children"
                    :href="item.href"
                    :class="[
                      item.current ? 'bg-black' : 'hover:bg-black',
                      'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-white',
                    ]"
                    >{{ item.name }}</a
                  >
                  <Disclosure as="div" v-model="open" v-else v-slot="{ open }">
                    <DisclosureButton
                      :class="[
                        item.current ? 'bg-black' : 'hover:bg-black',
                        'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-white',
                      ]"
                    >
                      <ChevronRightIcon
                        :class="[
                          open ? 'rotate-90 text-white' : 'text-white',
                          'h-5 w-5 shrink-0',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </DisclosureButton>
                    <DisclosurePanel as="ul" class="mt-1 px-2">
                      <li v-for="subItem in item.children" :key="subItem.name">
                        <DisclosureButton
                          @click="open = true"
                          as="a"
                          :href="subItem.href"
                          :class="[
                            subItem.current ? 'bg-black' : 'hover:bg-black',
                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-white',
                          ]"
                          >{{ subItem.name }}</DisclosureButton
                        >
                      </li>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">
        Dashboard
      </div>
    </div>

    <main class="lg:pl-72">
      <!-- Main area -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";

import { ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

let navigation = ref([]);
let open = ref(false);

watch(
  route,
  (newRoute) => {
    navigation.value = [
      { name: "Dashboard", href: "/", current: newRoute.path === "/" },
      {
        name: "Type Tools",
        current:
          newRoute.path === "/lipsum" || newRoute.path === "/fluid-type-scale",
        children: [
          {
            name: "Lorem Ipsum",
            href: "/lipsum",
            current: newRoute.path === "/lipsum",
          },
          {
            name: "Fluid Type Scale",
            href: "/fluid-type-scale",
            current: newRoute.path === "/fluid-type-scale",
          },
        ],
      },
    ];
  },
  { immediate: true }
);

const sidebarOpen = ref(false);
</script>
