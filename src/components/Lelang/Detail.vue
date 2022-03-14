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
          <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h4 class="card-title">Auction Bid Data</h4>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                  <div class="col text-center">
                      <img :src="'http://localhost/latihan_lelang/public/foto/'+lelang.foto" style="height:300px;" alt="image">
                  </div>
                  <div class="col">
                      <div class="text-xs font-weight-bold text-uppercase">Item Name</div>
                      <div class="h6 mb-0 text-gray-800 mb-2">{{ lelang.nama_barang }}</div>
                      <div class="text-xs font-weight-bold text-uppercase">Date</div>
                      <div class="h6 mb-0 text-gray-800 mb-2">{{ lelang.tgl_lelang }}</div>
                      <div class="text-xs font-weight-bold text-uppercase">Status</div>
                      <div class="h6 mb-0 text-gray-800 mb-2">{{ lelang.status }}</div>
                      <div class="text-xs font-weight-bold text-uppercase">Starting Price</div>
                      <div class="h6 mb-0 text-gray-800 mb-2">{{ lelang.harga_awal }}</div>
                      <div class="text-xs font-weight-bold text-uppercase">Final Price</div>
                      <div class="h6 mb-0 text-gray-800 mb-2" v-if="lelang.harga_akhir===null">-</div>
                      <div class="h6 mb-0 text-gray-800 mb-2" v-else>{{ lelang.harga_akhir }}</div>
                      <div class="text-xs font-weight-bold text-uppercase">User Name</div>
                      <div class="h6 mb-0 text-gray-800 mb-2" v-if="lelang.nama===null">-</div>
                      <div class="h6 mb-0 text-gray-800 mb-2" v-else>{{ lelang.nama }}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Offer Data</h4>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th> Address </th>
                    <th> Phone Number </th>
                    <th> Bid </th>
                    <th> Status </th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="(h,index) in history" :key="index">
                    <td class="py-1"> {{index+1}} </td>
                    <td> {{h.nama}} </td>
                    <td> {{h.alamat}} </td>
                    <td> {{h.no_hp}} </td>
                    <td> {{h.penawaran_harga}} </td>
                    <td>
                        <div v-if="lelang.status == 'dibuka'">
                          <button type="button" @click="pilih(h.id_history)" class="btn btn-inverse-primary">
                            choose as winner
                          </button>
                        </div>
                      <div v-else>
                        <span v-if="h.status_pemenang == 'menang'" class="badge bg-success text-light">win</span>
                        <span v-else class="badge bg-danger text-light">lose</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                history : {},
                src : ''
            }
        },
        created(){
            this.axios.get(`http://localhost/latihan_lelang/public/api/lelang/${this.$route.params.id}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
              this.lelang = res.data
              this.src="http://localhost/latihan_lelang/public/foto/" + this.lelang.foto
              console.log(this.src)
            }),
            this.axios.get(`http://localhost/latihan_lelang/public/api/history/${this.$route.params.id}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.history = res.data
            })
            .catch(err => console.log(err))
        
        },
        methods : {
            pilih(id_history) {
                this.axios.put(`http://localhost/latihan_lelang/public/api/history/pemenang/${id_history}`, this.lelang,{
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
