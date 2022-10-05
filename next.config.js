/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  onDemandEntries: {
    maxInactiveAge: 24 * 60 * 1000,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    /** {@ next-with-less @} */
    let sassModuleRule;
    let sassGlobalRule;
    const addLessToRegExp = (rx) =>
      new RegExp(rx.source.replace("|sass", "|sass|less"), rx.flags);
    const isNextSpecialCSSRule = (rule) =>
      rule[Symbol.for("__next_css_remove")];
    const cssRule = config.module.rules.find((rule) =>
      rule.oneOf?.find(isNextSpecialCSSRule)
    );
    const addLessToRuleTest = (test) => {
      if (Array.isArray(test)) {
        return test.map(addLessToRegExp);
      } else {
        return addLessToRegExp(test);
      }
    };

    cssRule.oneOf.forEach((rule) => {
      if (rule.options?.__next_css_remove) return;
      if (rule.use?.loader === "error-loader") {
        rule.test = addLessToRuleTest(rule.test);
      } else if (rule.type === "asset/resource") {
        rule.issuer = addLessToRuleTest(rule.issuer);
      } else if (rule.use?.includes?.("ignore-loader")) {
        rule.test = addLessToRuleTest(rule.test);
      } else if (rule.test?.source === "\\.module\\.(scss|sass)$") {
        sassModuleRule = rule;
      } else if (rule.test?.source === "(?<!\\.module)\\.(scss|sass)$") {
        sassGlobalRule = rule;
      }
    });

    let lessModuleRule = sassModuleRule;
    const configureLessRule = (rule) => {
      rule.test = new RegExp(rule.test.source.replace("(scss|sass)", "less"));
      rule.use.splice(-1, 1, {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      });
    };

    configureLessRule(lessModuleRule);
    cssRule.oneOf.splice(
      cssRule.oneOf.indexOf(sassModuleRule) + 1,
      0,
      lessModuleRule
    );

    if (sassGlobalRule) {
      let lessGlobalRule = sassGlobalRule;
      configureLessRule(lessGlobalRule);
      cssRule.oneOf.splice(
        cssRule.oneOf.indexOf(sassGlobalRule) + 1,
        0,
        lessGlobalRule
      );
    }

    return config;
  },
};
