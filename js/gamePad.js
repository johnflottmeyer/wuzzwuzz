class GamePad extends UIBlock {
    constructor(config) {
        super();
        this.emitter=EventDispatcher.getInstance();
        this.scene = config.scene;
        this.grid = config.grid;
        let back = this.scene.add.image(-30, 0, "controlBack").setOrigin(0, 0);
        Align.scaleToGameW(back, 1.1);
        this.add(back);
        //
        //
        //
        this.cross = this.scene.add.image(0, 0, 'cross');
        Align.scaleToGameW(this.cross, .15);
        this.grid.placeAtIndex(12, this.cross);
        //
        //
        //
        this.btn1 = this.scene.add.image(0, 0, "redButton");
        Align.scaleToGameW(this.btn1, .1);
        this.grid.placeAtIndex(18, this.btn1);
        //
        //
        //
        this.btn2 = this.scene.add.image(0, 0, "redButton");
        Align.scaleToGameW(this.btn2, .1);
        this.grid.placeAtIndex(20, this.btn2);
        //
        //
        //
        this.btnUp = this.scene.add.image(this.cross.x, this.cross.y - this.cross.displayHeight / 2, "hidden");
        this.btnDown = this.scene.add.image(this.cross.x, this.cross.y + this.cross.displayHeight / 2, "hidden");
        this.btnLeft = this.scene.add.image(this.cross.x - this.cross.displayWidth / 2, this.cross.y, "hidden");
        this.btnRight = this.scene.add.image(this.cross.x + this.cross.displayWidth / 2, this.cross.y, "hidden");
        //
        //
        //
        this.btnUp.setInteractive();
        this.btnDown.setInteractive();
        this.btnLeft.setInteractive();
        this.btnRight.setInteractive();
        this.btn1.setInteractive();
        this.dude.setInteractive();
        this.btn2.setInteractive();
        //
        //
        //
        this.btnUp.on('pointerdown', this.goUp.bind(this));
        this.btnDown.on('pointerdown', this.goDown.bind(this));
        this.btnLeft.on('pointerdown', this.goLeft.bind(this));
        this.btnRight.on('pointerdown', this.goRight.bind(this));
        this.dude.on('pointerdown', this.btn1Pressed.bind(this));
        //this.btn1.on('pointerdown', this.btn1Pressed.bind(this));
        this.btn2.on('pointerdown', this.btn2Pressed.bind(this));
        //
        //
        //
        //
        this.btnUp.alpha = .01;
        this.btnDown.alpha = .01;
        this.btnLeft.alpha = .01;
        this.btnRight.alpha = .01;
        //
        this.add(this.btnUp);
        this.add(this.btnDown);
        this.add(this.btnLeft);
        this.add(this.btnRight);
        this.add(this.btn1);
        this.add(this.btn2);
        this.add(this.cross);
        this.children.forEach(function(child) {
            child.setScrollFactor(0);
        });
    }
    goUp() {
        console.log("go Up");
        this.emitter.emit("CONTROL_PRESSED","GO_UP");
    }
    goDown() {
        console.log("go Down");
        this.emitter.emit("CONTROL_PRESSED","GO_DOWN");
    }
    goLeft() {
        console.log("go left");
        this.emitter.emit("CONTROL_PRESSED","GO_LEFT");
    }
    goRight() {
        console.log("go right");
        this.emitter.emit("CONTROL_PRESSED","GO_RIGHT");
    }
    btn1Pressed() {
        console.log("btn one pressed");
        this.emitter.emit("CONTROL_PRESSED","BTN1");
    }
    btn2Pressed() {
        console.log("btn two pressed");
        this.emitter.emit("CONTROL_PRESSED","BTN2");
    }
}