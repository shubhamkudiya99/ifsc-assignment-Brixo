import mongoose, { Schema } from "mongoose";
import { IfscResponse } from "../types/ifsc";

const IfscSchema: Schema = new Schema({
  IFSC: { type: String, required: true, unique: true },
  BANK: String,
  BANKCODE: String,
  BRANCH: String,
  ADDRESS: String,
  CONTACT: String,
  CITY: String,
  CENTRE: String,
  DISTRICT: String,
  STATE: String,
  MICR: String,
  SWIFT: String,
  ISO3166: String,
  UPI: Boolean,
  RTGS: Boolean,
  NEFT: Boolean,
  IMPS: Boolean,
  _raw: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export const IfscModel = mongoose.model<IfscResponse>("Ifsc", IfscSchema);
