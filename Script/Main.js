window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    // Assigning canvas variable into canvas, context into canvas' webgl context.
    canvas = document.getElementById('Screen')
    canvasUI = document.getElementById('UI')
    canvasNum = document.getElementById('Numpad')
    gl = canvas.getContext('webgl')
    contextUI = canvasUI.getContext('2d')
    contextNum = canvasNum.getContext('2d')
    debug = document.getElementById('Debug')

    // Adding input function
    canvas.addEventListener('mousedown', mouseDown, false)
    canvas.addEventListener('mouseup', mouseUp, false)
    canvas.addEventListener('mousemove', mouseMove, false)
    canvasUI.addEventListener('mouseup', mouseUpUI, false)
    canvasNum.addEventListener('mouseup', mouseUpNum, false)
    window.addEventListener('mouseup', mouseUpWindow, false)
    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)

    // Loading texture
    imageLoad()

    // Initializing GL
    glInit()

    drawNumpad()

    // Starting loop
    gameCurrentFrame = Date.now()
    gamePreviousFrame = Date.now() - 16
    gameInstance = requestAnimationFrame(loop)
}

function loop() {
    gameCurrentFrame = Date.now()
    delta = gameCurrentFrame - gamePreviousFrame
    loopScene()
    gamePreviousFrame = Date.now()
    gameInstance = requestAnimationFrame(loop)
}

function mouseDown(event) {
    let canvasRect = canvas.getBoundingClientRect()
    let x = event.clientX - canvasRect.left
    let y = event.clientY - canvasRect.top
    let button = event.button

    mouseDownScene(x, y, button)
}

function mouseUp(event) {
    let canvasRect = canvas.getBoundingClientRect()
    let x = event.clientX - canvasRect.left
    let y = event.clientY - canvasRect.top
    let button = event.button

    mouseUpScene(x, y, button)
}

function mouseMove(event) {
    let canvasRect = canvas.getBoundingClientRect()
    let x = event.clientX - canvasRect.left
    let y = event.clientY - canvasRect.top
    let button = event.button

    mouseMoveScene(x, y, button)
}

function mouseUpUI(event) {
    let canvasRect = canvasUI.getBoundingClientRect()
    let x = event.clientX - canvasRect.left
    let y = event.clientY - canvasRect.top
    let button = event.button

    mouseUpUIScene(x, y, button)
}

function mouseUpNum(event) {
    let canvasRect = canvasUI.getBoundingClientRect()
    let x = event.clientX - canvasRect.left
    let y = event.clientY - canvasRect.top
    let button = event.button

    mouseUpNumScene(x, y, button)
}

function mouseUpWindow(event) {
    if (event.button === 0) {
        input.mousePressed = false
    }
}

function keyDown(event) {
    let key = event.key
    
    keyDownScene(key)
}

function keyUp(event) {
    let key = event.key
        
    keyUpScene(key)
}

function drawNumpad() {
    contextNum.clearRect(0, 0, 240, 320)
    contextNum.font = '32px neodgm'
    contextNum.textAlign = 'left'
    contextNum.textBaseline = 'top'
    contextNum.fillStyle = 'Black'
    contextNum.strokeStyle = 'Black'
    contextNum.lineWidth = 4

    for (let i = 0; i < 10; i++) {
        contextNum.strokeRect(UI.number[i][0], UI.number[i][1], UI.number[i][2], UI.number[i][3])
        contextNum.fillText(`${i}`, UI.number[i][0] + 16, UI.number[i][1] + 24)
    }

    contextNum.strokeRect(UI.numberErase[0], UI.numberErase[1], UI.numberErase[2], UI.numberErase[3])
    contextNum.fillText(`<`, UI.numberErase[0] + 16, UI.numberErase[1] + 24)
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameInstance)
    }
}

function rightClick() {
    return false
}
