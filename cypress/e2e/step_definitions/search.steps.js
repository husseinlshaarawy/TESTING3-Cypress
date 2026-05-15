import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../pages/HomePage'

When('I search for {string}', (term) => {
  HomePage.search(term)
})

Then('I should see {string} in the results', (term) => {
  HomePage.assertProductInResults(term)
})

Then('I should see a no-results indication', () => {
  cy.get('body').should(($b) => {
    expect($b.text().toLowerCase()).to.match(/no products|no results|0 products/)
  })
})
