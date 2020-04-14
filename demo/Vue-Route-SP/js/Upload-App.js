//console.log(atob("Y29tLmlvc3NwLjFibG9ja2VyeA=="))
//com.iossp.1blockerx
var configMdl = {
	  spellChecker: false,/*
	  autosave: {
		  enabled: false,
	  	  unique_id: "description"
	  },*/
	 //autofocus: true,
	 //promptURLs: false,
	 toolbar: [
		{ name: "bold", action: SimpleMDE.toggleBold, className: "fa fa-bold", title: "Bold" },
		{ name: "italic", action: SimpleMDE.toggleStrikethrough, className: "fa fa-strikethrough", title: "Strikethrough" },
		{ name: "strikethrough", action: SimpleMDE.toggleItalic, className: "fa fa-italic", title: "Italic" },
		{ name: "heading-1", action: SimpleMDE.toggleHeadingBigger, className: "fa fa-header fa-header-x", title: "Bold" },
		{ name: "heading-1", action: SimpleMDE.toggleHeading1, className: "fa fa-header fa-header-x fa-header-1", title: "Bold" },
		{ name: "heading-2", action: SimpleMDE.toggleHeading2, className: "fa fa-header fa-header-x fa-header-2", title: "Bold" },
		{ name: "heading-3", action: SimpleMDE.toggleHeading3, className: "fa fa-header fa-header-x fa-header-3", title: "Bold" },
					"|",
		{ name: "code", action: SimpleMDE.toggleCodeBlock, className: "fa fa-code", title: "Code" },
		{ name: "quote", action: SimpleMDE.toggleBlockquote, className: "fa fa-quote-left", title: "Quote" },
		{ name: "unordered-list", action: SimpleMDE.toggleUnorderedList, className: "fa fa-list-ul", title: "Generic List" },
		{ name: "ordered-list", action: SimpleMDE.toggleOrderedList, className: "fa fa-list-ol", title: "Numbered List" },
		{ name: "table", action: SimpleMDE.drawTable, className: "fa fa-table", title: "Insert Table" },
		{ name: "horizontal-rule", action: SimpleMDE.drawHorizontalRule, className: "fa fa-minus", title: "Insert Horizontal Line" },
		{ name: "clean-block", action: SimpleMDE.cleanBlock, className: "fa fa-eraser fa-clean-block", title: "Clean block" },
"|",
		{ name: "bold", action: SimpleMDE.drawLink, className: "fa fa-link", title: "Create Link" },
/*
		{ name: "image",
		  action: () => {
			this.modalImage = true;
			this.$store.dispatch('getFiles');
		  },
		  className: "fa fa-image",
		  title: "Upload Image", },*/
					"|",
		  { name: "preview", action: SimpleMDE.togglePreview, className: "fa fa-eye no-disable", title: "Toggle Preview"},
		  { name: "side-by-side", action: SimpleMDE.toggleSideBySide, className: "fa fa-columns no-disable no-mobile",title: "Toggle Side by Side"},
		  { name: "fullscreen", action: SimpleMDE.toggleFullScreen, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen"},
					"|",
		   { name: "undo", action: SimpleMDE.togglePreview, className: "fa fa-undo no-disable", title: "Undo"},
		   { name: "redo", action: SimpleMDE.togglePreview, className: "fa fa-repeat no-disable", title: "Redo"}
	   ]
}


function json (e) {
   return typeof e === "string" ? btoa(e) : (typeof e).match(/object|function|symbol/) ? e : JSON.stringify(e)
}
function toURL(file) {
   return new my.promise(e => {
	 if (typeof file === "string")
	 	e.done(file)
	 else my(new FileReader)
	 	.load(function () {
		 	e.done(this.result)
	 	})[0].readAsDataURL(file)
   })
}
Vue.component("media", {
	template: "\
		<div class='ml-3'>\
			<img class='img-fluid screenshoot border' v-if='file && (typeof file === \"string\" || file.type.match(/image/))' :src='base' @click=\"$emit('change-file')\"/>\
			<span class='remove-file' @click.stop=\"$emit('remove-file')\">\
				&times;\
			</span>\
		</div>\
	",
	data() {
		return {
			base: ""
		}
	},
	props: ["file"],
   watch: {
      file() {
        this.loadURL()
      }
   },
   methods: {
      loadURL() {
        toURL(this.file)
		 .then((e, f, args) => {
		    this.base = args[0]
		 }).end()
      }
   },
	created() {
        this.loadURL()
	}
})


const UploadApp = {
    template: `
		<div class="container" hidden>
			<div class="row">
				<div class="col-4">	
					<img class="icon border" :src="iconbase" @click=inpMediaIcon>
				</div>
				<div class="col">
					<input class="appea-none" style="width: 150px" v-model=name placeholder="Name app" /><br>
					<input class="appea-none" style="width: 150px" v-model=size type="tel" placeholder="Size" />
				</div>
			</div>
			
			<!-- Information -->
			<div class="row mt-7">
				<div class="col-12 text-bold h6 mb-0">
					Information
				</div>
				<div class="col-12">
					<table class="table table-sm w3-7 border-0 small">
						<tr class="border-0">
							<td class="text-secondary border-0"> Package id </td>
							<td class="border-0 text-bold">

<input class="appea-none" v-model=package />

<button class="btn btn-sm btn-dark" @click="getInforInDB">Get</button>
							</td>
						</tr>
						<tr class="border-0">
							<td class="text-secondary border-0"> Developer </td>
							<td class="border-0 text-bold"><input class="appea-none" v-model=infor.developer /></td>
						</tr>
						<tr class="border-0">
							<td class="text-secondary border-0"> Category </td>
							<td class="border-0 text-bold"><input class="appea-none" v-model=infor.category /></td>
						</tr>
						<tr class="border-0">
							<td class="text-secondary border-0"> Compatibility </td>
							<td class="border-0 text-bold"><input class="appea-none" v-model=infor.compatibility /></td>
						</tr>
						<tr class="border-0">
							<td class="text-secondary border-0"> Languages </td>
							<td class="border-0 text-bold"><input class="appea-none" v-model=infor.languages /></td>
						</tr>
					</table>
				</div>
			</div>
			
			<!-- Versions -->
			<div class="row mt-3">
				<div class="col-12 text-bold h6 mb-0">
					Versions
				</div>
				<div class="col-12 mt-3">
					<div class="input-group">
						<textarea class="form-control" v-model="versions" placeholder='"key": "URL", \n"key": "URL"'></textarea>
					</div>
				</div>
			</div>
			
			<!-- Typeof -->
			<div class="row mt-3">
				<div class="col-12 text-bold h6 mb-0">
					Type
				</div>
				<div class="col-12 mt-3">
					<div class="input-group input-group-sm">
						<select class="form-control custom-select" v-model="type"></textarea>
							<option value="app" selected> App </option>
							<option value="game"> Game </option>
						</select>
					</div>
				</div>
			</div>
			
			<!-- Screenshoot -->
			<div class="row mt-3">
				<div class="col-12 text-bold h6 mb-0">
					Screenshoot
				</div>
				<div class="col-12 mt-3">
					<div class="scroll">
						<media class="img-fluid screenshoot ml-3 border" v-for="(file, key) in screenshoot" :file=file :key="key" 
@change-file="changeFile(key)"
@remove-file="removeFile(key)"></media>

						<div class="ml-3"><img class="img-fluid screenshoot border" @click="inpMedia"/></div>
					</div>
				</div>
			</div>
			
			<!-- Description -->
			<div class="row mt-3">
				<div class="col-12 text-bold h6 mb-0 icon-more">
					Description
				</div>
				<div class="col-12 my-3 small text-secondary">
					<textarea ref=description></textarea>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-12">
					<div class="alert alert-primary" v-if="!!nameProgress">
						<div class="alert-body">
Name Progress: {{ nameProgress }}
<br>
Progress: {{ progress }} <br>
Status Uploading: {{ status }}
						</div>
					</div>
					<button class="btn btn-block btn-primary" @click="post" v-if="$root.user != null">Posted</button>
					<button class="btn btn-block btn-primary" @click="$root.signIn" v-else>Đăng nhập đế tải lên</button>
				</div>
				<div class="col-12" v-if="isLoading">
					<div class="loader">
						<loading
	:can-cancel="false"
	:is-full-page="true"
	:color="'#007bff'"
	:width=120 :height=120
	:loader="'dots'"></loading>
						<div>
							{{ nameProgress }} progress {{ progress }} status {{ status }}
						</div>
					</div>
				</div>
			</div>
		</div>
    `,
    data() {
		return {
			name: "",
			package: "",
			icon: null,
			iconbase: null,
			size: "",
			versions: "",
			type: "app",
			infor: {
			
			},
			screenshoot: [],
			status: "",
			nameProgress: "",
			progress: "",
			description: null,
			isLoading: false
		}
	},
	watch: {
		icon(n) {
			toURL(n)
			.then((a, b, c) => {
				this.iconbase = c[0]
			})
			.end()
		}
	},
	components: {
	    loading: {
	        props: {
	            color: {
      				type: String,
      				"default": '#000'
    			 },
    			 height: {
      				type: Number,
      				"default": 240
    			 },
    			 width: {
      				type: Number,
      				"default": 60
    			 },
    			 zIndex: {
    			     type: Number,
    			     default: 9999
    			 },
    			 background: {
    			     type: String,
    			     default: "#000"
    			 },
    			 opacity: {
    			     type: Number,
    			     default: 0.5
    			 }
	        },
	        render(_c) {
	        	return _c('svg',{attrs:{"viewBox":"0 0 120 30","xmlns":"http://www.w3.org/2000/svg","fill":this.color,"width":this.width,"height":this.height}},[_c('circle',{attrs:{"cx":"15","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"60","cy":"15","r":"9","fill-opacity":"0.3"}},[_c('animate',{attrs:{"attributeName":"r","from":"9","to":"9","begin":"0s","dur":"0.8s","values":"9;15;9","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"0.5","to":"0.5","begin":"0s","dur":"0.8s","values":".5;1;.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"105","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})])])
	        }
	    }
	},
	methods: {
		is() {
			return (!(this.name + "").match(/\S/) || !(this.package + "").match(/\S/) || typeof this.icon === null || !(this.size + "").match(/\S/))
		},
		inpFile(fn, nomulti) {
		    my("<input type='file' hidden accept='*/(?:video|image)' " + (nomulti ? "" : "multiple") + ">")
			 .change(fn)
			 .blur(function () {
				 this.remove()
			 })
			 .appendTo("body")
			 .click()
		},
		inpMedia() {
			 var _ = this.screenshoot
			 this.inpFile(function(){
				if (this.files.length)
					_.push.apply(_, this.files)
			 })
		},
		inpMediaIcon() {
			var _ = this
			 this.inpFile(function(){
				if (this.files.length)
					_.icon = this.files[0]
			 }, true)
		},
		changeFile(index) {
		    var _ = this
		    this.inpFile(function(){
    			if (this.files.length)
					_.screenshoot
					.splice.apply(
						_.screenshoot,
						[ index, 1 ]
						.concat(
							[].slice.call(this.files)
						)
    				)
			})
		},
		removeFile(index) {
		    this.screenshoot.splice(index, 1)
		},
		checkVers() {
		    try {
		        JSON.parse("{" + this.versions + "}")
		        return true
		    } catch (e) {
		    	  return false
		    }
		},
		getInforInDB() {
		    if (!this.package.match(/\S/))
				return alert("Id?")
		    db
		    .ref("apps/" + btoa(this.package))
		    .once("value", e => {

		        e = e.val()
		        if (e === null || typeof e !== "object")
					return alert("Không có dữ liệu của gói này")
		        this.name = e.name
		        this.icon = e.icon
		        this.infor = e.infor
		        this.size = e.size
		        this.versions = decodeURIComponent(atob(e.versions))
				 this.type = e.type
				 this.screenshoot = e.screenshoot
				 this.description.value(e.description)
			})
		},
		post() {
			if (this.is())
				return 
			if (!this.checkVers())
				return alert("Version error")
//var storage = firebase.storage()
var ICON, SCREENSHOOT = [], _ = this
_.isLoading = true
new my.promise(rejack => {
	// upload icon app!
	
	_.nameProgress = "icon"
  if (typeof _.icon === "string") {
	ICON = _.icon
	_.status = "no change! done"
	rejack.done()
  }
  else {
	
	var upTask = storage.ref("icons/" + _.package + ".png")
	.put(_.icon, { contentType: _.icon.type })
	
	upTask.on(
		"state_changed",
		function (snapshot) {
			// progress
			_.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100

			_.status = snapshot.state
		},
		function () {
			// error
			_.status = "error"
			_.isLoading = false
			alert("Máy chủ storage từ chối kết nối")
		},
		function () {
			_.status = "done"
			upTask.snapshot.ref
			.getDownloadURL()
			.then(function (url) {
				ICON = url
				rejack.done()
			})
		}
	)
  }
})
.then(rejack => {

	// upload screenshoot
	_.screenshoot.length &&
	upload(_.screenshoot[0], 0)
	function upload (val, key) {
		_.nameProgress = "screen " + key
	  if (typeof val === "string") {
	  	SCREENSHOOT[key++] = val
	  	_.status = "no change! done"
	  	if (key >= _.screenshoot.length) rejack.done();
		else upload(_.screenshoot[key], key)
	  }
	  else {
		var upTask = storage.ref("screenshoot/" + _.package + "/" + key + ".jpg")
		.put(val, { contentType: val.type })

		upTask.on(
			"state_changed",
			function (snapshot) {
				// progress
				_.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100

				_.status = snapshot.state
			},
			function () {
				// error
				_.status = "error"
				if (key >= _.screenshoot.length) rejack.done();
				 else upload(_.screenshoot[key], key)
			},
			function () {
				_.status = "done"
			  upTask.snapshot.ref
			   .getDownloadURL()
				.then(function(url) {
					SCREENSHOOT[key++] = url
					if (key >= _.screenshoot.length) rejack.done();
				 	else upload(_.screenshoot[key], key)
				})
			}
		)
	  }
	}
})
.then(rejack => {
	_.nameProgress = "Posting database..."
	_.progress = null
	_.status = "running"
try {
	db.ref("apps/" + json(_.package)).set({
		screenshoot: SCREENSHOOT,
		name: _.name,
		icon: ICON,
		size: _.size,
	   versions: btoa(encodeURIComponent(_.versions)),
	   infor: _.infor,
	   type: _.type,
       time: Date.now(),
      	description: _.description.value()
	})
	.then(function () {
		_.status = "done!"
		_.isLoading = false
	})
	.catch(function () {
		_.status = "error?"
		_.isLoading = false
		alert("Máy chủ database từ chối kết nối")
	})
} catch (e) { alert("failed " + e) }
})
.end()

		}
	},
	mounted() {
		configMdl.element = this.$refs.description
		 this.description = new SimpleMDE(configMdl)
	    this.$el.removeAttribute("hidden")
	}
}
