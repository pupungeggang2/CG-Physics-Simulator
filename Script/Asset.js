let img = {
    sponge : new Image(),
    metal : new Image(),

    running : new Image(),
    pause : new Image(),
    rotate : new Image(),

    addStatic : new Image(),
    addSoft : new Image(),
    next : new Image(),

    edit : new Image(),
    move : new Image(),
    remove : new Image(),
    
    selectFrame : new Image(),
}

function imageLoad() {
    img.sponge.src = 'Image/Sponge.png'
    img.metal.src = 'Image/Metal.png'

    img.running.src = 'Image/Running.png'
    img.pause.src = 'Image/Pause.png'
    img.rotate.src = 'Image/Rotate.png'

    img.addStatic.src = 'Image/AddStatic.png'
    img.addSoft.src = 'Image/AddSoft.png'
    img.next.src = 'Image/Next.png'

    img.edit.src = 'Image/Edit.png'
    img.move.src = 'Image/Move.png'
    img.remove.src = 'Image/Remove.png'

    img.selectFrame.src = 'Image/SelectFrame.png'
}
