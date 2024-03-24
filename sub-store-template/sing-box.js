const { name1, type1, name2, type2 } = $arguments

let config = JSON.parse($files[0]) // 文件中的第一个
let proxies = await produceArtifact({
    type: /^1$|subscription/i.test(type1) ? 'subscription' : 'collection', // 如果是组合订阅 就是 'collection'
    name: name1, // 订阅的"名称", 不是"显示名称"
    platform: 'sing-box',
    produceType: 'internal'
})

let backup = await produceArtifact({
    type: /^1$|subscription/i.test(type2) ? 'subscription' : 'collection', // 如果是组合订阅 就是 'collection'
    name: name2, // 订阅的"名称", 不是"显示名称"
    platform: 'sing-box',
    produceType: 'internal'
})

// 先将全部节点结构插到 outbounds
config.outbounds.push(...proxies,...backup)

config.outbounds.map(i => {
  if (['backup'].includes(i.tag)) {
    i.outbounds.push(...backup.map(p => p.tag))
  }
  if (['global','google','twitter','telegram','openai','github','tiktok','apple','microsoft','final'].includes(i.tag)) {
    i.outbounds.push(...proxies.map(p => p.tag))
  }
})

$content = JSON.stringify(config, null, 2)
