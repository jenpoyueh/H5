// 遊戲畫布
var game= new Phaser.Game(300, 300, Phaser.CANVAS, "game");
// 透明背景
game.transparent = true;
// 遊戲階段
game.State={};	
// 輪盤
var wheel;
// 輪盤啟動條件
var canSpin;
// 輪盤上獎項有幾種
var slices = 8;
// 獎項角度
var degrees;
// 得到獎項
var getPrize ={};
// 圖片比例
var spriteScale = 3/8;
 
/**************************** ajax調用send.php再傳入資料庫方法 **********************/ 
 
     function sendScore(Signal){
 
         $(function () {
             $.ajax({
                 url: '../wheel/php/send.php',//連接的URL
                 method:'POST',
                      data:{
                         signal:Signal     
                      }, //夾帶的參數 //資料格式
 
                 success: function () {    
                     console.log("分數傳值成功："+Signal);
                 }
             });
         }); 
     }
 
 /*********************************************************************************/

// 預載遊戲資材
game.State.load={
     preload:function(){
          // 關閉兌獎紀錄連結
          $('#btn').hide();
          // 行動平台螢幕適應
          if(!game.device.desktop){
               this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
               this.scale.forcePortrait = false;
               this.scale.refresh();
          }
          // 資材導入
          game.load.image("wheel", "../wheel/assets/wheel.png");
          game.load.image("wheelFrame", "../wheel/assets/wheelFrame.png");
          game.load.image("pin", "../wheel/assets/pin.png");
          game.load.image("getPrizeA1", "../wheel/assets/A1.png");
          game.load.image("getPrizeA2", "../wheel/assets/A2.png");
          game.load.image("getPrizeB1", "../wheel/assets/B1.png");
          game.load.image("getPrizeB2", "../wheel/assets/B2.png");
          game.load.image("getPrizeC", "../wheel/assets/C.png");
          game.load.image("getPrizeD", "../wheel/assets/D.png");
          game.load.image("getPrizeE1", "../wheel/assets/E1.png");
          game.load.image("getPrizeE2", "../wheel/assets/E2.png");
          game.load.image("getPrizeF", "../wheel/assets/F.png");
          game.load.image("getPrizeG1", "../wheel/assets/G1.png");
          game.load.image("getPrizeG2", "../wheel/assets/G2.png");
          game.load.image("getPrizeG3", "../wheel/assets/G3.png");
          game.load.image("getPrizeH", "../wheel/assets/H.png");
          game.load.image("check", "../wheel/assets/check.png");
          game.load.spritesheet("yes", "../wheel/assets/yes.png", 160, 75, 2);
          game.load.spritesheet("return", "../wheel/assets/return.png", 160, 75, 2);
          game.load.audio("bgm", "../wheel/assets/BGM.mp3");
          game.load.audio("prize", "../wheel/assets/prize.mp3");
     },
     create:function(){
         game.state.start('start');
     }
}
// 輪盤開始介面
game.State.start={
     create: function(){
          // 輪盤
          wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
          wheel.scale.setTo(spriteScale); 
          wheel.anchor.set(0.5);
          // 輪盤框
          wheelFrame = game.add.sprite(game.width / 2, game.width / 2, "wheelFrame");
          wheelFrame.scale.setTo(spriteScale); 
          wheelFrame.anchor.set(0.5);
          // 指針
          var pin = game.add.button(game.width / 2, game.width / 2-10, "pin",this.check,this);
          pin.scale.setTo(spriteScale); 
          pin.anchor.set(0.5);
          // 收到任何輸入訊號就呼叫 spin 方法 
          game.bgm = game.add.audio("bgm", 0.5, false);
          game.se = game.add.audio("prize", 0.5, false); 	
     },
     check: function(){
          game.state.start('check');
     }
}
// 確認視窗
game.State.check={
     create: function(){
          // 輪盤
          wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
          wheel.scale.setTo(spriteScale);
          wheel.anchor.set(0.5);
          // 輪盤框
          wheelFrame = game.add.sprite(game.width / 2, game.width / 2, "wheelFrame");
          wheelFrame.scale.setTo(spriteScale);
          wheelFrame.anchor.set(0.5);
          // 指針
          var pin = game.add.sprite(game.width / 2, game.width / 2 - 10, "pin");
          pin.scale.setTo(spriteScale);
          pin.anchor.set(0.5);
          // 確認訊息
          var msg = game.add.sprite(game.width / 2, game.width / 2, "check");
          msg.scale.setTo(spriteScale); 
          msg.anchor.set(0.5);
          // 確定
          var yesBtn = game.add.button(game.width / 2-40, game.width / 2+20, "yes",this.yes,this,1,0,0);
          yesBtn.scale.setTo(spriteScale); 
          yesBtn.anchor.set(0.5);
          // 返回
          var returnBtn = game.add.button(game.width / 2+40, game.width / 2+20, "return",this.return,this,1,0,0);
          returnBtn.scale.setTo(spriteScale); 
          returnBtn.anchor.set(0.5);
     },
     yes: function(){
          // 可以選轉輪盤
          canSpin = true;
          game.state.start('play');
     },
     return: function(){
          game.state.start('start');
     }
}
// 開始轉盤
game.State.play={
     create: function(){
          // 輪盤
          wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
          wheel.scale.setTo(spriteScale); 
          wheel.anchor.set(0.5);
          // 輪盤框
          wheelFrame = game.add.sprite(game.width / 2, game.width / 2, "wheelFrame");
          wheelFrame.scale.setTo(spriteScale); 
          wheelFrame.anchor.set(0.5);
          // 指針
          var pin = game.add.sprite(game.width / 2, game.width / 2-10, "pin");
          pin.scale.setTo(spriteScale); 
          pin.anchor.set(0.5);
          // 判斷選轉與否
          if (canSpin) {
               // 傳值
               var wheelSignal = 666;
               sendScore(wheelSignal);
               // 播放背景音樂
               game.bgm.play();
               /********** ajax調用database.php連線取得資料庫設定數值 **********/
               $(function () {
                    $.ajax({
                         url: '../wheel/php/database.php',//連接的URL
                         data: "{}",//夾帶的參數
                         dataType: 'json', //資料格式
                         success: function (data) //傳送成功的function
                         {
                              // 撈得獎種類與細項     
                              getPrize.prizeId = data[0]['prizeId'];
                              getPrize.img = data[0]['picture'];

                              // 判斷各獎項對應圖片角度
                              if (getPrize.prizeId == 'A') {
                                   degrees = game.rnd.between(260, 280);
                              }
                              if (getPrize.prizeId == 'B') {
                                   degrees = game.rnd.between(340, 360);
                              }
                              if (getPrize.prizeId == 'C') {
                                   degrees = game.rnd.between(70, 90);
                              }
                              if (getPrize.prizeId == 'D') {
                                   degrees = game.rnd.between(200, 210);
                              }
                              if (getPrize.prizeId == 'E') {
                                   degrees = game.rnd.between(160, 180);
                              }
                              if (getPrize.prizeId == 'F') {
                                   degrees = game.rnd.between(120, 140);
                              }
                              if (getPrize.prizeId == 'G') {
                                   degrees = game.rnd.between(30, 50);
                              }
                              if (getPrize.prizeId == 'H') {
                                   degrees = game.rnd.between(300, 320);
                              }

                              // console.log(getPrize.prizeId);
                              // console.log(getPrize.img);
                              // console.log(degrees);
                         }
                    });
               });

               /**************************************************************/

               // 轉圈次數
               var rounds = 4;
               // 關閉可選轉輪盤資格
               canSpin = false;
               // 前置選轉輪盤動畫
               var spinTween = game.add.tween(wheel).to({
                    angle: 360 * rounds
               }, 3000, Phaser.Easing.Linear.In, true);
               // 完成前置選轉次數後呼叫 end 方法
               spinTween.onComplete.add(this.end, this);
          }
     },
     end: function(){
          // 輪盤指針定位
          var spinTween = game.add.tween(wheel).to({
               angle: degrees
          }, degrees / 360 * 2000, Phaser.Easing.Cubic.Out, true);

          spinTween.onComplete.add(this.winPrize, this);
     },
     winPrize: function(){
          
          // 先延遲1秒再顯示獎項圖片
          var timer = setTimeout(function () {
               // 判斷獎項圖片
               if (getPrize.img == 'A1') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeA1');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'A2') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeA2');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'B1') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeB1');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'B2') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeB2');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'C') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeC');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'D') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeD');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();

               }
               if (getPrize.img == 'E1') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeE1');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'E2') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeE2');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'F') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeF');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'G1') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeG1');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'G2') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeG2');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'G3') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeG3');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
               if (getPrize.img == 'H') {
                    var pp = game.add.image(game.width / 2, game.height / 2, 'getPrizeH');
                    pp.scale.setTo(spriteScale);
                    pp.anchor.set(0.5);
                    game.se.play();
               }
           }, 1000); 
          // 開啟兌獎紀錄連結
          var hrefBtn = setTimeout(function () {
               $('#btn').show();
          }, 1200);
          // 關閉可選轉輪盤資格 
          canSpin = false;
     }
}

/*************** 加入state ******************/

game.state.add('load',game.State.load);
game.state.add('start',game.State.start);
game.state.add('check',game.State.check);
game.state.add('play',game.State.play);
game.state.start('load');

/*******************************************/