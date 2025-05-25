const getdataonlyeaorder = (id) => {
            $('#loading-overlayg').removeClass('hidden');
            fetch('https://script.google.com/macros/s/AKfycbwVWFxdoLZk8v1qkodMiQVnRxLue_mzfm7Ap8iTsF2OJz7ZdTzlkCkZmVPVzC2aS1b40Q/exec?q=' + id)
                .then(function (response) {
                    $('#loading-overlayg').addClass('hidden');
                    return response.json();
                })
                .then(function (data) {
                    data.filter((d, addData) => {
                        let dataHTML = '';
                        addData++;

                        dataHTML += `
                          <center>
  <!-- Main Container -->
  <div class="xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center xl:w-1/3 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <!-- Your Item Section -->
    <div class="mr-6 xl:mr-10">
      <h2 class="text-green-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
        ${d.column10}
      </h2>
      <p class="text-green-300 text-sm xl:text-xl leading-5">
        Your Item
      </p>
    </div>   

    <!-- Date Order Section -->
    <div class="mr-6 xl:mr-10">
      <h2 class="text-green-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
        ${d.column5}
      </h2>
      <p class="text-green-300 text-sm xl:text-xl leading-5">
        Date Order
      </p>
    </div>

    <!-- Time Order Section -->
    <div>
      <h2 class="text-green-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
        ${d.column6}
      </h2>
      <p class="text-green-300 text-sm xl:text-xl leading-5">
        Time
      </p>
    </div>
  </div>

  <!-- Buttons Section -->
  <div class="w-full xl:w-2/3 flex-col md:flex-row justify-center xl:justify-end flex md:pl-6 mt-6">
    <div class="flex items-center justify-center xl:justify-start mt-1 md:mt-0 mb-5 md:mb-0">
      <!-- Link Button -->
      <div class="rounded-full bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300 text-green-400 text-sm px-6 py-2 flex justify-center items-center cursor-pointer">
        <a href="${d.column12}" class="text-green-400 hover:text-green-300 transition-colors duration-300">${d.column11}</a>
      </div>

      <!-- Status Button -->
      <div class="ml-5 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300 text-green-400 text-sm px-6 py-2 flex justify-center items-center">
        ${d.column8}
      </div>
    </div>
  </div>
</center>

          `;

                        document.getElementById('myProjectplaceorder').innerHTML += dataHTML; 
                      



                    });
                });
        };

