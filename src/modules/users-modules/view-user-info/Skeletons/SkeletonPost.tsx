import { Skeleton } from '@/ui/skeletons/Skeleton'

export const SkeletonPost = () => {
  const className = 'w-[234px] h-[238px] object-contain'

  return (
    <div className="aspect-square">
      <Skeleton classes={className} />
    </div>
  )
}
