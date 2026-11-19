/**
 * ============================================================================
 * CATÁLOGO & CONTROLE DE ESTOQUE - BELL CLOSE (@usebell.close)
 * ============================================================================
 * Como atualizar o estoque da loja:
 * 
 * 1. Para alterar PREÇO: Altere o valor numérico em `price: 189.90`.
 * 2. Para alterar TAMANHOS: Edite a lista em `sizes: ['P', 'M', 'G']`.
 * 3. Para marcar como ESGOTADO: Mude `inStock: true` para `inStock: false`.
 *    -> O site exibirá automaticamente a etiqueta "Esgotado" e travará o pedido.
 * 4. Para adicionar PEÇA NOVA: Copie um bloco inteiro, cole e troque os dados.
 * 5. Para remover PEÇA: Apenas apague ou comente o bloco do produto.
 * ============================================================================
 */

export const BELL_CATALOG = [
  {
    id: 'prod-1',
    name: 'Vestido Midi Acetinado Off-White',
    category: 'Vestidos',
    price: 189.90,
    sizes: ['P', 'M', 'G'],
    inStock: true,
    tag: 'Mais Vendido',
    description: 'Modelagem fluida com caimento delicado, acabamento acetinado e decote sutil. Perfeito para ocasiões especiais.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-2',
    name: 'Blazer Alfaiataria Estruturado Preto',
    category: 'Alfaiataria',
    price: 249.90,
    sizes: ['P', 'M', 'G', 'GG'],
    inStock: true,
    tag: 'Destaque',
    description: 'Corte refinado com ombros bem alinhados, forro suave e caimento impecável em alfaiataria premium.',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-3',
    name: 'Camisa Linho Puro Oversized Branco',
    category: 'Camisas',
    price: 159.90,
    sizes: ['P', 'M', 'G'],
    inStock: true,
    tag: 'Linho Nobre',
    description: 'Toque fresco e textura nobre do linho puro. Versatilidade elegante para composições diurnas e noturnas.',
    image: 'https://images.unsplash.com/photo-1608234807905-4467027845f6?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-4',
    name: 'Calça Wide Leg Crepe Alfaiataria',
    category: 'Calças',
    price: 179.90,
    sizes: ['P', 'M', 'G', 'GG'],
    inStock: true,
    tag: 'Essencial',
    description: 'Cintura alta com caimento amplo e alongado. Sofisticação clássica e conforto absoluto para o dia todo.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-5',
    name: 'Cropped Alfaiataria Estruturado Preto',
    category: 'Tops',
    price: 119.90,
    sizes: ['P', 'M', 'G'],
    inStock: true,
    tag: 'Modern',
    description: 'Design moderno com linhas retas e decote quadrado. Combinação perfeita com calças de alfaiataria.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-6',
    name: 'Vestido Tubinho Minimalista Preto',
    category: 'Vestidos',
    price: 199.90,
    sizes: ['P', 'M', 'G'],
    inStock: true,
    tag: 'Clássico',
    description: 'O clássico pretinho básico com acabamento sofisticado e tecido encorpado que valoriza a silhueta com conforto.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-7',
    name: 'Colete Alfaiataria Botões Frontais',
    category: 'Alfaiataria',
    price: 149.90,
    sizes: ['P', 'M', 'G'],
    inStock: true,
    tag: 'Tendência',
    description: 'Peça versátil inspirada nas principais semanas de moda. Use fechado como blusa ou sobreposto.',
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'prod-8',
    name: 'Conjunto Monocromático Elegance Off-White',
    category: 'Conjuntos',
    price: 269.90,
    sizes: ['P', 'M', 'G'],
    inStock: true,
    tag: 'Exclusivo',
    description: 'Dupla refinada que une sofisticação e praticidade. Cores neutras que transmitem leveza e elegância natural.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85'
  }
];

// Compatibilidade para execução no navegador sem erro de import/CORS
if (typeof window !== 'undefined') {
  window.BELL_CATALOG = BELL_CATALOG;
}
