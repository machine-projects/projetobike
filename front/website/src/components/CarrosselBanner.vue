<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="6000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="240"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
    >
   <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/240/?image=52"></b-carousel-slide>

     <!-- Slides with image only -->
     <b-carousel-slide img-src="https://picsum.photos/1024/240/?image=54"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/240/?image=58"></b-carousel-slide>
    </b-carousel>

    <p class="mt-4">
    </p>
  </div>
</template>

<script>
  export default {
    name: 'CarrosselBanner',
    data() {
      return {
       slide: 0,
        sliding: true
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      }
    }
  }
</script>

