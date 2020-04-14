const Login = {
	template: `
	<div hidden>
		<!-- login -->
		<section class="container login-popup"  v-if="$root.user == null && forgotPass == false">
			<div class="row mt-5">
				<div class="col-12">
					<h4 class="text-center">Login to continue</h4>
				</div>
			</div>
			
			<form class="row mt-3" @submit.prevent="signInEmail">
				<div class="col-12">
					<div class="input-group input-group-lg">
						<div class="input-group-append">
							<span class="input-group-text border-0 bg-tr"><i class="far fa-user"></i></span>
						</div>
						<input class="form-control shadow-none border-0" required
v-model="login.email" required />
						<label class="in-valid">Email or username</label>
					</div>
				</div>
				<div class="col-12 mt-3">
					<div class="input-group input-group-lg">
						<div class="input-group-append">
							<span class="input-group-text border-0 bg-tr"><i class="far fa-lock"></i></span>
						</div>
						<input class="form-control shadow-none border-0" required type="password"
v-model="login.password" required />
						<label class="in-valid">Password</label>
					</div>
					<small class="float-right text-secondary" @click="forgotPass = true">Forgot Password?</small>
				</div>
				<div class="col-12 mt-3">
					<span class="text-danger small yb-1" v-if="statusLogin != undefined"> {{ statusLogin }} </span>
					<button class="btn btn-block login text-center text-light" type="submit"><i class="fas fa-sign-in-alt mr-3"></i>Login</button>
				</div>
			</form>
			<div class="row my-3">
				<div class="col-12 text-center text-secondary">
					or login using
				</div>
			</div>
			
			<!-- social -->
			<div class="row">
				<div class="col-12 text-center">
					<button class="btn btn-sm bg-facebook social text-light rounded-circle" @click="signInFacebook"><i class="fab fa-facebook-f"></i></button>
					<button class="btn btn-sm bg-google text-light rounded-circle social" @click="signInGoogle"><i class="fab fa-google-plus-g"></i></button>
				</div>
			</div>
		</section>
		
		<section class="container" v-else-if="forgotPass == false">
			<div class="row mt-5">
				<div class="col-12">
					<h4 class="text-center">Your logged!</h4>
				</div>
			</div>
			<div class="row mt-3 text-center">
				<div class="col-12">
					<img class="rounded-circle img-fluid img-thumbnail" style="width: 120px; height: 120px" :src="$root.user.photoURL || 'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png' " />
				</div>
				<div class="col-12 mt-2">
					<b> {{ $root.user.displayName }} </b> 
				</div>
			</div>
			<div class="row mt-3 text-center">
				<div class="col-12">
					<button class="btn btn-primary" @click="signOut">Sign Out</button>
				</div>
			</div>
		</section>
	
		<section class="container" v-if="forgotPass">
			<div class="row">
				<div class="col-12 p-3">
					<b @click="forgotPass = false">&lt; Login</b>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					Chúng tôi sẽ giúp bạn lấy lại tài khoản của mình. Nhập email mà bạn đã dùng để đăng ký tài khoản. Sau khi nhấn nút gửi, đi tới hòm thư của bạn vả đặt lại mật khẩu ngay!<br>
					<label class="mt-3"> Email </label>
					<div class="input-group">
						<input class="form-control" placeholder="e.x: admin@google.com" v-model="login.email" />
					</div>
					<button class="btn btn-primary float-right mt-2" @click="sendEmailRsPas"> Gửi </button>
				</div>
			</div>
		</section>
	</div>`,
	data() {
    	return {
			login: {
				email: "thanhnguyennguyen1995@gmail.com",
				password: "Thanhbanh"
			},
			statusLogin: undefined,
			forgotPass: false
    	}
	},
	methods: {
		signInEmail() {
			auth.signInWithEmailAndPassword(this.login.email, this.login.password)
			.catch(e => {
								this.statusLogin = "Login Failed!"
			})
		},
		signInFacebook() {
			var provider = new firebase.auth.FacebookAuthProvider()
	
	//provider.addScope('user_birthday')
	
			provider
			.setCustomParameters({
				'display': 'popup'
			})
	
			auth
			.signInWithRedirect(provider);
	
			auth
			.signInWithPopup(provider)
			.then(function (result) {
				//
			}).catch(error => {
				this.statusLogin = "Login Failed!"
			})
			
			auth
			.getRedirectResult()
			.then(function (result) {

			}).catch(error => {
				this.statusLogin = "Login Failed! " + JSON.stringify(error)
			})
		},
		signInGoogle() {
			auth
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
		},
		signOut() {
			auth.signOut()
		},
		sendEmailRsPas() {
			auth
			.sendPasswordResetEmail(this.login.email)
			.then(e => {
				Swal.fire({
                title: "Thành công",
                icon: "success",
                text: "Liên kết đặt lại mật khẩu đã gửi tới email của bạn.",
				  showCloseButton: false,
				  showCancelButton: true,
				  cancelButtonText: "Close"
				})
				  
			})
			.catch(e => {
				Swal.fire({
                title: "Thất bại",
                icon: "error",
                text: "Email này không thuộc bất cứ tài khoản nào.",
				  showCloseButton: false,
				  showCancelButton: true,
				  cancelButtonText: "Close"
				})
			})
		}
	},
	mounted() {
		my(this.$el).unAttr("hidden")
	}
}
