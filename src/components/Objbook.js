import React from "react";
import tw from "twin.macro"

const Objbook = ({name}) => {
	return (<>
	<div css={tw`relative bg-gray-100`}>
		<span>{name}</span>
		<button
			css={tw`absolute right-0 text-white bg-red-500 rounded-full`}>
			x
		</button>
	</div>
	</>)
}

export default Objbook
