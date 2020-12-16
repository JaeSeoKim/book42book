import React from "react";
import tw from "twin.macro"

const Checkbtn = ({ status }) => {
	return (
		<button css={tw`bg-yellow-500 text-white rounded`}>{status} 확인</button>
	)
}

export default Checkbtn
