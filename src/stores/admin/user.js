import { defineStore } from 'pinia'

export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        loadUser() {
            const users = localStorage.getItem('admin-user')
            if (users) {
                this.list = JSON.parse(users)
                this.loaded = true
            }
        },
        getUser(index) {
            if (!this.loaded) {
                this.loadUser()
            }
            return this.list[index]
        },
        updateUser(index, userData) {
            const updateUser = {
                ...this.list[index],
                ...userData,
                updatedAt: new Date().toISOString()
            }
            this.list[index] = updateUser
            console.log(this.list[index])
            localStorage.setItem('admin-user', JSON.stringify(this.list))
        },
        removeUser(index) {
            this.list.splice(index, 1)
            localStorage.setItem('admin-user', JSON.stringify(this.list))
        }
    }
})