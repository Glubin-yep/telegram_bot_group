import tsESLint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        plugins: {
            "@typescript-eslint": tsESLint
        },
        languageOptions: {
            globals: {
                process: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                module: "readonly",
                require: "readonly",
                console: "readonly",
            },
            parser: tsParser,
            parserOptions: {
                project: true,
                sourceType: "module"
            }
        },
        rules: {
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "@typescript-eslint/no-empty-function": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "no-console": "off",
            "prefer-const": "error",
            "semi": ["error", "always"]

        }
    },
    {
        ignores: ["dist/**", "node_modules/**", "**/*.d.ts"]
    }
];
