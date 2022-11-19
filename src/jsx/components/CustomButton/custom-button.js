import { Button } from 'react-bootstrap';
import './custom-button.css';

function CustomButton({children, ...otherProps }) {
	return <Button id="custom-button" className="btn btn-primary" {...otherProps} >{children}</Button>
}

export default CustomButton;
