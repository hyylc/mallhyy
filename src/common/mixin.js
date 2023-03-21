import BackTop from '@/components/content/backTop/BackTop.vue'
import { BACK_POSITION }  from '@/common/const'

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            // 使用组件的scrollTo方法
            this.$refs.scroll.scrollTo(0, 0)
        },
        listenShowBackTop(position) {
            // 判断backTop是否显示
            this.isShowBackTop = (-position.y) > BACK_POSITION
        }
    }
}