import mongoose, { Document, Model, Schema, model } from "mongoose";

interface IFaqItem extends Document {
  question: string;
  answer: string;
}

interface ICategory extends Document {
  title: string;
}

interface IBanerImage extends Document {
  public_id: string;
  url: string;
}

interface ILayout extends Document {
  type: string;
  faq: IFaqItem[];
  categories: ICategory[];
  banner: {
    image: IBanerImage;
    title: string;
    subtitle: string;
  };
}

const faqSchema = new Schema<IFaqItem>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const categorySchema = new Schema<ICategory>({
  title: {
    type: String,
  },
});

const bannerImageSchema = new Schema<IBanerImage>({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
});

const layoutSchema = new Schema<ILayout>({
  type: {
    type: String,
  },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
});

const LayoutModel: Model<ILayout> = mongoose.model("Layout", layoutSchema);

export default LayoutModel;
