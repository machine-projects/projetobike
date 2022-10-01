<template>
  <div>
    <b-carousel
      id="carousel-2"
      v-model="slide"
      controls
      indicators
      background="#ababab"
      img-width="400"
      img-height="50"
      style="text-shadow: 1px 1px 2px #333;"
   
    >

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Evento 1" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>

      <b-carousel-slide caption="Evento 2" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>

      <b-carousel-slide caption="Evento 3" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
      
    </b-carousel>
  </div>
</template>

<script>
  export default {
    name: 'CarrosselBanner',
    data() {
      return {
       slide: 0,
        sliding: false
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      }
    }
  }
</script>

<style>
.sr-only {
  display: none;
}
</style>