<template>
<div>

    <div v-for="item in exts" :key="item">
        <file-icon :extension='item'></file-icon>
    </div>

</div>
</template>

<script>
import FileIcon from '@/components/FileIcon'

export default {
  name: 'file-icon-demo',
  components: {
    FileIcon
  },
  data() {
    return {
      exts: [
        'doc',
        'ppt',
        'xlsx',
        'psd',
        '.psd',
        'folder',
        'dir',
        'exe',
        'vso',
        'pptx',
        'ai'
      ]
    }
  }
}
</script>
