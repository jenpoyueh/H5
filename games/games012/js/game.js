/****************** 可連結資料庫變更的變數 ********************/

// 叉子攻擊間格時間
var againTime = 1500;

// 遊玩時間
var timer = 60;

// 幽靈產生間格時間
var phatom1IntervalLim = 3000;
var phatom1IntervalMax = 5000;
var phatom2IntervalLim = 1500;
var phatom2IntervalMax = 3500;
var phatom3IntervalLim = 2000;
var phatom3IntervalMax = 4000;
var phatomSIntervalLim = 10000;
var phatomSIntervalMax = 15000;

// 幽靈移動速度
var phantomVelocityLim = 100;
var phantomVelocityMax = 300;
var phantomSVelocityLim = 400;
var phantomSVelocityMax = 600;

// 幽靈分數
var phantomScore = 100;
var phantomScoreS = 500;
var scoreBonus = 1;

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
// 有無按過按鈕條件(讓按鈕別)
var freeCost = false;
var pointCost = false;



/***********************************************************/

/******* 遊戲數值設定 ********/
var phantomY1 = 300;
var phantomY2 = 400;
var phantomY3 = 500;
var phantomScale = 0.9;
var combo = 0;
/***************************/

/******** 條件 *********/
// 倒數條件
var reciprocalFlag = true;
// 生產幽靈條件
var generate= true;

// 按鍵
var startFlag = true;
var thankFlag = true;

// 可再插條件
var atk = true;
// 可殺幽靈條件
var canKill = true;
// 生產幽靈條件
var generate = false;
// mask條件
var maskFlag = true;
/**********************/

// 文字樣式
var style = {fill: '#ffffff', font: "30px Mirage"};
var tStyle = {fill: '#ffffff', font: "30px Mirage"};
var hitStyle1 = {fill: '#ffffff', font: "63px Mirage"};
var hitStyle2 = {fill: '#ffffff', font: "43px Mirage"};

// 遊戲主畫布
var width = 960;
var height = 640;
var Phaser = Phaser || {};
var gameDiv = document.getElementById('game');
Phaser.myScaleManager = new MyScaleManager(gameDiv);
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
Phaser.myScaleManager.boot();

/******** 遊戲物件 ********/

// 遊戲階段
game.State={};

// 場景
game.bg1;
game.bg2;

// UI
game.againBtn;
game.startBtn;
game.scoreText;
game.timeUp;


// 遊戲得分
game.score = 0;

// 遊戲時間
game.timer = timer;

// 背景音樂
game.bgm;

// 叉子
game.fork;

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
                game: 'games012',
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
                game: 'games012',
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
        game.load.image('loading','../games012/assets/preloader.gif');
        // 螢幕自適應
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.scale.forcePortrait = false;
        this.scale.refresh();
    },   
    create:function(){  
        game.scale.onOrientationChange.add(function() {
            if(game.scale.isLandscape) {
              game.scale.correct = true;
              game.scale.setGameSize(width, height);
            } else {
              game.scale.correct = false;
              game.scale.setGameSize(height, width);
            }
          }, this)
          game.state.start('load');
    }
}

