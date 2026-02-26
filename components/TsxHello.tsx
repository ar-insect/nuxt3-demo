import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TsxHello',
  props: {
    message: {
      type: String,
      default: 'Hello from TSX!'
    }
  },
  setup(props) {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return () => (
      <div class="p-4 border rounded bg-gray-50">
        <h3 class="text-lg font-bold text-blue-600">{props.message}</h3>
        <p class="my-2">Current count: {count.value}</p>
        <button 
          onClick={increment}
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    )
  }
})
