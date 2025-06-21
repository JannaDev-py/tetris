const canvasContainer = document.querySelector('.canvas-container') as HTMLDivElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

window.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight
  config.pieceWidth = canvas.width / 20
  config.pieceHeight = canvas.height / 30
  renderGameboard()
})

const config = {
  width: 20,
  height: 30,
  pieceWidth: canvas.width / 20,
  pieceHeight: canvas.height / 30
}

interface Piece {
  cordinates: Array<{ x: number, y: number }>
  position: { x: number, y: number }
  color: string
  rotate: number
  width: number
  height: number
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
    color: '#3f7',
    rotate: 0,
    width: 3,
    height: 2
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
    rotate: 0,
    width: 3,
    height: 1
  },
  //   [][]
  // [][]
  {
    cordinates: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    position: {
      x: 0,
      y: 0
    },
    color: '#f21',
    rotate: 0,
    width: 3,
    height: 2
  }
]

const gameboard: Array<Array<Number | Piece>> = Array.from({ length: config.height }, () => Array(config.width).fill(0))

function renderGameboard (): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameboard.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        ctx.beginPath()
        ctx.fillStyle = (cell as Piece).color
        ctx.fillRect(x * config.pieceWidth, y * config.pieceHeight, config.pieceWidth, config.pieceHeight)
        ctx.closePath()
      }
    })
  })
}

function generatePiece (): void {
  const randomPiece = { ...pieces[Math.floor(Math.random() * pieces.length)] }
  let randomX = Math.floor(Math.random() * (config.width - randomPiece.width))
  randomPiece.color = '#' + Math.floor(Math.random() * 16777215).toString(16)

  while (gameboard[0][randomX] !== 0) {
    randomX = Math.floor(Math.random() * (config.width - randomPiece.width))
  }

  // lets put the piece at the positions it needs to be
  randomPiece.position.x = randomX
  randomPiece.cordinates.forEach((cordinate) => {
    gameboard[cordinate.y][cordinate.x + randomPiece.position.x] = randomPiece
  })
  renderGameboard()
}

function initGame (): void {
}

generatePiece()

setInterval(() => {
  initGame()
}, 1000)
