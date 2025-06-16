// eslint.config.js
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
            "no-console": "warn",
            "prefer-const": "error",
            "semi": ["error", "always"]
        }
    },
    {
        ignores: ["dist/**", "node_modules/**", "**/*.d.ts"]
    }
];