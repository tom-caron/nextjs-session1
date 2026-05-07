import Link from "next/link";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";

type PostCardProps = {
  id: number;
  authorId?: string;
  currentUserId?: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

export default function PostCard({
  id,
  authorId,
  currentUserId,
  author,
  handle,
  content,
  likes,
  time,
}: PostCardProps) {
  const canDelete = authorId && currentUserId && authorId === currentUserId;

  return (
    <div className="post-card">
      <div className="post-header">
        <div>
          <span className="author">{author}</span>{" "}
          <span className="handle">{handle}</span>
        </div>

        <span className="time">{time}</span>
      </div>

      <Link href={`/posts/${id}`} className="post-link">
        <p className="content">{content}</p>
      </Link>

      <div className="post-actions">
        <LikeButton postId={id} initialLikes={likes} />

        {canDelete && <DeletePostButton postId={id} />}
      </div>
    </div>
  );
}
