require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it(('Teste se fetchItem é uma função'), () => {
    expect(typeof fetchItem).toBe('function');
  });
  it(('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada'), () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it(('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint'), () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  it(('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.'), async () => {
    expect(await fetchItem('MLB1615760527')).toBe(item);
  });
  it(('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.'), async () => {
    expect(await fetchItem()).toBe('You must provide an url');
  });
});
