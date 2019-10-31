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
        // game.load.image('loading','../resume/assets/preloader.gif');
        //行動平台螢幕適應
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forcePortrait = false;
        this.scale.refresh();  
    },   

    create:function(){  
        game.state.start('load');
    }

}

game.State.load={

    preload:function(){
        // var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        // game.load.setPreloadSprite(preloadSprite);
        game.load.image('bg', '../resume/assets/bg.png');
        game.load.image('title', '../resume/assets/title.png');
        game.load.image('light01', '../resume/assets/light01.png');
        game.load.image('light02', '../resume/assets/light02.png');
        game.load.image('joker', '../resume/assets/joker.png');
        game.load.image('info01', '../resume/assets/info01.png');
        game.load.image('info02', '../resume/assets/info02.png');
        game.load.image('infoTitle01', '../resume/assets/infoTitle01.png');
        game.load.image('infoTitle02', '../resume/assets/infoTitle02.png');
        game.load.image('film', '../resume/assets/film.png');
        game.load.image('movie_bg', '../resume/assets/movie_bg.png');
        game.load.image('01', '../resume/assets/01.png');
        game.load.image('02', '../resume/assets/02.png');
        game.load.image('03', '../resume/assets/03.png');
        game.load.image('04', '../resume/assets/04.png');
        game.load.image('05', '../resume/assets/05.png');
        game.load.image('06', '../resume/assets/06.png');
        game.load.image('07', '../resume/assets/07.png');
        game.load.image('08', '../resume/assets/08.png');
        game.load.image('09', '../resume/assets/09.png');
        game.load.image('10', '../resume/assets/10.png');
        game.load.image('11', '../resume/assets/11.png');
        game.load.image('12', '../resume/assets/12.png');
        game.load.spritesheet('movie_ai', '../resume/assets/movie_ai_sprite.png', 350, 220, 2);
        game.load.spritesheet('movie_ps', '../resume/assets/movie_ps_sprite.png', 350, 220, 2);
        game.load.spritesheet('movie_sai', '../resume/assets/movie_sai_sprite.png', 350, 220, 2);
        game.load.spritesheet('infoBtn01', '../resume/assets/infoBtn01.png', 110, 50, 2);
        game.load.spritesheet('infoBtn02', '../resume/assets/infoBtn02.png', 110, 50, 2);
        game.load.spritesheet('cancel', '../resume/assets/cancel.png', 60, 60, 2);
        game.load.spritesheet('pageL', '../resume/assets/pageL.png', 50, 80, 2);
        game.load.spritesheet('pageR', '../resume/assets/pageR.png', 50, 80, 2);
        game.load.spritesheet('buttonA', '../resume/assets/buttonA.png', 130, 130, 2);
        game.load.spritesheet('buttonB', '../resume/assets/buttonB.png', 130, 130, 2);
        game.load.spritesheet('buttonC', '../resume/assets/buttonC.png', 130, 130, 2);
        // game.load.audio('bgm', '../resume/assets/bgm.mp3');
        // game.load.audio('enter', '../resume/assets/enter.mp3');

    },
    create:function(){  
        game.state.start('web');
    }
}


game.State.web={

    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.joker = game.add.image(0,0,'joker');
        this.info01 = game.add.image(game.width/2,740,'info01');
        this.info02 = game.add.image(game.width/2,740,'info02');
        this.infoBtn01 = game.add.button(83,637,'infoBtn01',function(){
            this.info01.alpha = 1;
            this.infoBtn01.alpha = 0;
            this.infoTitle01.alpha = 1;
            this.info02.alpha = 0;
            this.infoBtn02.alpha = 1;
            this.infoTitle02.alpha = 0;
        },this,1,1,0);
        this.infoBtn02 = game.add.button(180,637,'infoBtn02',function(){
            this.info01.alpha = 0;
            this.infoBtn01.alpha = 1;
            this.infoTitle01.alpha = 0;
            this.info02.alpha = 1;
            this.infoBtn02.alpha = 0;
            this.infoTitle02.alpha = 1;
        },this,1,1,0);
        this.infoTitle01 = game.add.image(83,637,'infoTitle01');
        this.infoTitle02 = game.add.image(180,637,'infoTitle02');
        this.info01.anchor.setTo(0.5);
        this.info02.anchor.setTo(0.5);
        this.info01.alpha = 1;
        this.infoBtn01.alpha = 0;
        this.infoTitle01.alpha = 1;
        this.info02.alpha = 0;
        this.infoBtn02.alpha = 1;
        this.infoTitle02.alpha = 0;
        // 閃亮亮01
        this.light01 = game.add.sprite(0,0,'light01');
        game.add.tween(this.light01).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 閃亮亮02
        this.light02 = game.add.sprite(0,0,'light02');
        this.light02.alpha = 0;
        game.add.tween(this.light02).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 標題
        this.title = game.add.image(0,-10,'title');
        // 按鈕們
        this.buttonA = game.add.button(110,820,'buttonA',this.pageA,this,1,1,1);
        this.buttonB = game.add.button(250,820,'buttonB',this.pageB,this,1,0,1);
        this.buttonC = game.add.button(390,820,'buttonC',this.pageC,this,1,0,1);
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
        // game.state.start('games');
        window.location.href = '../games/index.html';
    },
}

