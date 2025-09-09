$(function() {
  // HOMEPAGE HERO 
  $("#hero").hide().fadeIn(1000);

  

  /* ACCORDIONS */
  if ($("#home-accordion").length) {
    $("#home-accordion").accordion({
      heightStyle: "content"
    });
  }

  if ($("#contact-faq").length) {
    $("#contact-faq").accordion({
      heightStyle: "content",
      collapsible: true,
      active: false
    });
  }

  /* DATEPICKERS */
  if ($("#reservation").length) {
    $("#reservation").datepicker({
      minDate: 0
    });
  }

  if ($("#contact-date").length) {
    $("#contact-date").datepicker({
      minDate: 0,
      dateFormat: "dd M yy"
    });
  }

  /* TABS */
  if ($("#menu-tabs").length) {
    $("#menu-tabs").tabs();
  }

  /* CONTACT FORM DIALOG + VALIDATION */
  if ($("#contact-dialog").length) {
    $("#contact-dialog").dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      width: 500,
      buttons: {
        "OK": function() {
          $(this).dialog("close");
          $("#contact-form")[0].reset();
        }
      }
    });
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function showError(id, msg) {
    $(id).text(msg).show();
  }

  function clearErrors() {
    $(".field-error").hide().text("");
  }

  $("#contact-form").on("submit", function(e) {
    e.preventDefault();
    clearErrors();

    const name = $("#contact-name").val().trim();
    const email = $("#contact-email").val().trim();
    const message = $("#contact-message").val().trim();

    let valid = true;
    if (!name) {
      showError("#err-name", "Please enter your name.");
      valid = false;
    }
    if (!email || !isEmail(email)) {
      showError("#err-email", "Please enter a valid email.");
      valid = false;
    }
    if (!message) {
      showError("#err-message", "Please enter a message.");
      valid = false;
    }

    if (!valid) return;

    $("#contact-dialog").dialog("open");
  });

  /* BXSLIDER GALLERY */

  if ($(".bxslider").length && $.fn.bxSlider) {
    $(".bxslider").bxSlider({
      mode: "horizontal",
      auto: true,
      controls: true,
      pager: true,
      adaptiveHeight: true,
      speed: 500,
      pause: 4000,
      nextText: ">",  
      prevText: "<"
    });
  }

  if ($("#book-slider").length && $.fn.bxSlider) {
    $("#book-slider .book-bxslider").bxSlider({
      mode: "horizontal",
      auto: true,
      controls: true,
      pager: false,
      adaptiveHeight: false,
      speed: 500,
      pause: 4000,
      minSlides: 1,
      maxSlides: 3,
      moveSlides: 1,
      slideWidth: 260, // adjust based on actual card width + padding
      slideMargin: 20,
      nextText: ">",
      prevText: "<",
      responsive: true
    });
}

  /* FOOTER YEAR */
  $("#yr").text(new Date().getFullYear());
});