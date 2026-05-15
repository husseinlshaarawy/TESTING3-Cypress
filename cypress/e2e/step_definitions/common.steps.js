import { Given } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../pages/HomePage'

Given('I open the Practice Software Testing home page', () => {
  HomePage.visit()
  HomePage.assertLoaded()
})
