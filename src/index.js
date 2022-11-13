import "./styles/general.scss";
import ConwayGame from "./conwayGame";
import presets from "./presets";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_CELL_SIZE = 10;
const DEFAULT_LOADER_HEIGHT = 50;
const DEFAULT_LOADER_WIDTH = 50;
const DEFAULT_ALIVE_COLOR = "#000000";
const DEFAULT_DEAD_COLOR = "#ffffff";
const DEFAULT_ANIMATION_DELAY = 0.5; // millis

function createLoader({
  size,
  height,
  width,
  cellSize,
  initialBoard,
  aliveColor,
  deadColor,
  randomColor,
  animationDelay,
  rootNode,
}) {
  height = height ?? DEFAULT_LOADER_HEIGHT;
  width = width ?? DEFAULT_LOADER_WIDTH;
  cellSize = cellSize ?? DEFAULT_CELL_SIZE;
  aliveColor = aliveColor ?? DEFAULT_ALIVE_COLOR;
  deadColor = deadColor ?? DEFAULT_DEAD_COLOR;
  animationDelay = animationDelay ?? DEFAULT_ANIMATION_DELAY;

  if (randomColor) {
    deadColor = DEFAULT_DEAD_COLOR;
  }

  if (size) {
    height = size;
    width = size;
    cellSize = size / 10;
  }

  const maxRows = height / cellSize;
  const maxCols = width / cellSize;

  const loaderPrefix = uuidv4();

  const svgGrid = makeSvgGrid(height, width, cellSize, loaderPrefix, deadColor);
  const conwayGame = new ConwayGame(maxRows, maxCols, initialBoard, (row, col, val) => {
    paintCell(row, col, val, aliveColor, deadColor, randomColor, loaderPrefix);
  });

  return {
    svgGrid,
    loaderPrefix,
    animationTick: null,
    isRendered: false,

    start: function () {
      if (!this.isRendered) {
        throw 'Called loader start without rendering loader';
      }

      conwayGame.init();
      this.animationTick = startAnimation(
        loaderPrefix,
        conwayGame,
        maxRows,
        maxCols,
        aliveColor,
        deadColor,
        randomColor,
        animationDelay
      );
    },
    stop: function () {
      if (this.animationTick !== null) {
        window.clearInterval(this.animationTick);
      }
    },
    render: function () {
      rootNode.innerHTML = "";
      rootNode.appendChild(svgGrid);
      this.isRendered = true;
    },
  };
}

function startAnimation(
  loaderPrefix,
  conwayGame,
  maxRows,
  maxCols,
  aliveColor,
  deadColor,
  randomColor,
  animationDelay
) {
  return setInterval(() => {
    //paintGrid(loaderPrefix, conwayGame, maxRows, maxCols, aliveColor, deadColor, randomColor);
    conwayGame.next();
  }, animationDelay);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

function paintCell(row, col, value, aliveColor, deadColor, randomColor, loaderPrefix) {
    const cellNode = document.getElementById(`${loaderPrefix}-${row}-${col}`);
    // if (!cellNode) return;

    if (value === 1) {
        cellNode.setAttribute("fill", randomColor ? generateRandomColor() : aliveColor);
      } else {
        cellNode.setAttribute("fill", deadColor);
      }
}

function paintGrid(loaderPrefix, conwayGame, maxRows, maxCols, aliveColor, deadColor, randomColor) {
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const cellNode = document.getElementById(`${loaderPrefix}-${row}-${col}`);
      if (conwayGame.getCurrentCellValue(row, col) === 1) {
        cellNode.setAttribute("fill", randomColor ? generateRandomColor() : aliveColor);
      } else {
        cellNode.setAttribute("fill", deadColor);
      }
    }
  }
}

function makeSvgGrid(height, width, cellSize, loaderPrefix, deadColor) {
  //const svgNode = document.createElement("svg");
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgNode.setAttribute("height", height);
  svgNode.setAttribute("width", width);
  svgNode.setAttribute("viewBox", `0 0 ${height} ${width}`);
  //svgNode.setAttribute("id", loaderPrefix);

  const maxRows = height / cellSize;
  const maxCols = width / cellSize;

  let gridHtmlString = `<defs id="${loaderPrefix}"></defs>`;
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      gridHtmlString += `<rect id="${loaderPrefix}-${row}-${col}" 
                    x="${col * cellSize}" y="${row * cellSize}"
                    width="${cellSize}" height="${cellSize}"
                    fill="${deadColor}"
                 ></rect>`;
    }
  }
  svgNode.innerHTML = gridHtmlString;
  return svgNode;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// window.loader = createLoader({
//   rootNode: document.getElementById("root"),
//   size: 50,
//   animationDelay: 500,
//   randomColor: true,
//   initialBoard: presets.blink()
// });

// window.loader.render();
// window.loader.start();

