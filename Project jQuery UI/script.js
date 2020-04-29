$( function() {
  // Accordion
    $( "#accordion" ).accordion({
      heightStyle: "content",
      animate: 400,
      collapsible: true
    });
  // Tabs
    $( "#tabs" ).tabs();
  // Dialog
  var dialog, form,

  emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  name = $( "#name" ),
  email = $( "#email" ),
  password = $( "#password" ),
  allFields = $( [] ).add( name ).add( email ).add( password ),
  tips = $( ".validateTips" );

function updateTips( t ) {
  tips
    .text( t )
    .addClass( "ui-state-highlight" );
  setTimeout(function() {
    tips.removeClass( "ui-state-highlight", 1500 );
  }, 500 );
}

function checkLength( o, n, min, max ) {
  if ( o.val().length > max || o.val().length < min ) {
    o.addClass( "ui-state-error" );
    updateTips( "Length of " + n + " must be between " +
      min + " and " + max + "." );
    return false;
  } else {
    return true;
  }
}

function checkRegexp( o, regexp, n ) {
  if ( !( regexp.test( o.val() ) ) ) {
    o.addClass( "ui-state-error" );
    updateTips( n );
    return false;
  } else {
    return true;
  }
}

// Global delete id
var deleteId = 3;

function addUser() {
  var valid = true;
  allFields.removeClass( "ui-state-error" );

  valid = valid && checkLength( name, "username", 3, 16 );
  valid = valid && checkLength( email, "email", 6, 80 );
  valid = valid && checkLength( password, "password", 5, 16 );

  valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
  valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
  valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

  
  $( "#users tbody tr" ).removeAttr('class');
  
  if ( valid ) {
    $( "#users tbody" ).append( "<tr id='"+deleteId+"' class='hiddenUser'>" +
      "<td>" + name.val() + "</td>" +
      "<td>" + email.val() + "</td>" +
      "<td>" + password.val() + "</td>" +
      "<td><button id="+deleteId+" onclick='deleteRecord(this.id)'>Delete</button></td>" +
    "</tr>" );
    deleteId=deleteId+1;
    dialog.dialog( "close" );
  }
  
  checkboxColor();checkboxColor();
  return valid;
}

dialog = $( "#dialog-form" ).dialog({
  autoOpen: false,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  },
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    "Create an account": addUser,
    Cancel: function() {
      dialog.dialog( "close" );
    }
  },
  close: function() {
    form[ 0 ].reset();
    allFields.removeClass( "ui-state-error" );
  }
});

form = dialog.find( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  addUser();
});

$( "#create-user" ).button().on( "click", function() {
  dialog.dialog( "open" );
}); 

// controlgroup
$( ".controlgroup" ).controlgroup();

// autocomplete
var voivodeship = [
"Wielkopolskie",
"Kujawsko-pomorskie",
"Małopolskie",
"Łódzkie",
"Dolnośląskie",
"Lubelskie",
"Lubuskie",
"Mazowieckie",
"Opolskie",
"Podlaskie",
"Pomorskie",
"Śląskie",
"Podkarpackie",
"Świętokrzyskie",
"Warmińsko-Mazurskie",
"Zachodniopomorskie"
];
$( "#currency-controlgroup" ).autocomplete({
  source: voivodeship
});

// datepicker
$( "#datepicker1" ).datepicker();
$( "#datepicker2" ).datepicker();

// check the correct dates
function getDate(datepicker){
  val = $(datepicker).val();
  val1 = Date.parse(val);
  if (isNaN(val1)==true && val!==''){
     alert("error")
  }
  else{
     return val1;
  }
};

$( "#error-dialog" ).dialog({
  autoOpen: false,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  }
}).parent().addClass("ui-state-error");

$("#bookNow").click(function(){
  if(getDate($( "#datepicker1" )) > getDate($( "#datepicker2" )))
    $( "#error-dialog" ).dialog( "open" );
});

// Example form
// Selectmenu
$( "#speed" ).selectmenu();
// Slider
$( "#slider-range-min" ).slider({
  range: "min",
  value: 2015,
  min: 1950,
  max: 2020,
  slide: function( event, ui ) {
    $( "#year" ).val( ui.value );
  }
});
$( "#year" ).val( $( "#slider-range-min" ).slider( "value" ) );

// Spiner
$( "#currency" ).on( "change", function() {
  $( "#spinner" ).spinner( "option", "culture", $( this ).val() );
});

$( "#spinner" ).spinner({
  min: 1000,
  max: 1000000,
  step: 100,
  start: 10000,
  numberFormat: "C"
});

// Tooltip
$( "#brand" ).tooltip({
  position: {
    my: "center bottom",
    at: "center top-10",
    collision: "none"
 }
});

//confirm date
$("#dialog-confirm").dialog({
  autoOpen: false,
  resizable: false,
  height: "auto",
  width: 400,
  modal: true,
  buttons: {
    "Confirm": function() {
      $( this ).dialog( "close" );
    },
    Cancel: function() {
      $( this ).dialog( "close" );
    }
  }
});

