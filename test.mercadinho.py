#Teste Unitarios
#Autor: Iwin Lima Borges
#Data: 18/09/2025


import unittest

from mercadinho import Produto, Mercadinho

class testemercadinho(unittest.TestCase):

    def setUp(self):
        self.mercadinho = Mercadinho()
        self.produto1 = Produto(1,"Arroz",5.40,1)
        
    #1- Teste de cadastro de produtos
    def test_cadastrar_prod(self):
        produto = Produto(1,"Arroz",5.40,1)

        resultado = self.mercadinho.adicionar_produto(produto)

        self.assertTrue(resultado)
        self.assertIn(produto, self.mercadinho.produtos)
        self.assertEqual(len(self.mercadinho.produtos),1)

    #2- Teste de cadastro de produtos duplicados
    def test_cadastrar_prod_duplicado(self):

        produto1 = Produto(1,"Arroz",5.40,1)
        resultado1 = self.mercadinho.adicionar_produto(produto1)

        produto2 = Produto(1,"Feijao",7.00,1)
        resultado2 = self.mercadinho.adicionar_produto(produto1)

        self.assertTrue(resultado1)
        self.assertFalse(resultado2)
        
        self.assertIn(produto1, self.mercadinho.produtos)
        self.assertEqual(len(self.mercadinho.produtos),1)

    #3- Teste de buscar de produtos
    def test_buscar_prod(self):

        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado = self.mercadinho.buscar_produto(1)

        self.assertEqual(resultado.id,1)
        self.assertEqual(resultado.nome,"Arroz")
        self.assertEqual(resultado.preco,5.40)
        self.assertEqual(resultado.quantidade,1)

    #4- Teste de cadastro de produtos
    def test_buscar_prod_inexistente(self):

        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado = self.mercadinho.buscar_produto(55)

        self.assertIsNone(resultado)
    
    #5- Teste de atualizar de produtos
    def test_atualizar_prod(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado= self.mercadinho.atualizar_produto(1, {"nome": "feijao"})

        self.assertTrue(resultado)
        produto_atualizado = self.mercadinho.buscar_produto(1)

    #6- Teste de atualizar de preco
    def test_atualizar_preco(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado= self.mercadinho.atualizar_produto(1, {"preco": "7.70"})

        self.assertTrue(resultado)
        produto_atualizado = self.mercadinho.buscar_produto(1)

    #7- Teste de atualizar de preco
    def test_atualizar_prod_inexistente(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado= self.mercadinho.atualizar_produto(2, {"nome": "Arroz"})

        self.assertFalse(resultado)
        produto_atualizado = self.mercadinho.buscar_produto(1)

    #8- Teste de remover de produto
    def test_remover_prod(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado= self.mercadinho.remover_produto(1)

        self.assertTrue(resultado)
        self.assertEqual(len(self.mercadinho.produtos),0)

    #9- Teste de remover de produto inexistente
    def test_remover_prod_inexistente(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        self.mercadinho.adicionar_produto(produto)

        resultado= self.mercadinho.remover_produto(2)

        self.assertFalse(resultado)
        self.assertEqual(len(self.mercadinho.produtos),1)
    
    #10- Teste de listar produto
    def test_listar_prod(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        produto2 = Produto(2,"Feijao",6.60,1)
        self.mercadinho.adicionar_produto(produto)
        self.mercadinho.adicionar_produto(produto2)

        resultado= self.mercadinho.listar_produtos()

        self.assertTrue(resultado)
        self.assertEqual(len(self.mercadinho.produtos),2)

    #11- Teste de limpar lista
    def test_limpar_lista(self):
        
        produto = Produto(1,"Arroz",5.40,1)
        produto2 = Produto(2,"Feijao",6.60,1)
        self.mercadinho.adicionar_produto(produto)
        self.mercadinho.adicionar_produto(produto2)

        self.mercadinho.limpar()

        self.assertEqual(len(self.mercadinho.produtos),0)

    #12- Teste de atualizar a quantidade de produtos
    def test_atualizar_quantidade_produto(self):
        produto = Produto(1, "Arroz", 5.40, 1)
        self.mercadinho.adicionar_produto(produto)

    
        resultado = self.mercadinho.atualizar_produto(1, {"quantidade": 5})

        self.assertTrue(resultado)

        produto_atualizado = self.mercadinho.buscar_produto(1)
        self.assertEqual(produto_atualizado.quantidade, 5)  
       


if __name__ == '__main__':
    unittest.main()