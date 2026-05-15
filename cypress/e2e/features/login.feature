Feature: Authentication
  As a registered customer
  I want to log into Practice Software Testing
  So that I can access my account

  Background:
    Given I open the Practice Software Testing home page

  Scenario: Valid login succeeds and lands on My account
    When I sign in with valid credentials
    Then I should land on the My account page

  Scenario: Invalid login shows an error message
    When I sign in with invalid credentials
    Then I should see a login error
