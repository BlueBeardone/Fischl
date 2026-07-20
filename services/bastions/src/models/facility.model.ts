import { Schema, model } from 'mongoose';
import type { IFacilityTable } from '../../../../shared/types';

export interface IFacility {
  id: string;
  name: string;
  rank: string;
  minimumRequiredHirelings: number;
  constructionTurns: number;
  cost: number;
  description: string;
  imgUrl?: string;
  table?: IFacilityTable;
  constructedTurns: number;
}

const facilitySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rank: { type: String, required: true },
    minimumRequiredHirelings: { type: Number, default: 0 },
    constructionTurns: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    description: { type: String, required: true, trim: true },
    imgUrl: { type: String },
    table: {
      table: { type: [[String]] },
    },
    constructedTurns: { type: Number, default: 0 },
    bastionId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        delete ret._id;
        delete ret.__v;
        delete ret.bastionId;
      },
    },
  }
);

facilitySchema.virtual('id').get(function () {
  return this._id.toString();
});

export const FacilityModel = model('Facility', facilitySchema);