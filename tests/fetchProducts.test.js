require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it(('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint'), () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  it(('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo'), async () => {
    expect(await fetchProducts('computador')).toBe(computadorSearch); // Perguntar porque ta passando com ToBe, se era para ser toEqual
  });
  it(('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.'), async () => {
    expect(await fetchProducts()).toBe('You must provide an url');
  });
});

