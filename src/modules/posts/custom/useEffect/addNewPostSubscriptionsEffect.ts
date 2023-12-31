import { useEffect } from 'react'

import { SubscribeToMoreOptions } from '@apollo/client'

import {
  PostsListType,
  SubscriptionDataPost,
  SUBSCRIPTIONS_ADD_POST_ADDITIONAL,
} from '@/modules/posts'

export const addNewPostSubscriptionsEffect = (
  autoUpdate: boolean,
  subscribeToMore: (options: SubscribeToMoreOptions<any, any, any>) => () => void
) => {
  useEffect(() => {
    let unsubscribe = () => {} // Инициализация пустой функцией

    if (autoUpdate) {
      unsubscribe = subscribeToMore({
        document: SUBSCRIPTIONS_ADD_POST_ADDITIONAL,
        updateQuery: (
          prev: PostsListType,
          { subscriptionData }: { subscriptionData?: { data?: SubscriptionDataPost } }
        ) => {
          if (!subscriptionData?.data?.createdPost) return prev
          if (prev?.postsList?.items) {
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
    }

    return () => unsubscribe()
  }, [subscribeToMore, autoUpdate])
}
