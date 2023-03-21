<template>
    <div >
        <div class="toast" v-show="isShow">{{ message }}</div>
    </div>
</template>


<script>
 export default {
    name: 'Toast',
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message = '默认文字', duration = 1000) {
            this.message = message
            this.isShow = true

            setTimeout(() => {
                this.isShow = false
            }, duration)
        }
    }
 }
</script>


<style scoped>
    .toast {
        position: fixed;
        left: 50%;
        top: 50%;
        padding: 8px 10px;
        transform: translate(-50%, -50%);
        
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;

        z-index: 10;

    }

</style>