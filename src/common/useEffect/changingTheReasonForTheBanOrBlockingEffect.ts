import React, { useEffect } from 'react'

import { BanReasonForPostInputType, BanReasonInputType } from '@/types'

export const changingTheReasonForTheBanOrBlockingEffect = ({
  setBanReasonName,
  defaultReason,
}: {
  setBanReasonName: React.Dispatch<
    React.SetStateAction<BanReasonForPostInputType | BanReasonInputType | string>
  >
  defaultReason: BanReasonForPostInputType | BanReasonInputType | string
}) => {
  useEffect(() => {
    setBanReasonName(defaultReason)
  }, [defaultReason])
}
