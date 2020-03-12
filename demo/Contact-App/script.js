console.error = console.warn = console.log = onerror = function (e) {
    alert(e + "")
}

/* Cơ sở mã hoá utf-8
  void *char -> wtf_cycript
  0xfab02 = 0xfab02 + 0x0935ff
  
  à = a + \u0300
  á = a + \u0301
  ã = a + \u0309
  ả = a + \u0303
  ạ = a + \u0323
  @end
*/

function deleteEccents (str) {
    return str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    .replace(/Đ/g, "D");
}

function strips (str) {
    //hàm này bỏ qua tác động của biểu thức chính quy. lấy tại myjs
/*
	Bản quyền MIT cho giấy phép sử dụng myjs. https://nguyenthanh1995.github.io/my.js

*/
	return str.replace(/(\!|"|\#|\$|\%|\&|\\|'|\(|\)|\*|\+|,|-|\.|\:|;|\<|\=|\>|\?|\@|\[|\]|\^|\`|\{|\}|\~|\¡|\¿)/g, '\\$1')
}


var database = firebase.database()
var app = new Vue({
	el: "div#app",
	data: {
		contacts: {},
		searchContact: "",
		state: {
		    editPopup: false,
		    addPopup: false
		},
		/* quản lý giá trị thẻ input của popup add */
		nameAdd: "",
		telAdd: "",
		/* @end */
		/* quản lý giá trị thẻ input của popup edit */
		nameEdit: "",
		telEdit: "",
		hashFireBase: ""
		/* @end */
	},
	components: {
		"contact": {
			template: "#contact",
			props: {
				contact: Object
			}
		}
	},
	methods: {
		 showAddPopup: function () {
			 /*method này sẽ hiển thị 1 popup cho người dùng sửa dữ liệu contact*/
			this.state.editPopup = false
			this.state.addPopup = true
		 },
		 hideAddPopup: function (contact, hash) {
		    this.state.addPopup = false
		 },
		 saveAddContact: function(){
    		 var _ = this
    		 if (!this.nameAdd.match(/\S/) || !this.telAdd.match(/\S/))
    		 	return console.log("Wtf ban chua nhap gi de luu");
    		 database.ref("contact")
    		 .push({
    		     name: this.nameAdd,
    		     tel: this.telAdd
    		 })
    		 .then(function () {
    		     console.log("Thêm thành công")
    		     _.hideAddPopup()
    		 })
    		 .catch(function () {
    		     console.warn("Thêm thành thất bại")
    		     _.hideAddPopup()
    		 })
    		 
		 },
		 /* bên dưới là các method của edit popup */
		 showEditPopup: function(data, hash) {
			 this.state.editPopup = true
			 this.state.addPopup = false
			 this.nameEdit = data.name
			 this.telEdit = data.tel
			 this.hashFireBase = hash
		 },
		 hideEditPopup: function() {
		     this.state.editPopup = false
			 this.nameEdit = ""
			 this.telEdit = ""
			 this.hashFireBase = ""
		 },
		 saveEditContact:function(){
    		  var _ = this, name = this.nameEdit, tel = this.telEdit, hash = this.hashFireBase
    		  database
			  .ref("contact/" + hash)
			  .set({
			      name: name,
				  tel: tel
			  })
			  .then(function () {
			      console.log("Lưu thay đổi thành công")
				  Vue.set(_.contacts,
					  hash,
				     {
				  	 	name: name,
				  	 	tel: tel
				  	 })
				  _.hideEditPopup()
			  })
			  .catch(function () {
			      console.warn("Lưu thay đổi thất bại")
				  _.hideEditPopup()
			  })
		 },
		 deleteContact: function() {
    		 var hash = this.hashFireBase, _ = this
    		 database
			  .ref("contact/" + this.hashFireBase)
			  .set(null)
			  .then(function () {
			      console.log("Xóa thành công")
				  delete _.contacts[hash]
				  _.hideEditPopup()
			  })
			  .catch(function () {
			      console.warn("Xóa thất bại")
				  _.hideEditPopup()
			  })
		 }
	},
	watch: {
	    searchContact: function(e) {
	        e = deleteEccents(e)
	        var rsearch = new RegExp(strips(e), "gi")
//hàm strips xóa toàn bộ ý tự đặc biệt trong bảng biểu thức chính quy
	        var hashContact, contact
	        for (hashContact in this.contacts) {
    			 contact = this.contacts[hashContact]
			     if (!deleteEccents(contact.name)
.match(rsearch) && !contact.tel
.match(rsearch))
					 Vue.set(
						this.contacts
						[hashContact],
						"show", false
					);
				 else 
				 	delete
						this.contacts
						[hashContact]
						.show
			 }
	    }
	},
	mounted: function () {
	    this.$root.$el.removeAttribute("hidden")
	}
})

database.ref("contact")/*
.push({
    name: "Admin",
    phoneNumber: "0102993"
})
.then(e => console.log("succ"))*/

.on("child_added", function (el) {
   Vue.set(app.contacts, el.key, el.val())
})

//kiếu Fire nó như thế này:

/*
	$root: {
		"xung băm": {
			name: ...,
			phoneNumber: ....
		}
	}
*/

if (!firebaseConfig) 
	alert("Wtf config của FireBase bị thiếu! Web ngưng chạy")