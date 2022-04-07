<template>
  <div>
    <nav class="navbar">
      <div class="page-label">
        <slot name="page-label">
          <span class="logo"><b>Notes</b><b>Mini</b></span>
        </slot>
      </div>

      <div>
        <slot name="action-button">
          <button class="create-note-btn comical-shadow-clickable" @click="showForm" :disabled="activePage === 'favourites'">
            <span class="rising-background">
              <svg viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/></g></svg>
              New note
            </span>
            <!-- Reason for choosing empty span tags over ::before, ::after 👇 -->
            <!-- Hover effect ka chakkar hai babu bhaiya, hover effect ka chakkar 😩 -->
            <span></span>
            <span></span>
          </button>
        </slot>
      </div>
    </nav>

    <div v-if="notesUnavailable" class="notes-unavailable">
      <slot name="notes-unavailable">      
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="338.7359" y1="219.6922" x2="662.6459" y2="-18.3279" gradientTransform="matrix(1.0039 0 0 -1.0039 0.1922 516.5606)"><stop offset="0" style="stop-color:#B8DE6F"></stop><stop offset="1" style="stop-color:#8AA753"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" style="fill:url(#SVGID_1_);" d="M453.384,20.5l58.354,381.648c1.887,12.344-6.599,23.894-18.943,25.782l-381.648,58.354  c-12.344,1.887-23.894-6.599-25.782-18.943L27.011,85.693c-1.887-12.344,6.599-23.894,18.943-25.782L427.602,1.557  C439.946-0.33,451.496,8.156,453.384,20.5z" fill=""></path><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="322.3236" y1="198.6866" x2="627.2736" y2="-63.1735" gradientTransform="matrix(1.0039 0 0 -1.0039 0.1922 516.5606)"><stop offset="0" style="stop-color:#FE7695"></stop><stop offset="1" style="stop-color:#FE547B"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" style="fill:url(#SVGID_2_);" d="M457.455,50.956l29.261,384.973c0.947,12.452-8.391,23.325-20.842,24.272L80.901,489.462  c-12.452,0.947-23.325-8.391-24.272-20.842L27.368,83.647c-0.947-12.452,8.391-23.325,20.842-24.272l384.973-29.261  C445.635,29.167,456.509,38.504,457.455,50.956z" fill=""></path><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="304.369" y1="178.9728" x2="588.5989" y2="-105.2572" gradientTransform="matrix(1.0039 0 0 -1.0039 0.1922 516.5606)"><stop offset="0" style="stop-color:#67DCDC"></stop><stop offset="1" style="stop-color:#019394"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" style="fill:url(#SVGID_3_);" d="M459.207,81.633v386.083c0,12.488-10.135,22.622-22.622,22.622H50.502  c-12.488,0-22.622-10.135-22.622-22.622V81.633c0-12.488,10.135-22.622,22.622-22.622h386.083  C449.073,59.01,459.207,69.146,459.207,81.633z" fill=""></path><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="228.5151" y1="284.5429" x2="228.5151" y2="-203.4571" gradientTransform="matrix(1.0039 0 0 -1.0039 0.1922 516.5606)"><stop offset="0" style="stop-color:#FCC344"></stop><stop offset="1" style="stop-color:#F7AE3D"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" style="fill:url(#SVGID_4_);" d="M314.922,510.62L20.926,488.501c-12.459-0.938-21.798-11.797-20.861-24.256L29.029,79.25  c0.938-12.459,11.797-21.798,24.256-20.861l384.996,28.964c12.459,0.938,21.798,11.797,20.862,24.256L436.58,411.51  c-0.26,3.452-1.867,6.663-4.474,8.94l-94.716,82.691C331.202,508.541,323.11,511.235,314.922,510.62z" fill=""></path><g xmlns="http://www.w3.org/2000/svg"><rect x="74.864" y="201.706" transform="matrix(-0.9971 -0.0756 0.0756 -0.9971 467.3999 446.2027)" style="" width="334.564" height="25.096" fill="#fff2eb" data-original="#fff2eb"></rect><rect x="70.035" y="265.406" transform="matrix(-0.9971 -0.0756 0.0756 -0.9971 452.9404 573.0537)" style="" width="334.564" height="25.096" fill="#fff2eb" data-original="#fff2eb"></rect><rect x="65.323" y="325.808" transform="matrix(-0.9971 -0.0756 0.0756 -0.9971 352.1519 690.0431)" style="" width="247.628" height="25.096" fill="#fff2eb" data-original="#fff2eb"></rect></g><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="184.4758" y1="54.4429" x2="184.4758" y2="7.3929" gradientTransform="matrix(1.0039 0 0 -1.0039 0.1922 516.5606)"><stop offset="0" style="stop-color:#FCC344;stop-opacity:0"></stop><stop offset="1" style="stop-color:#D48000"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" style="fill:url(#SVGID_5_);" d="M337.387,503.141l33.394-29.155L1.423,446.199l-1.357,18.047  c-0.908,12.063,7.835,22.638,19.703,24.138c0.382,0.048,0.769,0.087,1.159,0.116l293.995,22.118  C323.11,511.235,331.202,508.541,337.387,503.141z" fill=""></path><linearGradient xmlns="http://www.w3.org/2000/svg" id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="356.8396" y1="71.3947" x2="424.2696" y2="-7.0052" gradientTransform="matrix(1.0039 0 0 -1.0039 0.1922 516.5606)"><stop offset="0" style="stop-color:#FCC344"></stop><stop offset="1" style="stop-color:#D48000"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" style="fill:url(#SVGID_6_);" d="M435.019,416.811c0,0-0.808,1.838-3.63,4.265c-1.048,0.902-93.444,81.58-93.444,81.58  c-6.542,5.711-15.1,8.559-23.76,7.908l0,0l0,0c7.475,0.562,13.991-5.042,14.553-12.517l4.978-66.171  c0.938-12.459,11.797-21.798,24.256-20.861L435.019,416.811z" fill=""></path><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>
          <span>Anything to add?</span>
        </h2>
      </slot>
    </div>

    <div @click="closeNote" :class="['overlay', overlayVisible]"></div>
    <div :class="['background-blur', blurOverlayClasses]"></div>
    <slot name="confirm-deletion"></slot>

    <create-note
      :activePageName="activePage"
      :fontDropdownVisible="isFontDropdownVisible"
      :paletteVisible="isPaletteVisible"
      @toggle-font-dropdown="toggleFontSelect"
      @hide-font-dropdown="hideFontSelect"
      @toggle-palette="toggleThemeSelect"
      @hide-palette="hideThemeSelect"
      @delete-note="confirmDeleteAmount"
      @is-theme-gradient="themeIsGradient">
    </create-note>

    <div class="notes">
      <note
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :text="note.text"
        :images="note.images"
        :theme="note.theme"
        :font="note.font"
        :favourite="note.favourite">
      </note>
    </div>

    <footer>
      <p>
        Created by <a class="rising-background" href="https://zakariyaq313.github.io/my_website/" target="_blank" rel="noopener">Muhammad Zakariya</a>
      </p>
    </footer>
  </div>
</template>

<script>
import CreateNote from "./CreateNote.vue";
import Note from "./Note.vue";

export default {
  name: "Base",

  components: {
    "create-note": CreateNote,
    "note": Note,
  },

  props: {
    activePage: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isPaletteVisible: false,
      isFontDropdownVisible: false,
      isThemeGradient: false
    }
  },

  methods: {
    toggleFontSelect() {
      this.isFontDropdownVisible = !this.isFontDropdownVisible;
    },

    hideFontSelect() {
      this.isFontDropdownVisible = false;
    },

    toggleThemeSelect() {
      this.isPaletteVisible = !this.isPaletteVisible;
    },

    hideThemeSelect() {
      this.isPaletteVisible = false;
    },

    themeIsGradient(value) {
      this.isThemeGradient = value;
    },

    showForm() {
      this.$store.commit("newNote", true);
      this.$store.commit("formVisibility", true);
    },

    closeNote() {
      this.hideThemeSelect();
      this.hideFontSelect();
      this.$store.dispatch("exitNote", this.activePage);
    },

    confirmDeleteAmount(amount) {
      this.$emit("confirm-deletion", amount);
    }
  },

  computed: {
    notes() {
      if (this.activePage === "favourites") {
        return this.$store.state.favouriteNotes;
      } else if(this.activePage === "trash") {
        return this.$store.state.trashedNotes;
      } else {
        return this.$store.state.userNotes;
      }
    },

    notesUnavailable() {
      if(this.notes.length <= 0 && !this.$store.state.isFormVisible) {
        return true;
      } else {
        return false;
      }
    },

    overlayVisible() {
      return this.$store.state.isFormVisible ? "overlay-visible" : "";
    },

    blurOverlayClasses() {
      let classes = [this.$store.state.noteTheme, //theme colour
                    this.$store.state.isFormVisible && this.isThemeGradient ? "blur-visible" : ""]; //visibility      
      return classes;
    }
  },

  mounted() {
    this.$watch(
      () => [this.$store.state.noteTitle, this.$store.state.noteText, this.$store.state.noteImages],
      (currentValue) => {
        if (currentValue[0].trim() !== "" ||
            currentValue[1].trim() !== "" ||
            currentValue[2].length > 0) {
          this.$store.commit("noteEmpty", false);
        } else {
          this.$store.commit("noteEmpty", true);
        }
      },
      {
        deep: true
      }
    )
  }
};
</script>
