<template>
  <div :class="{'dark': darkMode}">
    <div class="bh-white dark:bg-dim-900">
      <div class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-6 lg:gap-5">
              <!-- left -->
              <div class="md:block md:col-span-1 xs-col-span-1 xl:col-span-2">
                <div class="sticky top-0">
                  <SideBarLeftBar/>
                </div>
              </div>

              <!-- Main -->
              <main class="col-span-11 md:col-span-8 xl:col-span-6 bg-red-500">
                hello there main
              </main>

              <!-- Right -->
              <div class="hidden md:block xl:col-span-4 md:col-span-3 bg-blue-300">
                <div class="sticky top-0">
                  <SideBarRightBar/>
                </div>
              </div>
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
  // no importing due to nuxt
  const darkMode = ref(false)

</script>