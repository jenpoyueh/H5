/****************** 可連結資料庫變更的變數 ********************/

// 精靈生成間格時間
var enemyInterval = 0.45; // 秒
// 精靈速度
var enemyVelocity = 300;
var enemyVelocityLim = 250;
var enemyVelocityMax = 350;
// 精靈生命
var enemyLife1 = 1;
var enemyLife2 = 2;
var enemyLife3 = 1;
var bossLife = 25;
// 精靈融化溫度幅度等級
var level1 = 3;
var level2 = 5;
var level3 = 8;
// 自動溫度升降級數
var tValueLV1 = 5;
var tValueLV2 = 7;
var tValueLV3 = 8;
// 彈匣數
var clipValue = 30;
// 彈匣氣泡補充量
var clipBonus = 20;
// 彈匣補充間格時間
var bubbleIntervalLim = 15;// 秒
var bubbleIntervalMax = 30;// 秒
// 彈匣氣泡移動速度
var bubbleVelocity = 50;
// 分數
var enemyScoreLV1 = 10;
var enemyScoreLV2 = 20;
var enemyScoreLV3 = 30;
var bossScore = 100;
// 缺失分數降幅
var scoreDecline = 1.5;
// 溶化得分增益
var scoreBuff = 1.5;
// 時間軸速度
var timeVelelocity = 10;

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

// 溫度上升級數
var tValueLV = tValueLV1;
// 怪物隨機值範圍
var enemyLim = 1;
var enemyMax = 2;
// 時間軸計數器
var count = 0;
// 溫度計bar條比例值
var tValue = 0;

/******** 條件 *********/

// 精靈產生條件
var enemy = true;
// boss
// 換天條件
var day = true;
// 夜晚條件
var night =true;
// 升降溫條件
var canCost = false;
// 可射擊條件
var canAtk = true;
// 死亡判斷條件
var dead = false;
// 溫度計動畫條件
var tAni = true;
// 升溫條件
var tUp = true;
// 降溫條件
var tDown = true;
// 關卡條件
var day2flag = false;
var day3flag = false;
var bossDay = false;
// 教學skip條件
var skipFlag = true;
// 伺服器連接flag
var phpsuccess = false;

/**********************/

// 文字樣式
var style = {fill: '#ffffff', font: "18px YARDSALE"};
var sStyle = {fill: '#b0ff2c', font: "20px YARDSALE"};
var tStyle = {fill: '#ffffff', font: "16px YARDSALE"};
var cStyle = {fill: '#ffffff', font: "14px YARDSALE"};
var clipStyle = {fill: '#ffffff', font: "18px YARDSALE"};

// 遊戲主畫布
var width = 300;
var height = 450;
var game =new Phaser.Game(width, height, Phaser.CANVAS, 'game');

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
                game: 'games009',
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
                game: 'games009',
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
                game: 'games009',
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

// 遊戲階段
game.State={};

// UI
game.startBtn;
game.scoreText;
game.clipValue;
game.clipText;
game.clip;

// 遊戲得分
game.score = 0;

// 玩家(唯一)
game.player;

// 玩家死亡表現物件
game.fire;
game.ice;

// boss(唯一) 因為不是用對象池方法去做大量生產所以其屬性能單一指定
game.boss;
game.bossDie;
game.bossLife;

// 彈匣泡泡
game.bubbleItem;

// 背景
game.bg1;
game.bg2;

// 教學UI
game.infoBoard;
game.infoEnemy1;
game.infoEnemy2;
game.infoExplode1;
game.infoExplode2;
game.infoMelt1;
game.infoMelt2;
game.infoPlayer01;
game.infoPlayer02;
game.infoPlayerHot;
game.infoIce;
game.infoFire;
game.infoUp;
game.infoDown;
game.infoBar1;
game.infoBar2;
game.infoBar3;
game.infoBar4;
game.hit;
game.skip;

// 點數花費
game.memberPoint;
game.costPoint;
game.pointBoard1;
game.pointBoard2;
game.OK;
game.cancel;
game.noPoint;
game.freePlay;

// 關卡資訊
game.day1;
game.day2;
game.day3;

// 底部碰撞框
game.bottom;

// 溫度計量條
game.tBar1;
game.tBar2;
game.tBar2_02;
game.tBar3;
game.tBar4;
game.T;

// 時間軸
game.timeBar;
game.sun;
game.moon;

// 仙人掌跑步小圖示
game.cactus;

// Boss Icon
game.bossIcon;

