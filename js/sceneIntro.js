class SceneIntro extends Phaser.Scene {
    
    constructor(){
        super('SceneIntro');
    }
    preload(){
        this.load.image('intro0', 'images/splash/screen-1.png');//from wuzz game
        this.load.image('intro1', 'images/intro2.png');//from wuzz game
        this.load.image('intro2', 'images/intro3.png');//from wuzz game
    }
    create(){
        console.log("Intro Movie");
        let bg = this.add.image(0,0,"intro0").setOrigin(0,0);
        Align.scaleToGameW(bg,1);
        var width = this.cameras.main.width;

        //global game variables
        game.currentPhrase = 0;
        game.IntroText = Array('Wuzz Wuzz was just enjoying his favorite cereal, "Frooties"...','When they arrived. Some bad hombres who had come to cause trouble.','oh dear');
        game.loadingText = "coming";
        
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });

        var BottomText = this.add.graphics();
        BottomText.fillStyle(0x000000, 0.3);
        BottomText.fillRect(0, this.cameras.main.height-230, this.cameras.main.width, 280);
        BottomText.depth = 100;

        //function to add text
        this.buildText(this.sys.game.currentPhrase);

        game.NextText = this.make.text({
            x: this.cameras.main.width - 80,
            y: this.cameras.main.height - 280,
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            },
            text: "Skip",
            style: {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center', 
                backgroundColor: '#ff00ff'
            }
        });
        game.NextText.setOrigin(0.5,0.5);
        game.NextText.setInteractive();
        game.NextText.on("pointerdown",this.nextSlide,this);
        game.NextText.depth = 100;
    }
    playAgain()
    {
        this.scene.start("SceneMain");
        console.log("skip");
    }
    nextSlide(currentPhrase)
    {
        var curr = this.sys.game.currentPhrase
        if(curr < 2){
            this.sys.game.loadingText.destroy();
            game.currentPhrase ++;
            this.buildText(this.sys.game.currentPhrase);
            let bg = this.add.image(0,0,"intro"+this.sys.game.currentPhrase).setOrigin(0,0);
        }else{
            this.continueOn();
        }
    }
    continueOn(){
        this.sys.game.NextText.destroy();

        var width = this.cameras.main.width;
        var playAgainText = this.make.text({
            x: width / 2,
            y: this.cameras.main.height - 280,
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            },
            text: "Begin Game",
            style: {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center', 
                backgroundColor: '#f60029'
                //fontSize:game.config.width/10,
            }
        });
        playAgainText.setOrigin(0.5,0.5);
        playAgainText.setInteractive();
        playAgainText.on("pointerdown",this.playAgain,this);

    }
    buildText(curr){
        var width = this.cameras.main.width;
        var height = 200;
        this.sys.game.loadingText = this.make.text({
            x: width / 2,
            y: this.cameras.main.height - 200,
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 0
            },
            text: this.sys.game.IntroText[curr],
            style: {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center', 
                wordWrap: { width: this.cameras.main.width }
            }
        });
        this.sys.game.loadingText.setOrigin(0.5, 0.5);
        this.sys.game.loadingText.depth = 100;
    }


    
    update(){

    }
}