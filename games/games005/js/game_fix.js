var game = new Phaser.Game(300,450,Phaser.CANVAS,'game'); //实例化game
game.States = {}; //存放state对象


var gameSpeedValue = 220;
var birdGravityValue = 1000;
var birdFly = 300;
var gapValue = 100;
var phpsuccess =false;

 /***********************ajax調用database.php連線取得資料庫設定數值***********************/
   $(function () {
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}, //權限TOKEN
			url: '/game/data', //取得遊戲參數的位址
			data: {
				game: 'games005'
			}, //送出 game 參數(值為遊戲識別名稱)
			type: 'POST', //使用 POST 傳送
			success: function (data) //傳送成功的 function
			{
				// 回應的資料格式為 json，所以 data 變數是個 Object
				console.log(data);
				console.log("場景捲動速度："+parseInt(data.gameSpeed));
				console.log("角色重量："+parseInt(data.playerGravity));
				console.log("水管上下間隙："+parseInt(data.gapValue));
				console.log("小鳥飛行高度："+parseInt(data.birdFly));  
				// console.log("等級1："+parseInt(data.level1));
				// console.log("等級2："+parseInt(data.level2));
				// console.log("等級3："+parseInt(data.level3));
				// console.log("等級4："+parseInt(data.level4));
				// console.log("等級5："+parseInt(data.level5));     
							
		/******************************能從外部變更的變數*****************************/                      
				gameSpeedValue = parseInt(data.gameSpeed);
				birdGravityValue = parseInt(data.playerGravity);
				gapValue = parseInt(data.gapValue);
				birdFly = parseInt(data.birdFly);   
				console.log(gameSpeedValue,birdGravityValue,gapValue,birdFly);
				phpsuccess = true; //伺服器連接成功flag    
			}
		});
	});  
 /*************************ajax調用send.php再傳入資料庫方法***************************/       
   function sendScore(SCORE){
		$(function () {
			$.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}, //權限TOKEN
				url: '/game/score', //分數儲存的位址
				type: 'POST', //使用 POST 傳送
				data:{
					game: 'games005',
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
 /**********************************************************************************/  


game.States.boot = function(){
	this.preload = function(){
        if(typeof(GAME) !== "undefined") {
    		this.load.baseURL = GAME + "/";
            
    	}
		if(!game.device.desktop){//行動平台適應
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.forcePortrait = false;
			this.scale.refresh();
		}
		game.load.image('loading','../games005/assets/preloader.gif');
	};
	this.create = function(){
		game.state.start('preload'); //跳轉資源載入畫面
	};
}

game.States.preload = function(){
	this.preload = function(){
		var preloadSprite = game.add.sprite(35,game.height/2,'loading'); //loading進度條
		game.load.setPreloadSprite(preloadSprite);
		//以下為要加載的資源
		game.load.image('background','../games005/assets/background.png'); //北景
    	game.load.image('ground','../games005/assets/ground.png'); //地面
    	game.load.image('title','../games005/assets/title.png'); //遊戲標題
    	game.load.spritesheet('bird','../games005/assets/bird.png',51,36,3); //鳥(幽浮)
    	game.load.image('btn','../games005/assets/start-button.png');  //按鈕
    	game.load.spritesheet('pipe','../games005/assets/pipes300.png',54,300,2); //管道(柱子)
    	game.load.bitmapFont('flappy_font', '../games005/assets/fonts/flappyfont/flappyfont.png', '/games/games005/assets/fonts/flappyfont/flappyfont.fnt');
        game.load.audio('bgm', '../games005/assets/bgm5.mp3');
    	game.load.audio('fly_sound', '../games005/assets/flap.mp3');//飛翔的音效
    	game.load.audio('score_sound', '../games005/assets/score.mp3');//得分的音效
    	game.load.audio('hit_pipe_sound', '../games005/assets/pipe-hit.mp3'); //撞擊管道的音效
    	game.load.audio('hit_ground_sound', '../games005/assets/ouch.mp3'); //撞擊地面的音效

    	game.load.image('ready_text','../games005/assets/get-ready.png');
    	game.load.image('play_tip','../games005/assets/instructions.png');
    	game.load.image('game_over','../games005/assets/gameover.png');
    	game.load.image('score_board','../games005/assets/scoreboard.png');
	}
	this.create = function(){
		game.state.start('menu');
	}
}

game.States.menu = function(){
	this.create = function(){
		game.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(-10,0); //背景图
		game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //地板
		var titleGroup = game.add.group(); //創建存放標題的群組
		titleGroup.create(20,-20,'title'); //標題
		var bird = titleGroup.create(190, 10, 'bird'); //增加bird到群組裡
		bird.animations.add('fly'); //增加動畫
		bird.animations.play('fly',4,true); //撥放動畫
		titleGroup.x = 35;
		titleGroup.y = 100;
		game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true); //標題的緩衝動畫
		var btn = game.add.button(game.width/2,game.height/2,'btn',function(){//開始按鈕
			game.state.start('play');
		});
		btn.anchor.setTo(0.5,0.5);
	}
}

game.States.play = function(){
	this.create = function(){

        this.bg = game.add.tileSprite(0,0,game.width,game.height,'background');//背景圖
		this.pipeGroup = game.add.group();
		this.pipeGroup.enableBody = true;
		this.ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground'); //地板
		this.bird = game.add.sprite(50,150,'bird'); //鳥
		this.bird.animations.add('fly');
		this.bird.animations.play('fly',4,true);
		this.bird.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.bird,Phaser.Physics.ARCADE); //開啟鳥的物理系統
        this.bird.body.setSize(25, 10, -5, 15);//設置碰撞框
		this.bird.body.gravity.y = 0; //鳥的重量，先讓牠不要下落
		game.physics.enable(this.ground,Phaser.Physics.ARCADE);//地面
		this.ground.body.immovable = true; //固定不動
        
        this.soundBgm = game.add.sound('bgm');
		this.soundFly = game.add.sound('fly_sound');
		this.soundScore = game.add.sound('score_sound');
		this.soundHitPipe = game.add.sound('hit_pipe_sound');
		this.soundHitGround = game.add.sound('hit_ground_sound');
		this.scoreText = game.add.bitmapText(game.world.centerX-20, 30, 'flappy_font', '0', 36);

		this.readyText = game.add.image(game.width/2, 60, 'ready_text'); //get ready 文字
		this.playTip = game.add.image(game.width/2,300,'play_tip'); //操作說明
		this.readyText.anchor.setTo(0.5, 0);
		this.playTip.anchor.setTo(0.5, 0);

		this.hasStarted = false; //遊戲開始flag
		game.time.events.loop(900, this.generatePipes, this);
		game.time.events.stop(false);
		game.input.onDown.addOnce(this.statrGame, this);
	}
	this.update = function(){

		if(!this.hasStarted) return; //遊戲未開始跳出
		game.physics.arcade.collide(this.bird,this.ground, this.hitGround, null, this); //與地面碰撞
		game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this); //与管道碰撞
		if(this.bird.angle < 30) this.bird.angle += 1.5; //下落時頭朝下
		this.pipeGroup.forEachExists(this.checkScore,this); //分數檢測及更新
//      console.log(this.score);
	}

	this.statrGame = function(){
        this.soundBgm.play();
		this.gameSpeed = gameSpeedValue; //遊戲速度
		this.gameIsOver = false;
		this.hasHitGround = false;
		this.hasStarted = true;
		this.score = 0;
		this.bg.autoScroll(-(this.gameSpeed/10),0);
		this.ground.autoScroll(-this.gameSpeed,0);
		this.bird.body.gravity.y = birdGravityValue; //鳥的重量
        
		this.readyText.destroy();
		this.playTip.destroy();
		game.input.onDown.add(this.fly, this);
		game.time.events.start();
	}

	this.stopGame = function(){
		this.bg.stopScroll();
		this.ground.stopScroll();
		this.pipeGroup.forEachExists(function(pipe){
			pipe.body.velocity.x = 0;
		}, this);
		this.bird.animations.stop('fly', 0);
		game.input.onDown.remove(this.fly,this);
		game.time.events.stop(true);
	}

	this.fly = function(){
		this.bird.body.velocity.y = -birdFly;
		game.add.tween(this.bird).to({angle:-30}, 100, null, true, 0, 0, false); //上升時頭朝上
		this.soundFly.play();
	}

	this.hitPipe = function(){
		if(this.gameIsOver) return;
        game.camera.flash(0xff0000, 300);//畫面閃紅
		this.soundHitPipe.play();
		this.gameOver();
	}
	this.hitGround = function(){
		if(this.hasHitGround) return; //已經撞擊過地面
        game.camera.flash(0xff0000, 300);//畫面閃紅
		this.hasHitGround = true;
        this.soundHitPipe.play();
		this.soundHitGround.play();
		this.gameOver(true);
	}
	this.gameOver = function(show_text){
		this.gameIsOver = true;
        this.soundBgm.stop();
		this.stopGame();
		if(show_text) this.showGameOverText();
	}

	this.showGameOverText = function(){
		this.scoreText.destroy();
		game.bestScore = game.bestScore || 0;
		if(this.score > game.bestScore) game.bestScore = this.score; //最好分數
		this.gameOverGroup = game.add.group(); //增加一個組
		var gameOverText = this.gameOverGroup.create(game.width/2,0,'game_over'); //game over 圖文字
		var scoreboard = this.gameOverGroup.create(game.width/2,100,'score_board'); //分數板
		var currentScoreText = game.add.bitmapText(game.width/2 + 35, 158, 'flappy_font', this.score+'', 20, this.gameOverGroup); //當前分數
		var bestScoreText = game.add.bitmapText(game.width/2 + 35, 218, 'flappy_font', game.bestScore+'', 20, this.gameOverGroup); //最好分數
		var replayBtn = game.add.button(game.width/2, 280, 'btn', function(){//重玩按鈕
			game.state.start('play');
		}, this, null, null, null, null, this.gameOverGroup);
		gameOverText.anchor.setTo(0.5, 0);
		scoreboard.anchor.setTo(0.5, 0);
		replayBtn.anchor.setTo(0.5, 0);
		this.gameOverGroup.y = 30;
        //傳值到資料庫
        if(phpsuccess){
            sendScore(this.score);
        }
	}

	this.generatePipes = function(gap){ //製造管道
		gap = gap || gapValue; //上下管道間的空隙
		var position = (450 - 300 - gap) + Math.floor((450 - 112 - 30 - gap - 450 + 300+ gap) * Math.random());
		var topPipeY = position-330;
		var bottomPipeY = position+gap;

		if(this.resetPipe(topPipeY,bottomPipeY)) return;

		var topPipe = game.add.sprite(game.width, topPipeY, 'pipe', 0, this.pipeGroup);
		var bottomPipe = game.add.sprite(game.width, bottomPipeY, 'pipe', 1, this.pipeGroup);
		this.pipeGroup.setAll('checkWorldBounds',true);
		this.pipeGroup.setAll('outOfBoundsKill',true);
		this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed);
	}

	this.resetPipe = function(topPipeY,bottomPipeY){//重置出了邊界的管道，做到回收利用
		var i = 0;
		this.pipeGroup.forEachDead(function(pipe){
			if(pipe.y<=0){ //topPipe
				pipe.reset(game.width, topPipeY);
				pipe.hasScored = false; //重置未得分
			}else{
				pipe.reset(game.width, bottomPipeY);
			}
			pipe.body.velocity.x = -this.gameSpeed;
			i++;
		}, this);
		return i == 2; //如果 i==2 代表有一组管道已經出了邊界，可以回收這組管道了
	}

	this.checkScore = function(pipe){
        
    //分數檢測及更新
    //pipe.hasScored用來標示該管子是否已經得分過
    //pipe.y<0一組管道上方那根，一組管道我們只需要偵測一個就行
    //當管道的x座標 加上管道的寬度小於鳥的的x坐標的時後，就表示已經飛過管道了，可以得分了
		if(!pipe.hasScored && pipe.y<=0 && pipe.x<=this.bird.x-26-54){
			pipe.hasScored = true;
			this.scoreText.text = ++this.score;
			this.soundScore.play();
			return true;
		}
		return false;
	}
}

//新增state
game.state.add('boot',game.States.boot);
game.state.add('preload',game.States.preload);
game.state.add('menu',game.States.menu);
game.state.add('play',game.States.play);
game.state.start('boot'); //開始遊戲

