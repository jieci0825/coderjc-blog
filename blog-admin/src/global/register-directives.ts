import type { App } from 'vue'
import { focus, drag } from '@/directives'

export default function (app: App) {
	app.directive('focus', focus)
	app.directive('drag', drag)
}
