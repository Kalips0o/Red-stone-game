import { defineConfig } from '@vite-pwa/assets-generator/config'
import { minimal2023Preset } from '@vite-pwa/assets-generator/presets'

export default defineConfig({
	headLinkOptions: {
		preset: '2023',
	},
	preset: minimal2023Preset,
	images: ['public/assets/favicons/192x192.png'],
})
