<script setup>
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'

import AdminLayout from '@/layouts/AdminLayout.vue'

const adminProductStore = useAdminProductStore()

const route = useRoute()
const router = useRouter()

const mode = ref('ADD')

const productIndex = ref(-1)
const productData = ref({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'EDIT'

        const selectedProduct = adminProductStore.getProduct(productIndex.value)

        const updateProductData = {
            ...productData.value,
            ...selectedProduct,
        }
        productData.value = updateProductData
    }
})

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'ImageUrl',
        field: 'imageUrl'
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    },
]

const updateAdminProduct = () => {
    if (mode.value === 'EDIT') {
        adminProductStore.updateProduct(productIndex.value, productData.value)
    } else {
        adminProductStore.addProduct(productData.value)
    }
    router.push({ name: 'admin-products-list' })
}

</script>
<template>
    <AdminLayout>
        <div class="m-10 p-10 shadow-2xl">
            <div class="text-3xl font-bold">{{ mode }}</div>
            <div class="mt-10 pt-10 grid grid-cols-2 gap-2 border-t-1">
                <div v-for="form in formData">
                    <div class="flex flex-col">
                        <span class="font-bold">{{ form.name }}</span>
                        <input 
                            type="text"
                            class="w-full mt-5 p-6 text-xl input input-ghost border border-gray-500"
                            v-model="productData[form.field]"/>
                    </div>
                </div>
            </div>
            <div class="mt-10 pt-10 flex flex-col gap-5 border-t-1">
                <div>
                    <select class="mt-5 text-xl select select-lg select-ghost border border-gray-500"
                        v-model="productData.status">
                        <option disabled selected>choose status</option>
                        <option value="close">Close</option>
                        <option value="open">Open</option>
                    </select>
                </div>
                <div class="flex justify-end gap-10">
                    <RouterLink :to="{ name: 'admin-products-list' }" 
                        class="px-5 uppercase btn btn-ghost rounded-md bg-slate-200">
                        back
                    </RouterLink>
                    <button class="px-5 uppercase btn btn-success rounded-md" @click="updateAdminProduct()">{{ mode }}</button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>