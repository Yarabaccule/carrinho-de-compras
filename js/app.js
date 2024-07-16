document.addEventListener("DOMContentLoaded", function () {
  const produtoSelect = document.getElementById("produto");
  const quantidadeInput = document.getElementById("quantidade");
  const listaProdutos = document.getElementById("lista-produtos");
  const valorTotal = document.getElementById("valor-total");

  let total = 0; // Valor inicial do carrinho é zero
  let carrinho = {}; // Objeto para armazenar os produtos e suas quantidades

  function adicionar() {
    const produtoTexto = produtoSelect.value;
    const quantidade = parseInt(quantidadeInput.value);
    const [produtoNome, produtoPrecoTexto] = produtoTexto.split(" - R$");
    const produtoPreco = parseFloat(produtoPrecoTexto);

    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Por favor, insira uma quantidade válida.");
      return;
    }

    // Verificar se o produto já está no carrinho
    if (carrinho[produtoNome]) {
      carrinho[produtoNome].quantidade += quantidade;
    } else {
      carrinho[produtoNome] = {
        preco: produtoPreco,
        quantidade: quantidade
      };
    }

    // Atualizar a lista de produtos no carrinho
    atualizarCarrinho();

    // Atualizar o valor total
    total += produtoPreco * quantidade;
    valorTotal.innerText = `R$${total.toFixed(2)}`;

    // Limpar o campo de quantidade
    quantidadeInput.value = '';
  }

  function limpar() {
    // Limpar o objeto do carrinho
    carrinho = {};

    // Limpar a lista de produtos
    listaProdutos.innerHTML = '';

    // Resetar o valor total
    total = 0;
    valorTotal.innerText = `R$${total.toFixed(2)}`;
  }

  function removerProduto(produtoNome) {
    // Verificar se o produto existe no carrinho
    if (carrinho[produtoNome]) {
      const produto = carrinho[produtoNome];
      // Calcular o valor total a ser subtraído
      const valorASubtrair = produto.preco * produto.quantidade;
      // Remover o produto do objeto do carrinho
      delete carrinho[produtoNome];
      // Atualizar a lista de produtos no carrinho
      atualizarCarrinho();
      // Atualizar o valor total
      total -= valorASubtrair;
      valorTotal.innerText = `R$${total.toFixed(2)}`;
    }
  }

  function atualizarCarrinho() {
    // Limpar a lista de produtos no DOM
    listaProdutos.innerHTML = '';

    // Adicionar os produtos atualizados ao DOM
    for (let produtoNome in carrinho) {
      const produto = carrinho[produtoNome];
      const novoProduto = document.createElement("section");
      novoProduto.classList.add("carrinho__produtos__produto");
      novoProduto.innerHTML = `<span class="texto-azul">${produto.quantidade}x</span> ${produtoNome} 
      <span class="texto-azul">R$${(produto.preco * produto.quantidade).toFixed(2)}</span>
      <button class="botao-remover" onclick="removerProduto('${produtoNome}')">
        <img src="assets/lata-de-lixo.png" alt="Remover">
      </button>`;
      listaProdutos.appendChild(novoProduto);
    }
  }

  window.adicionar = adicionar;
  window.limpar = limpar;
  window.removerProduto = removerProduto;
});