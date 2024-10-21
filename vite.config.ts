import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
			manifest: {
				name: 'RedStone',
				short_name: 'RedStone',
				description: 'Best card game',
				theme_color: '#123c64',
				icons: [
					{
						src: '/favicons/192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/favicons/512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/favicons/192x192.jpg',
						sizes: '192x192',
						type: 'image/jpg',
						purpose: 'maskable',
					},
					{
						src: '/favicons/512x512.jpg',
						sizes: '512x512',
						type: 'image/jpg',
						purpose: 'maskable',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	assetsInclude: ['**/*.gif'],
})
