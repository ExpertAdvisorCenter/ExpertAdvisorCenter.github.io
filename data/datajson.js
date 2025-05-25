 const getData = () => {
            $('#loading-overlay').removeClass('hidden');
            fetch('https://script.google.com/macros/s/AKfycbxv-OpVKZTHwM3YVzLOzaQk_nagD8Kl_NqQ0-4QMIrbQSZJfrCCchSro3RB-RNxskC69Q/exec?sheetName=dashboardsignal')
                .then(function (response) {
                    $('#loading-overlay').addClass('hidden');
                    return response.json();
                })
                .then(function (data) {
                    data.filter((d, addData) => {
                        let dataHTML = '';
                        addData++;

                        dataHTML += `
                          <div class="min-h-screen bg-gradient-to-br from-green-900 to-teal-900 p-10 text-white">
    <!-- Header Section -->
    <div class="text-center mb-12">
        <div class="flex justify-center items-center gap-2">
            <span class="font-extrabold text-3xl md:text-4xl">${d.column1}</span>
            <svg class="w-8 h-8 text-green-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
        </div>
        <div class="mt-4">
            <span class="font-semibold text-sm text-green-200">Date</span>
            <span class="font-semibold text-sm text-green-200">${d.column6}</span>
        </div>
    </div>

    <!-- Stats Grid Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Position Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
            <span class="font-bold text-4xl text-green-300">${d.column2}</span>
            <span class="font-semibold text-sm text-green-200 mt-2 block">Position</span>
        </div>

        <!-- Price Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
            <span class="font-bold text-4xl text-teal-300">${d.column3}</span>
            <span class="font-semibold text-sm text-green-200 mt-2 block">Price</span>
        </div>

        <!-- Support Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
            <span class="font-bold text-4xl text-lime-300">${d.column4}</span>
            <span class="font-semibold text-sm text-green-200 mt-2 block">Support</span>
        </div>

        <!-- Resistant Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
            <span class="font-bold text-4xl text-emerald-300">${d.column5}</span>
            <span class="font-semibold text-sm text-green-200 mt-2 block">Resistant</span>
        </div>
    </div>
</div>
          `;

                        document.getElementById('myProject').innerHTML += dataHTML;
                      



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


 

