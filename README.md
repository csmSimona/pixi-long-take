## PixiJS实现一镜到底

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### 技术选型

1、PixiJS：绘图，加载舞台中的精灵

2、PhyTouch：实现滑动效果，监听屏幕滑动

3、GSAP：制作过渡动画、管理整个舞台的动画播放进度

4、插件@pixi/sound：播放声音



### Pixi

官网：https://www.pixijs.com

官方api文档：https://pixijs.download/release/docs/index.html

使用版本：v7



#### Application 应用

创建应用方法调用后会在页面上创建一个`canvas`元素，之后所有的内容，都会渲染在这个画布上

```js
// 创建一个pixi应用对象
let app = new PIXI.Application({width: 256, height: 256});
// 将这个应用对象元素添加到dom文档中
document.body.appendChild(app.view);
```



#### Texture 纹理

因为Pixi使用WebGL在GPU上渲染图像，图像需要转换为GPU可以处理的东西，这个东西被称为`texture（纹理）`。

`PIXI.Texture.from`： https://pixijs.download/release/docs/PIXI.Texture.html#from

```js
// 创建纹理
const texture = PIXI.Texture.from("images/btn.png");
// 利用这个纹理，创建精灵
const sprite = new PIXI.Sprite(texture);
```



#### Loader 加载器

功能：加载资源并将其转换为纹理

添加资源 `PIXI.Assets.add`：https://pixijs.download/release/docs/PIXI.Assets.html#add

加载资源 `PIXI.Assets.load`：https://pixijs.download/release/docs/PIXI.Assets.html#load

```js
// 添加资源 第一个参数为分配的别名,第二个参数则是图像路径
PIXI.Assets.add("jian", "./textures/jian.png");
PIXI.Assets.add("man", "./textures/man.png");
PIXI.Assets.add("mujian", "./textures/mujian.png");

// 异步加载资源
const texturesPromise = PIXI.Assets.load(
  ["jian", "man", "mujian"],
  (progress) => {
    // 监听加载进度
    console.log("加载完成:", progress);
  }
);

// 加载完成后创建精灵
texturesPromise.then((textures) => {
  // 创建容器
  const container = new PIXI.Container();
  // 使用纹理创建精灵
  const sprite = new PIXI.Sprite(textures.jian);
  // 将精灵放入容器（放入容器中的精灵会根据该容器定位）
  container.addChild(sprite);
  // 将容器放入舞台
  app.stage.addChild(container);
});
```



#### Sprite 精灵

Sprite精灵是可以放在容器里的交互式图像，能够控制它们的位置，大小，和许多其他有用的属性来产生交互和动画。

api：https://pixijs.download/release/docs/PIXI.Sprite.html

```js
// 位置
sprite.x = 100;
sprite.y = 100;
// 或
sprite.position.set(10, 10);

// 宽高大小
sprite.width = 150;
sprite.height = 120;

// 缩放比例
sprite.scale.x = 0.5;
sprite.scale.y = 0.5;
// 或
sprite.scale.set(0.5, 0.5);

// 中心点
sprite.pivot.x = 100;
sprite.pivot.y = 100;
// 或
sprite.pivot.set(100, 100);

// 透明度
sprite.alpha = 1;
```



#### 音频

github：https://github.com/pixijs/sound

api文档：https://pixijs.io/sound/docs/Sound.html

```shell
npm i @pixi/sound --save
```

基本使用

```js
import { sound } from '@pixi/sound';

// 添加音频
sound.add('my-sound', '@/assets/audios/bgm.mp3');
// 播放音频
sound.play('my-sound');
// 暂停音频
sound.pause('my-sound');
```





### PhyTouch

丝般顺滑的触摸运动方案

https://github.com/AlloyTeam/PhyTouch

```js
npm install phy-touch
```

使用

```javascript
import PhyTouch from "phy-touch";

const phyTouch = new PhyTouch({
  touch:"#wrapper",//反馈触摸的dom
  vertical: true,//不必需，默认是true代表监听竖直方向touch
  target: { y: 0 }, //运动的对象
  property: "y",  //被运动的属性
  min: 100, //不必需,运动属性的最小值
  max: 2000, //不必需,滚动属性的最大值
  sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
  factor: 1,//不必需,表示触摸位移运动位移与被运动属性映射关系，默认值是1
  moveFactor: 1,//不必需,表示touchmove位移与被运动属性映射关系，默认值是1
  step: 45,//用于校正到step的整数倍
  bindSelf: false,
  maxSpeed: 2, //不必需，触摸反馈的最大速度限制 
  value: 0,
  change:function(value){ 
    target.style.transform = "translate(0," + value + "px)"
    target.style.webkitTransform = "translate(0," + value + "px)"
  }, 
  touchStart:function(evt, value){  },
  touchMove:function(evt, value){  },
  touchEnd:function(evt,value){  },
  tap:function(evt, value){  },
  pressMove:function(evt, value){  },
  animationEnd:function(value){  } //运动结束
})
```



### GSAP

功能十分强大的动画平台，可以在任何框架上处理页面能够所有通过js改变的元素，不仅可以对div的css属性进行动画，还是SVG、React、Vue、WebGL，甚至和Threejs一起使用。

官方api文档  https://greensock.com/docs/v3

gsap官网：https://greensock.com/get-started/#tweening-basics

使用版本：v3

```shell
npm i gsap --save
```



#### 动画属性

- `gsap.to(targets, vars)` 从 **当前状态** 变化到 **vars 中定义的状态**

- `gsap.from(targets, vars)` 从 **vars 中定义的状态** 变化到 **当前状态**

- `gsap.fromTo(targets, fromVars, toVars)` 从 **fromVars 中定义的状态** 变化到 **toVars 中定义的状态**



`targets` 可以是:

