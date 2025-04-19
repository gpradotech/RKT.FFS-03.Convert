// Cotação da moeda do dia
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
})

// Capturando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
  event.preventDefault();  // Previne o comportamento padrão do formulário (recarregar a página)
  
  switch (currency.value)
  {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
    default:
      alert("Selecione uma moeda válida.");
  }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    // Exibe a cotação da moeda
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
    
    // Calcula o total da conversão
    let total = amount * price;

    // Verifica se o valor total é um número válido
    if (isNaN(total)) {
      return alert("Valor inválido. Tente novamente.");
    }
    
    // Formata o total para o padrão BRL (R$ 00.00)
    total = formatCurrencyBRL(total).replace("R$", "");

    // Exibe o resultado total
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result");
  }
  catch (error) {
    // Se houver erro, remove a classe que exibe o footer e mostra um alerta.
    footer.classList.remove("show-result");
    // Exibe o erro no console e um alerta para o usuário.
    console.error(error);
    alert("Não foi possível converter a moeda. Tente novamente mais tarde.");
  }
}

function formatCurrencyBRL(value) {
  // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00.00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}