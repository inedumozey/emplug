import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';


function CompanyLogo(props) {

	return(
		<>
				<img src={props.logoUrl} alt={props.name} style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #eee'}}/>
		</>
	);
}


export default CompanyLogo;