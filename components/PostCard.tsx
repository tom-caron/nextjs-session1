import LikeButton from "@/components/LikeButton";

type PostCardProps = {
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

export default function PostCard({
  author,
  handle,
  content,
  likes,
  time,
}: PostCardProps) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div>
          <span className="author">{author}</span>{" "}
          <span className="handle">{handle}</span>
        </div>
        <span className="time">{time}</span>
      </div>

      <p className="content">{content}</p>
      <LikeButton initialLikes={likes} />
    </div>
  );
}
