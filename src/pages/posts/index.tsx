import Head from 'next/head'

import { useTranslation } from '@/components'
import { getGlobalLayout } from '@/components/layout'
import { PostsList } from 'modules/posts'

const Posts = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t.translation.navigation.posts}</title>
      </Head>

      <PostsList />
    </>
  )
}

Posts.getLayout = getGlobalLayout

export default Posts
