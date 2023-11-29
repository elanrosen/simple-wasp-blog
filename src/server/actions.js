import HttpError from '@wasp/core/HttpError.js'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const userId = context.user.id;

  return context.entities.Post.create({
    data: {
      title: args.title,
      content: args.content,
      userId
    }
  });
}

export const updatePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Convert args.id to an integer
  const postId = parseInt(args.id);

  // Check if the conversion resulted in a valid integer
  if (isNaN(postId)) {
    throw new HttpError(400, 'Invalid postId');
  }

  const post = await context.entities.Post.findUnique({
    where: { id: postId } // Use the converted postId value here
  });

  if (post.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Post.update({
    where: { id: postId }, // Use the converted postId value here
    data: { title: args.title, content: args.content }
  });
}


export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Check if args.content is empty or contains only whitespace characters
  if (!args.content || args.content.trim() === '') {
    throw new HttpError(400, 'Comment content must not be empty');
  }

  // Convert args.postId to an integer
  const postId = parseInt(args.postId);

  const comment = await context.entities.Comment.create({
    data: {
      content: args.content,
      postId, // Use the converted postId value here
      userId: context.user.id
    }
  });

  return comment;
}

