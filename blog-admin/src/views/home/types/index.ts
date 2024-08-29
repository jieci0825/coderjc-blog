import type { InjectionKey, Ref } from 'vue'
import type { UserItem } from '@/apis/modules/user/type'
import type { SiteHomeInfo, SiteVisitData, SiteOtherStatisticData } from '@/apis/modules/site/type'

interface HomeKey {
	curUserInfo: Ref<null | UserItem>
	siteHomeInfo: Ref<null | SiteHomeInfo>
	siteVisitData: Ref<null | SiteVisitData>
	siteOtherStatisticData: Ref<null | SiteOtherStatisticData>
}

export const HomeKey: InjectionKey<HomeKey> = Symbol('HomeKey')
