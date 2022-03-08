<template>
<div class="container-scroller">
   <div class="container-fluid page-body-wrapper">
        <!-- partial:../../../partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                  <img src="../../../public/images/faces/face1.jpg" alt="profile">
                  <span class="login-status online"></span>
                  <!--change to offline or busy as needed-->
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2">David Grey. H</span>
                  <span class="text-secondary text-small">Project Manager</span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
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
                <span class="menu-title">Barang</span>
                <i class="mdi mdi-hexagon menu-icon"></i>
              </router-link>
            </li>
            <li  class="nav-item">
              <router-link class="nav-link" to="/lelang">
                <span class="menu-title">Lelang</span>
                <i class="mdi mdi-gavel menu-icon"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/history">
                <span class="menu-title">Riwayat</span>
                <i class="mdi mdi-clipboard-text menu-icon"></i>
              </router-link>
            </li>
            <li v-if="isAdmin" class="nav-item">
              <router-link class="nav-link" to="/report">
                <span class="menu-title">Report</span>
                <i class="mdi mdi-file-multiple menu-icon"></i>
              </router-link>
            </li>
          </ul>
        </nav>
   </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      isAdmin : false,
      isPetugas : false,
      isPengguna : false,
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