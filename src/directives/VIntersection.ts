import { DirectiveBinding } from 'vue'

type FocusableElement = HTMLInputElement | HTMLTextAreaElement

export default {
	mounted(el: FocusableElement, binding: DirectiveBinding) {
		console.log(binding)

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				binding.value()
			}
		})

		observer.observe(el)
	}
}
