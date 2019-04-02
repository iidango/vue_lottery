<template>
</template>

<script>
  export default {
    data () {
      return {
        alignmentsAvailable: ['align-center', 'align-end', 'align-space-around', 'align-space-between', 'align-start', ''],
        alignment: 'align-center',
        alignmentsContentAvailable: ['align-content-center', 'align-content-end', 'align-content-space-around', 'align-content-space-between', 'align-content-start', ''],
        justifyAvailable: ['justify-center', 'justify-end', 'justify-space-around', 'justify-space-between', 'justify-start', ''],
        justify: 'justify-center',
        reverse: false,
        flexDirectionAvailable: ['row', 'column', ''],
        flexDirection: 'row',
        fillHeight: true
      }
    },
    computed: {
      layoutAttributes () {
        return {
          [this.alignment]: true,
          [this.justify]: true,
          [this.flexDirection]: true,
          reverse: this.reverse,
          'fill-height': this.fillHeight
        }
      }
    },
    methods: {
      formatAttributes (attributes) {
        const attributeArray = []
        for (const Key in attributes) {
          if (!attributes.hasOwnProperty(Key) || Key === '' || attributes[Key] === false) continue
          attributeArray.push(Key.trim())
        }
        return `<v-layout ${attributeArray.join(' ')}/>`
      }
    }

  }
</script>

<style>
  .resultContainer {
    height: 350px;
  }

  .item {
    min-height: 50px;
    min-width: 80px;
    margin: 10px;
  }
</style>