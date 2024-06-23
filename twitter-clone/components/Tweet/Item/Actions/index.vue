<template>
    <div class="flex justify-between">
        <div class="flex items-center w-3/4 justify-between">
            <TweetItemActionsIcons @on-click="emits('onCommentClick')" color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsChatIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ props.tweet.repliesCount }}
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="green">
                <template v-slot:icon="{ classes }">
                    <IconsRefreshIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ generateRandomNumber() }}
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="red">
                <template v-slot:icon="{ classes }">
                    <IconsHeartIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ generateRandomNumber() }}
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsStatsIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ generateRandomNumber() }}
                </template>
            </TweetItemActionsIcons>
        </div>
        <div class="flex w-1/4 justify-end">
            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsBookmarkIcon :class="classes"/>
                </template>
                <template v-slot:default> 
                    
                </template>
            </TweetItemActionsIcons>
            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsUploadIcon :class="classes"/>
                </template>
                <template v-slot:default> 
                    
                </template>
            </TweetItemActionsIcons>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['onCommentClick'])

function generateRandomNumber() {
    let ran = Math.floor(Math.random() * 10000);
    if (ran > 1000) {
        let formattedNumber = (ran / 1000).toFixed(1);
        return `${formattedNumber}K`;
    } else {
        return ran;
    }
}
</script>