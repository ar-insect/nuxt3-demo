
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'TsxButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    }
  },
  setup(props, { slots }) {
    return () => (
      <button
        class={[
          'px-4 py-2 rounded font-bold transition-transform active:scale-95',
          props.variant === 'primary' 
            ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        ]}
      >
        {slots.default ? slots.default() : 'Styled Button'}
      </button>
    )
  }
})
