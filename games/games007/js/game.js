/****************** 可連結資料庫變更的變數 ********************/

//我方移動速度
var myMaxSpeed = 150;
// 隕石生成間格時間
var fireInterval = 0.8; //秒
// 石頭生成間格時間
var ballInterval = 2; //秒
// 獎勵生成間格時間
var awardInterval = 8; //秒
// 獎勵分數
var awardScore = 5;

/***********************************************************/

//開始遊戲條件
var isPlay = false;
//鍵盤操作鍵物件
var keyboard;
//計時器
var timer;
//UI字型
var scoreText;
//文字樣式
var style = {fill: '#745d4b', font: "60px GrinchedRegular"};
var timeStyle = {fill: '#745d4b', font: "32px GrinchedRegular"};
//伺服器連接flag
var phpsuccess = false;
//遊戲主畫布
var width = 960;
var height = 640;
var Phaser = Phaser || {};
var gameDiv = document.getElementById('game');
Phaser.myScaleManager = new MyScaleManager(gameDiv);
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
Phaser.myScaleManager.boot();


/********************* ajax調用database.php連線取得資料庫設定數值 *********************/

$(function () {
    // $.ajax({
    //     url: '/games/games007/php/database.php',//連接的URL
    //     data: "{}",//夾帶的參數
    //     dataType: 'json', //資料格式
    //     success: function (data) //傳送成功的function
    //     {                

    //         /******************************* 能從外部變更的變數 **************************/  
    //         myMaxSpeed = parseInt(data[0]['myMaxSpeed']);
    //         fireInterval = (data[0]['fireInterval']);
    //         ballInterval = (data[0]['ballInterval']);
    //         awardInterval = (data[0]['awardInterval']);
    //         awardScore = (data[0]['awardScore']);
    //         console.log("我方移動速度"+parseInt(data[0]['myMaxSpeed']));
    //         console.log("隕石間格時間"+data[0]['fireInterval']+"秒");
    //         console.log("石頭間格時間"+data[0]['ballInterval']+"秒");
    //         console.log("獎勵間格時間"+data[0]['awardInterval']+"秒");
    //         console.log("獎勵分數"+data[0]['awardScore']+"分");
    //         phpsuccess = true; //伺服器連接成功flag 

    //     }
    // });
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }, //權限TOKEN
        url: '/game/data', //取得遊戲參數的位址
        data: {
            game: 'games007'
        }, //送出 game 參數(值為遊戲識別名稱)
        type: 'POST', //使用 POST傳送
        success: function (data) //傳送成功的function
        {
            myMaxSpeed = parseInt(data.myMaxSpeed);
            fireInterval = (data.fireInterval);
            ballInterval = (data.ballInterval);
            awardInterval = (data.awardInterval);
            awardScore = (data.awardScore);
            console.log("我方移動速度"+parseInt(data['myMaxSpeed']));
            console.log("隕石間格時間"+data['fireInterval']+"秒");
            console.log("石頭間格時間"+data['ballInterval']+"秒");
            console.log("獎勵間格時間"+data['awardInterval']+"秒");
            console.log("獎勵分數"+data['awardScore']+"分");
            phpsuccess = true; //伺服器連接成功flag 
        }
    });
    
});  

    /**************************** ajax調用send.php再傳入資料庫方法 **********************/ 

    function sendScore(SCORE){

        $(function () {
            // $.ajax({
            //     url: '/games/games007/php/send.php',//連接的URL
            //     method:'POST',
            //          data:{
            //          score:SCORE     
            //          }, //夾帶的參數 //資料格式

            //     success: function () {    
            //         console.log("分數傳值成功："+SCORE);
            //     }
            // });

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }, //權限TOKEN
                url: '/game/score', //分數儲存的位址
                type: 'POST', //使用 POST 傳送
                data:{
                    game: 'games007',
                    score: SCORE
                }, //送出 game 參數(值為遊戲識別名稱)、score 參數(值為分數)
                success: function (data) //傳送成功的 function
                {
                    // 回應的資料格式為 json，所以 data 變數是個 Object
                    console.log('遊戲者：' + data.player_name);
                    console.log('儲存分數：' + data.score);
                }
            });
        }); 
}

/*********************************************************************************/

//遊戲階段
game.State={};

//遊戲得分
game.score = 0;

//遊戲主控角色
game.sprite;

    
    // boot state 對遊戲進行設置
    game.State.boot={
        preload:function(){
            game.load.image('loading','../games010/assets/preloader.gif');
            // 螢幕自適應
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
			this.scale.forcePortrait = false;
			this.scale.refresh();
    
        },   
        create:function(){ 
              game.state.start('load');
        }
    }

