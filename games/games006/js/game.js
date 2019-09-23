/******************** 連結資料庫的變數 **********************/

//我方生命上限
var myLifeLim = 3;
//我方起始生命
var myLife = 2;
//我方子彈速度
var myBulletVel = 300;
//我方子彈間格時間
var myBulletInterval = 200;
//我方移動速度
var myMaxSpeed = 350;
//我方等級1條件
var myLV1Flag = 2;
//我方等級2條件
var myLV2Flag = 3;


//敵方生成間格時間
var enemyInterval = 800; //秒
//敵方子彈間格時間
var enemyBulletInterval = 500; //秒
//敵方移動速度
var enemyVel = 150;
//敵方子彈速度
var enemyBulletVel = 250;
//敵方生命
var enemyLifeA = 3;
var enemyLifeB = 5;
var enemyLifeC = 8;
//敵方分數
var enemyScoreA = 20;
var enemyScoreB = 30;
var enemyScoreC = 50;

//獎勵回復血量
var awardLife = 1;
//給予獎勵間格時間
var awardInterval = 30;
//得到獎勵分數
var awardScore = 100;

/*******************************************************/

//鍵盤操作鍵物件
var keyboard;
//計時器
var timer;

//UI字型
var scoreText;
var lifeText;
var style = {fill: 'white', font: "32px GrinchedRegular"};//文字樣式

//伺服器連接flag
var phpsuccess = false;

var game =new Phaser.Game(500,750,Phaser.CANVAS,'game');



/********************* ajax調用database.php連線取得資料庫設定數值 *********************/

