import { useEffect } from 'react'

import { SubscribeToMoreOptions } from '@apollo/client'

import {
  deletePostDataInterface,
  PostsItemsType,
  PostsType,
  SUBSCRIPTIONS_DELETE_POST,
} from '@/modules/posts'

export const deletePostSubscriptionsEffect = (
  subscribeToMore: (options: SubscribeToMoreOptions<any, any, any>) => () => void
) => {
  useEffect(() => {
    let unsubscribe: () => void

    unsubscribe = subscribeToMore({
      document: SUBSCRIPTIONS_DELETE_POST,
      updateQuery: (
        prev: PostsType,
        { subscriptionData }: { subscriptionData: { data: deletePostDataInterface } }
      ) => {
        if (!subscriptionData?.data?.postDeleted) return prev
        const postId = subscriptionData.data.postDeleted.postId

        if (postId && prev?.postsList?.items) {
          const updatedItemsAfterDeletion: PostsItemsType[] = prev.postsList.items.filter(
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
