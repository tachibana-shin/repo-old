const SwiperEditor = {
    template: `
		<main hidden class="container">
			<div class="row">
				<div class="col-12">
<nav>
	<div class="nav nav-tabs nav-sm">
		<span class="nav-item nav-link" :class=" [ tab == 0 ? 'active' : '' ] " @click="tab = 0">Home</span>
		<span class="nav-item nav-link" :class=" [ tab == 1 ? 'active' : '' ] " @click="tab = 1">App</span>
		<span class="nav-item nav-link" :class=" [ tab == 2 ? 'active' : '' ] " @click="tab = 2">Game</span>
	</div>
</nav>

<div class="tab-content">
	<div class="tab-pane fade show row" :class=" [ tab == n ? 'active' : '' ] " v-for="(type, n) in data">
		<div class="col-12">
			<button class="btn btn-outline-primary my-3" @click="save(type, n)"><i class="fas fa-save"></i></button>
			<div class="input-group input-group-sm">
				<button class="form-control text-left" @click="type.splice(0, 0, '')"> + Thêm tùy chọn </button>
			</div>
		</div>
		<child-swiper v-for="(swipe, index) in type" :data="swipe" @delete="del(index, n)" :key="[index, n].join('-')" v-model="type[index]" />
	</div>
</div>
				</div>
			</div>
			
		</main>
    `,
    data() {
    	return {
		 	tab: 0,
		 	data: []
		}
    },
    components: {
        "child-swiper": {
            template: `
			<div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
				<div class="input-group input-group-sm">
					<input class="form-control" :value="data" @input="$emit('input', $event.target.value)" placeholder="Liên kết ảnh"/>
					<div class="input-group-append bg-0">
						<span class="input-group-text bg-0" @click="$emit('delete')">
							<i class="fas fa-times"></i>
						</span>
					</div>
				</div>
				<img class="w-100 img-thumbnail" :src="data" v-show="showImg" @error="showImg = false" @load="showImg = true"/>
			</div>`,
			 props: {
			     data: String
			 },
			 data() {
			     return {
			         showImg: null
			     }
			 }
        }
    },
    mounted() {
        db.ref("swipers/")
        .once("value", e => {
            this.data = [e.val().hot, e.val().app, e.val().game]
			 this.$el.removeAttribute("hidden")
        })
    },
    methods: {
        del(index, iPar) {
            Swal.fire({
                title: "Cảnh báo",
                icon: "question",
                text: "Bạn muốn xoá ảnh " + (index + 1) + " trong " + ["hot", "app", "game"][iPar] + "?",
				  showCloseButton: true,
				  showCancelButton: true,
				  cancelButtonText: "Huỷ",
				  confirmButtonText: "Ok"
				  
            })
            .then(e => {
                if (e.value == true) this.data[iPar].splice(index, 1)
            })
            
        },
        save(data, index) {
			 if (this.$root.user == null)
			 	Swal.fire({
			 	    title: "Lỗi",
			 	    icon: "error",
			 	    text: "Chức năng này yêu cầu bạn đăng nhập",
				    cancelButtonText: "Huỷ",
					confirmButtonText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="1em" height="1em" fill=#fff><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg> Đăng nhập',
					showCloseButton: true,
					showCancelButton: true,
			 	})
			 	.then(e => {
			 	    if (e.value === true) this.loginG()
			 	})
			 
			 else Swal.queue([{
			     title: "Cập nhật chứ?",
				 icon: "question",
				 showLoaderOnConfirm: true,
				 confirmButtonText: "Cập nhật",
				 showCloseButton: true,
				 text: "Thao tác sẽ sửa đổi cơ sở dữ liệu có hiệu lực ngay lập tức.",
				 preConfirm() {
				     return db.ref("swipers/" + ["hot", "app", "game"][index]).set(data)
					.then(e => {
					    Swal.insertQueueStep({ icon: "success", text: "Thành công"})
					})
					.catch(e => {
					    Swal.insertQueueStep({ icon: "error", text: "Thao tác này yêu cầu tài khoản admin."})
					})
				 }
			 }])
			 
        }
    }
}