function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
};

//https://drive.google.com/open?id=1KLKtZfdMT5t2wJRlD3C4RCPNntXkgUOk

function claimChart(){
    console.log('get claim chart')

    var file = $('#file-input')[0].files[0];
    file.originalname = file.name;
    file.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    var data = new FormData();
    data.append('file', file);


    $.ajax({
        url: 'https://fenix.law:7483/chart',
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        success: function(res){
        	console.log(res);
    		var file_name = res.split('temp/')[1]
    		var download_url = 'https://fenix.law:7483/temp/' + file_name;
			downloadURL(download_url, file_name, 'docx', false);
        }
    });
}

function downloadURL(url, file_name){
    console.log('downloading file: ' + url);
    var download_link = document.createElement("a");
    download_link.href = url.replace('\/public', '');
    download_link.click();
}