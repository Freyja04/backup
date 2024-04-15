const { name1, name2, name3 } = $arguments
let config = JSON.parse($files[0]) // 文件中的第一个
//获取单条订阅
let freyja = await produceArtifact({
    type: 'subscription', // subscription单条订阅 collection组合订阅
    name: name1, // 订阅的"名称", 不是"显示名称"
    platform: 'sing-box',
    produceType: 'internal'
})

//获取组合订阅1
let subscription1 = await produceArtifact({
    type: 'collection',
    name: name2,
    platform: 'sing-box',
    produceType: 'internal'
})

//获取组合订阅2
let subscription2 = await produceArtifact({
  type: 'collection',
  name: name3,
  platform: 'sing-box',
  produceType: 'internal'
})

// 先将全部节点结构插到 outbounds
config.outbounds.push(...freyja,...subscription1,...subscription2)

config.outbounds.map(i => {
  if (['Subscription1'].includes(i.tag)) {
    i.outbounds.push(...subscription1.map(p => p.tag))
  }
  if (['Subscription2'].includes(i.tag)) {
    i.outbounds.push(...subscription2.map(p => p.tag))
  }
  if (['global','google','twitter','telegram','openai','github','tiktok','apple','microsoft','final'].includes(i.tag)) {
    i.outbounds.push(...freyja.map(p => p.tag))
  }
})

$content = JSON.stringify(config, null, 2)
