namespace SpriteKind {
    export const SelectableCharacter = SpriteKind.create()
    export const Background = SpriteKind.create()
    export const Invincible = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    im_dead()
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    info.changeLifeBy(-1)
    if (showCharacterScreen == true) {
        Smallflappy.setKind(SpriteKind.Invincible)
        Smallflappy.lifespan = 10000
        small_monke.setKind(SpriteKind.Invincible)
        small_monke.lifespan = 10000
        if (currently_selected_character == small_monke) {
            small_monke.setFlag(SpriteFlag.Invisible, false)
            scene.cameraFollowSprite(small_monke)
            Smallflappy.destroy()
            Small_Cool_Flappy.destroy()
        }
        if (currently_selected_character == Smallflappy) {
            small_monke.destroy()
            Small_Cool_Flappy.destroy()
        }
        if (currently_selected_character == Small_Cool_Flappy) {
            Small_Cool_Flappy.setFlag(SpriteFlag.Invisible, false)
            small_monke.destroy()
            Smallflappy.destroy()
        }
    }
    if (info.life() == 9997) {
        im_dead()
    } else {
    	
    }
    if (info.life() == 9993) {
        im_dead()
    } else {
    	
    }
})
function show_character_picker () {
    scene.centerCameraAt(80, 60)
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        let Move_forward = 0
        let Gravity = 0
        value.ay = Gravity
        value.setFlag(SpriteFlag.Invisible, true)
        value.vx = Move_forward
    }
    showCharacterScreen = true
    textSprite = textsprite.create("Select your skin!", 9, 10)
    textSprite.z = 101
    textSprite.setPosition(74, 8)
    Flappy = sprites.create(img`
        .........................
        .........................
        .........................
        .........................
        .........................
        1........................
        11..........55555........
        111.......555511111......
        1111....55555511111......
        11111..555555511fff5.....
        .111115555555511fff55....
        .111115555555511fff55....
        .11115555555551111155....
        ..1115555555551111155....
        ...11155555555555444444..
        1.....55555555554444444..
        1....115555555554ffffff..
        1111.111555555554444444..
        1111111111555554444444...
        11111111.................
        111111...................
        .111.....................
        ..1......................
        .........................
        .........................
        `, SpriteKind.SelectableCharacter)
    Flappy.z = 101
    Flappy.setPosition(24, 23)
    sprites.setDataSprite(Flappy, "player", Smallflappy)
    Monke = sprites.create(img`
        .....222eee222......
        ....22ee4e4ee22.....
        ....22e42494e22.....
        .....2e4f4f4e2......
        ......e49424e.......
        ......e44244e.......
        .......f444f........
        ..ee...fffff....ee..
        ..e.....eee...ee....
        ..eee..e.e.eee......
        ....eee..e..........
        ....eee..e..........
        ....e.ee..e.........
        ...e...eeee.........
        ..e.....eeee........
        ........e...e.......
        .......e.....e......
        .....ee......e......
        ....e.........e.....
        ....eee.......eee...
        `, SpriteKind.SelectableCharacter)
    Monke.z = 101
    Monke.setPosition(73, 23)
    sprites.setDataSprite(Monke, "player", small_monke)
    Cool_Flappy = sprites.create(img`
        ..............8a.........
        ............888aaa.......
        ...........8888aaaa......
        ..........88888aaaaa.....
        .........888888aaaaaa....
        9.......8888888aaaaaaa...
        99.....88888888aaaaaaaa..
        999...888888888aaaaaaaaa.
        9999..888888888aaaaaaaaa.
        99999..58888888aaaaaaa...
        .999ffffff55559999955....
        .99fff595fffff99999ff....
        .ffff9999f55559999955....
        ..fff55fff55559999955....
        ...fffff5fff55555444444..
        9.....f9595f55554444444..
        9....ff9999f55554ffffff..
        9999.fff595f55554444444..
        999fffffffff5554444444...
        999fffff.................
        99ffff...................
        .9ff.....................
        ..f......................
        .........................
        .........................
        `, SpriteKind.SelectableCharacter)
    Cool_Flappy.z = 101
    Cool_Flappy.setPosition(134, 23)
    sprites.setDataSprite(Cool_Flappy, "player", Small_Cool_Flappy)
    ourCharacters = [Flappy, Monke, Cool_Flappy]
    current_character_index = 1
    character_selector_box = sprites.create(img`
        ............2.......................
        ............2..............4........
        2.........................4.........
        22..................................
        .2..................................
        ....................................
        ....................................
        ....................................
        ..................................44
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        a...................................
        aa..................................
        .a..................................
        ..................................55
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        .................................5..
        aa...............................55.
        ..................................5.
        ....................................
        ....................................
        ....................................
        ....................................
        ...8................................
        ..88........8.............77.....7..
        .88.........8.............7......77.
        `, SpriteKind.Background)
    character_selector_box.z = 101
}
function im_dead () {
    if (!(showCharacterScreen)) {
    	
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (showCharacterScreen) {
    	
    } else {
        tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(thePlayer), CollisionDirection.Bottom), assets.tile`myTile`)
        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(thePlayer), CollisionDirection.Bottom), true)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (showCharacterScreen) {
        thePlayer = sprites.readDataSprite(currently_selected_character, "player")
        thePlayer.setFlag(SpriteFlag.Invisible, false)
        scene.cameraFollowSprite(thePlayer)
        for (let value of sprites.allOfKind(SpriteKind.SelectableCharacter)) {
            value.destroy()
        }
        for (let value of sprites.allOfKind(SpriteKind.Background)) {
            value.destroy()
        }
        for (let value of sprites.allOfKind(SpriteKind.Text)) {
            value.destroy()
        }
        showCharacterScreen = false
        tiles.placeOnTile(thePlayer, tiles.getTileLocation(1, 6))
    } else {
        Smallflappy.setVelocity(10, -30)
        small_monke.setVelocity(10, -30)
        Small_Cool_Flappy.setVelocity(10, -30)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (showCharacterScreen) {
        current_character_index = (current_character_index + (ourCharacters.length - 1)) % ourCharacters.length
    }
})
function MakeFlappy () {
    Smallflappy = sprites.create(img`
        . . . . . . . . 
        1 . . 5 1 1 . . 
        1 1 5 5 1 f . . 
        1 5 5 5 1 1 . . 
        . 5 5 5 5 4 4 4 
        1 1 5 5 5 4 f f 
        1 1 . . . 4 4 4 
        1 . . . . . . . 
        `, SpriteKind.Player)
    animation.runImageAnimation(
    Smallflappy,
    [img`
        1 . . . 1 1 . . 
        1 1 5 5 1 f . . 
        1 1 1 5 1 1 . . 
        . . 5 5 5 4 4 4 
        1 . 1 5 5 4 f f 
        1 1 1 1 . 4 4 4 
        . 1 1 . . . . . 
        . . . . . . . . 
        `,img`
        . 1 . . 1 1 . . 
        . 1 1 5 1 f . . 
        . 1 1 5 1 1 . . 
        . . 5 5 5 4 4 4 
        . . 1 5 5 4 f f 
        . 1 1 . . 4 4 4 
        . 1 1 . . . . . 
        . . . . . . . . 
        `],
    500,
    true
    )
    Smallflappy.vx = 10
    Smallflappy.ay = 40
    Smallflappy.setPosition(9, 55)
    scene.cameraFollowSprite(Smallflappy)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    info.changeLifeBy(-1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (showCharacterScreen) {
        current_character_index = (current_character_index + 1) % ourCharacters.length
    }
})
spriteutils.createRenderable(100, function (screen2) {
    if (showCharacterScreen) {
        screen2.fill(9)
        currently_selected_character = ourCharacters[current_character_index]
        character_selector_box.setPosition(currently_selected_character.x, currently_selected_character.y)
    }
})
let thePlayer: Sprite = null
let character_selector_box: Sprite = null
let current_character_index = 0
let ourCharacters: Sprite[] = []
let Cool_Flappy: Sprite = null
let Monke: Sprite = null
let Flappy: Sprite = null
let textSprite: TextSprite = null
let Small_Cool_Flappy: Sprite = null
let currently_selected_character: Sprite = null
let small_monke: Sprite = null
let Smallflappy: Sprite = null
let showCharacterScreen = false
show_character_picker()
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
