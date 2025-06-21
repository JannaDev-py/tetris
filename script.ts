const canvasContainer = document.querySelector('.canvas-container') as HTMLDivElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

window.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight
})

const config = {
  width: 20,
  height: 30
}

console.log(config)
