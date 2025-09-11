class Calculadora:
    def soma(self, a, b):
        return round( a + b, 2 )

    def sub(self, a, b):
        return round(a - b, 2)

    def mult(self, a, b):
        return round(a * b, 2)

    def div(self, a, b):
        if b == 0:
            raise ValueError("Não é possível dividir por zero.")
        return round(a / b, 2)


def main():
    try:
        print("Calculadora")
        print("1- Soma")
        print("2- Subtração")
        print("3- Multiplicação")
        print("4- Divisão")
        
        operacao = int(input("Informe a operação que deseja realizar: "))

        calc = Calculadora()
        resultado = None

        if operacao in [1, 2, 3, 4]:
            valor1 = float(input("Digite o primeiro número: "))
            valor2 = float(input("Digite o segundo número: "))

            if operacao == 1:
                resultado = calc.soma(valor1, valor2)
            elif operacao == 2:
                resultado = calc.sub(valor1, valor2)
            elif operacao == 3:
                resultado = calc.mult(valor1, valor2)
            elif operacao == 4:
                resultado = calc.div(valor1, valor2)

            print("O resultado da operação é:", resultado)
        else:
            print("Operação Inválida!!!")

    except ValueError as ve:
        print(f"Erro: {ve}. Por favor, use números.")

if __name__ == '__main__':
    main()