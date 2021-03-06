import { Document, Types } from 'mongoose';

export interface User extends Document {
  phone: string;
  name: string;
  surname: string;
  patronymics?: string;
  password: string;
}

export interface Speciality extends Document {
  title: string;
}

export interface Doctor extends Document {
  name: string;
  surname: string;
  patronymics: string;
  speciality: string[];
}

export interface Callback extends Document {
  doctorId: Types.ObjectId;
  patientPhone: string;
  speciality: string;
}

export interface Book extends Document, Callback {
  acceptanceDate: Date;
  comment: string;
}
