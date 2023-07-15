import { getGlobalLayout } from '@/components/layout'
import { PostsView } from '@/modules/posts'
const Posts = () => {
  return (
    <>
      <PostsView />
    </>
  )
}

Posts.getLayout = getGlobalLayout

export default Posts
