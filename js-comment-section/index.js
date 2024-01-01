const commentInput = document.querySelector("#comment-box");
const commentButton = document.querySelector("#post-comment");
const postedCommentSection = document.querySelector(".posted-comments");

commentButton.addEventListener("click", (e) => {
  e.preventDefault();

  const postedCommentHolder = document.createElement("div");
  postedCommentHolder.classList.add("posted-comment-holder");
  const postedComment = document.createElement("p");
  postedComment.classList.add("posted-comment-text");

  const inputValue = commentInput.value;
  if (inputValue === "") return;

  postedComment.textContent = inputValue;
  postedCommentHolder.appendChild(postedComment);
  postedCommentSection.appendChild(postedCommentHolder);

  commentInput.value = "";

  const buttonHolder = document.createElement("div");
  buttonHolder.classList.add("button-holder");

  const replyButton = createButton("Reply", "reply-button", handleReply);
  const editButton = createButton("Edit", "edit-button", handleEdit);

  buttonHolder.appendChild(replyButton);
  buttonHolder.appendChild(editButton);
  postedCommentHolder.appendChild(buttonHolder);

  function handleReply() {
    const replyInput = document.createElement("textarea");
    replyInput.type = "text";
    replyInput.placeholder = "Write a reply...";
    replyInput.classList.add("reply-input");

    const replySubmitButton = createButton("Submit", "submit-reply", () => {
      const replyText = replyInput.value;
      if (replyText !== "") {
        const replyHolder = document.createElement("div");
        const reply = document.createElement("p");
        reply.textContent = `Reply: ${replyText}`;
        const editReplyButton = createButton(
          "Edit Reply",
          "edit-reply-button",
          () => handleEditReply(reply, editReplyButton)
        );
        replyHolder.appendChild(reply);
        replyHolder.appendChild(editReplyButton);
        postedCommentHolder.appendChild(replyHolder);
        replyInput.remove();
        replySubmitButton.remove();
      }
    });

    postedCommentHolder.appendChild(replyInput);
    postedCommentHolder.appendChild(replySubmitButton);
  }

  function handleEdit() {
    const isEditing = postedComment.getAttribute("contenteditable") === "true";

    //get into editing mode
    if (!isEditing) {
      postedComment.contentEditable = true;
      postedComment.focus();
      postedComment.style.backgroundColor = "#d3d3d3";
      editButton.textContent = "Submit Edit";
    } else {
      //get out of editing mode
      postedComment.contentEditable = false;
      postedComment.style.backgroundColor = "initial";
      editButton.textContent = "Edit";
    }
  }

  function handleEditReply(reply, editReplyButton) {
    const isEditingReply = reply.getAttribute("contenteditable") === "true";

    // get into editing mode for the reply
    if (!isEditingReply) {
      reply.contentEditable = true;
      reply.focus();
      reply.style.backgroundColor = "#d3d3d3";
      editReplyButton.textContent = "Submit Edit";
    } else {
      // get out of editing mode for the reply
      reply.contentEditable = false;
      reply.style.backgroundColor = "initial";
      editReplyButton.textContent = "Edit";
    }
  }
});

function createButton(text, className, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener("click", clickHandler);
  return button;
}
