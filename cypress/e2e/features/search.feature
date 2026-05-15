Feature: Product search
  As a visitor
  I want to search for products
  So that I can quickly find the items I need

  Background:
    Given I open the Practice Software Testing home page

  Scenario Outline: Searching for a product returns matching results
    When I search for "<term>"
    Then I should see "<term>" in the results

    Examples:
      | term     |
      | Hammer   |
      | Pliers   |

  Scenario: Searching for a non-existent product yields no results
    When I search for "ZZZZZNotARealProduct"
    Then I should see a no-results indication
