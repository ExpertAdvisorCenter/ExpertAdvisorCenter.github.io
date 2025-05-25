 const getDatacomment = () => {
            $('#loading-overlayc').removeClass('hidden');
            fetch('https://script.google.com/macros/s/AKfycbxv-OpVKZTHwM3YVzLOzaQk_nagD8Kl_NqQ0-4QMIrbQSZJfrCCchSro3RB-RNxskC69Q/exec?sheetName=comment')
                .then(function (response) {
                    $('#loading-overlayc').addClass('hidden');
                    return response.json();
                })
                .then(function (data) {
                    data.filter((d, addData) => {
                        let dataHTML = '';
                        addData++;

                        dataHTML += `
                        
                        
                          <section class="bg-black py-8">
                          
  <div class="container mx-auto px-4">
    <!-- Title -->
    <h2 class="text-2xl text-white font-bold mb-4">Customer Comments</h2>

    <!-- Comments Section -->
    <div class="space-y-4">
        <!-- Comment 1 -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <!-- User Info -->
            <div class="flex items-center mb-4">
                <img src="${d.column3}" alt="User Avatar" class="w-10 h-10 rounded-full mr-3 border-2 border-green-500"> <!-- pict -->
                <div>
                    <h3 class="font-semibold text-white">${d.column2}</h3> <!-- name -->
                    <p class="text-sm text-gray-400">${d.column4}</p> <!-- date -->
                </div>
            </div>

            <!-- Comment Text -->
            <p class="text-gray-300">${d.column7}</p> <!-- comment -->
        </div>
    </div>
</div>
    
          `;

                        document.getElementById('myProjectcomment').innerHTML += dataHTML;
                      



                    });
                });
        };
  document.getElementById('share').addEventListener('click', () => {
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

