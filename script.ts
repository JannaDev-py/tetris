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
  coordinates: Array<Array<{ x: number, y: number }>>
  coordinatesDrag: Array<Array<{ x: number, y: number }>>
  position: { x: number, y: number }
  color: string
  rotate: number
  width: number[]
  height: number[]
}

// all pieces will start from left to right, top to bottom
const pieces: Piece[] = [
  // [][][]    []     []    []
  //   []    [][]   [][][]  [][]
  //           []           []
  {
    coordinates: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 }
      ],
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ],
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 }
      ]
    ],
    coordinatesDrag: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 2 }
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      [
        { x: 0, y: 2 },
        { x: 1, y: 1 }
      ]
    ],
    position: {
      x: 0,
      y: 0
    },
    color: '#3f7',
    rotate: 0,
    width: [3, 2, 3, 2],
    height: [2, 3, 2, 3]
  },
  // [][][] [] [][][] []
  //        []        []
  //        []        []
  {
    coordinates: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ]
    ],
    coordinatesDrag: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 2 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 2 }
      ]

    ],
    position: {
      x: 0,
      y: 0
    },
    color: '#f21',
    rotate: 0,
    width: [3, 1, 3, 1],
    height: [1, 3, 1, 3]
  },
  //   [][]  []      [][]  []
  // [][]    [][]  [][]    [][]
  //           []            []
  {
    coordinates: [
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ],
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ]

    ],
    coordinatesDrag: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 2 }
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 2 }
      ]

    ],
    position: {
      x: 0,
      y: 0
    },
    color: '#f21',
    rotate: 3,
    width: [3, 2, 3, 2],
    height: [2, 3, 2, 3]
  }
]

const tetrisColors = [
  '#00FFFF',
  '#FFFF00',
  '#800080',
  '#00FF00',
  '#FF0000',
  '#0000FF',
  '#FFA500'
]

const gameboard: Array<Array<Number | Piece>> = Array.from({ length: config.height }, () => Array(config.width).fill(0))

function renderGameboard (): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameboard.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        ctx.strokeStyle = '#000'
        ctx.fillStyle = (cell as Piece).color
        ctx.fillRect(x * config.pieceWidth, y * config.pieceHeight, config.pieceWidth, config.pieceHeight)
        ctx.strokeRect(x * config.pieceWidth, y * config.pieceHeight, config.pieceWidth, config.pieceHeight)
      }
    })
  })
}

let targetPiece: Piece

function generatePiece (): Piece {
  const randomPiece = JSON.parse(JSON.stringify(pieces[Math.floor(Math.random() * pieces.length)])) as Piece
  let randomX = Math.floor(Math.random() * (config.width - randomPiece.width[randomPiece.rotate]))
  randomPiece.color = tetrisColors[Math.floor(Math.random() * tetrisColors.length)]

  if (!(/^#[0-9a-f]{6}$/i).test(randomPiece.color)) {
    randomPiece.color = tetrisColors[Math.floor(Math.random() * tetrisColors.length)]
  }

  while (gameboard[0][randomX] !== 0) {
    randomX = Math.floor(Math.random() * (config.width - randomPiece.width[randomPiece.rotate]))
  }

  // lets put the piece at the positions it needs to be
  randomPiece.position.x = randomX
  randomPiece.coordinates[randomPiece.rotate].forEach((cordinate) => {
    gameboard[cordinate.y][cordinate.x + randomPiece.position.x] = randomPiece
  })

  return randomPiece
}

function initGame (): void {
  // now lets get the piece down until it hits the groand or another piece
  const nextPositions = targetPiece.coordinatesDrag[targetPiece.rotate].map((coordinate) => {
    if ((targetPiece.position.y + targetPiece.height[targetPiece.rotate]) >= config.height ||
    gameboard[targetPiece.position.y + coordinate.y + 1] === undefined) return 1
    const nextPosition = gameboard[targetPiece.position.y + coordinate.y + 1][targetPiece.position.x + coordinate.x]
    return nextPosition
  })

  const isAvailableNextPosition = nextPositions.every((value) => value === nextPositions[0] && nextPositions[0] === 0)

  if (isAvailableNextPosition) {
    // first lets remove the current piece
    targetPiece.coordinates[targetPiece.rotate].forEach((coordinate) => {
      gameboard[targetPiece.position.y + coordinate.y][targetPiece.position.x + coordinate.x] = 0
    })

    // then we recreate the piece below
    if (targetPiece.position.y + 1 >= config.height) {
      return
    }

    targetPiece.position.y += 1
    targetPiece.coordinates[targetPiece.rotate].forEach((coordinate) => {
      gameboard[targetPiece.position.y + coordinate.y][targetPiece.position.x + coordinate.x] = targetPiece
    })
    return
  } else if (!isAvailableNextPosition && targetPiece.position.y === 0) {
    document.removeEventListener('keydown', rotatePiece)
    window.location.reload()
  }
  targetPiece = generatePiece()
}

targetPiece = generatePiece()

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') rotatePiece(event)
  if (event.key === 'a' || event.key === 'd') movePiece(event)
})

