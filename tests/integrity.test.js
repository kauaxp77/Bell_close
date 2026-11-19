import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Integridade dos arquivos e referências do projeto', () => {
  it('deve ter todos os arquivos essenciais presentes na estrutura correta', () => {
    const requiredFiles = [
      'index.html',
      'package.json',
      'css/style.css',
      'js/cart.js',
      'js/products.js',
      'js/app.js',
      'images/logo.png',
      'images/favicon.png'
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

  it('deve conter produtos estáticos pré-renderizados no index.html para visualização offline/file protocol', () => {
    const html = fs.readFileSync(path.resolve('index.html'), 'utf-8');

    // Verifica que há produtos pré-renderizados direto no HTML
    assert.ok(html.includes('Vestido Midi Acetinado'), 'Deve conter Vestido Midi no HTML estático');
    assert.ok(html.includes('Blazer Alfaiataria Estruturado'), 'Deve conter Blazer no HTML estático');
    assert.ok(html.includes('Calça Wide Leg'), 'Deve conter Calça Wide Leg no HTML estático');
    assert.ok(html.includes('Camisa Linho Puro'), 'Deve conter Camisa Linho no HTML estático');

    // Verifica seções ricas adicionais solicitadas para o protótipo
    assert.ok(html.includes('id="depoimentos"'), 'Deve conter seção de depoimentos de clientes');
    assert.ok(html.includes('id="faq"'), 'Deve conter seção de perguntas frequentes');
    assert.ok(html.includes('id="instagram-feed"'), 'Deve conter seção de feed do Instagram');
  });

  it('deve conter as informações institucionais obrigatórias no index.html', () => {
    const html = fs.readFileSync(path.resolve('index.html'), 'utf-8');

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

    // Métodos de pagamento
    assert.ok(html.includes('Pix'), 'Deve mencionar Pix');
    assert.ok(html.includes('Cartão'), 'Deve mencionar Cartão');
    assert.ok(html.includes('Dinheiro'), 'Deve mencionar Dinheiro');
  });
});
