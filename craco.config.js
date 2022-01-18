const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#121958",
              "@white": "#ffffff",
              "@link-color": "#111111", // link color
              "@success-color": "#eb516d", // success state color
              "@warning-color": "#faad14", // warning state color
              "@error-color": "#d8d8d8", // error state color
              "@font-size-base": "14px", // major text font size
              "@heading-color": "#121958", // heading text color
              "@text-color": "#111111", // major text color
              // @text-color-secondary: "#ffffff"f, // secondary text color
              "@disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
              "@border-radius-base": "4px", // major border radius
              "@border-color-base": "#d9d9d9", // major border color
              "@box-shadow-base":
                "0 3px 6px -4px rgba(0, 0, 0, 0.12) 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", // major shadow for layers
              "@pink-base": "#eb516d",
              "@font-english": '"Roboto", sans-serif',
              "@font-japanese": "Noto Sans CJK JP",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