game.State.works = {
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.film = game.add.image(0,0,'film');

        // 閃亮亮01
        this.light01 = game.add.sprite(0,0,'light01');
        game.add.tween(this.light01).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 閃亮亮02
        this.light02 = game.add.sprite(0,0,'light02');
        this.light02.alpha = 0;
        game.add.tween(this.light02).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 作品按鈕們
        this.ai = game.add.button(game.width/2,game.height/2-195,'movie_ai',this.pageAi,this,1,0,1);
        this.ps = game.add.button(game.width/2,game.height/2+36,'movie_ps',this.pagePs,this,1,0,1);
        this.sai = game.add.button(game.width/2,game.height/2+266,'movie_sai',this.pageSai,this,1,0,1);
        this.ai.anchor.setTo(0.5);
        this.ps.anchor.setTo(0.5);
        this.sai.anchor.setTo(0.5);
        // 標題
        this.title = game.add.image(0,-10,'title');
        // 按鈕們
        this.buttonA = game.add.button(110,820,'buttonA',this.pageA,this,1,0,1);
        this.buttonB = game.add.button(250,820,'buttonB',this.pageB,this,1,1,1);
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
        // game.state.start('games');
        window.location.href = '../games/index.html';
    },
    pageAi:function(){
        game.state.start('works_ai');
    },
    pagePs:function(){
        game.state.start('works_ps');
    },
    pageSai:function(){
        game.state.start('works_sai');
    },
}

