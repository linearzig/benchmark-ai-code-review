# AI Code Review Benchmark

## Python Benchmarks

Base branch: [`base-python`](https://github.com/linearzig/benchmark-ai-code-review/tree/base-python) cloned from <https://github.com/wsvincent/lithium>

- **Bug 01: Off-by-one error in a loop**
  - [LinearB: bug01-python-offbyone](https://github.com/linearzig/benchmark-ai-code-review/tree/bug01-python-offbyone)
  - [CodeRabbit: bug01-python-offbyone-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/bug01-python-offbyone-coderabbit)
  - [Qodo: add-email-prefix-checker-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/add-email-prefix-checker-qodo)
  - [Graphite: add-email-prefix-retriever-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-email-prefix-retriever-graphite)
  - [GitHub Copilot: bug01-python-offbyone](https://github.com/linearzig/benchmark-ai-code-review/tree/bug01-python-offbyone)

- **Bug 02: Incorrect use of a mutable default argument**
  - [LinearB: add-notes-to-homepage-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-notes-to-homepage-linearb)
  - [CodeRabbit: add-note-feature-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/add-note-feature-coderabbit)
  - [Qodo: add-note-taking-functionality-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/add-note-taking-functionality-qodo)
  - [Graphite: add-notes-function-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-notes-function-graphite)
  - [GitHub Copilot: add-notes-handler-github](https://github.com/linearzig/benchmark-ai-code-review/tree/add-notes-handler-github)

- **Bug 03: Nested conditional logic with unclear return paths**
  - [LinearB: add-score-query-endpoint-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-score-query-endpoint-linearb)
  - [CodeRabbit: add-special-score-calc-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/add-special-score-calc-coderabbit)
  - [Qodo: add-special-score-endpoint-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/add-special-score-endpoint-qodo)
  - [Graphite: add-score-query-page-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-score-query-page-graphite)
  - [GitHub Copilot: add-special-score-calc-github](https://github.com/linearzig/benchmark-ai-code-review/tree/add-special-score-calc-github)

- **Bug 04: Unsanitized user input passed to system call**
  - [LinearB: add-qa-test-runner-script-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-qa-test-runner-script-linearb)
  - [CodeRabbit: add-script-runner-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/add-script-runner-coderabbit)
  - [Qodo: add-qa-testing-agent-support-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/add-qa-testing-agent-support-qodo)
  - [Graphite: add-qa-script-runner-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-qa-script-runner-graphite)
  - [GitHub Copilot: add-dynamic-qa-test-script-runner-github](https://github.com/linearzig/benchmark-ai-code-review/tree/add-dynamic-qa-test-script-runner-github)

## JavaScript Benchmarks

Base branch: [`base-js`](https://github.com/linearzig/benchmark-ai-code-review/tree/base-js) cloned from <https://github.com/sahat/hackathon-starter>

- **Bug 05: Unescaped user input injected into HTML without sanitization**
  - [LinearB: add-guestbook-feat-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-guestbook-feat-linearb)
  - [CodeRabbit: add-hackathon-guestbook-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/add-hackathon-guestbook-coderabbit)
  - [Qodo: add-guestbook-routes-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/add-guestbook-routes-qodo)
  - [Graphite: add-guestbook-feature-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-guestbook-feature-graphite)
  - [GitHub Copilot: add-guestbook-feature-github](https://github.com/linearzig/benchmark-ai-code-review/tree/add-guestbook-feature-github)

- **Bug 06: Incorrectly scoped closure inside loop**
  - [LinearB: add-contact-validation-tests-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-contact-validation-tests-linearb)
  - [CodeRabbit: add-contact-form-tests-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/add-contact-form-tests-coderabbit)
  - [Qodo: improve-form-tests-for-contacts-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/improve-form-tests-for-contacts-qodo)
  - [Graphite: add-contact-form-tests-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-contact-form-tests-graphite)
  - [GitHub Copilot: add-contact-form-tests](https://github.com/linearzig/benchmark-ai-code-review/tree/add-contact-form-tests)

- **Bug 07: Inefficient object cloning using JSON.parse/stringify on non-JSON-safe data**
  - [LinearB: add-passport-serial-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-passport-serial-linearb)
  - [CodeRabbit: improve-passport-serializations-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/improve-passport-serializations-coderabbit)
  - [Qodo: improve-passport-serialization-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/improve-passport-serialization-qodo)
  - [Graphite: add-passport-serialization-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-passport-serialization-graphite)
  - [GitHub Copilot: improve-passport-serialization-github](https://github.com/linearzig/benchmark-ai-code-review/tree/improve-passport-serialization-github)

- **Bug 08: Forgetting to return a value from an array map() call**
  - [LinearB: add-ai-social-graph-linearb](https://github.com/linearzig/benchmark-ai-code-review/tree/add-ai-social-graph-linearb)
  - [CodeRabbit: add-user-social-graph-coderabbit](https://github.com/linearzig/benchmark-ai-code-review/tree/add-user-social-graph-coderabbit)
  - [Qodo: add-social-graph-recs-qodo](https://github.com/linearzig/benchmark-ai-code-review/tree/add-social-graph-recs-qodo)
  - [Graphite: add-social-graph-recs-graphite](https://github.com/linearzig/benchmark-ai-code-review/tree/add-social-graph-recs-graphite)
  - [GitHub Copilot: add-social-graph-w-recs-github](https://github.com/linearzig/benchmark-ai-code-review/tree/add-social-graph-w-recs-github)
