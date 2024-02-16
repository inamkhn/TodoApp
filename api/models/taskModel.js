import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    // userRef: {
    //   type: String,
    //   required: true,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const task = mongoose.model('Task', TaskSchema);

export default task;