game.State.works_ai={
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'movie_bg');
        this.picpage = 0;
        this.page0 = game.add.image(0,0,'01');
        this.page1 = game.add.image(0,0,'02');
        this.page2 = game.add.image(0,0,'03');
        this.page3 = game.add.image(0,0,'04');
        this.page0.alpha = 0;
        this.page1.alpha = 0;
        this.page2.alpha = 0;
        this.page3.alpha = 0;

        // 取消按鈕
        this.cancel = game.add.button(550,30,'cancel',this.pageB,this,1,0,1);
        // 切頁按鈕
        this.L = game.add.button(game.width/2-70,850,'pageL',this.paintWorksL,this,0,1,0,1);
        this.R = game.add.button(game.width/2+70,850,'pageR',this.paintWorksR,this,1,0,1,0);
        this.L.anchor.setTo(0.5);
        this.R.anchor.setTo(0.5);
    },
    update:function(){
        if(this.picpage === 0){
            this.page0.alpha = 1;
            this.page1.alpha = 0;
            this.page2.alpha = 0;
            this.page3.alpha = 0;
        }
        if(this.picpage === 1){
            this.page0.alpha = 0;
            this.page1.alpha = 1;
            this.page2.alpha = 0;
            this.page3.alpha = 0;
        }
        if(this.picpage === 2){
            this.page0.alpha = 0;
            this.page1.alpha = 0;
            this.page2.alpha = 1;
            this.page3.alpha = 0;
        }
        if(this.picpage === 3){
            this.page0.alpha = 0;
            this.page1.alpha = 0;
            this.page2.alpha = 0;
            this.page3.alpha = 1;
        }

    },
    pageB:function(){
        game.state.start('works');
    },
    paintWorksL:function(){
        this.picpage--;
        if(this.picpage<0){
            this.picpage = 0;
        }
        console.log('左');
    },
    paintWorksR:function(){
        this.picpage++;
        if(this.picpage>3){
            this.picpage = 3;
        }
        console.log('右');
    }
}
game.State.works_ps={
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'movie_bg');
        this.picpage = 0;
        this.page0 = game.add.image(0,0,'05');
        this.page1 = game.add.image(0,0,'06');
        this.page2 = game.add.image(0,0,'07');
        this.page3 = game.add.image(0,0,'08');
        this.page0.alpha = 0;
        this.page1.alpha = 0;
        this.page2.alpha = 0;
        this.page3.alpha = 0;

        // 取消按鈕
        this.cancel = game.add.button(550,30,'cancel',this.pageB,this,1,0,1);
        // 切頁按鈕
        this.L = game.add.button(game.width/2-70,850,'pageL',this.paintWorksL,this,0,1,0,1);
        this.R = game.add.button(game.width/2+70,850,'pageR',this.paintWorksR,this,1,0,1,0);
        this.L.anchor.setTo(0.5);
        this.R.anchor.setTo(0.5);
    },
    update:function(){
        if(this.picpage === 0){
            this.page0.alpha = 1;
            this.page1.alpha = 0;
            this.page2.alpha = 0;
            this.page3.alpha = 0;
        }
        if(this.picpage === 1){
            this.page0.alpha = 0;
            this.page1.alpha = 1;
            this.page2.alpha = 0;
            this.page3.alpha = 0;
        }
        if(this.picpage === 2){
            this.page0.alpha = 0;
            this.page1.alpha = 0;
            this.page2.alpha = 1;
            this.page3.alpha = 0;
        }
        if(this.picpage === 3){
            this.page0.alpha = 0;
            this.page1.alpha = 0;
            this.page2.alpha = 0;
            this.page3.alpha = 1;
        }

    },
    pageB:function(){
        game.state.start('works');
    },
    paintWorksL:function(){
        this.picpage--;
        if(this.picpage<0){
            this.picpage = 0;
        }
        console.log('左');
    },
    paintWorksR:function(){
        this.picpage++;
        if(this.picpage>3){
            this.picpage = 3;
        }
        console.log('右');
    }
}
game.State.works_sai={
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'movie_bg');
        this.picpage = 0;
        this.page0 = game.add.image(0,0,'09');
        this.page1 = game.add.image(0,0,'10');
        this.page2 = game.add.image(0,0,'11');
        // this.page3 = game.add.image(0,0,'12');
        this.page0.alpha = 0;
        this.page1.alpha = 0;
        this.page2.alpha = 0;
        // this.page3.alpha = 0;

        // 取消按鈕
        this.cancel = game.add.button(550,30,'cancel',this.pageB,this,1,0,1);
        // 切頁按鈕
        this.L = game.add.button(game.width/2-70,850,'pageL',this.paintWorksL,this,0,1,0,1);
        this.R = game.add.button(game.width/2+70,850,'pageR',this.paintWorksR,this,1,0,1,0);
        this.L.anchor.setTo(0.5);
        this.R.anchor.setTo(0.5);
    },
    update:function(){
        if(this.picpage === 0){
            this.page0.alpha = 1;
            this.page1.alpha = 0;
            this.page2.alpha = 0;
            // this.page3.alpha = 0;
        }
        if(this.picpage === 1){
            this.page0.alpha = 0;
            this.page1.alpha = 1;
            this.page2.alpha = 0;
            // this.page3.alpha = 0;
        }
        if(this.picpage === 2){
            this.page0.alpha = 0;
            this.page1.alpha = 0;
            this.page2.alpha = 1;
            // this.page3.alpha = 0;
        }
        // if(this.picpage === 3){
        //     this.page0.alpha = 0;
        //     this.page1.alpha = 0;
        //     this.page2.alpha = 0;
        //     // this.page3.alpha = 1;
        // }

    },
    pageB:function(){
        game.state.start('works');
    },
    paintWorksL:function(){
        this.picpage--;
        if(this.picpage<0){
            this.picpage = 0;
        }
        console.log('左');
    },
    paintWorksR:function(){
        this.picpage++;
        if(this.picpage>2){
            this.picpage = 2;
        }
        console.log('右');
    }
}




game.State.games = {
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.joker = game.add.image(0,0,'joker');
        // 閃亮亮01
        this.light01 = game.add.sprite(0,0,'light01');
        game.add.tween(this.light01).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 閃亮亮02
        this.light02 = game.add.sprite(0,0,'light02');
        this.light02.alpha = 0;
        game.add.tween(this.light02).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
        //標題
        this.title = game.add.image(0,-10,'title');
        //按鈕們
        this.buttonA = game.add.button(110,820,'buttonA',this.pageA,this,1,0,1);
        this.buttonB = game.add.button(250,820,'buttonB',this.pageB,this,1,0,1);
        this.buttonc = game.add.button(390,820,'buttonC',this.pageC,this,1,1,1);
        window.location.href = '../games/index.html';
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
        // game.state.start('games');
        window.location.href = '../games/index.html';
    },
}

/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('load',game.State.load);
game.state.add('web',game.State.web);
game.state.add('works',game.State.works);
game.state.add('works_ai',game.State.works_ai);
game.state.add('works_ps',game.State.works_ps);
game.state.add('works_sai',game.State.works_sai);
game.state.add('games',game.State.games);
game.state.start('boot');

/*******************************************/

