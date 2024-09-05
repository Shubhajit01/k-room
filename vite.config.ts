import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import paths from "vite-tsconfig-paths";
import fonts from "unplugin-fonts/vite";
import { imagetools } from "vite-imagetools";
import generouted from "@generouted/react-router/plugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		paths(),
		imagetools(),
		fonts({
			custom: {
				families: [
					{
						name: "Geist Sans",
						src: "./node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
						transform(font) {
							return {
								...font,
								weight: "100 900" as unknown as number,
							};
						},
					},
				],
			},
		}),
		generouted(),
	],
});
