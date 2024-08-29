import { InjectionKey } from 'vue'
import type { GetBlogListParams } from '@/apis/modules/blog/type'

interface BlogKey {
	setCondition: <K extends keyof GetBlogListParams>(key: K, value: GetBlogListParams[K]) => void
	goToBlogDetail: (id: number) => void
}

export const BlogKey: InjectionKey<BlogKey> = Symbol('BlogKey')
