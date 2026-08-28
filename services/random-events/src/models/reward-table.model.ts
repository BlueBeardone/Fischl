import { Schema, model } from 'mongoose';
import type { IRewardTable, ITableRow } from '../../../../shared/types';

const rowSchema = new Schema<ITableRow>(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    label: { type: String, required: true, trim: true },
    description: { type: String },
  },
  { _id: false }
);

const rewardTableSchema = new Schema<IRewardTable>(
  {
    type: { type: String, required: true, enum: ['reward', 'tracky_hours'] },
    die: { type: String, required: true, trim: true },
    rows: { type: [rowSchema], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

rewardTableSchema.virtual('id').get(function () {
  return this._id.toString();
});

export const RewardTableModel = model<IRewardTable>('RewardTable', rewardTableSchema, 'reward-tables');