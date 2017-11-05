var myMixins = {
  created () {
    console.log('这个created钩子在mixin.js中执行的')
  },
  methods: {
    mixinClick () {
      alert('hello world')
    }
  }
}
export default myMixins
