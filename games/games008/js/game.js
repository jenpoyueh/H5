var game = new Phaser.Game(300, 450, Phaser.CANVAS, 'game',
    { preload: preload, create: create, update: update });

/********按鈕預設隱藏********/

//當遊戲預載完物件再顯示
$('#start').hide();
$('#restart').hide();

/***********階梯***********/

//隨機數值
var normalRange = 50;
var nailsRange = 60;
var conveyorLeftRange = 70;
var conveyorRightRange = 80;
var trampolineRange = 90;
//一般階梯隨機數值常數
var normalRangeSet = 50;
//階梯上升速度
var stepVelocity = 2;

/*************************/

/***********圖料**********/

var bgImg = '../games008/assets/background.png';
var lifeImg = '../games008/assets/life.png';
var wallImgL = '../games008/assets/wall_left.png';
var wallImgR = '../games008/assets/wall_right.png';
var ceilingImg = '../games008/assets/ceiling.png';
var normalImg = '../games008/assets/normal.png';
var nailsImg = '../games008/assets/nails.png';
var playerSprite='../games008/assets/player.png';
var conveyorRightSprite = '../games008/assets/conveyor_right.png';
var conveyorLeftSprite = '../games008/assets/conveyor_left.png';
var trampolineSprite = '../games008/assets/trampoline.png';
var fakeSprite = '../games008/assets/fake.png';

/************************/

/********音樂音效*********/

//音樂音效來源
var BGM = "../games008/assets/BGM.mp3";
var conveyorSFX ="../games008/assets/conveyor.mp3";
var hurtSFX ="../games008/assets/hurt.mp3";
var deadSFX ="../games008/assets/dead.mp3";
var stepSFX ="../games008/assets/step.mp3";
var jumpSFX ="../games008/assets/jump.mp3";
var fakeSFX ="../games008/assets/fake.mp3";
var startSFX ="../games008/assets/start.mp3"

//背景音樂
var backgroundMusic;

//音效
var conveyorSe;
var hurtSe;
var deadSe;
var stepSe;
var jumpSe;
var fakeSe;
var startSe;


/*********角色能力值**********/

var playerHp = 12;
var playerHpMax = 12;
var playerMoveSpeed = 200;
var playerJump = 250;


/***********傷害***********/

//受傷數值
var hurtblood = 3;

//無敵時間
var unHurtTime = 0.8;

/*************************/

//玩家
var player;

//鍵盤操作鍵物件
var keyboard;

//平台數組
var platforms = [];

//場景
var background;
var leftWall;
var rightWall;
var ceiling;

//使用者介面
var lifeUI;
// var playBtn;

// 圖片比例
var spriteScale = 1/2;

//使用者介面文字
var text1;
var text2;
var style = {fill: 'white', font: "20px GrinchedRegular"};

/*********遊戲狀態判斷**********/
var distance = 0;
var floor = 0;
var score = 0;
var lastTime = 0;
var status = 'gameOver';
var isPlay = false;
var phpsuccess = false;

//一開始設置一般階提條件flag
var frist = true;
var second = true;
var third = true;

//是否碰到天花板flag
var touchCeiling =false;

//難度等級門檻
var level1 = 10;
var level2 = 20;
var level3 = 30;
var level4 = 40;
var level5 = 50;

