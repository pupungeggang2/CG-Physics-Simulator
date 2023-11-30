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

function collisionCheck() {
    
}

function moveObject() {
    
}
