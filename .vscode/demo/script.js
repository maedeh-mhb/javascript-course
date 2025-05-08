
'use strict';


// Data
const account1 = {
  owner: 'Sara Alavi',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pass: 1111,
};

const account2 = {
  owner: 'Mahshad Sharifi',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pass: 2222,
};

const account3 = {
  owner: 'Kazem Mohamadi',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pass: 3333,
};

const account4 = {
  owner: 'Shervin Shahrokhi',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pass: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containertransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginpass = document.querySelector('.login__input--pass');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosepass = document.querySelector('.form__input--pass');


// usernames 
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);


// display transactions
const displayTransactions = function (transactions){
  containertransactions.innerHTML = '';
  transactions.forEach(function (tranc,i) {
    const type =tranc > 0 ? 'deposit' : 'withdrawal';
    const html = `  <div class="transactions__row">
    <div class="transactions__value">${tranc} ریال</div>
    <div class="transactions__date">سه روز پیش</div>
    <div class="transactions__type transactions__type--${type}">${i + 1} ${type}</div>
    </div>`;
    
    containertransactions.insertAdjacentHTML('afterbegin',html)      
  });
 
};
// displayTransactions(account1.transactions);

// display balance
const totalBalance= function (acc){
  acc.balance = acc.transactions.reduce((acc,trans)=>acc + trans,0);
  labelBalance.textContent =`${acc.balance} ریال`;
console.log(acc);

};
// totalBalance(account1.transactions);

// summery

const calculateSummery = function(acc) {
  const incomes = acc.transactions
  .filter(trans=> trans > 0)
  .reduce((acc,trans)=>acc +trans,0);
  labelSumIn.textContent = `${incomes} ریال`;

  const outcomes = acc.transactions
  .filter(trans=> trans < 0)
  .reduce((acc,trans)=>acc +trans,0);
  labelSumOut.textContent = `${Math.abs(outcomes)} ریال`;

  const interest = acc.transactions
  .filter(trans=>trans>0)
  .map(despoite =>(despoite * acc.interestRate)/100)
  .filter(int=>int>=1)
  .reduce((acc,de,i,arr)=> {

    return acc + de},0);
  labelSumInterest.textContent=`${interest} ریال`

}
// calculateSummery(account1.transactions)

const updateUi =function(acc){
  displayTransactions(acc.transactions);
  totalBalance(acc);
  calculateSummery(acc)
}
// login

let currentAccount;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount =accounts.find(acc=>
    acc.username === inputLoginUsername.value
  );
  console.log(currentAccount,inputLoginUsername.value);
  
if(currentAccount?.pass === Number(inputLoginpass.value)){
  labelWelcome.textContent =`${currentAccount.owner.split(' ')[0]}خوش آمدی`;
  containerApp.style.opacity  =1;
  inputLoginUsername.value = inputLoginpass.value ='';
  updateUi(currentAccount)
}
})


// transfer money
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAccount =accounts.find(
    acc=> acc.username === inputTransferTo.value
  );
  
  if (amount > 0 && receiveAccount && currentAccount.balance >= amount
    && receiveAccount?.username !== currentAccount.username
  ){
    currentAccount.transactions.push(-amount);
    receiveAccount.transactions.push(amount);
    updateUi(currentAccount)
  };
  console.log(amount,receiveAccount);
})


// closing account


btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if( inputCloseUsername.value === currentAccount.username
    && Number(inputClosepass.value) === currentAccount.pass
  ){
    const index = accounts.findIndex(
      acc=> acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index,1);
    containerApp.style.opacity  =0;
    
  }
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount =Number(inputLoanAmount.value);
  if (amount > 0 && 
    currentAccount.transactions.some(tran=>
      tran>= amount * 0.1
    )
  ){
    currentAccount.transactions.push(amount);
    updateUi(currentAccount)
  }

})


















