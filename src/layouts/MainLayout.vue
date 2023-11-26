<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-icon name="sports_esports"/>
          Games Currency Shop
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <q-item-label header> Essential Links </q-item-label>
          <div v-if="notRegis">
            <EssentialLink
              v-for="link in unregisessentialLinks"
              :key="link.title"
              v-bind="link"
            />
          </div>
          <div v-else-if="isUser">
            <EssentialLink
              v-for="link in useressentialLinks"
              :key="link.title"
              v-bind="link"
              :user="isUser"
              :admin="isAdmin"
              @link-clicked="handleLinkClicked"
            />
          </div>
          <div v-else-if="isAdmin">
            <EssentialLink
              v-for="link in adminessentialLinks"
              :key="link.title"
              v-bind="link"
              :user="isUser"
              :admin="isAdmin"
            />
          </div>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://static.vecteezy.com/system/resources/previews/003/127/954/non_2x/abstract-template-blue-background-white-squares-free-vector.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="getIcon" />
          </q-avatar>
          <div class="text-weight-bold" style="color: black;">Welcome {{ usernameDisplay }} to Games Currency Shop!</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import EssentialLink from 'components/EssentialLink.vue'
import { useLoginUserStore } from "../stores/loginUserStore.js";
import { useRouter } from 'vue-router';

const unregislinksList = [
  {
    title: "Register",
    caption: "Register to Games Currency Shop",
    icon: "app_registration",
    link: "/register",
  },
  {
    title: "Login as a User",
    caption: "Login to the system as a user",
    icon: "login",
    link: "/user/login",
  },
  {
    title: "Login as an Admin",
    caption: "Login to the system as an admin",
    icon: "admin_panel_settings",
    link: "/admin/login",
  },
];

const userlinksList = [
  {
    title: "Order",
    caption: "Order for each game currency",
    icon: "description",
    link: "/user/order",
  },
  {
    title: "Dashboard",
    caption: "Check your spending",
    icon: "dashboard",
    link: "/user/dashboard",
  },
  {
    title: "Logout",
    caption: "Logout from the system",
    icon: "logout",
    link: "/user/login",
  },
];

const adminlinksList = [
  {
    title: "Dashboard",
    caption: "Check order from user",
    icon: "space_dashboard",
    link: "/admin/dashboard",
  },
  {
    title: "Manage User",
    caption: "Manage a user rom system",
    icon: "manage_accounts",
    link: "/admin/list",
  },
  {
    title: "Add New Game",
    caption: "Add new game in shop",
    icon: "games",
    link: "/admin/add",
  },
  {
    title: "Comfirm Order",
    caption: "Confirm the user's order",
    icon: "border_color",
    link: "/admin/confirm",
  },
  {
    title: "Logout",
    caption: "Logout from the system",
    icon: "logout",
    link: "/admin/login",
  },
];

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const storeLogUser = useLoginUserStore();
    const router = useRouter();
    const leftDrawerOpen = ref(false);

    // Computed properties for determining user states
    const notRegis = computed(() => !storeLogUser.userType);
    const isUser = computed(() => storeLogUser.userType === 'user');
    const isAdmin = computed(() => storeLogUser.userType === 'admin');
    const usernameDisplay = computed(() => storeLogUser.fullname || 'Guest');
    const getIcon = computed(() => {
      if (isUser.value) {
        return 'https://cdn-icons-png.flaticon.com/512/147/147142.png';
      } else if (isAdmin.value) {
        return 'https://cdn-icons-png.flaticon.com/512/3781/3781973.png';
      }
      return 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png';
    });

    function handleLinkClicked(linkTitle) {
      if(linkTitle === 'Logout') {
        logout();
      }
    }

    return {
      unregisessentialLinks: unregislinksList,
      useressentialLinks: userlinksList,
      adminessentialLinks: adminlinksList,
      notRegis,
      isUser,
      isAdmin,
      usernameDisplay,
      getIcon,
      leftDrawerOpen,
      handleLinkClicked,
      toggleLeftDrawer: () => {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
