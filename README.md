# Practice Software Testing — Cypress Project

End-to-end test suite for https://practicesoftwaretesting.com/ covering 15 functional test cases plus a parallel BDD layer.

## Mapping to the grading rubric

| Requirement | Where it lives |
|---|---|
| **Fixtures, Assertions, Custom Commands [10]** | [cypress/fixtures/data.json](cypress/fixtures/data.json), [cypress/support/commands.js](cypress/support/commands.js), per-test `should()` assertions in [cypress/e2e/project.cy.js](cypress/e2e/project.cy.js) |
| **GitHub + CI/CD pipelines [10]** | [.github/workflows/cypress.yml](.github/workflows/cypress.yml) (runs both POM spec and BDD features on push/PR) |
| **Page Object Modeling [25]** | [cypress/pages/](cypress/pages/) — `HomePage`, `LoginPage`, `ProductPage`, `CartPage`, `AccountPage`; consumed by [cypress/e2e/project.cy.js](cypress/e2e/project.cy.js) |
| **BDD Cucumber [25]** | [cypress/e2e/features/](cypress/e2e/features/) (`*.feature`), [cypress/e2e/step_definitions/](cypress/e2e/step_definitions/), config in [.cypress-cucumber-preprocessorrc.json](.cypress-cucumber-preprocessorrc.json) and [cypress.config.js](cypress.config.js) |

## Install

```bash
npm install
```

## Run

```bash
npm run cy:open       # interactive
npm run test:e2e      # POM spec only
npm run test:bdd      # BDD feature files only
npm test              # everything
```

## Project layout

```
.
|-- .github/workflows/cypress.yml
|-- .cypress-cucumber-preprocessorrc.json
|-- cypress.config.js
|-- cypress/
|   |-- e2e/
|   |   |-- project.cy.js              # 15 POM-driven test cases
|   |   |-- features/                  # *.feature files (Gherkin)
|   |   `-- step_definitions/          # cucumber step defs
|   |-- pages/                         # Page Object Models
|   |-- fixtures/data.json
|   `-- support/
|       |-- commands.js                # custom commands
|       `-- e2e.js
`-- package.json
```

## The 15 test cases (POM spec)

TC1  Homepage loads
TC2  Valid login
TC3  Invalid login
TC4  Search returns matches
TC5  Open product detail
TC6  Add to cart updates badge
TC7  Open cart from navbar
TC8  Remove item empties cart
TC9  Increase quantity reflects in badge
TC10 Logout returns to login
TC11 Sign-in link navigates to login
TC12 Product list rendered on home
TC13 Search with no results
TC14 Page contains catalog text
TC15 Proceed to checkout
