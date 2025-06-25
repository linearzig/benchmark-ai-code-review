# AI Code Review Benchmark

## Python Benchmarks

Base branch: [`base-python`](https://github.com/linearzig/benchmark-ai-code-review/tree/base-python) cloned from <https://github.com/wsvincent/lithium>

- **Bug 01: Off-by-one error in a loop**
  - [LinearB: bug01-python-offbyone-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/bug01-python-offbyone-linearb)
- **Bug 02: Incorrect use of a mutable default argument**
  - LinearB: bug02-python-mutabledefault-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug02-python-mutabledefault-linearb)
- **Bug 03: Nested conditional logic with unclear return paths**
  - LinearB: bug03-python-nestedlogic-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug03-python-nestedlogic-linearb)
- **Bug 04: Unsanitized user input passed to system call**
  - LinearB: bug04-python-unsafesystem-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug04-python-unsafesystem-linearb)

## JavaScript Benchmarks

Base branch: [`base-js`](https://github.com/linearzig/benchmark-ai-code-review/tree/base-js) cloned from <https://github.com/sahat/hackathon-starter>

- **Bug 05: Unescaped user input injected into HTML without sanitization**
  - LinearB: bug05-js-unescapedhtml-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug05-js-unescapedhtml-linearb)
- **Bug 06: Incorrectly scoped closure inside loop**
  - LinearB: bug06-js-badclosure-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug06-js-badclosure-linearb)
- **Bug 07: Inefficient object cloning using JSON.parse/stringify on non-JSON-safe data**
  - LinearB: bug07-js-slowclone-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug07-js-slowclone-linearb)
- **Bug 08: Forgetting to return a value from an array map() call**
  - LinearB: bug08-js-mapnoreturn-linearb[](https://github.com/linearzig/benchmark-ai-code-review/tree/bug08-js-mapnoreturn-linearb)
