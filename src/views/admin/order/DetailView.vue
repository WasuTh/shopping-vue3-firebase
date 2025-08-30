<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router'

import { useAdminOrderStore } from '@/stores/admin/order';

import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()

const adminOrder = useAdminOrderStore()

const orderIndex = ref(-1)
const orderData = ref({})

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)

        orderData.value = adminOrder.getOrder(orderIndex.value)
    }
})
</script>
<template>
    <AdminLayout>
        <div class="m-10 p-10 shadow-2xl">
            <div class="mb-10 text-3xl font-bold">Orders id: {{ route.params.id }}</div>
            <div class="p-5 grid grid-cols-2 gap-5 border-t">
                <div>
                    <div class="font-bold">Order Date</div>
                    {{ orderData.updatedAt }}
                </div>
                <div>
                    <div class="font-bold">Order Number</div>
                    {{ orderData.no }}
                </div>
                <div>
                    <div class="font-bold">Payment Method</div>
                    {{ orderData.paymentMethod }}
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    {{ orderData.address }}
                </div>
            </div>
            <div v-for="order in orderData.products"
                class="p-5 flex justify-between border-t">
                <div class="flex">
                    <img :src="order.imageUrl">
                    <div class="ml-5">
                        <div>{{ order.name }}</div>
                        <div>{{ order.description }}</div>
                    </div>
                </div>
                <div>จำนวน {{ order.quantity }} ชิ้น</div>
                <div>{{ order.price }}</div>
            </div>
            <div class="p-5 flex justify-between font-bold border-t">
                <span>ราคาสิ้นค้าทั้งหมด</span>
                <div>ราคา {{ orderData.totalPrice }} B</div>
            </div>
            <div class="w-full p-5 flex justify-end">
                <RouterLink :to="{ name: 'admin-orders-list' }"
                    class="btn rounded-lg">Back
                </RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>