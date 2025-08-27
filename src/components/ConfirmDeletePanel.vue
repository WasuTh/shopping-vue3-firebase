<script setup>
import { defineProps } from 'vue';

defineProps({
    showComfirmDelete: Boolean,
    itemToDelete: String,
    itemIndexToDelete: Number,
    confirmRemoveItem: Function,
    closeComfirm: Function,
})
</script>
<template>
    <!-- comfirmation remove item -->
    <div class="w-[500px] h-[277px] px-15 py-10 rounded-xl shadow-2xl z-1000 fixed top-1/2 left-1/2 -translate-1/2 bg-white flex flex-col justify-between gap-10"
        v-if="showComfirmDelete">
        <div class="font-bold text-2xl">
            คุณแน่ใจว่าต้องการลบหรือไม่?
        </div>
        <div class="text-xl">ชื่อสิ้นค้า: {{ itemToDelete }}</div>
        <div class="flex justify-between gap-4">
            <button class="w-1/2 rounded-md btn btn-primary"
                @click="confirmRemoveItem(itemIndexToDelete)">ใช่</button>

            <button class="w-1/2 rounded-md btn btn-soft" @click="closeComfirm">ไม่</button>
        </div>
    </div>
</template>