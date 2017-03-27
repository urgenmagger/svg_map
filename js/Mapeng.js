$(function(){
	var p = Raphael ('map');
	var moren = p.path(more).attr({stroke: 'none',fill:"#1CAAB8",
	'stroke-width': 2,}),
	conturdl = p.path(pathlug).attr({
			fill: '#B4C889',
			stroke:"#fff",
			'stroke-width': 1
		}),
	conturdd = p.path(pathdon).attr({
			fill: '#A2C871',
			stroke:"#fff",
		});
	conturRussia = p.path(pathRussia).attr({
			fill: '#DEE3E7',
			stroke:"none",
		});

	var mystring = JSON.stringify(objPathwar);
	var myo = JSON.parse(mystring);
	var mdd = [];
	var myBd = [];
	for (var md in myo) {
			mdd.push(myo[md].myDates);
			myBd.push(myo[md].myPath);
		};
// setting datapicer
	function severalDates(date){
		var dat = $.datepicker.formatDate("dd.mm.yy", date);
			if ($.inArray(dat, mdd) != -1) {
			return [true, "yellow"];
			}
			else {
			return [false,"","нет данных"];
			}
	};


	var MEGApath = p.path("").attr({"fill":"#F97F02",stroke:'none',"opacity":0.5});
			//transfer dates in raphael
	function selectSelect(dateText,inst) {
		var dates = mdd;
		var currents = dateText;
		var st;
		var myIndex;
		for (var i = 0; i < dates.length; i++) {
			if (dateText == dates[i]) {
				st = dates[i];
				myIndex = i;
			}
		}
		var currents = myIndex;
		var lf_01 = myBd[currents];
		var lf_02 = myBd[currents+1];
		MEGApath.attr({ path : lf_01 });
	};


		$.datepicker.setDefaults(
			$.datepicker.regional[ "ru" ]
		);
		$( "#datepicker" ).datepicker({
			beforeShowDay: severalDates,
			changeYear: true,
			minDate: new Date(2014, 1 - 1, 1),
			//defaultDate: new Date(2014, 11 - 1, 1),
			maxDate: '+1y',
			dateFormat: "dd.mm.yy",
			onSelect:selectSelect,
			});

	//++++++++++ static elements ++++++++++++
//-----------------------style static elements-------------------------
	var raionStyle = {stroke: '#fff','stroke-width': 1,opacity:"0.5"},
	kalmiusStyle = {stroke: '#297C97','stroke-width': 2,},
	kalmiusStyle01 = {stroke: '#297C97','stroke-width': 0.5,},
	cityStyle = {fill: '#768244',cursor: 'pointer',stroke: 'none'},
	cityUkStyle = {fill: '#4C6E31',stroke: 'none'},
	townsStyle = {fill: '#800000',cursor: 'pointer',stroke: 'none'},
	townsTextStyle = {fill: '#2F2F2F',"font-size": 10},
	townsTextmin = {fill: '#2F2F2F',"font-size": 8,"font-style": "italic"},
	townsTopStyle = {fill: '#74756e', cursor: 'pointer',stroke: 'none'},
	jdStyleone = {fill: 'none', cursor: 'pointer',stroke: '#000','stroke-width': 2,opacity:"0.5"},
	jdStyletwo = {fill: 'none', cursor: 'pointer',stroke: '#fff','stroke-width': 2,
"stroke-dasharray":"-",opacity:"0.7"},
	topLugStyle = {fill: '#D96826', cursor: 'pointer',stroke: 'none'},
	hide = {opacity:"0"},
	topavto = {fill: 'none','stroke-width': 2,stroke: '#F3FE1B'},
	botavto = {fill: 'none','stroke-width': 3,stroke: '#808F26'},
	batr = {stroke:'#66D0B2',cursor: 'pointer',fill:"#38454D",'stroke-width': 2,},
	batrS = {stroke:'#66D0B2',cursor: 'pointer',fill:"#74756e",'stroke-width': 2,},
	kppStyle = {fill: '#C60001',stroke: 'none'};

//-----------------------drawing static elements-------------------------
	var kalmius = p.path(kalm).attr(kalmiusStyle);
	var kalmius01 = p.path(kalm01).attr(kalmiusStyle01);
	var seversRiver = p.path(severs).attr(kalmiusStyle);
	var staticsRect = p.rect(1,1,1,1).attr({fill:"white","opacity":0});
	//--------------------подсветка крупных городов
	$.getJSON("js/City.json", function(obj){
	$.each(obj, function(key,value){
		var allCity = p.path(value.myPath).attr(cityStyle).insertBefore(staticsRect);
		allCity.hover(function(){
			this.animate({
				fill: '#D0FF00'
			}, 300);
		}, function(){
			this.animate({
				fill: "#768244"
			}, 300);
		}).click(function(){
			var tips = this.getBBox(0);
			$('#map').next('.tips').remove();
			$('#map').after($('<div />').addClass('tips'));
			$('.tips')
			.html(value.nameCity)
			.css({
				left: tips.x+(tips.width/2)-30,
				top: tips.y+(tips.height/2)-10
			})
			.fadeIn();
		}).mouseout(function(){
			$('.tips').hide();
		});
	})
});

	var statisRect = p.rect(1,1,1,1).attr({fill:"white","opacity":0});
	var avtostring = JSON.stringify(objavto);
	var myavto = JSON.parse(avtostring);
	for (var av in myavto) {
			var jdone = p.path(myavto[av].myPath).attr(botavto);
			var jdone01 = p.path(myavto[av].myPath).attr(topavto);
		};

	for (var town in townsmin) {
	var objTowns = p.circle(townsmin[town].x,townsmin[town].y,2).attr(townsStyle).toFront();
	var objText = p.text(townsmin[town].xt, townsmin[town].yt, townsmin[town].name).attr(townsTextmin);
		};
	for (var town in townsmax) {
		//var objTowns = p.circle(townsmax[town].x,townsmax[town].y,2).attr(townsStyle);
		var objText = p.text(townsmax[town].xt, townsmax[town].yt, townsmax[town].name).attr(townsTextStyle).toFront();
		};

	for (var town in townsL) {
		var objTowns = p.circle(townsL[town].x,townsL[town].y,2).attr(townsStyle);
		var objText = p.text(townsL[town].xt, townsL[town].yt, townsL[town].name).attr(townsTextStyle);
		};
	for (var town in townskpp) {
		// var objTowns = p.rect(townskpp[town].x-4,townskpp[town].y-2,4,4).attr(kppStyle);
		var objText = p.text(townskpp[town].xt, townskpp[town].y-10, townskpp[town].name).attr(townsTextStyle);
		};
	for (var town in townsmaxUkRus) {
		//var objTowns = p.circle(townsmaxUkRus[town].x,townsmaxUkRus[town].y,2).attr(townsStyle);
		var objText = p.text(townsmaxUkRus[town].xt, townsmaxUkRus[town].yt, townsmaxUkRus[town].name).attr(townsTextStyle);
		};
	for (var town in townsminUk) {
		var objTowns = p.circle(townsminUk[town].x,townsminUk[town].y,2).attr(townsStyle);
		var objText = p.text(townsminUk[town].xt, townsminUk[town].yt, townsminUk[town].name).attr(townsTextmin);
		};
	var statis = p.rect(2,2,2,2).attr({fill:"white","opacity":0});

		//light kpp
	var bkpp = p.rect(20,90,90,30,20).attr(batrS).insertBefore(statis);
	var textButton = p.text(68,105,"подсветить\nкпп в РФ").attr({fill:"white"});
	var button03 = p.rect(20,90,90,30,20).attr({opacity:"0",fill:"white",cursor: 'pointer'});
	button03.click(function() {
	for (var tt in circlekpp) {
		var des = circlekpp[tt];
		des.animate({
			"25%": {
			fill: '#FECB02'
			},
			"50%": {
			fill: '#E7EDEB'
			},
			"75%": {
			fill: "#FECB02"
			},
			"100%": {
			fill: "#C60001"
			}
		}, 1000)
	}
	});

			//----------------show kppUK
	var mykpp = JSON.stringify(kppUK);
	var kppUKr = JSON.parse(mykpp);
	var circlekppUK = [];
	var pointKPP = [];
	var arr = [];
	var butH = p.rect(20,50,90,30,20).attr(batrS),
	textHUK = p.text(68,65,"Скрыть\nпп в Украину").attr({fill:"white"}),
	butS = p.rect(20,50,90,30,20).attr(batr),
	textSUK = p.text(68,65,"Показать\nпп в Украину").attr({fill:"white"}),
	hMaskUK = p.rect(20,50,90,30,20).attr({opacity:"0",fill:"green",cursor: 'pointer'}),
	sMaskUK = p.rect(20,50,90,30,20).attr({opacity:"0",fill:"red",cursor: 'pointer'});

	sMaskUK.click(function(){
	this.hide();
	butS.hide();
	butH.show();
	textHUK.show();
	textSUK.hide();
	hMaskUK.show();
	for (var keykpp in kppUKr) {
		pointKPP[keykpp] = p.circle(kppUKr[keykpp].x,kppUKr[keykpp].y,2).attr({fill: '#000',stroke: 'none'});
		circlekppUK[keykpp] = p.circle(kppUKr[keykpp].x,kppUKr[keykpp].y,5).attr({fill: '#FE7407','stroke-width': 2,stroke: '#fff',cursor:"pointer",opacity:"0.9"});


		arr[circlekppUK[keykpp].id] = keykpp;
		circlekppUK[keykpp].animate({
			"25%": {
			fill: '#FECB02'
			},
			"50%": {
			fill: '#E7EDEB'
			},
			"75%": {
			fill: "#FECB02"
			},
			"100%": {
			fill: "#FE7407"
			}
		}, 1000).click(function(){
			var point = this.getBBox(0);
			$('#map').next('.point').remove();
			$('#map').after($('<div />').addClass('point'));
			$('.point')
			.html(kppUKr[arr[this.id]].name + " | "+"статус: "+kppUKr[arr[this.id]].status)
			.css({
				left: point.x+(point.width/2)-60,
				top: point.y+(point.height/2)-20
			})
			.fadeIn();
		}).mouseout(function(){
	$('.point').hide();
	});
		};
	});

	hMaskUK.click(function(){
	this.hide();
	butH.hide();
	butS.show();
	textHUK.hide();
	textSUK.show();
	sMaskUK.show();
	for( var keykpp in circlekppUK){
		circlekppUK[keykpp].hide();
		pointKPP[keykpp].hide();

		}
	});
//---------------End kppUK




//############----------menu
	var jdstring = JSON.stringify(objjd);
	var myjd = JSON.parse(jdstring);
	var myarrjdTop = [];
	var myarrjd = [];
	var buttonH = p.rect(20,130,90,30,20).attr(batrS),
	textH = p.text(68,143,"Скрыть\nжд дорогу").attr({fill:"white"}),
	buttonS = p.rect(20,130,90,30,20).attr(batr),
	textS = p.text(68,143,"Показать\nжд дорогу").attr({fill:"white"}),
	hMask = p.rect(20,130,90,30,20).attr({opacity:"0",fill:"green",cursor: 'pointer'}),
	sMask = p.rect(20,130,90,30,20).attr({opacity:"0",fill:"red",cursor: 'pointer'});
		//draw jd
	sMask.click(function(){
	this.hide();
	buttonS.hide();
	buttonH.show();
	textH.show();
	textS.hide();
	hMask.show();
	for (var md in myjd) {
		myarrjdTop[md] = p.path(myjd[md].myPath).attr(jdStyleone).insertBefore(statisRect);
		myarrjd[md] = p.path(myjd[md].myPath).attr(jdStyletwo).insertBefore(statisRect);
		};
	});
		//hide jd
	hMask.click(function(){
	this.hide();
	buttonH.hide();
	buttonS.show();
	textH.hide();
	textS.show();
	sMask.show();
	for( var tt in myarrjdTop,myarrjd){
		myarrjdTop[tt].hide();
		myarrjd[tt].hide();
		}
	});

	var circlekpp = [];
	for (var circle in townskpp) {
	  circlekpp[circle] = p.rect(townskpp[circle].x-4, townskpp[circle].y-1, 5,5).attr(kppStyle);
	};
});
