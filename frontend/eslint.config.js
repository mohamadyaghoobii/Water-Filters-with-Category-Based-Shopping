import someConfig from "some-other-config-you-use";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  someConfig,
  eslintConfigPrettier,
];

{
    "extends": [
      "some-other-config-you-use",
      "prettier"
    ]
  }