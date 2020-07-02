const checkboxes = document.querySelectorAll('.checkbox');
const currency = document.getElementById('currency');
let currencyIcon = true;
let currencyClass = 'dollar'

const changeCurrency = () => {

  currency.animate([
    { transform: 'rotateY(0deg)' },
    { transform: 'rotateY(180deg)' }
  ], {
    duration: 100,
    fill: 'forwards'
  });

  setTimeout(() => {
    const icon = document.querySelector('#currency .fas').remove();
    const newIcon = document.createElement('i');
    newIcon.classList.add('fas');
    newIcon.classList.add(`fa-${currencyClass}-sign`);
    currency.append(newIcon);

    currency.animate([
      { transform: 'rotateY(180deg)' },
      { transform: 'rotateY(360deg)' }
    ], {
      duration: 100,
      fill: 'forwards'
    });
  }, 110);


};

currency.addEventListener('click', () => {
  currencyIcon = !currencyIcon;
  currencyClass = currencyIcon ? 'dollar' : 'euro';
  changeCurrency();

});
