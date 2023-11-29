import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  return context.entities.Post.findMany();
}

// export const getPost = async ({ postId }, context) => {
//   if (!context.user) { throw new HttpError(401) };

//   const post = await context.entities.Post.findUnique({
//     where: { id: postId }
//   });

//   if (!post) throw new HttpError(404, `Post with id ${postId} not found`);

//   return post;
// }


// export const getComments = async (args, context) => {
//   if (!context.user) { throw new HttpError(401) };

//   const comments = await context.entities.Comment.findMany({
//     where: {
//       postId: args.postId
//     }
//   });

//   return comments;
// }

export const getPost = async ({ postId }, context) => {
  // Convert postId to an integer
  const id = parseInt(postId, 10);

  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id }
  });

  if (!post) throw new HttpError(404, `Post with id ${postId} not found`);

  return post;
}

export const getComments = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Convert postId to an integer
  const postId = parseInt(args.postId, 10);

  const comments = await context.entities.Comment.findMany({
    where: { postId }
  });

  return comments;
}
