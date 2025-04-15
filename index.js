document.getElementById("produtoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let preco = parseFloat(document.getElementById("preco").value);

    if (nome && !isNaN(preco)) {
        adicionarProduto(nome, preco);
        document.getElementById("produtoForm").reset();
    }
});

function adicionarProduto(nome, preco) {
    let listaProdutos = document.getElementById("listaProdutos");
    let novaLinha = listaProdutos.insertRow();

    let celulaNome = novaLinha.insertCell(0);
    let celulaPreco = novaLinha.insertCell(1);

    celulaNome.textContent = nome;
    celulaPreco.textContent = `R$ ${preco.toFixed(2)}`;
}
