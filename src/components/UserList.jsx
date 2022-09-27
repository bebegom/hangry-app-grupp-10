const UserList = ({ users }) => {
	return (
		<div>
			<table className="table w-full">
				<thead>
					<tr>
						<th>List</th>
						<th>Id</th>
						<th>Email</th>
					</tr>
				</thead>
                
				<tbody>
					{users &&
						users.map((allUsers, i) => (
							<tr key={allUsers.id}>
								<th>{i + 1}</th>
								<td>{allUsers.id}</td>
								<td>{allUsers.email}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserList