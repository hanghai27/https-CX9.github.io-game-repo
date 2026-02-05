import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  {
    ignores: ["node_modules", ".next", "dist", "build", "out"]
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,

        React: "readonly",
        alert: "readonly"
      }
    },

    plugins: {
      "jsx-a11y": jsxA11y,
      "@typescript-eslint": tsPlugin
    },

    rules: {
      "react/react-in-jsx-scope": "off",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/control-has-associated-label": "warn"
    }
  },

  // Node / config files
  {
    files: ["vite.config.ts", "*.config.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: "readonly"
      }
    },
    rules: {
      "no-undef": "off"
    }
  }
];