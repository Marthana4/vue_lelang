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
                    <h4 class="card-title">Tambah Users</h4>
                    <form @submit.prevent="tambah" class="forms-sample">
                      <div class="form-group">
                        <label for="exampleInputName1">Nama</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Nama" v-model="user.nama">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputAlamat1">alamat</label>
                        <input type="text" class="form-control" id="exampleInputAlamat1" placeholder="Alamat" v-model="user.alamat">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputNoHp1">No Hp</label>
                        <input type="text" class="form-control" id="exampleInputNoHp1" placeholder="No Hp" v-model="user.no_hp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputUsername1">Username</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username" v-model="user.username">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="user.password">
                      </div>
                      <div class="form-group">
                        <label for="exampleSelectLevel">Level</label>
                        <select class="form-control" id="exampleSelectLevel" v-model="user.level">
                          <option value="petugas">Petugas</option>
                          <option value="pengguna">Pengguna</option>
                        </select>
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
                user : {}
            }
        },
        methods : {
            tambah() {
                this.axios.post('http://localhost/latihan_lelang/public/api/register', this.user,{
                headers : { Authorization : 'Bearer' + this.$store.state.token}
            })
                .then(()=>{
                this.$router.push('/user')
            })
                .catch(err => console.log(err))
            }
        }
    } 
</script>
