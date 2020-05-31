firebase.initializeApp({
	apiKey: "AIzaSyAIm343O_cNAsHATMVGqZnZMJnRDMcc7hg",
	authDomain: "quantum-chemist-237712.firebaseapp.com",
	databaseURL: "https://quantum-chemist-237712.firebaseio.com",
	projectId: "quantum-chemist-237712",
	storageBucket: "quantum-chemist-237712.appspot.com",
	messagingSenderId: "583878542854",
	appId: "1:583878542854:web:b674a829037f595d4c6587"
});

const auth = firebase.auth()
const db = firebase.database()
const storage = firebase.storage()

const computed = {
	
}

const methods = {
	loadMessage() {
		db.ref("messages")
		.limitToLast(50)
		.on("child_added", e => {
			Vue.set(this.messages, e.key, e.val())
			this.scrollPy()
			this.state.preLoading = false
		 })
		 
		 db.ref("messages")
		 .limitToLast(50)
		 .on("child_changed", e => {
			Vue.set(this.messages, e.key, e.val())
			this.scrollPy()
			this.state.preLoading = false
		 })
		 
	},
	scrollPy() {
		setTimeout(() => my(this.$refs.main).scrollTop(9999))
	},
	signInWithGoogle() {
		auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
	},
	signInWithFacebook() {
		let e = new firebase.auth.FacebookAuthProvider()
		e.setCustomParameters({
			display: "popup"
		})
		auth.signInWithRedirect(e)
		auth.signInWithPopup(e)
	},
	checkSign() {
		if ( auth.currentUser ) {
			return true
		}
		this.alertMess = ("You must login.")
		 return false
	},
	sendMessage() {
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
	sendImage(e) {
		let file = e.target.files

		if ( !file.length || !this.checkSign() )
			return
		file = file[0]

		let ref = storage.ref("messenger/" + Date.now()  + Math.random().toString(32))
		.put(file, { contentType: file.type })
		this.state.uploading = true
		ref.on("state_changed", () => {
			
		}, () => {
			this.state.uploading = false
			this.alertMess = ("@Upload image failed!")
		}, () => {
			this.state.uploading = false
			ref.snapshot.ref
			.getDownloadURL()
			.then(URL => {
		 		db.ref("messages")
				.push({
					name: this.user.displayName,
					photoUrl: this.user.photoURL || "https://nguyenthanh1995.github.io/img/profile_placeholder.png",
					imageUrl: URL,
					text: this.textareaInput
				})
				.then(() => {
					this.alertMess = ("Send image done.")
				})
				.catch(error => {
				this.alertMess('Error writing new message to Firebase Database', error);
				})
			})
		})
		this.textareaInput = ""
	},
	signOut() {
		auth.signOut().then(() => {
			this.alertMess = "Sign out!"
		})
	},
	fixModel(e) {
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
	methods,
	computed,
	components: {
		Alert: $import("html/Alert.html")
	},
	mounted() {
		this.loadMessage()
		auth.onAuthStateChanged(user => {
				this.user = user
		 })
	}
})

!function () {
	let y
	my(".panel").sticky({
		topSpacing: 0,
		zIndex: 5000
	})
	.touchstart(e => {
		y = e.touches[0].clientY
	})
	.on("touchmove").prevent(e => {
		if ( y - e.touches[0].clientY < 0 ) return
		window.scrollTo(0, y - e.touches[0].clientY)
	})
}()
!function() {
	let y
	my(".chat__framework")
	.touchstart(e => {
		y = e.touches[0].clientY
	})
	.on("touchmove").prevent(e => {
		if ( y - e.touches[0].clientY < 0 ) return
		window.scrollTo(0, y - e.touches[0].clientY)
	})
}()