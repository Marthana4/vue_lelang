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
                      <h4 class="card-title">Users Data</h4>
                  </div>
                  <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col text-center">
                            <avataaars style="height:300px;"></avataaars>
                        </div>
                        <div class="col">
                            <div class="text-xs font-weight-bold text-uppercase">Name</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ user.nama }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Address</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ user.alamat }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Phone Number</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ user.no_hp }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Username</div>
                            <div class="h6 mb-0 text-gray-800 mb-2">{{ user.username }}</div>
                            <div class="text-xs font-weight-bold text-uppercase">Level</div>
                            <div class="h6 mb-0 text-muted text-gray-800 mb-2">{{ user.level }}</div>
                        </div>
                    </div>
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
import Avataaars from 'vuejs-avataaars'
    export default {
      components: {
      Avataaars
    },
        data() {
            return {
                user :{}
            }
        },
        created(){
            this.axios.get(`http://localhost/latihan_lelang/public/api/show/${this.$route.params.id}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.user = res.data
            })
            .catch(err => console.log(err))
        }
    } 
</script>
