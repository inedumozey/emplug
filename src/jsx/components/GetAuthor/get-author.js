import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function GetAuthor(props) {
	return <strong>{props.author}</strong>
}

export default GetAuthor;