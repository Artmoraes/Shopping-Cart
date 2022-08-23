const buttonEraser = document.querySelectorAll('.empty-cart');
const secctionCartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const loadInfoItensHTML = async (categoria) => { // Função assíncrona que vai rodar sem atrapalhar a página.
  const dataProducts = await fetchProducts(categoria); // Nessa constante ela retorna com o parâmetro direto na função fetchProducts, para retornar os dados através do Data.
  const showProduct = dataProducts.results; // Pega o valor do dataProducts e puxa o 'results' do objeto da API

  showProduct.forEach((infoProduct) => { // Percorre ela para mostrar todo os objetos na tela
    const { id, title, thumbnail } = infoProduct; // Desconstrói o array result e pega os que vão apenas ser usado.
    const items = document.querySelector('.items'); // Seleciona o elemento do CSS para colocar como formato
    const item = createProductItemElement({ sku: id, name: title, image: thumbnail }); // Usa a função createProductItemElement para criar o elemento na página e atribui os valores dos parâmetros.
    items.appendChild(item); // Adiciona a 'criança' ao corpo do HTML usando o forEach como laço de repetição
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  console.log(event.target);
  event.target.remove();
  console.log();
  saveCartItems(secctionCartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function transportCartItem(event) {
  const item = event.target.parentNode;
  const itemID = getSkuFromProductItem(item);
  const { id, title, price } = await fetchItem(itemID);
  const createCar = createCartItemElement({ sku: id, name: title, salePrice: price });
  secctionCartItems.appendChild(createCar);
  saveCartItems(secctionCartItems.innerHTML);
}

function clearCart() {
  localStorage.clear();
  secctionCartItems.innerHTML = '';
}

async function loadItems() {
  const dateCartHTML = getSavedCartItems();
  secctionCartItems.innerHTML = dateCartHTML;
  const itemCarrinho = document.querySelectorAll('.cart__item');
  itemCarrinho.forEach((buttonRm) => buttonRm.addEventListener('click', cartItemClickListener));
}

window.onload = async () => {
  await loadInfoItensHTML('computador');
  const buttonCartItem = document.querySelectorAll('.item__add');
  buttonCartItem.forEach((buttonAdd) => buttonAdd.addEventListener('click', transportCartItem));
  buttonEraser.forEach((button) => button.addEventListener('click', clearCart));
  loadItems();
};
