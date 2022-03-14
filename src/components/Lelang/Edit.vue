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
              <h4 class="card-title">Edit Auction Data</h4>
              <form @submit.prevent="edit" class="forms-sample">
                <div class="form-group">
                  <label for="exampleInputBarang" class="col-sm-3 col-form-label">Item</label>
                  <div class="col-sm-12">
                    <select v-model="lelang.id_barang">
                      <option
                        v-for="(b, index) in barang"
                        :key="index"
                        :value="b.id_barang"
                      >
                        {{ b.nama_barang }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputTanggal">Date</label>
                  <input type="date" class="form-control col-sm-9" id="exampleInputTanggal" v-model="lelang.tgl_lelang">
                </div>
                <div class="form-group">  
                  <label class="col-sm-3 col-form-label">Status</label>
                  <div class="col-sm">
                    <select class="form-control" v-model="lelang.status">
                      <option value="dibuka">Open</option>
                      <option value="ditutup">Close</option>
                    </select>
                  </div>
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
                lelang :{},
                barang :{}
            }
        },
        created(){
            this.axios.get(`http://localhost/latihan_lelang/public/api/lelang/${this.$route.params.id}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.lelang = res.data
            }),
            this.axios.get(`http://localhost/latihan_lelang/public/api/barang`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.barang = res.data
            })
        },
        
        methods : {
            edit() {
                this.axios.put(`http://localhost/latihan_lelang/public/api/lelang/${this.$route.params.id}`, this.lelang,{
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
                .then(()=>{
                this.$router.push('/lelang')
            })
                .catch(err => console.log(err))
            }
        }
    } 
</script>
