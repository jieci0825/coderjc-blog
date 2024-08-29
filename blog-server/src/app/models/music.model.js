const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class Music extends Model {}

Music.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '角色id'
		},
		song_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '歌曲名称'
		},
		singer: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '歌手'
		},
		lyric: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '歌词'
		},
		song_url: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '歌曲链接'
		},
		song_cover: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '歌曲封面'
		},
		music_category_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '歌曲分类id'
		}
	},
	{ sequelize, tableName: 'musics' }
)

module.exports = { Music }
