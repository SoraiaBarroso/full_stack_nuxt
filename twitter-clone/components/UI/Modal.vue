<template>
    <NModal
    v-model:show="open"
    >            
    <NCard   
      style="width: 550px"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <slot></slot>

    </NCard>
    </NModal>
</template>

<script setup>
import { NCard, NModal } from "naive-ui"

const emits = defineEmits(['onClose'])

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

const open = ref(false)

watch(
  () => props.isOpen,
  (newVal) => {
    open.value = newVal
  }
)

watch(open, (newVal) => {
  if (!newVal) {
    emits('onClose')
  }
})

function closeModal() {
  open.value = false
}
</script>