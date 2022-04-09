/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

/* eslint func-names: 0 */
/* eslint global-require: 0 */
const { configure } = require('quasar/wrappers');

module.exports = configure((/* ctx */) => ({
	eslint: {
		// fix: true,
		// include = [],
		// exclude = [],
		// rawOptions = {},
		warnings: true,
		errors: true,
	},

	// https://v2.quasar.dev/quasar-cli/prefetch-feature
	// preFetch: true,

	// app boot file (/src/boot)
	// --> boot files are part of "main.js"
	// https://v2.quasar.dev/quasar-cli/boot-files
	boot: ['firebase', 'prefetch', 'routing'],

	// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
	css: ['app.scss'],

	// https://github.com/quasarframework/quasar/tree/dev/extras
	extras: [
		// 'ionicons-v4',
		'mdi-v5',
		// 'fontawesome-v6',
		// 'eva-icons',
		// 'themify',
		// 'line-awesome',
		// 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

		// 'roboto-font', // optional, you are not bound to it
		// 'material-icons', // optional, you are not bound to it
	],

	// Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
	build: {
		target: {
			browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
			node: 'node16',
		},

		vueRouterMode: 'history', // available values: 'hash', 'history'
		// vueRouterBase,
		// vueDevtools,
		// vueOptionsAPI: false,

		// rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

		// publicPath: '/',
		// analyze: true,
		// env: {},
		// rawDefine: {}
		// ignorePublicFolder: true,
		// minify: false,
		// polyfillModulePreload: true,
		// distDir

		// extendViteConf (viteConf) {},
		// viteVuePluginOptions: {},

		// vitePlugins: [
		//   [ 'package-name', { ..options.. } ]
		// ]
	},

	// Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
	devServer: {
		// https: true
		open: true, // opens browser window automatically
	},

	// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
	framework: {
		config: {
			dark: true,
			loadingBar: { color: 'accent' },
			notify: {
				icon: 'mdi-alert-circle-outline',
				timeout: 2500,
				actions: [
					{
						icon: 'mdi-close',
						color: 'white',
					},
				],
			},
		},

		iconSet: 'mdi-v5', // Quasar icon set
		// lang: 'en-US', // Quasar language pack

		// For special cases outside of where the auto-import strategy can have an impact
		// (like functional components as one of the examples),
		// you can manually specify Quasar components/directives to be available everywhere:
		//
		// components: [],
		// directives: [],

		// Quasar plugins
		plugins: ['Notify', 'LoadingBar', 'Dialog'],
	},

	// animations: 'all', // --- includes all animations
	// https://v2.quasar.dev/options/animations
	animations: ['zoomIn', 'zoomOut', 'fadeIn', 'fadeOut', 'shakeX', 'slideInRight', 'slideOutLeft'],

	// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
	// sourceFiles: {
	//   rootComponent: 'src/App.vue',
	//   router: 'src/router/index',
	//   store: 'src/store/index',
	//   registerServiceWorker: 'src-pwa/register-service-worker',
	//   serviceWorker: 'src-pwa/custom-service-worker',
	//   pwaManifestFile: 'src-pwa/manifest.json',
	//   electronMain: 'src-electron/electron-main',
	//   electronPreload: 'src-electron/electron-preload'
	// },

	// https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
	ssr: {
		// ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
		// will mess up SSR

		// extendSSRWebserverConf (esbuildConf) {},
		// extendPackageJson (json) {},

		pwa: false,

		// manualStoreHydration: true,
		// manualPostHydrationTrigger: true,

		prodPort: 3000, // The default port that the production server should use
		// (gets superseded if process.env.PORT is specified at runtime)

		middlewares: [
			'render', // keep this as last one
		],
	},

	// https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
	pwa: {
		workboxMode: 'injectManifest', // or 'injectManifest'
		injectPwaMetaTags: true,
		swFilename: 'sw.js',
		manifestFilename: 'manifest.json',
		useCredentialsForManifestTag: false,
		manifest: {
			short_name: 'Agendum',
			display: 'standalone',
			background_color: '#17181f',
			theme_color: '#fd7b33',
			shortcuts: [
				{
					name: 'Your Events',
					url: '/events',
					description: 'A List of events',
				},
				{
					name: 'Your Tasks',
					url: '/tasks',
				},
				{
					name: 'Your Notes',
					url: '/notes',
				},
			],
		},
		// extendGenerateSWOptions (cfg) {}
		// extendInjectManifestOptions (cfg) {},
		// extendManifestJson (json) {}
		// extendPWACustomSWConf (esbuildConf) {}
	},

	// Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
	cordova: {
		// noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
	},

	// Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
	capacitor: {
		hideSplashscreen: true,
	},

	// Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
	electron: {
		// extendElectronMainConf (esbuildConf)
		// extendElectronPreloadConf (esbuildConf)

		inspectPort: 5858,

		bundler: 'packager', // 'packager' or 'builder'

		packager: {
			// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
			// OS X / Mac App Store
			// appBundleId: '',
			// appCategoryType: '',
			// osxSign: '',
			// protocol: 'myapp://path',
			// Windows only
			// win32metadata: { ... }
		},

		builder: {
			// https://www.electron.build/configuration/configuration

			appId: 'agendum',
		},
	},

	// Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
	bex: {
		contentScripts: ['my-content-script'],

		// extendBexScriptsConf (esbuildConf) {}
		// extendBexManifestJson (json) {}
	},
}));
