<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useCartStore } from './stores/user/cart'; 
import { useProductStore } from '@/stores/user/product'

const cartStore = useCartStore()
const productStore = useProductStore()

onMounted(() => {
  cartStore.loadCart()
  productStore.loadProduct()
})
</script>

<template>
  <RouterView></RouterView>
</template>