let config = JSON.parse($files[0]) // 文件中的第一个
let freyja = await produceArtifact({
    type: 'subscription', // subscription单挑订阅 collection组合订阅
    name: 'Freyja', // 订阅的"名称", 不是"显示名称"
    platform: 'sing-box',
    produceType: 'internal'
})

let subscription1 = await produceArtifact({
    type: 'collection',
    name: 'subscription1',
    platform: 'sing-box',
    produceType: 'internal'
})

let subscription2 = await produceArtifact({
  type: 'collection',
  name: 'subscription2',
  platform: 'sing-box',
  produceType: 'internal'
})

// 先将全部节点结构插到 outbounds
config.outbounds.push(...freyja,...subscription1,...subscription2)

config.outbounds.map(i => {
  if (['Freyja'].includes(i.tag)) {
    i.outbounds.push(...freyja.map(p => p.tag))
  }
  if (['global','google','twitter','telegram','openai','github','tiktok','apple','microsoft','final'].includes(i.tag)) {
    i.outbounds.push(...freyja.map(p => p.tag))
  }
})

$content = JSON.stringify(config, null, 2)
