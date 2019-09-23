/****************** 可連結資料庫變更的變數 ********************/

var velocity = 300;
var velocityLV1 = 400;
var velocityLV2 = 500;
var velocityLV3 = 300;

var scaleRndLim = 1;
var scaleRndMax = 10;
var imgRndLim = 1;
var imgRndMax = 10;
var velocityLJump = 280;
var velocityRJump = 280;

// 關卡分數條件
var level1 = 5;
var level2 = 10;
var level3 = 15;

/***********************************************************/

// 會員相關(淑珍看這)

// 會員當前點數(需撈資料庫)
var memberPoint;
// 遊戲需花費點數(需撈資料庫)
var costPoint;
// 會員每日免費遊玩次數(需撈資料庫)
var freeTimes;
// 會員剩餘每日免費遊玩次數(需撈資料庫)
var canFreeTimes;
// 有無扣點完成遊戲判斷(1.最後遊戲結束需回傳資料庫狀態 2.在遊戲最後回傳是為了以免玩家扣完點在遊戲中途當機起紛爭的證據 3.回傳false的話他有扣到點數就可證明他因當機或其他原因而中斷遊戲)
var pointCostFlag = false;
// 有無扣每日免費次數完成遊戲判斷(1.最後遊戲結束需回傳資料庫狀態 2.在遊戲最後回傳是為了以免玩家扣完點在遊戲中途當機起紛爭的證據 3.回傳false的話他有扣免費次數可證明他因當機或其他原因而中斷遊戲)
var freeCountCostFlag = false;
// 有無按過按鈕條件(讓按鈕別重複按)
var freeCost = false;
var pointCost = false;



/***********************************************************/

/******* 遊戲數值設定 ********/
var velocityL = velocity;
var velocityR = velocity;
/***************************/

/******** 條件 *********/
var jump = true;
var onGroundL = true;
var onGroundR = true;
var getScore = true;
var generate= true;

// 按鍵
var startFlag = true;

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

// UI
game.againBtn;
game.startBtn;

// 遊戲得分
game.score = 0;

// 背景音樂
game.bgm;

// 玩家角色
game.rabbitL;
game.rabbitR;

// 背景
game.bg;

// 點數花費
game.memberPoint;
game.costPoint;
game.pointBoard1;
game.pointBoard2;
game.OK;
game.cancel;
game.noPoint;
game.freePlay;



/************************/

/**************************** 傳入資料庫方法 **********************/ 

// 回傳遊戲分數與有無扣點(淑貞看這)
function sendScore(SCORE,POINTCOSTFLAG,FREECOUNTCOSTFLAG){

    $(function () {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }, //權限TOKEN
            url: '/game/score', //分數儲存的位址
            type: 'POST', //使用 POST 傳送
            data:{
                game: 'games010',
                score: SCORE,
                pointCostFlag:POINTCOSTFLAG,
                freeCountCostFlag:FREECOUNTCOSTFLAG
            }, //送出 game 參數(值為遊戲識別名稱)、score 參數(值為分數)
            success: function (data) //傳送成功的 function
            {
                // 回應的資料格式為 json，所以 data 變數是個 Object
                console.log('遊戲者：' + data.player_name);
                console.log('儲存分數：' + data.score);
                console.log('有無扣點完成遊戲：' + data.pointCostFlag);
                console.log('有無扣每日免費次數來完成遊戲：' + data.freeCountCostFlag);
            }
        });
    }); 
}

// 回傳會員目前點數(淑貞看這)
function sendPonit(POINT){

    $(function () {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }, //權限TOKEN
            url: '/game/score', //分數儲存的位址
            type: 'POST', //使用 POST 傳送
            data:{
                game: 'games010',
                point: POINT
            }, //送出 game 參數(值為遊戲識別名稱)、score 參數(值為分數)
            success: function (data) //傳送成功的 function
            {
                // 回應的資料格式為 json，所以 data 變數是個 Object
                console.log('遊戲者：' + data.player_name);
                console.log('當前點數：' + data.point);
            }
        });
    }); 
}