//預載遊戲資材
game.State.load={
    preload:function(){
        var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('background01', '../games007/assets/background01.png');
        game.load.image('background02', '../games007/assets/background02.png');
        game.load.image('left', '../games007/assets/left.png');
        game.load.image('right', '../games007/assets/right.png');
        game.load.image('award', '../games007/assets/award.png');
        game.load.image('ground', '../games007/assets/ground.png');
        game.load.image('ball01', '../games007/assets/ball01.png');
        game.load.image('ball02', '../games007/assets/ball02.png');
        game.load.image('ball03', '../games007/assets/ball03.png');
        game.load.image('empty', '../games007/assets/Empty.png');
        game.load.image('gauge', '../games007/assets/Gauge.png');
        game.load.image('gaugeHead', '../games007/assets/GaugeHead.png');
        game.load.image('white4', '../games007/assets/White4.png');
        game.load.spritesheet('myexplode', '../games007/assets/myexplode.png', 80, 80, 3);
        game.load.spritesheet('player', '../games007/assets/playersprite.png', 120, 150, 45);
        game.load.spritesheet('startbutton', '../games007/assets/startbutton.png', 200, 200, 2);
        game.load.spritesheet('returnbutton', '../games007/assets/returnbutton.png', 200, 200, 2);
        game.load.audio('playback', '../games007/assets/playback.mp3');
        game.load.audio('dead', '../games007/assets/dead.mp3');
    },
    create:function(){
        keyboard = game.input.keyboard.addKeys({
    
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT,
        'a': Phaser.Keyboard.A,
        'd': Phaser.Keyboard.D,
        'enter': Phaser.Keyboard.ENTER

    });  
        game.state.start('start');
    }
}
//遊戲開始介面
game.State.start={
    create:function(){
        game.add.image(0,0,'background02');       
        game.sprite=game.add.sprite(480,520,'player');
        game.sprite.anchor.setTo(0.5, 0.5);
        game.sprite.animations.add('idle_left',[0, 1, 2, 3], 8);
        game.sprite.animations.play('idle_left',8,true);
        this.startBtn = game.add.button(480,320,'startbutton',this.onStartClick,this,0,1,0);
        this.startBtn.anchor.setTo(0.5,0.5);
    },

    onStartClick:function(){
        game.state.start('play');
    }
}
//遊玩遊戲
game.State.play={
    create:function(){
        //開始遊戲
        isPlay = true;
        //分數
        scoreText = game.add.text(20, 30, "Score: 0", style);
        //分數歸0
        game.add.image(0,0,'background02');
        game.score = 0;
        //開啟ARCADE物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //我方
        game.sprite=game.add.sprite(480,520,'player');
        game.sprite.anchor.setTo(0.5, 0.5);
        game.sprite.animations.add('walk_left',[4, 5, 6, 7, 8, 9, 10, 11], 8);
        game.sprite.animations.add('idle_left',[0, 1, 2, 3], 8);
        game.sprite.animations.add('walk_right',[16, 17, 18, 19, 20, 21, 22, 23], 8);
        game.sprite.animations.add('idle_right',[12, 13, 14, 15], 8);
        game.sprite.animations.play('idle_left',8,true);
        game.sprite.dir = 0;//玩家面朝 0左 1右 預設 0左
        game.physics.arcade.enable(game.sprite);

        // 虛擬按鍵
        var isLeft = false;
        var isRight = false;
        game.left = game.add.sprite(-5,0,'left');
        game.right = game.add.sprite(485,0,'right');
        game.left.inputEnabled = true;
        game.left.input.priorityID = 1;
        game.left.events.onInputDown.add(function(){
            isLeft = true;
            isRight = false;
            if(isLeft){
                keyboard.left.isDown = true;
                keyboard.right.isDown = false;
            }
        });
        game.left.events.onInputUp.add(function(){
            isLeft = true;
            isRight = false;
            if(isLeft){
                keyboard.left.isDown = false;
                keyboard.right.isDown = false;
            }
        });
        game.right.inputEnabled = true;
        game.right.input.priorityID = 1;
        game.right.events.onInputDown.add(function(){
            isLeft = false;
            isRight = true;
            if(isRight){
                keyboard.left.isDown = false;
                keyboard.right.isDown = true;
            }

        });
        game.right.events.onInputUp.add(function(){
            isLeft = false;
            isRight = true;
            if(isRight){
                keyboard.left.isDown = false;
                keyboard.right.isDown = false;
            }
        });

        //讓我方物件會碰撞世界邊界
        game.sprite.body.collideWorldBounds = true;
        //隕石們
        this.fireBalls = game.add.group();
        this.fireBalls.lastEnemyTime = 0
        //石頭們
        this.balls = game.add.group();
        this.balls.enableBody = true;
        this.ballTimer = game.time.events.loop(Phaser.Timer.SECOND * ballInterval, this.generateBall, this);
        this.leftBall = true;
        //地面
        this.ground = game.add.sprite(0,560,'ground');
        game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;
        // this.ground.body.setSize(960, 60, 0, 0);

        /***************************** 聲音 **********************************/
        //背景音樂
        this.playback = game.add.audio('playback', 0.5, true);
        try{
            this.playback.play();
        }catch(e){}
        /********************************************************************/

        /************ 重置鍵盤訊號 ************/

        keyboard.right.isDown = false;
        keyboard.left.isDown = false;
        keyboard.a.isDown = false;
        keyboard.d.isDown = false;

        /************************************/ 
        
        
        /********** 時間數字們 **********/
        // 加分數字們
        this.numberItems = game.add.group();
        this.numberItems.enableBody = true;
        this.numberTimer = game.time.events.loop(Phaser.Timer.SECOND * awardInterval, this.generateNumber, this);

        // 時間條
        this.gauge = game.add.sprite(0, 0, 'gauge');
        this.gauge.count = 0;
        this.gauge.scale.x = this.game.width / this.gauge.width;
        this.gauge.tint = Math.random() * 0xffffff;
        this.gaugeCropRect = new Phaser.Rectangle(0, 0, 0, this.gauge.height);
        this.gauge.crop(this.gaugeCropRect);
        this.gaugeHead = game.add.sprite(0, 0, 'gaugeHead');
        game.time.events.loop(Phaser.Timer.SECOND * 0.1, function() {
            this.gaugeHead.tint = Math.random() * 0xffffff;
        }, this);

        //計時時間開始
        this.timeTimer = game.time.events.loop(Phaser.Timer.SECOND * 0.1, function() {
            this.gauge.count++;
            this.updateTimeNumber();
        }, this);

        // 時間數字
        this.timeIntegerText = game.add.text(this.gaugeHead.x, this.gaugeHead.bottom, '0', timeStyle);
        this.dot = game.add.text(this.timeIntegerText.right + 2, this.gaugeHead.bottom, '.', timeStyle);
        this.timeDecimalText = game.add.text(this.dot.right, this.gaugeHead.bottom, '00', timeStyle);
    }, 
    update:function(){

        //生產隕石
        // this.generatefireBall();
        //物理碰撞偵測
        game.physics.arcade.collide(this.ground, this.balls);
        game.physics.arcade.collide(this.ground, this.balls);
        game.physics.arcade.collide(this.ground, this.bloodEmitter);
        //屍塊

        //分數獎勵
        game.physics.arcade.collide(this.ground, this.numberItems);
        game.physics.arcade.overlap(game.sprite, this.balls, this.dead, null, this);
        game.physics.arcade.overlap(game.sprite, this.fireBalls, this.dead, null, this);
        game.physics.arcade.overlap(game.sprite, this.numberItems, this.collectNumber, null, this);
        /********************* 鍵盤操作 ******************************/  
        
        if(keyboard.left.isDown||keyboard.a.isDown) {
            game.sprite.body.velocity.x = -myMaxSpeed;
            game.sprite.animations.play('walk_left',8,true);
            game.sprite.dir = 0;//玩家朝向左
        } else if(keyboard.right.isDown||keyboard.d.isDown) {
            game.sprite.body.velocity.x = myMaxSpeed;
            game.sprite.animations.play('walk_right',8,true);
            game.sprite.dir = 1;//玩家朝向右
        } else {
            game.sprite.body.velocity.x = 0;
            if(game.sprite.dir == 1){
                game.sprite.animations.play('idle_right',8,true);
            }
            if(game.sprite.dir == 0){
                game.sprite.animations.play('idle_left',8,true);
            }
        }

        /***********************************************************/  
        
    },
    //分數時間Bar
    updateTimeNumber: function(a){
        this.gaugeCropRect.width = (this.gauge.count % 100 + 1) / 100 * (game.width - 80);
        this.gauge.crop(this.gaugeCropRect);
        this.gaugeHead.x = this.gaugeCropRect.width * this.gauge.scale.x - 10;      
        // 更新時間數字
        this.timeIntegerText.text = Math.floor(this.gauge.count / 10) + "";
        this.timeDecimalText.text = this.gauge.count % 10;
        this.timeIntegerText.x = this.gaugeHead.x - (this.timeIntegerText.width + this.dot.width + this.timeDecimalText.width);
        if(this.timeIntegerText.x < 0) {
          this.timeIntegerText.x = 0;
        }
        this.dot.x = this.timeIntegerText.right + 2;
        this.timeDecimalText.x = this.dot.right;
    },    
    //隕石生成
    generatefireBall: function(){
        
        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.fireBalls.lastEnemyTime > fireInterval*1000){

        /************************** 隕石生成 ******************************/

        var key = 'ball02';
        var fireBallWidth = game.cache.getImage(key).width;
        var fireBallHeight = game.cache.getImage(key).height;
        var x = game.rnd.integerInRange(fireBallWidth/2, game.width - fireBallWidth/2);
        var y= 0;
        var fireBall = this.fireBalls.getFirstExists(false, true, x, y, key);
        
        fireBall.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(fireBall); 
        fireBall.body.setSize(fireBallWidth, fireBallHeight);//設定碰撞框尺寸
        fireBall.body.velocity.y = 300;
        fireBall.body.velocity.x= 200;
        fireBall.lastFireTime = 0;
        fireBall.fireBallHeight = fireBallHeight;//用來讓其他函數能調用此變數，所以掛到enemy底下
        fireBall.checkWorldBounds = true;//檢查邊界
        fireBall.outOfBoundsKill = true;//敵方飛出邊界消除

        /****************************************************************/ 

        this.fireBalls.lastEnemyTime = now;
        }
    },
    //創造增加分數的獎勵
    generateNumber: function(){
        var numberItem = this.numberItems.getFirstExists(false);
        if(numberItem) {
            numberItem.reset(game.rnd.integerInRange(0, game.width), -20);
            numberItem.angle = game.rnd.angle();
            numberItem.loadTexture('award');
        } else {
            numberItem = game.make.sprite(game.rnd.integerInRange(0, game.width), -20, 'award');
            numberItem.angle = game.rnd.angle();
            game.physics.arcade.enable(numberItem);
            numberItem.anchor.setTo(0.5, 0.5);
            numberItem.body.moves = true;
            numberItem.body.bounce.y = 0.2;
            this.numberItems.add(numberItem);
        }
        numberItem.update = function() {
            if(numberItem.body.velocity.y > 1) {
            numberItem.angle += 1;
            }
        }
        numberItem.body.gravity.y = 950;
    },
    //得到加分分數
    collectNumber: function(hero, numberItem){
        numberItem.body.gravity.y = 0;
        numberItem.update = function() {
                game.physics.arcade.moveToObject(numberItem, this.gaugeHead, 1000);
                if(numberItem.y < 10) {
                numberItem.kill();
                numberItem.update = function() {};
                this.gauge.count += 50;
                this.updateTimeNumber();
                game.time.events.repeat(Phaser.Timer.SECOND * 0.1, 10, function() {
                    this.gauge.tint = Math.random() * 0xffffff;
                }, this);
            }
        }.bind(this);
    },
    //石頭生成
    generateBall: function(){
        var x;
        var dir;
        if(this.leftBall) {
          x = 0;
          dir = 1;
        } else {
          x = 960;
          dir = -1;
        }
        this.leftBall = !this.leftBall;
        var ball = this.balls.getFirstExists(false);
        var rate = game.rnd.realInRange(0.5, 0.7);
        if(ball){
            ball.reset(x, game.rnd.integerInRange(-50, 150));
        } else {
          ball = game.make.sprite(x, game.rnd.integerInRange(-50, 150), 'ball03');
          ball.anchor.setTo(0.5, 0.5);
          game.physics.arcade.enable(ball);
          ball.outOfBoundsKill = true;
          ball.checkWorldBounds = true;
          ball.body.moves = true;
          ball.body.bounce.y = 1;
          ball.body.gravity.y = 950;
          ball.body.setSize(100 * 0.75, 98, 100 * 0.25 / 2, 0);
          this.balls.add(ball);
        }
        ball.scale.setTo(rate, rate);
        ball.body.velocity.x = dir * game.rnd.integerInRange(150, 200);
    },
    //死亡
    dead: function(){
        game.left.inputEnabled = false;
        game.right.inputEnabled = false;
        game.sprite.kill();
        this.deadSe = game.add.audio('dead', 0.8, false);
        try{
            this.deadSe.play();
        }catch(e){}
        var explode = game.add.sprite(game.sprite.x,game.sprite.y,'myexplode');
        explode.anchor.setTo(0.5, 0.5);
        var anim = explode.animations.add('exploeAdnim');
        anim.onComplete.addOnce(function(){
            explode.destroy();
        });   
        anim.play(15,false,false);
        //停止計時
        game.time.events.remove(this.timeTimer);
        game.time.events.remove(this.numberTimer);
        //分數
        scoreText = game.add.text(480, 170, "Score:"+this.timeIntegerText.text, style);
        scoreText.anchor.setTo(0.5, 0.5);
        sendScore(this.timeIntegerText.text);
        // 回到開始遊戲畫面
        var returnBtn = game.add.button(480,320,'returnbutton',this.returnClick,this,0,1,0);
        returnBtn.anchor.setTo(0.5,0.5);  
        // 關閉音樂
        this.playback.stop();
        // 結束遊戲
        isPlay = false;
    },
    returnClick: function(){
        game.state.start('start');
    }
}
/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('load',game.State.load);
game.state.add('start',game.State.start);
game.state.add('play',game.State.play);
game.state.start('boot');

/*******************************************/