// boot state 對遊戲進行設置
game.State.boot={
    preload:function(){
        game.load.image('loading','../games009/assets/preloader.gif');
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
        game.load.image('null', '../games009/assets/null.png');
        game.load.image('background1', '../games009/assets/background1.png');
        game.load.image('background2', '../games009/assets/background2.png');
        game.load.image('turtorialInfo', '../games009/assets/turtorialInfo.png');
        game.load.image('pointBoard1', '../games009/assets/pointBoard1.png');
        game.load.image('pointBoard2', '../games009/assets/pointBoard2.png');
        game.load.image('NoOK', '../games009/assets/NoOK.png');
        game.load.image('day1', '../games009/assets/day1.png');
        game.load.image('day2', '../games009/assets/day2.png');
        game.load.image('day3', '../games009/assets/day3.png');
        game.load.image('frame', '../games009/assets/frame.png');
        game.load.image('bottom', '../games009/assets/bottom.png');
        game.load.image('dieCold', '../games009/assets/dieCold.png');
        game.load.image('dieHot', '../games009/assets/dieHot.png');
        game.load.image('tBar1', '../games009/assets/tBar1.png');
        game.load.image('tBar2', '../games009/assets/tBar2.png');
        game.load.image('tBar3', '../games009/assets/tBar3.png');
        game.load.image('tBar4', '../games009/assets/tBar4.png');
        game.load.image('T', '../games009/assets/T.png');
        game.load.image('up', '../games009/assets/up.png');
        game.load.image('down', '../games009/assets/down.png');
        game.load.image('player', '../games009/assets/player.png');
        game.load.image('playerHot', '../games009/assets/playerHot.png');
        game.load.image('playerS', '../games009/assets/playerS.png');
        game.load.image('playerHotS', '../games009/assets/playerHotS.png');
        game.load.image('iceS', '../games009/assets/iceS.png');
        game.load.image('ice', '../games009/assets/ice.png');
        game.load.image('cactus', '../games009/assets/cactus.png');
        game.load.image('bossIcon', '../games009/assets/bossIcon.png');
        game.load.image('clipIcon', '../games009/assets/clipicon.png');
        game.load.image('timeline', '../games009/assets/timeline.png');
        game.load.image('sun', '../games009/assets/sun.png');
        game.load.image('moon', '../games009/assets/moon.png');
        game.load.image('mid', '../games009/assets/mid.png');
        game.load.image('bubble', '../games009/assets/bubble.png');
        game.load.image('enemy1S', '../games009/assets/enemy1S.png');
        game.load.image('enemy2S', '../games009/assets/enemy2S.png');
        game.load.image('enemy1', '../games009/assets/enemy1.png');
        game.load.image('enemy2', '../games009/assets/enemy2.png');
        game.load.image('enemy3', '../games009/assets/enemy3.png');
        game.load.image('enemy4', '../games009/assets/enemy4.png');
        game.load.image('enemy5', '../games009/assets/enemy5.png');
        game.load.image('bossDie', '../games009/assets/bossDie.png');
        game.load.image('win', '../games009/assets/win.png');
        game.load.image('lose', '../games009/assets/lose.png');
        game.load.image('endBoard', '../games009/assets/endBoard.png');
        game.load.image('endInfo', '../games009/assets/endInfo.png');
        game.load.image('badEnd1', '../games009/assets/badEnd1.png');
        game.load.image('badEnd2', '../games009/assets/badEnd2.png');
        game.load.spritesheet('startbutton', '../games009/assets/startbutton.png', 100, 100, 2);
        game.load.spritesheet('boss', '../games009/assets/boss.png', 230, 280, 6);
        game.load.spritesheet('skip', '../games009/assets/skip.png', 100, 50, 2);
        game.load.spritesheet('warning', '../games009/assets/warning.png', 160, 80, 2);
        game.load.spritesheet('fireS', '../games009/assets/fireS.png', 80, 96, 4);
        game.load.spritesheet('fire', '../games009/assets/fire.png', 200, 240, 4);
        game.load.spritesheet('enemymelt1S', '../games009/assets/enemymelt1S.png', 68, 50, 4);
        game.load.spritesheet('enemymelt2S', '../games009/assets/enemymelt2S.png', 68, 50, 4);
        game.load.spritesheet('enemymelt1', '../games009/assets/enemymelt1.png', 110, 80, 4);
        game.load.spritesheet('enemymelt2', '../games009/assets/enemymelt2.png', 110, 80, 4);
        game.load.spritesheet('enemymelt3', '../games009/assets/enemymelt3.png', 110, 80, 4);
        game.load.spritesheet('enemymelt4', '../games009/assets/enemymelt4.png', 110, 80, 4);
        game.load.spritesheet('enemymelt5', '../games009/assets/enemymelt5.png', 110, 80, 4);
        game.load.spritesheet('boom', '../games009/assets/boom.png', 50, 50, 2);
        game.load.spritesheet('explode1S', '../games009/assets/explode1S.png', 50, 50, 4);
        game.load.spritesheet('explode2S', '../games009/assets/explode2S.png', 50, 50, 4);
        game.load.spritesheet('explode1', '../games009/assets/explode1.png', 80, 80, 4);
        game.load.spritesheet('explode2', '../games009/assets/explode2.png', 80, 80, 4);
        game.load.spritesheet('explode3', '../games009/assets/explode3.png', 80, 80, 4);
        game.load.spritesheet('hit1', '../games009/assets/hit1.png', 40, 40, 2);
        game.load.spritesheet('hit2', '../games009/assets/hit2.png', 80, 80, 2);
        game.load.spritesheet('BarDownS', '../games009/assets/BarDownS.png', 20, 60, 5);
        game.load.spritesheet('BarUpS', '../games009/assets/BarUpS.png', 20, 60, 5);
        game.load.spritesheet('BarDownB', '../games009/assets/BarDownB.png', 26, 90, 10);
        game.load.spritesheet('BarUpB', '../games009/assets/BarUpB.png', 26, 90, 10);
        game.load.spritesheet('OK', '../games009/assets/OK.png', 70, 40, 2);
        game.load.spritesheet('cancel', '../games009/assets/cancel.png', 30, 30, 2);
        game.load.audio('bgm', '../games009/assets/bgm.mp3');
        game.load.audio('hit', '../games009/assets/hit.mp3');
        // game.load.audio('readyGo', '../games009/assets/readyGo.mp3');
        game.load.audio('heavyHit', '../games009/assets/heavyHit.mp3');
        game.load.audio('shot', '../games009/assets/shot.mp3');
        game.load.audio('boom', '../games009/assets/boom.mp3');
        game.load.audio('iceExplode', '../games009/assets/iceExplode.mp3');
        game.load.audio('explode', '../games009/assets/explode.mp3');
        game.load.audio('siren', '../games009/assets/siren.mp3');
        game.load.audio('gameOver', '../games009/assets/gameOver.mp3');
        game.load.audio('trueEnd', '../games009/assets/trueEnd.mp3');
        game.load.audio('victory', '../games009/assets/victory.mp3');
        game.load.audio('lose', '../games009/assets/lose.mp3');
        game.load.audio('bossBGM', '../games009/assets/bossBGM.mp3');
        game.load.audio('ufo', '../games009/assets/ufo.mp3');
        game.load.audio('iceDie', '../games009/assets/iceDie.mp3');
        game.load.audio('fireDie', '../games009/assets/fireDie.mp3');
        game.load.audio('enter', '../games009/assets/enter.mp3');
        game.load.audio('cancel', '../games009/assets/cancel.mp3');
        // 用來預讀字型
        game.add.text(game.width/2-45, -50, "000", style);
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
        // 開始介面
        this.startUI();
        // 遊戲設定
        this.setting();
    },

    // 介面
    startUI: function(){
        game.add.image(0,0,'background1');
        game.add.image(0,0,'frame');
        game.startBtn = game.add.button(game.width/2,game.height/2,'startbutton',this.onStartClick,this,0,1,1);
        game.startBtn.anchor.setTo(0.5,0.5);
        game.startBtn.alpha = 0;
        var tween = game.add.tween(game.startBtn).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);

    },

    // 遊戲設定
    setting: function(){

        // 精靈產生條件
        enemy = true;
        // 換天條件
        day = true;
        // 夜晚條件
        night =true;
        // 關卡條件
        day2flag = false;
        day3flag = false;
        bossDay = false;
        // 升降溫條件
        canCost = false;
        // 可射擊條件
        canAtk = true;
        // 溫度計動畫條件
        tAni = true;
        // 升溫條件
        tUp = true;
        // 降溫條件
        tDown = true;
        // 分數歸0
        game.score = 0;
        // 時間軸計數器
        count = 0;
        // 溫度計bar條比例值
        tValue = 0;
        // 判斷死亡條件
        dead = false;
        // 教學skip條件
        skipFlag = true;
        // 怪物隨機值範圍
        enemyLim = 1;
        enemyMax = 2;
        // 子彈數設定
        game.clipValue = clipValue;
        // 有無扣點完成遊戲判斷(最後遊戲結束需回傳資料庫狀態)
        pointCostFlag = false;
        // 有無扣每日免費次數完成遊戲判斷(1.最後遊戲結束需回傳資料庫狀態 2.在遊戲最後回傳是為了以免玩家扣完點在遊戲中途當機起紛爭的證據 3.回傳false的話他有扣免費次數可證明他因當機或其他原因而中斷遊戲)
        freeCountCostFlag = false;        
        // 有無按過按鈕條件
        freeCost = false;
        pointCost = false;
        // 伺服器連接成功flag 
        phpsuccess = false;

    /********************* 取得資料庫設定數值 *********************/
    // (淑貞看這)

        $(function () {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }, //權限TOKEN
                url: '/game/data', //取得遊戲參數的位址
                data: {
                    game: 'games009'
                }, //送出 game 參數(值為遊戲識別名稱)
                type: 'POST', //使用 POST傳送
                success: function (data) //傳送成功的function
                {
                    // 精靈生成間格時間
                    enemyInterval = parseFloat(data.enemyInterval); // 秒
                    
                    // 精靈速度
                    enemyVelocity = parseInt(data.enemyVelocity);
                    enemyVelocityLim = parseInt(data.enemyVelocityLim);
                    enemyVelocityMax = parseInt(data.enemyVelocityMax);
        
                    // 精靈生命
                    enemyLife1 = parseInt(data.enemyLife1);
                    enemyLife2 = parseInt(data.enemyLife2);
                    enemyLife3 = parseInt(data.enemyLife3);
                    bossLife = parseInt(data.bossLife);
                    
                    // 精靈融化溫度幅度等級
                    level1 = parseInt(data.level1);
                    level2 = parseInt(data.level2);
                    level3 = parseInt(data.level3);
                    
                    // 自動溫度升降級數
                    tValueLV1 = parseInt(data.tValueLV1);
                    tValueLV2 = parseInt(data.tValueLV2);
                    tValueLV3 = parseInt(data.tValueLV3);
                    
                    // 彈匣數
                    clipValue = parseInt(data.clipValue);
                   
                    // 彈匣氣泡補充量
                    clipBonus = parseInt(data.clipBonus);
                    
                    // 彈匣補充間格時間
                    bubbleIntervalLim = parseInt(data.bubbleIntervalLim);// 秒
                    bubbleIntervalMax = parseInt(data.bubbleIntervalMax);// 秒
                    
                    // 彈匣氣泡移動速度
                    bubbleVelocity = parseInt(data.bubbleVelocity);
                    
                    // 分數
                    enemyScoreLV1 = parseInt(data.enemyScoreLV1);
                    enemyScoreLV2 = parseInt(data.enemyScoreLV2);
                    enemyScoreLV3 = parseInt(data.enemyScoreLV3);
                    bossScore = parseInt(data.bossScore);

                    // 缺失分數降幅
                    scoreDecline = parseFloat(data.scoreDecline);
                    
                    // 溶化得分增益
                    scoreBuff = parseFloat(data.scoreBuff);
                    
                    // 時間軸速度
                    timeVelelocity = parseInt(data.timeVelelocity);


                    console.log('怪物生成間格時間：' + parseFloat(data.enemyInterval) + '秒');
                    console.log('怪物速度：' + '定值：' + parseInt(data.enemyVelocity),'範圍最小值：' + parseInt(data.enemyVelocityLim),'範圍最大值：' + parseInt(data.enemyVelocityMax));
                    console.log('精靈生命：' + '小隻：' + parseInt(data.enemyLife1),'大隻：' + parseInt(data.enemyLife2),'雙屬：' + parseInt(data.enemyLife3),'Boss：' + parseInt(data.bossLife));
                    console.log('精靈融化溫度幅度等級：' + '小隻：' + parseInt(data.level1),'大隻：' + parseInt(data.level2),'雙屬：' + parseInt(data.level3));
                    console.log('精靈融化溫度幅度等級：' + '小隻：' + parseInt(data.level1),'大隻：' + parseInt(data.level2),'雙屬：' + parseInt(data.level3));
                    console.log('自動溫度升降級數：' + '第一天：' + parseInt(data.tValueLV1),'第二天：' + parseInt(data.tValueLV2),'第三天以後：' + parseInt(data.tValueLV3));
                    console.log('彈匣數：' + parseInt(data.clipValue));
                    console.log('彈匣氣泡補充量：' + parseInt(data.clipBonus));
                    console.log('彈匣補充間格時間：' +'最快'+ parseInt(data.bubbleIntervalLim), '最慢' + parseInt(data.bubbleIntervalMax));
                    console.log('彈匣氣泡移動速度：' + parseInt(data.bubbleVelocity));
                    console.log('分數：' + '小隻：' + parseInt(data.enemyScoreLV1),'大隻：' + parseInt(data.enemyScoreLV2),'雙屬：' + parseInt(data.enemyScoreLV3),'Boss：' + parseInt(data.bossScore));
                    console.log('缺失分數降幅：' + parseFloat(data.scoreDecline));
                    console.log('溶化得分增益：' + parseFloat(data.scoreBuff));
                    console.log('時間軸速度：' + parseInt(data.timeVelelocity));
                    
                    // 伺服器連接成功flag 
                    phpsuccess = true; 
                }
            });
        });


    /********************* 取得資料庫設定數值 *********************/
    },
    
    onStartClick:function(){
        if(game.stFlag){
            game.stFlag = false;
            // 音效
            this.enter = game.add.audio('enter', 0.5, false);
            try{
                this.enter.play();
            }catch(e){} 
            var tween = game.add.tween(game.startBtn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(function(){
                // 判斷有無連結資料庫(淑貞看這)
                if(phpsuccess){
                    // 會員點數相關 state
                    game.state.start('cost');                
                }else{
                    // 遊戲教學 state
                    game.state.start('turtorial');                
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
        game.add.image(0,0,'background1');

    /********** 判斷出哪個板子 **********/

        /**** 每日免費遊玩 ****/
        // 按鍵互鎖開關
        var btFlag = true;
        if(canFreeTimes > 0){ 
            // 免費遊玩板子
            game.pointBoard1 = game.add.sprite(0,450,'pointBoard1');
            // 板子浮出動態效果
            var tweenUp =game.add.tween(game.pointBoard1).to({y:5},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
            // 免費遊玩資訊 
            game.freePlay = game.pointBoard1.addChild(game.add.text(175,222,canFreeTimes+ ' / ' +freeTimes,tStyle));
            // 字體筆畫效果
            game.freePlay.align = 'center';
            game.freePlay.stroke = "#aa362b";   
            game.freePlay.strokeThickness = 4;
            // 確定按鈕
            game.OK = game.pointBoard1.addChild(game.add.button(105,308,'OK',function(){
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
                        // 板子降落動態效果
                        var tweenDown =game.add.tween(game.pointBoard1).to({y:450},1500,Phaser.Easing.Sinusoidal.InOut,true,500, 0, false);
                        tweenDown.onComplete.add(function(){
                            game.state.start('turtorial');
                        });                     
                    }
                }

            },1,1,0));
            // 為了按鈕按一次的條件
            var cancelFlag = true;
            // X按鈕
            game.cancel = game.pointBoard1.addChild(game.add.button(190,170,'cancel',function(){
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
                            // 板子降落動態效果
                            var tweenDown =game.add.tween(game.pointBoard1).to({y:450},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
                            tweenDown.onComplete.add(function(){
                                game.state.start('start');
                            }); 
                        }   
                    }
                }
            },1,1,0));
        }else{

        /**** 點數消費玩遊戲板子 ****/

            // 點數花費板子
            game.pointBoard2 = game.add.sprite(0,450,'pointBoard2');
            // 板子浮出動態效果
            var tweenUp =game.add.tween(game.pointBoard2).to({y:5},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
            
            // 需花費點數
            game.costPoint = game.pointBoard2.addChild(game.add.text(156,212,costPoint,tStyle));
            // 字體筆畫效果
            game.costPoint.align = 'center';
            game.costPoint.stroke = "#aa362b";   
            game.costPoint.strokeThickness = 4;

            // 會員剩餘點數/需花費點數
            game.memberPoint = game.pointBoard2.addChild(game.add.text(110,238,memberPoint + ' / ' + costPoint,tStyle));
            // 字體筆畫效果
            game.memberPoint.align = 'center';
            game.memberPoint.stroke = "#aa362b";   
            game.memberPoint.strokeThickness = 4;

            // 判斷點數是否足夠
            if(memberPoint >= costPoint){
                // 確定按鈕
                game.OK = game.pointBoard2.addChild(game.add.button(105,308,'OK',function(){
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
                            // 板子降落動態效果
                            var tweenDown =game.add.tween(game.pointBoard2).to({y:450},1500,Phaser.Easing.Sinusoidal.InOut,true,500, 0, false);
                            tweenDown.onComplete.add(function(){
                                game.state.start('turtorial');
                            }); 
                        }                        
                    }
                },1,1,0));
            }else{
                // 無法遊玩
                game.NoOK = game.pointBoard2.addChild(game.add.sprite(105,308,'NoOK'));
            }
            // 為了按鈕按一次的條件
            var cancelFlag = true;
            // X按鈕
            game.cancel = game.pointBoard2.addChild(game.add.button(190,170,'cancel',function(){
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
                            // 板子降落動態效果
                            var tweenDown =game.add.tween(game.pointBoard2).to({y:450},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
                            tweenDown.onComplete.add(function(){
                                game.state.start('start');
                            });
                        }    
                    }
                }
            },1,1,0));
        }

        // 遊戲背景外框
        game.add.image(0,0,'frame');

    }
}

