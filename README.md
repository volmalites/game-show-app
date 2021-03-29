# game-show-app
Word guessing game, select a random hidden phrase, which a player tries to guess.

## Getting Started

Pure front end project that can be downloaded and opened in any web browser.

### Additional features

Dynamic background

```
The background updates based upon the lives (tries) left in the games, the fewer left the more red it becomes. Starting color is blueish. Colors transition by CSS transition, animated.
```

Informative messages

```
The messages update on screen informing the player about their interaction with the game.
```

Game does not immediately quit after the player loses

```
Once all lives are removed, a setTimeout() function is instantiated for 2 seconds in order to allow for the animation to turn the screen red and to properly display all lives as removed.
```

## Authors

* **Bjorn Lottering** - [Volmalites](https://github.com/volmalites)
