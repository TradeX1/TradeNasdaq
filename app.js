// 🔥 Firebase Config (APNI KEY DALNI HOGI)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// SIGNUP
function signup() {
  let email = emailInput.value;
  let pass = password.value;
  let username = usernameInput.value;

  auth.createUserWithEmailAndPassword(email, pass)
  .then(user => {
    db.collection("users").doc(user.user.uid).set({
      username: username,
      balance: 0
    });
    alert("Signup Success");
  });
}

// LOGIN
function login() {
  auth.signInWithEmailAndPassword(email.value, password.value)
  .then(res => {
    loadUser(res.user.uid);
  });
}

// LOAD USER
function loadUser(uid) {
  db.collection("users").doc(uid).onSnapshot(doc => {
    let data = doc.data();

    document.getElementById("authBox").style.display="none";
    document.getElementById("dashboard").style.display="block";

    welcome.innerText = "Welcome " + data.username;
    balance.innerText = data.balance;
  });

  loadHotCoins();
}

// HOT COINS
function loadHotCoins() {
  let coins = ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT"];

  hotCoins.innerHTML="";

  coins.forEach(c => {
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${c}`)
    .then(res => res.json())
    .then(data => {
      let div = document.createElement("div");
      div.className="coin";
      div.innerText = c + " : $" + data.price;

      div.onclick = () => showChart(c);

      hotCoins.appendChild(div);
    });
  });
}

// SHOW CHART
function showChart(symbol) {
  content.innerHTML = `
  <iframe width="100%" height="400"
  src="https://www.tradingview.com/embed-widget/advanced-chart/?symbol=BINANCE:${symbol}">
  </iframe>`;
}

// NAVIGATION
function showHome() {
  content.innerHTML="";
}

function showMarket() {
  loadHotCoins();
}

function showAssets() {
  content.innerHTML = `
  <h3>Your Balance: $${balance.innerText}</h3>
  <button onclick="deposit()">Deposit</button>
  <button onclick="withdraw()">Withdraw</button>
  `;
}

// DEPOSIT
function deposit() {
  content.innerHTML = `
  <h3>Deposit</h3>
  <p>TRC20: TLdHhSyHgi8kMTY1Uh9Fb1SPP4fxWJjmb8</p>
  <p>BEP20: 0xfd459fb1b0848bb8ef27507693085364958f949a</p>
  `;
}

// WITHDRAW
function withdraw() {
  let bal = parseFloat(balance.innerText);

  if (bal < 2000) {
    alert("Minimum 2000$ required");
  } else {
    alert("Contact Support");
  }
}

// SUPPORT
function showSupport() {
  content.innerHTML = `
  <h3>Customer Support</h3>
  <textarea id="msg"></textarea><br>
  <button onclick="sendMsg()">Send</button>
  `;
}

function sendMsg() {
  alert("Message Sent (Admin panel next step)");
}
