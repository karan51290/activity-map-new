	var clicks = [];	
	var positions = [];
	var link_id; 
	// map_click is the sequence number of the button press. This number will allow us to decide whether to show/hide maps
	var map_click = 1;
	var clickable = "body *:not(#map_button,map_stats_button)"

	$(document).ready(function(){
		var my_clicks;
		
		//Disable Links
		//$('a').click(function(e){
    	//	e.preventDefault();
    	//});

		$(clickable).each(function(i,val){
			$(this).attr("data-index",i);			
	//The number of clicks are randomly generated for each link in the following lines
			//console.log(my_clicks);
			clicks.push(0);
			positions.push(0);
			//console.log(i);
		});
	//This will add the SHOW MAPS button to top left corner	
		$('body').append("<button id= 'map_button' onclick = 'map(map_click)'>Show Map</button>");
		console.log("button added"); 
		$('#map_button').css('position','fixed');
		$('#map_button').css('top','0');
		$('#map_button').css('left','0');
		//$('#map_button').css('z-index','2');

		$(clickable).click(function(event){
			event.stopPropagation(); //prevent registering multiple events for a single click
			register(this);
		});



	});



//function to register the number of clicks on each link
	function register(ele){
			var id = $(ele).attr("data-index");
			clicks[id]+=1;
			console.log($(ele).attr("data-index"));
			console.log($(ele).attr("id"));
			console.log(clicks[id]);
		};

// function to show the number of clicks on the map
	function map_stats(){
		$('.heatmap').each(function(index,value){
			id = $(this).attr("data-index");
			$(this).html(clicks[id]);	
		});
	}

//function to create the map
	function map(){
		
		var position;	

		if(map_click%2!==0){
			//Add Button to Show Stats
			$('body').append("<button id= 'map_stats_button' onclick = 'map_stats()'>Show Number of clicks</button>");
			$('#map_stats_button').css('position','fixed');
			$('#map_stats_button').css('top','20px');
			$('#map_stats_button').css('left','0');
			//$('#map_stats_button').css('z-index','2');
			console.log("button added"); 

//Toggle Hide/Show Map
			document.getElementById('map_button').innerHTML = "Hide Map";

			$(clickable).each(function(index,value){
//Store location of each link in an array
				id = $(this).attr("data-index");
				positions[id] = $(this).offset();
				$('body').append("<div class='heatmap' data-index = '"+id+"'></div>");
			});
			
	
			$('.heatmap').css('opacity','0');	
			$('.heatmap').css('position','absolute');	
			$('.heatmap').css('z-index','2');
			$('.heatmap').css('border-radius','40%');
			$('.heatmap').css('margin','0,0,0,0');
			$('.heatmap').css('text-align','center');
			$('.heatmap').css('font-weight','900');



			$('.heatmap').each(function(index,value){
				id = $(this).attr("data-index");
				position = positions[id];
//Provide location of colored boxes using the array containing positions of links
				$(this).css(position);
// set color and size of div based on no. of clicks
				if(clicks[id]>25){
					$(this).css('background-color','red');
					$(this).css("height",clicks[index]*10);
					$(this).css("width",clicks[index]*10);
				}
				else if (clicks[id]>10){
					$(this).css('background-color','yellow');
					$(this).css("height",clicks[index]*10);
					$(this).css("width",clicks[index]*10);
				}
				else{
					$(this).css('background-color','blue');
					$(this).css("height",clicks[index]*10);
					$(this).css("width",clicks[index]*10);
				};	

			});


// Fade the webpage
			$("body *:not(.heatmap,#map_stats_button,#map_button)").fadeTo('slow',.4);
			$(".heatmap").fadeTo('slow',1);
			
		}	
// If link is clicked 2nd time, map is removed from the page
		else{
			document.getElementById('map_button').innerHTML = "Show Map";
			$(".heatmap").remove();		
			$("#map_stats_button").remove();
			$("*").fadeTo('slow',1);

		}
			map_click = map_click+1;
		

	}