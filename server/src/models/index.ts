import User from "./user.model";
import RefreshToken from "./refreshToken.model";
import Group from "./group.model";
import Country from "./country.model";
import Message from "./message.mode";
import GroupCategory from "./groupCategory.model";
import FriendChat from "./friendChat.model";

User.hasMany(RefreshToken, { foreignKey: "userId", onDelete: "CASCADE" });
RefreshToken.hasMany(User);

// user belongs to country
Country.hasMany(User, { onDelete: "CASCADE" })
User.hasMany(Country, { onDelete: "CASCADE" })

// Group has many members and member can be in more than group
Group.belongsToMany(User, { through: "GroupMember" })
User.belongsToMany(Group, { through: "GroupMember" })

// Group has one Admin
User.hasMany(Group, { onDelete: "CASCADE" });
Group.belongsTo(User, { onDelete: "CASCADE" });

// Group belongs to specific category
GroupCategory.hasMany(Group)
Group.belongsTo(GroupCategory)

// User has many messages
User.hasMany(Message, { onDelete: "CASCADE" });
Message.belongsTo(User, { onDelete: "CASCADE" })

// message belongs to firendChat
FriendChat.hasMany(Message, { onDelete: "CASCADE"})
Message.belongsTo(FriendChat, { onDelete: "CASCADE"});

// message belongs to group
Message.belongsTo(Group, { onDelete: "CASCADE"});
Group.hasMany(Message, { onDelete: "CASCADE"})

export  {
    User,
    RefreshToken,
    Group,
    Country, 
    Message,
    GroupCategory,
    FriendChat
}