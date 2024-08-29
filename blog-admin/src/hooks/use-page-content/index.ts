import { computed, isRef, onBeforeMount, reactive, toRefs } from 'vue'

function _isRef(obj: any) {
	return isRef(obj) ? obj.value : obj
}

export interface IPageContent {
	request?: (params: any) => Promise<any> // 请求数据的 api
	formatRespData?: (data: any) => void // 格式化请求到数据的函数
	respCallback?: (data: any) => void // 请求成功后的回调函数
	immediate?: true // 是否立即执行一次请求
	listField?: string // list字段名
	totalField?: string // 总数字段名
	queryParams?: any // 表单的查询参数
	isPage?: boolean // 是否需要添加分页参数
	pageSize?: number // 每页条数
}

// 初始分页信息
const INIT_PAGE_INFO = {
	page: 1,
	pageSize: 10,
	total: 0
}

export const usePageContent = (options: IPageContent) => {
	const config = Object.assign(
		{
			immediate: true,
			listField: 'list',
			totalField: 'total',
			isPage: true,
			pageSize: 10
		},
		options
	)

	const state = reactive({
		data: [],
		pagination: { ...INIT_PAGE_INFO, pageSize: config.pageSize },
		// 查询参数-不包括分页，仅限于查询
		queryParams: {},
		// 初始化默认查询参数
		initQueryParams: {},
		// 查询条件-包含分页与查询参数
		condition: {},
		// 接口返回的原始数据
		respRawData: null
	})

	const pageParams = computed(() => {
		return {
			page: state.pagination.page,
			pageSize: state.pagination.pageSize
		}
	})

	if (config.immediate && config.request) {
		onBeforeMount(() => {
			fetchData()
		})
	}

	async function fetchData() {
		if (!config.request) return
		// 合并传递的查询参数与分页数据为查询条件
		Object.assign(state.condition, _isRef(config.queryParams), config.isPage ? pageParams.value : {})
		// 如果存在传递的查询参数，则将其保存
		config.queryParams && (state.initQueryParams = _isRef(config.queryParams))

		// 发送请求
		const resp = await config.request(state.condition)
		// 保存原始请求数据
		state.respRawData = resp

		let result = resp.data
		// 是否需要对请求的数据进行格式化
		if (config.formatRespData) {
			result = config.formatRespData(resp)
		}
		// 赋值
		if (config.isPage) {
			state.data = result[config.listField]
			state.pagination.total = result[config.totalField]
		} else {
			state.data = result
		}

		// 请求完成的任务
		if (config.respCallback) {
			config.respCallback(resp)
		}
	}

	// 页码值改变进行搜索
	const onPageChange = (page: number) => {
		state.pagination.page = page
		fetchData()
	}

	// 页容量改变搜索
	const onSizeChange = (size: number) => {
		state.pagination.page = 1
		state.pagination.pageSize = size
		fetchData()
	}

	// 重置请求
	const reset = () => {
		state.pagination = INIT_PAGE_INFO
		state.queryParams = state.initQueryParams
		Object.assign(state.condition, state.queryParams, pageParams.value)
	}

	// 查询条件改变直接搜索
	function search() {
		state.pagination.page = 1
		fetchData()
	}

	return {
		...toRefs(state),
		reset,
		search,
		onPageChange,
		onSizeChange,
		fetchData
	}
}
