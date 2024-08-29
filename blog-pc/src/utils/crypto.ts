import CryptoJS from 'crypto-js'

const secretKey = import.meta.env.VITE_AES_KEY

export function encrypt(text: string) {
	return CryptoJS.AES.encrypt(text, secretKey).toString()
}
