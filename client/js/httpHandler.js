(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

const fetcher = () => {
  $.ajax({
    url: 'http://127.0.0.1:3000',
    type: 'GET',
    success: function(direction) {
      SwimTeam.move(direction);
    },
    complete: () => {
      //setTimeout(fetcher, 500);
    }
  });
};
// setInterval(fetcher, 5000);
fetcher();

// const fetchBackground = () => {
//   $.ajax({
//     url: 'http://127.0.0.1:3000' + '/background.jpg',
//     type: 'GET',
//     success: function() {
//       window.location = window.location.href;
//     },

//   });
// };
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      },
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');

      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