- 一个普通对象
- 一个 DOM selector 字符串，比如 '.class'
- DOM 元素本身
- 以上三项中某一项的一个数组

`vars` 它可以包含：

- 动画对象的属性：比如dom元素的 x、y、opacity等
- gsap内部定义的特殊属性：duration（动画持续时间）、delay（动画开始前的延迟量）、ease、onStart等



基本使用

```javascript
import { gsap } from 'gsap';
// 按序执行
gsap.to(sprite1, { duration: 2, x: 300, })
  .from(sprite2.scale, { duration: 2, x: 2, y: 2 })
  .fromTo(sprite3, { duration: 2, x: 100, }, { duration: 2, x: 300, })
```



#### 时间轴 timeline

当我们有一个动画序列要一个一个动画执行的时候，我们一般会用 `delay` 来控制动画的延迟，让动画在合适的时间进行播放。这样做的话会比较麻烦，动画时间有修改的话，所有的 `delay` 时间都需要做调整。因此，gsap 提供了 `Timeline` 的功能，也就是时间轴，它可以方便的控制多个动画的播放。



时间轴也有类似的 `to` 、`from`、`fromTo` 这些方法，可以便捷的将动画添加到时间轴上。

```javascript
const tl = gsap.timeline();

tl.to(sprite1, { duration: 2, x: 300, })
  .from(sprite2.scale, { duration: 2, x: 2, y: 2 })
  .fromTo(sprite3, { duration: 2, x: 100, }, { duration: 2, x: 300, })
```

gsap 在时间轴的 `to`、`from` 等方法添加了第3个参数 `position`。

- position 为一个绝对数值

  `tl.to(target, vars, 1);`   时间轴开始执行 1s 后，开始执行该动画

- position 为一个绝对数值

  `tl.to(target, vars, '-=1')`  在上一个动画结束前(-=)或后(+=) 1s 开始执行

还有以下方法等：

- `tl.play();`   开始播放

- `tl.pause();`   暂停播放

- `tl.reverse();`   反转播放

- `tl.seek(1);`   跳转到1s进度处开始播放

- `tl.timeScale(3);`    动画变为三倍速

  

### 流程总结

#### 1、创建Pixi应用

```javascript
// 创建应用
const app = new PIXI.Application({
  width: 750,
  height: 1448,
  resolution: window.devicePixelRatio || 1,	// 分辨率
  antialias: true, // 抗锯齿
});
// 将应用画布添加到DOM中
document.body.appendChild(app.view);
```

#### 2、添加资源、加载资源

```javascript
// 添加声音资源
sound.add("bg", require("./assets/mp3/bg.mp3"));
sound.add("ding", require("./assets/mp3/ding.mp3"));
sound.add("huanhu", require("./assets/mp3/huanhu.mp3"));

// 添加图片资源
const keyArr = [];
arr.forEach(
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
```

#### 3、资源加载完成后创建精灵

```javascript
// 加载完成后创建精灵
texturesPromise.then((textures) => {
  // 资源加载完毕 隐藏进度值文本
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
  app.stage.addChild(spriteGroupSences);
  // 场景一
  const sence1 = new PIXI.Container();
  sence1.position.set(1784, 621);
  sence1.pivot.set(1784, 621);
  sence1.name = "sence1";
  // ...
  spriteGroupSences.addChild(sence1);
  // ...

  // 精灵配置内容数组
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
```



#### 4、gsap.timeline 创建总时间轴

```javascript
// 总时间轴
const allTimeline = gsap.timeline({ paused: true });
```



#### 5、AlloyTouch监听滚动事件

```javascript
import PhyTouch from "phy-touch";

// 场景总体的长度大小 - 自身宽度
let maxLong = -(10800 - 750);
const phyTouch = new PhyTouch({
  touch: "body", // 反馈触摸的dom
  vertical: false, // 不必需，默认是true代表监听竖直方向touch
  maxSpeed: 0.8, // 不必需，触摸反馈的最大速度限制
  max: 0, // 不必需,滚动属性的最大值
  min: maxLong, // 不必需,运动属性的最小值
  bindSelf: false,
  value: 0,	// 初始值
  // 滑动监听
  change: function (value) {
    if (value <= 0 && value > maxLong) {
      const progress = value / maxLong;
      // 总时间轴使用seek方法，监听整体舞台精灵的进度，播放对应的序列帧动画
      allTimeline.seek(progress);
      // 监听进度播放对应的序列帧动画
      animationPlay(progress);
      // 监听进度播放对应的音频
      audioAction(progress);
    }
  },
});
```



#### 6、创建分时间轴 delay，创建过渡动画，序列帧动画

##### 过渡动画

动画开始的时间设置为delay：动画开始时的滚动距离 / 可滚动总长度

动画持续的时间设置为duration：(动画结束时的滚动距离 - 动画开始时的滚动距离) / 可滚动总长度 

如果duration=0.1则表示过渡时长占滚动总长的10%，即占时间轴的10%。

```javascript
function tweenAction() {
  // ...
  
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
  
  // ...
}

```

##### 序列帧动画

```javascript
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
  // ...
}
```



##### 音频播放

```js
function audioAction(progress) {
  let timeDur = 20;
  // 星星的声音
  const auStarStartTime = -20 / maxLong;
  const auStarEndTime = -(40 + timeDur) / maxLong;
  if (progress > auStarStartTime && progress <= auStarEndTime) {
    sound.play("ding");
  }
  if (progress < auStarStartTime) {
    sound.pause("ding");
  }
  // ...
}
```



### 案例

https://www.h5anli.com/index.php/Home/Yi/?keyword=pixi

探秘芒种：https://go.163.com/web/20190606_taidu/index.html

大自然守护者计划：https://game.163.com/chuanbo/qingli/?c=n&n=1