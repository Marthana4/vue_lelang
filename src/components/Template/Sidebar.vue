<template>
<div class="container-scroller">
   <div class="container-fluid page-body-wrapper">
        <!-- partial:../../../partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav space">
            <li class="nav-item nav-profile ">
              <a href="#" class="nav-link">
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2"></span>
                  <span class="text-secondary text-small"></span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <span class="menu-title">Dashboard</span>
                <i class="mdi mdi-home menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isAdmin" class="nav-item">
              <router-link class="nav-link" to="/user">
                <span class="menu-title">Users</span>
                <i class="mdi mdi-contacts menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isPetugas || isAdmin" class="nav-item">
              <router-link class="nav-link" to="/barang">
                <span class="menu-title">Items</span>
                <i class="mdi mdi-hexagon menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isPetugas" class="nav-item">
              <router-link class="nav-link" to="/lelang">
                <span class="menu-title">Lelang</span>
                <i class="mdi mdi-gavel menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isPengguna" class="nav-item">
              <router-link class="nav-link" to="/penawaran">
                <span class="menu-title">Penawaran</span>
                <i class="mdi mdi-clipboard-text menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isPetugas" class="nav-item">
              <router-link class="nav-link" to="/history">
                <span class="menu-title">History</span>
                <i class="mdi mdi-clipboard-text menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isAdmin || isPetugas" class="nav-item">
              <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">Report</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-file-multiple menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> 
                    <router-link class="nav-link" to="/reportlelang">
                      <span class="menu-title">Report Lelang</span>
                    </router-link>
                  </li>
                  <li class="nav-item"> 
                    <router-link class="nav-link" to="/reporthistory">
                      <span class="menu-title">Report Penawaran</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
   </div>
</div>
</template>
<style scoped>
.space {
  margin: 10px auto 0 auto;
}
</style>
<script>
export default {
  data(){
    return{
      isAdmin : false,
      isPetugas : false,
      isPengguna : false,
      nama : " ",
    }

  },
  created(){
    var user = JSON.parse(this.$store.state.datauser)
        var level = user.level

        if(level == 'admin')this.isAdmin = true
        else if(level == 'petugas')this.isPetugas =true
        else this.isPengguna = true
  }
}
</script>