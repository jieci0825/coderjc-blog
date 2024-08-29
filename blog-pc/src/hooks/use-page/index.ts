import { computed, isRef, onBeforeMount, reactive, toRefs } from 'vue'
import type { UsePageOptions } from './type'

function _isRef(obj: any) {
	return isRef(obj) ? obj.value : obj
}

const defaultOptions: UsePageOptions = {
	immediate: true,
	listField: 'list',
	totalField: 'total',
	isPage: true
}

export function usePage(request: Function, queryParams: object, options?: UsePageOptions) {
	const _options = Object.assign({}, defaultOptions, options)

	// 初始分页信息
	const INIT_PAGE_INFO = {
		page: 1,
		pageSize: 10,
		total: 0
	}

	const state = reactive({
		// 最后得到的数据
		data: [],
		// 分页数据
		pagination: {
			...INIT_PAGE_INFO
		},
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

	async function fetchData() {
		// 合并传递的查询参数与分页数据为查询条件
		Object.assign(state.condition, _isRef(queryParams), _options.isPage ? pageParams.value : {})
		// 如果存在传递的查询参数，则将其保存
		state.queryParams && (state.initQueryParams = _isRef(queryParams))

		const resp = await request(state.condition)
		state.data = resp.data[_options.listField!]
		state.pagination.total = resp.data[_options.totalField!]
		state.respRawData = resp.data

		_options?.respAfterCallback && _options.respAfterCallback(resp.data)

		try {
			_options?.dataCallback && (state.data = _options.dataCallback(state.data))
		} catch (error) {}
	}

	// 是否立即执行一次
	if (_options.immediate) {
		onBeforeMount(async () => {
			await fetchData()
		})
	}

	// 重置参数
	function resetParams() {
		state.pagination = INIT_PAGE_INFO
		state.queryParams = state.initQueryParams
		Object.assign(state.condition, state.queryParams, pageParams.value)
	}

	// 查询条件改变直接搜索
	function search() {
		state.pagination.page = 1
		fetchData()
	}

	// 页码值改变进行搜索
	function onPage(val: number) {
		state.pagination.page = val
		fetchData()
	}

	// 页容量改变搜索
	function onPageSize(val: number) {
		state.pagination.page = 1
		state.pagination.pageSize = val
		fetchData()
	}

	return {
		...toRefs(state),
		search,
		onPage,
		onPageSize,
		resetParams,
		fetchData
	}
}
