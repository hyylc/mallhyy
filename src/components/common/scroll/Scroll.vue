<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'Scroll',
        data() {
            return {
                scroll: null
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        // 组件创建完使用，只有在mounted中使用，此时才能拿到wrapper组件
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
            // probetype 取值
            // 0：默认值，不监听实时位置
            // 1：不监听
            // 2：只监听手指滑动，不监听手指离开的惯性滑动
            // 3：只要是滚动，都监听
            probeType: this.probeType,
            // scroll内部点击有效
            click: true,
            pullUpLoad: this.pullUpLoad
            })


            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            })


            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        },
        methods: {
            // 给组件设置scrollTo方法
            scrollTo(x, y, time=300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                // console.log('scroll----')
                this.scroll && this.scroll.refresh()
            }
        }

    }
</script>

<style scoped>
</style>