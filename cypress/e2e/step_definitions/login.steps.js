import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import AccountPage from '../../pages/AccountPage'

When('I sign in with valid credentials', () => {
  cy.fixture('data').then((data) => {
    HomePage.goToSignIn()
    LoginPage.login(data.user.email, data.user.password)
  })
})

When('I sign in with invalid credentials', () => {
  cy.fixture('data').then((data) => {
    HomePage.goToSignIn()
    LoginPage.login(data.invalidUser.email, data.invalidUser.password)
  })
})

Then('I should land on the My account page', () => {
  AccountPage.assertLoggedIn()
})

Then('I should see a login error', () => {
  LoginPage.assertLoginError()
})
