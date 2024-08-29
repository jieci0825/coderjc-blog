import type { App } from 'vue'
import JcForm from '@/components/jc-form'
import JcTable from '@/components/jc-table'
import JcPaginator from '@/components/jc-paginator'
import JcUpload from '@/components/jc-upload'
import JcDrawer from '@/components/jc-drawer'
import JcDialog from '@/components/jc-dialog'
import JcLogo from '@/components/jc-logo'
import JcMenu from '@/components/jc-menu'
import JcImage from '@/components/jc-image'
import PageContent from '@/components/page-content'

const comps = [JcForm, JcTable, JcPaginator, JcUpload, JcDrawer, JcDialog, JcLogo, JcMenu, JcImage, PageContent]

export default function (app: App): void {
	comps.forEach(comp => app.component(comp.name as string, comp))
}
