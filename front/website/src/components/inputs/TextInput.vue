<template>
    <div>
    <b-form-group
        :label=label
    
    >
        <b-input-group 
        size="sm" 
        class="mb-2"
        >
          <b-input-group-prepend is-text>
            <mdicon size="19" :name=iconName />
          </b-input-group-prepend>
          <b-form-input
            v-model="eventName"
            @input="selectEvent"
           :type=type :placeholder=placeholder></b-form-input>
        </b-input-group>
    </b-form-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      eventName: undefined,
    }
  },
  methods: {
    selectEvent() {
      if (this.eventName == "") {
        this.$emit('selectedEvent', undefined)
      } 
      else {
        this.$emit('selectedEvent', this.eventName)
      }
    }
  },
  props: {
      iconName: String,
      label: String,
      placeholder: String,
      type: String
  },
  name: "TextInput",
  
};
</script>


<style scoped>
</style>
