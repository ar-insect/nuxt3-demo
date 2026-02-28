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
      <div class="p-4 bg-gray-100 rounded-lg">
        <h3 class="text-xl font-bold mb-2">Hello from TSX Component!</h3>
        <p class="mb-4">{props.message}</p>
        <p class="mb-4">Count: {count.value}</p>
        <button
          onClick={increment}
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          增加
        </button>
      </div>
    )
  }
})
