import type { InjectionKey } from 'vue'
import type { JcUploadProps } from './jc-upload'

interface JcUploadKey extends JcUploadProps {
	setModelValue: (value: File | File[] | null) => void
}

export const JcUploadKey: InjectionKey<JcUploadKey> = Symbol('JcUploadKey')
