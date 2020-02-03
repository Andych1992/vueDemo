<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search"></uni-search-bar>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#1296db"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="detail">
						<view class="d-list">
							<view v-for="(item,index) in 4">
								<view class="materials">
									<image class="img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580545258795&di=c8f802b6f0fa8b9d62688cdbf3c585b6&imgtype=0&src=http%3A%2F%2Fimg.99114.com%2Fgroup1%2FM00%2F3A%2FCF%2FwKgGMFctoRuAGZD-AAGcExaGvhY255.jpg"></image>
									<view class="name">
										<view class="n-va">3M医用口罩</view>
										<view class="n-va">数量 : 15</view>
									</view>
									<view class="remove">
										<uni-number-box class="n-btn" :min="0" value="0"></uni-number-box>
										<view class="btn" :style="{background: index%2==0?'#1296db':'',color:index%2==0?'#f1f1f1':''}" @click="removeMaterials(index)">{{index%2==0?'已选择':'选择'}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="current === 1">

				</view>
				<view v-show="current === 2">

				</view>
				<view v-show="current === 3">

				</view>
			</view>
		</view>
		<view style="height: 14vw;"></view>
		<view class="button">
			<view class="b-t" @click="repay(0)">
				<uni-icons class="icon" type="reload" size="26"></uni-icons>
				<view class="wz">返回</view>
			</view>
			<view class="b-t" @click="repay(1)">
				<uni-icons class="icon" type="checkbox" size="26"></uni-icons>
				<view class="wz">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ["全部", "医疗物资", "其他"],
				current: 0
			}
		},
		methods: {
			repay(type){
				uni.navigateBack({
					
				})
			},
			removeMaterials(index) {

			},
			search() {

			},
			onClickItem(e) {
				this.current = e.currentIndex
			},
		}
	}
</script>

<style lang="scss">
	.detail {

		.title {
			padding: 3vw;
			font-size: 4vw;
			width: 20vw;
		}

		.d-list {
			.materials {
				margin: 2vw 0vw 0vw 3vw;
				width: 94vw;
				height: 17vw;
				border-radius: 1vw;
				border: 1rpx solid #BEBEBE;
				display: flex;
				flex-wrap: nowrap;

				.img {
					width: 17vw;
					height: 17vw;
					border-radius: 1vw;
				}

				.name {
					margin-left: 4vw;
					width: 27vw;

					.n-va {
						padding-top: 2vw;
						font-size: 3.7vw;
					}
				}

				.remove {
					display: flex;
					justify-content: space-between;
					width: 49vw;

					.n-btn {
						width: 20vw;
						height: 6vw;
						margin-top: 4vw;
					}

					.btn {
						margin-right: 3.5vw;
						margin-top: 3.5vw;
						width: 16vw;
						height: 10vw;
						border-radius: 1vw;
						font-size: 4vw;
						line-height: 10vw;
						border: 1rpx solid #BEBEBE;
						text-align: center;
					}
				}
			}
		}
	}

	.button {
		position: fixed;
		bottom: 0vw;
		width: 94vw;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 2vw 3vw;

		.b-t {

			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			width: 22vw;
			height: 10vw;
			border-radius: 1vw;
			border: 1rpx solid #BEBEBE;
			background: #F1F1F1;

			.icon {
				line-height: 10vw;
			}

			.wz {
				margin-left: 1vw;
				font-size: 3.8vw;
				line-height: 10vw;
			}
		}

	}
</style>
