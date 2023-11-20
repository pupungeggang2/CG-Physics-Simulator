window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    // Assigning canvas variable into canvas, context into canvas' webgl context.
    canvas = document.getElementById('Screen')
    context = canvas.getContext('webgl')

    // Adding input function
    canvas.addEventListener('mousedown', mouseDown, false)
    canvas.addEventListener('mouseup', mouseUp, false)
    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)

    // Initializing GL

    // Starting loop
    gameCurrentFrame = Date.now()
    gamePreviousFrame = Date.now() - 16
    gameInstance = requestAnimationFrame(loop)
}

function loop() {
    gameCurrentFrame = Date.now()
    loopScene()
    gamePreviousFrame = Date.now()
    gameInstance = requestAnimationFrame(loop)
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameInstance)
    }
}

function rightClick() {
    return false
}