$("#form-done").click(function(e){
  e.preventDefault();
  $(".from-details").empty();
  $(".from-details").append("<p>Brand: " + $("#brand").val()+"</p>");
  $(".from-details").append("<p>Speed: " + $("#speed").val()+"</p>");
  $(".from-details").append("<p>Year: "  + $("#year").val()+"</p>");
  $(".from-details").append("<p>Vehicle price: "+ $("#spinner").val()+"</p>");
  $("#dialog-confirm").dialog("open");
});

///////////////////////// Add new tab /////////////////
var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 4;
 
    var tabs = $( "#tabs" ).tabs();
 
    var dialogTabs = $( "#dialog-tabs" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Add: function() {
          addTab();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    var form = dialogTabs.find( "form" ).on( "submit", function( event ) {
      addTab();
      dialogTabs.dialog( "close" );
      event.preventDefault();
    });
 
    function addTab() {
      var label = tabTitle.val() || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
 
      tabs.find( ".ui-tabs-nav" ).append( li );
      tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
      tabs.tabs( "refresh" );
      tabCounter++;
      console.log(tabCounter);
    }
 
    $( "#add_tab" )
      .button()
      .on( "click", function() {
        dialogTabs.dialog( "open" );
      });
 
    tabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.on( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });

    ///// show effect /////

   function runEffect() {
    var selectedEffect = $( "#effectTypes" ).val();

    var options = {};
    if ( selectedEffect === "scale" ) {
      options = { percent: 50 };
    } else if ( selectedEffect === "size" ) {
      options = { to: { width: 280, height: 185 } };
    }
    $( ".hiddenUser" ).show( selectedEffect, options, 1000, callback );
  };

  function callback() {
    setTimeout(function() {
      $( ".hiddenUser:visible" ).removeAttr( "style" ).fadeOut();
    }, 2000 );
  };

  $( "#button" ).on( "click", function() {
    runEffect();
  });
  $( ".hiddenUser" ).hide();


////////// Add calendar and events ////////////////
  $("#calendar-container").simpleCalendar({
    fixedStartDay: false,
    disableEmptyDetails: true,
    events: [
      // generate new event after tomorrow for one hour
      {
        startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
        endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
        summary: 'Visit of the Eiffel Tower for free'
      },
      // generate new event for yesterday at noon
      {
        startDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 12, 0)).toISOString(),
        endDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 11)).getTime(),
        summary: 'Restaurant Tarasy 50% discount'
      },
      // generate new event for the last two days
      {
        startDate: new Date(new Date().setHours(new Date().getHours() - 48)).toISOString(),
        endDate: new Date(new Date().setHours(new Date().getHours() - 24)).getTime(),
        summary: 'Visit of the Big Ben for free'
      }
    ],
  });

//////////////// Links /////////////////
$('.share-button').simpleSocialShare();

/////////////// Rate //////////////////
$.ratePicker("#rating-1");
$.ratePicker("#rating-2");
$.ratePicker("#rating-3");

////////////// News /////////////////
$('.demo1').easyTicker({
		direction: 'up',
		easing: 'swing'
	});
	
	
	
	$('.demo3').easyTicker({
		visible: 1,
		interval: 4000
	});
	
	
	$('.demo5').easyTicker({
		direction: 'up',
		visible: 3,
		interval: 2500,
		controls: {
			up: '.btnUp',
			down: '.btnDown',
			toggle: '.btnToggle'
		}
  });
  
////// drag and down ///////////////
$( "#sortable1, #sortable2" ).sortable({
  placeholder: "ui-state-highlight",
  connectWith: ".connectedSortable"
}).disableSelection();

$( "#sortable" ).sortable({
  placeholder: "ui-state-highlight"
});
    $( "#sortable" ).disableSelection();

} );

//// Change color rows ////
function checkboxColor(){
  var checkboxColor =  $("#changeColor");
  if(checkboxColor.prop('checked') == false ){
    $("#users tbody tr:nth-child(2n+1)").css({"background-color": "#ccc"});
    $("#users tbody tr:nth-child(2n)").css({"background-color": "#eee"});
  }
  else{
    $("#users tbody tr:nth-child(2n)").css({"background-color": "#ccc"});
    $("#users tbody tr:nth-child(2n+1)").css({"background-color": "#eee"});
  }

  $("#users tbody tr").hover(function(){
    $(this).css("background-color", "#1c94c4");
    }, function(){
   
      if(checkboxColor.prop('checked') == false ){
        $("#users tbody tr:nth-child(2n+1)").css({"background-color": "#ccc"});
        $("#users tbody tr:nth-child(2n)").css({"background-color": "#eee"});
      }
      else{
        $("#users tbody tr:nth-child(2n)").css({"background-color": "#ccc"});
        $("#users tbody tr:nth-child(2n+1)").css({"background-color": "#eee"});
      }
  });
}
 
////// delete record /////
function deleteRecord(id){
  $("#"+id+"").hide('slow', function(){ $("#"+id+"").remove(); });
  checkboxColor();checkboxColor();
}
