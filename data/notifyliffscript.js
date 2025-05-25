
const tplAlert = document.querySelector("#tpl-alert");
const listAlertsEl = document.getElementById("list-alerts");
const numAlertsEl = document.querySelector("#num-alerts");

function generateAlert(alertData) {
    const alertClone = tplAlert.content.cloneNode(true);
    const alertIEl = alertClone.querySelector("article");
    alertClone.querySelector("[data-img]").src = alertData.column4;
    alertClone.querySelector("[data-name]").innerText = alertData.column2;
    alertClone.querySelector("[data-desc]").innerText = alertData.column3;
    alertClone.querySelector("button").addEventListener("click", () => {
        alertData.column1 = "resolved";
        alertIEl.classList.add("opacity-0");

        setTimeout(() => {
            alertIEl.remove();
          const msg = [{
                                "type": "text",
                                "text": "คุณได้อ่านข้อความของคุณ " + alertData.column2 + " เรียบร้อยแล้ว"
                            }]
                            sendText(msg)
            updateActiveCounter();
        }, 200);
    });

    setTimeout(() => alertIEl.classList.remove("opacity-0"), 150);

    return alertClone;
}

function updateActiveCounter() {
    const activeCount = listAlertsEl.children.length;
    numAlertsEl.innerText = activeCount;

    if (activeCount < 1) {
        listAlertsEl.innerHTML = '<p id="msg" class="text-center p-4 text-green-600">ไม่มีข้อมูลแจ้งเตือน</p>';
    }
}

function addAlertSequentially(notifications) {
    const activeAlerts = notifications.filter(item => item.column1 === "open");

    if (activeAlerts.length === 0) {
        updateActiveCounter();
        return;
    }

    function showNextAlert(index) {
        if (index >= activeAlerts.length) return;

        const alertData = activeAlerts[index];
        alertData.column1 = "shownum";

        const newAlert = generateAlert(alertData);
        listAlertsEl.appendChild(newAlert);

        updateActiveCounter();

        setTimeout(() => {
            showNextAlert(index + 1);
        }, 1000); 
    }

    showNextAlert(0); 
}

fetch('https://script.google.com/macros/s/AKfycby357E_oyjpqKOsp9xwK12k85sKN_oNBZ4689Bb5YEgi3MpIHJdSUAsi27opqfWcune/exec?sheetName=notification')
    .then(response => response.json())
    .then(notifications => {
        addAlertSequentially(notifications);
    })
    .catch(error => console.error('Error fetching notifications:', error));