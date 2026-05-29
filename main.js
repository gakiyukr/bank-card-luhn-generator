function luhnCheckDigit(partial) {
  var digits = partial.split("").map(Number);
  var sum = 0;

  for (var i = digits.length - 1; i >= 0; i--) {
    var d = digits[i];
    if ((digits.length - i) % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }

  return (10 - (sum % 10)) % 10;
}

function generateExp() {
  var now = new Date();
  var curYear = now.getFullYear() % 100;
  var year = curYear + 1 + Math.floor(Math.random() * 5);
  var month = 1 + Math.floor(Math.random() * 12);

  return String(month).padStart(2, "0") + "/" + String(year).padStart(2, "0");
}

function generateCVV() {
  return String(Math.floor(Math.random() * 900) + 100);
}

function generateOne(bin, totalLen) {
  var fillLen = totalLen - bin.length - 1;
  var mid = "";

  for (var i = 0; i < fillLen; i++) {
    mid += Math.floor(Math.random() * 10);
  }

  var partial = bin + mid;
  var check = luhnCheckDigit(partial);
  return partial + check;
}

function formatCard(num) {
  return num.replace(/(.{4})/g, "$1 ").trim();
}

function generate() {
  var bin = document.getElementById("binInput").value.trim();
  var errEl = document.getElementById("error");
  var totalLen = parseInt(document.getElementById("lengthSelect").value, 10);
  var count = parseInt(document.getElementById("countInput").value, 10);

  if (!/^\d{6,8}$/.test(bin)) {
    errEl.textContent = "請輸入 6 到 8 位數字的 BIN 碼";
    return;
  }

  if (bin.length > totalLen - 1) {
    errEl.textContent = "BIN 長度不能超過卡號長度減 1";
    return;
  }

  errEl.textContent = "";

  var results = [];
  var seen = new Set();

  while (results.length < count) {
    var card = generateOne(bin, totalLen);
    if (!seen.has(card)) {
      seen.add(card);
      results.push(card);
    }
  }

  var listEl = document.getElementById("resultList");
  listEl.innerHTML = "";

  results.forEach(function(card) {
    var exp = generateExp();
    var cvv = generateCVV();
    var row = document.createElement("div");

    row.className = "card-row";
    row.innerHTML =
      '<span class="num">' + formatCard(card) + "</span>" +
      '<span class="sep">|</span><span class="exp">' + exp + "</span>" +
      '<span class="sep">|</span><span class="cvv">' + cvv + "</span>" +
      '<button class="copy-btn" onclick="copySingle(this, \'' + card + "|" + exp + "|" + cvv + '\')">複製</button>';

    listEl.appendChild(row);
  });

  document.getElementById("resultHeader").style.display = "flex";
  document.getElementById("resultCount").textContent = "已生成 " + results.length + " 組卡號";
}

function copySingle(btn, text) {
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = "已複製";
    btn.classList.add("copied");
    setTimeout(function() {
      btn.textContent = "複製";
      btn.classList.remove("copied");
    }, 1500);
  });
}

function copyAll() {
  var rows = document.querySelectorAll(".card-row");
  var lines = Array.from(rows).map(function(r) {
    var num = r.querySelector(".num").textContent.replace(/\s/g, "");
    var exp = r.querySelector(".exp").textContent;
    var cvv = r.querySelector(".cvv").textContent;
    return num + "|" + exp + "|" + cvv;
  });

  navigator.clipboard.writeText(lines.join("\n")).then(function() {
    var btn = document.querySelector(".btn-copy-all");
    btn.textContent = "已複製全部";
    btn.classList.add("copied");
    setTimeout(function() {
      btn.textContent = "複製全部";
      btn.classList.remove("copied");
    }, 1500);
  });
}

document.getElementById("binInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") generate();
});
