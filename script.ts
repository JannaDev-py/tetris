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

interface piece { width: number, height: number, color: string, x: number, y: number }

const pieces = [
  { width: 1, height: 1, color: 'red', x: 0, y: 0 }
]

const gameboard: Array<Array<Number | piece>> = Array.from({ length: config.height }, () => Array(config.width).fill(0))

gameboard[0][0] = pieces[0]

function renderGameboard (): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameboard.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        ctx.fillStyle = (cell as piece).color
        ctx.fillRect(x * config.pieceWidth, y * config.pieceHeight, config.pieceWidth, config.pieceHeight)
      }
    })
  })
}

