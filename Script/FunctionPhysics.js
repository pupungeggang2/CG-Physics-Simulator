function pointInsideRect(x, y, r1, r2, r3, r4) {
    return x > r1 && x < r1 + r3 && y > r2 && y < r2 + r4
}

function pointInsideRectArray(x, y, rect) {
    return x > rect[0] && x < rect[0] + rect[2] && y > rect[1] && y < rect[1] + rect[3]
}

function pointInsidePolygonArray(x, y, point) {
    let points = JSON.parse(JSON.stringify(point))
    points.push(JSON.parse(JSON.stringify(point[0])))

    let crossCount = 0

    for (let i = 0; i < point.length; i++) {
        let left = Math.min(points[i][0], points[i + 1][0])
        let right = Math.max(points[i][0], points[i + 1][0])
        let down = Math.min(points[i][1], points[i + 1][1])
        let up = Math.max(points[i][1], points[i + 1][1])

        if (y < down || y > up) {
            continue
        }

        let lineCrossX = left * (up - y) + right * (y - down) / (up - down)

        if (x < lineCrossX) {
            crossCount += 1
        }
    }

    return crossCount % 2 === 1
}

function collisionCheck(cuboid1, cuboid2) {
    let AABB1 = [
        Math.min(cuboid1[0][0], cuboid1[1][0], cuboid1[2][0], cuboid1[3][0], cuboid1[4][0], cuboid1[5][0], cuboid1[6][0], cuboid1[7][0]),
        Math.max(cuboid1[0][0], cuboid1[1][0], cuboid1[2][0], cuboid1[3][0], cuboid1[4][0], cuboid1[5][0], cuboid1[6][0], cuboid1[7][0]),
        Math.min(cuboid1[0][1], cuboid1[1][1], cuboid1[2][1], cuboid1[3][1], cuboid1[4][1], cuboid1[5][1], cuboid1[6][1], cuboid1[7][1]),
        Math.max(cuboid1[0][1], cuboid1[1][1], cuboid1[2][1], cuboid1[3][1], cuboid1[4][1], cuboid1[5][1], cuboid1[6][1], cuboid1[7][1]),
        Math.min(cuboid1[0][2], cuboid1[1][2], cuboid1[2][2], cuboid1[3][2], cuboid1[4][2], cuboid1[5][2], cuboid1[6][2], cuboid1[7][2]),
        Math.max(cuboid1[0][2], cuboid1[1][2], cuboid1[2][2], cuboid1[3][2], cuboid1[4][2], cuboid1[5][2], cuboid1[6][2], cuboid1[7][2])
    ]
    
    let AABB2 = [
        Math.min(cuboid2[0][0], cuboid2[1][0], cuboid2[2][0], cuboid2[3][0], cuboid2[4][0], cuboid2[5][0], cuboid2[6][0], cuboid2[7][0]), 
        Math.max(cuboid2[0][0], cuboid2[1][0], cuboid2[2][0], cuboid2[3][0], cuboid2[4][0], cuboid2[5][0], cuboid2[6][0], cuboid2[7][0]),
        Math.min(cuboid2[0][1], cuboid2[1][1], cuboid2[2][1], cuboid2[3][1], cuboid2[4][1], cuboid2[5][1], cuboid2[6][1], cuboid2[7][1]),
        Math.max(cuboid2[0][1], cuboid2[1][1], cuboid2[2][1], cuboid2[3][1], cuboid2[4][1], cuboid2[5][1], cuboid2[6][1], cuboid2[7][1]),
        Math.min(cuboid2[0][2], cuboid2[1][2], cuboid2[2][2], cuboid2[3][2], cuboid2[4][2], cuboid2[5][2], cuboid2[6][2], cuboid2[7][2]),
        Math.max(cuboid2[0][2], cuboid2[1][2], cuboid2[2][2], cuboid2[3][2], cuboid2[4][2], cuboid2[5][2], cuboid2[6][2], cuboid2[7][2])
    ]

    return !(AABB1[1] < AABB2[0] || AABB1[0] > AABB2[1]) && !(AABB1[3] < AABB2[2] || AABB1[2] > AABB2[3]) && !(AABB1[5] < AABB2[4] || AABB1[4] > AABB2[5]) 
}

function collisionRectCheck(rect1, rect2) {
    let AABB1 = [
        Math.min(rect1[0][0], rect1[1][0], rect1[2][0], rect1[3][0]),
        Math.max(rect1[0][0], rect1[1][0], rect1[2][0], rect1[3][0]),
        Math.min(rect1[0][1], rect1[1][1], rect1[2][1], rect1[3][1]),
        Math.max(rect1[0][1], rect1[1][1], rect1[2][1], rect1[3][1]),
    ]
    
    let AABB2 = [
        Math.min(rect2[0][0], rect2[1][0], rect2[2][0], rect2[3][0]),
        Math.max(rect2[0][0], rect2[1][0], rect2[2][0], rect2[3][0]),
        Math.min(rect2[0][1], rect2[1][1], rect2[2][1], rect2[3][1]),
        Math.max(rect2[0][1], rect2[1][1], rect2[2][1], rect2[3][1]),
    ]

    return !(AABB1[1] < AABB2[0] || AABB1[0] > AABB2[1]) && !(AABB1[3] < AABB2[2] || AABB1[2] > AABB2[3])
}

function moveObject() {
    applyGravtiy()

    for (let i = 0; i < physicsSoft.length; i++) {
        let tempPosition = moveCuboid([physicsSoft[i]['Velocity'][0] * delta / 1000, physicsSoft[i]['Velocity'][1] * delta / 1000, physicsSoft[i]['Velocity'][2] * delta / 1000], GLBodyListSoft[i])
        for (let j = 0; j < GLBodyListStatic.length; j++) {
            let centerLowerSoft = (tempPosition[0][1] + tempPosition[1][1] + tempPosition[4][1] + tempPosition[5][1]) / 4
            let centerUpperStaticY = (GLBodyListStatic[i][2][1] + GLBodyListStatic[i][3][1] + GLBodyListStatic[i][6][1] + GLBodyListStatic[i][7][1]) / 4

            if (collisionCheck(tempPosition, GLBodyListStatic[i]) && centerLowerSoft < centerUpperStaticY) {
                tempPosition = moveCuboid([0, centerUpperStaticY - centerLowerSoft, 0], tempPosition)
                physicsSoft[i]['Velocity'][1] = 0
                //debug.innerHTML = centerUpperStaticY - centerLowerSoft
            }
        }

        GLBodyListSoft[i] = tempPosition
    }
}

function applyGravtiy() {
    for (let i = 0; i < physicsSoft.length; i++) {
        physicsSoft[i]['Velocity'][1] -= 0.05
    }
}

function moveCuboid(move, cuboid) {
    let moved = []
    let matrixMove = matrixTranslate(move[0], move[1], move[2])

    for (let i = 0; i < 8; i++) {
        moved.push(applyTransform(matrixMove, cuboid[i]))
    }

    return moved
}
