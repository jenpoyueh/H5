"use strict";
cc._RF.push(module, '056a2QUCUZNC4xJ5ufeS6a6', 'game');
// script/game.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星生成後消失的時間隨機範圍
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面節點，用來確認星星產生高度
        ground: {
            default: null,
            type: cc.Node
        },
        // 玩家節點，用來獲取玩家彈跳高度，及控制玩家各種行為
        player: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 獲取地板Y座標
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化計時器
        this.timer = 0;
        this.starDuration = 0;
        // 隨機生成星星
        this.spawnNewStar();
        // 初始化計分
        this.score = 0;
    },
    start: function start() {},
    update: function update(dt) {
        // 每幀更新計時器，超過限度還沒生成星星
        // 就會調用遊戲失敗邏輯
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    spawnNewStar: function spawnNewStar() {
        // 使用給定的prefab在場景中新增node
        var newStar = cc.instantiate(this.starPrefab);
        // 將新增的節點放入canvas中
        this.node.addChild(newStar);
        // 為星星設置一個隨機的位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星組件上暫存Game對象的引用
        newStar.getComponent('star').gameScript = this;
        // 重製計時器，根據消失時間範圍隨機取一個值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        // 根據地面位置和玩家跳躍高度，隨機得到一個星星的y座標
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight + 50;
        // 根據螢幕寬度，隨機獲取星星的x座標
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星座標
        return cc.v2(randX, randY);
    },
    gainScore: function gainScore() {
        this.score += 1;
        // 更新 scoreDosplay Label 文字
        this.scoreDisplay.string = 'Score: ' + this.score;
    },
    gameOver: function gameOver() {
        this.player.stopAllActions(); // 停止player節點所有動作
        cc.director.loadScene('game'); // 重讀 game scene
    }
});

cc._RF.pop();