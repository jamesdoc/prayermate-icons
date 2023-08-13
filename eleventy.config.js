const esbuild = require("esbuild");

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  eleventyConfig.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["./src/assets/script.js"],
      outdir: "docs/assets",
      bundle: true,
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: process.env.ELEVENTY_ENV !== "production",
    });
  });

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
