const validateUsername = (event) => {
  const username = $("#username").val().trim();
  if (username) {
    $("#require-username-error").css("display", "none");

    $.ajax({
      url: '/api/check-username/' + username
    })
      .done(result => {
        if (result.success) {
          $("#username-error").css("display", result.result ? "none" : "block");
        }
        else {
          alert('An error has occured. Please try again later');
        }
      })
      .fail(err => {
        console.error(err);
        alert('An error has occured. Please try again later');
      })
    return true;
  }
  else {
    $("#require-username-error").css("display", "block");
    $("#username-error").css("display", "none");
    return false;
  }
}

const validateEmail = (event) => {
  const email = $("#email").val().trim();
  if (email) {
    $("#require-email-error").css("display", "none");

    $.ajax({
      url: '/api/check-email/' + email
    })
      .done(result => {
        if (result.success) {
          $("#email-error").css("display", result.result ? "none" : "block");
        }
        else {
          alert('An error has occured. Please try again later');
        }
      })
      .fail(err => {
        console.error(err);
        alert('An error has occured. Please try again later');
      })

    return true;
  }
  else {
    $("#require-email-error").css("display", "block");
    $("#email-error").css("display", "none");
    return false;
  }
}

$("#username").on('blur', validateUsername);
$("#email").on('blur', validateEmail);

$("form").on('submit', (event) => {
  if(
    !validateUsername()
    || !validateEmail()
    || !$("#checkbox").is(':checked')
  ){
    event.preventDefault();
  }
});