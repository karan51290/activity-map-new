	var clicks = [];

	var clicks_index;
	// map_click is the sequence number of the button press. Based on this number we will toggle show/hide maps
	var map_click = 1;

	var elem_pos;

	var positions = [];
	
	var map_elem_top;

	var map_elem_left;

	var elem_id;

	var map_elem_id;
	
	var elem_height;

	var elem_width;

	var append_text;

	var str_len;

	$(document).ready(function(){
		var my_clicks;
		$('body *:not(div)').each(function(i,val){
				elem_id = $(this).attr("id");
				
				if(elem_id == undefined){
					elem_id = "elem_" + i;
					map_elem_id = "map_elem_"+i;
				}else{
					map_elem_id = "map_elem_" + elem_id + "_" + i ;					
				};
				$(this).attr("id",elem_id);	


				//test
				console.log(map_elem_id);

				elem_pos = $(this).offset();
				//elem_width = $(this).css("width");
				//elem_height = $(this).css("height");
				//map_elem_top = elem_pos.top + elem_height/2;
				//map_elem_left = elem_pos.left + elem_width/2;
				//append_text = "<div class='heatmap' "+"id='"+map_elem_id+"' style='position:absolute;top:"+map_elem_top+";left:"+map_elem_left+";' ></div>"
				append_text = "<div class='heatmap' "+"id='"+map_elem_id+"' style='position:absolute"+";' ></div>"
				
				console.log(append_text);
				$('body').append(append_text);

				clicks.push(0);
				positions.push(elem_pos);

				});

		$('.heatmap').css('opacity','0');	
		//$('.heatmap').css('display','none');	
		$('.heatmap').css('z-index','1');
		$('.heatmap').css('border-radius','40%');
		$('.heatmap').css('margin','0,0,0,0');
		$('.heatmap').css('text-align','center');
		$('.heatmap').css('font-weight','900');

	//This will add the SHOW MAPS button to top left corner	
		$('body').append("<button id= 'map_button' onclick = 'map(map_click)'>Show Map</button>");
		console.log("button added"); 
		$('#map_button').css('position','fixed');
		$('#map_button').css('top','0');
		$('#map_button').css('left','0');
		//$('#map_button').css('z-index','2');

		$('body *:not(div)').click(function(){
			register(this);
		});

	});

//function to register the number of clicks on each link
	function register(ele){

			elem_id = $(ele).attr("id");
			console.log(elem_id);
			//console.log(elem_id.substring(0,4));

			if(elem_id.substring(0,4) == "elem"){
				clicks_index = elem_id.substring(5,6);
				//console.log(clicks_index);
			}
			else{
				//search id of corresponding heatmap
				$(".heatmap").each(function(){
					map_elem_id = $(this).attr("id");
					str_len = map_elem_id.length;
			//		console.log(map_elem_id.substring(str_len-1,str_len));
					if(elem_id == map_elem_id.substring(9,str_len-2)){
						clicks_index = map_elem_id.substring(str_len-1,str_len);
			//			console.log(elem_id.substring(str_len-1,str_len));
					return false;
					};
				});
				console.log(clicks_index);
				//clicks_index = map_elem_id.substring(str_len-1,str_len);
			};

			clicks[clicks_index] += 1;
			console.log(clicks[clicks_index]);

		};

// function to show the number of clicks on the map
	function map_stats(){
		$('.heatmap').each(function(index,value){
			$(this).html(clicks[index]);	
		});
	}

//function to create the map
	function map(){
		//var positions = [];
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

//			$('a').each(function(index,value){
//Store location of each link in an array
//				positions.push($(this).offset());
//			});
			
	
			



			$('.heatmap').each(function(index,value){
				position = positions[index];
//Provide location of colored boxes using the array containing positions of links
				$(this).css(position);
// set color and size of div based on no. of clicks
				if(clicks[index]>5){
					$(this).css('background-color','red');
					$(this).css("height",clicks[index]*10);
					$(this).css("width",clicks[index]*10);
				}
				else if (clicks[index]>2){
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
			$("body *:not(.heatmap,#map_button,#map_stats_button)").fadeTo('slow',.4);
			$(".heatmap").fadeTo('slow',.6);
			
		}	
// If link is clicked 2nd time, map is removed from the page
		else{
			document.getElementById('map_button').innerHTML = "Show Map";
			$("#map_stats_button").remove();
			$("*").fadeTo('slow',1);
			$(".heatmap").css("display","none");		
			$(".heatmap").html("");	

		}
			map_click = map_click+1;
		

	}