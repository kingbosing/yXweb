<template>
<div class="file-icon file-icon-default" :data-type="extension">
</div>
</template>

<script>
import fileiconcss from 'fileicon.css'

export default {
  name: 'file-icon',
  components: {
    fileiconcss
  },
  props: {
    extension: {
      type: String,
      default: ''
    }
  }
}
</script>
