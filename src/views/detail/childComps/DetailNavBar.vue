<template>
    <div>
        <nav-bar>
            <div slot="center" class="title">
                <div slot="left" class="back" @click="backClick">
                    <img src="~assets/img/common/back.svg" alt="">
                </div>
                <div v-for="(item,index) in titles" 
                    class="title-item"
                    :class="{active : index == currentIndex}"
                    @click="titleClick(index)">
                    {{ item }}
                </div>
            </div>
        </nav-bar>
    </div>
    
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'


export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    props: {
        // currentIndex: {
        //     type: Number,
        //     default: 0
        // }
    },
    components: {
        NavBar,
    },
    methods: {
        titleClick(index) {
            // this.currentIndex = index
            this.$emit('titleClick', index)
        },
        backClick() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    font-size: 16px;
}

.title-item {
    flex: 1;
}

.active {
    color: red;
}

.back img{
    /* left: 10px; */
    margin-top: 12px;
}
</style>