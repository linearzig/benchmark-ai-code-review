# AI Code Review Benchmark

## Python Benchmarks

Base branch: [`base-python`](https://github.com/linearzig/benchmark-ai-code-review/tree/base-python) cloned from <https://github.com/wsvincent/lithium>

- **Bug 01: Off-by-one error in a loop**
  - [LinearB: bug01-python-offbyone](https://github.com/linearzig/benchmark-ai-code-review/pull/8)
  - [CodeRabbit: bug01-python-offbyone-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/9)
  - [Qodo: add-email-prefix-checker-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/17)
  - [Graphite: add-email-prefix-retriever-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/33)
  - [GitHub Copilot: bug01-python-offbyone](https://github.com/linearzig/benchmark-ai-code-review/pull/1)

- **Bug 02: Incorrect use of a mutable default argument**
  - [LinearB: add-notes-to-homepage-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/44)
  - [CodeRabbit: add-note-feature-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/10)
  - [Qodo: add-note-taking-functionality-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/18)
  - [Graphite: add-notes-function-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/34)
  - [GitHub Copilot: add-notes-handler-github](https://github.com/linearzig/benchmark-ai-code-review/pull/26)

- **Bug 03: Nested conditional logic with unclear return paths**
  - [LinearB: add-score-query-endpoint-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/45)
  - [CodeRabbit: add-special-score-calc-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/11)
  - [Qodo: add-special-score-endpoint-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/19)
  - [Graphite: add-score-query-page-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/35)
  - [GitHub Copilot: add-special-score-calc-github](https://github.com/linearzig/benchmark-ai-code-review/pull/27)

- **Bug 04: Unsanitized user input passed to system call**
  - [LinearB: add-qa-test-runner-script-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/46)
  - [CodeRabbit: add-script-runner-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/12)
  - [Qodo: add-qa-testing-agent-support-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/20)
  - [Graphite: add-qa-script-runner-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/36)
  - [GitHub Copilot: add-dynamic-qa-test-script-runner-github](https://github.com/linearzig/benchmark-ai-code-review/pull/28)

## JavaScript Benchmarks

Base branch: [`base-js`](https://github.com/linearzig/benchmark-ai-code-review/tree/base-js) cloned from <https://github.com/sahat/hackathon-starter>

- **Bug 05: Unescaped user input injected into HTML without sanitization**
  - [LinearB: add-guestbook-feat-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/49)
  - [CodeRabbit: add-hackathon-guestbook-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/13)
  - [Qodo: add-guestbook-routes-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/21)
  - [Graphite: add-guestbook-feature-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/37)
  - [GitHub Copilot: add-guestbook-feature-github](https://github.com/linearzig/benchmark-ai-code-review/pull/29)

- **Bug 06: Incorrectly scoped closure inside loop**
  - [LinearB: add-contact-validation-tests-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/50)
  - [CodeRabbit: add-contact-form-tests-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/14)
  - [Qodo: improve-form-tests-for-contacts-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/22)
  - [Graphite: add-contact-form-tests-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/38)
  - [GitHub Copilot: add-contact-form-tests](https://github.com/linearzig/benchmark-ai-code-review/pull/30)

- **Bug 07: Inefficient object cloning using JSON.parse/stringify on non-JSON-safe data**
  - [LinearB: add-passport-serial-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/51)
  - [CodeRabbit: improve-passport-serializations-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/15)
  - [Qodo: improve-passport-serialization-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/23)
  - [Graphite: add-passport-serialization-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/39)
  - [GitHub Copilot: improve-passport-serialization-github](https://github.com/linearzig/benchmark-ai-code-review/pull/31)

- **Bug 08: Forgetting to return a value from an array map() call**
  - [LinearB: add-ai-social-graph-linearb](https://github.com/linearzig/benchmark-ai-code-review/pull/52)
  - [CodeRabbit: add-user-social-graph-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/pull/16)
  - [Qodo: add-social-graph-recs-qodo](https://github.com/linearzig/benchmark-ai-code-review/pull/24)
  - [Graphite: add-social-graph-recs-graphite](https://github.com/linearzig/benchmark-ai-code-review/pull/40)
  - [GitHub Copilot: add-social-graph-w-recs-github](https://github.com/linearzig/benchmark-ai-code-review/pull/32)