// 預載遊戲資材
game.State.load={
    preload:function(){
        var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('bg1', '../games012/assets/bg1.png');
        game.load.image('bg2', '../games012/assets/bg2.png');
        game.load.image('timeUp', '../games012/assets/timeUp.png');
        game.load.image('fork', '../games012/assets/fork.png');
        game.load.image('line', '../games012/assets/line.png');
        game.load.image('thankBoard', '../games012/assets/thankBoard.png');
        game.load.image('pointBoard1', '../games012/assets/pointBoard1.png');
        game.load.image('pointBoard2', '../games012/assets/pointBoard2.png');
        game.load.image('3', '../games012/assets/3.png');
        game.load.image('2', '../games012/assets/2.png');
        game.load.image('1', '../games012/assets/1.png');
        game.load.image('0', '../games012/assets/0.png');
        game.load.image('thanks1', '../games012/assets/thanks1.png');
        game.load.spritesheet('phantom', '../games012/assets/phantom.png', 120, 110, 7);
        game.load.spritesheet('phantomS', '../games012/assets/phantomS.png', 120, 110, 7);
        game.load.spritesheet('die', '../games012/assets/die.png', 166, 34, 8);
        game.load.spritesheet('startBtn', '../games012/assets/startBtn.png', 240, 160, 2);
        game.load.spritesheet('yesBtn', '../games012/assets/yesBtn.png', 90, 50, 2);
        game.load.spritesheet('noBtn', '../games012/assets/noBtn.png', 90, 50, 2);
        game.load.spritesheet('freeBtn', '../games012/assets/freeBtn.png', 100, 60, 2);
        game.load.spritesheet('backBtn', '../games012/assets/backBtn.png', 100, 60, 2);
        game.load.spritesheet('thankBtn', '../games012/assets/thankBtn.png', 140, 100, 2);
        game.load.audio('laugh', '../games012/assets/laugh.wav');
        game.load.audio('pyo', '../games012/assets/pyo.mp3');
        game.load.audio('attack', '../games012/assets/attack.mp3');
        game.load.audio('start', '../games012/assets/start.mp3');
        game.load.audio('enter', '../games012/assets/enter.mp3');
        game.load.audio('cancel', '../games012/assets/cancel.mp3');
        game.load.audio('bgm', '../games012/assets/bgm.mp3');
        game.load.audio('reciprocal', '../games012/assets/reciprocal.mp3');
        game.load.audio('timeUp', '../games012/assets/timeUp.mp3');
        game.load.audio('timeUpBGM', '../games012/assets/timeUpBGM.mp3');
        
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
        game.add.image(0,0,'bg1');
        game.add.image(0,0,'bg2');
        game.thankBtn =game.add.button(870,570,'thankBtn',this.specialThank,this,1,0,1);
        game.thankBtn.anchor.setTo(0.5,0.5);
        game.thankBtn.alpha = 0;
        game.add.tween(game.thankBtn).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.startBtn = game.add.button(480,320,'startBtn',this.onStartClick,this,1,0,1);
        game.startBtn.anchor.setTo(0.5,0.5);
        game.startBtn.alpha = 0;
        game.add.tween(game.startBtn).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
    },

    // 遊戲設定
    setting: function(){
        // 倒數條件
        reciprocalFlag = true;
        // 背景音樂
        game.bgm = game.add.audio('bgm', 0.5, true);
        game.timeUpBGM = game.add.audio('timeUpBGM', 0.5, false);
        // 分數歸0
        game.score = 0;
        // 計時器設定
        game.timer = timer;
        // 有無扣點完成遊戲判斷(最後遊戲結束需回傳資料庫狀態)
        pointCostFlag = false;
        // 有無扣每日免費次數完成遊戲判斷(1.最後遊戲結束需回傳資料庫狀態 2.在遊戲最後回傳是為了以免玩家扣完點在遊戲中途當機起紛爭的證據 3.回傳false的話他有扣免費次數可證明他因當機或其他原因而中斷遊戲)
        freeCountCostFlag = false;        
        // 有無按過按鈕條件
        freeCost = false;
        pointCost = false;
        // 伺服器連接成功flag 
        phpsuccess = false;

        /******* 遊戲數值設定 ********/
        phantomY1 = 300;
        phantomY2 = 400;
        phantomY3 = 500;
        scoreBonus = 1;
        phantomScale = 0.9;
        combo = 0;
        /***************************/

        /******** 條件 *********/
        // 倒數條件
        reciprocalFlag = true;
        // 生產幽靈條件
        generate= true;

        // 按鍵
        startFlag = true;
        thankFlag = true;

        // 可再插條件
        atk = true;
        // 可殺幽靈條件
        canKill = true;
        // 生產幽靈條件
        generate = false;
        // mask條件
        maskFlag = true;
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
                    game: 'games012'
                }, //送出 game 參數(值為遊戲識別名稱)
                type: 'POST', //使用 POST傳送
                success: function (data) //傳送成功的function
                {
                  
                    // 叉子攻擊間格時間
                    againTime = parseInt(data.velocity);

                    // 遊玩時間
                    timer = parseInt(data.velocity);

                    // 幽靈產生間格時間
                    phatom1IntervalLim = parseInt(data.phatom1IntervalLim);
                    phatom1IntervalMax = parseInt(data.phatom1IntervalMax);
                    phatom2IntervalLim = parseInt(data.phatom2IntervalLim);
                    phatom2IntervalMax = parseInt(data.phatom2IntervalMax);
                    phatom3IntervalLim = parseInt(data.phatom3IntervalLim);
                    phatom3IntervalMax = parseInt(data.phatom3IntervalMax);
                    phatomSIntervalLim = parseInt(data.phatomSIntervalLim);
                    phatomSIntervalMax = parseInt(data.phatomSIntervalMax);

                    // 幽靈移動速度
                    phantomVelocityLim = parseInt(data.phantomVelocityLim);
                    phantomVelocityMax = parseInt(data.phantomVelocityMax);
                    phantomSVelocityLim = parseInt(data.phantomSVelocityLim);
                    phantomSVelocityMax = parseInt(data.phantomSVelocityMax);

                    // 幽靈分數
                    phantomScore = parseInt(data.phantomScore);
                    phantomScoreS = parseInt(data.phantomScoreS);

                    // 打印
                    console.log('叉子攻擊間格時間：' + parseInt(data.velocity));
                    console.log('遊玩時間：' + parseInt(data.velocity));
                    console.log('幽靈產生間格時間(幽靈1範圍)：' + parseInt(data.phatom1IntervalLim),parseInt(data.phatom1IntervalMax));
                    console.log('幽靈產生間格時間(幽靈2範圍)：' + parseInt(data.phatom2IntervalLim),parseInt(data.phatom2IntervalMax));
                    console.log('幽靈產生間格時間(幽靈3範圍)：' + parseInt(data.phatom3IntervalLim),parseInt(data.phatom3IntervalMax));
                    console.log('幽靈產生間格時間(幽靈S範圍)：' + parseInt(data.phatomSIntervalLim),parseInt(data.phatomSIntervalMax));
                    console.log('幽靈移動速度(範圍)：' + parseInt(data.phantomVelocityLim),parseInt(data.phantomVelocityMax));
                    console.log('幽靈S移動速度(範圍)：' + parseInt(data.phantomSVelocityLim),parseInt(data.phantomSVelocityMax));
                    console.log('幽靈分數：' + parseInt(data.phantomScore));
                    console.log('幽靈S分數：' + parseInt(data.phantomScoreS));
        
                    // 伺服器連接成功flag 
                    phpsuccess = true;
                }
            });
        });
    /********************* 取得資料庫設定數值 *********************/
    },
    
    // 跳轉 state
    onStartClick:function(){
        if(startFlag){
            startFlag = false;
            // 音效
            this.enter = game.add.audio('start', 0.5, false);
            try{
                this.enter.play();
            }catch(e){}
            game.add.tween(game.thankBtn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = game.add.tween(game.startBtn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(function(){
                // 判斷有無連結資料庫(淑貞看這)
                if(phpsuccess){
                    // 延遲0.3秒開始
                    setTimeout(function(){
                        // 會員點數相關 state
                        game.state.start('cost'); 
                    }, 300);
                    // 延遲0.3秒開始
                    // setTimeout(function(){
                    //     // 開始遊戲
                    //     game.state.start('play'); 
                    // }, 300);                                
                }else{
                    // 延遲0.3秒開始
                    // setTimeout(function(){
                    //     // 會員點數相關 state
                    //     game.state.start('cost'); 
                    // }, 300);
                    // 延遲0.3秒開始
                    setTimeout(function(){
                        // 開始遊戲
                        game.state.start('play'); 
                    }, 300);                 
                }

            });
        }       
    },

    // 跳轉感謝名單 state
    specialThank: function(){
        if(thankFlag){
            thankFlag = false;
            // 音效
            this.laugh = game.add.audio('laugh', 0.5, false);
            try{
                this.laugh.play();
            }catch(e){}
            game.add.tween(game.startBtn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = game.add.tween(game.thankBtn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(function(){
                // 延遲0.3秒開始
                setTimeout(function(){
                    // 特別感謝 state
                    game.state.start('thank');
                }, 300);
            });
        }
    }
}

// 特別感謝 state
game.State.thank={
    create: function(){

        // 背景
        game.add.image(0,0,'bg1');
        game.add.image(0,0,'bg2');

        // 返回按鈕
        game.add.button(820,585,'backBtn',function(){
            game.state.start('start');
        },this,1,0,1).anchor.setTo(0.5);

        // 特別感謝標題
        var text1 = game.add.text(game.width/2, 100, 'Special Thanks', hitStyle1);
        text1.anchor.setTo(0.5);
        // 感謝名單1
        var thanks1 = game.add.sprite(game.width/2,250,'thanks1');
        thanks1.anchor.setTo(0.5);
        thanks1.inputEnabled = true;
        thanks1.events.onInputDown.add(function(){
            window.open("https://maoudamashii.jokersounds.com/");
        });
        // 感謝名單2         
        var thanks2 =  game.add.text(game.width/2,350,'【小森平的免費音效】',{fill: '#ffffff', fontsize: "63px"});
        thanks2.anchor.setTo(0.5);
        thanks2.inputEnabled = true;
        thanks2.events.onInputDown.add(function(){
            window.open("https://taira-komori.jpn.org/freesoundtw.html");
        });
    }
}

// 點數花費(淑貞看這請創建相關資料庫)
game.State.cost={

    create: function(){
        // 會員當前點數(需撈資料庫)
        memberPoint = 200;
        // 遊戲需花費點數(需撈資料庫)
        costPoint = 300;
        // 會員每日免費遊玩次數(需撈資料庫)
        freeTimes = 3;
        // 會員剩餘每日免費遊玩次數(需撈資料庫)
        canFreeTimes = 3;
        // 打印有無扣點完成遊戲條件與有無使用每免費次數完成遊戲條件
        console.log('有無扣點完成遊戲判斷：'　+　pointCostFlag, freeCountCostFlag);
        // 背景圖
        game.add.image(0,0,'bg1');
        game.add.image(0,0,'bg2');

    /********** 判斷出哪個板子 **********/

        /**** 每日免費遊玩 ****/
        // 按鍵互鎖開關
        var btFlag = true;
        if(canFreeTimes > 0){ 
            // 免費遊玩板子
            game.pointBoard1 = game.add.sprite(game.width/2,game.height/2,'pointBoard1');
            game.pointBoard1.anchor.setTo(0.5);

            // 免費遊玩資訊 
            game.freePlay = game.pointBoard1.addChild(game.add.text(0,15,canFreeTimes+ ' / ' +freeTimes,tStyle));
            game.freePlay.anchor.setTo(0.5);
            
            // 確定按鈕
            game.freeBtn = game.pointBoard1.addChild(game.add.button(-50,60,'freeBtn',function(){
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
            game.freeBtn.anchor.setTo(0.5);
            game.pointBoard1.alpha = 0;
            game.add.tween(game.pointBoard1).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false); 
            // 為了按鈕按一次的條件
            var cancelFlag = true;
            // X按鈕
            game.noBtn = game.pointBoard1.addChild(game.add.button(50,60,'noBtn',function(){
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
                            // 淡出 
                            var fadeOut = game.add.tween(game.pointBoard1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 300, 0, false); 
                            fadeOut.onComplete.add(function(){
                                // 延遲0.3秒開始
                                setTimeout(function(){
                                    game.state.start('start'); 
                                }, 300);    
                            });
                        }   
                    }
                }
            },1,1,0));
            game.noBtn.anchor.setTo(0.5);
        }else{

        /**** 點數消費玩遊戲板子 ****/

            // 點數花費板子
            game.pointBoard2 = game.add.sprite(game.width/2,game.height/2,'pointBoard2');
            game.pointBoard2.anchor.setTo(0.5);

            // 需花費點數
            game.costPoint = game.pointBoard2.addChild(game.add.text(35,-75,costPoint,tStyle));

            // 會員剩餘點數/需花費點數
            game.memberPoint = game.pointBoard2.addChild(game.add.text(-30,-25,memberPoint + ' / ' + costPoint,tStyle));

            // 判斷點數是否足夠
            if(memberPoint >= costPoint){
                // 確定按鈕
                game.yesBtn = game.pointBoard2.addChild(game.add.button(-40,60,'yesBtn',function(){ 
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
                            // 淡出
                            var fadeOut = game.add.tween(game.pointBoard2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 300, 0, false); 
                            fadeOut.onComplete.add(function(){
                                // 延遲0.3秒開始
                                setTimeout(function(){
                                    game.state.start('play'); 
                                }, 300);    
                            });
                        }                        
                    }
                },1,1,0));
                game.yesBtn.anchor.setTo(0.5);
                game.pointBoard2.alpha = 0;
                game.add.tween(game.pointBoard2).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false); 
                // 為了按鈕按一次的條件
                var cancelFlag = true;
                // X按鈕
                game.noBtn = game.pointBoard2.addChild(game.add.button(50,60,'noBtn',function(){
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
                                // 淡出 
                                var fadeOut = game.add.tween(game.pointBoard2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 300, 0, false); 
                                fadeOut.onComplete.add(function(){
                                    // 延遲0.3秒開始
                                    setTimeout(function(){
                                        game.state.start('start'); 
                                    }, 300);    
                                });
                            }    
                        }
                    }
                },1,1,0));
                game.noBtn.anchor.setTo(0.5);
            }else{
                // 無法遊玩
                game.backBtn = game.pointBoard2.addChild(game.add.button(0,60,'backBtn',function(){
                    // 淡出
                    var fadeOut = game.add.tween(game.pointBoard2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 300, 0, false); 
                    fadeOut.onComplete.add(function(){
                        // 延遲0.3秒開始
                        setTimeout(function(){
                            game.state.start('start'); 
                        }, 300);    
                    });
                },this,1,0,1));
                game.backBtn.anchor.setTo(0.5);
            }

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

        // 開啟碰撞系統
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 場景
        game.bg1 = game.add.image(0,0,'bg1');
        game.bg1.inputEnabled = true;
        game.bg1.input.priorityID = 1;

        // 叉子
        game.fork = game.add.sprite(game.width/2,-275,'fork');
        game.fork.anchor.setTo(0.5);
        game.physics.arcade.enable(game.fork); 

        // 幽靈組
        this.phantoms1 = game.add.group();
        this.phantoms1.lastPhantomTime = 0;
        this.phantoms2 = game.add.group();
        this.phantoms2.lastPhantomTime = 0;
        this.phantoms3 = game.add.group();
        this.phantoms3.lastPhantomTime = 0;
        this.phantomsS = game.add.group();
        this.phantomsS.lastPhantomTime = 0;

        // 外框
        game.bg2 = game.add.image(0,0,'bg2');

        // UI
        this.UILine = game.add.sprite(80,38,'line');
        this.UILine.alpha = 0;
        game.scoreText = game.add.text(125, 85, 'score: '+ game.score, style);
        game.scoreText.alpha = 0;
        game.timeText = game.add.text(125, 35, 'time: ' + game.timer + ' s', style);
        game.timeText.alpha = 0;

        // 叉子動態
        var tween =game.add.tween(game.fork).to({y:-90},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
        // 叉子定位後
        tween.onComplete.add(function(){
                // 計時器
                this.timeTimer = game.time.events.loop(Phaser.Timer.SECOND * 1, function() {
                    game.timer = game.timer - 1;
                    game.timeText.setText('time: ' + game.timer + ' s');
                });
                canKill = true;
                generate = true;
                // UI出現
                game.add.tween(this.UILine).to( { alpha: 1 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                game.add.tween(game.scoreText).to( { alpha: 1 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                game.add.tween(game.timeText).to( { alpha: 1 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                game.bg1.events.onInputDown.add(function(){
                    if(atk){
                        game.add.audio('attack', 0.5, false).play();
                        atk = false;
                        var tween =game.add.tween(game.fork).to({y:250},200,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
                        tween.onComplete.add(function(){
                            canKill = false;
                            console.log('combo: ' + combo);
                            if(combo > 0){
                                // combo 文字
                                var comboText1 = game.add.text(700, 150, combo, hitStyle1);
                                var comboText2 = comboText1.addChild(game.add.text(80, 10, 'HIT', hitStyle2));
                                comboText1.anchor.setTo(0.5);
                                comboText2.anchor.setTo(0.5);
                                comboText1.scale.setTo(1.5);
                                comboText1.setShadow(0, 0, 'rgba(255,250,206,0.7)', 10);
                                comboText2.setShadow(0, 0, 'rgba(255,250,206,0.7)', 10);
                            }
                            // combo 文字動態
                            setTimeout(function(){
                                if(comboText1 && comboText2){
                                    var scaleTween = game.add.tween(comboText1.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                                    scaleTween.onComplete.add(function(){
                                        setTimeout(function(){
                                            var alphaTween = game.add.tween(comboText1).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                                            alphaTween.onComplete.add(function(){
                                                comboText1.kill();
                                                comboText2.kill();
                                            });
                                        },500);
                                    });
                                }
                            }, 10);
                            var tween =game.add.tween(game.fork).to({y:-90},againTime,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
                            tween.onComplete.add(function(){
                                canKill = true;
                                atk = true;
                                combo = 0;
                                scoreBonus = 1;
                                console.log('可再插');
                            },this);
                        },this);
                    }
                },this);
        },this);

        game.timeUp = game.add.sprite(game.width/2,game.height/2,'timeUp');
        game.timeUp.anchor.setTo(0.5)
        game.timeUp.alpha = 0;
    },

    update:function(){

        // 生產幽靈
        if(generate){
            this.generatePhantom1();
            this.generatePhantom2();
            this.generatePhantom3();
            this.generatePhantomS();
            game.scoreText.setText('score: ' + game.score);
        }

        if(game.timer === 3){
            if(reciprocalFlag){
                reciprocalFlag = false;
                this.soundFx('reciprocal',0.5,false);
                var numtext = game.add.sprite(game.width/2,game.height/2,'3');
                numtext.anchor.setTo(0.5);
                // 動態效果
                numtext.scale.setTo(1.5);
                var scaleTween = game.add.tween(numtext.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                scaleTween.onComplete.add(function(){
                    setTimeout(function(){
                        var alphaTween = game.add.tween(numtext).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        alphaTween.onComplete.add(function(){
                            numtext.kill();
                        });
                    },500);
                });
            }
        }
        if(game.timer === 2){
            if(!reciprocalFlag){
                reciprocalFlag = true;
                this.soundFx('reciprocal',0.5,false);
                var numtext = game.add.sprite(game.width/2,game.height/2,'2');
                numtext.anchor.setTo(0.5);
                // 動態效果
                numtext.scale.setTo(1.5);
                var scaleTween = game.add.tween(numtext.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                scaleTween.onComplete.add(function(){
                    setTimeout(function(){
                        var alphaTween = game.add.tween(numtext).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        alphaTween.onComplete.add(function(){
                            numtext.kill();
                        });
                    },500);
                });
            }
        }
        if(game.timer === 1){
            if(reciprocalFlag){
                reciprocalFlag = false;
                this.soundFx('reciprocal',0.5,false);
                var numtext = game.add.sprite(game.width/2,game.height/2,'1');
                numtext.anchor.setTo(0.5);
                // 動態效果
                numtext.scale.setTo(1.5);
                var scaleTween = game.add.tween(numtext.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                scaleTween.onComplete.add(function(){
                    setTimeout(function(){
                        var alphaTween = game.add.tween(numtext).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        alphaTween.onComplete.add(function(){
                            numtext.kill();
                        });
                    },500);
                });
            }
        }

        // 遊戲結束
        if(game.timer === 0){
            if(!reciprocalFlag){
                reciprocalFlag = true;
                this.soundFx('timeUp',0.5,false);
                var numtext = game.add.sprite(game.width/2,game.height/2,'0');
                numtext.anchor.setTo(0.5);
                // 動態效果                
                numtext.scale.setTo(1.5);
                var scaleTween = game.add.tween(numtext.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
                scaleTween.onComplete.add(function(){
                    setTimeout(function(){
                        var alphaTween = game.add.tween(numtext).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        alphaTween.onComplete.add(function(){
                            numtext.kill();
                        });
                    },500);
                });
            }

            // 移除計時器
            game.time.events.remove(this.timeTimer);
            game.timer = 0;
            game.bg1.inputEnabled = false;
            atk = false;
            generate = false;
            if(maskFlag){
                maskFlag = false;
                game.bgm.fadeOut(3000);
                var score = game.timeUp.addChild(game.add.text(0, 0, 'score: ' + game.score, style));
                score.anchor.setTo(0.5);
                var backBtn = game.timeUp.addChild(game.add.button(0,60,'backBtn',function(){
                    game.bgm.stop();
                    game.bgm.resume();
                    game.timeUpBGM.stop();
                    game.timeUpBGM.resume();
                    setTimeout(function(){
                        game.state.start('start'); 
                    }, 300);    
                },this,1,0,1));
                backBtn.anchor.setTo(0.5);
                backBtn.inputEnabled = false;
                var timeUpBoard = game.add.tween(game.timeUp).to( { alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 2000, 0, false);
                timeUpBoard.onComplete.add(function(){
                    canKill = false;
                    game.timeUpBGM.fadeIn(3000);
                });
                setTimeout(function(){
                    console.log('可以按了');
                    backBtn.inputEnabled = true;
                }, 500);
            }
            console.log('time up');
        }

        // 碰撞偵測
        if(canKill){
            game.physics.arcade.overlap(game.fork, this.phantoms1, function(a,b){
                b.kill();
                this.effect(b.x,b.y,0.5,0.5,'die',12);
                this.soundFx('pyo',0.3,false);
                // 分數計算與獎勵公式
                combo = combo + 1;
                scoreBonus = (combo-1) * 0.2 + scoreBonus;
                if(combo === 1){
                    scoreBonus = 1;
                }
                var score = parseInt(phantomScore * scoreBonus);
                this.scoreEff(b.x,b.y,score);
                game.score = game.score + score;
                console.log(combo,scoreBonus,score,game.score);
            }, null, this);
            game.physics.arcade.overlap(game.fork, this.phantoms2, function(a,b){
                this.soundFx('pyo',0.3,false);
                b.kill();
                this.effect(b.x,b.y,0.5,0.5,'die',12);
                // 分數計算與獎勵公式                
                combo = combo + 1;
                scoreBonus = (combo-1) * 0.2 + scoreBonus;
                if(combo === 1){
                    scoreBonus = 1;
                }
                var score = parseInt(phantomScore * scoreBonus);
                this.scoreEff(b.x,b.y,score);
                game.score = game.score + score;
                console.log(combo,scoreBonus,score,game.score);
            }, null, this);
            game.physics.arcade.overlap(game.fork, this.phantoms3, function(a,b){
                this.soundFx('pyo',0.3,false);
                b.kill();
                this.effect(b.x,b.y,0.5,0.5,'die',12);
                // 分數計算與獎勵公式      
                combo = combo + 1;
                scoreBonus = (combo-1) * 0.2 + scoreBonus;
                if(combo === 1){
                    scoreBonus = 1;
                }
                var score = parseInt(phantomScore * scoreBonus);
                this.scoreEff(b.x,b.y,score);
                game.score = game.score + score;
                console.log(combo,scoreBonus,score,game.score);
            }, null, this);
            game.physics.arcade.overlap(game.fork, this.phantomsS, function(a,b){
                this.soundFx('pyo',0.3,false);
                b.kill();
                this.effect(b.x,b.y,0.5,0.5,'die',12);
                // 分數計算與獎勵公式
                combo = combo + 1;
                scoreBonus = (combo-1) * 0.2 + scoreBonus;
                if(combo === 1){
                    scoreBonus = 1;
                }
                var score = parseInt(phantomScoreS * scoreBonus);
                this.scoreEff(b.x,b.y,score);
                game.score = game.score + score;
                console.log(combo,scoreBonus,score,game.score);
            }, null, this);
        }
    },

    // 得分動態
    scoreEff: function(x, y, scoreValue){
        var s;
        var Score = parseInt(scoreValue);
        s = game.add.text(x, y, '+ ' + Score, style);
        s.anchor.setTo(0.5,0.5);
        game.add.tween(s).to({y:y-80},800,Phaser.Easing.Linear.None,true,0, 0, false);
        var timer =setTimeout(function() {
            game.add.tween(s).to( { alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
        }, 200);
        var timer2 =setTimeout(function() {
            s.kill()
        }, 700);
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
    },
        
    /************************** 幽靈生成 ******************************/

    // 第一排幽靈
    generatePhantom1: function(){
        var phatom1Interval = game.rnd.integerInRange(phatom1IntervalLim,phatom1IntervalMax);
        var phantom1Velocity = game.rnd.integerInRange(phantomVelocityLim,phantomVelocityMax);
        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.phantoms1.lastPhantomTime > phatom1Interval){
            var phantom = this.phantoms1.getFirstExists(false, true, -10, phantomY1, 'phantom');
            phantom.anchor.setTo(0.5, 0.5);
            phantom.scale.setTo(-phantomScale,phantomScale);
            phantom.animations.add('fly');
            phantom.animations.play('fly',15,true);
            game.physics.arcade.enable(phantom); 
            phantom.body.velocity.x = phantom1Velocity;
            phantom.lastFireTime = 0;
            phantom.checkWorldBounds = true;//檢查邊界
            phantom.outOfBoundsKill = true;//飛出邊界消除
            this.phantoms1.lastPhantomTime = now;
        }
    },

    // 第二排幽靈
    generatePhantom2: function(){
        var phatom2Interval = game.rnd.integerInRange(phatom2IntervalLim,phatom2IntervalMax);
        var phantom2Velocity = game.rnd.integerInRange(phantomVelocityLim,phantomVelocityMax);
        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.phantoms2.lastPhantomTime > phatom2Interval){
            var phantom = this.phantoms2.getFirstExists(false, true, game.width+10, phantomY2, 'phantom');
            phantom.anchor.setTo(0.5, 0.5);
            phantom.scale.setTo(phantomScale,phantomScale);
            phantom.animations.add('fly');
            phantom.animations.play('fly',15,true);
            game.physics.arcade.enable(phantom); 
            phantom.body.velocity.x = -phantom2Velocity;
            phantom.lastFireTime = 0;
            phantom.checkWorldBounds = true;//檢查邊界
            phantom.outOfBoundsKill = true;//飛出邊界消除
            this.phantoms2.lastPhantomTime = now;
        }
    },

    // 第三排幽靈
    generatePhantom3: function(){
        var phatom3Interval = game.rnd.integerInRange(phatom3IntervalLim,phatom3IntervalMax);
        var phantom3Velocity = game.rnd.integerInRange(phantomVelocityLim,phantomVelocityMax);
        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.phantoms3.lastPhantomTime > phatom3Interval){
            var phantom = this.phantoms3.getFirstExists(false, true, -10, phantomY3, 'phantom');
            phantom.anchor.setTo(0.5, 0.5);
            phantom.scale.setTo(-phantomScale,phantomScale);
            phantom.animations.add('fly');
            phantom.animations.play('fly',15,true);
            game.physics.arcade.enable(phantom); 
            phantom.body.velocity.x = phantom3Velocity;
            phantom.lastFireTime = 0;
            phantom.checkWorldBounds = true;//檢查邊界
            phantom.outOfBoundsKill = true;//飛出邊界消除
            this.phantoms3.lastPhantomTime = now;
        }
    },

    // 特殊幽靈
    generatePhantomS: function(){
        var yRnd = game.rnd.integerInRange(0,2);
        var y;
        switch(yRnd){
            case 0:
                y = phantomY1;
                break;
            case 1:
                y = phantomY2;
            case 2:
                y = phantomY3;
                break;
        } 
        var x;
        var directionRnd = game.rnd.integerInRange(0,1);
        var direction;
        var phantomSVelocity = game.rnd.integerInRange(phantomSVelocityLim,phantomSVelocityMax);
        switch(directionRnd){
            case 0:
                x = -10;
                direction = -phantomScale;
                break;
            case 1:
                x = game.width + 10;
                direction = phantomScale;
                break;
        } 
        var phatomSInterval = game.rnd.integerInRange(phatomSIntervalLim,phatomSIntervalMax);
        var phantomSVelocity = game.rnd.integerInRange(phantomSVelocityLim,phantomSVelocityMax);
        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.phantomsS.lastPhantomTime > phatomSInterval){
            var phantom = this.phantomsS.getFirstExists(false, true, x, y, 'phantomS');
            phantom.anchor.setTo(0.5, 0.5);
            phantom.scale.setTo(direction,phantomScale);
            game.physics.arcade.enable(phantom);
            switch(directionRnd){
                case 0:
                    phantom.body.velocity.x = phantomSVelocity;
                    break;
                case 1:
                    phantom.body.velocity.x = -phantomSVelocity;
                    break;
            } 
            phantom.animations.add('fly');
            phantom.animations.play('fly',15,true);
            phantom.lastFireTime = 0;
            phantom.checkWorldBounds = true;//檢查邊界
            phantom.outOfBoundsKill = true;//飛出邊界消除
            this.phantomsS.lastPhantomTime = now;
        }
    },
}

/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('load',game.State.load);
game.state.add('start',game.State.start);
game.state.add('thank',game.State.thank);
game.state.add('cost',game.State.cost);
game.state.add('turtorial',game.State.turtorial);
game.state.add('play',game.State.play);
game.state.start('boot');

/*******************************************/

