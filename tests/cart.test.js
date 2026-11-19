import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  createCart,
  addItem,
  removeItem,
  updateQuantity,
  getItemCount,
  calculateTotal,
  formatWhatsAppMessage,
  generateWhatsAppUrl
} from '../js/cart.js';

describe('Cart - Adicionar itens e calcular total', () => {
  it('deve adicionar um produto com tamanho especificado e calcular o subtotal correto', () => {
    const cart = createCart();
    const product = {
      id: 'p1',
      name: 'Vestido Minimalista Off-White',
      price: 189.90,
      size: 'M',
      quantity: 1
    };

    const updated = addItem(cart, product);

    assert.equal(updated.items.length, 1);
    assert.equal(updated.items[0].id, 'p1');
    assert.equal(updated.items[0].size, 'M');
    assert.equal(updated.items[0].quantity, 1);
    assert.equal(calculateTotal(updated), 189.90);
  });

  it('deve incrementar a quantidade se o mesmo produto e tamanho forem adicionados novamente', () => {
    const cart = createCart();
    const product = {
      id: 'p1',
      name: 'Vestido Minimalista Off-White',
      price: 189.90,
      size: 'M',
      quantity: 1
    };

    let updated = addItem(cart, product);
    updated = addItem(updated, { ...product, quantity: 2 });

    assert.equal(updated.items.length, 1);
    assert.equal(updated.items[0].quantity, 3);
    assert.equal(calculateTotal(updated), 569.70);
  });

  it('deve tratar o mesmo produto com tamanhos diferentes como itens separados na sacola', () => {
    const cart = createCart();
    const itemM = { id: 'p1', name: 'Vestido Minimalista', price: 100.0, size: 'M', quantity: 1 };
    const itemG = { id: 'p1', name: 'Vestido Minimalista', price: 100.0, size: 'G', quantity: 1 };

    let updated = addItem(cart, itemM);
    updated = addItem(updated, itemG);

    assert.equal(updated.items.length, 2);
    assert.equal(calculateTotal(updated), 200.0);
  });
});

describe('Cart - Remoção, atualização de quantidade e contagem', () => {
  it('deve remover um item específico por id e tamanho', () => {
    let cart = createCart();
    cart = addItem(cart, { id: 'p1', name: 'Camisa Linho', price: 120, size: 'P', quantity: 1 });
    cart = addItem(cart, { id: 'p1', name: 'Camisa Linho', price: 120, size: 'M', quantity: 1 });

    const updated = removeItem(cart, 'p1', 'P');
    assert.equal(updated.items.length, 1);
    assert.equal(updated.items[0].size, 'M');
    assert.equal(getItemCount(updated), 1);
  });

  it('deve atualizar a quantidade de um item para um novo valor', () => {
    let cart = createCart();
    cart = addItem(cart, { id: 'p1', name: 'Camisa Linho', price: 120, size: 'P', quantity: 1 });

    const updated = updateQuantity(cart, 'p1', 'P', 4);
    assert.equal(updated.items[0].quantity, 4);
    assert.equal(calculateTotal(updated), 480);
    assert.equal(getItemCount(updated), 4);
  });

  it('deve remover o item se a nova quantidade for zero ou negativa', () => {
    let cart = createCart();
    cart = addItem(cart, { id: 'p1', name: 'Camisa Linho', price: 120, size: 'P', quantity: 1 });

    const updated = updateQuantity(cart, 'p1', 'P', 0);
    assert.equal(updated.items.length, 0);
    assert.equal(getItemCount(updated), 0);
  });
});

describe('Cart - Mensagem e Link do WhatsApp', () => {
  it('deve formatar a mensagem com itens, valor total, endereço em Águas Lindas e forma de pagamento', () => {
    let cart = createCart();
    cart = addItem(cart, { id: 'p1', name: 'Conjunto Alfaiataria Preto', price: 219.90, size: 'M', quantity: 1 });
    cart = addItem(cart, { id: 'p2', name: 'Blusa Seda Off-White', price: 129.90, size: 'P', quantity: 2 });

    const customerDetails = {
      name: 'Mariana Silva',
      neighborhood: 'Jardim Brasília',
      address: 'Quadra 15, Lote 04',
      paymentMethod: 'Pix'
    };

    const message = formatWhatsAppMessage(cart, customerDetails);

    assert.ok(message.includes('*Novo Pedido - Bell Close*'));
    assert.ok(message.includes('Conjunto Alfaiataria Preto (Tam: M) x1'));
    assert.ok(message.includes('Blusa Seda Off-White (Tam: P) x2'));
    assert.ok(message.includes('*Total:* R$ 479,70'));
    assert.ok(message.includes('Cliente: Mariana Silva'));
    assert.ok(message.includes('Bairro: Jardim Brasília (Águas Lindas de Goiás)'));
    assert.ok(message.includes('Endereço: Quadra 15, Lote 04'));
    assert.ok(message.includes('Pagamento: Pix'));
  });

  it('deve gerar a URL correta do WhatsApp com número da loja e texto codificado', () => {
    let cart = createCart();
    cart = addItem(cart, { id: 'p1', name: 'Vestido Linho', price: 150, size: 'G', quantity: 1 });

    const customerDetails = {
      name: 'Ana',
      neighborhood: 'Mansões Olinda',
      address: 'Rua 2',
      paymentMethod: 'Cartão na Entrega'
    };

    const url = generateWhatsAppUrl(cart, customerDetails, '5561982335867');

    assert.ok(url.startsWith('https://wa.me/5561982335867?text='));
    const decoded = decodeURIComponent(url.split('?text=')[1]);
    assert.ok(decoded.includes('*Novo Pedido - Bell Close*'));
    assert.ok(decoded.includes('Vestido Linho'));
    assert.ok(decoded.includes('Mansões Olinda'));
  });
});
