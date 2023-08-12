import { useEffect } from 'react'

import { SubscribeToMoreOptions } from '@apollo/client'

import { PostsListType, SUBSCRIPTIONS_DELETE_IMAGE_POST } from '@/modules/posts'
import { PostListViewModel, Subscription } from '@/types'

export const deleteImagePostSubscriptions = (
  subscribeToMore: (options: SubscribeToMoreOptions<any, any, any>) => () => void
) => {
  useEffect(() => {
    let unsubscribe: () => void

    unsubscribe = subscribeToMore({
      document: SUBSCRIPTIONS_DELETE_IMAGE_POST,
      updateQuery: (
        prev: PostsListType,
        { subscriptionData }: { subscriptionData: { data: Pick<Subscription, 'imagePostDeleted'> } }
      ) => {
        if (!subscriptionData?.data?.imagePostDeleted) return prev
        const postId = subscriptionData.data.imagePostDeleted.postId
        const userId = subscriptionData.data.imagePostDeleted.userId

        console.log('subscribe', subscriptionData.data.imagePostDeleted)

        if (postId && prev?.postsList?.items) {
          const updatedItemsAfterDeletionImagePost: PostListViewModel[] = prev.postsList.items.map(
            post => {
              if (post.postId === postId && post.userId === userId) {
                // Здесь вы можете создать новый объект поста с обновленными значениями
                return {
                  ...post,
                  urlsPostsImages: subscriptionData.data.imagePostDeleted.urlsPostsImages, // Замените на новый массив ссылок на фотографии
                }
              }

              return post
            }
          )

          return {
            ...prev,
            postsList: {
              ...prev.postsList,
              items: [...updatedItemsAfterDeletionImagePost],
            },
          }
        }
      },
    })
    if (unsubscribe) return () => unsubscribe()
  }, [subscribeToMore])
}
