from flask import Flask, request, jsonify

app = Flask(__name__)

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "错误：除数不能为0"
    return a / b

@app.route('/calc', methods=['GET'])
def calc():
    a = float(request.args.get('a'))
    b = float(request.args.get('b'))
    op = request.args.get('op')
    
    if op == 'add':
        return jsonify({'result': add(a, b)})
    elif op == 'sub':
        return jsonify({'result': subtract(a, b)})
    elif op == 'mul':
        return jsonify({'result': multiply(a, b)})
    elif op == 'div':
        return jsonify({'result': divide(a, b)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)