// 回傳會員目前免費次數(淑貞看這)
function sendfreeCount(COUNT){

    $(function () {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }, //權限TOKEN
            url: '/game/score', //分數儲存的位址
            type: 'POST', //使用 POST 傳送
            data:{
                game: 'games010',
                count: COUNT
            }, //送出 game 參數(值為遊戲識別名稱)、score 參數(值為分數)
            success: function (data) //傳送成功的 function
            {
                // 回應的資料格式為 json，所以 data 變數是個 Object
                console.log('遊戲者：' + data.player_name);
                console.log('當前點數：' + data.point);
            }
        });
    }); 
}

/*********************************************************************************/





// boot state 對遊戲進行設置
game.State.boot={
    preload:function(){
        game.load.image('loading','../games010/assets/preloader.gif');
        //行動平台螢幕適應
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forcePortrait = false;
        this.scale.refresh();   
        // if(!game.device.desktop){
        //     //行動平台螢幕適應
        //     game.scale.pageAlignHorizontally = true;
        //     game.scale.pageAlignVertically = true;
        //     game.stage.backgroundColor = '#000000';
        //     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //     this.scale.forcePortrait = true;
		// 	this.scale.refresh();
        // }
        // 自定義螢幕縮放
        // this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        // this.scale.setUserScale(0.5,0.5,0,0);

    },   
    create:function(){  
        game.state.start('load');
    }
}

// 預載遊戲資材
game.State.load={
    preload:function(){
        var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('left', '../games010/assets/left.png');
        game.load.image('right', '../games010/assets/right.png');
        game.load.image('turtorial', '../games010/assets/turtorial.png');
        game.load.image('gameOver', '../games010/assets/gameOver.png');
        game.load.image('bg', '../games010/assets/bg.png');
        game.load.image('ground', '../games010/assets/ground.png');
        game.load.image('pointBoard1', '../games010/assets/pointBoard1.png');
        game.load.image('pointBoard2', '../games010/assets/pointBoard2.png');
        game.load.image('unok', '../games010/assets/unok.png');
        game.load.spritesheet('rabbitA', '../games010/assets/rabbitA.png', 200, 200, 11);
        game.load.spritesheet('rabbitB', '../games010/assets/rabbitB.png', 200, 200, 11);
        game.load.spritesheet('boom', '../games010/assets/boom.png', 100, 100, 2);
        game.load.spritesheet('okbutton', '../games010/assets/okbutton.png', 140, 80, 2);
        game.load.spritesheet('startbutton', '../games010/assets/startbutton.png', 240, 80, 2);
        game.load.spritesheet('freebutton', '../games010/assets/freebutton.png', 240, 80, 2)
        game.load.spritesheet('againbutton', '../games010/assets/againbutton.png', 240, 80, 2);
        game.load.spritesheet('cancel', '../games010/assets/cancel.png', 140, 80, 2);
        game.load.audio('bgm', '../games010/assets/bgm.mp3');
        game.load.audio('get', '../games010/assets/get.mp3');
        game.load.audio('enter', '../games010/assets/enter.mp3');
        game.load.audio('cancel', '../games010/assets/cancel.mp3');
        game.load.audio('jump', '../games010/assets/jump.mp3');
        game.load.audio('boom', '../games010/assets/boom.mp3');
        // 用來預讀字型
        game.add.text(game.width/2-9999, -9999, "", style);
    },
    create:function(){
        game.state.start('start');
    }
}

