import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [
      {
        name: 'test',
        imageUrl: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
        quantity: 5,
        about: 'Durable backpack for mountain hiking and travel.',
        status: 'open',
        price: 1200
      },
      {
        name: 'test 123',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        quantity: 5,
        about: 'Classic film camera for retro photography lovers.',
        status: 'closed',
        price: 3500
      },
      {
        name: 'Wooden Chair',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlndpwDalSNF8TzBG6T7kGv73l0IOReNJpKw&s',
        quantity: 5,
        about: 'Handmade wooden chair with natural finish.',
        status: 'pending',
        price: 800
      },
      {
        name: 'Wireless Headphones',
        imageUrl: 'https://static-cse.canva.com/blob/1182341/tools_feature_webp-to-jpg_hero_mobile2x.jpg',
        quantity: 5,
        about: 'Noise-cancelling Bluetooth headphones with long battery life.',
        status: 'open',
        price: 2500
      },
      {
        name: 'Laptop Stand',
        imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
        quantity: 5,
        about: 'Ergonomic adjustable laptop stand for better posture.',
        status: 'open',
        price: 900
      }
    ]
  }),
  actions: {
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})
