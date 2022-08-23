const getSavedCartItems = () => localStorage.getItem('cartItems'); // exibe diretamente no LocalStorage do navegador
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