// 遊戲開始介面與設定
game.State.start={
    create:function(){
        // 開始按鈕防止重複點及條件
        game.stFlag = true;
        // 遊戲設定
        this.setting();
        // 開始介面
        this.startUI();
    },

    // 介面
    startUI: function(){
        // 背景介面按鈕
        game.add.image(0,0,'bg');
        game.add.image(0,680,'ground');
        this.turtorial = game.add.image(0,0,'turtorial');
        this.turtorial.alpha = 0;
        game.add.tween(this.turtorial).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.startBtn = game.add.button(game.width/2,game.height/2+60,'startbutton',this.onStartClick,this,1,0,1);
        game.startBtn.anchor.setTo(0.5,0.5);
        game.startBtn.alpha = 0;
        var tween = game.add.tween(game.startBtn).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        // 計分板
        game.scoreText = game.add.text(game.width/2, 200, game.score, style);
        game.scoreText.anchor.setTo(0.5,0.5);
    },

    // 遊戲設定
    setting: function(){
        
        // 背景音樂
        game.bgm = game.add.audio('bgm', 0.5, true);
        // 分數歸0
        game.score = 0;
        // 有無扣點完成遊戲判斷(最後遊戲結束需回傳資料庫狀態)
        pointCostFlag = false;
        // 有無扣每日免費次數完成遊戲判斷(1.最後遊戲結束需回傳資料庫狀態 2.在遊戲最後回傳是為了以免玩家扣完點在遊戲中途當機起紛爭的證據 3.回傳false的話他有扣免費次數可證明他因當機或其他原因而中斷遊戲)
        freeCountCostFlag = false;        
        // 有無按過按鈕條件
        freeCost = false;
        pointCost = false;
        // 伺服器連接成功flag 
        phpsuccess = false;

        /******** 條件 *********/
        jump = true;
        onGroundL = true;
        onGroundR = true;
        getScore = true;
        generate= true;

        // 按鍵
        startFlag = true;

        /**********************/

    /********************* 取得資料庫設定數值 *********************/
    // (淑貞看這)

        $(function () {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }, //權限TOKEN
                url: '/game/data', //取得遊戲參數的位址
                data: {
                    game: 'games010'
                }, //送出 game 參數(值為遊戲識別名稱)
                type: 'POST', //使用 POST傳送
                success: function (data) //傳送成功的function
                {
                  
                    // 各關卡移動速度
                    velocity = parseInt(data.velocity);
                    velocityLV1 = parseInt(data.velocityLV1);
                    velocityLV2 = parseInt(data.velocityLV2);
                    velocityLV3 = parseInt(data.velocityLV3);

                    // 進入關卡分數條件
                    level1 = parseInt(data.level1);
                    level2 = parseInt(data.level2);
                    level3 = parseInt(data.level3);

                    console.log('各關卡移動速度：' + parseInt(data.velocity),parseInt(data.velocityLV1),parseInt(data.velocityLV2),parseInt(data.velocityLV3));
                    console.log('進入關卡分數條件：' + parseInt(data.level1),parseInt(data.level2),parseInt(data.level3));
                    
                    // 伺服器連接成功flag 
                    phpsuccess = true; 
                }
            });
        });


    /********************* 取得資料庫設定數值 *********************/
    },
    
    onStartClick:function(){
        if(startFlag){
            startFlag = false;
            
            // 音效
            this.enter = game.add.audio('enter', 0.5, false);
            try{
                this.enter.play();
            }catch(e){}
            var tween1 = game.add.tween(this.turtorial).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false); 
            var tween2 = game.add.tween(game.startBtn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween2.onComplete.add(function(){
                // 判斷有無連結資料庫(淑貞看這)
                if(phpsuccess){
                    // 延遲0.3秒開始
                    setTimeout(function(){
                        // 會員點數相關 state
                        game.state.start('cost'); 
                    }, 300);               
                }else{
                    // 延遲0.3秒開始
                    setTimeout(function(){
                        // 開始遊戲
                        game.state.start('play'); 
                    }, 300);                 
                }

            });
        }       
    },

}

