import { useState, useContext, FormEvent } from "react";
import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";
import { useUser } from "../../hooks/use-user";
import { IPhotoComment } from "../../types";

interface AddCommentProps {
  docId: string;
  comments: IPhotoComment[];
  setComments: Function;
  commentInput: React.MutableRefObject<HTMLInputElement>;
}

const AddComment: React.FC<AddCommentProps> = ({
  docId,
  comments,
  setComments,
  commentInput,
}) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid || "");

  if (loggedInUser) {
    const handleSubmitComment = async (event: FormEvent) => {
      event.preventDefault();

      // Get displayName in case it is null
      if (loggedInUser.displayName === null) {
        await loggedInUser.updateProfile({
          displayName: user?.username,
        });
      }

      setComments([...comments, { displayName: user?.username, comment }]);
      setComment("");

      return firebase
        .firestore()
        .collection("photos")
        .doc(docId)
        .update({
          comments: FieldValue.arrayUnion({
            displayName: user?.username,
            comment,
          }),
        });
    };

    return (
      <div className="border-t border-gray-primary">
        <form
          className="flex justify-between pl-0 pr-5"
          method="POST"
          onSubmit={(event) =>
            comment.length >= 1
              ? handleSubmitComment(event)
              : event.preventDefault()
          }
        >
          <input
            aria-label="Add a comment"
            autoComplete="off"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4"
            type="text"
            name="add-comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            ref={commentInput}
          />
          <button
            className={`text-sm font-bold text-blue-medium ${
              !comment && "opacity-25"
            }`}
            type="button"
            disabled={comment.length < 1}
            onClick={handleSubmitComment}
          >
            Post
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default AddComment;
