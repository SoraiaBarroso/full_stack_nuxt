<template>
    <div class="flex flex-col">
        <!-- Input search -->
        <input type="text" placeholder="Search" class="m-2 p-2 rounded-2xl bg-gray-100 dark:bg-dim-700"/>
        <!-- Preview Card: whats happènign -->
        <SideBarRightBarPreviewCard title="What's happening">
            <SideBarRightBarItem></SideBarRightBarItem>
        </SideBarRightBarPreviewCard>
        <!-- Preview Card: who to follow -->
        <SideBarRightBarPreviewCard title="Who to follow">
            <SideBarRightBarItem></SideBarRightBarItem>
        </SideBarRightBarPreviewCard>
    </div>
</template>
<script setup>
</script>