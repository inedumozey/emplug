import { Link, Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import FilteringTable from '../../components/table/FilteringTable/FilteringTable';
import SimpleDataTable from '../../components/table/SimpleDataTable';

import AdminSideBar from './AdminSideBar';


const Admin = () => {
	const {path, url} = useRouteMatch();
	return (
		<div style={{textAlign: 'center'}}>
			<AdminSideBar path={url}/>
			<div style={{marginLeft: '18rem'}}>
				<Switch>
					<Route exact path="/admin/users" children={ <FilteringTable />}/>
					<Route exact path="/admin/add-user" children={ <h1>Add Users</h1>}/>
					<Route exact path="/admin/organizations" children={ <h1>Organizations</h1>}/>
					<Route exact path="/admin/add-organizations" children={ <h1>Add Organizations</h1>}/>
				</Switch>
			</div>
		</div>
	);
}

export default Admin;