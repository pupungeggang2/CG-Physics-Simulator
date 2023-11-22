// Variables related to canvas
let canvas
let context

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

// Variables related to input
let input = {
    mousePressed : false,
    cameraPressed : false,
}

// Variables related to program

// Variables related to space
let bodyListSoft = []
let bodyListStatic = []

// Variables related to 3D Implementation
let GLBodyListSoft = []
let GLBodyListStatic = []
