module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },

        fontFamily: {
            bungee: ["BungeeShade-Regular", "sans-serif"],
        },
    },
    plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
    daisyui: {
        themes: [ 
        {
        light: {
          primary: "#c527d8",           // PURPLE - Main color
          "primary-focus": "#9425a2",   // PURPLE Hover
          neutral: "#000000",           // BLACK - close button and header 
          success: "#54A547",           // GREEN
          warning: "#F8E155",           // YELLOW 
          error: "#EB4747",             // RED 
          "neutral-content": "#F2F3F4", // GRAY (BADGE)
          "base-100": "#FFFFFF",        // WHITE
          "base-200": "#F2F3F4"  ,      // GRAY (Bg)
          "base-300": "#AAAAAA",        // DARK GRAY(For badges on GRAY)
        },
        },
        ],
    },
};
