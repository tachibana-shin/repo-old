!function () {
"use strict"
my(".gallery .project .section_1_gallery_grid img").each(function(i) {
	var el = my("<div class='carousel-item'>")
	 var img = my(this).clone()
	 my(img).addClass("d-block")
	 el.append(img)
	 my(this).parent().data("count", i)
	 my("#carousel > div").append(el)
	 
})

var carousel = new BSN.Carousel(my("#carousel")[0])
var modal = new BSN.Modal(my(".gallery .container .modal")[0])

my(".gallery .section_1_gallery_grid a").mclick(function (e) {
	e.preventDefault()
	
	modal.show()
	my("#carousel .active")
		.removeClass("active")
	var now = carousel.getActiveIndex()
	var to = my(this).data("count") - 0
	if ( now === to ) {
		return;
	} else if  ( (now < to ) ) {
		carousel.vars.direction = 'left';
	} else if  ( (now > to) ) {
		self.vars.direction = 'right';
	}

	carousel.vars.index = to;
	my("#carousel .carousel-item").eq(to).addClass("active")
	my("#carousel").trigger("slid.bs.carousel") 
})
my("#carousel").on("slid.bs.carousel", function () {
	var now = carousel.getActiveIndex()

	my(".gallery .container .modal .modal--content").html(my(".gallery .section_1_gallery_grid a").eq(now - 0).attr("title"))

})
// setup counting

my(".stats_info > .counter").each(function () {
	my(this).dataUser({
		count: this.innerText.trim(),
		speed: this.innerText.trim() / 200
	})
	.text("0")
})

my('<a href="#">&uarr;').css({
	"text-decoration": "none",
	"color": "#fff",
	"background-color": "#111",
	position: "fixed", zIndex: 9999,
	bottom: "1rem", right: "0.5rem",
	display: "block", width: "2.3em",
	height: "2.3em", margin: 0,
	fontSize: "1.2em", fontWeight: 600,
	textAlign: "center", lineHeight: "2.5em",
	opacity: .6,
	display: "none"
})
.appendTo("body")
.attr({
	class: "scroll",
	"data-goto": "0",
	id: "scroll-top"
})


my(document).scroll(function () {
	var y = my(this).scrollTop()
	var offY, offH
	
	if (y > 300) {
		my("#scroll-top").display("block")
	}
	else
		my("#scroll-top").display("none")
	my(".stats_info > .counter")
	.each(function () {
		offY = my(this).offset().top
		offH = parseFloat(my(this).innerHeight())


		if ((y <= offY && y + device.wh >= offY) || (y <= offY + offH && (device.wh + y) >= (offY + offH))) {
			counting(this)
		}
		else if (y <= 0)
			counting(this, false)
	})
})

function runCounting (el) {
	var e
	my(el).dataUser("counter-timeout", e = setTimeout(function () {
		if ((el.innerText - 0) == (my(el).dataUser("count") - 0))
			return
		runCounting(el)
		if (my(el).dataUser("count") - el.innerText >= 3)
			el.innerText = el.innerText - 0 + 3
		else
			el.innerText = el.innerText - 0 + (my(el).dataUser("count") - el.innerText)
		 
	}))
}

function counting (el, run) {
	if (run !== false && el.isCounting !== true) {
		runCounting(el)
		el.isCounting = true

	}

	else if (el.isCounting === true && run === false) {
		// hủy

		el.isCounting = false
		el.innerText = "0"
		clearTimeout(my(el).dataUser("counter-timeout"))
		
	}
}

[
	{ text: "Lorem ipsum dolor sit amet,Maecenas interdum magna quam egestas sem, ac scelerisque nisl nibh vel lacus. Proin eget gravida odio. Donec ullamcorper est eu accumsan cursus.", author: "Gretchen" },
	{ text: "Lorem ipsum dolor sit amet,Maecenas interdum magna quam egestas sem, ac scelerisque nisl nibh vel lacus. Proin eget gravida odio. Donec ullamcorper est eu accumsan cursus.", author: "Anne Marc" },
	{ text: "Lorem ipsum dolor sit amet,Maecenas interdum magna quam egestas sem, ac scelerisque nisl nibh vel lacus. Proin eget gravida odio. Donec ullamcorper est eu accumsan cursus.", author: "Harry Baker" }
]
.forEach(function (e, i) {
my("#carousel1 > .carousel-inner").append('\
	<div class="carousel-item ' + (i == 0 ? "active" : "") + '">\
		<div class="text-center text-uppercase">\
			<div>\
				<i class="fas fa-quote-left"></i>\
				<p>' + e.text + '</p>\
			</div>\
			<h6>' + e.author + '</h6>\
				<label>United States</label>\
		</div>\
	</div>'
)
})

new BSN.Carousel(my("#carousel1")[0])

skrollTop.init({
	duration: 1000,
	el: ".scroll"
})

my(".progress-one .progress-bar")
.each(function () {
	my(this).data("width", this.style.width).width(0)
	.closest(".progress-one")
	.on(my.fx.animationStart, function () {
		my(this).find(".progress-bar").css("width", function () {
		return my(this).data("width")
		})
		
	})
	
})

new WOW().init()

}(void 0)