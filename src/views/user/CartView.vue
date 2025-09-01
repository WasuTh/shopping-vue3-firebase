<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import Remove from '@/components/icons/Remove.vue';
import Quantity from '@/components/Quantity.vue';
import ConfirmDeletePanel from '@/components/ConfirmDeletePanel.vue'

import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { useCartStore } from '@/stores/user/cart'
import { useProductStore } from '@/stores/user/product';

const cartStore = useCartStore()
const productStore = useProductStore()
console.log('setup:', productStore.list.map(p => p.quantity))

onMounted(() => {
  console.log('onMounted:', productStore.list.map(p => p.quantity))
})
const showComfirmDelete = ref(false)
const itemToDelete = ref('')
const itemIndexToDelete = ref('')

const closeComfirm = () => {
  showComfirmDelete.value = false
}

const removeItem = (item, index) => {
    showComfirmDelete.value = true
    itemToDelete.value = item
    itemIndexToDelete.value = index 
}

const confirmRemoveItem = (index) => {
    cartStore.removeItemInCart(index)
    showComfirmDelete.value = false
}

const increaseItem = (item, index) => {
    if (item.quantity < productStore.list[index].quantity) {
        cartStore.addToCart(item)
    }
}

const decreaseItem = (item, index, quantity) => {
    const newQuantity = parseInt(quantity) - 1
    if (item.quantity >= 2) {
        cartStore.updateQuantity(index, newQuantity)
    } else {
        // ถ้าลบสิ้นค้าต่ำกว่า 1 จะแสดงหน้าต่างยืนยันการลบ และ ส่งค่าที่ต้องการลบไป
        showComfirmDelete.value = true
        itemToDelete.value = item
        itemIndexToDelete.value = index 
    }
}

</script>

<template>
    <UserLayout>
        <h1 class=" mx-10 font-bold text-3xl">Shopping Cart</h1>

        <div class="mx-10 flex">

            <!-- cart-left -->
            <section class="flex-auto w-64 p-3 bg-base-200">

                <!-- list items -->
                <div v-if="cartStore.items.length === 0">
                    Cart is Empty
                </div>

                <div v-else
                v-for="(items, index) in cartStore.items">
                    <div class="flex">

                        <!-- img -->
                        <div class="flex-1">
                            <img class="w-full max-w-md p-3"
                                :src="items.imageUrl">
                        </div>

                        <!-- detail -->
                        <div class="flex flex-1 flex-col justify-between">
                            <div class="">
                                <div>{{ items.name }}</div>
                                <div>{{ items.about }}</div>
                                <div>{{ items.price }}</div>
                            </div>
                        </div>

                        <!-- comfirmation remove item -->
                        <ConfirmDeletePanel
                            :showComfirmDelete="showComfirmDelete"
                            :itemToDelete="itemToDelete.name"
                            :itemIndexToDelete="parseInt(itemIndexToDelete)"
                            :confirmRemoveItem="confirmRemoveItem"
                            :closeComfirm="closeComfirm"
                        ></ConfirmDeletePanel>
                        
                        <!-- quantity select -->
                        <div class="flex justify-center gap-x-5 flex-1 w-full mt-5">
                            <Quantity
                            :items="cartStore.items"
                            :indexItem="index"
                            :increase="increaseItem"
                            :decrease="decreaseItem"
                            :products="productStore.list"
                            ></Quantity>

                            <!-- close button -->
                            <div @click="removeItem(items, index)"
                            class="w-10 h-10 shrink-0 flex justify-center items-center 
                            cursor-pointer duration-100 rounded-full 
                            hover:bg-white border-2 border-black-500">
                                <Remove></Remove>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- cart-right -->
            <section class="p-5 flex-auto w-32 bg-slate-200
                        flex flex-col gap-5
                        font-semibold">
                <div class="text-2xl">
                    Order summary
                </div>

                <div class="flex justify-between">
                    <div class="flex-2">รายการสิ้นค้า</div>
                    <div class="flex-1 text-center">จำนวน</div>
                    <div class="flex-1 text-end">ราคาต่อชิ้น</div>
                </div>

                <div v-for="(items, index) in cartStore.items"
                class="flex justify-between border-b-1">
                    <div class="flex-2 flex">
                        <div>{{ index+1 }}.</div>
                        <div>{{ items.name }}</div>
                    </div>
                    <div class="flex-1 text-center">
                        {{ items.quantity }}
                    </div>
                    <div class="flex-1 text-end">
                        <div>{{ items.price }}</div>
                    </div>
                </div>

                <div class="flex justify-between border-b-1">
                    <div>ราคารวม</div>
                    <div>{{ cartStore.summaryPrice }}</div>
                </div>

                <RouterLink :to="{ name: 'checkout' }" 
                    class="btn w-full py-8 text-2xl text-white bg-emerald-600 hover:bg-emerald-500 duration-100 rounded-none">
                    ชำระเงิน
                </RouterLink>
            </section>
        </div>
    </UserLayout>
</template>