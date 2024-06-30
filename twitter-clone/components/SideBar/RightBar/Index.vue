<template>
    <div class="flex flex-col">
        <!-- Search Bar -->
        <div class="relative m-2">
          <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
              <div class="w-6 h-6 flex justify-center items-center">
                  <IconsSearchIcon @click="handleSearch"/>
              </div>
          </div>
          <input
              v-model="search"
              @keydown.enter="handleSearch"
              class="flex items-center h-9 w-full pl-12 text-sm font-normal text-black dark:text-gray-100 bg-gray-100 border border-gray-200 rounded-full
              shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border-blue-200 focus:border" 
              type="text"
              placeholder="Search tweet"
              >
        </div>
        <!-- <input type="text" placeholder="Search" class="m-2 p-2 rounded-2xl bg-gray-100 dark:bg-dim-700"/> -->
        <!-- Preview Card: whats happènign -->
        <SideBarRightBarPreviewCard title="What's happening">
            <SideBarRightBarCardItem v-for="data in whatsHappeninData">
                <div >
                    <p class="text-sm text-gray-500 dark:text-gray-500">{{ data.trending }}</p>

                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ data.title }}</h2>

                    <p class="text-sm text-gray-500 dark:text-gray-500">{{ data.count }}</p>
                </div>
                <div class="pr-2">
                    <SettingsIcons class=" text-gray-500 rounded-xl"/>
                </div>
            </SideBarRightBarCardItem>
        </SideBarRightBarPreviewCard>
        <!-- Preview Card: who to follow -->
        <SideBarRightBarPreviewCard title="Who to follow">
           <SideBarRightBarCardItem v-for="data in whoToFollowData">
                <div class="flex flex-row justify-between w-full p-2 pl-0">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="data.image" alt="data.name">
                        
                        <div class="flex flex-col ml-2 justify-between">
                            <h1 class="dark:text-white font-bold text-sm text-gray-800">{{ data.name }}</h1>
                            <p class="text-gray-500  dark:text-gray-500 text-sm">{{ data.handle }}</p>
                        </div>
                    </div>
                    <div class="flex items-center h-full">
                        <button class="hover:opacity-85 rounded-full px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white">Follow</button>
                    </div>
                </div>
           </SideBarRightBarCardItem>
        </SideBarRightBarPreviewCard>
    </div>
</template>
<script setup>
import SettingsIcons from '~/components/Icons/SettingsIcons.vue';

function getRandomUser(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const search = ref('')

const handleSearch = () => {
  useRouter().push({
    path: '/search',
    query: {
      q: search.value
    }
  })
}

const names = [
  { name: 'Elon Musk', handle: '@ElonMusk' },
  { name: 'Mark Zuckerberg', handle: '@MarkZuckerberg' },
  { name: 'Bill Gates', handle: '@BillGates' },
  { name: 'Sundar Pichai', handle: '@SundarPichai' },
  { name: 'Tim Cook', handle: '@TimCook' },
  { name: 'Satya Nadella', handle: '@SatyaNadella' },
  { name: 'Jeff Bezos', handle: '@JeffBezos' },
  { name: 'Larry Page', handle: '@LarryPage' },
  { name: 'Sergey Brin', handle: '@SergeyBrin' },
  { name: 'Sheryl Sandberg', handle: '@SherylSandberg' }
];

const whoToFollowData = ref([
  (() => {
    const user = getRandomUser(names);
    return {
      name: user.name,
      handle: user.handle,
      image: `https://picsum.photos/seed/${Math.random()}/200/200`
    };
  })(),
  (() => {
    const user = getRandomUser(names);
    return {
      name: user.name,
      handle: user.handle,
      image: `https://picsum.photos/seed/${Math.random()}/200/200`
    };
  })(),
  (() => {
    const user = getRandomUser(names);
    return {
      name: user.name,
      handle: user.handle,
      image: `https://picsum.photos/seed/${Math.random()}/200/200`
    };
  })()
]);

const data = [
  "SpaceX", "#CodingIsFun", "#VueJs", "#Nuxt",
  "#JavaScript", "#WebDevelopment", "#100DaysOfCode", "#AI", "#MachineLearning",
  "#Tech", "#Programming", "#Frontend", "#Backend", "#FullStack",
  "#NodeJS", "#ReactJS", "#Angular", "#DevOps", "#CloudComputing",
  "#CyberSecurity", "#DataScience", "#BigData", "#Blockchain", "#QuantumComputing"
];

const getRandomTitle = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

function generateRandomNumber() {
    let ran = Math.floor(Math.random() * 50000);
    if (ran > 10000) {
        let formattedNumber = (ran / 1000).toFixed(1);
        return `${formattedNumber}K posts`;
    } else {
        return `${ran} posts`;
    }
}

const whatsHappeninData = ref([
    {
        trending: '1 · Trending',
        title: getRandomTitle(data),
        count: generateRandomNumber()
    },
    {
        trending: '2 · Trending',
        title: getRandomTitle(data),
        count: generateRandomNumber()
    },
    {
        trending: '3 · Trending',
        title: getRandomTitle(data),
        count: generateRandomNumber()
    },
    {
        trending: '4 · Trending',
        title: getRandomTitle(data),
        count: generateRandomNumber()
    }
])
</script>