<script setup>

import { defineProps } from 'vue'

defineProps({
    products: Array,
    addToCart: Function
})

</script>
<template>
    <!-- product shelt -->
    <section class="grid gap-4
                    grid-cols-1 sm:grid-cols-2 
                    lg:grid-cols-3 xl:grid-cols-4 
                    my-3 px-20">
        <div v-for="product in products" 
        class="card bg-base-100 w-full shadow-sm">
            <figure>
                <img :src="product.imageUrl" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">{{ product.name }}</h2>
                <p>{{ product.about }}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary"
                    @click="addToCart(product)">Buy Now</button>
                </div>
            </div>
        </div>
    </section>
</template>