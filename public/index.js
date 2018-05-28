(function () {
  const emailInput = document.querySelector('#email');
  const checkButton = document.querySelector('#checkButton');
  const registerResult = document.querySelector('#registerResult');
  const currentRegisters = document.querySelector('.current-registers');
  checkButton.addEventListener('click', () => {
    while (registerResult.firstChild) { registerResult.removeChild(registerResult.firstChild); }
    const email = emailInput.value;
    fetch('https://www.thef2e.com/api/isSignUp',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email })
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          const { nickName, timeStamp } = data;
          const registerTime = new Date(timeStamp);
          registerResult.innerHTML = `恭喜 ${nickName} ，在 ${registerTime.toLocaleString()} 時報名成功!`;
        } else {
          registerResult.innerHTML = data.message;
        }
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
  });
  function getCurrentRegisters() {
    while (currentRegisters.firstChild) { currentRegisters.removeChild(currentRegisters.firstChild); }
    fetch('https://www.thef2e.com/api/signUpTotal')
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          currentRegisters.innerHTML = `目前參賽人數: ${data.total} 人`;
        } else {
          currentRegisters.innerHTML = '目前統計人數發生不明錯誤!';
        }
      })
      .catch(error => {
        currentRegisters.innerHTML = '取得統計人數發生錯誤!';
      });
  }
  setInterval(getCurrentRegisters, 600000);
  getCurrentRegisters();
}());
