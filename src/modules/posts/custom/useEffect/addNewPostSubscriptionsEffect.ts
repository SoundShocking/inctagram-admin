import { useEffect } from 'react'

import { SubscribeToMoreOptions } from '@apollo/client'

import { PostsType, SubscriptionData } from '@/modules/posts'
import { SUBSCRIPTIONS_ADD_POST_ADDITIONAL } from '@/modules/posts/queries/addAdditionalPostSubscriptions'

export const addNewPostSubscriptionsEffect = (
  subscribeToMore: (options: SubscribeToMoreOptions<any, any, any>) => () => void
) => {
  useEffect(() => {
    let unsubscribe: () => void

    unsubscribe = subscribeToMore({
      document: SUBSCRIPTIONS_ADD_POST_ADDITIONAL,
      updateQuery: (
        prev: PostsType,
        { subscriptionData }: { subscriptionData: { data: SubscriptionData } }
      ) => {
        if (!subscriptionData?.data?.createdPost) return prev
        if (subscriptionData?.data?.createdPost && prev?.postsList?.items) {
          const updatedItems = [subscriptionData.data.createdPost]

          return Object.assign({}, prev, {
            ...prev,
            postsList: {
              ...prev.postsList,
              items: [...updatedItems, ...prev.postsList.items],
            },
          })
        }
      },
    })
    if (unsubscribe) return () => unsubscribe()
  }, [subscribeToMore])
}
