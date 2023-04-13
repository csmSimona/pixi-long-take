let p1Arr = [
  'bg.jpg', //0
  'ewm.png',
  'logo.png',
  'musicoff.png',
  'musicon.png',
  'p1-bg.png', //5
  'p1-cloud1.png',
  'p1-cloud2.png',
  'p1-grass1.png',
  'p1-grass2.png',
  'p1-house.png', //10
  'p1-p1.png',
  'p1-star.png',
  'p1-tree.png'
]

let p2Arr = [
  'p2-1.png', //0
  'p2-boy.png',
  'p2-huati.png',
  'p2-lotsofyinfu.png',
  'p2-mother.png',
  'p2-school.png', //5
  'p2-shitou.png',
  'p2-tree4.png',
  'p2-wutai.png',
  'p2-yinfu.png'
]

let p2Arr2 = []
for (let i1 = 1; i1 <= 34; i1++) {
  let temp = 'w' + i1 + '.png'
  p2Arr2.push(temp)
}

let p3Arr = [
  'p3-1.png',
  'p3-2.png',
  'p3-3.png',
  'p3-childbirth.png',
]

let p4Arr = [
  'p4-1.png',
  'p4-bg.png',
  'p4-house3.png',
  'p4-start.png',
]

let p5Arr = []
for (let i2 = 1; i2 <= 51; i2++) {
  let temp2 = 'x' + i2 + '.png'
  p5Arr.push(temp2)
}

export { p1Arr, p2Arr, p2Arr2, p3Arr, p4Arr, p5Arr }

//spriteGroupBg
let spriteGroupBgArr = [
  {
    'img': p1Arr[0],
    'x': 0,
    'y': 0,
    'alpah': 1,
    'sprName': 'bgSpr',
    'sprGroup': 'spriteGroupBg'
  }
]

//spriteGroupSences  (sence1-sence4)
let sence1Arr = [
  {
    'img': p1Arr[5],
    'x': 0,
    'y': 0,
    'alpah': 1,
    'sprName': 'p1Bg',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[6],
    'x': -20,
    'y': 177,
    'alpah': 1,
    'sprName': 'p1Cloud1',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[7],
    'x': 725,
    'y': 0,
    'alpah': 1,
    'sprName': 'p1Cloud2',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[10],
    'x': 732,
    'y': 0,
    'alpah': 1,
    'sprName': 'p1House',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[12],
    'x': 424,
    'y': 419,
    'alpah': 0,
    'sprName': 'p1Star',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[9],
    'x': 836,
    'y': 1161,
    'alpah': 1,
    'sprName': 'p1Grass2',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[8],
    'x': 0,
    'y': 1093,
    'alpah': 1,
    'sprName': 'p1Grass1',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[11],
    'x': 996,
    'y': 600,
    'alpah': 1,
    'sprName': 'p1P1',
    'sprGroup': 'spriteGroupSences/sence1'
  },
  {
    'img': p1Arr[13],
    'x': -20,
    'y': 604,
    'alpah': 1,
    'sprName': 'p1Tree',
    'sprGroup': 'spriteGroupSences/sence1'
  },
]

let sence2Arr = [
  {
    'img': p2Arr[5],
    'x': 613,
    'y': 31,
    'alpah': 1,
    'sprName': 'p2School',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[2],
    'x': 1298,
    'y': 414,
    'alpah': 1,
    'sprName': 'p2Huati',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[1],
    'x': 1508,
    'y': 262,
    'alpah': 1,
    'sprName': 'p2Boy',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[0],
    'x': 0,
    'y': 816,
    'alpah': 1,
    'sprName': 'p21',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[4],
    'x': 144,
    'y': 768,
    'alpah': 1,
    'sprName': 'p2Mother',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[6],
    'x': 1200,
    'y': 1149,
    'alpah': 1,
    'sprName': 'p2Shitou',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[7],
    'x': 1932,
    'y': 49,
    'alpah': 1,
    'sprName': 'p2Tree4',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[8],
    'x': 2243,
    'y': 349,
    'alpah': 1,
    'sprName': 'p2Wutai',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[9],
    'x': 3009,
    'y': 273,
    'alpah': 1,
    'sprName': 'p2Yinfu',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr[3],
    'x': 1932,
    'y': 307,
    'alpah': 1,
    'sprName': 'p2Lotsofyinfu',
    'sprGroup': 'spriteGroupSences/sence2'
  },
  {
    'img': p2Arr2[0],
    'x': 0,
    'y': 0,
    'sprName': 'p2Child',
    'alpah': 1,
    'sprGroup': 'spriteGroupSences/sence2'
  },
]

let sence3Arr = [
  {
    'img': p3Arr[1],
    'x': 826,
    'y': 142,
    'sprName': 'p32',
    'alpah': 1,
    'sprGroup': 'spriteGroupSences/sence3'
  },
  {
    'img': p3Arr[0],
    'x': 0,
    'y': 80,
    'sprName': 'p31',
    'alpah': 0,
    'sprGroup': 'spriteGroupSences/sence3'
  },
  {
    'img': p3Arr[2],
    'x': 971,
    'y': 24,
    'alpah': 1,
    'sprName': 'p33',
    'sprGroup': 'spriteGroupSences/sence3'
  },
  {
    'img': p3Arr[3],
    'x': 2397,
    'y': 453,
    'alpah': 1,
    'sprName': 'p3Childbirth',
    'sprGroup': 'spriteGroupSences/sence3'
  },
]

let sence4Arr = [
  {
    'img': p4Arr[0],
    'x': 691,
    'y': 529,
    'alpah': 1,
    'sprName': 'p41',
    'sprGroup': 'spriteGroupSences/sence4'
  },
  {
    'img': p4Arr[1],
    'x': 588,
    'y': 0,
    'alpah': 1,
    'sprName': 'p4Bg',
    'sprGroup': 'spriteGroupSences/sence4'
  },
  {
    'img': p4Arr[2],
    'x': 0,
    'y': 0,
    'alpah': 1,
    'sprName': 'p2House3',
    'sprGroup': 'spriteGroupSences/sence4'
  },
  {
    'img': p4Arr[3],
    'x': 1398,
    'y': 0,
    'alpah': 1,
    'sprName': 'p2Start',
    'sprGroup': 'spriteGroupSences/sence4'
  },
]



//spriteGroupLast
let spriteGroupLastArr = [
  {
    'img': p5Arr[0],
    'x': 0,
    'y': 0,
    'alpah': 0,
    'sprName': 'bgLast',
    'sprGroup': 'spriteGroupLast'
  }
]

export { spriteGroupBgArr, sence1Arr, sence2Arr, sence3Arr, sence4Arr, spriteGroupLastArr }