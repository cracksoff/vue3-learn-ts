import { createApp } from 'vue'
import App from '@/App.vue'
import components from '@/components/UI'
import router from '@/router/router'
import VIntersection from '@/directives/VIntersection'

const app = createApp(App)

components.forEach((component) => {
	if (component.__name) app.component(component.__name, component)
})

app.directive('intersection', VIntersection)

app.use(router).mount('#app')
