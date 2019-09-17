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
// 精靈融化溫度幅度等級
var level1 = 3;
var level2 = 5;
var level3 = 8;
// 自動溫度升降級數
var tValueLV1 = 5;
var tValueLV2 = 7;
var tValueLV3 = 8;
// 彈匣數 ㄒ
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
// 缺失分數降幅
var scoreDecline = 1.5;
// 溶化得分增益
var scoreBuff = 1.5;
// 時間軸速度
var timeVelelocity = 5;

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
var day1flag = false;
var day2flag = false;
var day3flag = false;
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

function sendScore(SCORE){

    $(function () {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }, //權限TOKEN
            url: '/game/score', //分數儲存的位址
            type: 'POST', //使用 POST 傳送
            data:{
                game: 'games009',
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

// 遊戲階段
game.State={};

// UI
game.scoreText;
game.clipValue;
game.clipText;
game.clip;

// 遊戲得分
game.score = 0;

// 玩家
game.player;

// 敵人
game.enemy;
game.enemyLife1;
game.enemyLife2;
game.enemyLife3;

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

// boot state 對遊戲進行設置
game.State.boot={
    preload:function(){
        game.load.image('loading','/games/games009/assets/preloader.gif');
        // if(!game.device.desktop){
        //     //行動平台螢幕適應
		// 	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// 	this.scale.forcePortrait = false;
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
        game.load.image('null', '/games/games009/assets/null.png');
        game.load.image('background1', '/games/games009/assets/background1.png');
        game.load.image('background2', '/games/games009/assets/background2.png');
        game.load.image('turtorialInfo', '/games/games009/assets/turtorialInfo.png');
        game.load.image('day1', '/games/games009/assets/day1.png');
        game.load.image('day2', '/games/games009/assets/day2.png');
        game.load.image('day3', '/games/games009/assets/day3.png');
        game.load.image('frame', '/games/games009/assets/frame.png');
        game.load.image('bottom', '/games/games009/assets/bottom.png');
        game.load.image('dieCold', '/games/games009/assets/dieCold.png');
        game.load.image('dieHot', '/games/games009/assets/dieHot.png');
        game.load.image('tBar1', '/games/games009/assets/tBar1.png');
        game.load.image('tBar2', '/games/games009/assets/tBar2.png');
        game.load.image('tBar3', '/games/games009/assets/tBar3.png');
        game.load.image('tBar4', '/games/games009/assets/tBar4.png');
        game.load.image('T', '/games/games009/assets/T.png');
        game.load.image('up', '/games/games009/assets/up.png');
        game.load.image('down', '/games/games009/assets/down.png');
        game.load.image('player', '/games/games009/assets/player.png');
        game.load.image('playerHot', '/games/games009/assets/playerHot.png');
        game.load.image('playerS', '/games/games009/assets/playerS.png');
        game.load.image('playerHotS', '/games/games009/assets/playerHotS.png');
        game.load.image('iceS', '/games/games009/assets/iceS.png');
        game.load.image('ice', '/games/games009/assets/ice.png');
        game.load.image('cactus', '/games/games009/assets/cactus.png');
        game.load.image('clipIcon', '/games/games009/assets/clipicon.png');
        game.load.image('timeline', '/games/games009/assets/timeline.png');
        game.load.image('sun', '/games/games009/assets/sun.png');
        game.load.image('moon', '/games/games009/assets/moon.png');
        game.load.image('mid', '/games/games009/assets/mid.png');
        game.load.image('bubble', '/games/games009/assets/bubble.png');
        game.load.image('enemy1S', '/games/games009/assets/enemy1S.png');
        game.load.image('enemy2S', '/games/games009/assets/enemy2S.png');
        game.load.image('enemy1', '/games/games009/assets/enemy1.png');
        game.load.image('enemy2', '/games/games009/assets/enemy2.png');
        game.load.image('enemy3', '/games/games009/assets/enemy3.png');
        game.load.image('enemy4', '/games/games009/assets/enemy4.png');
        game.load.image('enemy5', '/games/games009/assets/enemy5.png');
        game.load.image('lose', '/games/games009/assets/lose.png');
        game.load.spritesheet('startbutton', '/games/games009/assets/startbutton.png', 100, 100, 2);
        // game.load.spritesheet('gameOver', '/games/games009/assets/gameOver.png', 150, 80, 2);
        game.load.spritesheet('skip', '/games/games009/assets/skip.png', 100, 50, 2);
        game.load.spritesheet('fireS', '/games/games009/assets/fireS.png', 80, 96, 4);
        game.load.spritesheet('fire', '/games/games009/assets/fire.png', 200, 240, 4);
        game.load.spritesheet('enemymelt1S', '/games/games009/assets/enemymelt1S.png', 68, 50, 4);
        game.load.spritesheet('enemymelt2S', '/games/games009/assets/enemymelt2S.png', 68, 50, 4);
        game.load.spritesheet('enemymelt1', '/games/games009/assets/enemymelt1.png', 110, 80, 4);
        game.load.spritesheet('enemymelt2', '/games/games009/assets/enemymelt2.png', 110, 80, 4);
        game.load.spritesheet('enemymelt3', '/games/games009/assets/enemymelt3.png', 110, 80, 4);
        game.load.spritesheet('enemymelt4', '/games/games009/assets/enemymelt4.png', 110, 80, 4);
        game.load.spritesheet('enemymelt5', '/games/games009/assets/enemymelt5.png', 110, 80, 4);
        game.load.spritesheet('boom', '/games/games009/assets/boom.png', 50, 50, 2);
        game.load.spritesheet('explode1S', '/games/games009/assets/explode1S.png', 50, 50, 4);
        game.load.spritesheet('explode2S', '/games/games009/assets/explode2S.png', 50, 50, 4);
        game.load.spritesheet('explode1', '/games/games009/assets/explode1.png', 80, 80, 4);
        game.load.spritesheet('explode2', '/games/games009/assets/explode2.png', 80, 80, 4);
        game.load.spritesheet('explode3', '/games/games009/assets/explode3.png', 80, 80, 4);
        game.load.spritesheet('hit1', '/games/games009/assets/hit1.png', 40, 40, 2);
        game.load.spritesheet('hit2', '/games/games009/assets/hit2.png', 80, 80, 2);
        game.load.spritesheet('BarDownS', '/games/games009/assets/BarDownS.png', 20, 60, 5);
        game.load.spritesheet('BarUpS', '/games/games009/assets/BarUpS.png', 20, 60, 5);
        game.load.spritesheet('BarDownB', '/games/games009/assets/BarDownB.png', 26, 90, 5);
        game.load.spritesheet('BarUpB', '/games/games009/assets/BarUpB.png', 26, 90, 5);
        game.load.audio('bgm', '/games/games009/assets/bgm.mp3');
        game.load.audio('hit', '/games/games009/assets/hit.mp3');
        game.load.audio('heavyHit', '/games/games009/assets/heavyHit.mp3');
        game.load.audio('shot', '/games/games009/assets/shot.mp3');
        game.load.audio('boom', '/games/games009/assets/boom.mp3');
        game.load.audio('iceExplode', '/games/games009/assets/iceExplode.mp3');
        game.load.audio('explode', '/games/games009/assets/explode.mp3');
        game.load.audio('iceFireExplode', '/games/games009/assets/iceFireExplode.mp3');
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

        // 開始介面
        this.startUI();

        // 遊戲設定
        this.setting();
    
    },

    // 介面
    startUI: function(){

        game.add.image(0,0,'background1');
        game.add.image(0,0,'frame');
        var startBtn = game.add.button(game.width/2,game.height/2,'startbutton',this.onStartClick,this,0,1,1);
        startBtn.anchor.setTo(0.5,0.5);

    },

    // 遊戲設定
    setting: function(){

        // 換天條件
        day = true;
        // 夜晚條件
        night =true;
        // 關卡條件
        day1flag = false;
        day2flag = false;
        day3flag = false;
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
        // 怪物隨機值範圍
        enemyLim = 1;
        enemyMax = 2;
        // 溫度上升級數設定
        tValueLV = tValueLV1;
        // 子彈數設定
        game.clipValue = clipValue;

    /********************* 取得資料庫設定數值 *********************/
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
                    
                    // 缺失分數降幅
                    scoreDecline = parseFloat(data.scoreDecline);
                    
                    // 溶化得分增益
                    scoreBuff = parseFloat(data.scoreBuff);
                    
                    // 時間軸速度
                    timeVelelocity = parseInt(data.timeVelelocity);

                    console.log('怪物生成間格時間：'+parseFloat(data.enemyInterval)+'秒');
                    console.log('怪物速度：' + '定值：' + parseInt(data.enemyVelocity),'範圍最小值：' + parseInt(data.enemyVelocityLim),'範圍最大值：' + parseInt(data.enemyVelocityMax));
                    console.log('精靈生命：' + '小隻：' + parseInt(data.enemyLife1),'大隻：' + parseInt(data.enemyLife2),'雙屬：' + parseInt(data.enemyLife3));
                    console.log('精靈融化溫度幅度等級：' + '小隻：' + parseInt(data.level1),'大隻：' + parseInt(data.level2),'雙屬：' + parseInt(data.level3));
                    console.log('精靈融化溫度幅度等級：' + '小隻：' + parseInt(data.level1),'大隻：' + parseInt(data.level2),'雙屬：' + parseInt(data.level3));
                    console.log('自動溫度升降級數：' + '第一天：' + parseInt(data.tValueLV1),'第二天：' + parseInt(data.tValueLV2),'第三天以後：' + parseInt(data.tValueLV3));
                    console.log('彈匣數：' + parseInt(data.clipValue));
                    console.log('彈匣氣泡補充量：' + parseInt(data.clipBonus));
                    console.log('彈匣補充間格時間：' +'最快'+ parseInt(data.bubbleIntervalLim), '最慢' + parseInt(data.bubbleIntervalMax));
                    console.log('彈匣氣泡移動速度：' + parseInt(data.bubbleVelocity));
                    console.log('分數：' + '小隻：' + parseInt(data.enemyScoreLV1),'大隻：' + parseInt(data.enemyScoreLV2),'雙屬：' + parseInt(data.enemyScoreLV3));
                    console.log('缺失分數降幅：' + parseInt(data.scoreDecline));
                    console.log('溶化得分增益：' + parseInt(data.scoreBuff));
                    console.log('時間軸速度：' + parseInt(data.timeVelelocity));
                    
                    //伺服器連接成功flag 
                    phpsuccess = true; 
                }
            });
        });  
    /********************* 取得資料庫設定數值 *********************/
    },
    
    onStartClick:function(){
        game.state.start('turtorial');
        // game.state.start('play');
    },
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

         // skip教學
         game.skip = game.add.button(190,390,'skip',function(){
            this.heavyHit = game.add.audio('heavyHit', 0.5, false);
            try{
                this.heavyHit.play();
            }catch(e){}
            var skip = game.add.tween(game.skip).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            var infoBoard = game.add.tween(game.infoBoard).to({y:-450},1500,Phaser.Easing.Sinusoidal.InOut,true,0, 0, false);
            skip.onComplete.addOnce(function(){
                game.skip.destroy();
                infoBoard.onComplete.addOnce(function(){
                    game.state.start('play');
                });
            });
        },this,1,0,1);
        game.skip.alpha = 0;
        var skip = game.add.tween(game.skip).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

        // Ready Go
        game.day1.alpha = 1;

        // 第一排

        // 射擊特效
        game.hit = game.infoBoard.addChild(game.add.image(98,135,'hit1'));
        var hit = game.hit.animations.add('hit');
        hit.onComplete.addOnce(function(){
                game.hit.destroy();
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
                                        console.log('安安我是第二排');
                                        // 射擊特效
                                        game.hit = game.infoBoard.addChild(game.add.image(98,209,'hit1'));
                                        var hit = game.hit.animations.add('hit');
                                        hit.onComplete.addOnce(function(){
                                                game.hit.destroy();
                                                // 火焰小精靈爆炸特效
                                                game.infoExplode1.alpha = 1;
                                                var infoExplode1 = game.infoExplode1.animations.add('explode1S',[0, 1], 6, false);
                                                infoExplode1.play(8,false,false);
                                                infoExplode1.onComplete.addOnce(function(){
                                                    // 消除火焰小精靈
                                                    game.infoEnemy1.destroy();
                                                    // 將爆炸特效固定在最後一幀
                                                    game.infoExplode1.frame = 1;
                                                    // 05秒後
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
                                                                    console.log('安安我是第三排');
                                                                    var infoBar3 = game.infoBar3.animations.add('infoBar3',[0, 1, 2, 3, 4], 2, false);
                                                                    infoBar3.play();
                                                                    infoBar3.onComplete.addOnce(function(){
                                                                        // 結冰
                                                                        var tweenIce = game.add.tween(game.infoIce).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                                                                        tweenIce.onComplete.addOnce(function(){
                                                                            var infoBar4 = game.infoBar4.animations.add('infoBar4',[0, 1, 2, 3, 4], 2, false);
                                                                            infoBar4.play();
                                                                            infoBar4.onComplete.addOnce(function(){
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
                                                                                        infoBoard.onComplete.addOnce(function(){
                                                                                                game.state.start('play');
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
    create:function(){
        
        // 背景精靈     
        game.bg2 = game.add.sprite(0,0,'background2');
        game.bg1 = game.add.sprite(0,0,'background1');
        game.bg1.alpha = 1;
        // Ready Go
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
        // 玩家
        game.player = game.add.image(game.width/2,500,'player');
        game.player.anchor.setTo(0.5,0.5);
        // 結冰物件
        game.ice = game.add.sprite(0,0,'ice');
        game.ice.alpha = 0;
        // 關卡資訊
        game.day3 = game.add.sprite(0,300,'day3');
        game.day3.inputEnabled = true;
        game.day3.input.priorityID = 0;
        game.day2 = game.add.sprite(0,300,'day2');
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
                if(game.cactus.x >= game.width/2){
                    tDown = true;
                    tUp = false;
                }else{
                    tUp = true;
                    tDown = false
                }

                if(game.cactus.x >= 225 && day){
                    day = false;
                    game.add.tween(game.cactus).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                        game.cactus.x = 75;
                        console.log('換天');
                        game.add.tween(game.cactus).to( { alpha: 1 }, 900, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function(){
                            // 時間軸計數
                            count = count + 1;
                            // 開啟生怪條件
                            enemy = true;
                            // 開啟換天條件
                            day = true; 
                        });
                    });
                    canAtk = true;
                    game.bg1.inputEnabled = true;
                    game.bg1.input.priorityID = 1;
                    game.bg2.inputEnabled = true;
                    game.bg2.input.priorityID = 1;
                }

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
                if(game.cactus.alpha === 1){
                    game.cactus.x=game.cactus.x + timeVelelocity*0.01;
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
                if(game.enemy){
                    // 打中怪物
                    game.enemy.events.onInputDown.add(this.attackEnemy, this);
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
        
        // 關卡2設定
        if(count === 1){
            game.timeBar.tint = 0x329E4B;
            enemyLim = 1;
            enemyMax = 4;
            tValueLV = tValueLV2;
            day2flag = true;
            game.T.scale.y = 0.55;
        }
        // 關卡2看板動態
        if(day2flag){
            // console.log('測試1');
            canCost = false;
            day2flag = false;
            canAtk = false;
            count = count + 0.5;
            var tweenP = game.add.tween(game.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent1 = game.add.tween(game.tBar1).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent2 = game.add.tween(game.tBar2_02).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent3 = game.add.tween(game.tBar3).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent4 = game.add.tween(game.tBar4).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweenT = game.add.tween(game.T).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweenDay = game.add.tween(game.day2).to({y:0},1500,Phaser.Easing.Sinusoidal.InOut,true,1000, 0, false);           
            tweenDay.onComplete.add(function(){
                game.T.scale.y = 0;
                tValue = 0;
                // console.log('測試2');
                game.day2.events.onInputDown.add(function(){
                    this.heavyHit = game.add.audio('heavyHit', 0.5, false);
                    try{
                        this.heavyHit.play();
                    }catch(e){}
                    this.effect(game.input.x, game.input.y, 0.5, 0.5, 'hit2', 15);
                    game.camera.flash(0xffffff, 300);
                    game.day2.inputEnabled = false;
                    var tweenDay_02 = game.add.tween(game.day2).to({y:300},1500,Phaser.Easing.Sinusoidal.InOut,true, 0, 0, false);
                    tweenDay_02.onComplete.add(function(){
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
        // 關卡2怪物速度
        if(count === 1.5){
            enemyVelocity = game.rnd.integerInRange(enemyVelocityLim, enemyVelocityMax);
            // console.log(enemyVelocity);
        }
        // 關卡3設定
        if(count === 2.5){
            game.timeBar.tint = 0x066934;
            enemyLim = 1;
            enemyMax = 5;
            tValueLV = tValueLV3; 
            day3flag = true;
            tValue = 0.5;
        }
        // 關卡3看板動態
        if(day3flag){
            // console.log('測試1');
            canCost = false;
            day3flag = false;
            canAtk = false;
            count = count + 0.5;
            var tweenP = game.add.tween(game.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent1 = game.add.tween(game.tBar1).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent2 = game.add.tween(game.tBar2_02).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent3 = game.add.tween(game.tBar3).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweent4 = game.add.tween(game.tBar4).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweenT = game.add.tween(game.T).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tweenDay = game.add.tween(game.day3).to({y:0},1500,Phaser.Easing.Sinusoidal.InOut,true,1000, 0, false);           
            tweenDay.onComplete.add(function(){
                game.T.scale.y = 0;
                tValue = 0;
                // console.log('測試2');
                game.day3.events.onInputDown.add(function(){
                    
                    this.heavyHit = game.add.audio('heavyHit', 0.5, false);
                    try{
                        this.heavyHit.play();
                    }catch(e){}
                    
                    /****強制開啟可點擊事件(還沒找到為何關了的原因)****/
                    game.bg1.inputEnabled = true;
                    game.bg2.inputEnabled = true;
                    /**********************************************/
                    
                    this.effect(game.input.x, game.input.y, 0.5, 0.5, 'hit2', 15);
                    game.camera.flash(0xffffff, 300);
                    game.day3.inputEnabled = false;
                    var tweenDay_02 = game.add.tween(game.day3).to({y:300},1500,Phaser.Easing.Sinusoidal.InOut,true, 0, 0, false);
                    tweenDay_02.onComplete.add(function(){
                        game.day3.kill();
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
        // 關卡3怪物速度
        if(count === 3){
            enemyVelocity = game.rnd.integerInRange(enemyVelocityLim, enemyVelocityMax);
            // console.log(enemyVelocity);
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
            if(e.key === 'enemy1'){
                // console.log('滅冰');
                effect = 'explode1';
                game.enemyLife1 = game.enemyLife1 - 1;
                if(game.enemyLife1<=0){
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
            if(e.key==='enemy2'){
                // console.log('滅火');
                effect = 'explode2';
                game.enemyLife1 = game.enemyLife1 - 1;
                if(game.enemyLife1<=0){
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
            if(e.key==='enemy3'){
                effect = 'explode1'
                game.enemyLife2 = game.enemyLife2 - 1;
                if(game.enemyLife2<=0){
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
            if(e.key==='enemy4'){
                effect = 'explode2'
                game.enemyLife2 = game.enemyLife2 - 1;
                if(game.enemyLife2<=0){
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
            if(e.key==='enemy5'){

                effect = 'explode3'
                game.enemyLife3 = game.enemyLife3 - 1;
                if(game.enemyLife3<=0){
                    this.soundFx('iceFireExplode',1,false);
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
            game.clipValue = game.clipValue - 1;
        }
        game.scoreText.setText("Score: "+game.score);
        game.clipText.setText("X "+ game.clipValue);
    },

    // 怪物出界
    outEnemy: function(bg,e){

        if(e.key==='enemy1'){
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
        if(e.key==='enemy2'){
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
        if(e.key==='enemy3'){
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
        if(e.key==='enemy4'){
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
        if(e.key==='enemy5'){
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
        if(tValue >= 1){
            canCost = false;
            dead = true;
            tValue = 1;
            var dieHot;
            // console.log('熱死了');
            if(dead){
                dead = false;
                canAtk = false;
                dieHot = game.add.tween(game.dieHot).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                var fire = game.add.sprite(game.player.x,330,'fire');
                fire.alpha = 0;
                fire.anchor.setTo(0.5, 0.5);
                game.add.tween(fire).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false); 
                var anim = fire.animations.add('fire');
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
                    this.DUI();
                },this);
            }
        }
        // 冷死
        if(tValue <= 0.1){
            canCost = false;
            dead = true;
            tValue = 0;
            var dieCold;
            // console.log('冷死了');
            if(dead){
                dead = false;
                canAtk = false;
                dieCold = game.add.tween(game.dieCold).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                game.add.tween(game.ice).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                console.log('結凍了');
                dieCold.onComplete.add(function(){
                    game.tBar1.kill();
                    game.tBar2_02.kill();
                    game.tBar3.kill();
                    game.tBar4.kill();
                    game.T.kill();
                    this.DUI();
                },this);
            }
        }        
    },
    // 死亡UI
    DUI: function(){
        game.scoreText.kill();
        game.clipText.kill();
        game.clip.kill();
        var lose = game.add.image(game.width/2, game.height/2-65,'lose');
        lose.anchor.setTo(0.5);        
        //分數
        var Text = game.add.text(game.width/2, game.height/2, "Score: "+ game.score, sStyle);
        Text.anchor.setTo(0.5, 0.5);
        if(phpsuccess){
            sendScore(game.score);
        }    
        // 回到開始遊戲畫面
        // var gameOverBtn = game.add.button(game.width/2,game.height/2-65,'gameOver',this.returnClick,this,1,1,1);
        // gameOverBtn.anchor.setTo(0.5,0.5);
        // 點畫面即可
        var back = game.add.sprite(0, 0, 'null');
        back.inputEnabled = true;
        back.events.onInputDown.add(this.returnClick,this);
        // 關閉音樂
        this.bgm.stop();
    },

    // 重玩遊戲
    returnClick: function(){
        game.state.start('start');
    },

    // 產生怪物
    generateEnemy: function(Velocity){

        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(now - this.enemys.lastEnemyTime > enemyInterval*1000){

        /************************** 敵方生成 ******************************/

           //生成怪物種類隨機數
           var enemyIndex = game.rnd.integerInRange(enemyLim,enemyMax);
           var key ='enemy'+enemyIndex;
           if(key==='enemy1'|| key==='enemy2'){
               game.enemyLife1 = enemyLife1;
            }
           if(key==='enemy3'|| key==='enemy4'){
               game.enemyLife2 = enemyLife2;
            }
            if(key==='enemy5'){
               game.enemyLife3 = enemyLife3;
            }
           //寬會是4帧的寬度，要用1帧的尺寸，所以要除4
           var enemyWidth = game.cache.getImage(key).width;
           var enemyHeight = game.cache.getImage(key).height;
           var x = game.rnd.integerInRange(enemyWidth/2+50, game.width - enemyWidth/2-20);
           var y= 0;
           game.enemy = this.enemys.getFirstExists(false, true, x, y, key);
           game.enemy.inputEnabled = true;
           game.enemy.input.priorityID = 3;
           game.enemy.index = enemyIndex;
           game.enemy.anchor.setTo(0.5, 0.5);
           game.physics.arcade.enable(game.enemy); 
           game.enemy.body.setSize(enemyWidth, enemyHeight);//設定碰撞框尺寸
           game.enemy.body.velocity.y = Velocity;
           game.enemy.lastFireTime = 0;
           game.enemy.enemyHeight = enemyHeight;//用來讓其他函數能調用此變數，所以掛到enemy底下
           game.enemy.checkWorldBounds = true;//檢查邊界
           game.enemy.outOfBoundsKill = true;//敵方飛出邊界消除

        /****************************************************************/ 
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
        anim.play(frame,false,false);
        anim.onComplete.addOnce(function(){
            eff.destroy();
        });   
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
game.state.add('turtorial',game.State.turtorial);
game.state.add('play',game.State.play);
game.state.start('boot');

/*******************************************/
