const fetchProducts = (produto) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`; // Pega a URL da API
  if (produto === ' ' || produto === undefined || !produto) { // Caso ela não seja válida, exibe um erro.
    Error('You must provide an url');
  }
  return fetch(url) // retorna a URL da API
    .then((response) => response.json()) // Retorna o objeto em um JSON
    .then((data) => data) // Converte os dados para serem lidos
    .catch(() => 'You must provide an url'); // Caso não funcione ou demore demais, exibe um erro
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
