// ""
const totalBalance = document.getElementById("total-balance")
const credit = document.getElementById("credit")
const debit = document.getElementById("debit")
const historyContainer = document.getElementById("history-container")
const transactionDropdown = document.getElementsByTagName("select")[0]
const transactionName = document.querySelector(`input[type="text"]`)
const transactionAmount = document.querySelector(`input[type="number"]`)
const addTransactionButton = document.querySelector("button")

let allTransactionsArray = []

addTransactionButton.addEventListener("click", (e) => {
  e.preventDefault()
  if (
    transactionName.value === "" ||
    transactionAmount.value == "0" ||
    transactionAmount.value === ""
  ) {
    alert("Input feild empty!")
  } else {
    const newTransaction = {
      transactionId: 0,
      transactionName: transactionName.value,
      transactionAmount: transactionAmount.value,
      transactionType: transactionDropdown.value
    }
    if (
      transactionDropdown.value === "debit" &&
      Number(transactionAmount.value) > Number(totalBalance.innerText)
    ) {
      alert("Not enough balance")
    } else {
      allTransactionsArray.push(newTransaction)
      transactionName.value = ""
      transactionAmount.value = 0
      allTransactionsArray.forEach((transaction, index) => {
        transaction.transactionId = index
      })
      updateApp()
    }
  }
})

function updateApp() {
  const totalAmounts = allTransactionsArray.reduce(
    (total, curr) => {
      if (curr.transactionType === "credit")
        return {
          totalCredit: total.totalCredit + Number(curr.transactionAmount),
          totalDebit: total.totalDebit + 0
        }
      else
        return {
          totalCredit: total.totalCredit + 0,
          totalDebit: total.totalDebit + Number(curr.transactionAmount)
        }
    },
    {
      totalCredit: 0,
      totalDebit: 0
    }
  )
  credit.innerText = totalAmounts.totalCredit
  debit.innerText = totalAmounts.totalDebit
  totalBalance.innerText = totalAmounts.totalCredit - totalAmounts.totalDebit
  updateHistory()
}

function updateHistory() {
  const x = allTransactionsArray
    .map((transition) => {
      return `<div divId=${transition.transactionId} class="history-div ${
        transition.transactionType === "credit" ? "credit" : "debit"
      }">
    <span>${transition.transactionName}</span>
    <span>${transition.transactionAmount}</span>
    <div class="delete-history">X</div>
    </div>`
    })
    .join("")
  historyContainer.innerHTML = x
}

historyContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-history")) {
    const divId = e.target.parentElement.getAttribute("divId")
    allTransactionsArray = allTransactionsArray.filter(
      (transaction) => transaction.transactionId != divId
    )
    updateApp()
  }
})
