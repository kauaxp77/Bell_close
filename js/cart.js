/**
 * Gerenciador de estado do carrinho de compras (Sacola)
 * e formatador de pedidos para WhatsApp
 */

export function createCart() {
  return {
    items: []
  };
}

export function addItem(cart, item) {
  const quantityToAdd = Number(item.quantity) || 1;
  const existingIndex = cart.items.findIndex(
    (i) => i.id === item.id && i.size === item.size
  );

  let updatedItems;
  if (existingIndex > -1) {
    updatedItems = cart.items.map((it, idx) => {
      if (idx === existingIndex) {
        return { ...it, quantity: it.quantity + quantityToAdd };
      }
      return it;
    });
  } else {
    updatedItems = [
      ...cart.items,
      {
        id: item.id,
        name: item.name,
        price: Number(item.price),
        size: item.size,
        quantity: quantityToAdd
      }
    ];
  }

  return {
    ...cart,
    items: updatedItems
  };
}

export function removeItem(cart, itemId, size) {
  return {
    ...cart,
    items: cart.items.filter((item) => !(item.id === itemId && item.size === size))
  };
}

export function updateQuantity(cart, itemId, size, newQuantity) {
  const quantity = Number(newQuantity);
  if (quantity <= 0) {
    return removeItem(cart, itemId, size);
  }

  return {
    ...cart,
    items: cart.items.map((item) => {
      if (item.id === itemId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    })
  };
}

export function getItemCount(cart) {
  return cart.items.reduce((acc, item) => acc + item.quantity, 0);
}

export function calculateTotal(cart) {
  const sum = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return Math.round(sum * 100) / 100;
}

export function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function formatWhatsAppMessage(cart, customerDetails) {
  const total = calculateTotal(cart);
  const itemsText = cart.items
    .map(
      (item) =>
        `• ${item.name} (Tam: ${item.size}) x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
    )
    .join('\n');

  const neighborhood = customerDetails.neighborhood || 'Águas Lindas de Goiás';
  const fullNeighborhood = neighborhood.includes('Águas Lindas')
    ? neighborhood
    : `${neighborhood} (Águas Lindas de Goiás)`;

  const lines = [
    '✨ *Novo Pedido - Bell Close* ✨',
    '',
    '*Itens selecionados:*',
    itemsText,
    '',
    `*Total:* ${formatCurrency(total)}`,
    '',
    '*Dados para entrega:*',
    `• Cliente: ${customerDetails.name || 'Não informado'}`,
    `• Bairro: ${fullNeighborhood}`,
    `• Endereço: ${customerDetails.address || 'Não informado'}`,
    `• Pagamento: ${customerDetails.paymentMethod || 'A combinar'}`,
    '',
    'Por favor, confirme a disponibilidade e o valor do frete para entrega local.'
  ];

  return lines.join('\n');
}

export function generateWhatsAppUrl(cart, customerDetails, phoneNumber = '5561982335867') {
  const message = formatWhatsAppMessage(cart, customerDetails);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}
