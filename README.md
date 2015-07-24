# Tic Tac Toe
This is a React based implementation of a simple Tic Tac Toe game between a human player and a computer player. Either player can start and the computer implements a simple algorithm to ensure the player never wins. 

## Installation
First clone the repository
```
git clone https://github.com/pierretasci/tictactoe
```
Next you will need to install all of the dependencies of the app
```
npm install
```
Currently, the app doesn't have any production deployment cycle but a simple run of the gulp file will yield a browsersync with the full app. If you don't have gulp installed, make sure to do that first.
```
sudo npm install -g gulp
gulp
```

## User Guide
When the page first loads it will prompt you to start a game. You will then be able to choose whether you would like to go first or if you want the computer to go first.

If you select the computer it will immediately start processing its first move. A loading screen will be shown while it decides. As soon as the computer makes its move, you can make yours. Hovering over an open square will show where you can put your pieces. The human will always be the X player and the computer the O player. 

When the game is over, you will no longer be allowed to place a piece. There is no direct indication that the game is over but it is fairly obvious from the board. 

To start again, click play again and then select who goes first.

## Technology
There are some important aspects of this app that control the significant part of the logic. We will start with the models. We have a simple move model which just stores a row, column, and player association. The more important model is a board. In addition to storing the board as a flat array, and providing simple getters and setters into it, the board model also provides some convenience methods. 

For example, the ```getPossibleMovesForPlayer``` method will return all of the possible moves for that player. The ```getGameWinner``` method will return if the game is over and who won. All of the methods are tested in the __tests__ directory using Jest.

There is only one store in the game that is reponsible for all the game state. In this game, the only game state is the current board. That is what the store maintains. This store is also tested.

The last and most important piece of logic is stored in the game manager. The game manager is solely responsible for transformations on the board. The minMax algorithm is the meat. It uses a simple miniMax calculation to maximize the computer's score and minimize the player's score. 
**This algorithm is not my own. It is borrowed from: http://neverstopbuilding.com/minimax**

## Running the unit tests
Simply run jest on the main directory
```
jest
```

## Final Note
As much as I would like to take credit for how beautiful this tic tac toe game I must give 100% of the credit to my lovely girlfriend who saw my initial implementation (which wasn't horrible looking and was responsive) and decided she wanted to make it better. She gave me a design and I refactored to it.
