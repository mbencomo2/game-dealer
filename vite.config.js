import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        dealListing: resolve(__dirname, "src/dealListing/index.html"),
        wishlist: resolve(__dirname, "src/wishlist/index.html"),
        user: resolve(__dirname, "src/user/index.html"),
        help: resolve(__dirname, "src/help/index.html"),
      },
    },
  },
});
