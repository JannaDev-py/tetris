const canvasContainer = document.querySelector('.canvas-container') as HTMLDivElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

window.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight
})

const config = {
  width: 20,
  height: 30,
  pieceWidth: canvas.width / 20,
  pieceHeight: canvas.height / 30
}

// all pieces will start from left to right, top to bottom
const pieces = [
  // [][][]
  //   []
  {
    cordinates: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 }
    ],
    position: {
      x: 0,
      y: 0
    },
    color: 'red',
    rotate: 0
  },
  // [][][]
  {
    cordinates: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    position: {
      x: 0,
      y: 0
    },
    color: '#f21',
    rotate: 0
  }
]

const gameboard: Array<Array<Number | typeof pieces[1]>> = Array.from({ length: config.height }, () => Array(config.width).fill(0))

gameboard[0][0] = pieces[1]
gameboard[pieces[1].cordinates[0].y][pieces[1].cordinates[0].x] = pieces[1]
gameboard[pieces[1].cordinates[1].y][pieces[1].cordinates[1].x] = pieces[1]
gameboard[pieces[1].cordinates[2].y][pieces[1].cordinates[2].x] = pieces[1]

function renderGameboard (): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameboard.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        ctx.beginPath()
        ctx.fillStyle = (cell as typeof pieces[1]).color
        ctx.fillRect(x * config.pieceWidth, y * config.pieceHeight, config.pieceWidth, config.pieceHeight)
        ctx.closePath()
      }
    })
  })
}

renderGameboard()
