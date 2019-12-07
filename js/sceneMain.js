/** 
Here is where the details of the game will go  
**/
class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
	
	/*----------Loading Bar-----------*/
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(860, 370, 320, 50);
        
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
        
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
            
            
            
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(870, 380, 300 * value, 30);
    });
        
        

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        
    });   
    /*#################################*/
    
        //this.load.atlas("ninja", "images/ninja.png", "images/ninja.json");
        //let's take a look at this for ideas for animating the wuzz wuzz
        this.load.image('sky', 'images/sky.png');//from wuzz game
        this.load.image("brown", "images/tiles/brickBrown.png");
        this.load.image("grey", "images/tiles/brickGrey.png");
        this.load.image("cross", "images/controls/cross.png");
        this.load.image("redButton", "images/controls/redButton.png");
        this.load.image("hidden", "images/controls/hidden.png");
        this.load.image("controlBack", "images/controls/controlBack.png");
        this.load.image("background", "images/background.png");
        //audio
        this.load.audio('jump', 'sounds/jump4.mp3');
        this.load.audio('collect', 'sounds/collect.mp3'); 
        
        //from wuzz wuzz game
        //this.load.image('ground', 'images/platform.png');
        //this.load.image('star', 'images/fruityuity.png');
        this.load.spritesheet('dude', 'images/wuzzwuzz.png', { frameWidth: 32, frameHeight: 48 });
        //this.load.spritesheet('mushrom', 'images/dude.png', { frameWidth: 32, frameHeight: 48 });
        
    }
    create() {
        this.noLeft = false;
        let bg = this.add.image(0,0,"background").setOrigin(0,0);
        //let bg = "";
        this.bg = this.add.image(0,0,"background").setOrigin(0,0);
        Align.scaleToGameW(bg,2);

        this.emitter=EventDispatcher.getInstance();

        this.brickGroup = this.physics.add.group();
        this.coinGroup = this.physics.add.group();
        
        this.dude = this.physics.add.sprite(200, -100, "dude");
        this.dude.setCollideWorldBounds(true);
        Align.scaleToGameW(this.dude, .1);
        //
        //
        var frameNames = this.textures.get('dude').getFrameNames();
        console.log(frameNames);
        this.makeAnims();
        //this.ninja.play("idle");
        window.dude = this.dude;
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        //this.aGrid.showNumbers();

        this.blockGrid = new AlignGrid({
            scene: this,
            rows: 22,
            cols: 22,
            height:bg.displayHeight,
            width:bg.displayWidth
        });
        //this.blockGrid.showNumbers();
        

        this.dude.setGravityY(200);
        //set up platforms
        this.makeFloor(220, 241, "brown");
        this.makeFloor(110, 114, "brown");
        this.makeFloor(55, 57, "brown");
        //this.makeFloor(22, 29, "brown");
       
        // window.scene=this;
        // 
        this.dude.setDepth(10000);
        this.physics.add.collider(this.dude, this.brickGroup);
        this.gamePad = new GamePad({
            scene: this,
            grid: this.aGrid
        });

        this.aGrid.placeAtIndex(88, this.gamePad);
        this.setListeners();
        
        this.cameras.main.setBounds(0,0,bg.displayWidth,bg.displayHeight);
        this.cameras.main.startFollow(this.dude);

        this.time.addEvent({
            delay:1000,
            callback: this.delayDone,
            callbackScope: this,
            loop: false
        })
    }
    delayDone()
    {
        this.dude.body.setSize(this.dude.width,this.dude.height, true);
    }
    setListeners()
    {
        this.emitter.on('CONTROL_PRESSED',this.controlPressed.bind(this));
        this.input.on('pointerup',this.stopDude.bind(this));
    }
    controlPressed(param)
    {
        switch(param)
        {
            case "GO_UP":
                break;
            case "GO_DOWN":
                break;
            case "GO_LEFT":
                //dude.flipX = true;
                this.dude.setVelocityX(-200);
                this.dude.anims.play('left');
                break;
            case "GO_RIGHT":
                console.log(this.dude.x*2);
                //dude.flipX = false;
                this.dude.setVelocityX(200);
                this.dude.anims.play('right');
                break;
            case "BTN1":
                this.dude.setVelocityY(-270);
                this.sound.play('jump'); 
                break;
            case "BTN2":
                this.scene.start('SceneOver');
                break;
        }
    }
    stopDude() {
        this.dude.setVelocityX(0);
        this.dude.anims.play("idle");
    }
    placeBlock(pos, key) {
        let block = this.physics.add.sprite(0, 0, key);
        //this.aGrid.placeAtIndex(pos, block);
        this.blockGrid.placeAtIndex(pos, block);
        this.brickGroup.add(block);
        block.setImmovable();
        Align.scaleToGameW(block, .1);
    }
    makeFloor(fromPos, toPos, key) {
        for (var i = fromPos; i < toPos + 1; i++) {
            this.placeBlock(i, key);
        }
    }
    makeAnims() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 5 }),
            frameRate: 10,
        });
    }
    makeAnim(key, frameName) {
        let myArray = [];
        for (var i = 0; i < 8; i++) {
            let fn = frameName + i + ".png";
            myArray.push({
                key: key,
                frame: fn
            })
        }
        return myArray;
    }
    update() {
	    // move the player when the arrow keys are pressed
	    if (this.dude.x > 0) {
	      //this.dude.x -= 3;
	      //this.dude.scaleX = 1;
          //var noLeft = true;
          //this.dude.setVelocityX(200);
	
	    } else if (this.dude.x < (bg.width*2)) {
	      //this.dude.x += 3;
	      //this.dude.scaleX = -1;
	      //var noLeft = false;
	    }
    }
}

