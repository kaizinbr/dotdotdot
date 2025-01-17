const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    safelist: ["ProseMirror"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                gelica: ["Gelica", ...defaultTheme.fontFamily.serif],
            },
            colors: {
                black: "#474E53",
                "black-real": "#000000",
                "c-blue": "#3098E1",
                "c-gray": "#8D959B",
                "c-green": "#25CE68",
                "c-orange": "#EB8D48",
                "c-purple": "#9D44C7",
                "c-red": "#E13065",
                "c-yellow": "#F3C522",
                "gray-50": "#EEF4F8",
                "gray-100": "#E5EDF2",
                "gray-200": "#CDDAE4",
                "gray-300": "#C0CCD6",
                "gray-400": "#A6B2BB",
                "gray-500": "#8D959B",
                "primary-100": "#EDF7FF",
                "primary-200": "#D1ECFF",
                "primary-300": "#B4DBF8",
                "primary-400": "#72BBEE",
                "primary-500": "#3098E1",
                transparent: "transparent",
                white: "#FFFFFF",
                main: {
                    50: "#f1f5fc",
                    100: "#e6ebf9",
                    200: "#d2dbf3",
                    300: "#b7c3ea",
                    400: "#99a4e0",
                    500: "#8087d4",
                    600: "#6d6dc7",
                    700: "#5756ac",
                    800: "#48488b",
                    900: "#3f4070",
                    950: "#252541",
                },
                matisse: {
                    50: "#f3f7fc",
                    100: "#e7eef7",
                    200: "#c9dbee",
                    300: "#99bde0",
                    400: "#639ccd",
                    500: "#3f7fb8",
                    600: "#2c6095",
                    700: "#26517e",
                    800: "#234569",
                    900: "#223b58",
                    950: "#16263b",
                },

                "blue-chalk": {
                    50: "#faf5ff",
                    100: "#f6edff",
                    200: "#ead5ff",
                    300: "#dab4fe",
                    400: "#c384fc",
                    500: "#ac55f7",
                    600: "#9733ea",
                    700: "#8222ce",
                    800: "#6e21a8",
                    900: "#5a1c87",
                    950: "#3d0764",
                },

                woodsmoke: {
                    50: "#f6f6f6",
                    100: "#e7e7e7",
                    200: "#d1d1d1",
                    300: "#9C9C9C",
                    400: "#888888",
                    500: "#6A6A6A",
                    550: "#5B5B5B",
                    600: "#383838",
                    700: "#282828",
                    800: "#181818",
                    900: "#0c0c0c",
                    950: "#080808",
                },
                flamingo: {
                    50: "#fff3ed",
                    100: "#ffe3d4",
                    200: "#ffc2a8",
                    300: "#ff9871",
                    400: "#ff5427",
                    500: "#fe3911",
                    600: "#ef1f07",
                    700: "#c61108",
                    800: "#9d110f",
                    900: "#7e1110",
                    950: "#440608",
                },
                fantasy: {
                    50: "#faf3f0",
                    100: "#f8ede8",
                    200: "#f3ded5",
                    300: "#eac6b7",
                    400: "#dca58d",
                    500: "#cb8668",
                    600: "#b66c4c",
                    700: "#98583d",
                    800: "#7f4b35",
                    900: "#6b4231",
                    950: "#392016",
                },
                sandybrown: {
                    50: "#fef7ee",
                    100: "#fdeed7",
                    200: "#fad9ae",
                    300: "#f7bd7a",
                    400: "#f4a259",
                    500: "#ef7920",
                    600: "#e05f16",
                    700: "#ba4714",
                    800: "#943a18",
                    900: "#773117",
                    950: "#40160a",
                },
            },
            aspectRatio: {
                auto: "auto",
                shorts: "8.95/16",
                "shorts-full": "9/16",
                square: "1/1",
                video: "16/8.95",
                "video-full": "16/9",
            },
            borderRadius: {
                0: "0px",
                4: "4px",
                8: "8px",
                16: "16px",
                full: "9999px",
            },
            borderWidth: {
                1: "1px",
                2: "2px",
                3: "3px",
                defaultB: "3.5px",
            },
            boxShadow: {
                primary: "0px 4px 4px 0px rgba(70, 167, 235, 0.30)",
                "primary-slated": "0px 4px 8px 4px rgba(173, 210, 236, 0.28)",
            },
            extend: {
                animation: {
                    fade: "fadeIn 0.5s",
                },
                backgroundImage: {
                    "gradient-gray":
                        "linear-gradient(90deg, #8D959B 0%, #A8B8C3 100%)",
                    "gradient-green":
                        "linear-gradient(90deg, #25CE68 0%, #4AE588 100%)",
                    "gradient-orange":
                        "linear-gradient(90deg, #EB8D48 0%, #EBA776 100%)",
                    "gradient-primary":
                        "linear-gradient(90deg, #3098E1 0%, #5EB6F5 100%)",
                    "gradient-purple":
                        "linear-gradient(90deg, #9D44C7 0%, #C965F8 100%)",
                    "gradient-red":
                        "linear-gradient(90deg, #E13065 0%, #FA85A8 100%)",
                    "gradient-yellow":
                        "linear-gradient(90deg, #F3C522 0%, #FFD84F 100%)",
                },
                keyframes: {
                    fadeIn: {
                        from: { opacity: "0" },
                        to: { opacity: "1" },
                    },
                },
                screens: {
                    lgx: "1072px",
                    pointer: {
                        raw: "(hover: hover) and (pointer: fine)",
                    },
                    xlgx: "1328px",
                },
            },
            fontSize: {
                12: ["12px", "14px"],
                14: ["14px", "17px"],
                16: ["16px", "19px"],
                18: ["18px", "21px"],
                20: ["20px", "24px"],
                22: ["22px", "26px"],
                24: ["24px", "29px"],
                28: ["28px", "33px"],
                32: ["32px", "38px"],
                36: ["36px", "43px"],
            },
            fontWeight: {
                400: "400",
                500: "500",
                600: "600",
                700: "700",
            },
            spacing: {
                "artistic-header-expanded-width-lg": "calc(100% - 48px)",
                "artistic-header-height-lg": "68px",
                "artistic-header-height-md": "76px",
                "details-header-height": "56px",
                "body-content": "632px",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
