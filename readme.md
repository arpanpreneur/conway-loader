# Conway Loader

This is a project that helps you spice up your loaders using the famous Game of Life. It is built as a tribute to John Horton Conway. You can use it in your app, or just play around with it for exploring Game of Life.

## How to Use

#### Install it using NPM

`npm install conway-loader`

#### Use it

```
// Import it depending on you build environemnt

import './styles/general.scss';
import conwayLoader from 'conway-loader';

// Or

const conwayLoader = require('conway-loader');

// Should Work the following way

window.loader = conwayLoader.createLoader({
    rootNode: document.getElementById("root"),
    size: 50,
    animationDelay: 500,
    randomColor: true,
    initialBoard: conwayLoader.presets.blink()
 });
 
 window.loader.render();
 window.loader.start();
```

You can have precise control over the resolution by using the height, width, cellSize paramaters instead of the size paramater. However presets are / will be designed to work with resolution of 10x10 matrices only. Please note that making high resolution loaders may result in high CPU load as the Game of Life computation is CPU-intensive in the order of O(n^m), where n is the number of rows and m is the number of columns in the grid.

#### How to stop / suspend the loader

`window.loader.stop();`

### How to Contribute

Any positive modifications including performance fixes are welcome. This project will be much more interesting if presets are contributed for the well known Conway Seeds.
