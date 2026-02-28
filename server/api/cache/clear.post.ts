export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const targetPath = body.path || 'docs'
  
  // 获取 Nitro 缓存存储实例
  const storage = useStorage('cache')
  
  // 获取所有缓存 Key
  const keys = await storage.getKeys()
  
  // 筛选与目标路径相关的 Key
  // Nitro 缓存 Key 通常包含路由路径，例如 'nitro:handlers:_:Route:/docs.json'
  // 注意：Redis Key 可能包含前缀，但 storage.getKeys() 返回的是相对于 base 的 key
  const keysToRemove = keys.filter(key => key.toLowerCase().includes(targetPath.toLowerCase()))
  
  console.log('[Cache Clear] Target path:', targetPath)
  console.log('[Cache Clear] All keys:', keys)
  console.log('[Cache Clear] Matching keys:', keysToRemove)

  // 执行删除
  const results = await Promise.all(keysToRemove.map(async (key) => {
    await storage.removeItem(key)
    return key
  }))
  
  return {
    success: true,
    message: results.length > 0 
      ? `Successfully cleared ${results.length} cache entries.` 
      : 'No matching cache entries found.',
    debug: {
      totalKeys: keys.length,
      allKeys: keys, // 返回所有 Key 以便调试（生产环境应移除）
      clearedKeys: results
    }
  }
})
