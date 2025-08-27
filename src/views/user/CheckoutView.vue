<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import Quantity from '@/components/Quantity.vue';
import Remove from '@/components/icons/Remove.vue';
import ConfirmDeletePanel from '@/components/ConfirmDeletePanel.vue'

import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/user/cart'
import { useProductStore } from '@/stores/user/product';
import { computed, onMounted, ref, reactive } from 'vue';

const router = useRouter()
const cartStore = useCartStore()
    console.log('cart Store pre: ',typeof cartStore.checkout)
    console.log('cart Store pre: ', cartStore.checkout)
const productStore = useProductStore()

const showComfirmDelete = ref(false)
const itemToDelete = ref('')
const itemIndexToDelete = ref('')

const closeComfirm = () => {
  showComfirmDelete.value = false
}

const confirmRemoveItem = (index) => {
    cartStore.removeItemInCart(index)
    showComfirmDelete.value = false
}

const removeItem = (item, index) => {
    showComfirmDelete.value = true
    itemToDelete.value = item
    itemIndexToDelete.value = index 
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

const formData = [
    {
        name: 'Email Adress',
        field: 'email'
    },
    {
        name: "Name",
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]

const userFormData = reactive({
    email: 'wasu@',
    name: 'wasu',
    address: 'test',
    note: '123',
})

const payment = () => {
    if (typeof cartStore.checkout === 'function') {
    cartStore.checkout(userFormData) // เรียก checkout ของ store
    router.push({ name: 'success' }) // ไปหน้า success
    } else {
    console.error('checkout function not found in cartStore')
    console.log('cart Store: ', typeof cartStore.checkout)
    console.log('cart Store: ', cartStore.checkout)
    console.log('cart Store post: ', cartStore)
    }
}

</script>

<template>
    <UserLayout>
        <div class="font-bold text-5xl mx-10 my-3">Checkout</div>

        <div class="flex flex-col box-border">
            <section class="flex p-5 text-2xl m-5 bg-slate-200 text-center">
                <div class="flex-2 pl-5 flex justify-start">ชื่อสิ้นค้า</div>
                <div class="flex-2">ราคาต่อชิ้น</div>
                <div class="flex-2">จำนวน</div>
                <div class="flex-2">ราคารวม</div>
                <div class="flex-1">แอคชัน</div>
            </section>

            <section class="flex-1 m-5 px-10 py-5 bg-slate-200 flex-col flex">
                <div v-for="(items, index) in cartStore.items" class="flex text-center border-b-1 py-5 font-bold">
                    <div class="flex-2 flex gap-4">
                        <img :src="items.imageUrl" class="max-w-[150px]">
                        <div class="">{{ items.name }}</div>
                    </div>
                    <div class="flex-2 pt-10">{{ items.price }}</div>
                    <div class="flex-2 pt-5">
                        <Quantity
                        :items="cartStore.items" 
                        :indexItem="index" 
                        :increase="increaseItem"
                        :decrease="decreaseItem" 
                        :products="productStore.list">
                        </Quantity>
                    </div>
                    <div class="flex-2 pt-10">{{ (items.price) * (items.quantity) }}</div>
                    <div class="flex-1 flex justify-center items-center">
                        <div @click="removeItem(items, index)" 
                        class="w-10 h-10 flex justify-center items-center 
                                cursor-pointer duration-100 rounded-full 
                                hover:bg-white border-2 border-black-500">
                            <Remove></Remove>
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
                </div>
            </section>

            <section class="flex-2 mx-5 mb-5 px-10 py-7 bg-base-200 flex text-2xl">
                <div class="flex-1 px-5 flex flex-col gap-2">
                    <div class="flex flex-col gap-2" v-for="form in formData">
                        <span class="">{{ form.name }}</span>
                        <textarea v-if="form.name === 'Address'" v-model="userFormData.address" placeholder="Type here"
                            class="textarea w-full rounded-md"></textarea>
                        <input v-else v-model="userFormData[form.field]" type="text" placeholder="Type here"
                            class="input w-full rounded-md" />
                    </div>
                </div>

                <div class="flex-1 px-5 pt-5">
                    <div class="flex justify-between">
                        <span>ราคาทั้งหมด</span>
                        <div>{{ cartStore.summaryPrice }}</div>
                    </div>
                    <div class="flex justify-between">
                        <span>ค่าส่ง</span>
                        <div>-</div>
                    </div>
                    <div class="flex justify-between">
                        <span>ยอดชำระทั้งหมด</span>
                        <div>{{ cartStore.summaryPrice }}</div>
                    </div>
                    <div class="flex justify-end gap-10">
                        <RouterLink :to="{ name: 'cart' }"
                            class="text-black bg-slate-300 hover:bg-black hover:text-white duration-100 w-[20%] mt-10 p-5 text-2xl text-center cursor-pointer">
                            <i class="fa-solid fa-arrow-left"></i>
                        </RouterLink>
                        <button @click="payment"
                            class="text-white bg-emerald-600 hover:bg-emerald-500 duration-100 w-[70%] mt-10 p-5 text-2xl cursor-pointer">
                            ชำระเงิน
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </UserLayout>
</template>