// 點數花費(淑貞看這請創建相關資料庫)
game.State.cost={

    create: function(){
        // 會員當前點數(需撈資料庫)
        memberPoint = 2000;
        // 遊戲需花費點數(需撈資料庫)
        costPoint = 300;
        // 會員每日免費遊玩次數(需撈資料庫)
        freeTimes = 3;
        // 會員剩餘每日免費遊玩次數(需撈資料庫)
        canFreeTimes = 0;
        // 打印有無扣點完成遊戲條件與有無使用每免費次數完成遊戲條件
        console.log('有無扣點完成遊戲判斷：'　+　pointCostFlag, freeCountCostFlag);
        // 背景圖
        game.add.image(0,0,'bg');
        game.add.image(0,680,'ground');
        // 計分板
        game.scoreText = game.add.text(game.width/2, 200, game.score, style);
        game.scoreText.anchor.setTo(0.5,0.5);

    /********** 判斷出哪個板子 **********/

        /**** 每日免費遊玩 ****/
        // 按鍵互鎖開關
        var btFlag = true;
        if(canFreeTimes > 0){ 
            // 免費遊玩板子
            game.pointBoard1 = game.add.sprite(game.width/2,game.height/3,'pointBoard1');
            game.pointBoard1.anchor.setTo(0.5);

            // 免費遊玩資訊 
            game.freePlay = game.pointBoard1.addChild(game.add.text(60,-20,canFreeTimes+ ' / ' +freeTimes,tStyle));
            // 確定按鈕
            game.OK = game.pointBoard1.addChild(game.add.button(-150,70,'okbutton',function(){
                if(btFlag){
                    btFlag = false;
                    if(!freeCost){
                        // 音效  
                        this.enter = game.add.audio('enter', 0.5, false);
                        try{
                            this.enter.play();
                        }catch(e){} 
                        freeCost = true;
                        // 減去1次免費遊玩次數
                        canFreeTimes = canFreeTimes - 1;
                        // 使用每日免費次數條件(最後遊戲結束需回傳資料庫狀態)
                        freeCountCostFlag = true;
                        // 打印使用每日免費條件
                        console.log('每日免費遊玩次數：' + freeCountCostFlag);
                        // 回傳會員免費遊玩次數
                        sendfreeCount(canFreeTimes);
                        game.freePlay.setText(canFreeTimes+ ' / ' +freeTimes);
                        var fadeOut = game.add.tween(game.pointBoard1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false); 
                        fadeOut.onComplete.add(function(){
                            // 延遲0.3秒開始
                            setTimeout(function(){
                                game.state.start('play'); 
                            }, 300);    
                        });
                    }
                }
            },1,1,0));
            game.pointBoard1.alpha = 0;
            game.add.tween(game.pointBoard1).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false); 
            // 為了按鈕按一次的條件
            var cancelFlag = true;
            // X按鈕
            game.cancel = game.pointBoard1.addChild(game.add.button(10,70,'cancel',function(){
                if(btFlag){
                    btFlag = false;
                    if(cancelFlag){
                        cancelFlag = false;
                        // 音效
                        this.cancel = game.add.audio('cancel', 0.5, false);
                        if(!freeCost){
                            try{
                                this.cancel.play();
                            }catch(e){} 
                            // 延遲0.3秒開始 
                            setTimeout(function(){
                                game.state.start('start'); 
                            }, 300); 
                        }   
                    }
                }
            },1,1,0));
        }else{

        /**** 點數消費玩遊戲板子 ****/

            // 點數花費板子
            game.pointBoard2 = game.add.sprite(game.width/2,game.height/3,'pointBoard2');
            game.pointBoard2.anchor.setTo(0.5);
            // 需花費點數
            game.costPoint = game.pointBoard2.addChild(game.add.text(35,-55,costPoint,tStyle));

            // 會員剩餘點數/需花費點數
            game.memberPoint = game.pointBoard2.addChild(game.add.text(-50,15,memberPoint + ' / ' + costPoint,tStyle));

            // 判斷點數是否足夠
            if(memberPoint >= costPoint){
                // 確定按鈕
                game.OK = game.pointBoard2.addChild(game.add.button(-150,70,'okbutton',function(){
                    if(btFlag){
                        btFlag = false;
                        if(!pointCost){
                            // 音效
                            this.enter = game.add.audio('enter', 0.5, false);
                            try{
                                this.enter.play();
                            }catch(e){} 
                            pointCost = true;
                            // 會員點數扣除
                            memberPoint = memberPoint - costPoint;
                            game.memberPoint.setText(memberPoint + ' / ' + costPoint);
                            // 有無扣點完成遊戲判斷(最後遊戲結束需回傳資料庫狀態)
                            pointCostFlag = true;
                            // 打印有無扣點完成遊戲判斷
                            console.log('有無扣點完成遊戲判斷：'　+　pointCostFlag);                        
                            // 回傳資料庫(淑珍看這請創建相關資料庫)
                            sendPonit(memberPoint);
                            var fadeOut = game.add.tween(game.pointBoard2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 00, 0, false); 
                            fadeOut.onComplete.add(function(){
                                // 延遲0.3秒開始
                                setTimeout(function(){
                                    game.state.start('play'); 
                                }, 300);    
                            });

                        }                        
                    }
                },1,1,0));
                game.pointBoard2.alpha = 0;
                game.add.tween(game.pointBoard2).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false); 
            }else{
                // 無法遊玩
                game.NoOK = game.pointBoard2.addChild(game.add.sprite(-150,70,'unok'));
            }
            // 為了按鈕按一次的條件
            var cancelFlag = true;
            // X按鈕
            game.cancel = game.pointBoard2.addChild(game.add.button(10,70,'cancel',function(){
                if(btFlag){
                    btFlag = false;                    
                    if(cancelFlag){
                        cancelFlag = false;
                        // 音效
                        this.cancel = game.add.audio('cancel', 0.5, false);
                        try{
                            this.cancel.play();
                        }catch(e){}                 
                        if(!pointCost){
                            try{
                                this.cancel.play();
                            }catch(e){} 
                            // 延遲0.3秒開始 
                            setTimeout(function(){
                                game.state.start('start'); 
                            }, 300); 
                        }    
                    }
                }
            },1,1,0));
        }
    }
}

