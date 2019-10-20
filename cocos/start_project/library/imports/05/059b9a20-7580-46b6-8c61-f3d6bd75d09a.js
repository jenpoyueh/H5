"use strict";
cc._RF.push(module, '059b9ogdYBGtoxh89a9ddCa', 'player');
// script/player.js

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
        // 角色跳躍高度
        jumpHeight: 0,
        // 角色跳躍持續時間
        jumpDuration: 0,
        // 最大移動速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        // 跳躍音效
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 初始化跳躍動作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        // 左右加速度開關
        this.accelLeft = false;
        this.accelRight = false;
        // 角色當前水平移動速度
        this.xSpeed = 0;
        // 初始化鍵盤監聽事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy: function onDestroy() {
        // 取消鍵盤監聽事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start: function start() {},
    update: function update(dt) {
        // console.log(this.accelLeft,this.accelRight);
        // 依照當今加速度方向更新水平移動數值
        if (this.accelLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accelRight) {
            this.xSpeed += this.accel * dt;
        }
        // console.log(this.xSpeed);
        // 限制水平移動最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        // 更新角色位置
        this.node.x += this.xSpeed * dt;
    },
    setJumpAction: function setJumpAction() {
        // 跳躍上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCircleActionOut());
        // 降落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCircleActionIn());
        // 增添一個回調函數，用於動作結束後使用這個方法
        var callback = cc.callFunc(this.playJumpSound, this);
        console.log(this.playJumpSound);
        // 不斷重複
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },
    playJumpSound: function playJumpSound() {
        // 調用聲音引擎撥放聲音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accelLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accelRight = true;
                break;
        }
    },

    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accelLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accelRight = false;
                break;
        }
    }
});

cc._RF.pop();