/*

var player;
var mushrom;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var mushromSpeed = 150;
 

var game = new Phaser.Game(config);

function preload ()
{
    //this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/platform.png');
    this.load.image('star', 'images/fruityuity.png');
    this.load.image('bomb', 'images/bomb.png');
   this.load.spritesheet('dude', 'images/wuzzwuzz.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('mushrom', 'images/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
	window.addEventListener('resize', resize);
	resize();
	
    //  A simple background for our game
    //this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(600, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(0, 50, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // The player and its settings
    mushrom = this.physics.add.sprite(400, 450, 'mushrom');
    

    //  Player physics properties. Give the little guy a slight bounce.
    //mushrom.setBounce(.3);
    mushrom.setCollideWorldBounds(true);
   
    //mushrom.setVelocity(Phaser.Math.Between(-400, 400), 20);
    mushrom.body.velocity.x = 150;
	mushrom.allowGravity = true;
	
	mushrom2 = this.physics.add.sprite(500, 150, 'mushrom');
	mushrom2.setCollideWorldBounds(true);
	mushrom2.body.velocity.x = 150;
	mushrom2.allowGravity = true;
	// mushrom.body.scale.x = 1;
	//mushrom.anchor.set(0.5);
	
	this.anims.create({
		key: 'walkleft',
		frames: this.anims.generateFrameNumbers('mushrom', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
	});
	this.anims.create({
		key: 'walkright',
		frames: this.anims.generateFrameNumbers('mushrom', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
	});
	this.anims.create({
		key: 'stopper',
		frames: [ { key: 'mushrom', frame: 4 } ],
        frameRate: 20
	});
	//start the mushrom walking
	mushrom.play('walkright');
	
	
	this.anims.create({
		key: 'walkleft2',
		frames: this.anims.generateFrameNumbers('mushrom2', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
	});
	this.anims.create({
		key: 'walkright2',
		frames: this.anims.generateFrameNumbers('mushrom2', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
	});
	//start the mushrom walking
	mushrom2.play('walkright');
	
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
        
    });


    stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        tint = Math.random() * 0xffffff;
        child.setTint(tint);

    });


    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(mushrom, platforms);
    this.physics.add.collider(mushrom2, platforms);
    ////this.physics.add.collider(enemies, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, mushrom, hitBomb, null, this);
    this.physics.add.collider(player, mushrom2, hitBomb, null, this);
}


function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    //mushrom.body.velocity.x = mushromSpeed * mushrom.body.scale.x;
    //mushrom.body.velocity.x = 150;

    // mushrom touching a wall on the right
    if(mushrom.body.blocked.right){
        // horizontal flipping mushrom sprite
        mushrom.body.velocity.x = -150;
        mushrom.play('walkleft');
    }

    // same concept applies to the left
    if(mushrom.body.blocked.left){
        mushrom.body.velocity.x = 150;
        mushrom.play('walkright');
    }

	if(mushrom2.body.blocked.right){
        // horizontal flipping mushrom sprite
        mushrom2.body.velocity.x = -150;
        mushrom2.play('walkleft');
    }

    // same concept applies to the left - for this one let's see if we can identify the edge of the platform
    if(mushrom2.body.x <= 400){
        mushrom2.body.velocity.x = 150;
        mushrom2.play('walkright');
    }


}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    
	

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
            tint = Math.random() * 0xffffff;
            child.setTint(tint);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');
	mushrom.anims.play('stopper');
    gameOver = true;
}
function resize(){
	var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
	var wratio = width / height, ratio = canvas.width / canvas.height;
	
	if(wratio < ratio){
		canvas.style.width = width + "px";
		canvas.style.height = (width /ratio) + "px";
	}else{
		canvas.style.width = (height * ratio) + "px";
		canvas.style.height = height + "px";
	}
}
function resetGame(){
	//background.visible =! background.visible;
	this.restart();
} */