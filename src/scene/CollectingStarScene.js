import Phaser from "phaser"
export default class CollectingStarsScene
extends Phaser.Scene {
    constructor(){
        super('collecting-stars-scene')
    }
    //
    //
    init(){
        this.platforms = undefined
        this.player = undefined
        this.stars = undefined
        this.cursor = undefined
    }
    //
    //
    preload(){
        this.load.image('ground','images/platform.png')
        this.load.image('star','images/star.png')
        this.load.image('sky','images/sky.png')
        this.load.image('bomb','images/bomb.png')
        this.load.spritesheet('dude','images/dude.png',{frameWidth:32, frameHeight: 48} )

    }
    //
    //
    create(){
        this.add.image(400,300,'sky')

        //untuk membuat objek static group
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(600, 400,'ground')
        this.platforms.create(50, 250,'ground')
        this.platforms.create(750, 220,'ground')
        this.platforms.create(800, 100,'ground')
        this.platforms.create(400, 568,'ground').setScale(2).refreshBody()

        //untuk menampilkan player
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)
        
        // untuk membuat objek bintang
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 10,
            setXY: {x: 50, y: 0, stepX:70}
        })
        this.physics.add.collider(this.stars, this.platforms)
        //efek bintang mantul
        this.stars.children.iterate(function(child){
            // @ts-ignore
            this.children.setBounceY(0.5)
        })

        //untuk mengontrol player
        // this.cursor = this.input.keyboard.createCursorKeys()
        this.cursor = this.input.keyboard.createCursorKeys()

        // untuk membuat animasi dari player
        // animasi ke kiri
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers
            ('dude', {start:0, end:3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames :[{key:'dude', frame: 4}],
            frameRate: 20,
        });

        //animasi ke kanan
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers
            ('dude', {start:5, end:8}),
            frameRate: 10,
            repeat: -1
        });

        //overlaps star
        this.physics.add.overlap(
            this.stars,
            this.player,
            this.collecStar,
            null,
            this
        )

    }
    //
    //
    update(){
        // bergerak ke kiri
        if(this.cursor.left.isDown){
            this.player.setVelocity(-200, 200)
            this.player.anims.play('left', true)
        }

        //bergerak ke kanan
        else if(this.cursor.right.isDown){
            this.player.setVelocity(200, 200)
            this.player.anims.play('right', true)
        }

        // posisi diam
        else{
            this.player.setVelocity(0, 0)
            this.player.anims.play('turn')
        }
       
    }

    collecStar(player, star){
        star.destroy()
    }

}