/***************************/
/*****************ajax調用database.php連線取得資料庫設定數值***********************/
$(function () {
             $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }, //權限TOKEN
                url: '/game/data', //取得遊戲參數的位址
                data: {
                    game: 'games008'
                }, //送出 game 參數(值為遊戲識別名稱)
                type: 'POST', //使用 POST傳送
                success: function (data) //傳送成功的function
                {
                    console.log(data);
                    console.log("角色生命："+parseInt(data.playerHp));
                    console.log("角色移動速度："+parseInt(data.playerMoveSpeed));
                    console.log("角色跳躍力道："+parseInt(data.playerJump));
                    console.log("階梯上升速度："+parseInt(data.stepVelocity));
                    console.log("正常階梯出現隨機範圍："+parseInt(data.normalRange));
                    console.log("針刺階梯出現隨機範圍："+parseInt(data.nailsRange));
                    console.log("左動階梯出現隨機範圍："+parseInt(data.conveyorLeftRange));
                    console.log("右動階梯出現隨機範圍："+parseInt(data.conveyorRightRange));
                    console.log("跳躍階梯出現隨機範圍："+parseInt(data.trampolineRange));
                    console.log("下落階梯出現隨機範圍條件為else");
                    console.log("針刺階梯傷害："+parseInt(data.hurtblood));
                    console.log("碰到天花板的無敵時間："+data.unHurtTime+"秒");
  
                    console.log("等級1："+parseInt(data.level1));
                    console.log("等級2："+parseInt(data.level2));
                    console.log("等級3："+parseInt(data.level3));
                    console.log("等級4："+parseInt(data.level4));
                    console.log("等級5："+parseInt(data.level5));     
                                      
       /******************************能從外部變更的變數*****************************/               
  
                    playerHp=parseInt(data.playerHp);
                    playerHpMax=parseInt(data.playerHp);//生命常數
                    playerMoveSpeed=parseInt(data.playerMoveSpeed);
                    playerJump=parseInt(data.playerJump);
                    normalRange=parseInt(data.normalRange);
                    normalRangeSet=parseInt(data.normalRange);     
                    nailsRange=parseInt(data.nailsRange);
                    conveyorLeftRange=parseInt(data.conveyorLeftRange);
                    conveyorRightRange=parseInt(data.conveyorRightRange);
                    trampolineRange=parseInt(data.trampolineRange);
                    hurtblood=parseInt(data.hurtblood); 
                    unHurtTime=parseInt(data.unHurtTime*1000);
                    level1=parseInt(data.level1);
                    level2=parseInt(data.level2);
                    level3=parseInt(data.level3);
                    level4=parseInt(data.level4);
                    level5=parseInt(data.level5);    
                    phpsuccess = true; //伺服器連接成功flag
                }
            });
         });  
 /**************************ajax調用send.php再傳入資料庫方法*******************************/      
   function sendScore(SCORE){

     $(function () {
             $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }, //權限TOKEN
                url: '/game/score', //分數儲存的位址
                type: 'POST', //使用 POST 傳送
                data:{
                    game: 'games008',
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
/**************************************************************************************/        
//預讀時將遊戲物件匯入
function preload () {

    //行動平台螢幕適應
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.forcePortrait = false;
    this.scale.refresh();
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#000000';

    /*******************資材匯入********************/
    game.load.image('background',bgImg);//NEW
    game.load.image('wallL', wallImgL);//NEW
    game.load.image('wallR', wallImgR);//NEW
    game.load.image('normal', normalImg);//NEW
    game.load.image('nails', nailsImg);//NEW
    game.load.image('life', lifeImg);//NEW
    game.load.image('left', '../games008/assets/left.png');//NEW
    game.load.image('right', '../games008/assets/right.png');//NEW
    game.load.spritesheet('player', playerSprite, 49, 94);//NEW
    game.load.spritesheet('ceiling', ceilingImg, 800, 48);//NEW
    game.load.spritesheet('conveyorRight', conveyorRightSprite, 128, 32);//NEW
    game.load.spritesheet('conveyorLeft', conveyorLeftSprite, 128, 32);//NEW
    game.load.spritesheet('trampoline', trampolineSprite, 128, 44);//NEW
    game.load.spritesheet('fake', fakeSprite, 128, 60);//NEW
    game.load.spritesheet('playbtn', '../games008/assets/playbtn.png', 100, 100, 2);//NEW
    game.load.spritesheet('replaybtn', '../games008/assets/replaybtn.png', 185, 85, 2);//NEW
    game.load.audio('musicBg', BGM, true);
    game.load.audio('startSFX', startSFX, true);
    game.load.audio('conveyorSfx', conveyorSFX, true); 
    game.load.audio('hurtSfx', hurtSFX, true); 
    game.load.audio('deadSfx', deadSFX, true);
    game.load.audio('stepSfx', stepSFX, true); 
    game.load.audio('jumpSfx', jumpSFX, true); 
    game.load.audio('stepSfx', stepSFX, true);
    game.load.audio('fakeSfx', fakeSFX, true);
    text1 = game.add.text(100, 420, '', style);
    text2 = game.add.text(235, 420, '', style);

    /**********************************************/
}

//遊戲創建
function create () {

    text1.setText(playerHp);
    text2.setText('B: ' + 0);

    /**********遊戲最初UI***********/

    // $('#start').show();

    /*****************************/
    
    keyboard = game.input.keyboard.addKeys({
    
        'up': Phaser.Keyboard.UP,
        'down': Phaser.Keyboard.DOWN,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT,
        'w': Phaser.Keyboard.W,
        'a': Phaser.Keyboard.A,
        's': Phaser.Keyboard.S,
        'd': Phaser.Keyboard.D,
        'enter': Phaser.Keyboard.ENTER
    });
    createBounders();
    createTextsBoard();

    backgroundMusic = game.add.audio('musicBg', 0.8,true);
    startSe = game.add.audio('startSFX', 0.5,false);

    // 虛擬按鍵
    var isLeft = false;
    var isRight = false;
    game.left = game.add.sprite(-5,0,'left');
    game.left.scale.setTo(spriteScale);
    game.right = game.add.sprite(155,0,'right');
    game.left.scale.setTo(spriteScale);
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

    //開始按鍵
    game.startBtn = game.add.button(game.width/2,game.height/2,'playbtn',start,this,0,0,1);
    game.startBtn.anchor.setTo(0.5);
    game.startBtn.input.priorityID = 2;
}

//遊戲更新
function update () {
    

    //遊戲結束點擊gameover按鈕將遊戲重置
    if(status == 'gameOver' && isPlay){
      restart();
    }
    
    //若遊戲不再運行，既不做以下更新
    if(status != 'running'){
      return;
    }
    
    //難度調整
    level();

    this.physics.arcade.collide(player, platforms, effect);
    this.physics.arcade.collide(player, [leftWall, rightWall]);
    
    checkTouchCeiling(player);
    checkGameOver();
    
    createPlatforms();
    
    updatePlayer();
    updatePlatforms();
    updateTextsBoard();
    
    //恢復玩家未觸碰到天花板時的狀態
    if (player.body.y > 5){
      touchCeiling = false;
    }
    
}



//重設一般階梯的隨機範圍數值
function renormalRangeSet(){
    normalRangeSet = 50;
        //如果成功接到伺服器用資料庫資料
        if(phpsuccess){
            $(function () {
               $.ajax({
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                   }, //權限TOKEN
                   url: '/game/data', //取得遊戲參數的位址
                   data: {
                       game: 'games008'
                   }, //送出 game 參數(值為遊戲識別名稱)
                   type: 'POST', //使用 POST傳送
                   success: function (data) //傳送成功的function
                   {       
                   normalRangeSet = parseInt(data.normalRange);
                   console.log(normalRangeSet);
                   }
                });
            }); 
       }
}

//依照當前分數來做難度提升
function level(){
    if(floor > level1 && floor < level2){
        normalRange = parseInt(normalRangeSet/10*9);
        renormalRangeSet();
        console.log(normalRange);
    }
    if(floor > level2 && floor < level3){
        normalRange = parseInt(normalRangeSet/10*8);
        renormalRangeSet(); 
        console.log(normalRange);
    }
    if(floor > level3 && floor < level4){
        normalRange = parseInt(normalRangeSet/10*6);
        renormalRangeSet();
        console.log(normalRange);       
    }
    if(floor > level4 && floor < level5){
        normalRange = parseInt(normalRangeSet/10*5);
        renormalRangeSet();
        console.log(normalRange);        
    }
    if(floor > level5){
        normalRange = parseInt(normalRangeSet/10*4);
        renormalRangeSet();
        console.log(normalRange);       
    }
}

//點擊play後執行
function start(){
  normalRange = parseInt(normalRangeSet);
  touchCeiling = false; 
  startSe.play();
  backgroundMusic.play();
  status = 'running';
  game.startBtn.kill();
  isPlay = true;
  createPlayer();
  keyboard.right.isDown = false;
  keyboard.left.isDown = false;
}

//左右牆面，天花板針刺
function createBounders () {
    background = game.add.image(0, 0, 'background');
    lifeUI = game.add.image(30, 428, 'life');
    lifeUI.anchor.setTo(0.5);
    lifeUI.scale.setTo(spriteScale);
    background.scale.setTo(spriteScale);
    leftWall = game.add.sprite(0, 0, 'wallL');
    leftWall.scale.setTo(spriteScale);
    game.physics.arcade.enable(leftWall);
    leftWall.body.immovable = true;

    rightWall = game.add.sprite(286, 0, 'wallR');
    rightWall.scale.setTo(spriteScale);
    game.physics.arcade.enable(rightWall);
    rightWall.body.immovable = true;

    ceiling = game.add.sprite(0, -5, 'ceiling');
    ceiling.scale.setTo(spriteScale);
    ceiling.animations.add('fire', [0, 1, 2], 12, true);
    ceiling.play('fire');    
}

//創建平台規則
function createPlatforms () {
    if(game.time.now > lastTime + 600) {
        lastTime = game.time.now;
        createOnePlatform();
        distance += 1;
        if(distance==5){
          floor += 1;
          distance = 0;
        }
    }
}

//創建的平台種類屬性設定，以及隨機創建平台種類規則
function createOnePlatform () {

    var platform;
    var x = Math.random()*(300 - 64 - 40) + 20;
    var y = 400;
    var rand = Math.random() * 100;
    if(frist){
      platform = game.add.sprite(120, 350, 'normal');
      platform.scale.setTo(spriteScale);
      frist = false;
    } else if(second){
      platform = game.add.sprite(40, 400, 'normal');
      platform.scale.setTo(spriteScale);
      second = false;
    }else if(third){
      platform = game.add.sprite(200, 400, 'normal');
      platform.scale.setTo(spriteScale);
      third = false;
    }else if (rand < normalRange) {
        platform = game.add.sprite(x, y, 'normal');
        platform.scale.setTo(spriteScale);
    } else if (rand < nailsRange) {
        platform = game.add.sprite(x, y, 'nails');
        platform.scale.setTo(spriteScale);
        game.physics.arcade.enable(platform);
        platform.body.setSize(64, 15, 0, 15);
    } else if (rand < conveyorLeftRange) {
        platform = game.add.sprite(x, y, 'conveyorLeft');
        platform.scale.setTo(spriteScale);
        platform.animations.add('scroll', [0, 1, 2, 3], 8, true);
        platform.play('scroll');
    } else if (rand < conveyorRightRange) {
        platform = game.add.sprite(x, y, 'conveyorRight');
        platform.scale.setTo(spriteScale);
        platform.animations.add('scroll', [0, 1, 2, 3], 8, true);
        platform.play('scroll');
    } else if (rand < trampolineRange) {
        platform = game.add.sprite(x, y, 'trampoline');
        platform.scale.setTo(spriteScale);
        platform.animations.add('jump', [4, 5, 4, 3, 2, 1, 0, 1, 2, 3, 2], 16);
        platform.frame = 2;
    } else {
        platform = game.add.sprite(x, y, 'fake');
        platform.scale.setTo(spriteScale);
        platform.animations.add('turn', [0, 1, 2, 3, 4], 32);
    }
    

    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platforms.push(platform);

    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
}

//創建玩家屬性及狀態
function createPlayer() {

    player = game.add.sprite(140, 120, 'player');
    player.scale.setTo(spriteScale);
    game.physics.arcade.enable(player);
    player.body.setSize(49, 49, 0, 40);

    player.direction = 10;
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.animations.add('left', [0, 1, 2, 3], 8);
    player.animations.add('left_lessHp', [4, 5, 6, 7], 8);
    player.animations.add('right', [9, 10, 11, 12], 8);
    player.animations.add('right_lessHp', [13, 14, 15, 16], 8);
    player.animations.add('flyleft', [18, 19, 20, 21], 12);
    player.animations.add('flyleft_lessHp', [22, 23, 24, 25], 12);
    player.animations.add('flyright', [27, 28, 29, 30], 12);
    player.animations.add('flyright_lessHp', [31, 32, 33, 34], 12);
    player.animations.add('fly', [36, 37, 38, 39], 12);
    player.animations.add('fly_lessHp', [40, 41, 42, 43], 12);
    player.life =playerHp;
    player.unbeatableTime = 0;
    player.touchOn = undefined;
}

//創建UI文字
function createTextsBoard () {
    
    text1 = game.add.text(50, 420, '', style);
    text2 = game.add.text(235, 420, '', style);
    text1.setText(playerHp);
    text2.setText('B: ' + floor);
    
}

//更新玩家屬性及狀態
function updatePlayer () {
    if(keyboard.left.isDown || keyboard.a.isDown) {
        player.body.velocity.x = -playerMoveSpeed;
    } else if(keyboard.right.isDown || keyboard.d.isDown) {
        player.body.velocity.x = playerMoveSpeed;
    } else {
        player.body.velocity.x = 0;
    }
    setPlayerAnimate(player);
}

//依玩家接觸的平台做相對應玩家動畫
function setPlayerAnimate(player) {
    var x = player.body.velocity.x;
    var y = player.body.velocity.y;
    
    if (x < 0 && y > 0) {
        player.animations.play('flyleft');
    } 
    if(player.life < parseInt(playerHpMax/3+2) && x < 0 && y > 0){
        player.animations.play('flyleft_lessHp');
    }
    if (x > 0 && y > 0) {
        player.animations.play('flyright');
    }
    if(player.life < parseInt(playerHpMax/3+2) && x > 0 && y > 0){
        player.animations.play('flyright_lessHp');
    }
    if (x < 0 && y == 0) {
        player.animations.play('left');
    }
    if(player.life < parseInt(playerHpMax/3+2) && x < 0 && y == 0){
        player.animations.play('left_lessHp');
    }
    if (x > 0 && y == 0) {
        player.animations.play('right');
    }
    if(player.life < parseInt(playerHpMax/3+2) && x > 0 && y == 0){
        player.animations.play('right_lessHp');
    }
    if (x == 0 && y != 0) {
        player.animations.play('fly');
    }
    if(player.life < parseInt(playerHpMax/3+2) && x == 0 && y != 0){
        player.animations.play('fly_lessHp');
    }    
    if (x == 0 && y == 0) {
      player.frame = 8;
    }
    if(x == 0 && y == 0 && player.life<parseInt(playerHpMax/3+2)){
      player.frame = 17;
    }
}

//平台更新規則
function updatePlatforms () {
    for(var i=0; i<platforms.length; i++) {
        var platform = platforms[i];
        //如果被天花板刺到，階梯減速
        if (player.body.y < 0){
          platform.body.position.y -= stepVelocity/4;
        }else{
          platform.body.position.y -= stepVelocity;
        }
        if(platform.body.position.y <= -20) {
            platform.destroy();
            platforms.splice(i, 1);
        }
      
    }
}

//UI文字更新
function updateTextsBoard () {
    text1.setText(player.life);
    text2.setText('B: ' + floor);
}

//依照玩家所接觸的平台，做出不同的效果，音效、平台效用、平台動畫特效
function effect(player, platform) {
    if(platform.key == 'conveyorRight') {
        conveyorRightEffect(player, platform);  
    }
    if(platform.key == 'conveyorLeft') {
        conveyorLeftEffect(player, platform);
    }
    if(platform.key == 'trampoline') {
        trampolineEffect(player, platform);
    }
    if(platform.key == 'nails') {
        nailsEffect(player, platform);  
    }
    if(platform.key == 'normal') {
        basicEffect(player, platform);
    }
    if(platform.key == 'fake') {
        fakeEffect(player, platform);
    }
}

//運輸(右)平台效果
function conveyorRightEffect(player, platform) {
    player.body.x += 2;
    conveyorSe = game.add.audio('conveyorSfx', 0.05);
    conveyorSe.play();
    //觸碰到天花板就不播運輸音效
    if (touchCeiling == true) {
      conveyorSe.stop();
    }

}

//運輸(左)平台效果
function conveyorLeftEffect(player, platform) {
    player.body.x -= 2;
    conveyorSe = game.add.audio('conveyorSfx', 0.8);
    conveyorSe.play();
    //觸碰到天花板就不播運輸音效
    if (touchCeiling == true) {
      conveyorSe.stop();
    }
}

//彈跳平台效果
function trampolineEffect(player, platform) {
    if (player.touchOn !== platform) {
      jumpSe = game.add.audio('jumpSfx', 0.5);
      jumpSe.play();
    }
    //觸碰到天花板就不播跳躍音效
    if (touchCeiling == true) {
      jumpSe.stop();
    }
    platform.animations.play('jump');
    player.body.velocity.y = -playerJump; 
}

//傷害平台效果
function nailsEffect(player, platform) {
    
    if (player.touchOn !== platform) {
        hurtSe = game.add.audio('hurtSfx', 0.5);
        hurtSe.play();
        player.life -= hurtblood;      
        if(player.life<=0){
          player.life = 0;
         }
        player.touchOn = platform;
        game.camera.flash(0xff0000, 100);       
    }
}

//一般平台效果
function basicEffect(player, platform) {
    if (player.touchOn !== platform) {
        stepSe = game.add.audio('stepSfx', 0.5);
        stepSe.play()
        if(player.life < playerHpMax) {
            player.life += 1;           
        }
        player.touchOn = platform;
//        game.camera.flash(0xccff00, 100);
    }
}

//下落平台效果
function fakeEffect(player, platform) {
    if(player.touchOn !== platform) {
        platform.animations.play('turn');
        fakeSe = game.add.audio('fakeSfx', 0.5);
        fakeSe.play()
        setTimeout(function() {
            platform.body.checkCollision.up = false;
            platform.kill();
        }, 150);
        player.touchOn = platform;
    }
}

//確認是否接觸天花板
function checkTouchCeiling(player) {

  //觸碰到天花板條件為真
  touchCeiling = true;

    if(player.body.y < 0) {
        if(player.body.velocity.y < 0) {
            player.body.velocity.y = 0;
        }
        if(game.time.now > player.unbeatableTime) {
            player.life -= hurtblood;
            if(player.life<=0){
                player.life = 0;
               }
            hurtSe = game.add.audio('hurtSfx', 0.2);
            hurtSe.play();
            game.camera.flash(0xff0000, 100);
            //無敵時間
            player.unbeatableTime = game.time.now + unHurtTime;
        }
    }
}

//確認否達到遊戲結束條件
function checkGameOver () {
    if(player.life <= 0 || player.body.y > 500) {
        gameOver();
    }
}

//遊戲結束
function gameOver () {
    game.left.inputEnabled = false;
    game.left.inputEnabled = false;
    score = floor;
    //傳送分數到資料庫
    if(phpsuccess){
        sendScore(score);
    }
    status = 'gameOver';
    isPlay=false;
    game.restartBtn = game.add.button(game.width/2,game.height/2,'replaybtn',restart,this,0,0,1);
    game.restartBtn.input.priorityID = 2;
    game.restartBtn.anchor.setTo(0.5);
    backgroundMusic.stop();
    deadSe = game.add.audio('deadSfx', 0.2);
    deadSe.play()

}

//遊戲重置
function restart () {
    platforms.forEach(function(s) {s.destroy()});
    platforms = [];
    distance = 0;
    floor = 0;
    score = 0;
    renormalRangeSet();
    player.life = playerHp;
    game.restartBtn.kill();
    text1.setText(player.life);
    text2.setText('B: ' + floor);
    frist = true;
    second = true;
    third = true;
    keyboard.right.isDown = false;
    keyboard.left.isDown = false;  
    // 虛擬按鍵
    var isLeft = false;
    var isRight = false;
    game.left = game.add.sprite(-5,0,'left');
    game.left.scale.setTo(spriteScale);
    game.right = game.add.sprite(155,0,'right');
    game.left.scale.setTo(spriteScale);
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
    //開始按鍵
    game.startBtn = game.add.button(game.width/2,game.height/2,'playbtn',start,this,0,0,1);
    game.startBtn.anchor.setTo(0.5);
    game.startBtn.input.priorityID = 2;
}