// 遊戲教學
game.State.turtorial={
    
    create:function(){
        game.add.image(0,0,'background1');
        game.day1 = game.add.image(game.width/2,game.height/2-30,'day1');
        game.day1.anchor.setTo(0.5);
        game.day1.alpha = 0;
        game.infoBoard = game.add.sprite(0,-450,'turtorialInfo');
        var tweenInfo = game.add.tween(game.infoBoard).to({y:0},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
        tweenInfo.onComplete.add(function(){
            game.infoBoard.inputEnabled = true;
            game.infoBoard.events.onInputDown.addOnce(this.gameInfo, this);
        },this);
        game.infoEnemy2 = game.infoBoard.addChild(game.add.image(92,124,'enemy2S'));
        game.infoEnemy1 = game.infoBoard.addChild(game.add.image(92,198,'enemy1S'));
        game.infoExplode2 = game.infoBoard.addChild(game.add.image(92,136,'explode2S'));
        game.infoExplode2.alpha = 0;
        game.infoExplode1 = game.infoBoard.addChild(game.add.image(92,208,'explode1S'));
        game.infoExplode1.alpha = 0;
        game.infoMelt1 = game.infoBoard.addChild(game.add.sprite(140,128,'enemymelt1S'));
        game.infoMelt2 = game.infoBoard.addChild(game.add.sprite(140,204,'enemymelt2S'));
        game.infoBar1 = game.infoBoard.addChild(game.add.sprite(210,124,'BarDownS'));
        game.infoBar2 = game.infoBoard.addChild(game.add.sprite(210,196,'BarUpS'));
        game.infoUp = game.infoBoard.addChild(game.add.image(226,206,'up'));
        game.infoDown = game.infoBoard.addChild(game.add.image(226,140,'down'));
        game.infoBar3 = game.infoBoard.addChild(game.add.sprite(45,288,'BarDownB'));
        game.infoBar4 = game.infoBoard.addChild(game.add.sprite(150,288,'BarUpB'));
        game.infoPlayer01 = game.infoBoard.addChild(game.add.image(68,276,'playerS'));
        game.infoIce = game.infoBoard.addChild(game.add.image(68,276,'iceS'));
        game.infoIce.alpha = 0;
        game.infoPlayer02 = game.infoBoard.addChild(game.add.image(174,276,'playerS'));
        game.infoFire = game.infoBoard.addChild(game.add.sprite(174,276,'fireS'));
        game.infoFire.alpha = 0;
        game.infoPlayerHot = game.infoBoard.addChild(game.add.image(174,276,'playerHotS'));
        game.infoPlayerHot.alpha = 0;
        game.add.image(0,0,'frame');
    },

    // 遊戲資訊
    gameInfo: function(){
        // 聲音大小
        var soundValue = 0.5;
        // 音效
        this.hit = game.add.audio('hit', 0.5, false);
        try{
            this.hit.play();
        }catch(e){}
        
        // skip教學
        game.skip = game.add.button(190,390,'skip',function(){
            if(skipFlag){
                skipFlag = false;
                // 聲音大小歸0
                soundValue = 0;
                this.heavyHit = game.add.audio('heavyHit', 0.5, false);
                try{
                    this.heavyHit.play();
                }catch(e){}
                var skip = game.add.tween(game.skip).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                var infoBoard = game.add.tween(game.infoBoard).to({y:-450},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
                skip.onComplete.addOnce(function(){
                    // Ready Go 音效
                    // var timer = setTimeout(function(){
                    //     this.go = game.add.audio('readyGo', 0.5, false);
                    //     try{
                    //         this.go.play();
                    //     }catch(e){}
                    // },1200);
                    // Ready Go
                    var readyGo = game.add.tween(game.day1).to({ alpha: 1 }, 1500, Phaser.Easing.Bounce.In, true, 300, 0, false);
                    readyGo.onComplete.addOnce(function(){
                        var timer = setTimeout(function(){
                            game.state.start('play');
                        },500);
                    });
                    game.skip.destroy();
                });
            }
        },this,1,0,1);
        game.skip.alpha = 0;
        var skip = game.add.tween(game.skip).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

        // 第一排

        // 射擊特效
        game.hit = game.infoBoard.addChild(game.add.image(98,135,'hit1'));
        var hit = game.hit.animations.add('hit');
        hit.onComplete.addOnce(function(){
                game.hit.destroy();
                // 爆炸音效
                this.explode = game.add.audio('explode', soundValue, false);
                try{
                    this.explode.play();
                }catch(e){}                
                // 火焰小精靈爆炸特效
                game.infoExplode2.alpha = 1;
                var infoExplode2 = game.infoExplode2.animations.add('explode2S',[0, 1], 6, false);
                infoExplode2.play(8,false,false);
                infoExplode2.onComplete.addOnce(function(){
                    // 消除火焰小精靈
                    game.infoEnemy2.destroy();
                    // 將爆炸特效固定在最後一幀
                    game.infoExplode2.frame = 1;
                    // 05秒後
                    var timer = setTimeout(function() {
                        // 冰雪小精靈融化動畫
                        var infoMelt1 = game.infoMelt1.animations.add('infoMelt1',[0, 1, 2], 6, false);
                        infoMelt1.play(8, false, false);
                        infoMelt1.onComplete.addOnce(function(){
                            // 將融化固定在最後一幀
                            infoMelt1.frame = 2;
                            // 0.5秒後
                            var timer = setTimeout(function() {
                                // 溫度計bar條溫度下降動畫
                                var infoBar1 = game.infoBar1.animations.add('infoBar1',[0, 1, 2, 3, 4], 6, false);
                                infoBar1.play();
                                infoBar1.onComplete.addOnce(function(){
                                    var timer = setTimeout(function() {
                                        // 遊戲資訊(第二排)
                                        // 射擊音效
                                        this.hit = game.add.audio('hit', soundValue, false);
                                        try{
                                            this.hit.play();
                                        }catch(e){}
                                        // 射擊特效
                                        game.hit = game.infoBoard.addChild(game.add.image(98,209,'hit1'));
                                        var hit = game.hit.animations.add('hit');
                                        hit.onComplete.addOnce(function(){
                                                game.hit.destroy();
                                                // 爆炸音效
                                                this.explode = game.add.audio('iceExplode', soundValue, false);
                                                try{
                                                    this.explode.play();
                                                }catch(e){}                                                     
                                                // 冰雪小精靈爆炸特效
                                                game.infoExplode1.alpha = 1;
                                                var infoExplode1 = game.infoExplode1.animations.add('explode1S',[0, 1], 6, false);
                                                infoExplode1.play(8,false,false);
                                                infoExplode1.onComplete.addOnce(function(){
                                                    // 消除冰雪小精靈
                                                    game.infoEnemy1.destroy();
                                                    // 將爆炸特效固定在最後一幀
                                                    game.infoExplode1.frame = 1;
                                                    // 0.5秒後
                                                    var timer = setTimeout(function() {
                                                        // 冰雪小精靈融化動畫
                                                        var infoMelt2 = game.infoMelt2.animations.add('infoMelt2',[0, 1, 2], 6, false);
                                                        infoMelt2.play(8, false, false);
                                                        infoMelt2.onComplete.addOnce(function(){
                                                            // 將融化固定在最後一幀
                                                            infoMelt2.frame = 2;
                                                            // 0.5秒後
                                                            var timer = setTimeout(function() {
                                                                // 溫度計bar條溫度下降動畫
                                                                var infoBar2 = game.infoBar2.animations.add('infoBar2',[0, 1, 2, 3, 4], 6, false);
                                                                infoBar2.play();
                                                                infoBar2.onComplete.addOnce(function(){
                                                                    // 遊戲資訊(第三排)
                                                                    var infoBar3 = game.infoBar3.animations.add('infoBar3',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4, false);
                                                                    infoBar3.play();
                                                                    infoBar3.onComplete.addOnce(function(){
                                                                        // 結冰音效
                                                                        this.ice = game.add.audio('iceDie', soundValue, false);
                                                                        try{
                                                                            this.ice.play();
                                                                        }catch(e){} 
                                                                        // 結冰
                                                                        var tweenIce = game.add.tween(game.infoIce).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                                                                        tweenIce.onComplete.addOnce(function(){
                                                                            var infoBar4 = game.infoBar4.animations.add('infoBar4',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4, false);
                                                                            infoBar4.play();
                                                                            infoBar4.onComplete.addOnce(function(){
                                                                                // 燃燒音效
                                                                                this.fire = game.add.audio('fireDie', soundValue, false);
                                                                                try{
                                                                                    this.fire.play();
                                                                                }catch(e){}   
                                                                                // 燃燒
                                                                                var fireAnim = game.add.tween(game.infoFire).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false); 
                                                                                var fireS = game.infoFire.animations.add('fireS',[0, 1, 2, 3], 8,true);
                                                                                fireS.play();
                                                                                // 燒紅的仙人掌
                                                                                var infoPlayerHot = game.add.tween(game.infoPlayerHot).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                                                                                infoPlayerHot.onComplete.add(function(){
                                                                                    game.infoPlayer02.destroy();
                                                                                    // 點擊螢幕開始遊戲

                                                                                    game.infoBoard.events.onInputDown.addOnce(function(){
                                                                                        this.heavyHit = game.add.audio('heavyHit', 0.5, false);
                                                                                        try{
                                                                                            this.heavyHit.play();
                                                                                        }catch(e){}
                                                                                        // 淡出skip按鈕
                                                                                        var skip = game.add.tween(game.skip).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                                                                                        skip.onComplete.addOnce(function(){
                                                                                            game.skip.destroy();
                                                                                        });
                                                                                        // 教學板子收回
                                                                                        var infoBoard = game.add.tween(game.infoBoard).to({y:-450},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
                                                                                        // Ready Go 音效
                                                                                        // var timer = setTimeout(function(){
                                                                                        //     this.go = game.add.audio('readyGo', 0.5, false);
                                                                                        //     try{
                                                                                        //         this.go.play();
                                                                                        //     }catch(e){}
                                                                                        // },1200);
                                                                                        // Ready Go
                                                                                        var readyGo = game.add.tween(game.day1).to({ alpha: 1 }, 1500, Phaser.Easing.Bounce.In, true, 300, 0, false);
                                                                                        readyGo.onComplete.addOnce(function(){
                                                                                            var timer = setTimeout(function(){
                                                                                                game.state.start('play');
                                                                                            },500);
                                                                                        });                                                         
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            },500);
                                                        });
                                                    }, 500);
                                                });             
                                            });   
                                        hit.play(15,false,false);
                                    },500);
                                });
                            },500);
                        });
                    }, 500);
                });             
            });   
        hit.play(15,false,false);
    },
}

// 遊玩遊戲
game.State.play={

    preload:function(){

        // 設定數值防呆
        if(enemyInterval < 0.2){
            enemyInterval = 0.2;
            console.log('enemyInterval 精靈生成間格時間數值超過，因此設定為：'+ enemyInterval + '秒');
        }
        if(enemyVelocity > 600){
            enemyVelocity = 600;
            console.log('enemyVelocity 精靈速度(定值)數值超過，因此設定為：'+ enemyVelocity);
        }
        if(enemyVelocityLim > 600){
            enemyVelocityLim = 600;
            console.log('enemyVelocityLim 精靈速度(定值)數值超過，因此設定為：'+ enemyVelocityLim);
        }
        if(enemyVelocityMax > 600){
            enemyVelocityMax = 600;
            console.log('enemyVelocity 精靈速度(定值)數值超過，因此設定為：'+ enemyVelocityMax);
        }
        if(level1 > 25){
            level1 = 25;
            console.log('level1 精靈融化溫度幅度 LV1 數值超過，因此設定為：'+ tValueLV1);
            
        }
        if(level2 > 25){
            level2 = 25;
            console.log('level2 精靈融化溫度幅度 LV2 數值超過，因此設定為：'+ tValueLV2);
        }
        if(level3 > 25){
            level3 = 25;
            console.log('level3 精靈融化溫度幅度 LV3 數值超過，因此設定為：'+ tValueLV3);
        }
        if(tValueLV1 > 25){
            tValueLV1 = 25;
            console.log('tValueLV1 自動溫度升降 LV1 數值超過，因此設定為：'+ tValueLV1);
            
        }
        if(tValueLV2 > 25){
            tValueLV2 = 25;
            console.log('tValueLV2 自動溫度升降 LV2 數值超過，因此設定為：'+ tValueLV2);
        }
        if(tValueLV3 > 25){
            tValueLV3 = 25;
            console.log('tValueLV3 自動溫度升降 LV3 數值超過，因此設定為：'+ tValueLV3);
        }
        if(timeVelelocity > 35){
            timeVelelocity = 35;
            console.log('timeVelelocity 時間軸速度 數值超過，因此設定為：'+ timeVelelocity);
        }

    },

    create:function(){
        // 背景精靈     
        game.bg2 = game.add.sprite(0,0,'background2');
        game.bg1 = game.add.sprite(0,0,'background1');
        game.bg1.alpha = 1;
        // Ready Go
        // this.soundFx('readyGo', 0.5, false);
        game.day1 = game.add.image(game.width/2,game.height/2-30,'day1');
        game.day1.anchor.setTo(0.5);
        // 底部碰撞框
        game.bottom = game.add.sprite(0,450,'bottom');
        game.physics.arcade.enable(game.bottom); 
        game.bottom.body.setSize(350, 50);
        // 開啟可輸入訊號條件
        game.bg1.inputEnabled = true;
        game.bg1.input.priorityID = 1;
        game.bg2.inputEnabled = true;
        game.bg2.input.priorityID = 1;
        // boss
        game.boss = game.add.sprite(400, game.height/2,'boss');
        game.boss.anchor.setTo(0.5);
        var anim = game.boss.animations.add('boss');
        anim.play(12,true,false); // (幀數,是否循環，是否在不循環前提下播完銷毀)
        game.boss.alpha = 0;
        // boss 死亡
        game.bossDie = game.add.sprite(game.width/2, game.height/2,'bossDie');
        game.bossDie.anchor.setTo(0.5);
        game.bossDie.alpha = 0;
        // 玩家
        game.player = game.add.image(game.width/2,500,'player');
        game.player.anchor.setTo(0.5,0.5);
        // 結冰物件
        game.ice = game.add.sprite(0,0,'ice');
        game.ice.alpha = 0;
        // 燃燒物件
        game.fire = game.add.sprite(game.player.x,330,'fire');
        game.fire.alpha = 0;
        game.fire.anchor.setTo(0.5, 0.5);
        // 關卡資訊
        game.day3 = game.add.sprite(0, game.height, 'day3');
        game.day3.inputEnabled = true;
        game.day3.input.priorityID = 0;
        game.day2 = game.add.sprite(0, game.height, 'day2');
        game.day2.inputEnabled = true;
        game.day2.input.priorityID = 0;
        // 仙人掌出現動畫
        var tween = game.add.tween(game.player).to({y:380},500,Phaser.Easing.Sinusoidal.InOut,true);
        game.add.sprite(0,0,'frame');
        // 開啟ARCADE物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // 背景音樂
        this.bgm = game.add.audio('bgm', 0.5, true);
        try{
            this.bgm.play();
        }catch(e){}
        // 敵方對象池
        this.enemys = game.add.group();
        this.enemys.lastEnemyTime = 0;

        /********** 補充彈匣們 **********/

        // 補充彈匣氣泡對象池
        this.bubbleItems = game.add.group();
        this.bubbleItems.lastBubbleTime = 0;
        // 關卡1溫度上升級數設定
        tValueLV = tValueLV1;
        // 時間軸
        game.timeBar = game.add.sprite(game.width/2,-20,'timeline');
        game.timeBar.tint = 0xD5E8B8;
        game.timeBar.anchor.setTo(0.5);
        game.sun = game.add.sprite(-20,30,'sun');
        game.sun.anchor.setTo(0.5);  
        var tweenSun =game.add.tween(game.sun).to({x:40},500,Phaser.Easing.Sinusoidal.InOut,true);
        game.moon = game.add.sprite(320,30,'moon');
        game.moon.anchor.setTo(0.5);
        var tweenMoon =game.add.tween(game.moon).to({x:260},500,Phaser.Easing.Sinusoidal.InOut,true);         
        var tweenTime =game.add.tween(game.timeBar).to({y:30},500,Phaser.Easing.Sinusoidal.InOut,true);
        tweenTime.onComplete.add(function(){
            game.mid = game.add.sprite(game.width/2, 30, 'mid');
            game.mid.anchor.setTo(0.5);
            game.cactus = game.add.sprite(80,30,'cactus');
            game.cactus.anchor.setTo(0.5);
            game.clip = game.add.sprite(game.width/2+30,65,'clipIcon');
            game.clip.anchor.setTo(0.5);
            game.scoreText = game.add.text(game.width/2-45, 70, "Score: 0", style);
            game.scoreText.anchor.setTo(0.5,0.5);
            game.clipText = game.add.text(game.width/2+70, 70, "X "+ game.clipValue, clipStyle);
            game.clipText.anchor.setTo(0.5,0.5);  
        });
        // 溫度量條
        game.tBar1 = game.add.sprite(-20,85,'tBar1');
        game.tBar2 = game.add.sprite(-20,85,'tBar2');
        var tweenT =game.add.tween(game.tBar1).to({x:10},500,Phaser.Easing.Sinusoidal.InOut,true);
        var tweenT2 =game.add.tween(game.tBar2).to({x:10},500,Phaser.Easing.Sinusoidal.InOut,true);
        tweenT.onComplete.add(this.TUI,this);

    },

    update:function(){
        
        // 一開始溫度計介面動態
        this.TUIAnim();

        // 攻擊監聽
        this.checkAtk();

        // 關卡變化
        this.levelChange();

        // 遊戲主邏輯
        this.gameMain();

    },

    // 溫度計UI
    TUI: function(){

        game.T = game.add.sprite(10,233,'T');
        game.T.anchor.setTo(0,1);
        game.T.scale.y = tValue;
        // 溫度計動態
        this.TComplete = game.time.create(true);
        this.TComplete.loop(Phaser.Timer.SECOND * 0.1, function() {
            tValue+=0.05
            game.T.scale.y = tValue;
            if(game.T.scale.y > 0.55){
                // 紅
                game.T.tint = 0xDA4532;
            }else{
                // 藍
                game.T.tint = 0x2EA7E0;
            }
            tAni = true;
        }, this);
        this.TComplete.start();
        game.tBar2_02 = game.add.sprite(10,85,'tBar2');
        game.tBar2.kill();
        game.tBar3 = game.add.sprite(10,85,'tBar3');
        game.tBar4 = game.add.sprite(10,85,'tBar4');
        game.dieHot = game.add.sprite(10,85,'dieHot');
        game.dieCold = game.add.sprite(10,85,'dieCold');
        // 死亡溫度計
        game.dieHot.alpha = 0;
        game.dieCold.alpha = 0;
    }, 

    // 一開始溫度計介面動態
    TUIAnim: function(){
        if(tValue >= 0.55 && tAni == true){
            tAni = false;
            tValue = 0.55;
            var tweenDay1 =game.add.tween(game.day1).to({ alpha: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
            tweenDay1.onComplete.addOnce(function(){
                canCost = true;
            });
            game.bg1.events.onInputDown.add(this.attack, this);
            game.bg2.events.onInputDown.add(this.attack, this);
            this.TComplete.stop();
        }
    },

    // 遊戲主邏輯
    gameMain: function(){
        if(canCost){             
            // 時間軸跑條
            if(game.cactus){
                // 日夜切換期間不生怪與自動升降溫規則
                if(game.cactus.x >= game.width/2-10 && game.cactus.x <= game.width/2+10){
                    enemy = false;
                    tDown = false;
                    tUp = false;
                }
                if(game.cactus.x >= game.width/2 + timeVelelocity){
                    enemy = true;
                    tDown = true;
                    tUp = false;
                }
                if(game.cactus.x <= game.width/2 - timeVelelocity){
                    tUp = true;
                    tDown = false;
                }
                // 換天
                if(game.cactus.x >= 225 && day){
                    day = false;
                    game.add.tween(game.cactus).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                        // 時間軸計數
                        count = count + 1;
                        if(count < 4){
                            game.cactus.x = 75;
                            // 開啟換天條件
                            day = true;
                        }
                        console.log('換天');
                        game.add.tween(game.cactus).to( { alpha: 1 }, 900, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                            // 開啟生怪條件
                            enemy = true;
                        });
                    });
                    canAtk = true;
                    game.bg1.inputEnabled = true;
                    game.bg1.input.priorityID = 1;
                    game.bg2.inputEnabled = true;
                    game.bg2.input.priorityID = 1;
                }

                // 日夜切換
                if(game.cactus.x >= game.width/2 && night){
                    night = false;
                    console.log('晚上');
                    var tween = game.add.tween(game.bg1).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
                }
                if(game.cactus.x === 75 && game.cactus.alpha === 1){
                    console.log('早上');
                    var tween = game.add.tween(game.bg1).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                    tween.onComplete.add(function(){
                        night = true;
                    });
                }
                if(game.cactus.alpha === 1 && !bossDay){
                    game.cactus.x = game.cactus.x + timeVelelocity * 0.01;
                }
                // 生怪開關
                if(game.cactus.x >= 220){
                    enemy = false;
                }
                // 生怪和彈匣
                if(enemy){
                    this.generateEnemy(enemyVelocity);
                    this.generateBubble(bubbleVelocity);
                }
                if(game.bubbleItem){
                    // 打中泡泡
                    game.bubbleItem.events.onInputDown.add(this.attackBubble, this);
                }
            }
            // 溫度計顏色變化
            if(game.T.scale.y > 0.55){
                // 紅
                game.T.tint = 0xDA4532;
            }else{
                // 藍
                game.T.tint = 0x2EA7E0;
            }
            if(tValue < 0){
                tValue = 0;
            }

            // 血條變化
            if(bossDay && game.bossIcon.x <= game.width/2){
                game.timeBar.tint = 0xda4532;
            }  

            // 早上夜晚升降溫判斷
            if(tUp === true){
                tValue = tValue + 0.0001 * tValueLV;
            }
            if(tDown === true){
                tValue = tValue - 0.0001 * tValueLV;
            }

            // 死亡判斷
            this.checkDie();

            // 偵測怪物有無出界
            game.physics.arcade.overlap(this.enemys, game.bottom, this.outEnemy, null, this)
            game.T.scale.y = tValue;
        } 
    },
    
    // 關卡變化
    levelChange: function(){
        if(!dead && tValue > 0.1 && tValue < 1){
            // 關卡2設定
            if(count === 1){
                game.timeBar.tint = 0x329E4B;
                enemyLim = 1;
                enemyMax = 4;
                tValueLV = tValueLV2;
                day2flag = true;
            }
            // 關卡2看板動態
            if(day2flag){
                canCost = false;
                day2flag = false;
                canAtk = false;
                dead = false; // 確保不在死亡狀態
                // 為了讓 if(count === 1) 這判斷式不要重複執行
                count = count + 1;
                var tweenP = game.add.tween(game.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent1 = game.add.tween(game.tBar1).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent2 = game.add.tween(game.tBar2_02).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent3 = game.add.tween(game.tBar3).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent4 = game.add.tween(game.tBar4).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweenT = game.add.tween(game.T).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweenDay = game.add.tween(game.day2).to({y:0},1500,Phaser.Easing.Sinusoidal.InOut,true,1000, 0, false);           
                tweenDay.onComplete.add(function(){
                    game.day2.events.onInputDown.add(function(){
                        this.heavyHit = game.add.audio('heavyHit', 0.5, false);
                        try{
                            this.heavyHit.play();
                        }catch(e){}
                        canAtk = true;
                        this.effect(game.input.x, game.input.y, 0.5, 0.5, 'hit2', 15);
                        game.camera.flash(0xffffff, 300);
                        game.day2.inputEnabled = false;
                        var tweenDay_02 = game.add.tween(game.day2).to({y:300},1500,Phaser.Easing.Sinusoidal.InOut,true, 0, 0, false);
                        tweenDay_02.onComplete.add(function(){
                            // 溫度計淡入
                            var tweenP = game.add.tween(game.player).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent1 = game.add.tween(game.tBar1).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent2 = game.add.tween(game.tBar2_02).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent2 = game.add.tween(game.tBar3).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent4 = game.add.tween(game.tBar4).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweenT = game.add.tween(game.T).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            game.day2.kill();
                            tweenT.onComplete.add(function(){
                                this.TComplete = game.time.create(true);
                                this.TComplete.loop(Phaser.Timer.SECOND * 0.1, function() {
                                    tValue+=0.05
                                    game.T.scale.y = tValue;
                                    if(game.T.scale.y > 0.55){
                                        // 紅
                                        game.T.tint = 0xDA4532;
                                    }else{
                                        // 藍
                                        game.T.tint = 0x2EA7E0;
                                    }
                                    tAni = true;
                                }, this);
                                this.TComplete.start();
                                if(tValue >= 0.55 && tAni == true){
                                    tValue = 0.55;
                                    canCost = true;
                                    canAtk = true;
                                    this.TComplete.stop();
                                    tAni = false;
                                }                           
                            },this);
                        },this);
                    },this);
                },this);
            }
            // 關卡2怪物速度(板子動態完成後才做怪物速度設定)
            if(count === 2){
                enemyVelocity = game.rnd.integerInRange(enemyVelocityLim, enemyVelocityMax);
                // console.log(enemyVelocity);
            }
            // 關卡3設定
            if(count === 3){
                game.timeBar.tint = 0x066934;
                enemyLim = 1;
                enemyMax = 5;
                tValueLV = tValueLV3; 
                day3flag = true;
            }
            // 關卡3看板動態
            if(day3flag){
                canCost = false;
                day3flag = false;
                canAtk = false;
                dead = false;// 確保不在死亡狀態
                // 為了讓 if(count === 3) 不要重複執行
                count = count + 1;
                var tweenP = game.add.tween(game.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent1 = game.add.tween(game.tBar1).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent2 = game.add.tween(game.tBar2_02).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent3 = game.add.tween(game.tBar3).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweent4 = game.add.tween(game.tBar4).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweenT = game.add.tween(game.T).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tweenDay = game.add.tween(game.day3).to({y:0},1500,Phaser.Easing.Sinusoidal.InOut,true,1000, 0, false);           
                tweenDay.onComplete.add(function(){
                    game.day3.events.onInputDown.add(function(){   
                        this.heavyHit = game.add.audio('heavyHit', 0.5, false);
                        try{
                            this.heavyHit.play();
                        }catch(e){}                       
                        canAtk = true;              
                        this.effect(game.input.x, game.input.y, 0.5, 0.5, 'hit2', 15);
                        game.camera.flash(0xffffff, 300);
                        game.day3.inputEnabled = false;
                        var tweenDay_02 = game.add.tween(game.day3).to({y:300},1500,Phaser.Easing.Sinusoidal.InOut,true, 0, 0, false);
                        tweenDay_02.onComplete.add(function(){
                            game.day3.kill();
                            // 溫度計淡入
                            var tweenP = game.add.tween(game.player).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent1 = game.add.tween(game.tBar1).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent2 = game.add.tween(game.tBar2_02).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent2 = game.add.tween(game.tBar3).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweent4 = game.add.tween(game.tBar4).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            var tweenT = game.add.tween(game.T).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                            tweenT.onComplete.add(function(){
                                this.TComplete = game.time.create(true);
                                this.TComplete.loop(Phaser.Timer.SECOND * 0.1, function() {
                                    tValue+=0.05
                                    game.T.scale.y = tValue;
                                    if(game.T.scale.y > 0.55){
                                        // 紅
                                        game.T.tint = 0xDA4532;
                                    }else{
                                        // 藍
                                        game.T.tint = 0x2EA7E0;
                                    }
                                    tAni = true;
                                }, this);
                                this.TComplete.start();
                                if(tValue >= 0.54 && tAni == true){
                                    tValue = 0.55;
                                    canCost = true;
                                    canAtk = true;
                                    this.TComplete.stop();
                                    tAni = false;
                                }                           
                            },this);
                        },this);
                    },this);
                },this);
            }

            // 關卡3怪物速度(板子動態完成後才做怪物速度設定)
            if(count === 4){
                enemyVelocity = game.rnd.integerInRange(enemyVelocityLim, enemyVelocityMax);
                // console.log(enemyVelocity);
            }

            // boss關卡
            if(count === 5){
                console.log(game.cactus.x, game.cactus.y);
                bossDay = true;
                game.cactus.kill();
                dead = false;
            }

            if(bossDay && count <= 5){
                // 關閉死亡條件
                dead = false;// 確保不在死亡狀態
                // 關閉攻擊條件等boss出場
                canAtk = false;
                // 關閉canCost
                canCost = false;
                console.log('boss關卡');
                // 關閉bgm
                this.bgm.stop();
                this.bgm.destroy();
                // boss出現前警告
                this.soundFx('siren', 0.5, false);
                var effText = game.add.sprite(game.width/2,-50,'warning');                
                effText.anchor.setTo(0.5);
                var anim = effText.animations.add('warning');
                anim.play(4,true,false); 
                var tweenText =game.add.tween(effText).to({y:game.height/2},1000,Phaser.Easing.Sinusoidal.InOut,true);         
                var timer = setTimeout(function(){
                    var vanishText =game.add.tween(effText).to({ alpha: 0 },1000,Phaser.Easing.Linear.None,true, 0, 0, false);
                    vanishText.onComplete.add(function(){
                        effText.destroy();
                    });
                }, 3500);
                // 日月icon滑出
                var tweenSun =game.add.tween(game.sun).to({x:-20},1000,Phaser.Easing.Sinusoidal.InOut,true);         
                var tweenMoon =game.add.tween(game.moon).to({x:320},1000,Phaser.Easing.Sinusoidal.InOut,true);         
                tweenMoon.onComplete.add(function(){
                    game.timeBar.tint = 0x07f29c;
                });
                // boss icon
                game.bossIcon = game.add.sprite(225, 30,'bossIcon');
                game.bossIcon.anchor.setTo(0.5);
                game.bossIcon.alpha = 0;
                game.add.tween(game.bossIcon).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                // 為了讓 if(count === 5) 不要重複執行
                count = count + 1;
                // boss 出現
                game.add.tween(game.boss).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 4500, 0, false);
                var tween=game.add.tween(game.boss).to({x:game.width/2},1500,Phaser.Easing.Sinusoidal.InOut,true, 4500, 0, false);
                tween.onComplete.add(function(){ 
                    // 開啟canCost
                    canCost = true;
                    // 開啟攻擊條件
                    canAtk = true;
                    // 為了讓 enemy = true不要是false
                    game.cactus.x = game.width/2 + 50;
                    game.cactus.destroy();
                    // 開始生怪
                    enemy = true;
                    // 溫度計回復
                    if(game.T.scale.y < 0.55){
                        this.TComplete = game.time.create(true);
                        this.TComplete.loop(Phaser.Timer.SECOND * 0.1, function() {
                            tValue+=0.05
                            game.T.scale.y = tValue;
                            if(game.T.scale.y > 0.55){
                                // 紅
                                game.T.tint = 0xDA4532;
                            }else{
                                // 藍
                                game.T.tint = 0x2EA7E0;
                            }
                            tAni = true;
                        }, this);
                        this.TComplete.start();
                        if(tValue >= 0.54 && tAni == true){
                            tValue = 0.55;
                            canCost = true;
                            canAtk = true;
                            this.TComplete.stop();
                            tAni = false;
                        }     
                    }
                    // boss背景音樂
                    this.bossBGM = game.add.audio('bossBGM', 0.5, true);
                    try{
                        this.bossBGM.play();
                    }catch(e){}

                    // boss精靈設定
                    game.boss.inputEnabled = true;
                    game.boss.input.priorityID = 2;
                    game.boss.events.onInputDown.add(this.attackEnemy, this);
                    game.bossLife = bossLife;
                },this);
            }
        }    
    },

    // 打中彈匣泡泡
    attackBubble: function(b){
        console.log('彈匣補充')
        canAtk = true;
        b.kill();
        this.effect(b.x, b.y, 0.5, 0.5, 'boom', 20);
        game.clipValue = game.clipValue + clipBonus;
        this.clipBonusEff(b.x, b.y, clipBonus);
        game.clipText.setText("X "+ game.clipValue);
    },

    // 攻擊監聽
    checkAtk: function(){
        if(!canAtk){
            game.bg1.inputEnabled = false;
            game.bg2.inputEnabled = false;
            // 關閉可打boss
            game.boss.inputEnabled = false;
        }
        if(canAtk){
            game.bg1.inputEnabled = true;
            game.bg2.inputEnabled = true;
        }
        if(game.clipValue<=0){
            canAtk = false;
        }
    },

    // 攻擊(打到背景)
    attack: function(){
        if(game.clipValue <= 0){
            game.clipValue = 0;
            canAtk = false;
        }else{
            console.log('射出');
            game.camera.flash(0xffffff, 100);
            game.clipValue = game.clipValue - 1;
            this.hit = game.add.audio('hit', 0.5, false);
            try{
                this.hit.play();
            }catch(e){}
        }
        // 打空特效
        this.effect(game.input.x, game.input.y, 0.5, 0.5, 'hit1', 15);
        game.scoreText.setText("Score: "+game.score);
        game.clipText.setText("X "+ game.clipValue);
    },

    // 打中怪物
    attackEnemy: function(e){
        // 爆炸特效
        var effect;
        if(game.clipValue<= 0){
            // 不能攻擊
            game.clipValue = 0;
            canAtk = false;
            effect = 'hit1';
            this.soundFx('hit',0.5,false);
        }else{
            console.log('打中');
            this.soundFx('shot',0.3,false);
            if(e.index === 1){
                // console.log('滅冰');
                effect = 'explode1';
                e.Life= e.Life - 1;
                if(e.Life <= 0){
                    this.soundFx('iceExplode',1,false);
                    e.kill();
                    // 分數判斷
                    this.enemyScore(tDown, enemyScoreLV1);
                    // 得分動態
                    this.scoreEff(e.x,e.y,tDown,enemyScoreLV1);
                    // 怪物死亡特效
                    this.effect(e.x, e.y, 0.5, 0.5, effect, 24);
                }else{
                    this.effect(e.x, e.y, 0.5, 0.5, 'hit2', 15);
                }
                // tValue=tValue - 0.05;
            }
            if(e.index === 2){
                // console.log('滅火');
                effect = 'explode2';
                e.Life = e.Life - 1;
                if(e.Life <= 0){
                    this.soundFx('explode',0.5,false);
                    e.kill();
                    // 分數判斷
                    this.enemyScore(tUp, enemyScoreLV1);
                    // 得分動態
                    this.scoreEff(e.x,e.y,tUp,enemyScoreLV1);                    
                    // 怪物死亡特效
                    this.effect(e.x, e.y, 0.5, 0.5, effect, 24);
                }else{
                    this.effect(e.x, e.y, 0.5, 0.5, 'hit2', 15);
                }
                // tValue=tValue + 0.05;
            }
            if(e.index === 3){
                effect = 'explode1'
                e.Life = e.Life - 1;
                if(e.Life <= 0){
                    this.soundFx('iceExplode',1,false);
                    e.kill();
                    // 分數判斷
                    this.enemyScore(tDown, enemyScoreLV2);
                    // 得分動態
                    this.scoreEff(e.x,e.y,tDown,enemyScoreLV2);  
                    // 怪物死亡特效
                    this.effect(e.x, e.y, 0.5, 0.5, effect, 24);
                }else{
                    this.effect(e.x, e.y, 0.5, 0.5, 'hit2', 15);
                }
            }
            if(e.index === 4){
                effect = 'explode2'
                e.Life = e.Life - 1;
                if(e.Life <= 0){
                    this.soundFx('explode',0.5,false);
                    e.kill();
                    // 分數判斷
                    this.enemyScore(tUp, enemyScoreLV2);
                    // 得分動態
                    this.scoreEff(e.x,e.y,tUp,enemyScoreLV2);  
                    // 怪物死亡特效
                    this.effect(e.x, e.y, 0.5, 0.5, effect, 24);
                }else{

                    this.effect(e.x, e.y, 0.5, 0.5, 'hit2', 15);
                }
            }
            if(e.index === 5){
                effect = 'explode3'
                e.Life = e.Life - 1;
                if(e.Life <= 0){
                    this.soundFx('iceExplode',1,false);
                    e.kill();
                    // 怪物死亡特效
                    this.effect(e.x, e.y, 0.5, 0.5, effect, 24);
                    // 冰火小怪打死的話固定加分
                    game.score = game.score + enemyScoreLV3;
                    // 得分動態
                    var ss = game.add.text(e.x, e.y, '+ ' + enemyScoreLV3, style);
                    ss.anchor.setTo(0.5,0.5);
                    var timer =setTimeout(function() {
                        ss.kill()
                    }, 500);
                }else{
                    this.effect(e.x, e.y, 0.5, 0.5, 'hit2', 15);
                }
                
            }
            // boss
            if(e.key==='boss'){
                console.log(game.bossLife);
                effect = 'explode3';
                game.bossLife = game.bossLife - 1;
                // boss HP Bar
                var barLength = 230-75;
                game.bossIcon.x = game.bossIcon.x - barLength/bossLife;
                if(game.bossLife <= 0){
                    canCost = false;
                    this.soundFx('explode',0.5,false);
                    game.boss.inputEnabled = false;
                    // 石化死亡
                    var die1 =game.add.tween(game.bossDie).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                    var die2 =game.add.tween(game.boss).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    die1.onComplete.add(function(){
                        e.kill();
                    },this);
                    // 死亡特效
                    this.effect(e.x, e.y, 0.5, 0.5, effect, 8);
                    var that = this;
                    var dieAni;
                    var effTimer1 = setTimeout(function(){
                        that.effect(e.x+30, e.y+30, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',0.6,false);
                    }, 800);
                    var effTimer2 = setTimeout(function(){
                        that.effect(e.x-30, e.y-30, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',0.7,false);
                        dieAni =game.add.tween(game.bossDie).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                    }, 1200);
                    var effTimer3 = setTimeout(function(){
                        that.effect(e.x+50, e.y+50, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',0.8,false);
                        
                    }, 1500);
                    var effTimer4 = setTimeout(function(){
                        that.effect(e.x-50, e.y+50, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',1,false);
                    }, 1800);
                    var effTimer4 = setTimeout(function(){
                        that.effect(e.x+50, e.y-50, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',1,false);
                    }, 2000);
                    var effTimer4 = setTimeout(function(){
                        that.effect(e.x-50, e.y-50, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',1,false);
                    }, 2200);
                    var effTimer4 = setTimeout(function(){
                        that.effect(e.x, e.y, 0.5, 0.5, effect, 8);
                        that.soundFx('explode',1,false);
                    }, 2500);
                    
                    var endTimer5 = setTimeout(function(){
                        that.overUI('win',game.height/2-30);     
                    }, 3500);
               
                    // 分數
                    game.score = game.score + bossScore;
                    // 得分動態
                    var ss = game.add.text(e.x, e.y, '+ ' + bossScore, style);
                    ss.anchor.setTo(0.5,0.5); 
                    var timer = setTimeout(function(){
                        ss.kill()
                    }, 500);              
                }else{
                    var x = game.rnd.integerInRange(e.x-30,e.x+30);
                    var y = game.rnd.integerInRange(e.y-30,e.y+90);
                    this.effect(x, y, 0.5, 0.5, 'hit2', 15);
                }
            }
            game.clipValue = game.clipValue - 1;
        }
        game.scoreText.setText("Score: "+game.score);
        game.clipText.setText("X "+ game.clipValue);
    },

    // 怪物出界
    outEnemy: function(bg,e){

        if(e.index === 1){
            // console.log('降溫');
            tValue=tValue - level1 * 0.01;
            // 溫度計數值動態
            this.tBarUpDown('- ',level1, 50);
            // 溶化特效
            this.effect(e.x, e.y, 0.5, 0.345, 'enemymelt1', 20);
            // 分數判斷
            this.enemyScore(tUp,parseInt(enemyScoreLV1*scoreBuff));
            // 得分動態
            this.scoreEff(e.x,e.y,tUp,parseInt(enemyScoreLV1*scoreBuff));
        }
        if(e.index === 2){
            // console.log('升溫');
            tValue=tValue + level1 * 0.01;
            // 溫度計數值動態
            this.tBarUpDown('+ ',level1, -50);            
            // 溶化特效
            this.effect(e.x, e.y, 0.5, 0.345, 'enemymelt2', 20);
            // 分數判斷
            this.enemyScore(tDown,parseInt(enemyScoreLV1*scoreBuff));
            // 得分動態
            this.scoreEff(e.x,e.y,tDown,parseInt(enemyScoreLV1*scoreBuff));
        }
        if(e.index === 3){
            // console.log('降溫');
            tValue=tValue - level2 * 0.01;
            // 溫度計數值動態
            this.tBarUpDown('- ',level2, 50);             
            // 溶化特效
            this.effect(e.x, e.y, 0.5, 0.45, 'enemymelt3', 18);
            // 分數判斷
            this.enemyScore(tUp,parseInt(enemyScoreLV2*scoreBuff));
             // 得分動態
             this.scoreEff(e.x,e.y,tUp,parseInt(enemyScoreLV2*scoreBuff));
        }
        if(e.index === 4){
            // console.log('升溫');
            tValue=tValue + level2 * 0.01;
            // 溫度計數值動態
            this.tBarUpDown('+ ',level2, -50);             
            // 溶化特效
            this.effect(e.x, e.y, 0.5, 0.45, 'enemymelt4', 18);
            // 分數判斷
            this.enemyScore(tDown,parseInt(enemyScoreLV2*scoreBuff));
            // 得分動態
            this.scoreEff(e.x,e.y,tDown,parseInt(enemyScoreLV2*scoreBuff));
        }
        if(e.index === 5){
            // console.log('冰火');
            var value = game.rnd.integerInRange(0,5)
            if(value>=3){
                tValue=tValue + level3 * 0.01;
                // 溫度計數值動態
                this.tBarUpDown('+ ',level3, -50);
                // 分數判斷
                this.enemyScore(tDown,parseInt(enemyScoreLV3*scoreBuff));
                // 得分動態
                this.scoreEff(e.x,e.y,tDown,parseInt(enemyScoreLV3*scoreBuff));
            }else{
                tValue=tValue - level3 * 0.01;
                // 溫度計數值動態
                this.tBarUpDown('- ',level3, 50);
                // 分數判斷
                this.enemyScore(tUp,parseInt(enemyScoreLV3*scoreBuff));
                // 得分動態
                this.scoreEff(e.x,e.y,tUp,parseInt(enemyScoreLV3*scoreBuff));
            }
            // 溶化特效
            this.effect(e.x, e.y, 0.5, 0.345, 'enemymelt5', 20);
        }
        e.kill();
        game.scoreText.setText("Score: "+game.score);
    },  

    // 死亡判斷
    checkDie: function(){
        // 熱死
        if(tValue >= 1 && !day2flag || tValue >= 1 && !day3flag ||tValue >= 1 && !bossDay ){
            this.soundFx('fireDie',0.8,false);
            canAtk = false;
            canCost = false;
            // 確保不在切關卡狀態
            day2flag = false;
            day3flag = false;
            bossDay = false;
            // 開啟死亡條件
            dead = true;
            tValue = 1;
            var dieHot;
            // console.log('熱死了');
            if(dead){
                dead = false;
                canAtk = false;
                dieHot = game.add.tween(game.dieHot).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.fire).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false); 
                var anim = game.fire.animations.add('fire');
                game.player.kill();
                var player2 =game.add.image(game.width/2,380,'player'); 
                player2.anchor.setTo(0.5);
                anim.play(10,true,false);
                var playerR = game.add.image(game.width/2,380,'playerHot'); 
                playerR.anchor.setTo(0.5, 0.5);
                playerR.alpha = 0;
                var playerRAnim = game.add.tween(playerR).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                playerRAnim.onComplete.add(function(){
                    player2.kill();
                    playerRed = game.add.tween(playerR).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                });
                console.log('燃燒了') 
                dieHot.onComplete.add(function(){
                    game.tBar1.kill();
                    game.tBar2_02.kill();
                    game.tBar3.kill();
                    game.tBar4.kill();
                    game.T.kill();
                    this.overUI('lose',game.height/2-65);
                },this);
            }
        }
        // 冷死
        if(tValue <= 0.1 && !day2flag || tValue <= 0.1 && !day3flag || tValue <= 0.1 && !bossDay){
            this.soundFx('iceDie',0.8,false);
            canAtk = false;
            canCost = false;
            // 確保不在切關卡狀態
            day2flag = false;
            day3flag = false;
            bossDay = false;
            // 開啟死亡條件
            dead = true;
            tValue = 0;
            var dieCold;
            // console.log('冷死了');
            if(dead){
                canAtk = false;
                dead = false;
                dieCold = game.add.tween(game.dieCold).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.ice).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                console.log('結凍了');
                dieCold.onComplete.add(function(){
                    game.tBar1.kill();
                    game.tBar2_02.kill();
                    game.tBar3.kill();
                    game.tBar4.kill();
                    game.T.kill();
                    this.overUI('lose',game.height/2-65);
                },this);
            }
        }        
    },

    // 結束UI
    overUI: function(name,y){
        if(this.bgm){
            this.bgm.stop();
        }
        canAtk = false;
        if(name === 'win'){
            this.soundFx('victory',0.8,false);
        }
        if(name === 'lose'){
            this.soundFx('lose',0.8,false);
        }
        game.scoreText.kill();
        game.clipText.kill();
        game.clip.kill();
        var UI = game.add.image(game.width/2, y,name);
        UI.anchor.setTo(0.5);
        UI.alpha = 0;
        game.add.tween(UI).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);        
        // 分數
        var Text = game.add.text(game.width/2, game.height/2, "Score: "+ game.score, sStyle);
        Text.anchor.setTo(0.5);
        Text.alpha = 0;
        game.add.tween(Text).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);        
        // 字體筆畫效果
        Text.align = 'center';
        Text.stroke = "#263f11";   
        Text.strokeThickness = 3;
        console.log(pointCostFlag,freeCountCostFlag);
        // 傳分數與有無扣點判斷(淑珍看這)
        if(phpsuccess){
            sendScore(game.score,pointCostFlag,freeCountCostFlag);
        }    
        // 結算畫面後的 skip 按鈕創建
        game.skip = game.add.button(190,390,'skip',function(){
            // 音效
            this.soundFx('heavyHit',0.5,false);
            // 失敗跳轉
            if(tValue <= 0.1 || tValue >= 1){

                // 結局故事板子
                var badEndInfoImg;
                // 判斷死法
                if(tValue <= 0.1){
                    badEndInfoImg = 'badEnd1'
                }else{
                    badEndInfoImg = 'badEnd2'
                }    
                var badEndBoard = game.add.sprite(0,-450,'endBoard');
                var badEndInfo = badEndBoard.addChild(game.add.sprite(0,0,badEndInfoImg));
                badEndInfo.alpha = 0;

                // 介面淡出
                game.add.tween(game.boss).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.ice).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.fire).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.dieCold).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.dieHot).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar1).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar2).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar2_02).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar3).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar4).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.T).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.mid).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.timeBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                if(game.cactus){
                    game.add.tween(game.cactus).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                }
                if(game.bossIcon){
                    game.add.tween(game.bossIcon).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                }
                game.add.tween(game.sun).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.moon).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(UI).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                var tween = game.add.tween(badEndBoard).to({y:0},1000,Phaser.Easing.Sinusoidal.InOut,true, 1200, 0, false);
                tween.onComplete.add(function(){
                    // 失敗結局的BGM
                    this.gameOver = game.add.audio('gameOver', 0.5, false);
                    try{
                        this.gameOver.play();
                    }catch(e){}
                    // 結局故事浮出
                    var tween = game.add.tween(badEndInfo).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    tween.onComplete.add(function(){                         
                        // 防止skip按鈕重複點擊條件
                        var skipFlag = true;
                        // 點擊SKIP
                        skip = game.add.button(190,390,'skip',function(){
                            if(skipFlag){
                                skipFlag = false;
                                this.soundFx('heavyHit',0.5,false);
                                var st = game.add.tween(skip).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                                var tween = game.add.tween(badEndBoard).to({y:-450},1000,Phaser.Easing.Sinusoidal.InOut,true, 0, 0, false);
                                tween.onComplete.add(function(){
                                    if(game.bg2.alpha === 1){
                                        var tween2 = game.add.tween(game.bg2).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                                        var tween1 = game.add.tween(game.bg1).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                                        tween1.onComplete.add(function(){
                                            this.returnClick();                                        
                                        },this);
                                    }else{
                                        this.returnClick();
                                    }
                                },this);
                            }
                        },this,1,0,1);
                        skip.alpha = 0;
                        var skipTween = game.add.tween(skip).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    },this);                    
                },this);
            }else{
            // 勝利跳轉
                // 結局故事板子
                var endBoard = game.add.sprite(0,-450,'endBoard');
                var endInfo = endBoard.addChild(game.add.sprite(0,0,'endInfo'));
                endInfo.alpha = 0;
                // 介面淡出
                game.add.tween(game.bossDie).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar1).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar2).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar2_02).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar3).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.tBar4).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.T).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.mid).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.timeBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.bossIcon).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(UI).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                // 漸變為早上
                var tweenBoard = game.add.tween(game.bg1).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                tweenBoard.onComplete.add(function(){
                    // 結局故事板子滑入
                    var tween = game.add.tween(endBoard).to({y:0},1000,Phaser.Easing.Sinusoidal.InOut,true, 500, 0, false);
                    tween.onComplete.add(function(){

                        // 結局故事浮出
                        var tween = game.add.tween(endInfo).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                        tween.onComplete.add(function(){
                            // BGM
                            this.trueEnd = game.add.audio('trueEnd', 0.5, false);
                            try{
                                this.trueEnd.play();
                            }catch(e){} 
                            // UFO音效
                            this.soundFx('ufo',0.3,false);                        
                            // 防止skip按鈕重複點擊條件
                            var skipFlag = true;
                            // 點擊skip
                            skip = game.add.button(190,390,'skip',function(){
                                if(skipFlag){
                                    skipFlag = false;
                                    this.soundFx('heavyHit',0.5,false);
                                    var st = game.add.tween(skip).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                                    var tween = game.add.tween(endBoard).to({y:-450},1000,Phaser.Easing.Sinusoidal.InOut,true, 0, 0, false);
                                    tween.onComplete.add(function(){
                                        this.returnClick();
                                    },this);
                                }
                            },this,1,0,1);
                            skip.alpha = 0;
                            var skipTween = game.add.tween(skip).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                        },this);
                    },this);
                },this);
            }
            // 結算畫面後的 skip 按鈕點擊後消除自己 
            game.skip.destroy();
        },this,1,0,1);
        // 結算畫面後的 skip 按鈕透明度0
        game.skip.alpha = 0;
        // 結算畫面後的 skip 按鈕淡入
        var skip = game.add.tween(game.skip).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000, 0, false);
        //關閉音樂
        if(this.bossBGM){
            this.bossBGM.stop();
        }else{
            this.bgm.stop();
        }
    },

    // 重玩遊戲
    returnClick: function(){
        // 關閉失敗音樂
        if(this.gameOver){
            this.gameOver.stop();
        }
        if(this.trueEnd){
            this.trueEnd.stop();
        }
        game.state.start('start');
    },

    // 產生怪物
    generateEnemy: function(Velocity){

        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.enemys.lastEnemyTime > enemyInterval*1000){

        /************************** 敵方生成 ******************************/

           //生成怪物種類隨機數
            var enemyIndex = game.rnd.integerInRange(enemyLim,enemyMax);
            var key ='enemy' + enemyIndex;
            //寬會是4帧的寬度，要用1帧的尺寸，所以要除4
            var enemyWidth = game.cache.getImage(key).width;
            var enemyHeight = game.cache.getImage(key).height;
            var x = game.rnd.integerInRange(enemyWidth/2+50, game.width - enemyWidth/2-20);
            var y = 0;
            var enemy = this.enemys.getFirstExists(false, true, x, y, key);
            enemy.inputEnabled = true;
            enemy.input.priorityID = 3;
            enemy.events.onInputDown.add(this.attackEnemy, this);
            enemy.index = enemyIndex;
            enemy.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(enemy); 
            enemy.body.setSize(enemyWidth, enemyHeight);//設定碰撞框尺寸
            enemy.body.velocity.y = Velocity;
            enemy.lastFireTime = 0;
            enemy.enemyHeight = enemyHeight;//用來讓其他函數能調用此變數，所以掛到enemy底下
            enemy.checkWorldBounds = true;//檢查邊界
            enemy.outOfBoundsKill = true;//敵方飛出邊界消除

        /****************************************************************/ 
        // 指定不同怪物血量
            if(enemyIndex === 1 || enemyIndex === 2){
                enemy.Life = enemyLife1;
            }
            if(enemyIndex === 3 || enemyIndex === 4){
                enemy.Life = enemyLife2;
            }
            if(enemyIndex === 5){
                enemy.Life = enemyLife3;
            }
            this.enemys.lastEnemyTime = now;
        }
    //    console.log('enemys: '+this.enemys.length);
    },

    // 創造增加分數的獎勵
    generateBubble: function(Velocity){
        var now = game.time.now;//抓取當下時間 phaser函式庫
        var bubbleInterval = game.rnd.integerInRange(bubbleIntervalLim,bubbleIntervalMax);
        if(now - this.bubbleItems.lastBubbleTime > bubbleInterval*1000){

        /************************** 敵方生成 ******************************/
           var rndx = game.rnd.integerInRange(0,9);
           var rndy = game.rnd.integerInRange(0,9);
           var bubbleWidth = game.cache.getImage('bubble').width;
           var bubbleHeight = game.cache.getImage('bubble').height;
           var x = game.rnd.integerInRange(bubbleWidth/2+50, game.width - bubbleWidth/2);
           var y= game.rnd.integerInRange(bubbleHeight/2+50, game.height - bubbleHeight);
           game.bubbleItem = this.bubbleItems.getFirstExists(false, true, x, y, 'bubble');
           game.bubbleItem.alpha = 0;
           game.add.tween(game.bubbleItem).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
           game.bubbleItem.inputEnabled = true;
           game.bubbleItem.input.priorityID = 2;
           game.bubbleItem.anchor.setTo(0.5, 0.5);
           game.physics.arcade.enable(game.bubbleItem); 
           game.bubbleItem.body.setSize(bubbleWidth, bubbleHeight);//設定碰撞框尺寸
           if(rndx>4){
                game.bubbleItem.body.velocity.x = Velocity;
           }else{
                game.bubbleItem.body.velocity.x = -Velocity;
           }
           if(rndy>4){
                game.bubbleItem.body.velocity.y = Velocity/3;
           }else{
                game.bubbleItem.body.velocity.y = -Velocity/3;
           }
           game.bubbleItem.lastFireTime = 0;
           game.bubbleItem.checkWorldBounds = true;//檢查邊界
           game.bubbleItem.outOfBoundsKill = true;//泡泡飛出邊界消除

        /****************************************************************/ 
        this.bubbleItems.lastBubbleTime = now;
        }
    //    console.log('bubbleItems: '+this.bubbleItems.length);
    },

    // 分數判斷
    enemyScore: function(flag, scoreValue){
        
        //死錯小怪物扣分值
        var deScore = parseInt(scoreValue * scoreDecline);
        if(flag === true){
            game.score = game.score + scoreValue;
        }else{
            game.score = game.score - deScore;
        }
        if(game.score <= 0){
            game.score = 0;
        }
    },

    // 得分動態
    scoreEff: function(x, y, flag, scoreValue){
        var s;
        var deScore = parseInt(scoreValue * scoreDecline);
        if(flag === true){
            s = game.add.text(x, y, '+ ' + scoreValue, style);
            s.anchor.setTo(0.5,0.5);
            var timer =setTimeout(function() {
                game.add.tween(s).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            }, 500);
            var timer2 =setTimeout(function() {
                s.kill()
            }, 700);
        }else{
            s = game.add.text(x, y, '- ' + deScore, style);
            s.anchor.setTo(0.5,0.5);
            var timer =setTimeout(function() {
                game.add.tween(s).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            }, 500);
            var timer2 =setTimeout(function() {
                s.kill()
            }, 700);
        }
    },

    // 彈匣補充字動態
    clipBonusEff: function(x, y, value){
        this.soundFx('boom',0.8,false);
        var ci = game.add.image(x - 25,y - 8,'clipIcon');
        ci.anchor.setTo(0.5,0.5);
        var c = game.add.text(x, y, '+ ' + value, cStyle);
        c.anchor.setTo(0.5,0.5);
        var timer =setTimeout(function() {
            game.add.tween(c).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(ci).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        }, 500);
        var timer2 =setTimeout(function() {
            c.kill();
            ci.kill();
        }, 700);
    },

    // 溫度計上升下降數值動態
    tBarUpDown: function(text, value, y){
        var t =game.add.text(game.width/7+5, game.height/3, text+value, tStyle);
        var tween =game.add.tween(t).to({y:game.height/3+y},1000,Phaser.Easing.Sinusoidal.InOut,true);
        var timer =setTimeout(function() {
            game.add.tween(t).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }, 500);
        var timer2 =setTimeout(function() {
            t.kill()
        }, 1500);
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