function rotatePiece (event: KeyboardEvent): void {
  // first lets delete the whole piece
  targetPiece.coordinates[targetPiece.rotate].forEach((coordinate) => {
    gameboard[targetPiece.position.y + coordinate.y][targetPiece.position.x + coordinate.x] = 0
  })

  let rotate = targetPiece.rotate
  const initialRotate = targetPiece.rotate

  if ((targetPiece.position.y + 1 + targetPiece.height[targetPiece.rotate]) >= config.height) {
    targetPiece = generatePiece()
    return
  }

  // then we can rotate the piece
  if (event.key === 'ArrowLeft') rotate = (rotate - 1 < 0) ? 3 : rotate - 1
  else if (event.key === 'ArrowRight') rotate = (rotate + 1 > 3) ? 0 : rotate + 1

  // then lets check if the piece its actually can be rotated
  const nextPositions = targetPiece.coordinatesDrag[rotate].map((coordinate) => {
    if ((targetPiece.position.y + targetPiece.height[rotate]) >= config.height ||
    gameboard[targetPiece.position.y + coordinate.y + 1] === undefined) return 1
    const nextPosition = gameboard[targetPiece.position.y + coordinate.y + 1][targetPiece.position.x + coordinate.x]
    return nextPosition
  })

  const isAvailableNextPosition = nextPositions.every((value) => value === nextPositions[0] && nextPositions[0] === 0)

  if (!isAvailableNextPosition) {
    rotate = initialRotate
  }

  targetPiece.rotate = rotate
}

function movePiece (event: KeyboardEvent): void {
  // first lets delete the whole piece
  targetPiece.coordinates[targetPiece.rotate].forEach((coordinate) => {
    gameboard[targetPiece.position.y + coordinate.y][targetPiece.position.x + coordinate.x] = 0
  })

  // then we can move the piece
  if (event.key === 'a' &&
    targetPiece.position.x - 1 >= 0 &&
    gameboard[targetPiece.position.y][targetPiece.position.x - 1] === 0
  ) {
    targetPiece.position.x -= 1
  } else if (event.key === 'd' &&
    targetPiece.position.x + targetPiece.width[targetPiece.rotate] < config.width &&
    gameboard[targetPiece.position.y][targetPiece.position.x + targetPiece.width[targetPiece.rotate]] === 0
  ) {
    targetPiece.position.x += 1
  }

  targetPiece.coordinates[targetPiece.rotate].forEach((coordinate) => {
    gameboard[targetPiece.position.y + coordinate.y][targetPiece.position.x + coordinate.x] = targetPiece
  })
}

setInterval(() => {
  initGame()
  renderGameboard()
}, 100)
