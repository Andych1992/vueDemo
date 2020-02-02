<script>
export default {
	onLaunch: function() {
		console.log('App Launch')
		// Sync storage info
		this.$store.commit('GET_APP_STORAGE')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
@import './common/common.css';
</style>
