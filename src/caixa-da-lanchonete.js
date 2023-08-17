class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    const cardapio = {
      cafe: { descricao: 'Café', valor: 3.0 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
      suco: { descricao: 'Suco Natural', valor: 6.2 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
    };

    const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];

    if (!formasDePagamentoValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    let hasPrincipal = false;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');
      if (quantidade == 0) {
        return 'Quantidade inválida!'
      }
      if (!cardapio[codigo]) {
        return "Item inválido!";
      }

      const itemInfo = cardapio[codigo];
      total += itemInfo.valor * quantidade;

      if (!itemInfo.descricao.includes('extra')) {
        hasPrincipal = true;
      } else {
        if (!hasPrincipal) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }
    if (!hasPrincipal) {
      return "Não há itens principais no carrinho de compra!";
    }

    if (formaDePagamento === 'dinheiro') {
      total *= 0.95; // 5% de desconto
    } else if (formaDePagamento === 'credito') {
      total *= 1.03; // 3% de acréscimo
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
