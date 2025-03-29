import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend:{
            keyframes: {
                infinite_scroll: {
                    "100%" : {transform: "translate(calc(-50% - 0.25rem))"},
                },
            },
            animation: { infinite_scroll: "infinite_scroll 20s linear infinite" },
        },
    },
    plugins: [],
};

export default config;