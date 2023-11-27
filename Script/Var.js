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
let statePause = 'Idle' // Idle, Adding, Editing
let addMode = ''
let addPhase = ''
let showDots = false

// GL shader variables
let shaderVert
let shaderFrag
let shaderProgram

// Variables related to input
let input = {
    mousePressed : false,
    mousePrevious : [0, 0],
    cameraPressed : false,
    selectPressed : false,
}

// Variables related to space
let bodyListSoft = []
let bodyListStatic = []

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
let vertexBuffer
let indexBuffer
let currentColor
let currentMatrix
let colors = [0.1, 0.1, 0.1, 1.0]
let GLBodyListSoft = [[]]
let GLBodyListStatic = [[]]
