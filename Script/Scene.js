function loopScene() {
    displayUI()
    display()
}

function displayUI() {
    drawSceneUIInit()

    if (state === 'Pause') {
        contextUI.fillText('Soft Body Physics Simulator (Paused)', UI.text1[0], UI.text1[1])
    } else if (state === 'Running') {
        contextUI.fillText('Soft Body Physics Simulator (Running)', UI.text1[0], UI.text1[1])
    }

    drawUI()
}

function display() {
    drawSceneInit()
    // Drawing
    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, canvas.width, canvas.height)

    // Drawing objects
    drawAxis()
    drawBackPlate()
    drawBodies()

    if (state === 'Pause' && statePause === 'Add' && dragged === true) {
        drawPlane(input.mouseRect1, input.mouseRect2)
    }
}

function mouseUpScene(x, y, button) {
    let gPosition = [(x - canvas.width / 2) / (canvas.width / 2), (-(y - canvas.height / 2)) / (canvas.height / 2)]

    if (button === 0) {
        input.mousePressed = false

        if (statePause === 'Add') {
            if (addPhase === 'Drag') {
                dragged = true
            }
        }
    }
}

function mouseDownScene(x, y, button) {
    let gPosition = [(x - canvas.width / 2) / (canvas.width / 2), (-(y - canvas.height / 2)) / (canvas.height / 2)]
    
    if (button === 0) {
        input.mousePressed = true

        if (statePause === 'Add') {
            if (addPhase === 'Drag') {
                let position3D = convert2Dto3D(gPosition[0], gPosition[1])
                
                if (position3D[0] > -0.8 && position3D[0] < 0.8 && position3D[1] > -0.8 && position3D[1] < 0.8) {
                    input.mouseRect1 = [position3D[0], position3D[1]]
                }
            }
        }
    }
}

function mouseMoveScene(x, y, button) {
    let gPosition = [(x - canvas.width / 2) / (canvas.width / 2), (-(y - canvas.height / 2)) / (canvas.height / 2)]
    
    if (statePause === 'Rotate') {
        if (input.mousePressed === true) {
            let diff = [input.mousePrevious[0] - gPosition[0], input.mousePrevious[1] - gPosition[1]]
            let previousTransform = JSON.parse(JSON.stringify(systemTransformInverse))
            systemTransform = matrixMultiply(matrixRotate(1, diff[0] * -40), systemTransform)
            systemTransform = matrixMultiply(matrixRotate(0, diff[1] * 40), systemTransform)
            systemTransformInverse = matrixMultiply(matrixRotate(0, diff[1] * -40), matrixIdentity())
            systemTransformInverse = matrixMultiply(matrixRotate(1, diff[0] * 40), systemTransformInverse)
            systemTransformInverse = matrixMultiply(previousTransform, systemTransformInverse)
        }
    } else if (statePause === 'Add') {
        if (addPhase === 'Drag') {
            if (input.mousePressed === true) {
                let position3D = convert2Dto3D(gPosition[0], gPosition[1])

                if (position3D[0] > -0.8 && position3D[0] < 0.8 && position3D[1] > -0.8 && position3D[1] < 0.8) {
                    input.mouseRect2 = [position3D[0], position3D[1]]
                }

                //debug.innerHTML = `${input.mouseRect1}|${input.mouseRect2}`
            }
        }
    }
    
    input.mousePrevious = gPosition
}

function mouseUpUIScene(x, y, button) {
    if (state === 'Pause') {
        if (statePause === 'Idle') {
            if (pointInsideRectArray(x, y, UI.rotate)) {
                statePause = 'Rotate'
            } else if (pointInsideRectArray(x, y, UI.addStatic)) {
                statePause = 'Add'
                addMode = 'Static'
                addPhase = 'Drag'
                dragged = false
            } else if (pointInsideRectArray(x, y, UI.addSoft)) {
                statePause = 'Add'
                addMode = 'Soft'
                addPhase = 'Drag'
                dragged = false
            }
        } else if (statePause === 'Rotate') {
            if (pointInsideRectArray(x, y, UI.rotate)) {
                statePause = 'Idle'
            }
        } else if (statePause === 'Add') {
            if (addPhase === 'Drag') {
                if (pointInsideRectArray(x, y, UI.next)) {
                    addPhase = 'InputDepth'
                    input.numDepth = 0
                    input.numAngle = 0
                }
            } else if (addPhase === 'InputDepth') {
                if (pointInsideRectArray(x, y, UI.next)) {
                    if (input.numDepth > 0) {
                        addPhase = 'InputAngle'
                    }
                }
            } else if (addPhase === 'InputAngle') {
                if (pointInsideRectArray(x, y, UI.next)) {
                    statePause = 'Idle'
                    addPhase = ''

                    //Add
                    addObject()
                    addMode = ''
                }
            }
        }
    }
}

function mouseUpNumScene(x, y, button) {
    if (state === 'Pause') {
        if (statePause === 'Add') {
            if (addPhase === 'InputDepth') {
                for (let i = 0; i < 10; i++) {
                    if (pointInsideRectArray(x, y, UI.number[i])) {
                        input.numDepth *= 10
                        input.numDepth += i
                    }

                    if (pointInsideRectArray(x, y, UI.numberErase)) {
                        input.numDepth = Math.floor(input.numDepth / 10)
                    }
                }
            } else if (addPhase === 'InputAngle') {
                for (let i = 0; i < 10; i++) {
                    if (pointInsideRectArray(x, y, UI.number[i])) {
                        input.numAngle *= 10
                        input.numAngle += i
                    }

                    if (pointInsideRectArray(x, y, UI.numberErase)) {
                        input.numAngle = Math.floor(input.numAngle / 10)
                    }
                }
            }
        }
    }
}

function keyUpScene(key) {
    if (state === 'Pause') {
        if (key === 'c') {
            input.cameraPressed = false
        } else if (key === 'e') {
            input.selectPressed = false
        }
    }
}

function keyDownScene(key) {
    if (state === 'Pause') {
        if (key === 'c') {
            input.cameraPressed = true
        } else if (key === 'e') {
            input.selectPressed = true
        }
    }
}
