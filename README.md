# Bell Close (@usebell.close)

> Loja online de moda feminina minimalista, elegante e atemporal em tons neutros (preto, branco e off-white).

Operação 100% online com entregas exclusivas para **Águas Lindas de Goiás**.

---

## 🌸 Características da Loja

- **Identidade Visual:** Paleta neutra (fundo claro/off-white `#FAF9F5`, preto `#111111`, toques terrosos sutis).
- **Estilo:** Cortes sofisticados, peças delicadas, alfaiataria contemporânea e tecidos confortáveis.
- **Atendimento Local:** Segunda a Sábado, das 09h às 20h.
- **Área de Cobertura:** Entregas rápidas em todos os bairros de Águas Lindas de Goiás (Jardim Brasília, Mansões Olinda, Pérola, Santa Lúcia, Barragem, Setores 01 ao 08, etc.).
- **Formas de Pagamento:** Pix, Cartão de Crédito/Débito (na entrega) e Dinheiro.
- **Canais Oficiais:**
  - WhatsApp: `(61) 98233-5867` ([wa.me/5561982335867](https://wa.me/5561982335867))
  - Instagram: `[@usebell.close](https://www.instagram.com/usebell.close)`

---

## 🛍️ Funcionalidades da Página

1. **Vitrine Responsiva com Filtros:**
   - Categorias: Vestidos, Alfaiataria, Camisas, Calças, Tops e Conjuntos.
   - Seleção interativa de tamanhos (`P`, `M`, `G`, `GG`).
   - Opção de pedido rápido com 1 clique diretamente no WhatsApp.
2. **Sacola de Compras Integrada (Drawer):**
   - Adição e remoção de múltiplas peças com quantidades e tamanhos independentes.
   - Cálculo automático do subtotal dos produtos.
   - Seleção do bairro de entrega em Águas Lindas e forma de pagamento.
   - Geração de mensagem estruturada e codificada que abre diretamente no WhatsApp da loja com todos os dados do pedido prontos para envio.
3. **Seções de Apoio:**
   - Banner editorial "Cápsula Monocromática".
   - Passo a passo de compra e entrega local.
   - Prova social com depoimentos de clientes da região.
   - FAQ de dúvidas frequentes.
   - Galeria simulando o feed do Instagram.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico com pré-renderização estática (compatível com protocolo `file://` offline).
- **CSS3** moderno com variáveis customizadas, tipografia web (`Playfair Display` e `Plus Jakarta Sans`) e design responsivo (Mobile-First).
- **JavaScript** modular para regras de negócio e script universal para compatibilidade ampla.
- **Node.js Test Runner** (`node --test`) para suíte de testes unitários automatizados.

---

## 🧪 Como Rodar os Testes

Para executar a suíte de testes automatizados:

```bash
npm test
```

A suíte valida:
- Adição, remoção e atualização de itens na sacola.
- Cálculo de subtotal e total.
- Formatação exata da mensagem enviada para o WhatsApp.
- Integridade estrutural de arquivos e requisitos institucionais da loja.

---

## 🚀 Publicação na Vercel

O projeto está configurado para publicação estática com suporte a URLs limpas (`vercel.json`).

1. Conecte este repositório à sua conta na [Vercel](https://vercel.com).
2. O framework detectado será automaticamente **Other** (Static Site).
3. Clique em **Deploy**.
