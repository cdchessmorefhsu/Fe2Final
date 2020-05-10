 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	var slider = function() {
		$('.nonloop-block-3').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
	    smartSpeed: 700,
			stagePadding: 15,
	    margin: 20,
	    autoplay: true,
	    nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	    responsive:{
        600:{
        	margin: 20,
          items: 2
        },
        1000:{
        	margin: 20,
          items: 3
        },
        1200:{
        	margin: 20,
          items: 3
        }
	    }
		});
	};
	slider();


	var siteMenuClone = function() {

		$('<div class="site-mobile-menu"></div>').prependTo('.site-wrap');

		$('<div class="site-mobile-menu-header"></div>').prependTo('.site-mobile-menu');
		$('<div class="site-mobile-menu-close "></div>').prependTo('.site-mobile-menu-header');
		$('<div class="site-mobile-menu-logo"></div>').prependTo('.site-mobile-menu-header');

		$('<div class="site-mobile-menu-body"></div>').appendTo('.site-mobile-menu');

		

		$('.js-logo-clone').clone().appendTo('.site-mobile-menu-logo');

		$('<span class="ion-ios-close js-menu-toggle"></div>').prependTo('.site-mobile-menu-close');
		

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
				updateCost(e);
				
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
			updateCost(e);
		});
		
	};
	sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	siteSliderRange();


	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
	    type: 'image',
	    closeOnContentClick: true,
	    closeBtnInside: false,
	    fixedContentPos: true,
	    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	     gallery: {
	      enabled: true,
	      navigateByImgClick: true,
	      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	    },
	    image: {
	      verticalFit: true
	    },
	    zoom: {
	      enabled: true,
	      duration: 300 // don't foget to change the duration also in CSS
	    }
	  });

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	    disableOn: 700,
	    type: 'iframe',
	    mainClass: 'mfp-fade',
	    removalDelay: 160,
	    preloader: false,

	    fixedContentPos: false
	  });
	};
	siteMagnificPopup();

	var searchShow = function() {
		// alert();
		var searchWrap = $('.search-wrap');
		$('.js-search-open').on('click', function(e) {
			e.preventDefault();
			searchWrap.addClass('active');
			setTimeout(function() {
				searchWrap.find('.form-control').focus();
			}, 300);
		});
		$('.js-search-close').on('click', function(e) {
			e.preventDefault();
			searchWrap.removeClass('active');
		})
	};
	searchShow();

	//Cost of a case of juice concentrate
	const caseCost = 89;
	//This function fires whenever a + or - is clicked
	function updateCost(eventLoc)
	{
		switch(eventLoc.target["classList"][0])
		{
			case "AP":
				$("#APCost").html("$"+(eventLoc.target.form[1].value * 89)+".00");
				break;
			case "BE":
				$("#BECost").html("$"+(eventLoc.target.form[7].value * 89)+".00");
				break;
			case "BR":
				$("#BRCost").html("$"+(eventLoc.target.form[13].value * 89)+".00");
				break;
			case "CH":
				$("#CHCost").html("$"+(eventLoc.target.form[19].value * 89)+".00");
				break;
			case "CI":
				$("#CICost").html("$"+(eventLoc.target.form[25].value * 89)+".00");
				break;
			case "CA":
				$("#CACost").html("$"+(eventLoc.target.form[31].value * 89)+".00");
				break;
			case "FP":
				$("#FPCost").html("$"+(eventLoc.target.form[37].value * 89)+".00");
				break;
			case "GW":
				$("#GWCost").html("$"+(eventLoc.target.form[43].value * 89)+".00");
				break;
			case "OP":
				$("#OPCost").html("$"+(eventLoc.target.form[49].value * 89)+".00");
				break;
			case "OR":
				$("#ORCost").html("$"+(eventLoc.target.form[55].value * 89)+".00");
				break;
			case "PM":
				$("#PMCost").html("$"+(eventLoc.target.form[61].value * 89)+".00");
				break;
			case "SB":
				$("#SBCost").html("$"+(eventLoc.target.form[67].value * 89)+".00");
				break;
			case "SK":
				$("#SKCost").html("$"+(eventLoc.target.form[73].value * 89)+".00");
				break;
			case "TN":
				$("#TNCost").html("$"+(eventLoc.target.form[79].value * 89)+".00");
				break;
			case "WG":
				$("#WGCost").html("$"+(eventLoc.target.form[85].value * 89)+".00");
				break;
			default:
				alert("Error updating your order. Please try again.")
				break;
		}
		updateTotals();
	};

	//This variable must be outside updateTotals() or it will not function as intended
	var minBottles = 0;
	//This function updates the bottom row of the order table when updateCosts is called
	function updateTotals()
	{
		var bottles = bottleCount(); //Function bottleCount returns value for this cell in the table
		var tempBottles = bottles;
		var cases = caseCount(); //Function caseCount returns value for this cell in the table
		var grandTotal;
		$("#bottleCount").html(
			bottles
		)
		
		$("#caseCount").html(
			cases 
		)

		if((bottles % 6) == 0)
		{
			tempBottles = bottles/6;
			minBottles++;
			console.log("Minimum bottle cases: "+minBottles)
			grandTotal = (tempBottles + cases) * 89;
			$("#costTotal").html(
				"$" + grandTotal +".00"

			)
		}
		else if (minBottles > 0 && (bottles % 6) !=0)
		{
			console.log("Hit ELSE IF")
			grandTotal = (minBottles + cases) * 89;
			$("#costTotal").html(
				"$" + grandTotal +".00"

			)
			return;
		}
		else 
		{
			grandTotal = (minBottles + cases) * 89;
			$("#costTotal").html(
				"$" + grandTotal +".00"

			)
		}
	}
	
	function bottleCount()
	{
		var total = 0;
		var list = $('tr td:nth-child(3)')
		for (var x in list)
		{
			if(x < 15)
			{
				//Have to access the value of the + and - input area like this because of how the template has things laid out
				//Maybe there's a better way...There's probably a better way...
				total +=parseInt(list[x].childNodes[1].children[1].value);
			}
		}
		if((total % 6))
		{
			$("#bottleCount").css("color","red");
		}
		else
		{
			$("#bottleCount").css("color","black");
		}
		return total;
	}

	function caseCount()
	{
		var total = 0;
		var list = $('tr td:nth-child(2)')
		for (var x in list)
		{
			if(x < 15)
			{
				//Have to access the value of the + and - input area like this because of how the template has things laid out
				//Maybe there's a better way...There's probably a better way...
				total +=parseInt(list[x].childNodes[1].children[1].value);
			}
		}
		return total;
	}
});

