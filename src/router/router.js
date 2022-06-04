import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Favourites from "../components/pages/Favourites.vue";
import Trash from "../components/pages/Trash.vue";

export const router = createRouter({
	history: createWebHashHistory("/notes-app/"),
	routes: [
		{ path: "/:pathMatch(.*)*", redirect: "/home" },
		{ path: "/home", name: "home", component: Home },
		{ path: "/favourites", name: "favourites", component: Favourites },
		{ path: "/trash", name: "trash", component: Trash }
	]
})
