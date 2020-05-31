firebase.initializeApp({
  apiKey: "AIzaSyAIm343O_cNAsHATMVGqZnZMJnRDMcc7hg",
  authDomain: "quantum-chemist-237712.firebaseapp.com",
  databaseURL: "https://quantum-chemist-237712.firebaseio.com",
  projectId: "quantum-chemist-237712",
  storageBucket: "quantum-chemist-237712.appspot.com",
  messagingSenderId: "583878542854",
  appId: "1:583878542854:web:b674a829037f595d4c6587"
});
var auth = firebase.auth();
var db = firebase.database();
var storage = firebase.storage();
var computed = {};
var methods = {
  loadMessage: function loadMessage() {
    var _this = this;

    db.ref("messages").limitToLast(50).on("child_added", function (e) {
      Vue.set(_this.messages, e.key, e.val());

      _this.scrollPy();

      _this.state.preLoading = false;
    });
    db.ref("messages").limitToLast(50).on("child_changed", function (e) {
      Vue.set(_this.messages, e.key, e.val());

      _this.scrollPy();

      _this.state.preLoading = false;
    });
  },
  scrollPy: function scrollPy() {
    var _this2 = this;

    setTimeout(function () {
      return my(_this2.$refs.main).scrollTop(9999);
    });
  },
  signInWithGoogle: function signInWithGoogle() {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  },
  signInWithFacebook: function signInWithFacebook() {
    var e = new firebase.auth.FacebookAuthProvider();
    e.setCustomParameters({
      display: "popup"
    });
    auth.signInWithRedirect(e);
    auth.signInWithPopup(e);
  },
  checkSign: function checkSign() {
    if (auth.currentUser) {
      return true;
    }

    this.alertMess = "You must login.";
    return false;
  },
  sendMessage: function sendMessage() {
    if (this.textareaInput && this.checkSign()) {
      db.ref("messages").push({
        text: this.textareaInput,
        name: this.user.displayName,
        photoUrl: this.user.photoURL || "https://nguyenthanh1995.github.io/img/profile_placeholder.png"
      });
      this.textareaInput = "";
      this.$refs.textareaInput.focus();
    }
  },
  sendImage: function sendImage(e) {
    var _this3 = this;

    var file = e.target.files;
    if (!file.length || !this.checkSign()) return;
    file = file[0];
    var ref = storage.ref("messenger/" + Date.now() + Math.random().toString(32)).put(file, {
      contentType: file.type
    });
    this.state.uploading = true;
    ref.on("state_changed", function () {}, function () {
      _this3.state.uploading = false;
      _this3.alertMess = "@Upload image failed!";
    }, function () {
      _this3.state.uploading = false;
      ref.snapshot.ref.getDownloadURL().then(function (URL) {
        db.ref("messages").push({
          name: _this3.user.displayName,
          photoUrl: _this3.user.photoURL || "https://nguyenthanh1995.github.io/img/profile_placeholder.png",
          imageUrl: URL,
          text: _this3.textareaInput
        }).then(function () {
          _this3.alertMess = "Send image done.";
        }).catch(function (error) {
          _this3.alertMess('Error writing new message to Firebase Database', error);
        });
      });
    });
    this.textareaInput = "";
  },
  signOut: function signOut() {
    var _this4 = this;

    auth.signOut().then(function () {
      _this4.alertMess = "Sign out!";
    });
  }
};
Vue.use(window["vue-img"], {
  openOn: "click"
});
Vue.use(VueLazyload);
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
    Alert: $import("/lb/Alert.html")
  },
  mounted: function mounted() {
    var _this5 = this;

    this.loadMessage();
    auth.onAuthStateChanged(function (user) {
      _this5.user = user;
    });
  }
});
var y;
my(".panel").sticky({
  topSpacing: 0,
  zIndex: 5000
}).touchstart(function (e) {
  y = e.touches[0].clientY;
}).touchmove(function (e) {
  if (y - e.touches[0].clientY < 0) return;
  window.scrollTo(0, y - e.touches[0].clientY);
});