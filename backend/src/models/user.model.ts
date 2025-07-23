import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
	id: string;
	email: string;
	passwordHash: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	public id!: string;
	public email!: string;
	public passwordHash!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'users'
	}
);
