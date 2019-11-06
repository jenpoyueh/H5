//JavaScript實現監聽移動端上下左右滑動事件 https://www.itread01.com/content/1547211091.html
var picpage = 0;
var tap = true;
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if(element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if(element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    /**
     * 監聽觸控的方向
     * @param target            要繫結監聽的目標元素
     * @param isPreventDefault  是否遮蔽掉觸控滑動的預設行為（例如頁面的上下滾動，縮放等）
     * @param upCallback        向上滑動的監聽回撥（若不關心，可以不傳，或傳false）
     * @param rightCallback     向右滑動的監聽回撥（若不關心，可以不傳，或傳false）
     * @param downCallback      向下滑動的監聽回撥（若不關心，可以不傳，或傳false）
     * @param leftCallback      向左滑動的監聽回撥（若不關心，可以不傳，或傳false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;
        function handleTouchEvent(event) {
            switch (event.type){
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].pageX - startX;
                    var spanY = event.changedTouches[0].pageY - startY;

                    if(Math.abs(spanX) > Math.abs(spanY)){      //認定為水平方向滑動
                        if(spanX > 30){         //向右
                            if(rightCallback)
                                rightCallback();
                        } else if(spanX < -30){ //向左
                            if(leftCallback)
                                leftCallback();
                        }
                    } else {                                    //認定為垂直方向滑動
                        if(spanY > 30){         //向下
                            if(downCallback)
                                downCallback();
                        } else if (spanY < -30) {//向上
                            if(upCallback)
                                upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    //阻止預設行為
                    // if(isPreventDefault)
                    //     event.preventDefault();
                    break;
            }
        }
    }
};

/**********************/

// 遊戲主畫布
var width = 640;
var height = 960;
var game =new Phaser.Game(width, height, Phaser.CANVAS, 'game');
EventUtil.listenTouchDirection(document, true, false,function(){
        tap = true;
        picpage--;
        console.log('滑右');
    }, false,function(){
        tap = true;
        picpage++;
        console.log('滑左');
    },
);

/******** 遊戲物件 ********/

// 遊戲階段
game.State={};

/************************/


// boot state 對遊戲進行設置
game.State.boot={

    preload:function(){
        // game.load.image('loading','../resume/assets/preloader.gif');
        //行動平台螢幕適應
        Phaser.Canvas.setTouchAction(game.canvas, 'auto');
        game.input.touch.preventDefault = false;
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
        game.load.image('btn01', '../resume/assets/btn01.png');
        game.load.image('btn02', '../resume/assets/btn02.png');
        game.load.image('light01', '../resume/assets/light01.png');
        game.load.image('light02', '../resume/assets/light02.png');
        game.load.image('lightdot', '../resume/assets/lightdot.png');
        game.load.image('joker', '../resume/assets/joker.png');
        game.load.image('info01', '../resume/assets/info01.png');
        game.load.image('info02', '../resume/assets/info02.png');
        game.load.image('info03', '../resume/assets/info03.png');
        game.load.image('exp', '../resume/assets/exp.png');
        game.load.image('infoTitle01', '../resume/assets/infoTitle01.png');
        game.load.image('infoTitle02', '../resume/assets/infoTitle02.png');
        game.load.image('infoTitle03', '../resume/assets/infoTitle03.png');
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
        game.load.image('13', '../resume/assets/13.png');
        game.load.image('14', '../resume/assets/14.png');
        game.load.image('15', '../resume/assets/15.png');
        game.load.image('16', '../resume/assets/16.png');
        game.load.image('titleBgText', '../resume/assets/titleBgText.png');
        game.load.image('titlePaintText', '../resume/assets/titlePaintText.png');
        game.load.image('titleGameText', '../resume/assets/titleGameText.png');
        game.load.spritesheet('movie_ai', '../resume/assets/movie_ai_sprite.png', 350, 220, 2);
        game.load.spritesheet('movie_ps', '../resume/assets/movie_ps_sprite.png', 350, 220, 2);
        game.load.spritesheet('movie_sai', '../resume/assets/movie_sai_sprite.png', 350, 220, 2);
        game.load.spritesheet('infoBtn01', '../resume/assets/infoBtn01.png', 110, 50, 2);
        game.load.spritesheet('infoBtn02', '../resume/assets/infoBtn02.png', 110, 50, 2);
        game.load.spritesheet('infoBtn03', '../resume/assets/infoBtn03.png', 110, 50, 2);
        game.load.spritesheet('infobtn', '../resume/assets/infobtn.png', 130, 70, 2);
        game.load.spritesheet('expbtn', '../resume/assets/expbtn.png', 130, 70, 2);
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
        var infoY = 730;
        var infoTitleY = 623;
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.joker = game.add.image(0,0,'joker');
        // 光點閃爍
        this.lightdot = game.add.sprite(0,0,'lightdot');
        this.lightdot.alpha = 0;
        game.add.tween(this.lightdot).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, -1, true);
        // 資訊版與按鈕
        this.info=game.add.sprite(0,0);
        this.info.alpha = 0;
        this.exp = game.add.image(game.width/2,infoY,'exp')
        this.exp.anchor.setTo(0.5);
        this.exp.alpha = 0;
        this.info01 =this.info.addChild(game.add.image(game.width/2,infoY,'info01'));
        this.info02 = this.info.addChild(game.add.image(game.width/2,infoY,'info02'));
        this.info03 = this.info.addChild(game.add.image(game.width/2,infoY,'info03'));
        this.infoBtn01 = this.info.addChild(game.add.button(86,infoTitleY,'infoBtn01',function(){
            this.info01.alpha = 1;
            this.infoBtn01.alpha = 0;
            this.infoTitle01.alpha = 1;
            this.info02.alpha = 0;
            this.infoBtn02.alpha = 1;
            this.infoTitle02.alpha = 0;
            this.info03.alpha = 0;
            this.infoBtn03.alpha = 1;
            this.infoTitle03.alpha = 0;
        },this,1,1,0));
        this.infoBtn02 = this.info.addChild(game.add.button(183,infoTitleY,'infoBtn02',function(){
            this.info01.alpha = 0;
            this.infoBtn01.alpha = 1;
            this.infoTitle01.alpha = 0;
            this.info02.alpha = 1;
            this.infoBtn02.alpha = 0;
            this.infoTitle02.alpha = 1;
            this.info03.alpha = 0;
            this.infoBtn03.alpha = 1;
            this.infoTitle03.alpha = 0;
        },this,1,1,0));
        this.infoBtn03 = this.info.addChild(game.add.button(280,infoTitleY,'infoBtn03',function(){
            this.info01.alpha = 0;
            this.infoBtn01.alpha = 1;
            this.infoTitle01.alpha = 0;
            this.info02.alpha = 0;
            this.infoBtn02.alpha = 1;
            this.infoTitle02.alpha = 0;
            this.info03.alpha = 1;
            this.infoBtn03.alpha = 0;
            this.infoTitle03.alpha = 1;
        },this,1,1,0));
        this.infoBtn01.inputEnabled = false;
        this.infoBtn02.inputEnabled = false;
        this.infoBtn03.inputEnabled = false;
        this.infoTitle01 = this.info.addChild(game.add.image(86,infoTitleY,'infoTitle01'));
        this.infoTitle02 = this.info.addChild(game.add.image(183,infoTitleY,'infoTitle02'));
        this.infoTitle03 = this.info.addChild(game.add.image(280,infoTitleY,'infoTitle03'));
        this.info01.anchor.setTo(0.5);
        this.info02.anchor.setTo(0.5);
        this.info03.anchor.setTo(0.5);
        this.info01.alpha = 1;
        this.infoBtn01.alpha = 0;
        this.infoTitle01.alpha = 1;
        this.info02.alpha = 0;
        this.infoBtn02.alpha = 1;
        this.infoTitle02.alpha = 0;
        this.info03.alpha = 0;
        this.infoBtn03.alpha = 1;
        this.infoTitle03.alpha = 0;

        this.infobtn02 = game.add.button(440,220,'infobtn',function(){
            this.infobtn02.alpha=0;
            this.infobtn01.alpha=1;
            game.add.tween(this.info).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                this.infoBtn01.inputEnabled = false;
                this.infoBtn02.inputEnabled = false;
                this.infoBtn03.inputEnabled = false;
                this.infobtn02.input.priorityID = 1;
                this.infobtn01.input.priorityID = 2;
            },this);
        },this,1,1,0);            

        this.expbtn02 = game.add.button(440,310,'expbtn',function(){
            this.expbtn02.alpha=0;
            this.expbtn01.alpha=1;
            game.add.tween(this.exp).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                this.expbtn02.input.priorityID = 1;
                this.expbtn01.input.priorityID = 2;
            },this);
        },this,1,1,0);

        this.infobtn01 = game.add.button(440,220,'infobtn',function(){
            this.infobtn01.alpha=0;
            this.infobtn02.alpha=1;
            this.expbtn02.alpha=0;
            this.expbtn01.alpha=1;
            game.add.tween(this.exp).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                this.expbtn02.input.priorityID = 1;
                this.expbtn01.input.priorityID = 2;
            },this);
            game.add.tween(this.info).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                this.infoBtn01.inputEnabled = true;
                this.infoBtn02.inputEnabled = true;
                this.infoBtn03.inputEnabled = true;
                this.infobtn01.input.priorityID = 1;
                this.infobtn02.input.priorityID = 2;
            },this);
        },this,0,0,1);

        this.expbtn01 = game.add.button(440,310,'expbtn',function(){
            this.expbtn01.alpha=0;
            this.expbtn02.alpha=1;
            this.infobtn02.alpha=0;
            this.infobtn01.alpha=1;
            game.add.tween(this.info).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                this.infoBtn01.inputEnabled = false;
                this.infoBtn02.inputEnabled = false;
                this.infoBtn03.inputEnabled = false;
                this.infobtn02.input.priorityID = 1;
                this.infobtn01.input.priorityID = 2;
            },this);
            game.add.tween(this.exp).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                this.expbtn02.input.priorityID = 2;
                this.expbtn01.input.priorityID = 1;
            },this);
        },this,0,0,1);

        this.infobtn02.input.priorityID = 1;
        this.expbtn02.input.priorityID = 1;
        this.infobtn01.input.priorityID = 2;
        this.expbtn01.input.priorityID = 2;

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
        this.buttonA.kill();
        this,btn01 = game.add.image(110,820,'btn01');
        setTimeout(function(){
            window.location.href = '../games/index.html';
        },500);
    },
}

