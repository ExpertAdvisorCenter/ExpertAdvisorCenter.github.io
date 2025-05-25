const tplAlert = document.querySelector("#tpl-alert");
const listAlertsEl = document.getElementById("list-alerts");
const numAlertsEl = document.querySelector("#num-alerts");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAlert(notifications) {
  
    const activeAlerts = notifications.filter(item => item.column1 === "open");

    if (activeAlerts.length === 0) {
        return null;
    }

    if (document.querySelector("#msg")) {
        const msgEl = document.querySelector("#msg");
        msgEl.classList.add("opacity-0");
        msgEl.remove();
    }
    
   
    const randomIndex = getRandomInt(0, activeAlerts.length - 1);
    const randomAlert = activeAlerts[randomIndex];

   
    randomAlert.column1 = "shownum";

    const alertClone = tplAlert.content.cloneNode(true);
    const alertIEl = alertClone.querySelector("article");
    alertClone.querySelector("[data-img]").src = randomAlert.column4;
    alertClone.querySelector("[data-name]").innerText = randomAlert.column2;
    alertClone.querySelector("[data-desc]").innerText = randomAlert.column3;
    alertClone.querySelector("button").addEventListener("click", () => {
        randomAlert.column1 = "resolved";
        alertIEl.classList.add("opacity-0");

        setTimeout(() => {
            alertIEl.remove();
            const msg = [{
  "type": "flex",
  "altText": "Expert Advisor Center",
  "contents": {
  "type": "carousel",
  "contents": [{
  "type": "bubble",
  "size": "giga",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "" + randomAlert.column4,
                "aspectMode": "cover",
                "size": "full"
              }
            ],
            "width": "72px",
            "height": "72px",
            "cornerRadius": "lg"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "" + randomAlert.column2,
                    "weight": "bold",
                    "size": "xl",
                    "color": "#ffffff"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "" + randomAlert.column3,
                    "scaling": true,
                    "wrap": true,
                    "color": "#ffffff"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "" + randomAlert.column10,
                "aspectMode": "cover",
                "size": "full"
              }
            ],
            "width": "35px",
            "height": "35px",
            "cornerRadius": "sm",
            "action": {
              "type": "uri",
              "label": "share liff",
              "uri": "" + randomAlert.column11
            }
          }
        ],
        "spacing": "xl",
        "paddingAll": "20px",
        "background": {
          "type": "linearGradient",
          "angle": "0deg",
          "startColor": "#003b08",
          "endColor": "#003b08",
          "centerColor": "#16c822"
        }
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "separator",
            "margin": "xl",
            "color": "#ffffff"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "" + randomAlert.column5,
                "wrap": true,
                "scaling": false
              }
            ],
            "paddingEnd": "xxl",
            "paddingStart": "lg"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "separator",
                "margin": "xxl"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "" + randomAlert.column6,
                  "uri": "" + randomAlert.column7
                }
              },
              {
                "type": "separator"
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "" + randomAlert.column8,
                  "uri": "" + randomAlert.column9
                }
              }
            ]
          }
        ]
      }
    ],
    "paddingAll": "0px"
  }
}]
}
}]
            sendText(msg)
            updateActiveCounter(notifications);
        }, 200);
    });

    setTimeout(() => alertIEl.classList.remove("opacity-0"), 150);

    return alertClone;
}


function updateActiveCounter(notifications) {
    const activeCount = notifications.filter(item => item.column1 === "shownum").length;
    numAlertsEl.innerText = activeCount;

    if (activeCount < 1) {
       
        listAlertsEl.innerHTML = '<p id="msg" class="text-center p-4 text-green-600">ไม่มีข้อมูลแจ้งเตือน</p>';
    }
}

function addRandomAlert(notifications) {
   
    const newAlert = generateRandomAlert(notifications);
    if (newAlert) {
        listAlertsEl.appendChild(newAlert);
    }

    updateActiveCounter(notifications);

    const activeCount = notifications.filter(item => item.column1 === "shownum").length;
    if (activeCount > 0) {
       
        const randomDelay = getRandomInt(2000, 8000);
        setTimeout(() => {
            addRandomAlert(notifications);
        }, randomDelay);
    }
}


fetch('https://script.google.com/macros/s/AKfycby357E_oyjpqKOsp9xwK12k85sKN_oNBZ4689Bb5YEgi3MpIHJdSUAsi27opqfWcune/exec?sheetName=notification')
    .then(response => response.json())
    .then(notifications => {
        addRandomAlert(notifications);
    })
    .catch(error => console.error('Error fetching notifications:', error));
