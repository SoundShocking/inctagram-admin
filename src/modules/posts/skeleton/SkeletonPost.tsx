import { SkeletonUsersPosts } from '@/modules/posts'

export const SkeletonPost = (value: number) => {
  return [...Array(value).keys()].map(i => {
    return <SkeletonUsersPosts key={i} />
  })
}
