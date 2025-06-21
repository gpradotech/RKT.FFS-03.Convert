/////////////////////////////////////////////////////////////////

// Seleção dos elementos do DOM
const input = document.querySelector('input');
const select = document.querySelector('select');
const form = document.querySelector('form');
const button = document.querySelector('button');
const footer = document.querySelector('footer');
const caption = document.querySelector('footer span');
const result = document.querySelector('footer h1');

const value = input.value;

/////////////////////////////////////////////////////////////////

// Tabela de conversão de moedas
const conversionRates = {
  'USD': 4.86, // Dólar
  'EUR': 5.20, // Euro
  'GBP': 6.00, // Libra Esterlina
  'JPY': 0.04, // Iene Japonês
  'AUD': 3.50, // Dólar Australiano
};

// Tabela de símbolos de moedas
const symbols = {
  'USD': 'US$', // Dólar
  'EUR': '€', // Euro
  'GBP': '£', // Libra Esterlina
  'JPY': '¥', // Iene Japonês
  'AUD': 'AU$', // Dólar Australiano
};

/////////////////////////////////////////////////////////////////

// Trata o valor de input para aceitar apenas números e ponto
input.addEventListener('input', function () {
  // Remove tudo que não for número ou ponto
  let value = this.value.replace(/[^0-9.]/g, '');
  // Permite apenas um ponto
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }
  this.value = value;
});

// Altera o texto da legenda conforme a moeda selecionada
function updateCaption() {
  caption.textContent = `${symbols[select.value]} 1 = R$ ${Number(conversionRates[select.value])}`;
};

function calculateConversion() {
  // Calcula o valor convertido
  let calc = Number(input.value) * Number(conversionRates[select.value])
  result.textContent = `R$ ${calc.toFixed(2).replace('.', ',')}`;

  // Verifica se o valor é válido
  if (isNaN(calc) || calc <= 0) {
    footer.style.display = 'none';
    alert('Por favor, insira um valor válido para conversão.');
  }
}

/////////////////////////////////////////////////////////////////


form.onsubmit = (event) => {
  event.preventDefault(); // Previne o comportamento padrão do botão
  footer.style.display = 'block'; // Exibe o resultado da conversão
  updateCaption(); // Altera o texto da legenda conforme a moeda selecionada
  calculateConversion(); // Calcula a conversão inicial
};


/////////////////////////////////////////////////////////////////

// Atualiza o resultado conforme o valor do select é alterado
select.addEventListener('change', () => {
  updateCaption()
  calculateConversion()
});

// Atualiza o resultado conforme o valor do input é alterado
input.addEventListener('input', () => {
  calculateConversion();
});

/////////////////////////////////////////////////////////////////