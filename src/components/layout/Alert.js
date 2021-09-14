import React from 'react'
import InfoIcon from '@material-ui/icons/Info';


const Alert=({alert})=>{
	return (
		alert!==null && (
			<div className={`alert alert-${alert.type}`}> 
			<InfoIcon/>  {alert.msg}

			</div>


			)
	)
}

export default Alert