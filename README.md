# Bell Close (@usebell.close)

> Loja online de moda feminina minimalista, elegante e atemporal em tons neutros (preto, branco e off-white).

Operação 100% online com entregas exclusivas para **Águas Lindas de Goiás**.

---

## 📁 Estrutura do Repositório

```text
├── index.html          # Página principal da loja (vitrine + sacola + WhatsApp)
├── vercel.json         # Configuração de publicação estática na Vercel
├── package.json        # Configuração de scripts e testes automatizados
├── README.md           # Guia do projeto e manutenção de estoque
├── css/
│   └── style.css       # Estilos visuais, variáveis de cor e responsividade
├── js/
│   ├── stock.js        # 📦 FONTE ÚNICA DO ESTOQUE (altere aqui para gerenciar peças)
│   └── cart.js         # Módulo de cálculo de sacola e formatação de pedido
├── images/
│   ├── logo.png        # Logotipo oficial da Bell Close
│   └── favicon.png     # Ícone do navegador (aba)
├── docs/               # 📄 Materiais comerciais e propostas
│   ├── PROPOSTA_COMERCIAL.md           # Proposta detalhada em Markdown
│   ├── Proposta_Comercial_Bell_Close.pdf # PDF executivo pronto para envio
│   ├── proposta_documento.html         # Template de impressão da proposta
│   └── Bell_Close_logo.pdf             # Material original de identidade
└── tests/              # 🧪 Suíte de testes automatizados
    ├── cart.test.js
    ├── stock.test.js
    └── integrity.test.js
```

---

## 📦 Como Dar Manutenção no Estoque (`js/stock.js`)

Toda a gestão de produtos é feita **exclusivamente** dentro do arquivo [`js/stock.js`](js/stock.js). Você não precisa encostar em nenhuma linha de HTML ou CSS.

### 1. Marcar uma peça como ESGOTADA
Basta alterar `inStock: true` para `inStock: false`:

```javascript
{
  id: 'prod-1',
  name: 'Vestido Midi Acetinado Off-White',
  category: 'Vestidos',
  price: 189.90,
  sizes: ['P', 'M', 'G'],
  inStock: false, // <-- Exibe "Esgotado" e desativa a compra automaticamente
  ...
}
```

### 2. Alterar o PREÇO de uma peça
Edite o campo `price` com o novo valor numérico:

```javascript
price: 179.90, // Altera automaticamente o card, a sacola e a mensagem do WhatsApp
```

### 3. Alterar os TAMANHOS disponíveis
Edite o array `sizes`:

```javascript
sizes: ['P', 'M', 'G', 'GG'],
```

### 4. Adicionar uma NOVA PEÇA
Copie um bloco existente dentro de `BELL_CATALOG`, cole no final da lista com um novo `id` e preencha as informações:

```javascript
{
  id: 'prod-9',
  name: 'Saia Midi Linho Cru',
  category: 'Vestidos',
  price: 169.90,
  sizes: ['P', 'M', 'G'],
  inStock: true,
  tag: 'Lançamento',
  description: 'Cintura alta com caimento leve e tecido fresco.',
  image: 'https://images.unsplash.com/...'
}
```

Após editar, basta subir as alterações para o GitHub:

```bash
git add js/stock.js
git commit -m "chore: atualiza estoque e precos"
git push
```
A Vercel atualizará o site da cliente automaticamente em menos de 20 segundos!

---

## 🧪 Como Rodar os Testes

Para validar a integridade do estoque e dos cálculos antes de subir:

```bash
npm test
```

A suíte valida:
- IDs únicos e ausência de duplicatas em `js/stock.js`.
- Preços válidos e tamanhos cadastrados.
- Cálculos da sacola e formatação do link do WhatsApp.
- Integridade estrutural de arquivos essenciais.
