Feature: Shopping cart
  As a shopper
  I want to add and manage items in my cart
  So that I can review and check out

  Background:
    Given I open the Practice Software Testing home page

  Scenario: Adding a product updates the cart badge
    When I search for "Hammer"
    And I open the product "Hammer"
    And I add the product to the cart
    Then the cart badge should show "1"

  Scenario: Proceeding to checkout from the cart
    When I search for "Hammer"
    And I open the product "Hammer"
    And I add the product to the cart
    And I open the cart
    And I proceed to checkout
    Then the URL should include "checkout"
