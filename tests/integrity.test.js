import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Integridade dos arquivos e referências do projeto', () => {
  it('deve ter todos os arquivos essenciais presentes na estrutura correta', () => {
    const requiredFiles = [
      'index.html',
      'package.json',
      'README.md',
      'vercel.json',
      'css/style.css',
      'js/cart.js',
      'js/stock.js',
      'images/logo.png',
      'images/favicon.png',
      'docs/PROPOSTA_COMERCIAL.md',
      'docs/Proposta_Comercial_Bell_Close.pdf'
    ];

    for (const relPath of requiredFiles) {
      const fullPath = path.resolve(relPath);
      assert.ok(fs.existsSync(fullPath), `Arquivo ausente: ${relPath}`);
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 0, `Arquivo está vazio: ${relPath}`);
    }
  });

  it('deve conter a tag de favicon no index.html', () => {
    const html = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    assert.ok(
      html.includes('<link rel="icon"') && html.includes('images/favicon.png'),
      'index.html deve referenciar images/favicon.png como favicon'
    );
  });

  it('deve carregar o estoque via script js/stock.js no index.html', () => {
    const html = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    assert.ok(
      html.includes('src="js/stock.js"'),
      'index.html deve carregar js/stock.js para controle dinâmico de estoque'
    );
  });

  it('deve conter seções institucionais e complementares', () => {
    const html = fs.readFileSync(path.resolve('index.html'), 'utf-8');

    // Seções
    assert.ok(html.includes('id="depoimentos"'), 'Deve conter seção de depoimentos de clientes');
    assert.ok(html.includes('id="faq"'), 'Deve conter seção de perguntas frequentes');
    assert.ok(html.includes('id="instagram-feed"'), 'Deve conter seção de feed do Instagram');

    // Instagram
    assert.ok(html.includes('@usebell.close'), 'Deve conter o @ do Instagram');
    assert.ok(html.includes('https://www.instagram.com/usebell.close'), 'Deve ter link do Instagram');

    // Horários e localidade
    assert.ok(html.includes('Águas Lindas de Goiás'), 'Deve restringir a Águas Lindas');
    assert.ok(html.includes('09h às 20h'), 'Deve conter o horário correto');
    assert.ok(html.includes('Segunda a Sábado'), 'Deve conter dias de funcionamento');

    // Telefone / WhatsApp da loja
    assert.ok(html.includes('5561982335867'), 'Deve conter o número da loja para WhatsApp');
    assert.ok(html.includes('(61) 98233-5867'), 'Deve exibir o telefone formatado');
  });
});
