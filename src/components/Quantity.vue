<script setup>
import { defineProps } from 'vue'

defineProps({
    products: Array,
    items: Array,
    indexItem: Number,
    decrease: Function,
    increase: Function,
})
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="flex items-start gap-1">
            <button class="w-10 h-10 border-1 rounded cursor-pointer"
                @click="decrease(items[indexItem], [indexItem], items[indexItem].quantity)">
                <i class="fa-solid fa-minus"></i>
            </button>
        
            <div class="w-10 text-center text-2xl">
                {{ items[indexItem].quantity }}
            </div>
        
            <button class="w-10 h-10 border-1 rounded cursor-pointer" @click="increase(items[indexItem], [indexItem])">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div class="text-center mt-1">*สิ้นค้าที่เหลืออยู่ {{ products[indexItem].quantity }} ชิ้น</div>
    </div>
</template>