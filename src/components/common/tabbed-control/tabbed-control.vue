<template>
  <div class="tabbed-control">
    <ul class="nav">
      <li class="nav-item" v-for="(navItem, index) in items">
        <a class="nav-link" v-bind:class="{active: navItem.active}" data-toggle="tab" @click="tabChanged(index)">{{navItem.label}}</a>
      </li>

    </ul>
    <div class="tab-content pt-4">
      <div class="tab-pane container" v-for="(tab, index) in items" v-bind:class="{active: tab.active}">
        <transition name="fade">
          <slot v-bind:name="'tab_' + index"  v-if="tab.active">
                     

          </slot>
        </transition>
      </div>
     
    </div>
  </div>

</template>
<script src="./tabbed-control.js"></script>
<style lang="scss" src="./tabbed-control.scss" ></style>
