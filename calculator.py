# calculator.py
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

def main():
    print("=" * 40)
    print("      简单计算器")
    print("=" * 40)
    
    while True:
        print("\n请选择运算：")
        print("1. 加法 (+)")
        print("2. 减法 (-)")
        print("3. 乘法 (*)")
        print("4. 除法 (/)")
        print("5. 退出")
        
        choice = input("\n请输入选择 (1-5): ")
        
        if choice == '5':
            print("再见！")
            break
        
        if choice not in ['1', '2', '3', '4']:
            print("无效选择，请重新输入")
            continue
        
        try:
            num1 = float(input("请输入第一个数字: "))
            num2 = float(input("请输入第二个数字: "))
        except ValueError:
            print("错误：请输入有效的数字")
            continue
        
        if choice == '1':
            result = add(num1, num2)
            print(f"\n{num1} + {num2} = {result}")
        elif choice == '2':
            result = subtract(num1, num2)
            print(f"\n{num1} - {num2} = {result}")
        elif choice == '3':
            result = multiply(num1, num2)
            print(f"\n{num1} × {num2} = {result}")
        elif choice == '4':
            result = divide(num1, num2)
            print(f"\n{num1} ÷ {num2} = {result}")

if __name__ == "__main__":
    main()