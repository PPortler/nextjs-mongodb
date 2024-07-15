import mongoose, { Schema }  from "mongoose";

const postSchema = new Schema(
    {
        title: String,
        img: String,
        content: String
    },
    {
        timestamps: true //ตอนเพิ่มข้อมูลให้ลงวันเวลาด้วย
    }
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;