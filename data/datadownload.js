const getDatadownload = () => {
            $('#loading-overlayd').removeClass('hidden');
            fetch('https://script.google.com/macros/s/AKfycbxv-OpVKZTHwM3YVzLOzaQk_nagD8Kl_NqQ0-4QMIrbQSZJfrCCchSro3RB-RNxskC69Q/exec?sheetName=download')
                .then(function (response) {
                    $('#loading-overlayd').addClass('hidden');
                    return response.json();
                })
                .then(function (data) {
                    data.filter((d, addData) => {
                        let dataHTML = '';
                        addData++;

                        dataHTML += `
                          <div class="flex flex-wrap gap-6 p-6 justify-center text-lg font-Anantason">
    <!-- Card Section -->
    <div class="bg-white/10 backdrop-blur-md flex-grow border-l-8 border-green-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 px-6 py-4 w-full md:w-5/12 lg:w-3/12">
        <!-- Title -->
        <h3 class="text-green-500 font-bold text-xl">
            ${d.column1}
        </h3>

        <!-- Subtitle -->
        <p class="text-green-300 font-thin text-sm pt-2">
            ${d.column2}
        </p>

        <!-- Download Button -->
        <a href="${d.column4}"
            class="mt-4 inline-block w-full text-center text-white bg-green-500 border border-green-500 rounded-lg py-2 px-4 transition-all duration-300 hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Download
        </a>
    </div>
</div>
          `;

                        document.getElementById('myProjectdownload').innerHTML += dataHTML;
                      



                    });
                });
        };
  document.getElementById('sharedownload').addEventListener('click', () => {
                            const msg = [{
                                "type": "text",
                                "text": "Hello, world"
                            }]
                            shareTargetPicker(msg)
                        });

        function sendText(text) {
            if (!liff.isInClient()) {
                shareTargetPicker(text);
            } else {
                sendflex(text);
            }
        }
        function sendflex(text) {
            liff.sendMessages(text).then(function () {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'ส่งเข้าแชทเรียบร้อย',
                    showConfirmButton: false,
                    timer: 1500
                })


            })
        }
        function shareTargetPicker(text) {
            liff.shareTargetPicker(text).then(function (res) {
                if (res) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'ส่งเข้าแชทเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                    })

                } else {

                    console.log("TargetPicker was closed!");
                }
            }).catch(function (error) {
                window.alert("Failed to send message " + error);
            });
        }