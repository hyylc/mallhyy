<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>      
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>

.nav-bar {
	display: flex;
	height: 44px;
	/* line-height 必须有内容才会显示  */
	line-height: 44px;
	text-align: center;

	/* 在nav-bar中设置背景颜色的话，每次使用组件都是这个颜色 */
	/* 不建议这样写 */
	/* background-color: antiquewhite;*/

	/* 设置阴影 */
	box-shadow: 0 5px 5px rgba(100, 100, 100, 0.1);
}

.left, .right {
	width: 60px;
}

.center {
	/* 设置flex=1可以占据所有剩余位置 */
	flex: 1;
}

</style>
