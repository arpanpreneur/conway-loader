# Conway Loader

This is a project that helps you spice up your loaders using the famous Game of Life. It is built as a tribute to John Horton Conway. You can use it in your app, or just play around with it for exploring Game of Life.

## How to Use

#### Install it using NPM

`npm install conway-loader`

### Build Loaders using our Conway Loader Builder


![](assets/20221115_055235_builder_screenshot.jpeg)

Access it here: [https://ArpanKIIT2017.github.io/conway-loader-builder](https://)

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
    initialBoard: conwayLoader.presets.blink(),
    loopPattern: false, // If your pattern is oscillatory by default
 });
 
 window.loader.render();
 window.loader.start();
```

#### Following are the Presets (Raise PR to add more)

* beauty
* blink
* blinkyFace
* quadpole
* styleSpin

These presets are basically starting states of the GoL algorithm. These are specifically chosen because of their oscillatory behaviour (turing machine never halts), looks good for loader purposes.

You can have precise control over the resolution by using the height, width, cellSizeR, cellSizeC paramaters. If you provide a initialBoard (presets are matrices passed to this) then you don't need to specify cellSizeR and cellSizeC, it will be autocalculated. Please note that making high resolution loaders may result in high CPU load as the Game of Life computation is CPU-intensive in the order of O(n^m), where n is the number of rows and m is the number of columns in the grid.

#### How to stop / suspend the loader

`window.loader.stop();`

### How to Contribute

Any positive modifications including performance fixes are welcome. This project will be much more interesting if presets are contributed for the well known Conway Seeds.
