namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hops_and_Paw.vy == 0) {
        Hops_and_Paw.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`MilkShake`, function (sprite, location) {
    game.over(false, effects.bubbles)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    otherSprite.destroy()
    Ghost = sprites.create(assets.image`Ghost`, SpriteKind.Enemy)
    animation.runImageAnimation(
    Ghost,
    assets.animation`Ghost A`,
    100,
    true
    )
    Ghost.setPosition(Hops_and_Paw.x + 80, Hops_and_Paw.y - 80)
    Ghost.follow(Hops_and_Paw, 50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
})
function startLevel () {
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (current_level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (current_level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(Hops_and_Paw, assets.tile`Cocochu Spawner`)
    for (let value of tiles.getTilesByType(assets.tile`Cocochu Spawner`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    scene.cameraFollowSprite(Hops_and_Paw)
    info.setLife(5)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flower)) {
        value4.destroy()
    }
    for (let value5 of tiles.getTilesByType(assets.tile`Coin Spawner`)) {
        flowely = sprites.create(assets.image`Coin`, SpriteKind.Coin)
        animation.runImageAnimation(
        flowely,
        assets.animation`Coin A`,
        100,
        true
        )
        tiles.placeOnTile(flowely, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`Ghost Spawner`)) {
        flowely = sprites.create(assets.image`Flowely`, SpriteKind.Flower)
        tiles.placeOnTile(flowely, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`UltraStary Spawn`)) {
        UltraStary = sprites.create(assets.image`UltraStary`, SpriteKind.Fireball)
        tiles.placeOnTile(UltraStary, value7)
        tiles.setTileAt(value7, assets.tile`tile0`)
        animation.runMovementAnimation(
        UltraStary,
        "c 0 -100 0 100 0 0",
        2000,
        true
        )
        UltraStary.startEffect(effects.fire)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`TP`, function (sprite, location) {
    current_level += 1
    startLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (Hops_and_Paw.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let UltraStary: Sprite = null
let flowely: Sprite = null
let Ghost: Sprite = null
let Hops_and_Paw: Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
scene.setBackgroundImage(assets.image`Candy Sky`)
current_level = 0
Hops_and_Paw = sprites.create(assets.image`Cocochu`, SpriteKind.Player)
controller.moveSprite(Hops_and_Paw, 80, 0)
startLevel()
music.play(music.stringPlayable("C5 C C5 E A F G G ", 295), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function () {
    if (Hops_and_Paw.vy < 0) {
        Hops_and_Paw.setImage(assets.image`Cocochu Up`)
    } else if (Hops_and_Paw.vy > 0) {
        Hops_and_Paw.setImage(assets.image`Cocochu Down`)
    } else if (Hops_and_Paw.x % 2 == 0) {
        Hops_and_Paw.setImage(assets.image`Cocochu 2`)
    } else {
        Hops_and_Paw.setImage(assets.image`Cocochu 3`)
    }
    if ((Hops_and_Paw.isHittingTile(CollisionDirection.Left) || Hops_and_Paw.isHittingTile(CollisionDirection.Right)) && Hops_and_Paw.vy >= 0) {
        Hops_and_Paw.vy = 0
        Hops_and_Paw.ay = 0
        Hops_and_Paw.setImage(assets.image`Cocochu Near Wall`)
    } else {
        Hops_and_Paw.ay = 350
    }
    if (Hops_and_Paw.vx < 0 || Hops_and_Paw.isHittingTile(CollisionDirection.Left)) {
        Hops_and_Paw.image.flipX()
        Hops_and_Paw.setImage(Hops_and_Paw.image)
    }
})
