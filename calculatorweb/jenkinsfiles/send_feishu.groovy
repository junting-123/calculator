def call(Map params) {
    def webhook = "https://open.feishu.cn/open-apis/bot/v2/hook/d27ef06c-cdad-4eff-a7d0-46f089c661bf"
    def status = params.RESULT
    def statusText = status == 'SUCCESS' ? '✅ 通过' : '❌ 失败'
    def statusColor = status == 'SUCCESS' ? 'green' : 'red'
    
    sh """
        curl -X POST -H 'Content-Type: application/json' \
        -d '{
            "msg_type": "interactive",
            "card": {
                "header": {
                    "title": {"content": "Jenkins 部署通知", "tag": "plain_text"},
                    "template": "${statusColor}"
                },
                "elements": [{
                    "tag": "div",
                    "text": {
                        "content": "**项目**: ${params.JOB_NAME}\\n**构建号**: #${params.BUILD_NUMBER}\\n**部署结果**: ${statusText}",
                        "tag": "lark_md"
                    }
                }]
            }
        }' ${webhook}
    """
    echo "部署通知已发送"
}

return this