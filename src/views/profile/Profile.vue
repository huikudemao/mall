<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的商城</div>
    </nav-bar>
      <login />
      <money />
      <div class="line"></div>
      <profile-list />
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import Login from "./children/Login";
  import Money from "./children/Money";
  import ProfileList from "./children/profileList";

  export default {
    name: "Profile",
    components: {ProfileList,
      Money,
      Login,
      NavBar
    }
  };
</script>

<style scoped>
  .profile {
    width: 100%;
    height: 100%;
  }

  .nav-bar {
    font-weight: 600;
    color: white;
    background-color: #ff8198;
  }

  .line {
    width: 100%;
    height: 10px;
    background-color: #eeeeee;
  }

</style>
