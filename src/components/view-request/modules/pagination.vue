<template>
  <div>
    
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: !enablePrev}"><a class="page-link" href="javascript:void(0)" @click="onPrevClick"><i class="fa fa-chevron-left"></i> </a></li>

        <li class="page-item" v-if="showEllipsePre"><a class="page-link" href="javascript:void(0)" @click="navigateToFirst"><i class="fa fa-ellipsis-h"></i></a></li>

        <li class="page-item " v-for="item in range(maxButtonIndex-numberOfButtons+1,maxButtonIndex) " :class="{active: item -1 === currentIndex}" >
          <a class="page-link" href="javascript:void(0)" @click="navigateTo(item)" >{{item}}</a>
        </li>

        <li class="page-item" v-if="showEllipseNext"><a class="page-link" href="javascript:void(0)" @click="navigateToLast"><i class="fa fa-ellipsis-h"></i></a></li>
        <li class="page-item" :class="{disabled: !enableNext}"><a class="page-link" href="javascript:void(0)" @click="onNextClick"><i class="fa fa-chevron-right"></i></a></li>

      </ul>
    </nav>
  </div>
  
</template>
<script src="./pagination.js"></script>
<!--<style lang="scss" src="./pagination.scss"></style>-->
