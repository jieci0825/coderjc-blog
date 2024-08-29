import { isEmpty } from './tools'

export function getLocalCache(key: string) {
	let result = undefined

	try {
		result = JSON.parse(localStorage.getItem(key)!)
	} catch (e) {
		result = localStorage.getItem(key)
	}

	return result
}

export function setLocalCache(key: string, value: string | object) {
	if (isEmpty(value)) return

	if (typeof value === 'string') {
		localStorage.setItem(key, value)
	} else {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

export function removeLocalCache(key: string) {
	localStorage.removeItem(key)
}
