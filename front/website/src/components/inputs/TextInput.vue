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
          <b-form-input :type=type :placeholder=placeholder></b-form-input>
        </b-input-group>
    </b-form-group>
    </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
      iconName: String,
      label: String,
      placeholder: String,
      type: String

  }
};
</script>


<style scoped>
</style>
