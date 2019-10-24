/****************** 可連結資料庫變更的變數 ********************/




/******** 條件 *********/

/**********************/

// 文字樣式
var style = {fill: '#ffb64d', font: "120px Bountifl"};
var style2 = {fill: '#ffb64d', font: "48px Bountifl"};
var tStyle = {fill: '#ffb64d', font: "42px YARDSALE"};

// 遊戲主畫布
var width = 640;
var height = 960;
var game =new Phaser.Game(width, height, Phaser.CANVAS, 'game');

/******** 遊戲物件 ********/
// 遊戲階段
game.State={};

/************************/


// boot state 對遊戲進行設置
game.State.boot={

    preload:function(){
        game.load.image('loading','../gameIsland/assets/preloader.gif');
        //行動平台螢幕適應
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forcePortrait = false;
        this.scale.refresh();  
    },   

    create:function(){  
        game.state.start('web');
    }

}

// 預載遊戲資材
game.State.web={
    preload:function(){
        var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('bg','assets/bg.png');
        game.load.image('map', 'assets/map.png');
        game.load.image('dot01', 'assets/dot01.png');
        game.load.image('dot02', 'assets/dot02.png');
        game.load.image('cactusBtn', 'assets/cactusBtn.png');
        game.load.image('pipiBtn', 'assets/pipiBtn.png');
        game.load.image('waterBtn', 'assets/waterBtn.png');
        game.load.image('moonBtn', 'assets/moonBtn.png');
        game.load.image('ghostBtn', 'assets/ghostBtn.png');
        game.load.audio('bgm', 'assets/bgm.mp3');
        game.load.audio('enter', 'assets/enter.mp3');

    },
    create:function(){

        // 背景音樂
        // this.soundFx('bgm',0.5,true);
        
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.map = game.add.sprite(game.width/2,game.height/2,'map');
        this.map.anchor.setTo(0.5,0.5);
        // 閃亮亮點點01
        this.dot01 = game.add.sprite(0,0,'dot01');
        game.add.tween(this.dot01).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 閃亮亮點點02
        this.dot02 = game.add.sprite(0,0,'dot02');
        this.dot02.alpha = 0;
        game.add.tween(this.dot02).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, -1, true);

        // pipi
        this.pipiBtn = this.map.addChild(game.add.sprite(-215,5,'pipiBtn'));
        this.pipiBtn.inputEnabled = true;
        this.pipiBtn.input.priorityID = 1;
        this.pipiBtn.input.useHandCursor = true;// 手指指標
        this.pipiBtn.anchor.setTo(0.5);
        this.pipiBtn.scale.setTo(0.8);
        this.pipiBtnTween = game.add.tween(this.pipiBtn.scale).to({x:0.85,y:0.85}, 800, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.pipiBtn.events.onInputDown.add(function(){
            this.soundFx('enter',0.5,false);
            this.pipiBtnTween.stop();
            this.cactusBtn.inputEnabled = false;
            this.moonBtn.inputEnabled = false;
            this.waterBtn.inputEnabled = false;
            this.ghostBtn.inputEnabled = false;
            this.cactusBtnTween.stop();
            this.moonBtnTween.stop();
            // this.waterBtnTween.stop();
            this.ghostBtnTween.stop();
            var pipiBtnTween = game.add.tween(this.pipiBtn.scale).to({x:1,y:1}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
            var pipiBtnTween = game.add.tween(this.pipiBtn).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            pipiBtnTween.onComplete.add(function(){
                window.location.href = '../games008/index.html';
            },this);
        },this);

        // cactus
        this.cactusBtn = this.map.addChild(game.add.sprite(-75,-145,'cactusBtn'));
        this.cactusBtn.inputEnabled = true;
        this.cactusBtn.input.priorityID = 2;
        this.cactusBtn.input.useHandCursor = true;// 手指指標
        this.cactusBtn.anchor.setTo(0.5);
        this.cactusBtn.scale.setTo(0.8);
        this.cactusBtnTween = game.add.tween(this.cactusBtn.scale).to({x:0.85,y:0.85}, 800, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.cactusBtn.events.onInputDown.add(function(){
            this.soundFx('enter',0.5,false);
            this.cactusBtnTween.stop();
            this.pipiBtn.inputEnabled = false;
            this.moonBtn.inputEnabled = false;
            this.waterBtn.inputEnabled = false;
            this.ghostBtn.inputEnabled = false;
            this.pipiBtnTween.stop();
            this.moonBtnTween.stop();
            // this.waterBtnTween.stop();
            this.ghostBtnTween.stop();
            var cactusBtnTween = game.add.tween(this.cactusBtn.scale).to({x:1,y:1}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
            var cactusBtnTween = game.add.tween(this.cactusBtn).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            cactusBtnTween.onComplete.add(function(){
                window.location.href = '../games009/index.html';
            },this);
        },this);

        // moon
        this.moonBtn = this.map.addChild(game.add.sprite(125,-205,'moonBtn'));
        this.moonBtn.inputEnabled = true;
        this.moonBtn.input.priorityID = 1;
        this.moonBtn.input.useHandCursor = true;// 手指指標
        this.moonBtn.anchor.setTo(0.5);
        this.moonBtn.scale.setTo(0.8);
        this.moonBtnTween = game.add.tween(this.moonBtn.scale).to({x:0.9,y:0.9}, 800, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.moonBtn.events.onInputDown.add(function(){
            this.soundFx('enter',0.5,false);
            this.moonBtnTween.stop();
            this.pipiBtn.inputEnabled = false;
            this.cactusBtn.inputEnabled = false;
            this.waterBtn.inputEnabled = false;
            this.ghostBtn.inputEnabled = false;
            this.pipiBtnTween.stop();
            this.cactusBtnTween.stop();
            // this.waterBtnTween.stop();
            this.ghostBtnTween.stop();
            var moonBtnTween = game.add.tween(this.moonBtn.scale).to({x:1.1,y:1.1}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
            var moonBtnTween = game.add.tween(this.moonBtn).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            moonBtnTween.onComplete.add(function(){
                window.location.href = '../games010/index.html';
            },this);
        },this);


        // water
        this.waterBtn = this.map.addChild(game.add.sprite(75,195,'waterBtn'));
        // this.waterBtn.inputEnabled = true;
        // this.waterBtn.input.priorityID = 1;
        // this.waterBtn.input.useHandCursor = true;// 手指指標
        this.waterBtn.anchor.setTo(0.5);
        this.waterBtn.scale.setTo(0.8);
        // this.waterBtnTween = game.add.tween(this.waterBtn.scale).to({x:0.9,y:0.9}, 800, Phaser.Easing.Linear.None, true, 0, -1, true);
        // this.waterBtn.events.onInputDown.add(function(){
        //     this.soundFx('enter',0.5,false);
        //     this.waterBtnTween.stop();
        //     this.pipiBtn.inputEnabled = false;
        //     this.cactusBtn.inputEnabled = false;
        //     this.moonBtn.inputEnabled = false;
        //     this.ghostBtn.inputEnabled = false;
        //     this.pipiBtnTween.stop();
        //     this.cactusBtnTween.stop();
        //     this.moonBtnTween.stop();
        //     this.ghostBtnTween.stop();
        //     var waterBtnTween = game.add.tween(this.waterBtn.scale).to({x:1.1,y:1.1}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
        //     var waterBtnTween = game.add.tween(this.waterBtn).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
        //     waterBtnTween.onComplete.add(function(){
        //         window.location.href = '../games011/index.html';
        //     },this);
        // },this);

        // ghost
        this.ghostBtn = this.map.addChild(game.add.sprite(165,-65,'ghostBtn'));
        this.ghostBtn.inputEnabled = true;
        this.ghostBtn.input.priorityID = 1;
        this.ghostBtn.input.useHandCursor = true;// 手指指標
        this.ghostBtn.anchor.setTo(0.5);
        this.ghostBtn.scale.setTo(0.8);
        this.ghostBtnTween = game.add.tween(this.ghostBtn.scale).to({x:0.85,y:0.85}, 800, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.ghostBtn.events.onInputDown.add(function(){
            this.soundFx('enter',0.5,false);
            this.ghostBtnTween.stop();
            this.pipiBtn.inputEnabled = false;
            this.cactusBtn.inputEnabled = false;
            this.moonBtn.inputEnabled = false;
            this.waterBtn.inputEnabled = false;
            this.pipiBtnTween.stop();
            this.cactusBtnTween.stop();
            this.moonBtnTween.stop();
            // this.waterBtnTween.stop();
            var ghostBtnTween = game.add.tween(this.ghostBtn.scale).to({x:1,y:1}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
            var ghostBtnTween = game.add.tween(this.ghostBtn).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            ghostBtnTween.onComplete.add(function(){
                window.location.href = '../games012/index.html';
            },this);
        },this);
    },
    update:function(){

    },
    // 聲音播放
    soundFx: function(name,value,loopFlag){
        var soundFx = game.add.audio(name, value, loopFlag);
        try{
            soundFx.play();
        }catch(e){}
    },
}


/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('web',game.State.web);
game.state.start('boot');

/*******************************************/

