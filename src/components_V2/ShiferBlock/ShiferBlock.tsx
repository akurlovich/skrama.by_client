import React, { FC } from 'react'
import './shiferblock.scss'

const ShiferBlockInner: FC = () => {
	return (
		<div>ShiferBlock</div>
	)
}

export const ShiferBlock = React.memo(ShiferBlockInner)