import type { App } from 'vue'
import JcLogo from '@/components/jc-logo'
import JcDrawer from '@/components/jc-drawer'
import JcDialog from '@/components/jc-dialog'
import JcUpload from '@/components/jc-upload'

const comps = [JcLogo, JcDialog, JcDrawer, JcUpload]

export default function (app: App): void {
	comps.forEach(comp => app.component(comp.name as string, comp))
}
