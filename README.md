# Playwright E2E & API Automation Framework

[![Playwright E2E & API CI](https://github.com/freakARJ/playwright-e2e-api-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/freakARJ/playwright-e2e-api-framework/actions/workflows/playwright.yml)

Cross-browser **End-to-End (E2E)** and **HTTP/API** test automation framework built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** pattern.

**Target Application:** [arjawad.vercel.app/playground.html](https://arjawad.vercel.app/playground.html)

---

## Key Capabilities Covered

- **Page Object Model (POM):** Clean separation between page locators/actions (`pages/`) and test specifications (`tests/`).
- **E2E UI Scenarios:**
  - Form inputs, radio/checkbox groups, password visibility toggle, and in-memory file upload.
  - Native `<select>` dropdowns and custom ARIA searchable comboboxes.
  - Mouse interactions: double-click, right-click (`contextmenu`), hover tooltips, and drag-and-drop.
  - Complex DOM: sortable & paginated data tables, `iframe` (`frameLocator`), open Shadow DOM piercing, and accessible modals (`role="dialog"`).
  - Browser native dialogs (`alert`, `confirm`, `prompt`), multi-tab/popup handling, and async state auto-waiting.
- **API & Contract Testing:** HTTP status, content-type headers, asset integrity, 404 handling, and response-time SLA assertions via Playwright `APIRequestContext`.
- **CI/CD Pipeline:** Automated cross-browser matrix (`Chromium`, `Firefox`, `WebKit`) via **GitHub Actions** on every push, PR, manual trigger, and weekly schedule, with HTML test report artifacts.

## Tech Stack

- **Test Runner:** Playwright Test (`@playwright/test`)
- **Language:** TypeScript
- **Architecture:** Page Object Model (POM)
- **CI/CD:** GitHub Actions

## Local Setup

```bash
git clone https://github.com/freakARJ/playwright-e2e-api-framework.git
cd playwright-e2e-api-framework
npm ci
npx playwright install --with-deps