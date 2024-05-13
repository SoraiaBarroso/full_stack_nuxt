<template>
    <div class="flex justify-between">
        <div class="flex items-center w-3/4 justify-between">
            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsChatIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    4
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="green">
                <template v-slot:icon="{ classes }">
                    <IconsRefreshIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    518
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="red">
                <template v-slot:icon="{ classes }">
                    <IconsHeartIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    9.4K
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsStatsIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    85K
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