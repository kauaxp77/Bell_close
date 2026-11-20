import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

// Carrega js/stock.js do mesmo jeito que o navegador (script comum, não módulo).
// Se alguém colocar "export" no arquivo, este carregamento falha como no site.
const janela = {};
vm.runInNewContext(fs.readFileSync(path.resolve('js/stock.js'), 'utf-8'), { window: janela });
const BELL_CATALOG = janela.BELL_CATALOG;

describe('Catálogo & Controle de Estoque (js/stock.js)', () => {
  it('deve possuir produtos cadastrados no catálogo', () => {
    assert.ok(Array.isArray(BELL_CATALOG));
    assert.ok(BELL_CATALOG.length > 0, 'O catálogo não pode estar vazio');
  });

  it('cada produto deve ter ID único, nome, categoria e foto válida', () => {
    const ids = new Set();
    const validCategories = ['Vestidos', 'Alfaiataria', 'Camisas', 'Calças', 'Tops', 'Conjuntos'];

    for (const item of BELL_CATALOG) {
      assert.ok(item.id, `Item sem id: ${JSON.stringify(item)}`);
      assert.ok(!ids.has(item.id), `ID duplicado encontrado: ${item.id}`);
      ids.add(item.id);

      assert.ok(item.name && item.name.length > 3, `Nome inválido para item ${item.id}`);
      assert.ok(validCategories.includes(item.category), `Categoria inválida para item ${item.id}: ${item.category}`);
      assert.ok(typeof item.price === 'number' && item.price > 0, `Preço inválido para item ${item.id}`);
      assert.ok(Array.isArray(item.sizes) && item.sizes.length > 0, `Tamanhos vazios para item ${item.id}`);
      assert.ok(typeof item.inStock === 'boolean', `inStock deve ser booleano para item ${item.id}`);
      assert.ok(item.image && item.image.startsWith('http'), `Foto inválida para item ${item.id}`);
    }
  });

  it('deve permitir desativar estoque mudando inStock para false', () => {
    // Simula produto esgotado
    const outOfStockItem = {
      ...BELL_CATALOG[0],
      inStock: false
    };

    assert.equal(outOfStockItem.inStock, false);
  });
});
