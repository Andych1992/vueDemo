<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search"></uni-search-bar>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#1296db"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="details" v-for="(item, index) in 5" :key="index">
						<view class="title">
							<view class="t-biao"><text :style="{color:index%2==0?'#007AFF':'#F76260'}">{{index%2==0?'直接发放 ':'申请发放  '}}</text>
								Z20201990509</view>
							<view class="t-time">2020-01-30 15:20:34</view>
						</view>
						<view class="cont">
							<view class="t-sum">发放总数 55</view>
							<view class="t-status" :style="{background:index%2==0?'#F76260':'#007AFF'}">已发</view>
						</view>
						<view class="title">
							<view class="t-biao">领取单位 郑州妇幼保健院</view>
							<view class="t-time">领取人 妇产科张红</view>
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					已发放
				</view>
				<view v-show="current === 2">
					已申请
				</view>
				<view v-show="current === 3">
					已驳回
				</view>
			</view>
		</view>
		<view>
			<uni-fab :pattern="pattern" vertical="bottom" horizontal="right" direction="vertical" :content="content" @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				items: ["全部", "已发放", "已申请", "已驳回"],
				grant_list: [
					[],
					[],
					[],
					[]
				],
				content: [{
					iconPath: '/static/icon/giveOut.png',
					selectedIconPath: '/static/icon/giveOut.png',
					text: '发放',
					active: false
				}],
				current: 0
			}
		},
		methods: {
			search() {

			},
			trigger(e) {
				switch (e.index) {
					case 0:
						uni.navigateTo({
							url: '/pages/addGrant/addGrant'
						})
						return;
				}
			},
			onClickItem(e) {
				this.current = e.currentIndex
			},

		}
	}
</script>

<style lang="scss">
	.content {
		.details {
			padding: 2vw;
			font-size: 3.7vw;
			border-top: 1rpx solid #BEBEBE;
			
			&:last-child {
				border-bottom: 1rpx solid #BEBEBE;
			}
			
			.title {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;

				.t-biao {
					width: 50vw;
					padding-left: 2vw;
				}

				.t-time {
					width: 50vw;
					padding-left: 2vw;
				}
			}

			.cont {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				padding: 0vw 2vw 0vw 2vw;

				.t-sum {
					font-size: 3.7vw;
					line-height: 6vw;
				}

				.t-status {
					right: 3vw;
					width: 12vw;
					height: 6vw;
					color: #FFFFFF;
					text-align: center;
					font-size: 3.7vw;
					line-height: 6vw;
					background: #1296db;
					border-radius: 5rpx;
				}
			}
		}
		
	}
</style>
