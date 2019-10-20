"use strict";
cc._RF.push(module, 'f7de3JD//VItJyESfVlZzcq', 'star');
// script/star.js

"use strict";

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

        // 角色與星星距離小於此數，星星將會被收集
        pickRadius: 0

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        // 每幀判斷角色與星星距離是否小於收集距離
        if (this.getPlayerDistance() < this.pickRadius) {
            // 調用收集方法
            this.onPicked();
            return;
        }
        // 根據腳本中的計時器更新星星的透明度
        var opacityRatio = 1 - this.gameScript.timer / this.gameScript.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        // console.log(this.node.opacity);
    },
    getPlayerDistance: function getPlayerDistance() {
        // 根據player節點位置判斷距離
        var playerPos = this.gameScript.player.getPosition();
        // 根據兩點位置計算兩點之間距離
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },
    onPicked: function onPicked() {
        // 當星星被收集時，調用game腳本中的接口，生成一個星的星星
        this.gameScript.spawnNewStar();
        //調用game腳本中的得分文字
        this.gameScript.gainScore();
        // 然後銷毀當前星星節點
        this.node.destroy();
    }
});

cc._RF.pop();