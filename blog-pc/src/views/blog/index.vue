<script setup lang="ts">
import BlogSidebar from './components/blog-sidebar.vue'
import BlogContent from './components/blog-content.vue'
import { provide, ref } from 'vue'
import { BlogKey } from './constants'
import { usePage } from '@/hooks'
import { debounce, getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { blogApi } from '@/apis'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { BLOG_SCROLL_TOP } from '@/constants'
import type { GetBlogListParams } from '@/apis/modules/blog/type'

defineOptions({
    name: 'Blog',
    beforeRouteEnter: (_, __, next) => {
        const top = getLocalCache(BLOG_SCROLL_TOP)
        if (top) {
            const scrollContainer = document.querySelector('.main-area')! as HTMLElement
            scrollContainer && scrollContainer.scrollTo({ top })
        }
        next()
    }
})

onBeforeRouteLeave((to, _) => {
    if (to.path.includes('blog-detail')) {
        const scrollTopPosition = document.querySelector('.main-area')!.scrollTop
        setLocalCache(BLOG_SCROLL_TOP, scrollTopPosition)
    } else {
        removeLocalCache(BLOG_SCROLL_TOP)
    }
})

const loadingSkeleton = ref(true)
const condition = ref<GetBlogListParams>({ page: 1, pageSize: 10, title: '', categoryId: undefined })

const { fetchData, pagination, onPage, onPageSize, data } = usePage(blogApi.reqGetBlogList, condition, {
    respAfterCallback: () => {
        loadingSkeleton.value = false
    }
})

const dFetchData = debounce(fetchData, 300)

const setCondition = <K extends keyof GetBlogListParams>(key: K, value: GetBlogListParams[K]) => {
    condition.value[key] = value
    dFetchData()
}

const router = useRouter()
const goToBlogDetail = (id: number) => {
    router.push(`/blog-detail/${id}`)
}

provide(BlogKey, {
    setCondition,
    goToBlogDetail
})
</script>

<template>
    <div class="blog-container">
        <div class="contianer">
            <BlogContent
                @on-page="onPage"
                @on-page-size="onPageSize"
                v-model:title="condition.title"
                :loadingSkeleton="loadingSkeleton"
                :blog-list="data"
                :total="pagination.total"
            ></BlogContent>
            <BlogSidebar :category-id="condition.categoryId"></BlogSidebar>
        </div>
    </div>
</template>

<style scoped lang="less">
.blog-container {
    width: 100%;
    padding: 20px;
    @media (max-width: @size-xs) {
        padding: 10px 0;
        overflow: hidden auto;
    }
    .contianer {
        margin: 0 auto;
        max-width: var(--center-width);
        display: flex;
        gap: 20px;
    }
}
</style>
