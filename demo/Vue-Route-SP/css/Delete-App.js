const DeleteApp = {
	template: `
<div class="container" hidden>
	<div class="row">
		<div class="col-12 col-md-6 col-lg-4">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" id="checkbox1" v-model="hash">
				<label class="custom-control-label" for="checkbox1">Chế độ xung băm</label>
			</div>
		
			<div class="input-group input-group-sm mt-3">
				<input class="form-control" placeholder="Tên gói hoặc xung băm" v-model="package">
			</div>
			
			<button class="btn btn-sm btn-primary mt-3" @click="search">
				Tim kiem
			</button>
		</div>
		
		<div class="col-12 col-md-6 col-lg-4">
			<p v-if=" typeof status == 'boolean' "> {{ status ? "Da tim thay goi" : "Khong tim thay goi" }} <br> Package: {{ p1 }} <br> Hash: {{ p2 }} </p>

			<div v-if="status">
				<h6 class="mt-3">
					Preview
				</h6>
				<iframe class="w-100 border" style="height: 320px" :src="'https://i-store.github.io/store/information?package=' + p2"></iframe>
				<button class="btn btn-sm btn-danger" @click="_delete"> Delete </button>
			</div>

		</div>
		
	</div>
</div>
	`,
	data() {
	    return {
	        package: "",
	        hash: false,
	        status: undefined,
	        p1: "",
	        p2: ""
	    }
	},
	methods: {
	    search() {
	        this.status = ""
	        if ( this.hash ) {
	            this.p2 = this.package
	            this.p1 = atob(this.package)
	        } else {
	            this.p2 = btoa(this.package)
				 this.p1 = this.package
	        }
	        db.ref("apps/" + this.p2)
			.once("value", e => {
			    if (!!this.package && typeof e.val() == "object" && e.val() !== null) {
					 this.status = true
				} else {
				    this.status = false
				}
			})
	    },
	    _delete() {
	        var self = this
	        if (this.$root.user == null)
				Swal.fire({
                title: "Lỗi",
                icon: "error",
                text: "Bạn cần đăng nhập trước khi thực hiện thao tác.",
				  showCloseButton: true,
				  showCancelButton: true,
				  cancelButtonText: "Huỷ",
				  confirmButtonText: "Đăng nhập"
				  
            })
            .then(e => {
                this.$root.signIn()
            })
          else Swal.queue([{
			     title: "Xóa dữ liệu này?",
				 icon: "question",
				 showLoaderOnConfirm: true,
				 confirmButtonText: "Xóa",
				 showCloseButton: true,
				 text: "Thao tác sẽ sửa đổi cơ sở dữ liệu có hiệu lực ngay lập tức. Bạn không thể khôi phục dữ liệu sau khi xoá.",
				 preConfirm() {
				     return db.ref("apps/" + self.p2).set(null)
					 .then(e => {
					    Swal.insertQueueStep({ icon: "success", text: "Thành công"})
					 })
					 .catch(e => {
					    Swal.insertQueueStep({ icon: "error", text: "Thao tác này yêu cầu tài khoản admin."})
					 })
				 }
			 }])
	    }
	},
	mounted() {
	    this.$el.removeAttribute("hidden")
	}
}