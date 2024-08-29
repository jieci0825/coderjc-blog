<script setup lang="ts">
import Dosearch from '@/components/dosearch'
import Navbar from '@/components/navbar'
import { ref } from 'vue'
import { useEventListener } from '@/hooks'
import { useGlobalGetters } from '@/store'

const visibleDosearch = ref(false)

useEventListener(document, 'keydown', (evt: KeyboardEvent) => {
	if (evt.ctrlKey && evt.key === 'k') {
		evt.preventDefault()
		visibleDosearch.value = true
	}
})

const { getRouteAnimation } = useGlobalGetters()
</script>

<template>
	<div class="layout-container">
		<div class="header-area">
			<Navbar @open-dosearch="visibleDosearch = true"></Navbar>
		</div>
		<div class="main-area">
			<router-view v-slot="{ Component }">
				<Transition
					:name="getRouteAnimation"
					mode="out-in">
					<Component :is="Component" />
				</Transition>
			</router-view>
		</div>

		<!-- dosearch -->
		<Dosearch v-model:visible="visibleDosearch"></Dosearch>

		<el-backtop
			target=".main-area"
			:right="30"
			:bottom="30" />
	</div>
</template>

<style scoped lang="less">
.layout-container {
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	.header-area {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		width: 100%;
		overflow: hidden;
		height: var(--header-height);
		box-shadow: var(--base-box-shadow);
	}
	.main-area {
		width: 100%;
		margin-top: var(--header-height);
		height: calc(100% - var(--header-height));
		overflow: auto;
		scroll-behavior: smooth;
	}
}
</style>
