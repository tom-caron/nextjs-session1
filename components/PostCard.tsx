import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";

type PostCardProps = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

export default function PostCard({
  id,
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

      <div className="post-actions">
        <LikeButton initialLikes={likes} />
        <DeletePostButton postId={id} />
      </div>
    </div>
  );
}