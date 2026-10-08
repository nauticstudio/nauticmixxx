import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const template = await readFile(
  new URL("../index.html", import.meta.url),
  "utf8",
);
const script = template.match(
  /<script id="platform-detection">([\s\S]*?)<\/script>/,
)?.[1];
assert.ok(
  script,
  "Operating system detection must run before the page is rendered.",
);

const cases = [
  [
    "Mac Safari",
    {
      platform: "MacIntel",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      maxTouchPoints: 0,
    },
    "mac",
  ],
  [
    "Windows Firefox",
    {
      platform: "Win32",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    "windows",
  ],
  [
    "Windows Client Hints",
    { userAgentData: { platform: "Windows", mobile: false } },
    "windows",
  ],
  [
    "macOS Client Hints",
    { userAgentData: { platform: "macOS", mobile: false } },
    "mac",
  ],
  [
    "User-agent fallback",
    { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    "windows",
  ],
  [
    "iPad with desktop Mac identity",
    {
      platform: "MacIntel",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)",
      maxTouchPoints: 5,
    },
    "other",
  ],
  [
    "iPhone",
    {
      platform: "iPhone",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)",
    },
    "other",
  ],
  [
    "Android",
    {
      platform: "Linux armv8l",
      userAgent: "Mozilla/5.0 (Linux; Android 15)",
      userAgentData: { platform: "Android", mobile: true },
    },
    "other",
  ],
  [
    "Linux desktop",
    { platform: "Linux x86_64", userAgent: "Mozilla/5.0 (X11; Linux x86_64)" },
    "other",
  ],
  ["Unknown browser", {}, "other"],
];
for (const [name, navigator, expected] of cases) {
  test(name, () => {
    const document = { documentElement: { dataset: {} } };
    runInNewContext(script, { navigator, document });
    assert.equal(document.documentElement.dataset.desktopOs, expected);
  });
}
