// Variables related to canvas
let canvas
let gl
let canvasUI
let contextUI
let debug

// Variables related to loop function
let gameInstance
let gameFrameCurrent
let gameFramePrevious
let delta

// Variables related to state
let state = 'Pause' // Pause, Running
let statePause = 'Idle' // Idle, Add, Edit, Rotate
let stateRunning = 'Idle' // Idle, Camera, Rotate
let addMode = ''
let addPhase = ''
let dragged = false
let showDots = false

// GL shader variables
let shaderVert
let shaderFrag
let shaderProgram

// Variables related to input and program
let input = {
    mousePressed : false,
    mousePrevious : [0, 0],
    mouseRect1 : [0, 0],
    mouseRect2 : [0, 0],
    cameraPressed : false,
    selectPressed : false,
    numDepth : 0,
    numAngle : 0,
    mouseEdit1 : [0, 0]
}

let selected = [-1, -1]
let back = []

let physicsSoft = [

]

// Variables related to 3D Implementation
let matrixView = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, -0.5, 0,
    0, 0, 0, 1
]
let systemTransform = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]
let systemTransformInverse = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]
let vertexBuffer
let indexBuffer
let currentColor
let currentMatrix
let colors = [0.1, 0.1, 0.1, 1.0]
let GLBodyListSoft = []
let GLBodyListStatic = []
