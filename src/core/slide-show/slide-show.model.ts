import { model } from "mongoose";
import SlideShowSchema from "./slide-show.schema";

const SlideShowModel = model("SlideShow", SlideShowSchema, "SlideShow");

export default SlideShowModel;