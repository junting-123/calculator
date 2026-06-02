def call(String targetPath){
    // 获取本次构建的变更文件列表
    def changeLogSets = currentBuild.changeSets
    def changedFiles = []

    // 收集所有变更的文件路径
    for (changeLogSet in changeLogSets){
        for (entry in changeLogSet.getItems()){
            for (path in entry.getAffectedPaths()){
                changedFiles.add(path)
            }
        }
    }

    // 如果没有变更记录 (手动构建、定时执行)，默认执行
    if (changedFiles.isEmpty()){
        println "⏭️ 无变更记录（手动/定时构建），默认执行"
        return true
    }

    // 检查是否包含目标路径的变更
    for (file in changedFiles){
        if (file.startsWith(targetPath)){
            println "✅ 检测到目标路径变更： ${file}"
            return true
        }
    }

    // 没有相关更新
    println "❌ 没有检测到 ${targetPath} 的变更,跳过构建"
    return false
}

    return this