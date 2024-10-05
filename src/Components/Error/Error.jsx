import Lottie from 'lottie-react'
import React from 'react'
import ErrorAni from '../../assets/animation/ani-error.json'
import '../../Components/Error/Error.css'

const Error = () => {
return (
<>
    <div className="container">
        <div className='error-ani'>
            <Lottie animationData={ErrorAni} />
        </div>
    </div>
</>
)
}

export default Error