const texts = [
  '这个作品不错，值得借鉴！',
  '作者能留下一个联系方式吗？',
  '赞！',
  '这种风格的不知道是否可以在家装领域落地？',
  '很棒！',
  '这个设计版全能出吗？',
  '赞赞赞！',
  '学习一下！',
  '很好的作品啊！',
  '这个作品在哪里落地了？我想亲自去参观一下！',
  '这个作品有实际在哪里用上吗？',
  '这个花样很独特！',
  '很喜欢这个作品！有没有社群，我们一起交流一下！',
  '可以了，可以了',
  '天王盖地虎！'
]

// 随机获取一条评论
function getComment () {
  return texts[RandomNumBoth(0, texts.length - 1)]
}

function RandomNumBoth(Min,Max){
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range)
  return num
}

module.exports = getComment
