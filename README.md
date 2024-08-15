1. Introdução
Este documento fornece uma visão geral da lógica e das decisões técnicas por trás da automação de testes para o site SauceDemo usando o framework Playwright com a abordagem de Page Object Model (POM). A estrutura foi projetada para ser modular, reutilizável e fácil de manter.

2. Estrutura do Projeto
A estrutura do projeto segue o padrão POM, onde cada página do site é representada por uma classe específica que contém métodos para interagir com os elementos daquela página.

3. Lógica dos Testes

LoginPage.js
  ° Responsabilidade: Manipular a página de login.
  ° Métodos:
    .goto(): Navega para a página de login.
    .login(username, password): Realiza o login com as credenciais fornecidas.
InventoryPage.js
  ° Responsabilidade: Manipular a página de inventário, onde os produtos são exibidos.
  ° Métodos:
    .addToCart(): Adiciona um produto ao carrinho.
    .gotoCart(): Navega para a página do carrinho.
    .sortBy(option): Ordena os produtos com base na opção fornecida (e.g., preço, nome).

CartPage.js
  ° Responsabilidade: Manipular a página do carrinho de compras.
  ° Métodos:
    .removeItem(): Remove um item do carrinho.
    .checkout(): Inicia o processo de checkout.
    .isEmpty(): Verifica se o carrinho está vazio.
    .gotoCart(): Navega para a página do carrinho (método incluído para manter a consistência na navegação).

CheckoutPage.js
  ° Responsabilidade: Manipular a página de checkout.
  ° Métodos:
    .fillCheckoutForm(firstName, lastName, postalCode): Preenche o formulário de checkout.
    .completeCheckout(): Completa o processo de compra.
    .getConfirmationMessage(): Retorna a mensagem de confirmação após a finalização da compra.
    
4. Decisões Técnicas

4.1 Uso do Page Object Model (POM)
O POM foi escolhido para promover a separação de responsabilidades, onde cada página da aplicação é encapsulada em uma classe. Isso facilita a manutenção do código, pois qualquer mudança na interface do usuário requer alteração em apenas um lugar.

4.2 Modularidade
Cada classe de página foi projetada para ser autônoma e modular, permitindo que métodos sejam reutilizados em diferentes cenários de teste. Isso reduz a redundância e torna os testes mais limpos e fáceis de entender.

4.3 Manutenção e Reusabilidade
Separar a lógica de interação com a UI da lógica dos testes permite maior flexibilidade na escrita de novos testes e na manutenção dos existentes. Caso haja mudanças na UI do site, as alterações necessárias podem ser feitas nas classes de página sem afetar a lógica dos testes.

5. Cenários de Teste
Os cenários de teste incluem:

1. Login Bem-sucedido: Verifica se o usuário pode fazer login com credenciais válidas.
2. Adicionar Produto ao Carrinho: Testa se um produto pode ser adicionado ao carrinho.
3. Remover Produto do Carrinho: Verifica se um item pode ser removido do carrinho e se o carrinho está vazio após a remoção.
4. Finalizar Compra com Sucesso: Simula uma compra completa, verificando a mensagem de confirmação.
5. Ordenar Produtos por Preço: Testa a funcionalidade de ordenação de produtos.
6. Visualizar Detalhes de um Produto: Verifica se os detalhes de um produto podem ser visualizados.
7. Logout Bem-sucedido: Testa a funcionalidade de logout.
8. Acesso Direto ao Carrinho Vazio: Verifica se o carrinho está vazio ao acessá-lo diretamente.

6. Conclusão
A estrutura de testes desenvolvida é escalável e facilita a adição de novos testes. A implementação do POM garante que os testes sejam robustos, fáceis de manter e reutilizar. Com essa abordagem, é possível garantir uma cobertura eficiente dos testes de UI para o site SauceDemo.
Se mais testes precisarem ser adicionados no futuro, a lógica central pode ser estendida ou novas páginas podem ser criadas conforme necessário.
