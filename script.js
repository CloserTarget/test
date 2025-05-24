let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(produto, preco) {
  carrinho.push({ produto, preco });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(produto + " adicionado ao carrinho!");
}

// Página do carrinho
if (document.getElementById('listaCarrinho')) {
  mostrarCarrinho();
}

function mostrarCarrinho() {
  let lista = document.getElementById('listaCarrinho');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    let li = document.createElement('li');
    li.innerHTML = `${item.produto} - R$ ${item.preco.toFixed(2)} 
    <button onclick="removerDoCarrinho(${index})">Excluir</button>`;
    lista.appendChild(li);
    total += item.preco;
  });

  document.getElementById('total').textContent = total.toFixed(2);
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarCarrinho();
}

function enviarPedidoWhatsApp() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const cep = document.getElementById('cep').value;
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

  let mensagem = `*Novo Pedido*%0A`;
  carrinho.forEach(item => {
    mensagem += `- ${item.produto} - R$ ${item.preco.toFixed(2)}%0A`;
  });
  
  mensagem += `%0ATotal: R$ ${carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2)}`;
  mensagem += `%0AForma de Pagamento: ${pagamento}`;
  mensagem += `%0ACliente: ${nome}, ${telefone}`;
  mensagem += `%0AEndereço: ${endereco}, Nº ${numero}, CEP: ${cep}`;

  const numeroWhats = '5511994116238'; // Ex: 5511999999999
  const url = `https://wa.me/${numeroWhats}?text=${mensagem}`;
  
  window.open(url, '_blank');

   // Aviso ao cliente
  alert("Pedido enviado! O carrinho será esvaziado.");

  function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById('carrinho');
  carrinhoDiv.innerHTML = 'Carrinho vazio.';
  }
}

