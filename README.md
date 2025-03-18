# TicTacToe

## Concepts and Design Patterns that I want to implement in my code:

- Factory Function as a design patterbn | Object shorthand, Destructuring
- Prototypical inheritance (with Factory Function) | Extending
- Immediately Invoked Function Expressioin (IIFE) - *for code that will be only used once*
- Module

## Ground Rules
- Self-contained module
    - everything to do with my module is in my module
    - no global variables
    - if a module manages more than one thing it should be split up
- separation of concerns
- DRY code: Don't Repeat Yourself
- efficient DOM usage
- very few query selector
- no memory leaks
- all events can be unbound

## Initial Plan - Iteration 1

Factory function to create objects:  Player -> (Player1, Player2), Cells

module: 
{
Gameboard object contains gameboard array (which is a 2D array) which is also private, modify cell value, print board

GameController object to control the state of the game, keep track of turns, announce winner/loser or tie, play round

Cell factory to create cell instances (9) that have states that change on player moves

Create Player factory and extend it to create HumanPlayer and ComputerPlayer factory. Implement prototypical inheritence. Private variable...
HumanPlayer object should have a method prompt player for next move (X or O) | getmove()
ComputerPlayer object  should have the logic to generate move based on Gameboard situation | generatemove()

}

PLACEHOLDER TEXT
