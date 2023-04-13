<template>
  <div>
    <div class="loading" v-if="showLoading" @touchstart="start">
      <div class="loadingProgress" v-if="showProgress">{{ curProgress }}</div>
      <div class="tip" v-if="!showProgress">向左滑动屏幕，观看你我的故事</div>
    </div>
    <div
      id="musicIcon"
      :class="audioFlag ? 'mplay' : 'mpause'"
      @click="musicAction"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as PIXI from "pixi.js";
import PhyTouch from "phy-touch";
import gsap from "gsap";
import { sound } from "@pixi/sound";
import {
  p1Arr,
  p2Arr,
  p2Arr2,
  p3Arr,
  p4Arr,
  p5Arr,
  spriteGroupBgArr,
  sence1Arr,
  sence2Arr,
  sence3Arr,
  sence4Arr,
  spriteGroupLastArr,
} from "./data.js";

const showLoading = ref(true); // 是否展示加载页
const showProgress = ref(true); // 是否展示进度条
const curProgress = ref(); // 加载进度
const audioFlag = ref(false); // 是否播放背景音乐

function start() {
  showLoading.value = false;
}

const maxLong = -(10800 - 750); // 画布长度

// 创建应用
const app = new PIXI.Application({
  width: 750,
  height: 1448,
  resolution: window.devicePixelRatio || 1,
  antialias: true, // 抗锯齿
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);

// 总时间轴
const allTimeline = gsap.timeline({ paused: true });

/*************************** 加载素材 ****************************/

// 添加声音资源
sound.add("bgm", require("./assets/mp3/bgm.mp3"));
sound.add("ding", require("./assets/mp3/ding.mp3"));
sound.add("huanhu", require("./assets/mp3/huanhu.mp3"));

// 添加图片资源
const keyArr = [];
[...p1Arr, ...p2Arr, ...p2Arr2, ...p3Arr, ...p4Arr, ...p5Arr].forEach(
  (item) => {
    const key = item.split(".")[0];
    PIXI.Assets.add(key, require("./assets/images/" + item));
    keyArr.push(key);
  }
);

// 异步加载资源
const texturesPromise = PIXI.Assets.load(keyArr, (progress) => {
  curProgress.value = Math.round(progress * 100) + "%";
});

// 加载完成后创建精灵
texturesPromise.then((textures) => {
  // 资源加载完毕
  showProgress.value = false;

  // 创建精灵组
  // 背景
  const spriteGroupBg = new PIXI.Container();
  spriteGroupBg.position.set(0, 0);
  spriteGroupBg.name = "spriteGroupBg";
  app.stage.addChild(spriteGroupBg); // 添加到舞台中

  // 场景组
  const spriteGroupSences = new PIXI.Container();
  spriteGroupSences.position.set(0, 0);
  spriteGroupSences.name = "spriteGroupSences";
  spriteGroupSences.sortableChildren = true;
  app.stage.addChild(spriteGroupSences);
  // 场景一
  const sence1 = new PIXI.Container();
  sence1.position.set(1784, 621);
  sence1.pivot.set(1784, 621);
  sence1.name = "sence1";
  // 场景二
  const sence2 = new PIXI.Container();
  sence2.position.set(1773, 0);
  sence2.name = "sence2";
  sence2.alpha = 0;
  sence2.zIndex = 33;
  // 场景三
  const sence3 = new PIXI.Container();
  sence3.position.set(4960, 0);
  sence3.name = "sence3";
  sence3.zIndex = 22;
  // 场景四
  const sence4 = new PIXI.Container();
  sence4.position.set(7902, 0);
  sence4.name = "sence4";

  spriteGroupSences.addChild(sence1);
  spriteGroupSences.addChild(sence2);
  spriteGroupSences.addChild(sence3);
  spriteGroupSences.addChild(sence4);
  // 场景五
  const spriteGroupLast = new PIXI.Container();
  spriteGroupLast.position.set(-203, 0);
  spriteGroupLast.name = "spriteGroupLast";
  app.stage.addChild(spriteGroupLast);

  const spritesArr = [
    ...spriteGroupBgArr,
    ...sence1Arr,
    ...sence2Arr,
    ...sence3Arr,
    ...sence4Arr,
    ...spriteGroupLastArr,
  ];
  spritesArr.forEach((temp) => {
    addSprToGroup(
      textures[temp.img.split(".")[0]],
      temp.x,
      temp.y,
      temp.alpah,
      temp.sprName,
      temp.sprGroup
    );
  });

  // 时间轴动画
  tweenAction();
});

// 创建精灵，将精灵添加到对应的精灵组
function addSprToGroup(img, x, y, alpah, sprName, sprGroup) {
  const spr = new PIXI.Sprite(img);

  spr.position.set(x, y);
  spr.alpha = alpah;
  spr.name = sprName;

  const sprArr = sprGroup.split("/");
  let sprites = app.stage.getChildByName(sprArr[0]);
  const sprArrNum = sprArr.length;

  if (sprArrNum > 1) {
    for (let i = 1; i < sprArrNum; i++) {
      const midName = sprArr[i];
      sprites = sprites.getChildByName(midName);
    }
  }
  sprites.addChild(spr);
}

/*************************** 识别滑动 ****************************/
// 监听滑动进度
const phyTouch = new PhyTouch({
  touch: "body", // 反馈触摸的dom
  vertical: false, // 不必需，默认是true代表监听竖直方向touch
  maxSpeed: 0.8, // 不必需，触摸反馈的最大速度限制
  max: 0, // 不必需,滚动属性的最大值
  min: maxLong, // 不必需,运动属性的最小值
  bindSelf: false,
  value: 0,
  change: function (value) {
    if (value <= 0 && value > maxLong) {
      const progress = value / maxLong;
      // 滑到某个位置后跳到另外一个位置
      if (progress > -370 / maxLong && progress < -380 / maxLong) {
        phyTouch.to(-1050, -370 / maxLong, "cubic - bezier(0.1, 0.57, 0.1, 1)");
      } else {
        // 总时间轴使用seek方法，监听整体舞台精灵的进度，播放对应的序列帧动画
        allTimeline.seek(progress);
        // 监听进度播放对应的序列帧动画
        animationPlay(progress);
        // 监听进度播放对应的音频
        audioAction(progress);
      }
    }
  },
});

/*************************** 时间轴动画 ****************************/
function tweenAction() {
  // 场景画面移动
  const sences = app.stage.getChildByName("spriteGroupSences");
  allTimeline.to(sences, {
    duration: 1,
    x: maxLong,
  });

  // 星星显现 spriteGroupSences/sence1/p1Star
  const star = app.stage
    .getChildByName("spriteGroupSences")
    .getChildByName("sence1")
    .getChildByName("p1Star");
  const starStartTime = -15 / maxLong; // 动画开始时的滚动距离 / 可滚动总长度
  const starDuringTime = -25 / maxLong; // (动画结束时的滚动距离 - 动画开始时的滚动距离) / 可滚动总长度
  const starTimeline = gsap.timeline({ delay: starStartTime });
  starTimeline.to(star, {
    duration: starDuringTime,
    alpha: 1,
  });
  allTimeline.add(starTimeline, 0);

  // 房子放大、消失 spriteGroupSences/sence1    spriteGroupSences/sence2
  const house = app.stage
    .getChildByName("spriteGroupSences")
    .getChildByName("sence1");
  const houseStartTime = -600 / maxLong;
  const houseDuringTime = -200 / maxLong;
  const houseTimeline = gsap.timeline({ delay: houseStartTime });
  houseTimeline
    .to(
      house.scale,
      {
        duration: houseDuringTime,
        x: 3,
        y: 3,
      },
      0
    )
    .to(
      house,
      {
        duration: houseDuringTime,
        alpha: 0,
      },
      0
    );
  allTimeline.add(houseTimeline, 0);

  const sence2 = app.stage
    .getChildByName("spriteGroupSences")
    .getChildByName("sence2");
  const sence2StartTime = -680 / maxLong;
  const sence2DuringTime = -100 / maxLong;
  const sence2Timeline = gsap.timeline({ delay: sence2StartTime });
  sence2Timeline.to(sence2, {
    duration: sence2DuringTime,
    alpha: 1,
  });
  allTimeline.add(sence2Timeline, 0);

  // 黑夜缩小为窗户 spriteGroupSences/sence3/p32
  const chuanghu = app.stage
    .getChildByName("spriteGroupSences")
    .getChildByName("sence3")
    .getChildByName("p32");
  const chStartTime = -2130 / maxLong;
  const chDuringTime1 = -200 / maxLong;
  const chDuringTime = -800 / maxLong;
  const delayTime = -270 / maxLong;
  const chTimeline = gsap.timeline({ delay: chStartTime });
  chTimeline
    .from(chuanghu, {
      duration: chDuringTime1,
      alpha: 0,
    })
    .from(
      chuanghu.position,
      {
        duration: chDuringTime,
        x: -1100,
        y: -40,
      },
      delayTime
    )
    .from(
      chuanghu.scale,
      {
        duration: chDuringTime,
        x: 5,
        y: 5,
      },
      delayTime
    );
  allTimeline.add(chTimeline, 0);

  // 工作中的男孩 spriteGroupSences/sence3/p31
  const boyworking = app.stage
    .getChildByName("spriteGroupSences")
    .getChildByName("sence3")
    .getChildByName("p31");
  const bwStartTime = -2600 / maxLong;
  const bwDuringTime = -400 / maxLong;
  const bwTimeline = gsap.timeline({ delay: bwStartTime });
  bwTimeline.to(boyworking, {
    duration: bwDuringTime,
    alpha: 1,
  });
  allTimeline.add(bwTimeline, 0);

  // 旋涡显示
  const xn = app.stage
    .getChildByName("spriteGroupLast")
    .getChildByName("bgLast");
  const xnStartTime = -6613 / maxLong;
  const xnDuringTime = -50 / maxLong;
  const xnTimeline = gsap.timeline({ delay: xnStartTime });
  xnTimeline.to(xn, {
    duration: xnDuringTime,
    alpha: 1,
  });
  allTimeline.add(xnTimeline, 0);
}

/*************************** 序列帧动画 ****************************/
function animationPlay(progress) {
  // 孩子蹒跚学走路 spriteGroupSences/sence2/p2Child
  // 图片数组 p2Arr2
  const childStepStartTime = -900 / maxLong;
  const childDuringTime = -1300 / maxLong;

  if (progress >= childStepStartTime) {
    const childNum = p2Arr2.length;
    const childIndex = Math.floor(
      ((progress - childStepStartTime) / childDuringTime) * childNum
    );
    if (childIndex < childNum && childIndex >= 0) {
      const child = app.stage
        .getChildByName("spriteGroupSences")
        .getChildByName("sence2")
        .getChildByName("p2Child");
      // 改变精灵的纹理
      child.texture = PIXI.Texture.from(
        require("./assets/images/" + p2Arr2[childIndex])
      );
    }
  }

  // 旋涡，并出现扣题文字 spriteGroupLast/bgLast
  // p5Arr
  const xunStartTime = -6613 / maxLong;
  const xunDuringTime = -1000 / maxLong;

  if (progress >= xunStartTime) {
    const xunNum = p5Arr.length;
    const xunIndex = Math.floor(
      ((progress - xunStartTime) / xunDuringTime) * xunNum
    );
    if (xunIndex < xunNum && xunIndex >= 0) {
      const sprite = app.stage
        .getChildByName("spriteGroupLast")
        .getChildByName("bgLast");
      sprite.texture = PIXI.Texture.from(
        require("./assets/images/" + p5Arr[xunIndex])
      );
    }
  }
}

/*************************** 播放声音 ****************************/
function audioAction(progress) {
  let timeDur = 20;
  // 星星的声音
  const auStarStartTime = -20 / maxLong;
  const auStarEndTime = -(20 + timeDur) / maxLong;
  if (progress > auStarStartTime && progress <= auStarEndTime) {
    sound.play("ding");
  }
  if (progress < auStarStartTime) {
    sound.pause("ding");
  }

  // 欢呼
  let auHuanhuStartTime = -2085 / maxLong;
  let auHuanhuEndTime = -(2085 + timeDur) / maxLong;
  if (progress >= auHuanhuStartTime && progress <= auHuanhuEndTime) {
    sound.play("huanhu");
  }
  if (progress < auHuanhuStartTime) {
    sound.pause("huanhu");
  }
}

function musicAction() {
  if (audioFlag.value) {
    sound.pause("bgm");
    audioFlag.value = false;
  } else {
    sound.play("bgm");
    audioFlag.value = true;
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
/* 横屏适配 */
@media screen and (orientation: landscape) {
  body {
    width: 100vh;
    height: 100vw;
    transform: rotate(-90deg);
    transform-origin: 50vh 50vh;
  }
}

#musicIcon {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 99;
  background-size: cover;
}
.mplay {
  background-image: url("./assets/images/musicon.png");
  animation: 1s rotate infinite linear;
}
.mpause {
  background-image: url("./assets/images/musicoff.png");
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  width: 100%;
  height: 100%;
  background-image: url("./assets/images/loadingBg.png");
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}
.loadingProgress {
  position: absolute;
  width: 100%;
  top: 40%;
  color: #fff;
  font-size: 2rem;
  text-align: center;
}

.tip {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 35%;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  writing-mode: vertical-lr;
  animation: 2s move infinite;
}

@keyframes move {
  0% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
  100% {
    transform: translate(-20px, 0);
    opacity: 1;
  }
}
</style>
