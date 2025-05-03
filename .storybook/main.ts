import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "storybook-addon-pseudo-states",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: ["../msw"],

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
