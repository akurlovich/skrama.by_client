import React, { FC } from 'react'

const ShiferItemInner: FC = () => {
	return (
		<div>ShiferItem</div>
	)
}

export const ShiferItem = React.memo(ShiferItemInner)