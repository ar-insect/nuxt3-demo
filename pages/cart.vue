<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 pb-5 mb-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Shopping Cart</h1>
    </div>

    <div v-if="cartItems.length === 0" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
      <p class="mt-1 text-sm text-gray-500">Start adding some items to your cart.</p>
      <div class="mt-6">
        <NuxtLink to="/products">
          <BaseButton variant="primary">Continue Shopping</BaseButton>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

        <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
          <li v-for="item in cartItems" :key="item.id" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <img 
                :src="item.image" 
                :alt="item.title" 
                class="w-24 h-24 rounded-md object-center object-contain sm:w-48 sm:h-48"
              />
            </div>

            <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm">
                      <NuxtLink :to="`/products/${item.id}`" class="font-medium text-gray-700 hover:text-gray-800">
                        {{ item.title }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <p class="mt-1 text-sm font-medium text-gray-900">${{ item.price }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <label :for="`quantity-${item.id}`" class="sr-only">Quantity, {{ item.title }}</label>
                  <select 
                    :id="`quantity-${item.id}`" 
                    :name="`quantity-${item.id}`" 
                    :value="item.quantity"
                    @change="updateQuantity(item.id, parseInt(($event.target as HTMLSelectElement).value))"
                    class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option v-for="num in 10" :key="num" :value="num">{{ num }}</option>
                  </select>

                  <div class="absolute top-0 right-0">
                    <button 
                      type="button" 
                      @click="removeFromCart(item.id)"
                      class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Remove</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section aria-labelledby="summary-heading" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
        <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600">Subtotal</dt>
            <dd class="text-sm font-medium text-gray-900">${{ cartTotal.toFixed(2) }}</dd>
          </div>
          <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt class="text-base font-medium text-gray-900">Order total</dt>
            <dd class="text-base font-medium text-gray-900">${{ cartTotal.toFixed(2) }}</dd>
          </div>
        </dl>

        <div class="mt-6">
          <BaseButton block size="lg" @click="handleCheckout">Checkout</BaseButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
const toast = useToast()

const handleCheckout = () => {
  toast.success('Order placed successfully! (Demo)')
  setTimeout(() => {
    clearCart()
    navigateTo('/products')
  }, 1500)
}
</script>
