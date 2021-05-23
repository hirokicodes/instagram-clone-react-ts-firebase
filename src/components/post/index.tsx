import { useRef } from "react";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";
import { IPhoto } from "../../types";

interface PostProps {
  content: IPhoto;
}

const Post: React.FC<PostProps> = ({ content }) => {
  const commentInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleFocus = () => {
    if (commentInput.current !== null) {
      commentInput.current.focus();
    }
  };

  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
