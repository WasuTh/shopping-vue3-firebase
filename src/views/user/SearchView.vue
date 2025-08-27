<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';
import Product from '@/components/Product.vue';

import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart';

const productStore = useProductStore()
const cartStore = useCartStore()

const route = useRoute()
const searchText = ref('')
const loginBefore = ref(false)

const addToCart = (product) => {
    if (localStorage.getItem('isLoggedIn')) {
        cartStore.addToCart(product)
    } else {
        loginBefore.value = true
    }
}

watch(() => route.query.q, (newSearchText) => {
    searchText.value = newSearchText
}, { immediate: true })

const filterProducts = computed(() => {
    return productStore.filterProducts(searchText.value)
})

const closePanel = () => {
    loginBefore.value = false
}
</script>

<template>
    <UserLayout>
        <!-- panel login before -->
        <div v-if="loginBefore" 
        class="w-[500px] h-[277px] px-15 py-10 rounded-xl shadow-2xl z-1000 fixed top-1/2 left-1/2 -translate-1/2 bg-white flex flex-col justify-between gap-10">
            <div class="h-full flex flex-col justify-around">
                <div class="font-bold text-2xl text-center">กรุณาล็อคอินก่อนสั่งซื้อสินค้า</div>
                <div class="flex justify-center">
                    <button @click="closePanel()"
                        class="w-fit py-5 px-10 rounded-md hover:cursor-pointer bg-emerald-300 hover:bg-emerald-400">ตกลง</button>
                </div>
            </div>
        </div>

        <div class="text-3xl mx-20 my-4">Search: {{ searchText }}</div>
        <Product
        :products="filterProducts"
        :addToCart="addToCart"
        ></Product>
    </UserLayout>
</template>