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
        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Users Data</h4>
                    <p class="card-description">Users and Operators Data</p>
                    <div class="table-responsive">
                      <router-link to="user/tambah" class="btn btn-outline-primary btn-fw text-right" style="float: right">
                        <span class="icon">
                          <i class="mdi mdi-account-plus"> </i>
                        </span>
                        <span class="text"> Add New </span>
                      </router-link>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> <i class="mdi mdi-emoticon-happy"></i> </th>
                            <th> Name </th>
                            <th> Address </th>
                            <th> Username </th>
                            <th> Level </th>
                            <th> Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(u,index) in user" :key="u.id">
                            <td class="py-1">
                              {{index+1}}
                            </td>
                            <td> {{u.nama}} </td>
                            <td>{{u.alamat}}</td>
                            <td> {{u.username}} </td>
                            <td> {{u.level}} </td>
                            <td>
                              <button type="button" class="btn btn-inverse-success btn-rounded btn-icon">
                                <router-link :to="{name :'detailuser',  params : {id : u.id}}" >
                                  <i class="mdi mdi-eye"></i>
                                </router-link>
                              </button>
                              <!-- <router-link :to="{detailuser, params : {id : u.id}}" class="btn btn-succes btn-circle">
                                <i class="far fa-eye"></i>
                              </router-link> -->
                              <button type="button" class="btn btn-inverse-warning btn-rounded btn-icon">
                                <router-link :to="{name :'edituser',  params : {id : u.id}}" class="btn-inverse-warning">
                                  <i class="mdi mdi-lead-pencil"></i>
                                </router-link>
                              </button>
                              <!-- <router-link :to="{edituser, params : {id : u.id}}" class="btn btn-inverse-warning btn-rounded btn-icon">
                                <i class="mdi mdi-lead-pencil"></i>
                              </router-link> -->
                              <button type="button" @click="hapus(u.id)" class="btn btn-inverse-danger btn-rounded btn-icon">
                                <i class="mdi mdi-delete"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
    export default {
        data() {
            return {
                user :{}
            }
        },
        created(){
            this.axios.get('http://localhost/latihan_lelang/public/api/getall',
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(res=>{
                this.user = res.data
            })
        },
        methods : {
            hapus(id){
                this.axios.delete(`http://localhost/latihan_lelang/public/api/delete/${id}`,
            {
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
            .then(() => {
                let i = this.user.map((item) => item.id).indexOf(id);
                this.user.splice(i, 1);
            });
            }
        }
    } 
</script>