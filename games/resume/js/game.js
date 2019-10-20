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
        game.load.image('loading','../resume/assets/preloader.gif');
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


game.State.web={

    preload:function(){
        var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('bg', '../resume/assets/bg.png');
        game.load.image('title', '../resume/assets/title.png');
        game.load.image('light01', '../resume/assets/light01.png');
        game.load.image('light02', '../resume/assets/light02.png');
        game.load.spritesheet('cancel', '../resume/assets/cancel.png', 60, 60, 2);
        game.load.spritesheet('pageL', '../resume/assets/pageL.png', 50, 80, 2);
        game.load.spritesheet('pageR', '../resume/assets/pageR.png', 50, 80, 2);
        game.load.spritesheet('light', '../resume/assets/light.png', 640, 960, 2);
        game.load.spritesheet('buttonA', '../resume/assets/buttonA.png', 130, 130, 2);
        game.load.spritesheet('buttonB', '../resume/assets/buttonB.png', 130, 130, 2);
        game.load.spritesheet('buttonC', '../resume/assets/buttonC.png', 130, 130, 2);
        game.load.audio('bgm', '../resume/assets/bgm.mp3');
        game.load.audio('enter', '../resume/assets/enter.mp3');

    },
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.title = game.add.image(0,0,'title');
        // 閃亮亮01
        this.light01 = game.add.sprite(0,0,'light01');
        game.add.tween(this.light01).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 閃亮亮02
        this.light02 = game.add.sprite(0,0,'light02');
        this.light02.alpha = 0;
        game.add.tween(this.light02).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        //按鈕們
        this.buttonA = game.add.button(110,820,'buttonA',this.pageA,this,0,1,0);
        this.buttonB = game.add.button(250,820,'buttonB',this.pageB,this,1,0,1);
        this.buttonc = game.add.button(390,820,'buttonC',this.pageC,this,1,0,1);
    },

    // 聲音播放
    soundFx: function(name,value,loopFlag){
        var soundFx = game.add.audio(name, value, loopFlag);
        try{
            soundFx.play();
        }catch(e){}
    },
    pageA:function(){
        game.state.start('web');
    },
    pageB:function(){
        game.state.start('works');
    },
    pageC:function(){
        game.state.start('games');
    },
}

game.State.works = {
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.title = game.add.image(0,0,'title');
        // 閃亮亮01
        this.light01 = game.add.sprite(0,0,'light01');
        game.add.tween(this.light01).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 閃亮亮02
        this.light02 = game.add.sprite(0,0,'light02');
        this.light02.alpha = 0;
        game.add.tween(this.light02).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        //按鈕們
        this.buttonA = game.add.button(100,850,'buttonA',this.pageA,this,1,0,1);
        this.buttonB = game.add.button(200,850,'buttonB',this.pageB,this,1,0,1);
        this.buttonc = game.add.button(300,850,'buttonC',this.pageC,this,1,0,1);
    },
    // 聲音播放
    soundFx: function(name,value,loopFlag){
        var soundFx = game.add.audio(name, value, loopFlag);
        try{
            soundFx.play();
        }catch(e){}
    },
    pageA:function(){
        game.state.start('web');
    },
    pageB:function(){
        game.state.start('works');
    },
    pageC:function(){
        game.state.start('games');
    },
}

game.State.games = {
    create:function(){
        
    },
    // 聲音播放
    soundFx: function(name,value,loopFlag){
        var soundFx = game.add.audio(name, value, loopFlag);
        try{
            soundFx.play();
        }catch(e){}
    },
    pageA:function(){
        game.state.start('web');
    },
    pageB:function(){
        game.state.start('works');
    },
    pageC:function(){
        game.state.start('games');
    },
}

/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('web',game.State.web);
game.state.add('works',game.State.works);
game.state.add('games',game.State.games);
game.state.start('boot');

/*******************************************/

