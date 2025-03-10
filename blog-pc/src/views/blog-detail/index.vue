<script setup lang="ts">
import BlogDetailContent from './components/blog-detail-content.vue'
import BlogDetailSidebar from './components/blog-detail-sidebar.vue'
import BlogDetailComment from './components/blog-detail-comment.vue'
import { behaviorApi, blogApi } from '@/apis'
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { codeToHtml } from 'shiki'
import { useUserGetters } from '@/store'
import { debounce } from '@/utils'
import { ESubjectType } from '@/typings'
import type { BlogItem } from '@/apis/modules/blog/type'

const $route = useRoute()

const blogInfo = ref<BlogItem>()
const titleList = ref<Element[]>([])

const getDetail = async () => {
    const resp = await blogApi.reqGetBlogDetail($route.params.id as string)
    blogInfo.value = resp.data

    nextTick(() => {
        highlight()
        titleList.value = getAllTitleDom()
        jumpTo()
    })
}
getDetail()

async function highlight() {
    const preList = Array.from(document.querySelectorAll('pre'))

    if (!preList.length) return

    for (const pre of preList) {
        const parent = pre.parentNode as HTMLElement
        // 获取父节点的 data-language 属性值
        const code = pre.querySelector('code')
        const lang = code?.className.split('language-')[1]
        const formatCode = await codeToHtml(pre.textContent!, {
            lang: lang || 'javascript',
            theme: 'night-owl'
        })
        const div = document.createElement('div')
        div.innerHTML = formatCode
        parent.replaceChild(div, pre)
    }
}

// 获取所有标题dom
function getAllTitleDom() {
    const container = document.querySelector('.markdown-body')
    if (!container) return []
    // 获取所有标题dom
    const headings = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6'))
    // 给所有标题添加 id
    headings.forEach((heading, index) => {
        heading.id = `anchor-heading-${index}`
    })
    return headings
}

// 跳转到页面指定位置
const jumpTo = (id?: string, e?: Event) => {
    let behavior: any = 'smooth'
    if (!id) {
        behavior = 'instant'
        id = window.location.hash.replace('#', '')
    }
    if (!id) return
    if (e) e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior })
}

const { isLogin } = useUserGetters()

const reqLike = async () => {
    if (!blogInfo.value) return
    const data = { subjectId: blogInfo.value.id, subjectType: ESubjectType.BLOG }
    if (blogInfo.value.isLike) {
        await behaviorApi.reqLike(data)
    } else {
        await behaviorApi.reqCancelLike(data)
    }
}

const dReqLike = debounce(reqLike, 300)

const switchLike = () => {
    if (!isLogin.value) return ElMessage.warning('请先登录')

    if (!blogInfo.value) return
    blogInfo.value.isLike = !blogInfo.value.isLike
    blogInfo.value.isLike ? blogInfo.value.likeNums++ : blogInfo.value.likeNums--
    dReqLike()
}
</script>

<template>
    <div class="blog-detail-container">
        <div class="container">
            <div class="content">
                <BlogDetailContent
                    @like="switchLike"
                    v-if="blogInfo"
                    :blog-info="blogInfo"
                >
                </BlogDetailContent>
                <BlogDetailComment />
            </div>
            <BlogDetailSidebar :title-list="titleList"></BlogDetailSidebar>
        </div>
    </div>
</template>

<style scoped lang="less">
.blog-detail-container {
    width: 100%;
    padding: 20px;
    height: 100%;
    @media (max-width: @size-xs) {
        padding: 0;
    }
    .container {
        max-width: var(--center-width);
        margin: 0 auto;
        display: flex;
        @media (max-width: @size-md) {
            display: block;
        }
        .content {
            flex: 1;
            max-width: 820px;
            margin-left: auto;
            @media (max-width: @size-md) {
                margin-right: auto;
            }
            @media (max-width: @size-xs) {
                margin: 0;
            }
        }
    }
}
</style>
