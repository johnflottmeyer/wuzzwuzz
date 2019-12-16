class SceneIntro extends Phaser.Scene {
    constructor(){
        super('SceneIntro');
    }
    preload(){
        //this.load.image('sky', 'images/background.png');//from wuzz game
    }
    create(){
        console.log("Intro Movie");
        //let bg = this.add.image(0,0,"sky").setOrigin(0,0);
        //Align.scaleToGameW(bg,2);

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        var HomeScreen = this.add.graphics();
        var HomeScreen = this.add.graphics();
        HomeScreen.fillStyle(0xEBEBEB, 0.8);
        HomeScreen.fillRect(860, 370, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            },
            text: 'Intro story for wuzz wuzz',
            style: {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center', 
                backgroundColor: '#000000'
                //fontSize:game.config.width/10,
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var playAgainText = this.make.text({
            x: width / 2,
            y: height / 2 + 150,
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            },
            text: "Skip Intro",
            style: {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center', 
                backgroundColor: '#ff00ff'
                //fontSize:game.config.width/10,
            }
        });
        playAgainText.setOrigin(0.5,0.5);

        playAgainText.setInteractive();
        playAgainText.on("pointerdown",this.playAgain,this);
    }
    playAgain()
    {
        this.scene.start("SceneMain");
    }
    
    update(){

    }
}