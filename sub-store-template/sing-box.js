const { proxyName,backupName } = $arguments
let config = JSON.parse($files[0]) // 文件中的第一个
let proxies = await produceArtifact({
    type: 'subscription', // 如果是组合订阅 就是 'collection'
    proxyName, // 订阅的"名称", 不是"显示名称"
    platform: 'sing-box',
    produceType: 'internal'
})

let backup = await produceArtifact({
    type: 'subscription', // 如果是组合订阅 就是 'collection'
    backupName, // 订阅的"名称", 不是"显示名称"
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
