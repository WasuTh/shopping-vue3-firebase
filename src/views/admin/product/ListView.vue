<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'

import { useAdminProductStore } from '@/stores/admin/product'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Remove from '@/components/icons/Remove.vue'
import Edit from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'

const adminProductStore = useAdminProductStore()

onMounted(() => {
    adminProductStore.loadProduct()
})

const removeAdminProduct = (index) => {
    adminProductStore.removeProduct(index)
}

const headersName = ['Name','Images','Price','Quantity','Status','Updated at',]
</script>
<template>
    <AdminLayout>
        <div class="p-10">
            <div class="p-4 flex justify-between">
                <span class="text-3xl font-bold">Product List</span>
                <RouterLink :to="{ name: 'admin-product-create'}" class="btn btn-ghost bg-gray-800 text-white rounded-md">add new</RouterLink>
            </div>
            <Table :headers="headersName">
                <tr v-for="(product, index) in adminProductStore.list" class="text-center">
                    <td class="font-bold">{{ product.name }}</td>
                    <td class="flex justify-center"><img :src="product.imageUrl" class="w-12"></td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                    <td>
                        <div class="badge" 
                            :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                            {{ product.status }}
                        </div>
                    </td>
                    <td>{{ product.updateAt }}</td>
                    <td>
                        <div>
                            <RouterLink :to="{ name: 'admin-product-update', params: { id: index }}" 
                                class="btn btn-ghost">
                                <Edit></Edit>
                            </RouterLink>
                            <div class="btn btn-ghost" @click="removeAdminProduct(index)">
                                <Remove></Remove>
                            </div>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
    </AdminLayout>
</template>