game.State.works = {
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'bg');
        this.film = game.add.image(0,0,'film');
        // this.input.touch.preventDefault = false;
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
        this.buttonB.kill();
        this,btn02 = game.add.image(250,820,'btn02');
        setTimeout(function(){
            window.location.href = '../games/index.html';
        },500);
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
        this.titlePaintText = game.add.image(game.width/2,85,'titlePaintText');
        this.titleGameText = game.add.image(game.width/2,85,'titleGameText');
        this.titlePaintText.anchor.setTo(0.5);
        this.titleGameText.anchor.setTo(0.5);
        this.titlePaintText.alpha = 0;
        this.titleGameText.alpha = 0;
        picpage = 0;
        this.page0 = game.add.image(0,0,'01');
        this.page1 = game.add.image(0,0,'02');
        this.page2 = game.add.image(0,0,'03');
        this.page3 = game.add.image(0,0,'04');
        this.page4 = game.add.image(0,0,'12');
        this.page5 = game.add.image(0,0,'13');
        tap = true;
        this.page0.alpha = 0;
        this.page1.alpha = 0;
        this.page2.alpha = 0;
        this.page3.alpha = 0;
        this.page4.alpha = 0;
        this.page5.alpha = 0;
        this.page1.x = game.width;
        this.page2.x = game.width;
        this.page3.x = game.width;
        this.page4.x = game.width;
        this.page5.x = game.width;
        // this.input.touch.preventDefault = false;
        // 取消按鈕
        this.cancel = game.add.button(550,55,'cancel',this.pageB,this,1,0,1);
        // 切頁按鈕
        this.L = game.add.button(game.width/2-70,850,'pageL',this.paintWorksL,this,0,1,0,1);
        this.R = game.add.button(game.width/2+70,850,'pageR',this.paintWorksR,this,1,0,1,0);
        this.L.anchor.setTo(0.5);
        this.R.anchor.setTo(0.5);
    },
    update:function(){
        if(picpage<0){
            picpage = 0;
        }
        if(picpage>5){
            picpage = 5;
        }
        console.log(picpage);
        if(picpage === 0 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 1 && tap === true){
            tap = false;
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 2 && tap === true){
            tap = false;
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 3 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 4 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 5 && tap === true){
            tap = false;
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page5).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }

    },
    pageB:function(){
        game.state.start('works');
    },
    paintWorksL:function(){
        tap = true;
        if(!game.device.desktop){
            picpage= picpage-0.5;
        }else{
            picpage--;
        }
        console.log('左');
    },
    paintWorksR:function(){
        tap = true;
        if(!game.device.desktop){
            picpage= picpage+0.5;
        }else{
            picpage++;
        }
        console.log('右');
    }
}
game.State.works_ps={
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'movie_bg');
        this.titleBgText = game.add.image(game.width/2,85,'titleBgText');
        this.titleGameText = game.add.image(game.width/2,85,'titleGameText');
        this.titleBgText.anchor.setTo(0.5);
        this.titleGameText.anchor.setTo(0.5);
        this.titleBgText.alpha = 0;
        this.titleGameText.alpha = 0;
        picpage = 0;
        this.page0 = game.add.image(0,0,'05');
        this.page1 = game.add.image(0,0,'06');
        this.page2 = game.add.image(0,0,'07');
        this.page3 = game.add.image(0,0,'08');
        this.page4 = game.add.image(0,0,'14');
        // this.input.touch.preventDefault = false;
        tap = true;
        this.page0.alpha = 0;
        this.page1.alpha = 0;
        this.page2.alpha = 0;
        this.page3.alpha = 0;
        this.page4.alpha = 0;
        this.page1.x = game.width;
        this.page2.x = game.width;
        this.page3.x = game.width;
        this.page4.x = game.width;

        // 取消按鈕
        this.cancel = game.add.button(550,55,'cancel',this.pageB,this,1,0,1);
        // 切頁按鈕
        this.L = game.add.button(game.width/2-70,850,'pageL',this.paintWorksL,this,0,1,0,1);
        this.R = game.add.button(game.width/2+70,850,'pageR',this.paintWorksR,this,1,0,1,0);
        this.L.anchor.setTo(0.5);
        this.R.anchor.setTo(0.5);
    },
    update:function(){
        if(picpage<0){
            picpage = 0;
        }
        if(picpage>4){
            picpage = 4;
        }
        console.log(picpage);
        if(picpage === 0 && tap === true){
            tap = false;
            game.add.tween(this.titleBgText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 1 && tap === true){
            tap = false;
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 2 && tap === true){
            tap = false;
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 3 && tap === true){
            tap = false;
            game.add.tween(this.titleBgText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 4 && tap === true){
            tap = false;
            game.add.tween(this.titleBgText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:-game.width  }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }

    },
    pageB:function(){
        game.state.start('works');
    },
    paintWorksL:function(){
        tap = true;
        if(!game.device.desktop){
            picpage= picpage-0.5;
        }else{
            picpage--;
        }
        console.log('左');
    },
    paintWorksR:function(){
        tap = true;
        if(!game.device.desktop){
            picpage= picpage+0.5;
        }else{
            picpage++;
        }
        console.log('右');
    }
}
game.State.works_sai={
    create:function(){
        // 背景
        this.bg = game.add.image(0,0,'movie_bg');
        this.titlePaintText = game.add.image(game.width/2,85,'titlePaintText');
        this.titleGameText = game.add.image(game.width/2,85,'titleGameText');
        this.titlePaintText.anchor.setTo(0.5);
        this.titleGameText.anchor.setTo(0.5);
        this.titlePaintText.alpha = 0;
        this.titleGameText.alpha = 0;
        picpage = 0;
        this.page0 = game.add.image(0,0,'09');
        this.page1 = game.add.image(0,0,'10');
        this.page2 = game.add.image(0,0,'11');
        this.page3 = game.add.image(0,0,'15');
        this.page4 = game.add.image(0,0,'16');
        // this.input.touch.preventDefault = false;
        tap = true;
        this.page0.alpha = 0;
        this.page1.alpha = 0;
        this.page2.alpha = 0;
        this.page3.alpha = 0;
        this.page4.alpha = 0;
        this.page1.x = game.width;
        this.page2.x = game.width;
        this.page3.x = game.width;
        this.page4.x = game.width;

        // 取消按鈕
        this.cancel = game.add.button(550,55,'cancel',this.pageB,this,1,0,1);
        // 切頁按鈕
        this.L = game.add.button(game.width/2-70,850,'pageL',this.paintWorksL,this,0,1,0,1);
        this.R = game.add.button(game.width/2+70,850,'pageR',this.paintWorksR,this,1,0,1,0);
        this.L.anchor.setTo(0.5);
        this.R.anchor.setTo(0.5);
    },
    update:function(){
        if(picpage<0){
            picpage = 0;
        }
        if(picpage>4){
            picpage = 4;
        }
        console.log(picpage);
        if(picpage === 0 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 1 && tap === true){
            tap = false;
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 2 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 3 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        if(picpage === 4 && tap === true){
            tap = false;
            game.add.tween(this.titlePaintText).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.titleGameText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page0).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page1).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page2).to({ x:-game.width }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page3).to({ x:-game.width  }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(this.page4).to({ x:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        }

    },
    pageB:function(){
        game.state.start('works');
    },
    paintWorksL:function(){
        tap = true;
        if(!game.device.desktop){
            picpage= picpage-0.5;
        }else{
            picpage--;
        }
        console.log('左');
    },
    paintWorksR:function(){
        tap = true;
        if(!game.device.desktop){
            picpage= picpage+0.5;
        }else{
            picpage++;
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

