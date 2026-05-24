import json
import pytest
import requests

# 从 JSON 文件加载测试数据
data = json.load(open("test_data.json", encoding='utf-8'))

# 服务端的地址，后续测试会用这个地址拼接完整请求的URL
BASE_URL = "http://192.168.0.104:8080"

# pytest 提供的功能，用于批量执行测试
@pytest.mark.parametrize("op, cases", data.items())
# 函数名必须以 test_ 开头，pytest 才能识别;op操作符eg：“add",cases对应测试用例表
def test_calculator(op, cases):
    for case in cases:
        resp = requests.get(f"{BASE_URL}/calc", params={"a": case["a"], "b": case["b"], "op": op})
        assert resp.json()["result"] == case["expected"], f'失败：{case["desc"]}'