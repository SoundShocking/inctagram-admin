import { Skeleton } from '@/ui/skeletons/Skeleton'

export const SkeletonPost = () => {
  const className = 'max-w-[234px] max-h-[238px] object-contain'

  return (
    <div className="aspect-square">
      <Skeleton classes={className} />
    </div>
  )
}
