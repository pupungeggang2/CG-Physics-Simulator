window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    // Assigning canvas variable into canvas, context into canvas' webgl context.
    canvas = document.getElementById('Screen')
    canvasUI = document.getElementById('UI')
    gl = canvas.getContext('webgl')
    contextUI = canvasUI.getContext('2d')

    // Adding input function
    canvas.addEventListener('mousedown', mouseDown, false)
    canvas.addEventListener('mouseup', mouseUp, false)
    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)

    // Loading texture
    imageLoad()

    // Initializing GL
    glInit()

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

function keyDown(event) {
    let key = event.key
    
    keyDownScene(key)
}

function keyUp(event) {
    let key = event.key
        
    keyUpScene(key)
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameInstance)
    }
}

function rightClick() {
    return false
}
