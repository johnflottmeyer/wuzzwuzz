class SceneOver extends Phaser.Scene {
    constructor(){
        super('SceneMain');
    }
    preload(){

    }
    create(){
        console.log("Ready!");
        //add some background images here. 
        var gameOverText=this.add.text(0,0."Game Over",{color:'#fffff',fontSize:game.config.width/20});
    }
    update(){}
}