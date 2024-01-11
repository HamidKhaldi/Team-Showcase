module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/scss/_tools/_variables.scss";
            @import "@/assets/scss/_tools/_mixins.scss";
            @import "@/assets/scss/_tools/_helpers.scss";
            @import "@/assets/scss/_base/_base.scss";
            @import "@/assets/scss/_base/_typography.scss";
            @import "@/assets/scss/_media/_print.scss";
            @import "@/assets/scss/_third-party/_bootstrap-4.scss";
            @import "@/assets/scss/_third-party/_normalize.scss";
            @import "@/assets/scss/_third-party/_sass-mq.scss";
            @import "@/assets/scss/_third-party/_sharepoint.scss";
            @import "@/assets/scss/style.scss";
          `,
      },
    },
  },
  
  publicPath: "./",
    // process.env.NODE_ENV === "production"
    //   ? "./"
  //   : "./",
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "public/Creative-UK.aspx",
      // output as dist/index.html
      filename: "Creative-UK.aspx",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Creative UK",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
};
