<script setup lang="ts"></script>

<template>
	<div class="about-container">
		<div class="title-wrap">
			<h1>CoderJc</h1>
		</div>
		<article>
			<div class="prose-wrap">
				<p>花径不曾缘客扫，蓬门今始为君开，我是劫辞(coderjc)，前端领域的学习者。</p>
				<p>
					这是我的个人博客，记录一些自己的学习日常和生活随笔。而跨入前端过程来源一次实践，比如不太想干体力活，幸运的是，接触前端以来，它所见即所得的编程效果让我有着不小的学习动力与兴趣，让我在这条路上坚持了下来。
				</p>
				<p>
					在早期我喜欢一些奇奇怪怪的交互效果，每实现一个都让我有着不小的满足感，但是可能是我本人缺乏这些奇思妙想和设计美感，所以这个阶段时间并不算长，已经很久没有去关注过了，如果你现在处于刚学习前端的阶段，也喜欢实现类似的效果，你可以点击浏览一下
					<a
						target="_blank"
						href="https://gitee.com/qwer-li/html-css-js-case"
						>html+css+js案例</a
					>，虽然想过很多次将里面效果再重新实现一次会更好，不过懒癌发作，就这样吧，哈哈哈。
				</p>
				<p>
					后续接触了JavaScript高级，不是我所认为的更方便的语法，让我对前端的认知有了进一步的提升，也真正感受到了前端基石是JavaScript这句话的含义，这一阶段如果有人指引可能会一开始就知道，不过我这种半吊子的自学，走的还是有一些曲折的，好在为时不晚，这一阶段我第一次有了迈上一个新台阶的快感，也扫清了我头顶上一部分的迷雾。
				</p>
				<p>
					后面在前端的学习路程上，就一直保持碎片化的学习，缺啥补啥，而随着经验的增加，对于开源社区的想法也再一次浮现了出来，于是我发布了我的第一个作品，<a
						target="_blank"
						href="https://www.npmjs.com/package/koa-api-gen"
						>koa-api-gen</a
					>，在发布之后的三周内，每周都有着400+的下载量，最高时接近500，算是对我的一个极大的激励，然后这个作品尚未沉淀完成，我就马不停蹄的开启了我的另外一个作品，个人组件库
					<a
						target="_blank"
						href="https://coderjc-ui.coderjc.cn/"
						>Coderjc UI</a
					>，太过着急的结果就是，实现了效果，但是项目工程却是一堆乱麻，属于为了完成而完成的“屎山”，果然，欲速则不达啊，不过这个经验还是很宝贵的，毕竟一开始就能完美的事情少之又少。
				</p>
				<p>
					不过发生了一些事情，让我破了点小财，也让我忙忙碌碌不停奔跑的脚步暂时的停滞了下来。在这段意外的休息日，我回顾了这几年的经历，是否真的太过紧绷了，是否这样的生活就是人生的全部呢，细想一番，技术固然重要，不过好像也没重要到放弃全部的个人休息时间。人生就是充满了不确定性，不如意之事，十之八九，未来谁也不知道是什么，过好当下即可，所以经历了一番思考之后，重新拾起了停滞很长一段时间的爱好，游戏、手工等，给于几技术方面时间相应减少了一些，至少不再是全部，不过这番思考好像听着像《劝玩策》一样，嘿嘿！
				</p>
				<p>
					感谢您看完了我唠叨，在网络的星辰大海中相遇，亦是一种缘分，如果有着一些建议，可以通过 coderjc@qq.com
					这个邮箱给我留言，如果是想和我进行一些交流，可以通过
					<a
						title="2740954762"
						target="_blank"
						:href="`tencent://message/?Menu=yes&uin=${2740954762}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
						>QQ联系我</a
					>。
				</p>
				<p>山水有来路，早晚复相逢，愿祝君如此山水，滔滔岌岌风云起。</p>
			</div>
		</article>
	</div>
</template>

<style scoped lang="less">
.about-container {
	max-width: 720px;
	margin: 0 auto;
	padding: 20px;
	.title-wrap {
		margin-bottom: 20px;
	}
	.prose-wrap {
		color: var(--el-text-color-regular);
		line-height: 1.7;
		p {
			font-size: 18px;
			margin-bottom: 12px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		a {
			color: var(--el-text-color-primary);
			text-decoration-color: var(--el-text-color-placeholder);
			transition: text-decoration-color 0.3s;
			&:hover {
				text-decoration-color: var(--el-text-color-primary);
			}
		}
	}
}
</style>
