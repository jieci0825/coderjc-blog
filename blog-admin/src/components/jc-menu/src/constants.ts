import type { InjectionKey, Ref } from 'vue'
import type { MenuItem } from '@/apis/modules/menu/type'

interface JcMenuKey {
	menuList: Ref<MenuItem[]>
	currentPath: Ref<string>
}

export const JcMenuKey: InjectionKey<JcMenuKey> = Symbol('JcMenuKey')
