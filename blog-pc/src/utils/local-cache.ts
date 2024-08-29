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

export function setLocalCache(key: string, value: string | number | object) {
	if (isEmpty(value)) return

	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		localStorage.setItem(key, value as string)
	}
}

export function removeLocalCache(key: string) {
	localStorage.removeItem(key)
}
