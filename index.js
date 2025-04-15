//Esse comando espera toda a página carregar antes de executar qualquer código JS. 
// Isso evita erro do tipo “não encontrei elemento com esse id”.
document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
    //Impede que o formulário recarregue a página automaticamente 
    // (isso apagaria tudo se não usássemos o localStorage).
    document.getElementById("produtoForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value;
        let preco = parseFloat(document.getElementById("preco").value);

        //Garante que o usuário não deixou os campos vazios ou digitou um valor inválido.
        if (nome && !isNaN(preco)) {

            //Lê os produtos salvos (ou cria lista vazia)
            let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
            produtos.push({ nome, preco });
            localStorage.setItem("produtos", JSON.stringify(produtos));

            adicionarProdutoNaTabela(nome, preco);
            //Limpa os campos para o próximo produto ser digitado.
            document.getElementById("produtoForm").reset();
        }
    });
});

//Quando a página carrega, essa função: Lê os produtos do localStorage
//Para cada produto, chama adicionarProdutoNaTabela() pra exibir na tela.
function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.forEach(produto => {
        adicionarProdutoNaTabela(produto.nome, produto.preco);
    });
}

function adicionarProdutoNaTabela(nome, preco) {
    let listaProdutos = document.getElementById("listaProdutos");
    let novaLinha = listaProdutos.insertRow();

    let celulaNome = novaLinha.insertCell(0);
    let celulaPreco = novaLinha.insertCell(1);
    let celulaAcao = novaLinha.insertCell(2);

    celulaNome.textContent = nome;
    celulaPreco.textContent = `R$ ${preco.toFixed(2)}`;

    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    //Ação do botão: remover a linha e o produto da memória:
    botaoRemover.onclick = function () {
        novaLinha.remove();
        removerProduto(nome, preco);
    };

    celulaAcao.appendChild(botaoRemover);
}

//Função: removerProduto(), Lê os produtos do localStorage
function removerProduto(nome, preco) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let index = produtos.findIndex(p => p.nome === nome && p.preco === preco);
    if (index !== -1) {
        produtos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }
}
