const Home = {
	template: `
<div>
	<p class="font-bold"> Char Update App </p>
<svg width="2em" height="2em" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" v-if="!status">
    <!-- created 04/03/2020 by Nguyen Thanh -->

    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Group-3" sketch:type="MSLayerGroup" fill="#000">
            <rect fill-opacity="0.86" sketch:type="MSShapeGroup" transform="translate(29.712675, 11.244699) rotate(-120.000000) translate(-29.712675, -11.244699) " x="28.2126745" y="6.67617143" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.44" sketch:type="MSShapeGroup" transform="translate(6.553148, 24.755301) rotate(-120.000000) translate(-6.553148, -24.755301) " x="5.05314826" y="20.1867727" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.93" sketch:type="MSShapeGroup" transform="translate(24.792181, 6.345161) rotate(-150.000000) translate(-24.792181, -6.345161) " x="23.2921811" y="1.77663341" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.51" sketch:type="MSShapeGroup" transform="translate(11.473642, 29.654839) rotate(-150.000000) translate(-11.473642, -29.654839) " x="9.97364166" y="25.0863108" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.23" sketch:type="MSShapeGroup" transform="translate(11.394713, 6.390847) rotate(-210.000000) translate(-11.394713, -6.390847) " x="9.89471277" y="1.82231869" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.65" sketch:type="MSShapeGroup" transform="translate(24.871110, 29.609153) rotate(-210.000000) translate(-24.871110, -29.609153) " x="23.37111" y="25.0406255" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.3" sketch:type="MSShapeGroup" transform="translate(6.507579, 11.323829) rotate(-240.000000) translate(-6.507579, -11.323829) " x="5.00757864" y="6.75530065" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.72" sketch:type="MSShapeGroup" transform="translate(29.758244, 24.676171) rotate(-240.000000) translate(-29.758244, -24.676171) " x="28.2582441" y="20.1076435" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.37" sketch:type="MSShapeGroup" transform="translate(4.735443, 18.045685) rotate(-270.000000) translate(-4.735443, -18.045685) " x="3.23544304" y="13.4771574" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.79" sketch:type="MSShapeGroup" transform="translate(31.530380, 17.954315) rotate(-270.000000) translate(-31.530380, -17.954315) " x="30.0303797" y="13.3857868" width="3" height="9.13705584"></rect>
            <rect fill-opacity="0.58" sketch:type="MSShapeGroup" x="16.678481" y="26.8629442" width="3" height="9.13705584"></rect>
            <rect sketch:type="MSShapeGroup" x="16.5873418" y="0" width="3" height="9.13705584"></rect>
        </g>
    	<animateTransform attributeName="transform"
    		type="rotate"
    		from="0 18 18"
    		to="360 18 18"
    		begin="0s"
    		dur="0.85s"
    		repeatCount="indefinite"
    	/>
    </g>
</svg>


	<div ref="char"></div>
</div>
	`,
	data() {
	    return {
	    	status: false
	    }
	},
	mounted() {
		var e = db.ref("apps/")

		
		var n = new Date
		n.setHours(0)
		n.setMinutes(0)
		n.setSeconds(0)
		
		n = n.getTime() + 3600000 * 24
		e.orderByChild("time")
		.startAt(n - 6048e5)
		.once("value", e => {
			var data = new Array(7).fill(0)
			this.status = true
			Object.values(e.val())
			.map(e => {
				var day = ~~((n - e.time) / (1000 * 24 * 3600))
				
				data[day]++
				
			})
			
			try {
				bind(data.reverse())
			} catch (e) {
				console.log(e + "")
			}
		})
		

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = my(this.$refs.char).outerWidth() - margin.left - margin.right,
    height = my(this.$refs.char).outerWidth() * 400 / 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(this.$refs.char)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data

function bind (data) {
  
  
    // Add X axis --> it is a date format
	
    var x = d3.scaleTime()
      .domain([ 1, 7 ])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d, i) { return x(i + 1) })
        .y0(y(0))
        .y1(function(d) { return y(d) })
        )
        
	svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Date");

	svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -margin.top)
      .text("Apps")


}

	}
}