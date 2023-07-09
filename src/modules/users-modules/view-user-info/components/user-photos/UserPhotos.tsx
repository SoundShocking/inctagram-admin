import { SkeletonPost } from '@/modules/users-modules/view-user-info'

export const UserPhotos = () => {
  const usedToDrawArraysOfSkeletons = (value: number) => {
    return [...Array(value).keys()].map(i => {
      return <SkeletonPost key={i} />
    })
  }

  return (
    <div className="mt-14">
      <div className="grid grid-cols-4 gap-3">
        {
          usedToDrawArraysOfSkeletons(8)
          // : data?.photos.map((page, idx) => (
          //     <React.Fragment key={idx}>
          //       {photos &&
          //         photos.items.map(users => (
          //           < key={users.id} users={users}/>
          //         ))}
          //     </React.Fragment>
          //   ))
        }
      </div>

      {/*{isSuccess && (*/}
      {/*  <div className="pt-4" ref={ref}>*/}
      {/*    {isFetchingNextPage && (*/}
      {/*      <div className={'grid grid-cols-4 gap-3'}>{usedToDrawArraysOfSkeletons(12)}</div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}