$(function () {
    // $.ajax({
    //     url: '/games/games006/php/database.php',//連接的URL
    //     data: "{}",//夾帶的參數
    //     dataType: 'json', //資料格式
    //     success: function (data) //傳送成功的function
    //     {                
    //         console.log(data);
    //         console.log("我方生命上限："+parseInt(data[0]['myLifeLim'])); 
    //         console.log("我方起始生命："+parseInt(data[0]['myLife']));     
    //         console.log("我方子彈速度："+parseInt(data[0]['myBulletVel']));
    //         console.log("我方子彈間格時間："+parseInt(data[0]['myBulletInterval'])/1000+"秒");
    //         console.log("我方移動速度："+parseInt(data[0]['myMaxSpeed'])); 
    //         console.log("敵方生成間格時間："+parseInt(data[0]['enemyInterval'])/1000+"秒");
    //         console.log("敵方子彈間格時間(乘量單位)："+parseInt(data[0]['enemyBulletInterval'])/1000+"秒"); 
    //         console.log("敵方移動速度："+parseInt(data[0]['enemyVel']));  
    //         console.log("敵方子彈速度："+parseInt(data[0]['enemyBulletVel']));
    //         console.log("敵方A生命："+parseInt(data[0]['enemyLifeA']));
    //         console.log("敵方B生命："+parseInt(data[0]['enemyLifeB']));     
    //         console.log("敵方C生命："+parseInt(data[0]['enemyLifeC']));
    //         console.log("敵方A得分："+parseInt(data[0]['enemyScoreA']));
    //         console.log("敵方B得分："+parseInt(data[0]['enemyScoreB']));     
    //         console.log("敵方C得分："+parseInt(data[0]['enemyScoreC']));
    //         console.log("獎勵增益間格時間："+parseInt(data[0]['awardVel']));
    //         console.log("吃到獎勵回復生命數值："+parseInt(data[0]['awardLife']));
    //         console.log("給予獎勵間格時間："+parseInt(data[0]['awardInterval']));           
    //         console.log("得到獎勵分數："+parseInt(data[0]['awardScore']));

    //         /******************************* 能從外部變更的變數 **************************/  

    //         myLifeLim = parseInt(data[0]['myLifeLim']);
    //         myLife = parseInt(data[0]['myLife']);
    //         myBulletVel = parseInt(data[0]['myBulletVel']);
    //         myBulletInterval = parseInt(data[0]['myBulletInterval']);
    //         myMaxSpeed = parseInt(data[0]['myMaxSpeed']);
    //         enemyInterval = parseInt(data[0]['enemyInterval']);
    //         enemyBulletInterval = parseInt(data[0]['enemyBulletInterval']);
    //         enemyVel = parseInt(data[0]['enemyVel']);
    //         enemyBulletVel = parseInt(data[0]['enemyBulletVel']);
    //         enemyLifeA = parseInt(data[0]['enemyLifeA']);
    //         enemyLifeB = parseInt(data[0]['enemyLifeB']);
    //         enemyLifeC = parseInt(data[0]['enemyLifeC']);
    //         console.log(myLife,myBulletVel,myBulletInterval,myMaxSpeed,enemyInterval,enemyBulletInterval,enemyLifeA,enemyLifeB,enemyLifeC);
    //         phpsuccess = true; //伺服器連接成功flag 
    //         if(enemyVel >= enemyBulletVel){
    //             console.log('！！！警告！！！：敵方子彈速度(enemyBulletVel)不要小於等於敵方移動速度(enemyVel)，不然動畫看起來會子彈比怪物慢，有點奇怪，麻煩再做調整');
    //         }
            
    //     }
    // });

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }, //權限TOKEN
        url: '/game/data', //取得遊戲參數的位址
        data: {
            game: 'games006'
        }, //送出 game 參數(值為遊戲識別名稱)
        type: 'POST', //使用 POST傳送
        success: function (data) //傳送成功的function
        {
            console.log(data);
            console.log("我方生命上限："+parseInt(data.myLifeLim)); 
            console.log("我方起始生命："+parseInt(data.myLife));     
            console.log("我方子彈速度："+parseInt(data.myBulletVel));
            console.log("我方子彈間格時間："+parseInt(data.myBulletInterval)/1000+"秒");
            console.log("我方移動速度："+parseInt(data.myMaxSpeed)); 
            console.log("敵方生成間格時間："+parseInt(data.enemyInterval)/1000+"秒");
            console.log("敵方子彈間格時間(乘量單位)："+parseInt(data.enemyBulletInterval)/1000+"秒"); 
            console.log("敵方移動速度："+parseInt(data.enemyVel));  
            console.log("敵方子彈速度："+parseInt(data.enemyBulletVel));
            console.log("敵方A生命："+parseInt(data.enemyLifeA));
            console.log("敵方B生命："+parseInt(data.enemyLifeB));     
            console.log("敵方C生命："+parseInt(data.enemyLifeC));
            console.log("敵方A得分："+parseInt(data.enemyScoreA));
            console.log("敵方B得分："+parseInt(data.enemyScoreB));     
            console.log("敵方C得分："+parseInt(data.enemyScoreC));
            console.log("獎勵回復血量："+parseInt(data.awardLife));
            console.log("給予獎勵間格時間："+parseInt(data.awardInterval));           
            console.log("得到獎勵分數："+parseInt(data.awardScore));

            /******************************* 能從外部變更的變數 **************************/  

            myLifeLim = parseInt(data.myLifeLim);
            myLife = parseInt(data.myLife);
            myBulletVel = parseInt(data.myBulletVel);
            myBulletInterval = parseInt(data.myBulletInterval);
            myMaxSpeed = parseInt(data.myMaxSpeed);
            enemyInterval = parseInt(data.enemyInterval);
            enemyBulletInterval = parseInt(data.enemyBulletInterval);
            enemyVel = parseInt(data.enemyVel);
            enemyBulletVel = parseInt(data.enemyBulletVel);
            enemyLifeA = parseInt(data.enemyLifeA);
            enemyLifeB = parseInt(data.enemyLifeB);
            enemyLifeC = parseInt(data.enemyLifeC);
            enemyScoreA = parseInt(data.enemyScoreA);
            enemyScoreB = parseInt(data.enemyScoreB);
            enemyScoreC = parseInt(data.enemyScoreC);
            awardLife = parseInt(data.awardLife);
            awardInterval = parseInt(data.awardInterval);
            awardScore = parseInt(data.awardScore);
            phpsuccess = true; //伺服器連接成功flag 
            if(enemyVel >= enemyBulletVel){
                console.log('！！！警告！！！：敵方子彈速度(enemyBulletVel)不要小於等於敵方移動速度(enemyVel)，不然動畫看起來會子彈比怪物慢，有點奇怪，麻煩再做調整');
            }
            phpsuccess = true; //伺服器連接成功flag 
        }
    });
});  

    /**************************** ajax調用send.php再傳入資料庫方法 **********************/ 

    function sendScore(SCORE){

        $(function () {
            // $.ajax({
            //     url: '/games/games006/php/send.php',//連接的URL
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
                    game: 'games006',
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

//遊戲場景
game.State={};

//遊戲得分
game.score = 0;
//虛擬手把
game.stick;
game.pad;

//boot state 對遊戲進行設置
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

//load state 加載資源
game.State.load={
    preload:function(){
        var preloadSprite = game.add.sprite(game.width/2-220/2,game.height/2-19/2,'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('background', '../games006/assets/bg.jpg');
        game.load.spritesheet('myplane', '../games006/assets/myplane.png', 80, 80, 4);
        game.load.spritesheet('startbutton', '../games006/assets/startbutton.png', 200, 50, 2);
        game.load.spritesheet('replaybutton', '../games006/assets/replaybutton.png', 300, 75, 2);
        game.load.image('mybullet', '../games006/assets/mybullet.png');
        game.load.image('bullet', '../games006/assets/bullet.png');
        /*****************************************************************/
        game.load.image('enemy1', '../games006/assets/enemy1.png');
        game.load.image('enemy2', '../games006/assets/enemy2.png');
        game.load.image('enemy3', '../games006/assets/enemy3.png');
        /*****************************************************************/
        game.load.spritesheet('enemyA1', '../games006/assets/enemyA1.png', 64, 64, 4);
        game.load.spritesheet('enemyA2', '../games006/assets/enemyA2.png', 80, 80, 4);
        game.load.spritesheet('enemyA3', '../games006/assets/enemyA3.png', 80, 100, 4);
        /*****************************************************************/
        game.load.spritesheet('explode1', '../games006/assets/explode1.png', 64, 64, 3);
        game.load.spritesheet('explode2', '../games006/assets/explode2.png', 80, 80, 3);
        game.load.spritesheet('explode3', '../games006/assets/explode3.png', 80, 80, 3);
        game.load.spritesheet('myexplode', '../games006/assets/myexplode.png', 80, 80, 3);
        game.load.spritesheet('atkect', '../games006/assets/atkect.png', 16, 16, 4);
        game.load.audio('diemusic', '../games006/sounds/diemusic.mp3');        
        game.load.audio('playback', '../games006/sounds/playback.mp3');
        game.load.audio('fashe', '../games006/sounds/fashe.mp3');
        game.load.audio('hurt', '../games006/sounds/hurt.mp3');
        game.load.audio('crash1', '../games006/sounds/crash1.mp3');
        game.load.audio('crash2', '../games006/sounds/crash2.mp3');
        game.load.audio('crash3', '../games006/sounds/crash3.mp3');
        game.load.audio('die', '../games006/sounds/die.mp3');
        game.load.audio('bullet', '../games006/sounds/bullet.mp3');
        game.load.audio('deng', '../games006/sounds/deng.mp3');       
        game.load.image('award','../games006/assets/award.png');
        game.load.image('bg','../games006/assets/bg.jpg');
    },
    create:function(){
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

        game.state.start('start');
        
    }
}

// start state 遊戲開始介面
game.State.start={

    create:function(){
        game.add.image(0,0,'background');
        var myplane=game.add.sprite(game.width/2,280,'myplane');
        myplane.anchor.setTo(0.5, 0.5);
        myplane.animations.add('fly');
        myplane.animations.play('fly',12,true);
        var startBtn = game.add.button(game.width/2,game.height/2,'startbutton',this.onStartClick,this,0,1,1);
        startBtn.anchor.setTo(0.5,0.5);
         
    },
    onStartClick:function(){
        game.state.start('play');
    }
}

// play state 遊戲主介面
game.State.play={
    
    init: function () {
        //像素顯示在整數位置 (round pixel: 整數位置)，避免 Phaser 使用子像素位置 (Sub-pixel) 顯示，以免模糊
        // this.game.renderer.renderSession.roundPixels = true;
    },
    preload:function(){
        // //虛擬手把圖片
        // this.load.atlas('arcade', '../games006/assets/arcade-joystick.png', '../games/games006/assets/arcade-joystick.json');
    },
    create:function(){
        //分數
        scoreText = game.add.text(20, 30, "Score: 0", style);
        lifeText = game.add.text(game.width - 100, 30, "Life: " + myLife, style);
        //分數歸0
        game.score = 0;
        //開啟ARCADE物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //捲動背景 
        var bg=game.add.tileSprite(0,0,game.width,game.height,'background');
        bg.autoScroll(0,20);
        // 我方
        this.myplane=game.add.sprite(game.width/2,280,'myplane');
        this.myplane.anchor.setTo(0.5, 0.5);
        this.myplane.animations.add('fly');
        this.myplane.animations.play('fly',12,true);
        game.physics.arcade.enable(this.myplane);
        //虛擬手把設置
        // game.pad = this.game.plugins.add(Phaser.VirtualJoystick);
        // game.stick =game.pad.addStick(0, 0, 200, 'arcade');
        // game.stick.showOnTouch = true;
        //讓我方物件會碰撞世界邊界
        this.myplane.body.collideWorldBounds = true;     
        //我方飛到底部的動畫
        var tween=game.add.tween(this.myplane).to({y:game.height-80},1000,Phaser.Easing.Sinusoidal.InOut,true);//戰機位置漸變
        tween.onComplete.add(this.onStart,this);//完成漸變後調用this.onStart
        
        /***************************** 聲音 **********************************/
        
        
        //背景音樂
        this.playback = game.add.audio('playback', 0.2, true);
        try{
            this.playback.play();
        }catch(e){}
        
        //開火音效
        this.bullet = game.add.audio('bullet', 0.1, false);
        //打中敵人音效
        this.firesound = game.add.audio('fashe', 0.3, false);
        //受擊音效
        this.hurt = game.add.audio('hurt', 2, false);
        //爆炸音效
        this.crash1 = game.add.audio('crash1', 0.3, false);
        this.crash2 = game.add.audio('crash2', 0.3, false);
        this.crash2 = game.add.audio('crash2', 0.3, false);
        this.crash3 = game.add.audio('crash3', 0.3, false);
        //死亡音效
        this.die = game.add.audio('die', 1, false);
        //得到獎勵音效
        this.deng = game.add.audio('deng', 1, false);
        
        /********************************************************************/

        /************ 重置鍵盤訊號 ************/

        keyboard.right.isDown = false;
        keyboard.left.isDown = false;
        keyboard.up.isDown = false;
        keyboard.down.isDown = false;
        keyboard.a.isDown = false;
        keyboard.d.isDown = false;
        keyboard.w.isDown = false;
        keyboard.s.isDown = false;

        /************************************/    
    },
    
    update:function(){

    /********************* 鍵盤操作 ******************************/  

        // if(keyboard.left.isDown || keyboard.a.isDown) {
        //     this.myplane.body.velocity.x = -myMaxSpeed;
        // } else if(keyboard.right.isDown || keyboard.d.isDown) {
        //     this.myplane.body.velocity.x = myMaxSpeed;
        // } else {
        //     this.myplane.body.velocity.x = 0;
        // }
        // if(keyboard.up.isDown || keyboard.w.isDown) {
        //     this.myplane.body.velocity.y = -myMaxSpeed;
        // } else if(keyboard.down.isDown || keyboard.s.isDown) {
        //     this.myplane.body.velocity.y = myMaxSpeed;
        // } else {
        //     this.myplane.body.velocity.y = 0;
        // }  
    /********************* 虛擬手把 ******************************/ 
        // if (game.stick.isDown)
        // {
        //     game.physics.arcade.velocityFromRotation(game.stick.rotation, game.stick.force * myMaxSpeed, this.myplane.body.velocity);
        // }
        // else
        // {
        //     this.myplane.body.velocity.set(0);
        // }

    /***********************************************************/      


//        var now = new Date().getTime();//抓取當下時間 js原生
        var now = game.time.now;//抓取當下時間 phaser函式庫
        if(this.myplane.myStartFire){
           this.myPlaneFire();
           this.generateEnemy();
           this.enemyFire();    
           //我方子彈和敵方進行碰撞檢測
           game.physics.arcade.overlap(this.myBullets, this.enemys, this.hitEnemy, null, this);
           //敵方子彈和我方飛機進行碰撞檢測
           game.physics.arcade.overlap(this.enemyBullets, this.myplane, this.hitPlane, null, this);
           //敵方和我方飛機進行碰撞檢測
           game.physics.arcade.overlap(this.enemys, this.myplane, this.crashEnemy, null, this);
           //獎勵和我方飛機進行碰撞檢測
           game.physics.arcade.overlap(this.awards, this.myplane, this.getAward, null, this);     
        }
    },
    
    //我方受擊
    hitPlane: function(myplane,bullet){

        myplane.life = myplane.life - 1;//扣血
            try{
                this.hurt.play();
            }catch(e){}             
    
        game.camera.flash(0xff0000, 300);//畫面閃紅
        bullet.kill();
        lifeText.setText("Life: "+myplane.life);
        
        if(this.myplane.life <= 0 ){          
            myplane.kill();
            this.playback.stop();
            try{
                this.die.play();
            }catch(e){}                
            var explode = game.add.sprite(myplane.x,myplane.y,'myexplode');
            explode.anchor.setTo(0.5, 0.5);
            var anim = explode.animations.add('exploeAdnim');
            anim.play(15,false,false);
            anim.onComplete.addOnce(function(){
                explode.destroy();                
                //延遲3.5秒跳轉到 over state
            timer = setTimeout(function() {
                    game.state.start('over');
                }, 3500);
            });              
        }
       
    },
    crashEnemy: function(myplane,enemy){

        game.camera.flash(0xff0000, 300);//畫面閃紅
        lifeText.setText("Life: "+0);
        myplane.kill();
        this.playback.stop();
        try{
            this.die.play();
        }catch(e){}           
        var explode = game.add.sprite(myplane.x,myplane.y,'myexplode');
        explode.anchor.setTo(0.5, 0.5);
        var anim = explode.animations.add('exploeAdnim');
        anim.play(15,false,false);
        anim.onComplete.addOnce(function(){
            explode.destroy();                           
            //延遲3.5秒跳轉到 over state
         timer = setTimeout(function() {
                game.state.start('over');
            }, 3500);
        });                 
    },
    
    //敵方受擊
    hitEnemy: function(bullet,enemy){//子彈與怪物碰撞(已傳兩個參數)

        enemy.life = enemy.life - 1;//扣血
        /******************************** 子彈爆炸特效 ********************************/
        
        var atkectRnd = game.rnd.integerInRange(1,3);//讓子彈爆炸特效隨機x位置
        var atkect = game.add.sprite(enemy.x-20+(atkectRnd*10),enemy.y+30,'atkect');
            atkect.anchor.setTo(0.5, 0.5);
        var atkectAnim = atkect.animations.add('atkectAnim');
            atkectAnim.play(15,false,false);
        atkectAnim.onComplete.addOnce(function(){
                atkect.destroy();
            }); 
                    
        /****************************************************************************/
        
        if(enemy.life<=0){
            enemy.kill();
            try{
                this["crash" + enemy.index].play();
            }catch(e){}            
            game.score = game.score + enemy.score;
            var explode = game.add.sprite(enemy.x,enemy.y,'explode' + enemy.index);
            explode.anchor.setTo(0.5, 0.5);
            var anim = explode.animations.add('exploeAdnim');
            anim.play(15,false,false);
            anim.onComplete.addOnce(function(){
                explode.destroy();
            });   
        }
        bullet.kill();
        try{
            this.firesound.play();
        }catch(e){}            
        scoreText.setText("Score: "+game.score);
    },
    
    //獲取獎勵
    getAward: function(myplane, award){
        award.kill();
        try{
            this.deng.play();
        }catch(e){}            
        game.score = game.score + awardScore;
        
        //補血
        if(myplane.life < myLifeLim){
            myplane.life = myplane.life + awardLife;
            if(myplane.life > myLifeLim){
                myplane.life = myLifeLim;
            }
        }
        //顯示在介面上
        lifeText.setText("Life: "+myplane.life);
        scoreText.setText("Score: "+game.score);
    },
    
    //開始遊戲
    onStart: function(){
        //允許我方被滑鼠拖曳
        this.myplane.inputEnabled =true;//允許輸入訊號
        this.myplane.input.enableDrag(false);
        this.myplane.myStartFire = true;//開火FLAG
        this.myplane.life = myLife;
        this.myplane.lastBulletTime = 0;
        //我方的子彈組
        this.myBullets = game.add.group();//我方子彈對象池
        this.enemys = game.add.group();//敵方對象池
        this.enemys.lastEnemyTime = 0;
        this.enemyBullets = game.add.group();//敵方子彈對象池
        this.awards = game.add.group();//獎勵對象池
        //分數
        scoreText = game.add.text(20, 30, "Score: 0", style);
        lifeText = game.add.text(game.width - 100, 30, "Life: " + myLife, style);
        //每隔一段時間給獎勵
        game.time.events.loop(Phaser.Timer.SECOND * awardInterval,this.generateAward, this);
    },
    
    //我方開火
    myPlaneFire: function(){
        
        var now = game.time.now;//抓取當下時間 phaser函式庫
        var getMyBullet = function(){
            //獲取子彈對象池的子彈
            var myBullet = this.myBullets.getFirstExists(false);
            //獲取到子彈的話
            if(myBullet){ 
                //reset位置
                myBullet.reset(this.myplane.x-5,this.myplane.y-50);                      
            }else{
                //沒有獲取到就創建一顆子彈
//                console.log('No bullet');
                myBullet = game.add.sprite(this.myplane.x-5,this.myplane.y-50,'mybullet');
                //子彈對象池回收機制
                //sprite內的屬性方法
                myBullet.checkWorldBounds = true;//檢查邊界
                myBullet.outOfBoundsKill = true;//子彈飛出邊界消除
                //新增至子彈對象池中
                this.myBullets.addChild(myBullet);
                game.physics.enable(myBullet, Phaser.Physics.ARCADE);
            }          
            return myBullet;
        }
        if(this.myplane.alive && now - this.myplane.lastBulletTime > myBulletInterval){
            
            var myBullet = getMyBullet.call(this);
            //子彈向前攻擊的衝力
            myBullet.body.velocity.y = -myBulletVel;
            if(this.myplane.life >= myLV1Flag){
                myBullet = getMyBullet.call(this);
                //子彈向前攻擊的衝力
                myBullet.body.velocity.x = -myBulletVel/10;
                myBullet.body.velocity.y = -myBulletVel;
                myBullet = getMyBullet.call(this);
                //子彈向前攻擊的衝力
                myBullet.body.velocity.x = myBulletVel/10;
                myBullet.body.velocity.y = -myBulletVel;
            }
            if(this.myplane.life >= myLV2Flag){
                myBullet = getMyBullet.call(this);
                //子彈向前攻擊的衝力
                myBullet.body.velocity.x = -myBulletVel/5;
                myBullet.body.velocity.y = -myBulletVel;
                myBullet = getMyBullet.call(this);
                //子彈向前攻擊的衝力
                myBullet.body.velocity.x = myBulletVel/5;
                myBullet.body.velocity.y = -myBulletVel;
            }    
            
            this.myplane.lastBulletTime = now; 
            try{
                this.bullet.play();
            }catch(e){}
        }
    },
    
    //敵方生成
    generateEnemy: function(){

        var now = game.time.now;//抓取當下時間 phaser函式庫

        if(now - this.enemys.lastEnemyTime > enemyInterval){

        /************************** 敵方生成 ******************************/

           //取個隨機數
           var enemyIndex = game.rnd.integerInRange(1,3);
           var key ='enemyA'+enemyIndex;
           //寬會是4帧的寬度，要用1帧的尺寸，所以要除4
           var enemyWidth = game.cache.getImage(key).width/4;
           var enemyHeight = game.cache.getImage(key).height;
           var x = game.rnd.integerInRange(enemyWidth/2, game.width - enemyWidth/2);
           var y= 0;
           var enemy = this.enemys.getFirstExists(false, true, x, y, key);

           enemy.index = enemyIndex;
           enemy.anchor.setTo(0.5, 0.5);
           enemy.animations.add(key+'_fly');
           enemy.animations.play(key+'_fly',15,true);
           game.physics.arcade.enable(enemy); 
           enemy.body.setSize(enemyWidth, enemyHeight);//設定碰撞框尺寸
           enemy.body.velocity.y = enemyVel;
           enemy.lastFireTime = 0;
           enemy.enemyHeight = enemyHeight;//用來讓其他函數能調用此變數，所以掛到enemy底下
           enemy.checkWorldBounds = true;//檢查邊界
           enemy.outOfBoundsKill = true;//敵方飛出邊界消除

        /****************************************************************/ 

          /*********** 不一樣的敵人，不一樣的攻擊模式 ********/

          if(enemyIndex == 1){
              enemy.life = enemyLifeA;
              enemy.bulletV = enemyBulletVel;
              enemy.bulletTime = enemyBulletInterval*6;
              enemy.score = enemyScoreA;
          }else if(enemyIndex == 2){
              enemy.life = enemyLifeB;
              enemy.bulletV = enemyBulletVel * 1.2;
              enemy.bulletTime = enemyBulletInterval*4;
              enemy.score = enemyScoreB;
          }else if(enemyIndex == 3){
              enemy.life = enemyLifeC;
              enemy.bulletV = enemyBulletVel * 1.5;
              enemy.bulletTime = enemyBulletInterval*2;
              enemy.score = enemyScoreC;
          }

         /**********************************************/ 
           this.enemys.lastEnemyTime = now;
        }
    //    console.log('enemys: '+this.enemys.length);
    },
    
    //敵方開火
    enemyFire: function(){
        var now = game.time.now;
        this.enemys.forEachAlive(function(enemy){
            if(now - enemy.lastFireTime > enemy.bulletTime){
            //敵方發射子彈
                var bullet = this.enemyBullets.getFirstExists(false, true, enemy.x, enemy.y + enemy.enemyHeight/2, 'bullet');
                bullet.anchor.setTo(0.5, 0.5);
                bullet.checkWorldBounds = true;//檢查邊界
                bullet.outOfBoundsKill = true;//敵方子彈飛出邊界消除
                game.physics.arcade.enable(bullet); 
                bullet.body.velocity.y = enemy.bulletV;
                enemy.lastFireTime = now;
            }
        },this);
    //       console.log('bullets: '+this.enemyBullets.length);
    },
    
    //獎勵生成
    generateAward: function(){
        var awardSize = game.cache.getImage('award');
        var x = game.rnd.integerInRange(0, game.width - awardSize.width);
        var y = -awardSize.height;
        var award = this.awards.getFirstExists(false, true, x , y, 'award');
        
        award.checkWorldBounds = true;//檢查邊界
        award.outOfBoundsKill = true;//敵方飛出邊界消除
        game.physics.arcade.enable(award); 
        award.body.velocity.y = 600;
        console.log(this.awards.length);
    }
    
}

// over state 遊戲結束介面
game.State.over={
    
    create:function(){
//        this.narmalback.play();
        game.add.image(0,0,'background');
        var myplane=game.add.sprite(game.width/2,280,'myplane');
        myplane.anchor.setTo(0.5, 0.5);
        myplane.animations.add('fly');
        myplane.animations.play('fly',12,true);
        var style = {fill: 'white', font: "36px GrinchedRegular"}
        scoreText = game.add.text(game.width/2, game.height/2+100, "Score: " + game.score, style);
        scoreText.setShadow(3,3,'rgba(68,109,214,0.5)',2);
        scoreText.anchor.setTo(0.5, 0.5);
        var replaybutton = game.add.button(game.width/2,game.height/2,'replaybutton',this.onReplayClick,this,0,1,0);
        replaybutton.anchor.setTo(0.5, 0.5);
        clearTimeout(timer);//清除計時器
        if(phpsuccess){
            sendScore(game.score);
        }
    },
    
    onReplayClick: function(){
        game.state.start('play');
    }
}

/*************** 加入state ******************/

game.state.add('boot',game.State.boot);
game.state.add('load',game.State.load);
game.state.add('start',game.State.start);
game.state.add('play',game.State.play);
game.state.add('over',game.State.over);
game.state.start('boot');

/*******************************************/