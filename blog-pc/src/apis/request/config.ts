// 引入环境变量
const { VITE_BASE_URL } = import.meta.env

const BASE_URL = VITE_BASE_URL
const TIME_OUT = 100000

export { BASE_URL, TIME_OUT }
