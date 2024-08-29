import JcTable from './src/jc-table.vue'

export * from './src/jc-table'

export default JcTable

declare module 'vue' {
	export interface GlobalComponents {
		JcTable: typeof JcTable
	}
}
