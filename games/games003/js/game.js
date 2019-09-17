//音樂音效資源來自 小森平 http://taira-komori.jpn.org/freesoundtw.html 魔王魂 https://maoudamashii.jokersounds.com/

var time = 30;
var goal1 = 10;
var goal2 = 20;
var goal3 = 30;
var lifeValue = 3;
var LIFE = 3;//生命常數 別拿去做動態的邏輯運算 我用來重置生命值的 因為要用ajax抓外部資料賦值 所以不用const來宣告
var levelValue = 10;
/********************以上是調用外部資料的全域變數*************************/
var level = 1;
var scoreValue = 0;
var phpSuccess = false;
var btn = document.querySelector('button');
var sec = document.getElementById('sec');
var uls = document.querySelector('ul');
var li_1 = document.getElementsByClassName('list1')[0];
var left = document.getElementsByClassName('left')[0];
var right = document.getElementsByClassName('right')[0];
var container = document.getElementsByClassName('photoHunt_container')[0];
var score = document.getElementById('score');
var life = document.getElementById('life');
// var turnOff=document.getElementById('turnOff');//模式按鈕
var back = document.getElementById('back');
/***************************音樂音效**********************************/
var bgm = document.getElementById("bgm");
var goodSFX = document.getElementById("good");
var badSFX = document.getElementById("bad");
var enterSFX = document.getElementById("enter");
var winSFX = document.getElementById("win");
var loseSFX = document.getElementById("lose");
/******************************按鍵開關*******************************/
left.style.display = 'none';
right.style.display = 'none';
score.style.display = 'none';

 /***********************ajax調用database.php連線取得資料庫設定數值***********************/
 $(function () {
	$.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}, //權限TOKEN
		url: '/game/data', //取得遊戲參數的位址
		data: {
			game: 'games003'
		}, //送出 game 參數(值為遊戲識別名稱)
		type: 'POST', //使用 POST 傳送
		success: function (data) //傳送成功的 function
		{
			// 回應的資料格式為 json，所以 data 變數是個 Object
			console.log("遊戲時間：" + parseInt(data.time));
			console.log("目標分數I：" + parseInt(data.goal1));
			console.log("目標分數II：" + parseInt(data.goal2));
			console.log("目標分數III：" + parseInt(data.goal3));
			console.log("每回生命：" + parseInt(data.lifeValue));
			console.log("關卡等級上限：" + parseInt(data.levelValue));
			/************************能從外部變更的變數****************************/
			// 1.遊戲時間 time
			// 2.目標分數1 goal1
			// 3.目標分數2 goal2
			// 4.目標分數3 goal3
			// 5.每回生命 LIFE
			// 6.關卡等級上限
			time = parseInt(data.time);
			sec.innerHTML = time;//打印進HTML
			goal1 = parseInt(data.goal1);
			goal2 = parseInt(data.goal2);
			goal3 = parseInt(data.goal3);
			lifeValue = parseInt(data.lifeValue);//可拿去做動態運算的生命值
			LIFE = parseInt(data.lifeValue);//生命常數
			life.innerHTML = LIFE;//打印進HTML
			levelValue = parseInt(data.levelValue) - 1;
			phpSuccess = true;
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
				game: 'games003',
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

//將生命值重置
function resetLive() {
	lifeValue = LIFE;
}

/*******************************按鈕事件*************************************/

//開始遊戲按鈕
btn.onclick = function () {

	//按鈕音效及背景音樂撥放
	enterSFX.play();
	enterSFX.currentTime = 0;
	bgm.play();

	// 1.計時器
	var timer = setInterval(function () {
		time -= 0.01;
		time = time.toFixed(2);
		sec.innerHTML = time;
		//死亡
		if (lifeValue === 0) {
			life.innerHTML = lifeValue;//神奇bug斷點測試有動作，正常操作卻無	
			clearInterval(timer);
			sec.innerHTML = time;//神奇bug斷點測試有動作，正常操作卻無
			bgm.pause();
			lose.play();
			loseSFX.currentTime = 0;
			// alert('犯錯太多次了……');
			back.style.display = 'block';
		}
		/**********************勝利目標判斷及計時器關閉**********************/
		if (time <= 0) {

			//呼叫傳送分數到資料庫方法
			if (phpSuccess) {
				sendScore(scoreValue);
			}

			life.innerHTML = lifeValue;//神奇bug斷點測試有動作，正常操作卻無	
			clearInterval(timer);
			phpSuccess = false;
			sec.innerHTML = time;//神奇bug斷點測試有動作，正常操作卻無							
			if (scoreValue < goal1) {
				bgm.pause();
				loseSFX.play();
				loseSFX.currentTime = 0;
				// alert('多吃胡蘿蔔可以照顧眼睛～');
			} else if (scoreValue >= goal3) {
				bgm.pause();
				winSFX.play();
				winSFX.currentTime = 0;
				// alert('你自帶心眼？');
			} else if (scoreValue >= goal2) {
				bgm.pause();
				winSFX.play();
				winSFX.currentTime = 0;
				// alert('你是不是常吃胡蘿蔔？');
			} else {
				bgm.pause();
				loseSFX.play();
				loseSFX.currentTime = 0;
				// alert('加油好嗎！？');
			}
			/*************************************************************/
			back.style.display = 'block';
		}
	}, 10)

	//2.點擊按鈕消失，第一個li消失
	btn.remove();
	li_1.remove();

	// turnOff.remove();//模式按鈕


	// 3.添加4個li>img
	app();

	/************************遊戲每回關卡佈局及主邏輯****************************/
	function app() {

		left.style.display = 'flex';
		right.style.display = 'flex';
		score.style.display = 'flex';
		container.style.backgroundImage = "url('../games003/img/background_1.png')";
		level += 1;

		//重置生命
		resetLive();
		life.innerHTML = lifeValue;
		for (var i = 0; i < level * level; i++) {
			var newLi = document.createElement('li');
			uls.appendChild(newLi);
			var newImg = document.createElement('img');
			newLi.appendChild(newImg);
			newLi.style.width = 100 / level + '%';
			newLi.style.float = 'left';
			newImg.style.display = 'block';
			newImg.style.width = 100 + '%';
			newImg.src = '../games003/img/' + rand(1, 3) + '.png';
			newLi.style.backgroundColor = 'rgb(' + rand(160, 255) + ',' + rand(160, 255) + ',' + rand(160, 255) + ')';
		}

		var x = rand(0, level * level - 1);//賦予一個隨機數給正確圖案放置
		var imgs1 = document.querySelectorAll('img');
		imgs1[x].src = '../games003/img/A.png';	// 隨機一張圖片變成正確圖案						
		var li = document.querySelectorAll('li');
		$("li").click(function () {
			// //生命值變化特效
			// if(lifeValue-LIFE!=0){
			// 	$(".right").animate({
			//     backgroundColor: "#ffe5e5",
			//     duration: 10
			//   }).animate({
			//     backgroundColor: "#ce9c9c",
			//     duration: 10
			//   });
			// }

			lifeValue -= 1;
			life.innerHTML = lifeValue;




			badSFX.play();
			badSFX.currentTime = 0;

		});

		li[x].onclick = function () {
			/*********************play();接pause();不報錯方法*******************/
			//因為我無法各自獨立取得除了li[x]外的li，因此我用li[x].onclick是覆蓋掉$("li").click的做法，所以音效和特效也會有這即時性問題，
			//扣生命值也是，所以我只能用每回生命值重置的方法
			var playPromise = badSFX.play();
			if (playPromise !== undefined) {
				playPromise.then(_ => {
					badSFX.pause();
					badSFX.currentTime = 0;
				}).catch(error => {
					//文件網址
					console.log("https://developers.google.com/web/updates/2017/06/play-request-was-interrupted");
				});
			}
			/****************************************************************/
			goodSFX.play();
			goodSFX.currentTime = 0;

			for (var i = 0; i < level * level; i++) {
				li[i].remove(this);

			}

			scoreValue += 1;
			$("#score").animate({
				backgroundColor: "#ffe5e5",
				duration: 10
			}).animate({
				backgroundColor: "#ce9c9c",
				duration: 10
			});
			score.innerHTML = scoreValue;
			if (level > levelValue) {
				level = levelValue;
			}

			app();
		}

	}
	/*********************************************************************************/
}
// 隨機函數
function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
