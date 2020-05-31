firebase.initializeApp({
	apiKey: "AIzaSyAIm343O_cNAsHATMVGqZnZMJnRDMcc7hg",
	authDomain: "quantum-chemist-237712.firebaseapp.com",
	databaseURL: "https://quantum-chemist-237712.firebaseio.com",
	projectId: "quantum-chemist-237712",
	storageBucket: "quantum-chemist-237712.appspot.com",
	messagingSenderId: "583878542854",
	appId: "1:583878542854:web:b674a829037f595d4c6587"
});

var auth = firebase.auth()
var db = firebase.database()
var storage = firebase.storage()

var computed = {
	
}

var methods = {
	loadMessage: function () {
		var _this = this
		db.ref("messages")
		.limitToLast(50)
		.on("child_added", function (e) {
			Vue.set(_this.messages, e.key, e.val())
			_this.scrollPy()
			_this.state.preLoading = false
		 })
		 
		 db.ref("messages")
		 .limitToLast(50)
		 .on("child_changed", function (e) {
			Vue.set(_this.messages, e.key, e.val())
			_this.scrollPy()
			_this.state.preLoading = false
		 })
		 
	},
	scrollPy: function () {
		setTimeout(function () {
			my(this.$refs.main).scrollTop(9999)
		}.bind(this))
	},
	signInWithGoogle: function () {
		auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
	},
	signInWithFacebook: function() {
		var e = new firebase.auth.FacebookAuthProvider()
		e.setCustomParameters({
			display: "popup"
		})
		auth.signInWithRedirect(e)
		auth.signInWithPopup(e)
	},
	checkSign: function () {
		if ( auth.currentUser ) {
			return true
		}
		this.alertMess = ("You must login.")
		 return false
	},
	sendMessage: function () {
		if ( this.textareaInput && this.checkSign() ) {
			db.ref("messages")
			.push({
				text: this.textareaInput,
				  name: this.user.displayName,
				  photoUrl: this.user.photoURL || "https://nguyenthanh1995.github.io/img/profile_placeholder.png"
			})
			this.textareaInput = ""
			this.$refs.textareaInput.focus()
		}
	},
	sendImage: function (e) {
		var file = e.target.files

		if ( !file.length || !this.checkSign() )
			return
		file = file[0]

		var ref = storage.ref("messenger/" + Date.now()  + Math.random().toString(32))
		.put(file, { contentType: file.type })
		this.state.uploading = true
		ref.on("state_changed", function () {
			
		}, function () {
			this.state.uploading = false
			this.alertMess = ("@Upload image failed!")
		}.bind(this), function () {
			this.state.uploading = false
			ref.snapshot.ref
			.getDownloadURL()
			.then(function (URL) {
		 		db.ref("messages")
				.push({
					name: this.user.displayName,
					photoUrl: this.user.photoURL || "https://nguyenthanh1995.github.io/img/profile_placeholder.png",
					imageUrl: URL,
					text: this.textareaInput
				})
				.then(function () {
					this.alertMess = ("Send image done.")
				}.bind(this))
				.catch(function (error) {
				this.alertMess('Error writing new message to Firebase Database', error);
				}.bind(this))
			}.bind(this))
		}.bind(this))
		this.textareaInput = ""
	},
	signOut: function () {
		auth.signOut().then(function () {
			this.alertMess = "Sign out!"
		}.bind(this))
	},
	fixModel: function (e) {
		this.textareaInput = e.target.value
	}
}

Vue.use(window["vue-img"], {
	openOn: "click"
})
Vue.use(VueLazyload)


new Vue({
	el: "#app",
	data: {
		messages: {},
		user: null,
		textareaInput: "",
		alertMess: "",
		state: {
			uploading: false,
			preLoading: true
		}
	},
	methods: methods,
	computed: computed,
	components: {
		Alert: $import("html/Alert.html")
	},
	mounted: function () {
		this.loadMessage()
		auth.onAuthStateChanged(function (user) {
				this.user = user
		 }.bind(this))
	}
})

!function () {
	var y
	my(".panel").sticky({
		topSpacing: 0,
		zIndex: 5000
	})
	.touchstart(function (e) {
		y = e.touches[0].clientY
	})
	.on("touchmove").prevent(function (e) {
		if ( y - e.touches[0].clientY < 0 ) return
		window.scrollTo(0, y - e.touches[0].clientY)
	})
}()
!function() {
	var y
	my(".chat__framework")
	.touchstart(function (e) {
		y = e.touches[0].clientY
	})
	.on("touchmove").prevent(function (e) {
		if ( y - e.touches[0].clientY < 0 ) return
		window.scrollTo(0, y - e.touches[0].clientY)
	})
}()