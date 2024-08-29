const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const nodemailer = require('nodemailer')
const mailFileUrl = path.resolve(global.process.cwd(), 'src/config', 'mail.yaml')
const mailInfo = yaml.load(fs.readFileSync(mailFileUrl, 'utf8'))
const { captchaExpiresIn } = require('@/config/global.config')

// 初始化邮件服务
const transporter = nodemailer.createTransport({
	service: 'qq', // 服务商
	host: 'smtp.qq.com', // 主机
	port: 587, // 端口
	secure: true, // 是否使用安全链接
	auth: {
		user: mailInfo.user, // 邮箱账号
		pass: mailInfo.pass // 密码 | 授权码
	}
})

const m = captchaExpiresIn / (1000 * 60)
function sendMail(email, captcha) {
	transporter.sendMail({
		to: email, // 收件人
		from: mailInfo.user, // 发件人
		subject: `${mailInfo.subject} - 验证码`, // 标题
		html: `<div style="width: 100vw; padding: 20px; background-color: #fff; display: flex; justify-content: center; ">
<div style="width: 90vw; max-width: 600px; border: 1px solid #37a6a6; overflow: hidden; border-radius: 4px;">
  <div
    style="width: 100%; height: 60px; padding-left: 30px; line-height: 60px; background-color: #37a6a6; color: #fff; font-size: 22px;">
    <strong>《${mailInfo.subject}》</strong> 操作验证码</div>
  <div style="color: #6e6e6e; font-size: 15px; padding: 20px 30px; background-color: #f3fbfa;">
    <div style="margin-bottom: 20px;">尊敬的用户您好！</div>
    <div>您的验证码是：<strong style="color: #37a6a6">${captcha}</strong>，请在 <span style="color: #37a6a6">${m}</span> 分钟内进行验证。如果该验证码不为您本人申请，请无视。</div>
  </div>
</div>
</div>` // 内容
	})
}

module.exports = {
	sendMail
}