// 遊玩遊戲
game.State.play={

    create:function(){

        // 背景音樂
        try{
            game.bgm.play();
        }catch(e){}

        // 起始移動速度
        velocityL = velocity;
        velocityR = velocity;

        // 開啟碰撞系統
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 場景碰撞
        game.add.image(0,0,'bg');
        this.ground = game.add.sprite(0,680,'ground');
        game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;

        //計時時間開始
        this.timeTimer = game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
            generate = true;
            getScore = true;
        });
        game.left = game.add.sprite(-5,0,'left');
        game.right = game.add.sprite(game.width/2+5,0,'right');
        game.left.inputEnabled = true;
        game.left.input.priorityID = 1;
        game.left.events.onInputDown.add(function(){
            if(jump && this.rabbitL.alive){
                this.rabbitL.body.velocity.x = velocityLJump;
                this.rabbitL.body.velocity.y = -660;
                this.rabbitL.animations.add('jump', [7, 8, 9, 10], 8);
                this.rabbitL.animations.play('jump',12,false);
                this.soundFx('jump',0.8,false);
            }
            onGroundL = false;
        },this);
        game.right.inputEnabled = true;
        game.right.input.priorityID = 1;
        game.right.events.onInputDown.add(function(){
            if(jump && this.rabbitR.alive){
                this.rabbitR.body.velocity.x = -velocityLJump;
                this.rabbitR.body.velocity.y = -660;
                this.rabbitR.animations.add('jump', [7, 8, 9, 10], 8);
                this.rabbitR.animations.play('jump',12,false);
                this.soundFx('jump',0.8,false);             
            }
            onGroundR = false;
        },this);
        velocityL = 300;
        velocityR = 300;
        game.scoreText = game.add.text(game.width/2, 200, game.score, style);
        game.scoreText.anchor.setTo(0.5,0.5);
    },

    update:function(){

        // 關卡設定
        if(game.score >= level1){
            velocityL = velocityLV1;
            velocityR = velocityLV1;
        }
        if(game.score >= level2){
            velocityL = velocityLV2;
            velocityR = velocityLV2;
        }
        if(game.score >= level3){
            velocityL = velocityLV3;
            velocityR = velocityLV3;
        }

        // 創建兔子
        if(generate){
            generate = false;
            var scaleA;
            var scaleB;
            var rabbitLImg;
            var rabbitRImg;
            var scaleRnd = game.rnd.integerInRange(scaleRndLim,scaleRndMax);
            var imgRnd = game.rnd.integerInRange(imgRndLim,imgRndMax);
            if(scaleRnd > 6){
                scaleA = 0.8;
                scaleB = 0.5;
            }else{
                scaleA = 0.5;
                scaleB = 0.8;                
            }
            if(imgRnd > 6){
                rabbitLImg = 'rabbitA';
                rabbitRImg = 'rabbitB';
            }else{
                rabbitLImg = 'rabbitB';
                rabbitRImg = 'rabbitA';              
            }

            // 左翼兔子
            this.rabbitL = game.add.sprite(-30,680,rabbitLImg);
            this.rabbitL.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 8);
            this.rabbitL.animations.play('walk',20,true);
            game.physics.arcade.enable(this.rabbitL);
            this.rabbitL.body.setSize(180, 180, -5, 10);
            this.rabbitL.anchor.setTo(0.5,1);
            this.rabbitL.scale.setTo(scaleA,scaleA);
            this.rabbitL.body.gravity.y = 1500;
            this.rabbitL.body.velocity.x = velocityL;

            // 右翼兔子
            this.rabbitR = game.add.sprite(game.width,680,rabbitRImg);
            this.rabbitR.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 8);
            this.rabbitR.animations.play('walk',20,true);
            game.physics.arcade.enable(this.rabbitR);
            this.rabbitR.body.setSize(180, 180, -5, 10);
            this.rabbitR.anchor.setTo(0.5,1);
            this.rabbitR.scale.setTo(-scaleB,scaleB);
            this.rabbitR.body.gravity.y = 1500;
            this.rabbitR.body.velocity.x = -velocityR;
        }

        // 破撞偵測
        game.physics.arcade.collide(this.ground,this.rabbitL,function(){
            onGroundL = true;
        }, null, this);
        game.physics.arcade.collide(this.ground,this.rabbitR,function(){
            onGroundR = true;
        }, null, this);
        game.physics.arcade.overlap(this.rabbitL, this.rabbitR, function(a,b){
            if(this.rabbitL.scale.y === 0.5){
                a.destroy();
                this.effect(a.x, a.y, 0.5, 1, 'boom', 16);
                this.soundFx('boom',0.5,false);
            }
            if(this.rabbitR.scale.y === 0.5){
                b.destroy();
                this.effect(b.x, b.y, 0.5, 1, 'boom', 16);
                this.soundFx('boom',0.5,false);
            }
            // 淡出背景音樂
            game.bgm.fadeOut(3000); 
            // 傳分數與有無扣點判斷(淑珍看這)
            if(phpsuccess){
                sendScore(game.score,pointCostFlag,freeCountCostFlag);
            }   
            // 關閉左右兩側虛擬按鈕
            game.left.inputEnabled = false;
            game.right.inputEnabled = false;
            
            // 移除計時器
            game.time.events.remove(this.timeTimer);
            generate = false;
            getScore = false;
            var gameOver = game.add.image(game.width/2,game.height/3,'gameOver');
            gameOver.anchor.setTo(0.5);
            game.againBtn = game.add.button(game.width/2,game.height/2-35,'againbutton',function(){
                this.soundFx('enter', 0.5, false);
                // 延遲0.3秒
                setTimeout(function(){
                    game.bgm.stop();
                    game.state.start('start');
                }, 300);  
            },this,1,0,1);
            game.againBtn.anchor.setTo(0.5,0.5);
            game.scoreText = game.add.text(game.width/2, game.height/3+15, 'Score: '+game.score, style2);
            game.scoreText.anchor.setTo(0.5,0.5);  
        }, null, this);
        
        if(onGroundL && this.rabbitL.alive){
            this.rabbitL.animations.play('walk',20,true);
            this.rabbitL.body.velocity.x = velocityL;
        }
        if(onGroundR && this.rabbitR.alive){
            this.rabbitR.animations.play('walk',20,true);
            this.rabbitR.body.velocity.x = -velocityR;
        }
        if(onGroundL && onGroundR){
            jump = true;
        }else{
            jump = false;
        }
        if(this.rabbitL.x > this.rabbitR.x + 200 && getScore && this.rabbitR.alive && this.rabbitL.alive){
            console.log('加分');
            this.soundFx('get',0.8,false); 
            game.score = game.score + 1;
            game.scoreText.setText(game.score);
            getScore = false;
        }
    },

    // 特效播放
    effect: function(x, y, anchorX, anchorY, name, frame){
        var eff = game.add.sprite(x,y,name);
        eff.anchor.setTo(anchorX, anchorY);
        var anim = eff.animations.add(name);
        anim.play(frame,false,true); // (幀數,是否循環，是否在不循環前提下播完銷毀)
    },

    // 聲音播放
    soundFx: function(name,value,loopFlag){
        var soundFx = game.add.audio(name, value, loopFlag);
        try{
            soundFx.play();
        }catch(e){}
    }
}

/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('load',game.State.load);
game.state.add('start',game.State.start);
game.state.add('cost',game.State.cost);
game.state.add('turtorial',game.State.turtorial);
game.state.add('play',game.State.play);
game.state.start('boot');

/*******************************************/

