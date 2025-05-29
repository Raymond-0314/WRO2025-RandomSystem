const colorMap = {
  "紅": "color-red",
  "黃": "color-yellow",
  "綠": "color-green",
  "藍": "color-blue",
  "白": "color-white",
  "空": "color-black"
};

function draw(group) {
  let result = [];

  if (group === "elementary") {
    const colors = ["紅", "黃", "藍", "綠", "白"];
    const shuffled = shuffle(colors).slice(0, 4);
    result = shuffle([...shuffled, "空"]);
  } else if (group === "junior") {
    const items = ["紅", "黃", "白", "綠", "空", "空"];
    result = shuffle(items);
  }

  renderResult(group, result);
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderResult(group, colors) {
  const container = document.getElementById(`${group}-result`);
  container.innerHTML = "";

  colors.forEach(color => {
    const block = document.createElement("div");
    block.className = `color-block ${colorMap[color] || ""}`;
    block.textContent = color;
    container.appendChild(block);
  });
}

const autoDrawTimers = {
  elementary: { intervalId: null, countdownId: null, timeLeft: 0 },
  junior: { intervalId: null, countdownId: null, timeLeft: 0 }
};

function startAutoDraw(group) {
  const intervalSelect = document.getElementById(`${group}-interval`);
  const toggleButton = document.getElementById(`${group}-toggle`);
  const interval = parseInt(intervalSelect.value, 10);

  // ✅ 重新啟動前先清掉原有的計時器
  clearInterval(autoDrawTimers[group].intervalId);
  clearInterval(autoDrawTimers[group].countdownId);

  autoDrawTimers[group].timeLeft = interval / 1000;

  // 倒數計時顯示
  autoDrawTimers[group].countdownId = setInterval(() => {
    autoDrawTimers[group].timeLeft--;
    updateToggleText(group);

    if (autoDrawTimers[group].timeLeft <= 0) {
      draw(group);
      autoDrawTimers[group].timeLeft = interval / 1000;
    }
  }, 1000);

  // 定期抽籤（此處抽籤功能實際觸發）
  autoDrawTimers[group].intervalId = setInterval(() => {
    draw(group);
  }, interval);

  toggleButton.classList.add("active");
  updateToggleText(group);
}

function stopAutoDraw(group) {
  const toggleButton = document.getElementById(`${group}-toggle`);

  clearInterval(autoDrawTimers[group].intervalId);
  clearInterval(autoDrawTimers[group].countdownId);

  autoDrawTimers[group] = { intervalId: null, countdownId: null, timeLeft: 0 };

  toggleButton.textContent = "自動抽籤停止";
  toggleButton.classList.remove("active");
}

function toggleAutoDraw(group) {
  if (autoDrawTimers[group].intervalId) {
    stopAutoDraw(group);
  } else {
    startAutoDraw(group);
  }
}

function updateToggleText(group) {
  const toggleButton = document.getElementById(`${group}-toggle`);
  toggleButton.textContent = `自動抽籤中 (${autoDrawTimers[group].timeLeft}s)`;
}

window.onload = () => {
  ["elementary", "junior"].forEach(group => {
    draw(group);

    const toggleBtn = document.getElementById(`${group}-toggle`);
    const intervalSelect = document.getElementById(`${group}-interval`);
    const redrawBtn = document.getElementById(`${group}-redraw`);

    // 綁定自動抽籤切換按鈕
    toggleBtn.addEventListener("click", () => toggleAutoDraw(group));

    // 綁定重新抽籤按鈕
    if (redrawBtn) {
      redrawBtn.addEventListener("click", () => {
        draw(group);
        startAutoDraw(group); // 重新開始計時
      });
    }

    // 綁定間隔時間變更事件
    if (intervalSelect) {
      intervalSelect.addEventListener("change", () => {
        startAutoDraw(group); // 重新開始計時
      });
    }

    // 預設啟用自動抽籤，間隔時間為 1 分鐘
    if (intervalSelect) {
      intervalSelect.value = "60000";
    }
    startAutoDraw(group);

    
  });
};
