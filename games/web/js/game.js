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
        game.load.image('loading','../web/assets/preloader.gif');
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
        game.load.image('bg', '../web/assets/bg.png');
        game.load.image('map', '../web/assets/map.png');
        game.load.image('dot01', '../web/assets/dot01.png');
        game.load.image('dot02', '../web/assets/dot02.png');
        game.load.image('cactus02', '../web/assets/cactus02.png');
        game.load.image('pipi02', '../web/assets/pipi02.png');
        game.load.image('water02', '../web/assets/water02.png');
        game.load.image('moon02', '../web/assets/moon02.png');
        game.load.image('ghost02', '../web/assets/ghost02.png');
        game.load.spritesheet('pipi', '../web/assets/pipi.png', 150, 150, 3);
        game.load.spritesheet('moon', '../web/assets/moon.png', 410, 410, 3);
        game.load.spritesheet('water', '../web/assets/water.png', 150, 150, 3);
        game.load.spritesheet('ghost', '../web/assets/ghost.png', 230, 230, 3);
        game.load.spritesheet('cactus', '../web/assets/cactus.png', 150, 150, 3);
        game.load.audio('bgm', '../games010/assets/bgm.mp3');

    },
    create:function(){
        this.bg = game.add.image(0,0,'bg');
        this.map = game.add.sprite(game.width/2,game.height/2,'map');
        this.map.anchor.setTo(0.5,0.5);
        this.dot01 = game.add.sprite(0,0,'dot01');
        game.add.tween(this.dot01).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.dot02 = game.add.sprite(0,0,'dot02');
        this.dot02.alpha = 0;
        game.add.tween(this.dot02).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 1000, -1, true);


        // game.left.inputEnabled = true;
        // game.left.input.priorityID = 1;
        // game.left.events.onInputDown.add


        this.pipi02 = this.map.addChild(game.add.sprite(-290,-70,'pipi02'));
        this.pipi02.alpha = 0;
        game.add.tween(this.pipi02).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.pipi = this.map.addChild(game.add.button(-290,-70,'pipi',function(){
            setTimeout(function(){
                window.location.href = '../games008/index.html';
            },500);
        },0,2,0));

        this.moon02 = this.map.addChild(game.add.sprite(-80,-410,'moon02'));
        this.moon02.alpha = 0;

        // game.add.tween(this.moon02).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.moon = this.map.addChild(game.add.button(-80,-410,'moon',function(){
            setTimeout(function(){
                window.location.href = '../games010/index.html';
            },500);
        },0,2,0));

        this.water02 = this.map.addChild(game.add.sprite(0,120,'water02'));
        this.water02.alpha = 0;
        game.add.tween(this.water02).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.water = this.map.addChild(game.add.button(0,120,'water',function(){
            setTimeout(function(){
                window.location.href = '../games011/index.html';
            },500);
        },0,2,0));

        this.ghost = this.map.addChild(game.add.sprite(50,-180,'ghost'));
        this.ghost02 = this.map.addChild(game.add.sprite(50,-180,'ghost02'));
        this.ghost02.alpha = 0;
        game.add.tween(this.ghost02).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.ghost = this.map.addChild(game.add.button(50,-180,'ghost',function(){
            setTimeout(function(){
                window.location.href = '../games012/index.html';
            },500);
        },0,2,0));

        this.cactus02 = this.map.addChild(game.add.sprite(-150,-220,'cactus02'));
        this.cactus02.alpha = 0;
        game.add.tween(this.cactus02).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.cactus = this.map.addChild(game.add.button(-150,-220,'cactus',function(){
            setTimeout(function(){
                window.location.href = '../games009/index.html';
            },500);
        },0,2,0));

    },
    update:function(){

    }
}


/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('web',game.State.web);
game.state.start('boot');

/*******************************************/

