$(function() {
  // Accordion
  $("#home-accordion").accordion({ heightStyle: "content" });

    // Slider - Home Page

    let $slides = $("#featured-slider img");
    let currentIndex = 0;
    let slideInterval;
    
    function showSlide(index) {
        $slides.fadeOut();
        $slides.eq(index).fadeIn();
        $(".slider-dot").removeClass("active");
        $(".slider-dot").eq(index).addClass("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % $slides.length;
        showSlide(currentIndex);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    $slides.hide().eq(0).show();

    // Add dots
    let $dotsContainer = $("<div class='slider-dots'></div>");
    $slides.each(function(i) {
        let $dot = $("<span class='slider-dot'></span>");
        if (i === 0) $dot.addClass("active");
        $dot.on("click", function() {
        currentIndex = i;
        showSlide(currentIndex);
        });
        $dotsContainer.append($dot);
    });
    $("#featured-slider").after($dotsContainer);

    // Start auto sliding
    startSlider();

    // Pause on hover
    $("#featured-slider").hover(pauseSlider, startSlider);




  // Datepicker

  $("#reservation").datepicker({ minDate: 0 });
  $("#contact-date").datepicker({ minDate: 0 });

 
  // Tabs
 
  $("#menu-tabs").tabs();

 
  // // Gallery with navigation buttons
  
  // let $galleryItems = $(".gallery-item");
  // let galleryIndex = 0;

  // function showGallery(index) {
  //   $galleryItems.hide().eq(index).show();
  // }

  // // Initialize gallery
  // $galleryItems.hide().eq(0).show();

  // // Add navigation buttons
  // let $nav = $("<div class='gallery-nav'><button id='prev'>Prev</button><button id='next'>Next</button></div>");
  // $(".gallery").after($nav);

  // $("#prev").on("click", function() {
  //   galleryIndex = (galleryIndex - 1 + $galleryItems.length) % $galleryItems.length;
  //   showGallery(galleryIndex);
  // });

  // $("#next").on("click", function() {
  //   galleryIndex = (galleryIndex + 1) % $galleryItems.length;
  //   showGallery(galleryIndex);
  // });

  // // Click to open dialog
  // $galleryItems.on("click", function() {
  //   $("<div>").append($(this).clone()).dialog({
  //     modal: true,
  //     title: "Gallery Preview",
  //     width: 500,
  //     height: 400
  //   });
  // });

  // bxSlider Gallery

  $(".bxslider").bxSlider({
    mode: "fade",      
    captions: true,    
    auto: true,          
    pause: 4000,       
    speed: 600,         
    pager: true,           
    controls: true         
  });

  
 
  // Contact form validation
  $("#contact-form").on("submit", function(e){
    e.preventDefault();
    if($("#name").val() && $("#email").val()) {
      alert("Thank you! Your message has been sent.");
      $(this).trigger("reset");
    } else {
      alert("Please fill in the required fields.");
    }
  });



  // Animation menu for mobile
  $("#nav-toggle").on("change", function () {
    if (this.checked) {
      $("#main-menu").show("slide", { direction: "right" }, 400);
    } else {
      $("#main-menu").hide("slide", { direction: "right" }, 400);
    }
  });

  // Animation nav links
  $(".main-nav a").hover(
    function () {
      $(this).stop().animate({ color: "#8B5E3C" }, 300); // coffee brown
    },
    function () {
      $(this).stop().animate({ color: "#2C2A26" }, 300); // dark text
    }
  );

  // Effect header on scroll
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $(".site-header").addClass("scrolled", 300, "easeInOutQuad");
    } else {
      $(".site-header").removeClass("scrolled", 300, "easeInOutQuad");
    }
  });



  // Datepicker
  $("#contact-date").datepicker({
    minDate: 0,
    dateFormat: "dd M yy"
  });

  // FAQ accordion
  $("#contact-faq").accordion({
    heightStyle: "content",
    collapsible: true,
    active: false
  });

  // Confirmation dialog
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

  // Validation helpers
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  function showError(id, msg) {
    $(id).text(msg).show();
  }
  function clearErrors() {
    $(".field-error").hide().text("");
  }

  // Submit handler
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

    // Show dialog on success
    $("#contact-dialog").dialog("open");
  });

  // Footer year
  $("#yr").text(new Date().getFullYear());
});