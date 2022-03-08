<template>
<div class="container-scroller">
  <div class="container-fluid page-body-wrapper">
    <sidebar-component></sidebar-component>
    <div class="main-panel">
      <div class="content-wrapper">
        <navbar-component></navbar-component>
        <div class="page-header">
          <h3 class="page-title"></h3>
            <nav aria-label="breadcrumb">
              <ul class="breadcrumb">   
              </ul>
            </nav>
        </div>
        <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Tambah barang</h4>
                    <form @submit.prevent="tambah" class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputNamaBarang1">Nama Barang</label>
                        <input type="text" class="form-control" id="exampleInputNamaBarang1" placeholder="Nama Barang" v-model="barang.nama_barang">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputHarga1">Harga</label>
                        <input type="text" class="form-control" id="exampleInputHarga1" placeholder="Harga" v-model="barang.harga_awal">
                      </div>
                      <div class="form-group">
                        <label for="foto">Foto</label>
                        <div class="col-md-3" v-if="foto">
                              <img :src="foto" class="img-responsive" height="70" width="90">
                           </div>
                          <div class="col-md-6">
                              <input type="file" v-on:change="onImageChange" class="form-control">
                          </div>
                        
                        <!-- <input type="file" class="form-control" @change="avachange"> -->
                      </div>
                      <div class="form-group">
                        <label for="exampleDeskripsi1">Deskripsi</label>
                        <textarea class="form-control" id="exampleDeskripsi1" rows="4" v-model="barang.deskripsi"></textarea>
                      </div>
                      <br> 
                      <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
        
      </div>
      <footer-component></footer-component>
    </div>
  </div>     
</div>
</template>

<script>
    export default {
        data() {
            return {
                barang : {},
                // foto: ''
            }
        },
        methods : {
            tambah() {
                this.axios.post('http://localhost/latihan_lelang/public/api/barang', this.barang,{
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
                .then(()=>{
                this.$router.push('/barang')
            })
                .catch(err => console.log(err))
            },
            onImageChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.barang.foto = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            // uploadImage(){
            //     this.axios.post('/barang/store',{foto: this.foto}).then(response => {
            //        console.log(response);
            //     });
            // }
        },
        
        // avachange(e){
        //     var fileReader = new FileReader()
        //     fileReader.readAsDataURL(e.target.files[0])
        //     fileReader.onload= (e) => {
        //         this.item.foto = e.target.result
        //     }  
        // } 
    }
</script>
