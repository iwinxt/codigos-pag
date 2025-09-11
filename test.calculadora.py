
import unittest

from calculadora import Calculadora

class testecalculadora(unittest.TestCase):

    # ---------- Testes de SOMA ----------
    def test_soma(self):
        # Testa soma básica: 10 + 4 = 14
        calc = Calculadora()
        resultado = calc.soma(10, 4)
        self.assertEqual(resultado, 14)

    def test_soma_dois_num(self):
        # Soma dois números maiores
        calc = Calculadora()
        resultado = calc.soma(10, 40)
        self.assertEqual(resultado, 50)

    def test_soma_decimal(self):
        # Soma de dois números decimais
        calc = Calculadora()
        resultado = calc.soma(5.9, 7.5)
        self.assertEqual(resultado, 13.4)

    def test_soma_negativo(self):
        # Soma de dois negativos inteiros
        calc = Calculadora()
        resultado = calc.soma(-6, -4)
        self.assertEqual(resultado, -10)

    def test_soma_negativo_decimal(self):
        # Soma de dois negativos decimais
        calc = Calculadora()
        resultado = calc.soma(-6.9, -4.5)
        self.assertEqual(resultado, -11.4)

    def test_soma_negativo_dois_num(self):
        # Soma de dois números negativos maiores
        calc = Calculadora()
        resultado = calc.soma(-60, -40)
        self.assertEqual(resultado, -100)

    # ---------- Testes de SUBTRAÇÃO ----------
    def test_subtracao(self):
        # Subtração básica
        calc = Calculadora()
        resultado = calc.sub(10, 5)
        self.assertEqual(resultado, 5)

    def test_subtracao_dois_num(self):
        # Resultado negativo
        calc = Calculadora()
        resultado = calc.sub(25, 35)
        self.assertEqual(resultado, -10)

    def test_subtracao_decimal(self):
        # Subtração com decimais
        calc = Calculadora()
        resultado = calc.sub(8.5, 5.5)
        self.assertEqual(resultado, 3.0)

    def test_subtracao_negativo(self):
        # Subtração de dois negativos
        calc = Calculadora()
        resultado = calc.sub(-10, -5)
        self.assertEqual(resultado, -5)

    def test_subtracao_negativo_decimal(self):
        # Subtração de negativos decimais
        calc = Calculadora()
        resultado = calc.sub(-6.3, -6.0)
        self.assertEqual(resultado, -0.3)

    # ---------- Testes de MULTIPLICAÇÃO ----------
    def test_multiplicacao(self):
        # Multiplicação simples
        calc = Calculadora()
        resultado = calc.mult(8, 4)
        self.assertEqual(resultado, 32)

    def test_multiplicacao_dois_num(self):
        # Multiplicação com números grandes
        calc = Calculadora()
        resultado = calc.mult(10, 40)
        self.assertEqual(resultado, 400)

    def test_multiplicacao_negativo(self):
        # Multiplicação de dois negativos (resultado positivo)
        calc = Calculadora()
        resultado = calc.mult(-5, -4)
        self.assertEqual(resultado, 20)

    def test_multiplicacao_negativo_positivo(self):
        # Multiplicação de negativo com positivo
        calc = Calculadora()
        resultado = calc.mult(-5, 4)
        self.assertEqual(resultado, -20)

    def test_multiplicacao_decimal(self):
        # Multiplicação com decimal
        calc = Calculadora()
        resultado = calc.mult(8.4, 2.0)
        self.assertEqual(resultado, 16.8)

    def test_multiplicacao_decimal_negativo(self):
        # Multiplicação de decimais negativos
        calc = Calculadora()
        resultado = calc.mult(-8.4, -4.3)
        self.assertEqual(resultado, 36.12)

    # ---------- Testes de DIVISÃO ----------
    def test_divisao(self):
        # Divisão inteira
        calc = Calculadora()
        resultado = calc.div(10, 5)
        self.assertEqual(resultado, 2)

    def test_divisao_negativo(self):
        # Divisão entre negativos
        calc = Calculadora()
        resultado = calc.div(-9, -3)
        self.assertEqual(resultado, 3)

    def test_divisao_decimal(self):
        # Divisão com decimais
        calc = Calculadora()
        resultado = calc.div(9.5, 3.5)
        self.assertEqual(resultado, 2.71)  # Tem arredondamento

    def test_divisao_dois_num(self):
        # Divisão com números maiores
        calc = Calculadora()
        resultado = calc.div(60, 30)
        self.assertEqual(resultado, 2)

    def test_divisao_por_0(self):
        # Divisão por zero lança ValueError)
        calc = Calculadora()
        with self.assertRaises(ValueError):
            calc.div(5, 0)

# Executa os testes se este arquivo for executado diretamente
if __name__ == '__main__':
    unittest.main()
