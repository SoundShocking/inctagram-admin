import { getGlobalLayout } from '@/components/layout'
import { PostsList } from 'modules/posts'

const Posts = () => {
  return (
    <>
      <PostsList />
    </>
  )
}

Posts.getLayout = getGlobalLayout

export default Posts
