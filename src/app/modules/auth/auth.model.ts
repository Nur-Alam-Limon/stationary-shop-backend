import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  phone?: string;  
  address?: string; 
  profilePic?: string;
  role?: string
  status?: string;
}

const SALT_ROUNDS = 10;

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },  
    address: { type: String, required: false }, // Optional field
    profilePic: { type: String, required: false },
    role: { type: String, required: false, default: 'user' },
    status: { type: String, required: false, default: 'Active' },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
