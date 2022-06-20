<template>
  <div class="home">
     <NavBar />
    <CarrosselBanner />
    <BuscarCorridas class="w-75 m-auto"/>

     <div 
      class="py-4"
    >
      <b-card 
        class="w-75 m-auto text-center"
      >
        <div class="rounded bg-secondary text-light d-flex flex-row align-items-center">
          <mdicon 
            name="calendar-check" 
            class="mx-3"
          />
          <h2
            class="m-0"
          >
            Próximos Eventos
          </h2>
        </div>
      </b-card>
    </div>

    <div
    v-show="this.$route.fullPath == '/'"
    >
        <!-- <b-card-group deck
          class="m-auto"
        >
          <b-container>
            <b-row
            >
              <b-col
                class="py-2"
                sm="12"
                md="6"
                lg="4"
                v-for="event in events"
                :key="event.id"
              >
                <b-card
                class="h-100"

                  :title="event.title" img-src="" img-alt="Image" img-top>
            <b-card-text>
              {{ event.description }}
            </b-card-text>
            <template #footer>
              <small class="text-muted">Data de início {{ event.startDate.substring(0, 10).split('-').reverse().join('-') }}</small>
              <br>
              <small class="text-muted">Data de término {{ event.stopDate.substring(0, 10).split('-').reverse().join('-') }}</small>
            </template>
          </b-card>
              </b-col>
            </b-row>
          </b-container>
        </b-card-group> -->


          <b-card-group deck
          class="m-auto"
        >
          <b-container>
            <b-row>
              <b-col
                class="py-2"
                sm="12"
                md="4"
                lg="3"
                v-for="event in events"
                :key="event.id"
              >
              
                 <div type="ticket" class="flex-column w-100 text-center h-100"> 
                  <div class="top --flex-column" style="height: calc(90% - 10px)">
                    <div class="bandname -bold"> {{ event.title }}</div>
                    <div class="tourname">  {{ event.description }} </div>
                    <div style="display: flex; flex-direction: column;">
                      <img class="w-100"  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="" />
                      <div class="deetz --flex-row-j!sb">
                        <div class="event --flex-column">
                          <div class="date"> Data de início {{ event.startDate.substring(0, 10).split('-').reverse().join('-') }} </div>
                          <div class="date"> Data de encerramento {{ event.stopDate.substring(0, 10).split('-').reverse().join('-') }} </div>
                          <div v-if="event.state && event.city" class="location -bold"> {{ event.state }}, {{ event.city }}</div>
                          <div v-else class="location -bold"> Local não informado </div>
                        </div>
                        <div class="price --flex-column align-self-end">
                          <div v-if="event.isFeatured" class="label patrocinado"> Evento Patrocinado </div>
                        </div> 
                      </div> 
                    </div>
                  </div>
                  <div class="rip"></div>
                  <div class="bottom --flex-row-j!sb" style="height: calc(10% - 10px)">
                    <a class="buy" href="#">INSCREVER-SE</a>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-card-group>

       
      </div>
    
    <div
      v-show="this.$route.fullPath !== '/'"
    >
       <div
        v-if="sortedEvents !== null"
      >
        <b-card-group deck
          class="m-auto"
        >
          <b-container>
            <b-row>
              <b-col
                class="py-2"
                sm="12"
                md="6"
                lg="4"
              
                v-for="event in sortedEvents"
                :key="event.id"
              >
                <b-card
                  :title="event.title" img-src="" img-alt="Image" img-top>
            <b-card-text>
              {{ event.description }}
            </b-card-text>
            <template #footer>
              <small class="text-muted">Data de início {{ event.startDate.substring(0, 10).split('-').reverse().join('-') }}</small>
              <br>
              <small class="text-muted">Data de término {{ event.stopDate.substring(0, 10).split('-').reverse().join('-') }}</small>
            </template>
          </b-card>
              </b-col>
            </b-row>
          </b-container>
        </b-card-group>
      </div>
    </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import CarrosselBanner from '@/components/CarrosselBanner.vue'
