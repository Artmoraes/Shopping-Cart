const saveCartItems = (product) => localStorage.setItem('cartItems', product); // salva diretamente no LocalStorage do navegador.
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
