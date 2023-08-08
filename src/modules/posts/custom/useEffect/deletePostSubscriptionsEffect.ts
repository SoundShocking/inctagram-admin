import { useEffect } from 'react'

import { SubscribeToMoreOptions } from '@apollo/client'

import { deletePostDataInterface, PostsListType, SUBSCRIPTIONS_DELETE_POST } from '@/modules/posts'
import { PostListViewModel } from '@/types'

export const deletePostSubscriptionsEffect = (
  subscribeToMore: (options: SubscribeToMoreOptions<any, any, any>) => () => void
) => {
  useEffect(() => {
    let unsubscribe: () => void

    unsubscribe = subscribeToMore({
      document: SUBSCRIPTIONS_DELETE_POST,
      updateQuery: (
        prev: PostsListType,
        { subscriptionData }: { subscriptionData: { data: deletePostDataInterface } }
      ) => {
        if (!subscriptionData?.data?.postDeleted) return prev
        const postId = subscriptionData.data.postDeleted.postId

        if (postId && prev?.postsList?.items) {
          const updatedItemsAfterDeletion: PostListViewModel[] = prev.postsList.items.filter(
            post => post.postId !== postId
          )

          return {
            ...prev,
            postsList: {
              ...prev.postsList,
              items: [...updatedItemsAfterDeletion],
            },
          }
        }
      },
    })
    if (unsubscribe) return () => unsubscribe()
  }, [subscribeToMore])
}