import BuscarCorridas from '@/components/BuscarCorridas.vue'
import axios from "axios";

export default {
  name: 'HomeView',
  components: {
   CarrosselBanner,
   BuscarCorridas,
   NavBar
   
  },
  data() {
    return {
      events: null,
      sortedEvents: null
    }
  },
  created() {
    this.getEvents()
  },
  methods: {
    async getEvents() {
      const self = this
      const options = `http://localhost:3000/api/v1/event`
    await axios
    .get(options)
    .then(function (response) {
      self.events = response.data;
    }).catch(function (error) {
      console.error(error);
    });
    }
  },
  watch: {
    '$route.query': {
      handler: function(search) {
        console.log(search)
        if (search.state && !search.city && !search.event) {
            this.sortedEvents = this.events.filter(item => {
         return  item.state.toLowerCase() == search.state
        })
        }
        else if (search.state && search.city && !search.event) {
           this.sortedEvents = this.events.filter(item => {
         return item.state.toLowerCase() == search.state &&
                item.city.toLowerCase() == search.city
        })
        }
        else if (search.state && search.city && search.event) {
           this.sortedEvents = this.events.filter(item => {
         return item.title.toLowerCase().includes(search.event) &&
                item.state.toLowerCase() == search.state &&
                item.city.toLowerCase() == search.city
        })
        }
        else if (search.city && !search.state && !search.event) {
           this.sortedEvents = this.events.filter(item => {
         return item.city.toLowerCase() == search.city
        })
        }
        else if (search.city && search.event && !search.state) {
            this.sortedEvents = this.events.filter(item => {
         return item.title.toLowerCase().includes(search.event) &&
                item.city.toLowerCase() == search.city
        })
        }
        else if (search.event && !search.city && !search.state) {
           this.sortedEvents = this.events.filter(item => {
         return item.title.toLowerCase().includes(search.event)
        })
        }
        else return
      }
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
   background-image: linear-gradient(-45deg, #8067B7, #EC87C0);
   margin: 20px;
   font-family: 'Lato', sans-serif;
   div[type="ticket"] {
      height: 100% !important;
      filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
      &[type="ticket"] {
         .top,
         .bottom {
            >div {
               padding: 0 18px;
               &:first-child {
                  padding-top: 18px;
               }
               &:last-child {
                  padding-bottom: 18px;
               }
            }
            img {
               padding: 18px 0;
            }
         }
         .top,
         .bottom,
         .rip {
            background-color: #fff;
         }
         .top {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            .deetz {
               padding-bottom: 10px !important;
            }
         }
         .bottom {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            padding: 18px;
            padding-top: 10px;
        
            .buy {
               display: block;
               font-size: 12px;
               font-weight: bold;
               background-color: #5D9CEC;
               padding: 0 18px;
               line-height: 30px;
               border-radius: 15px;
               color: #fff;
               text-decoration: none;
            }
         }
         .rip {
            height: 20px;
            margin: 0 15px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==);
            background-size: 4px 2px;
            background-repeat: repeat-x;
            background-position: center;
            position: relative;
            box-shadow: 0 1px 0 0 #fff, 0 -1px 0 0 #fff;
            &:before,
            &:after {
               content: '';
               position: absolute;
               width: 29px;
               height: 29px;
               top: 50%;
               transform: translate(-50%, -50%) rotate(45deg);
               border: 5px solid transparent;
               border-top-color: #fff;
               border-right-color: #fff;
               border-radius: 100%;
               pointer-events:none;
            }
            &:before {
               left: -10px;
            }
            &:after {
               transform: translate(-50%, -50%) rotate(225deg);
               right: -40px;
            }
         }
      }
      .-bold {
         font-weight: bold;
      }
   }

   .patrocinado {
     color: red;
     font-weight: 900;
   }
}
</style>