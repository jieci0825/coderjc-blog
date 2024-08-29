export interface JcDrawerProps {
	closeOnClickModal?: boolean
	beforeClose?: (done: (cancel?: boolean) => void) => void
}
