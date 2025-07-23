import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface ArticleAttributes {
	id: string;
	title: string;
	content: string;
	tags: string[];
	isPublic: boolean;
	user_id: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface ArticleCreationAttributes extends Optional<ArticleAttributes, 'id'> {}

export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
	public id!: string;
	public title!: string;
	public content!: string;
	public tags!: string[];
	public isPublic!: boolean;
	public user_id!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Article.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		tags: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
			defaultValue: []
		},
		isPublic: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'articles'
	}
);
