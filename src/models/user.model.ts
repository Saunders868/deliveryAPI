import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// email interface
interface EmailInterface {
  address: string;
  validated: boolean;
}

// point interface
export interface PointInterface {
  type: {
    type: string;
  };
  coordinates: {
    type: number[];
  };
}

// user interface
export interface UserDocument extends mongoose.Document {
  email: EmailInterface;
  username: string;
  password: string;
  profile?: {
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    address: {
      street1: string;
      street2: string;
      city: string;
      state: string;
      country: string;
      zip: string;
      location: {
        type: PointInterface;
      };
    };
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// make email schema
const Email = new mongoose.Schema({
  address: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  validated: { type: Boolean, default: false },
});

// make point schema for location purposes
const Point = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      reuqired: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: Email,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      firstName: {
        type: String,
        default: "John",
      },
      lastName: {
        type: String,
        default: "Doe",
      },
      avatar: {
        type: String,
        default: "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif",
      },
      bio: {
        type: String,
        default: "Not enough information about this user",
      },
      address: {
        street1: {
          type: String,
          default: "not given by user",
        },
        street2: {
          type: String,
          default: "not given by user",
        },
        city: {
          type: String,
          default: "not given by user",
        },
        state: {
          type: String,
          default: "not given by user",
        },
        country: {
          type: String,
          default: "not given by user",
        },
        zip: {
          type: String,
          default: "not given by user",
        },
        location: {
          type: Point,
          required: false,
        },
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// runs before schema is saved
// hashes password
userSchema.pre("save", async function (next: any) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

// compares hashed passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
