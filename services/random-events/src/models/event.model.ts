import { Schema, model, Model } from 'mongoose';
import type { IBastionIndividualEvent, IEventSubTable, IRollRange } from '../../../../shared/types';

const rollRangeSchema = new Schema<IRollRange>(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

const subTableRowSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    label: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
);

const subTableSchema = new Schema<IEventSubTable>(
  {
    die: { type: String, required: true, trim: true },
    label: { type: String },
    rows: { type: [subTableRowSchema], required: true },
  },
  { _id: false }
);

const eventSchema = new Schema<IBastionIndividualEvent>(
  {
    title: { type: String, required: true, trim: true },
    details: { type: String, default: '', trim: true },
    rollRange: { type: rollRangeSchema, required: true },
    subTables: { type: [subTableSchema], required: false },
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

eventSchema.virtual('id').get(function () {
  return this._id.toString();
});

export const createEventModel = (collection: string): Model<IBastionIndividualEvent> => {
  return model<IBastionIndividualEvent>(collection, eventSchema, collection);
};

export const BastionIndividualEventModel = createEventModel('bastionIndividualEvents');