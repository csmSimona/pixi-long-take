<template>
  <div></div>
</template>

<script setup>
// 导入pixi.js
import * as PIXI from "pixi.js";
import AllowTouch from "phy-touch";
import gsap from "gsap";

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  resolution: window.devicePixelRatio || 1,
  antialias: true, // 抗锯齿
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);
// 创建容器
const container = new PIXI.Container();
// 将容器添加到舞台
app.stage.addChild(container);

//总时间轴
// let allTimeline = new TimelineMax({ paused: true });
let allTimeline = gsap.timeline({ paused: true });

// 创建一个纹理
const texture = PIXI.Texture.from(require("./assets/images/p1-p1.png"));
// 创建一个精灵
const sprite = new PIXI.Sprite(texture);

sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
// 设置精灵锚点
sprite.anchor.set(0.5);
// 设置精灵缩放
sprite.scale.set(0.5);
sprite.alpha = 0;
container.addChild(sprite);

// loading动画
let loadingTextures = [];
for (let i2 = 1; i2 <= 52; i2++) {
  loadingTextures.push(
    PIXI.Texture.from(require("./assets/images/x" + i2 + ".png"))
  );
}
// const loadingAnimation = new PIXI.AnimatedSprite(loadingTextures); // 动画精灵
// loadingAnimation.position.set(0, 0);
// loadingAnimation.animationSpeed = 0.8;
// loadingAnimation.play();
// container.addChild(loadingAnimation);

// allowTouch
// let maxLong = -(10800 - 750);
let moveMin = -2000;
const allowTouch = new AllowTouch({
  touch: "body", // 反馈触摸的dom
  vertical: true, // 不必需，默认是true代表监听竖直方向touch
  maxSpeed: 0.8, // 不必需，触摸反馈的最大速度限制
  max: 0, // 不必需,滚动属性的最大值
  min: moveMin, // 不必需,运动属性的最小值
  bindSelf: false,
  value: 0,
  change: function (value) {
    // console.log("value", value);
    let progress = value / moveMin;
    // console.log("progress", progress);
    allTimeline.seek(progress);
    animationPlay(progress);
  },
});

// let spr2 = new PIXI.Sprite.fromImage(imgArr[0]);
// spr2.position.set(375, 724);
// spr2.anchor.set(0.5, 0.5);
// spr2.alpha = 0;
// app.stage.addChild(spr2);

// 创建一个精灵
const spr2 = new PIXI.Sprite(loadingTextures[0]);
spr2.x = app.screen.width / 2;
spr2.y = app.screen.height / 2;
spr2.anchor.set(0.5, 0.5);
spr2.alpha = 0;
container.addChild(spr2);

// TweenMax
// let timeline1 = new TimelineMax({ delay: 0.3 });
// let tweenMax1 = new TweenMax(sprite, 0.1, { alpha: 1 });
// timeline1.add(tweenMax1, 0);
// allTimeline.add(timeline1, 0);
// allTimeline.to(sprite, {
//   delay: 0.3,
//   duration: 0.1,
//   alpha: 1,
// });

allTimeline.to(spr2, {
  delay: 0.5,
  duration: 0.1,
  alpha: 1,
});

function animationPlay(progress) {
  if (progress >= 0.6) {
    let imgArrNum = loadingTextures.length;
    let index = Math.floor(((progress - 0.6) / 0.3) * imgArrNum);
    if (index < imgArrNum) {
      spr2.texture = loadingTextures[index];
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
