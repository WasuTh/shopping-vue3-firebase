<script setup>
import { onMounted, ref } from 'vue'

import UserLayout from '@/layouts/UserLayout.vue';

import { useCartStore } from '@/stores/user/cart';

const cartStore = useCartStore()
const orderData = ref({})

const orderReceipt = [
    {
        name: 'Order Date',
    },
    {
        name: 'Order Number',
    },
    {
        name: 'Payment Method',
    },
    {
        name: 'Address',
    },
]

onMounted(() => {
    cartStore.loadCheckout()
    if (cartStore.checkoutData.orderNumber) {
        orderData.value = cartStore.checkoutData
    }
})
</script>

<template>
    <UserLayout>
        <div class="max-w-5xl mx-auto my-5 p-5 border-base-200 shadow-md flex flex-col font-bold text-2xl">
            <div class="">
                <span>Your order is successfull !</span>
                <div>Hi {{ orderData.name }}</div>
                <span>เตรียมรับออเตอร์ของคุณได้เลย</span>
            </div>
            <div class="border-t-1 text-xl flex justify-between">
                <div v-for="(orderData, index) in [orderData.createdDate, orderData.orderNumber, orderData.paymentMethod, orderData.address]" 
                class="flex flex-col py-2">
                    <span>{{ orderReceipt[index].name }}</span>
                    <span>{{ orderData }}</span>
                </div>
            </div>
            <div class="border-t-1 text-xl">
                <div v-for="(cart, index) in cartStore.items.length"
                    class="flex py-5 [&:not(:first-child)]:border-t-1 items-center">
                    <div class="flex-2 flex gap-10 items-center">
                        <img :src="cartStore.items[index].imageUrl" class="max-w-[150px]">
                        <div>{{ cartStore.items[index].name }}</div>
                    </div>
                    <div class="flex-1">จำนวน {{ cartStore.items[index].quantity }}</div>
                    <div class="flex-1">ราคาต่อชิ้น {{ cartStore.items[index].price * cartStore.items[index].quantity }}</div>
                </div>
            </div>
            <div class="border-t-1 text-xl p-5">
                <div class="flex justify-between">
                    <span>ราคาสินค้าทั้งหมด</span>
                    <div>{{ cartStore.summaryPrice }}</div>
                </div>
                <div class="flex justify-between">
                    <span>ค่าส่ง</span>
                    <span>0</span>
                </div>
            </div>
            <div class="border-t-1 text-xl p-5">
                <div class="flex justify-between">
                    <span>ราคาทั้งสิ้น</span>
                    <div>{{ cartStore.summaryPrice }}</div>
                </div>
            </div>
            <span class="border-t-1 text-xl pt-5 px-5">ขอบคุณที่มาซื้อของเรา</span>
        </div>
    </UserLayout>
</template>